const express = require('express');
const fetch = require('isomorphic-fetch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const weatherAPIKey = 'cb431ab475514264a0c184728230306';

app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;

  try {
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        const url = `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${encodeURIComponent(city)}`;
        const response = await fetch(url);
        const data = await response.json();

        return { [city]: data.current.temp_c + 'C' };
      })
    );

    const weather = weatherData.reduce((result, item) => {
      return { ...result, ...item };
    }, {});

    res.setHeader('Access-Control-Allow-Origin', '*'); // Set CORS headers
    res.json({ weather });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
