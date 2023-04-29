// const { createProxyMiddleware } = require("http-proxy-middleware");
// const proxy = {
//   target: "https://www.naver.com",
//   changeOrigin: true,
// };
// module.exports = function (app) {
//   app.use("/v1", createProxyMiddleware(proxy));
// };

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/v1", {
      target: "http://127.0.0.1:8082/",
      secure: false,
      pathRewrite: { "^/v1/": "/" },
      changeOrigin: true,
      autoRewrite: true,
    })
  );
};
