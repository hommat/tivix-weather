import React from "react";

import StatisticsCard from "./StatisticsCard";
import { WeatherGetTrackers } from "../utils/Weather";

interface StatisticsProps {
  city: string;
  trackers: WeatherGetTrackers;
}

function Statistics({ city, trackers }: StatisticsProps) {
  const {
    morningTemperature,
    dayTemperature,
    nightTemperature,
    humidity,
  } = trackers;
  return (
    <section>
      <h2>{city}</h2>
      {!morningTemperature.isEmpty() && (
        <StatisticsCard
          title="Morning temperature"
          tracker={morningTemperature}
        />
      )}

      {!dayTemperature.isEmpty() && (
        <StatisticsCard title="Day temperature" tracker={dayTemperature} />
      )}

      {!nightTemperature.isEmpty() && (
        <StatisticsCard title="Night temperature" tracker={nightTemperature} />
      )}

      {!humidity.isEmpty() && (
        <StatisticsCard title="Humidity" tracker={humidity} />
      )}
    </section>
  );
}

export default Statistics;
