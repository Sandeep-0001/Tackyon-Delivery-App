import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from './src/config/passport';
import orderRoutes from './src/routes/orderRoutes';
import routeRoutes from './src/routes/routesRoutes';
import authRoutes from './src/routes/authRoutes';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));

app.use(bodyParser.json());

// Session configuration for passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/routes', routeRoutes);

export default app;
