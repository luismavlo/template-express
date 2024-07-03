

import { Router } from 'express';
import { TransferController } from './controller';
import { TransferService } from '../services/transfer.service';
import { UserService } from '../services/user.service';


export class TransferRoutes {
  
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const transferService = new TransferService(userService);
    const controller = new TransferController(transferService);

    router.post('/', controller.makeTransfer);

    return router;
  }

}

