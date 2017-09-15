import Koa from 'koa';
import logger from 'koa-morgan';
import cors from 'kcors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import authRouter from './routes/auth';

dotenv.config();
const app = new Koa();
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app
  .use(cors())
  .use(logger('tiny'))
  .use(authRouter.routes())
  .use(authRouter.allowedMethods())
  .listen(process.env.HOST);
