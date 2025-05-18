// Vercel Serverless Function Entry Point
const { default: handler } = require('../server/dist/index');

// Export the handler function for Vercel
module.exports = async (req, res) => {
  return handler(req, res);
};
