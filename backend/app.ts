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
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Frontend URL
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

// Add a keep-alive endpoint to prevent the server from sleeping
app.get('/keep-alive', (req, res) => {
    res.status(200).send('Server is alive');
});

export default app;
