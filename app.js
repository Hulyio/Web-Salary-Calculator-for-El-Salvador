var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var salarioRouter = require('./routes/salario');

var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://junovicz:yasemeolvido@nocturnecluster-9fgvr.mongodb.net/Parcial3DB?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  console.log("Connected to julio's database");
});

/*var Salario = require("./models/Salario"); // Importa modelo

// Crear un nuevo usuario pasando un objeto con los valores de cada propiedad
new Salario({ 
  username: "julio",
  salario: 700,
  salario_sin_descuento: 800,
  descuento_renta: 50.47,
  descuento_iss: 12.67,
  descuento_afp: 25.78
}).save(); // ejecutar el método save*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/salario', salarioRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
