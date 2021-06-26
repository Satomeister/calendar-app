import passport from 'passport';
import { Strategy } from 'passport-github';
import {ExtractJwt} from 'passport-jwt'
import {Strategy as JWTStrategy} from 'passport-jwt'

// @ts-ignore
import { User } from '../../models';

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET as string,
      jwtFromRequest: ExtractJwt.fromHeader("token"),
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({where: {id: payload.userId}})
        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:3001/auth/github/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const candidate = await User.findOne({
          where: { name: profile.displayName },
        });
        if (!candidate) {
          const data = {
            name: profile.displayName,
            photoUrl: profile.photos?.[0].value,
          };
          const newUser = await User.create(data);
          return done(null, newUser);
        }
        done(null, candidate);
      } catch (error) {
        done(null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // @ts-ignore
  user.findOne(id, function (err, user) {
    err ? done(err) : done(null, user);
  });
});

export default passport;
