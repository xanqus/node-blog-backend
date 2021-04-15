import jwt from 'jsonwebtoken';

const jwtMiddleware = (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) {
    console.log('no token!!!');
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    console.log('state', decoded._id, decoded.username);
    console.log(decoded);
    console.log('token!!!');
    return next;
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
