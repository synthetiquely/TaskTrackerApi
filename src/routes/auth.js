import Router from 'koa-router';
import bodyParser from 'koa-body';

const router = new Router();

router.post('/api/user/signup', bodyParser, (ctx) => {
  ctx.body = 'hello';
});
