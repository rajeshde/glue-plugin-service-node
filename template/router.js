module.exports = () => [
  {
    "server_name": "api"
  },
  {
    "path": "/backend/services/(.*)",
    "proxy": {
      "instance": `services:${process.env.APP_PORT}`,
      "path": "/$1"
    }
  }
];
