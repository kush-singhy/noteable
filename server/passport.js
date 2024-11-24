import { GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/noteable',
  })
);
