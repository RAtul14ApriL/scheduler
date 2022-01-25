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
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  
  const {mode, transition, back} = useVisualMode(
    interview ? SHOW : EMPTY
    );
    
    function save(name, interviewer) {
      transition(SAVING);
      const interview = {
        student: name,
        interviewer
      };
      bookInterview(id, interview)
      .then(() => transition(SHOW))
    }
    console.log("Interview at Index.js --> ", interview);
    
    return (
      <article className="appointment">
    <Header time={time} />
    {mode === EMPTY && <Empty onAdd ={() => transition(CREATE)} />}
    {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />}
    {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
    {mode === SAVING && <Status message="Saving"/>}

  </article>
)
}