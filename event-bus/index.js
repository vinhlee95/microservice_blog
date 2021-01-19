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
  try {
    axios.post('http://posts-cluster-ip-service:4000/events', event);
    axios.post('http://comment-cluster-ip-service:4001/events', event);
    axios.post('http://query-cluster-ip-service:4002/events', event);
    axios.post('http://moderation-cluster-ip-service:4003/events', event);
  } catch(error) {
    console.error(`Error in notifying event: ${event} for service`, error)
  }

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
