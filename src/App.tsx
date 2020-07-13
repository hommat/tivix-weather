import React, { Fragment, useState } from "react";

import Form from "./components/Form";
import Statistics from "./components/Statistics";
import GlobalStyle from "./styles/GlobalStyle";
import { WeatherGet, WeatherGetTrackers } from "./utils/Weather";
import { SMain, SHeader } from "./App.style";

function App() {
  const [city, setCity] = useState<string>("");
  const [trackers, setTrackers] = useState<WeatherGetTrackers | null>(null);

  function updateWeather({ cityName, trackers }: WeatherGet) {
    setCity(cityName);
    setTrackers(trackers);
  }

  return (
    <Fragment>
      <GlobalStyle />
      <SMain>
        <SHeader>
          <h1>Weather app</h1>
        </SHeader>
        <Form updateWeather={updateWeather} />
        {city && trackers && <Statistics city={city} trackers={trackers} />}
      </SMain>
    </Fragment>
  );
}

export default App;
