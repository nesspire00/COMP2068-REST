const express = require('express');

const router = express.Router();

const weatherdata = [
  {
    city: 'Barrie',
    province: 'ON',
    temperature: 20,
    weather_condition: 'Sunny',
  },
  {
    city: 'Toronto',
    province: 'ON',
    temperature: 25,
    weather_condition: 'Flurries',
  },
  {
    city: 'Orillia',
    province: 'ON',
    temperature: 18,
    weather_condition: 'Overcast',
  },
];

// GET / - welcome page for our API
router.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to our API' });
});

// GET /weather - READ functionality
router.get('/weather', (req, res) => {
  res.json(weatherdata);
});

// GET /weather/:id - READ functionality
router.get('/weather/:city', (req, res) => {
  let weather;

  for (let i = 0; i < weatherdata.length; i++) {
    if (weatherdata[i].city == req.params.city) {
      weather = weatherdata[i];
    }
  }
  res.json(weather);
});

// PUT /weather/:city - UPDATE functionality
router.put('/weather/:city', (req, res) => {
  let weather;

  for (let i = 0; i < weatherdata.length; i++) {
    if (weatherdata[i].city == req.params.city) {
      weather = weatherdata[i];
    }
  }

  weather.temperature = req.body.temperature;

  console.log(weather); // View the newly updated object for demonstration

  res.json({ message: 'Weather updated!' });
});

// DELETE /weather/:city - DELETE functionality
router.delete('/weather/:city', (req, res) => {
  let weatherId;

  for (let i = 0; i < weatherdata.length; i++) {
    if (weatherdata[i].city == req.params.city) {
      weatherId = i;
    }
  }
  weatherdata.splice(weatherId, 1);

  console.log(weatherdata); // For demonstration

  res.json({ message: 'Record deleted!' });
});

// POST /weather - CREATE functionality
router.post('/weather', (req, res) => {
  const weather = {
    city: req.body.city,
    province: req.body.prov,
    temperature: req.body.temp,
    weather_condition: req.body.weather,
  };

  weatherdata.push(weather);

  console.log(weatherdata); // For demonstration

  res.json({ message: 'Record Added!' });
});

module.exports = router;
