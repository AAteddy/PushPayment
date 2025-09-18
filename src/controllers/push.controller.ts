import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Push Payment service is running!' 
  });
}


export default {
    healthCheck
}