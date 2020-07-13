import React from "react";

import StatisticsCard from "./StatisticsCard";
import { SHeading, SCards } from "./Statistics.style";
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
      <SHeading>{city}</SHeading>
      <SCards>
        {!morningTemperature.isEmpty() && (
          <StatisticsCard
            title="Morning temperature"
            tracker={morningTemperature}
            endsWith="C"
          />
        )}

        {!dayTemperature.isEmpty() && (
          <StatisticsCard
            title="Day temperature"
            tracker={dayTemperature}
            endsWith="C"
          />
        )}

        {!nightTemperature.isEmpty() && (
          <StatisticsCard
            title="Night temperature"
            tracker={nightTemperature}
            endsWith="C"
          />
        )}

        {!humidity.isEmpty() && (
          <StatisticsCard title="Humidity" tracker={humidity} endsWith="%" />
        )}
      </SCards>
    </section>
  );
}

export default Statistics;
