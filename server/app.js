const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const compression = require('koa-compress');
const serve = require('koa-static');
const { render } = require('./render');

const app = new Koa();
const router = new Router();
const rootPath = path.resolve(__dirname, '..', 'build/');



// Routes
// -----------------------------------------
async function renderPage(context, next) {
  const url = context.url;
  try {
    context.body = await render(url);
  } catch(err) {
    console.error(err);
  }
}

router.get('/api', (context, next) => {
  context.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  });
  context.body = {}; // JSON.stringify({})
  return next();
});

router.get('/', renderPage);   // router.use('^/$', renderPage);
router.get(/\.?/, serve(rootPath)); // anything w/ extension
router.get('/:page', renderPage);



// Middlewares
// -----------------------------------------

// Logger
app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${context.method} ${context.url} - ${ms}ms`);
});

// Error Handling
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    context.status = err.status || 500;
    context.body = err.message;
    if (process.env.NODE_ENV === 'production') {
      context.app.emit('error', err, context);
    }
  }
});

// Support Gzip
app.use(compression());

// Set up Routes
app.use(router.routes());


// export default app;
module.exports = app;