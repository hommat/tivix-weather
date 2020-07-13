import React, { Fragment, useState } from "react";

import Form from "./components/Form";
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
      <main>
        <section>
          <Form updateWeather={updateWeather} />
        </section>
        <section></section>
      </main>
    </Fragment>
  );
}

export default App;
