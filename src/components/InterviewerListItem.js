import classNames from "classnames";
import React from "react";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {

  const { name, avatar, selected, onChange } = props;

  let listClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  })

  return (
    <li className={listClass} onClick={onChange} >
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected ? name : null}
    </li>
  );
}