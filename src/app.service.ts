import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(res: Response): void {
    res.sendFile('index.html', { root: 'client' });
  }
}
