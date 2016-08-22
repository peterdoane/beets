const jwt = require('jsonwebtoken');

// ...

const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3); // 3 hours
const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', {
  expiresIn: '3h'
});

res.cookie('accessToken', token, {
  httpOnly: true,
  expires: expiry,
  secure: router.get('env') === 'production'
});
res.cookie('loggedIn', false, {
  expires: expiry,
  secure: router.get('env') === 'production'
});

// ...

res.clearCookie('accessToken');
res.clearCookie('loggedIn');
