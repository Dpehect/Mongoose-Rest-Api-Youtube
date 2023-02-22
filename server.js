const express = require('express');
const path = require('path');
const bookRouter = require('./routes/books');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.set('strictQuery', true);
// Connect to MongoDB
mongoose.connect('mongodb+srv://username:password@cluster0.olfqcop.mongodb.net/books', { useNewUrlParser: true });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride("_method"));

// Routes
app.use('/books', bookRouter);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
