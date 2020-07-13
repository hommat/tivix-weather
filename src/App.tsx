import React, { Fragment, useState } from "react";

import Form from "./components/Form";
import Statistics from "./components/Statistics";
import { WeatherGet, WeatherGetTrackers } from "./utils/Weather";

function App() {
  const [city, setCity] = useState<string>("");
  const [trackers, setTrackers] = useState<WeatherGetTrackers | null>(null);

  function updateWeather({ cityName, trackers }: WeatherGet) {
    setCity(cityName);
    setTrackers(trackers);
  }

  return (
    <Fragment>
      <header>
        <h1>Weather app</h1>
      </header>
      <main>
        <Form updateWeather={updateWeather} />
        {city && trackers && <Statistics city={city} trackers={trackers} />}
      </main>
    </Fragment>
  );
}

export default App;
