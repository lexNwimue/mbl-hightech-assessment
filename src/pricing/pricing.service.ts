import { Injectable, OnModuleInit } from '@nestjs/common';
import { PriceData } from './interfaces/pricing-data.interface';
import { SocketGateway } from 'src/socket/socket.gateway';
import { WebSocketEvent } from '../socket/enums/ws-events.enum';

@Injectable()
export class PricingService implements OnModuleInit {
  private readonly prices: Record<string, number>;

  constructor(private readonly socketService: SocketGateway) {
    this.prices = {
      BTCUSD: 85000,
      ETHUSD: 4000,
      XRPUSD: 0.6,
    };
  }

  onModuleInit() {
    this._generateAndEmitPrice();
  }

  private _generateAndEmitPrice(): void {
    setInterval(() => {
      const prices = this._generatePrices();
      this.socketService.emitMessage(WebSocketEvent.PRICE_UPDATE, prices);
    }, 5000);
  }

  /*
   * Called every interval to simulate price changes
   * We could have used a CRON job but that would be an overkill for this specific usecase
   */
  private _generatePrices(): PriceData[] {
    const updates: PriceData[] = [];

    for (const symbol in this.prices) {
      const current = this.prices[symbol];
      const change = current * (Math.random() * 0.03 - 0.01); // ±2%
      const updated = parseFloat((current + change).toFixed(2));
      this.prices[symbol] = updated;

      updates.push({
        symbol,
        price: updated,
        timestamp: new Date().toISOString(),
      });
    }

    return updates;
  }
}
