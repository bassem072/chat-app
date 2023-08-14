export const checkRequiredParams = (params) => {
  return (req, res, next) => {
    const missed = [];
    params.map((param) => {
      if (!req.body[param]) {
        missed.push(param);
      }
    });

    if (missed.length > 0) {
      return res
        .status(400)
        .json({ message: "param_not_found", params: missed });
    }

    next();
  };
};
