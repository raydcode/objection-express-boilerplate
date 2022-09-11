 const authErrors = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.log(err); // You will still want to log the error...
    // but we don't want to send back internal operation details
    // like a stack trace to the client!
    res.status(err.status).json({ errors: [{ message: err.message }] });
    res.end();
  }
};

export default authErrors