import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const { id, time, interview, interviewers, bookInterview } = props;
  console.log("props in appointment::", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";


  const {mode, transition, back} = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    // const {bookInterview} = props;
    const interview = {
      student: name,
      interviewer
    };
    console.log("interview on appointment", interview);
    bookInterview(id, interview);
    transition(SHOW);
    
    // transition(SAVING);
    // bookInterview(props.id, interview);

  }
  

return (
  <article className="appointment">
    <Header time={time} />
    {mode === EMPTY && <Empty onAdd ={() => transition(CREATE)} />}
    {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />}
    {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back(EMPTY)} onSave={(name, interviewer) => save(name, interviewer)} />}
    {mode === SAVING && <Status message="Saving"/>}

  </article>
)
}