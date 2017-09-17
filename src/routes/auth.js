import Router from 'koa-router';

const router = new Router();

router.post('/api/user/signup', (ctx) => {
  console.log(ctx.request.body);
  ctx.body = { success: true };
});

export default router;
