import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly weatherApiKey = process.env.WEATHER_API_KEY;
  private readonly weatherApiBaseUrl =
    'https://api.openweathermap.org/data/2.5/weather';

  async getWeather(city: string): Promise<any> {
    try {
      const url = `${this.weatherApiBaseUrl}?q=${city}&appid=${this.weatherApiKey}`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      throw new Error(`Error fetching weather data`);
    }
  }
}
