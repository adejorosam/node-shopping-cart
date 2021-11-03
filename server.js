const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colour');
const xss = require('xss');
const errorHandler = require('./middleware/error');
const db = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });



// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

// Route files
const authRoutes = require("./routes/user");
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const app = express();

// Body parser
app.use(express.json());



// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', (req, res)  => {
  return res.json("Welcome to Cart Service API")
})
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/', categoryRoutes);
app.use('/api/v1/', productRoutes)



app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});