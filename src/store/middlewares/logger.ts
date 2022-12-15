import { Middleware } from 'redux';

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log(store);
  console.log(action);

  next(action);
};

export default loggerMiddleware;
