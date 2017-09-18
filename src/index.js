import Koa from 'koa';
import logger from 'koa-morgan';
import bodyParser from 'koa-body';
import cors from 'kcors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import authRouter from './routes/auth';
import projectRouter from './routes/project';

dotenv.config();
const app = new Koa();
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app
  .use(cors())
  .use(bodyParser())
  .use(logger('tiny'))
  .use(authRouter.allowedMethods())
  .use(authRouter.routes())
  .use(projectRouter.allowedMethods())
  .use(projectRouter.routes())
  .listen(process.env.HOST);
