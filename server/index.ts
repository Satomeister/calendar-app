import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import jwt from 'jsonwebtoken'

dotenv.config({
  path: 'server/.env',
});

import './core/db';
import passport from './core/passport';

const app = express();

app.use(cors());
app.use(express.json())
app.use(passport.initialize());

app.get('/test', (req, res) => {
  res.send('TEST WORK');
});

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }),
  function (req, res) {
    // @ts-ignore
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.EXPIRES_IN,
    })

    res.redirect(`http://localhost:3000/auth?token=${token}`);
  }
);

app.get('/me', passport.authenticate('jwt'), (req, res) => {
  return res.status(200).json({user: req.user})
});

app.listen(3001, () => {
  console.log('Server is running');
});
