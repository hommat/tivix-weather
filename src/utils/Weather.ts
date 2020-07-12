import DataTracker from "./DataTracker";

export interface WeatherGet {
  cityName: string;
  trackers: WeatherGetTrackers;
}

interface WeatherGetTrackers {
  dayTemperature: DataTracker;
  nightTemperature: DataTracker;
  morningTemperature: DataTracker;
  humidity: DataTracker;
}

export interface WeatherListItem {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
}

enum DayTime {
  Day,
  Night,
  Morning,
}

class Weather {
  async get(city: string): Promise<null | WeatherGet> {
    const endpoint = this.createEndpoint(city);

    try {
      const data = await fetch(endpoint);
      const { city, list } = await data.json();
      const trackers = this.convertWeatherListToTrackers(list);
      return { cityName: city.name, trackers };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private createEndpoint(city: string) {
    const appid = process.env.REACT_APP_API_KEY;
    return `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${appid}`;
  }

  private convertWeatherListToTrackers(
    weatherList: WeatherListItem[]
  ): WeatherGetTrackers {
    const dayTemperatureTracker: DataTracker = new DataTracker();
    const nightTemperatureTracker: DataTracker = new DataTracker();
    const morningTemperatureTracker: DataTracker = new DataTracker();
    const humidityTracker: DataTracker = new DataTracker();

    weatherList.forEach(({ dt_txt, main: { humidity, temp } }) => {
      humidityTracker.insert(humidity);

      const dayTime = this.getDayTime(dt_txt);
      if (dayTime === DayTime.Day) dayTemperatureTracker.insert(temp);
      else if (dayTime === DayTime.Night) nightTemperatureTracker.insert(temp);
      else morningTemperatureTracker.insert(temp);
    });

    return {
      dayTemperature: dayTemperatureTracker,
      nightTemperature: nightTemperatureTracker,
      morningTemperature: morningTemperatureTracker,
      humidity: humidityTracker,
    };
  }

  private getDayTime(dateTimeTxt: string): DayTime {
    const hour = parseInt(dateTimeTxt.substring(11, 13));

    if (hour >= 5 && hour <= 11) return DayTime.Morning;
    if (hour >= 12 && hour <= 21) return DayTime.Day;
    return DayTime.Night;
  }
}

export default Weather;
