const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret || !jwtSecret.trim()) {
  throw new Error('JWT_SECRET must be set to a strong private value before starting the server.');
}

module.exports = {
    jwtSecret: jwtSecret
}
