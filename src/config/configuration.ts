export default () => ({
  port: 8000,
  discord: {
    clientID: '1234567890',
    clientSecret: '1234567890',
    callbackURL: 'http://localhost:8000/auth/discord/callback',
    scope: ['identify', 'email'],
  },
  mongodb: {
    uri: 'mongodb://root:1234@localhost:27017/mydb?authSource=admin',
  },
  redis: {
    host: 'localhost',
    port: 9005,
  },
  session: {
    secret: '1234567890',
  },
});
