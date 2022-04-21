const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors')

app.use(express.json());

app.use(cors({origin: 'http://localhost:3000'}));

const crewsRouter = require('./routes/crews');
app.use('/crews', crewsRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const modulesRouter = require('./routes/modules');
app.use('/modules', modulesRouter);

const requestsRouter = require('./routes/requests');
app.use('/requests', requestsRouter);

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log(`Express Server is listening on port ${PORT}.`);
})

module.exports = app;