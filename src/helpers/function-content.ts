
export const functionContent = `
module.exports = (req, res, _next) => {
  // do something with the headers & body
  console.log({ headers: req.headers, body: req.body });

  return res.status(200).json({ status: true, message: "Hello World!" });
};
`;
