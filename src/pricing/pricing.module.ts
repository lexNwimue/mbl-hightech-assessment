import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  providers: [PricingService],
  imports: [SocketModule],
})
export class PricingModule {}
