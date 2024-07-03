


import { Router } from 'express';
import { UserController } from './controller';
import { UserService } from '../services/user.service';


export class UserRoutes {
  
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const controller = new UserController(userService);

    router.post('/signup', controller.signup);
    router.post('/login', controller.login);

    return router;
  }

}

