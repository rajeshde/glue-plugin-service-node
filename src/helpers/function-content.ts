
export const functionContent = `
module.exports = (req, res, next) => {
  return res.status(200).json({ status: true, message: "Hello World!" });
};
`;
