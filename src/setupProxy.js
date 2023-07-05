const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use(
  //     '/api',
  //     createProxyMiddleware({
  //         logLevel: 'debug',
  //         target: 'http://localhost:6789',
  //         changeOrigin: true,
  //         // 去掉我们添加的前缀，保证我们传递给后端的接口是正常的
  //         pathRewrite: { "^/api": '' }
  //     })
  // );
  app.use(
    '/admin',
    createProxyMiddleware({
      logLevel: 'debug',
      target: '',
      changeOrigin: true,
      // 去掉我们添加的前缀，保证我们传递给后端的接口是正常的
      pathRewrite: { '^/admin': '/' },
    })
  );
};
