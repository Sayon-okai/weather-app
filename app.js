import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});


// Handle form submission
app.post('/search', async (req, res) => {
  const cityName = req.body.city;
  const resultCount = 1;
  let startDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  let endDate = startDate; // Set end date to the same as start date for current weather data
  
  console.log(`Current date: ${startDate}`);
  console.log(`Received city name: ${cityName}`);

  try {
    const result = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?count=${resultCount}&name=${cityName}`
    );

    console.log('Geocoding API response:', result.data.results[0]);
    const { latitude, longitude, timezone } = result.data.results[0];
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Timezone: ${timezone}`);

    const weatherResult = await axios.get(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,temperature_2m_mean,apparent_temperature_max,relative_humidity_2m_max&timezone=auto`
    );

    const weather = weatherResult.data;
   

    res.render('index.ejs', {
      result: result.data.results[0],
      weather,
      error: null

    });
    
    console.log(weather);

  } catch (error) {
    res.render('index.ejs', { weather: null, error: 'City not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});