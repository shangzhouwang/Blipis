const logRequest = (req, res, next) => {
  console.log('Log Request', req.path);
  next();
}

module.exports =logRequest