import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validateAccessToken } from '../../helper/auth';
import { validateZodSchema } from '../../middleware/zodValidation';
import { chatMessageSchema } from './validation';
import { chatWithAgent } from './service';
import logger from '../../logger';

export const SupportAgentRoutes: Router = Router();

SupportAgentRoutes.post(
  '/',
  validateAccessToken,
  validateZodSchema(chatMessageSchema, 'body'),
  asyncHandler(async (req: Request, res: Response) => {
    const { message, history } = req.body;
    const user = (req as any).user;

    const userContext = {
      userId: user?.userId || '',
      username: user?.username || '',
      email: user?.email || '',
      role: user?.role || '',
      scope: user?.scope || [],
    };

    try {
      const reply = await chatWithAgent(message, history || [], userContext);
      res.status(200).json({ reply });
    } catch (error: any) {
      logger.error({ err: error }, 'Support agent error');
      res.status(500).json({
        errorCode: 'SUPPORT_AGENT_ERROR',
        message: error.message || 'An error occurred while processing your request.',
      });
    }
  })
);
