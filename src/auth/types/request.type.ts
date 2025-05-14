import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  isAuthenticated(): boolean;
  user: {
    id: string;
    username: string;
    [key: string]: any;
  };
}
