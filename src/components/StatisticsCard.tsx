import React from "react";

import DataTracker from "../utils/DataTracker";

interface StatisticsCardProps {
  title: string;
  tracker: DataTracker;
}

function StatisticsCard({ title, tracker }: StatisticsCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        <li>Min: {tracker.showMin()}</li>
        <li>Max: {tracker.showMax()}</li>
        <li>Mean: {Math.round(tracker.showMean()! * 100) / 100}</li>
        <li>Mode: {tracker.showMode()}</li>
      </ul>
    </div>
  );
}

export default StatisticsCard;
