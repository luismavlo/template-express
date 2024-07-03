import { Router } from 'express';
import { UserRoutes } from './user/route';
import { TransferRoutes } from './transfer/route';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/api/v1/users', UserRoutes.routes);
    router.use('/api/v1/transfers', TransferRoutes.routes);

    return router;
  }


}

