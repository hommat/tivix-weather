import React from "react";

import DataTracker from "../utils/DataTracker";
import { SStatisticsCard, SHeading, SListItem } from "./StatisticsCard.style";

interface StatisticsCardProps {
  title: string;
  tracker: DataTracker;
  endsWith: string;
}

function StatisticsCard({ title, tracker, endsWith }: StatisticsCardProps) {
  return (
    <SStatisticsCard>
      <SHeading>{title}</SHeading>
      <ul>
        <SListItem>
          Min: {tracker.showMin()}
          {endsWith}
        </SListItem>
        <SListItem>
          Max: {tracker.showMax()}
          {endsWith}
        </SListItem>
        <SListItem>
          Mean: {Math.round(tracker.showMean()! * 100) / 100}
          {endsWith}
        </SListItem>
        <SListItem>
          Mode: {tracker.showMode()}
          {endsWith}
        </SListItem>
      </ul>
    </SStatisticsCard>
  );
}

export default StatisticsCard;
