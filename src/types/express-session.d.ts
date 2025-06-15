import 'express-session';
import { Types, Document } from 'mongoose';
declare module 'express-session' {
  interface SessionData {
    user: {
      email: string;
      businessId: Types.ObjectId;
    };
  }
}
