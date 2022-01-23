import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  const { id, time, interview } = props;

return (
  <article className="appointment">
    <Header time={time} />
    {interview ? <Show key={id} time={time} student={interview.student} interviewer={interview.interviewer} /> : <Empty />}
  </article>
)
}