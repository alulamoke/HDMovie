const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const database = require('./config/database');
const errorMiddleWare = require('./middlewares/error');

const app = express();

// ENV
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

//Production
if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname + '../../../client/build/index.html'));
  });
}

// DB setup
database();

// Routes
const configRouter = require('./config/config.controller');
const adminRouter = require('./api/admin/admin.routes');
const castRouter = require('./api/cast/cast.routes');
const genreRouter = require('./api/genre/genre.routes');
const movieRouter = require('./api/movie/movie.routes');
const userRouter = require('./api/user/user.routes');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));
app.use(helmet());

//Custom middlewares
app.use('/api/v1/config', configRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/cast', castRouter);
app.use('/api/v1/genre', genreRouter);
app.use('/api/v1/movie', movieRouter);
app.use('/api/v1/user', userRouter);

app.use('/api/v1/uploads', express.static('uploads'));

app.use(errorMiddleWare.notFound);
app.use(errorMiddleWare.errorHandler);

//PORT
const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
