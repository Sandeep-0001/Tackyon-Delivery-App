import express from 'express';
import passport from 'passport';
import { signUp, signIn, getCurrentUser, googleCallback } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/signup', signUp);
router.post('/signin', signIn);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
  passport.authenticate('google', { 
    session: false,
    failureRedirect: '/signin' 
  }),
  googleCallback
);

// Protected route
router.get('/me', authMiddleware, getCurrentUser);

export default router;
