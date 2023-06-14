import React from "react";

import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer} = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });
  const interviewerImgClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": selected
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected && name}
  </li>
  );
}