import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {
    weather: null, noResult: 'No search results found!', 
     error: null
  });
});


// Handle form submission
app.post('/search', async (req, res) => {
  const cityName = req.body.city;
  const temperatureUnit = req.body.units || 'celsius'; // Default to Celsius if not provided
  console.log(`Received temperature unit: ${temperatureUnit}`);
  let resultCount = 1; // Limit the number of results to 1 for simplicity
  const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
                    
  let startDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  let endDate = startDate; // Set end date to the same as start date for current weather data
  
  console.log(`Current date: ${startDate}`);
  console.log(`Received city name: ${cityName}`);

  try {
    // API call to get latitude and longitude for the city using the geocoding API
  
    const result = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?count=${resultCount}&name=${cityName}`
    );

    console.log('Geocoding API response:', result.data.results[0]);
    // create a variable to store the latitude and longitude from the geocoding API response
    // This will be used to make the second API call to get the weather data for the specific location.
    const { latitude, longitude, timezone } = result.data.results[0];
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Timezone: ${timezone}`);

    const weatherResult = await axios.get(
      // Only accept latitude, and longitude to get a location-specific weather data.
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=wind_speed_10m_max,precipitation_sum,temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_mean,weather_code&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,precipitation,apparent_temperature,wind_speed_10m&timezone=auto&temperature_unit=${temperatureUnit}`
    );
  
    console.log('Weather API response:', weatherResult.data);
    
    const weather = weatherResult.data;
    const date = new Date(weather.current.time);


    console.log('Current time:', weather.daily.time);

    res.render('index.ejs', {
      result: result.data.results[0],
      weather,
      noResult: 'No search results found!',
      longDate: date.toLocaleDateString('en-US', options),
      error: null

    });
    

  } catch (error) {
    res.render('index.ejs', {
      weather: null,
      error: `We couldn't connect to the server (API error), Please
        try again in few moments.
      `,
      noResult: null
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});