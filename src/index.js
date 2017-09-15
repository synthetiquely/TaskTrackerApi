import Koa from 'koa';
import logger from 'koa-morgan';
import Router from 'koa-router';
// import bodyParser from 'koa-body';

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Hello from API.';
});

app
  .use(logger('tiny'))
  .use(router.routes())
  .listen(8080);
