import Router from 'koa-router';
import User from '../models/User';

const router = new Router();

router.post('/api/user/signup', async (ctx) => {
  const {
    name, email, password, role,
  } = ctx.request.body;
  const user = new User({ name, email, role });
  user.setPassword(password);
  try {
    const userRecord = await user.save();
    ctx.status = 200;
    ctx.body = {
      user: userRecord.toAuthJSON(),
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: err };
  }
});

router.post('/api/user/signin', async (ctx) => {
  const {
    email, password,
  } = ctx.request.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.isValidPassword(password)) {
      ctx.status = 200;
      ctx.body = {
        user: user.toAuthJSON(),
      };
    } else {
      ctx.status = 400;
      ctx.body = { error: 'Invalid credentials' };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: err };
  }
});

export default router;
