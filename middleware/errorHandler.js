const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;

  if (errors.length > 1) {
    const formattedErrors = errors.join(" ");
    res.status(code).json({ messages: formattedErrors, fields: fields });
  } else {
    res.status(code).json({ messages: errors, fields: fields });
  }
};

const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `${field} already exists.`;
  res.status(code).json({ messages: error, fields: field });
};

const handeInvalidToken = (err, res) => {
  const error = "Invalid Token";
  res.status(400).json({ messages: error, fields: "Authorization Token" });
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === "JsonWebTokenError") return handeInvalidToken(err, res);
  if (err.name === "ValidationError") return handleValidationError(err, res);
  if (err.code && err.code == 11000) return handleDuplicateKeyError(err, res);

  res.status(500).json({ error: "something went wrong" });
};

module.exports = errorHandler;
