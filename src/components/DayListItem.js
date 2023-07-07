import classNames from "classnames";

import React from "react";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  const formatSpots = function(numOfSpots) {
    if (numOfSpots === 0) {
      return "no spots remaining"

    } else if (numOfSpots === 1) {
      return `${numOfSpots} spot remaining`

    } else {
      return `${numOfSpots} spots remaining`;
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}