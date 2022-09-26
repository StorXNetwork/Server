const jwt = require('jsonwebtoken');
const passport = require('passport');

function passportAuth(req, res, next) {
  // TODO: If res.locals.skipPassport is true, call next() directly.

  if (res.locals.skipPassport) {
    next();
  }

  const authCheck = passport.authenticate(
    'jwt',
    { session: false },
    (err, user, info) => {
      if (err) {
        return res.status(401).send({ error: 'Invalid user.' });
      } else {
        req.user = user.dataValues;
        next();
      }
    }
  );
  authCheck(req);
}

function apiAccessKeyCheckAuth(services) {
  return (req, res, next) => {
    if (req.headers['x-api-access-key']) {
      const headerAccessKey = req.headers['x-api-access-key'];

      // Condition to check whether user with this API KEY exits;
      services.User.FindUserByLiveApplicationKey(headerAccessKey)
        .then((userData) => {
          if (userData) {
            let user = userData;
            if (user.mnemonic) user.mnemonic = user.mnemonic.toString();
            // Get user and assign it to req.user
            res.locals.skipPassport = true;
            req.user = user;
            next();
          } else {
            next();
          }
        })
        .catch((err) => {
          Logger.error('Access key user retrieve error : ', err.message);
          next();
        });
    } else {
      next();
    }
  };
}

function Sign(data, secret, useNewToken = false) {
  const token = useNewToken
    ? jwt.sign({ email: data }, secret, { expiresIn: '14d' })
    : jwt.sign(data, secret);

  return token;
}

// eslint-disable-next-line no-unused-vars
function Verify(token, secret) {
  throw Error('Not implemented yet');
}

module.exports = {
  passportAuth,
  apiAccessKeyCheckAuth,
  Sign,
  Verify,
};
