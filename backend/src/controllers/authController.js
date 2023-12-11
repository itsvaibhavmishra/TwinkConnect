export const register = async (req, res, next) => {
  try {
    res.send(req.body);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    res.send("hello from login api");
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.send("hello from logout api");
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    res.send("hello from refreshTokens api");
  } catch (error) {
    next(error);
  }
};
