const SERVER_PORT = process.env.PORT || 5000;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "1C77AnNXd@+2";

VALIDATE_EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

VALIDATE_DATE_REGEX =
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;

module.exports = {
  SERVER_PORT,
  ACCESS_TOKEN_SECRET,
  VALIDATE_EMAIL_REGEX,
  VALIDATE_DATE_REGEX,
};
