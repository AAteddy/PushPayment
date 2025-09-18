import { Router } from 'express';
import pushController from '../../controllers/push.controller';

const router = Router();

router.get(
  "/healthcheck", 
  pushController.healthCheck
);


export default router;