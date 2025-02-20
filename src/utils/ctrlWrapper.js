export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      console.log(err);
      /*check build*/
      next(err);
    }
  };
};
