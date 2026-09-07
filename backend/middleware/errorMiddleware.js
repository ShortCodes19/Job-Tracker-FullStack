const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  if (typeof err === "string") {
    return res.status(400).json({
      message: err,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Invalid job data",
      errors: Object.values(err.errors).map(
        (validationError) => validationError.message,
      ),
    });
  }

  res.status(500).json({
    message: "Something went wrong!",
  });
};

export default errorMiddleware;
