const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  // Notify other services
  axios.post('http://posts-cluster-ip-service:4000/events', event);
  axios.post('http://comment-cluster-ip-service:4001/events', event);
  axios.post('http://event-bus-cluster-ip-service:4002/events', event);
  // axios.post('http://localhost:4003/events', event);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
