import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR = "ERROR";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
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
  function cancleAppointment() {
    transition(DELETING);
    cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
    .catch(() => {
      transition(ERROR);
    })
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} />}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm
        message="Do you want to cancel the appointment?"
        onCancel={() => back(SHOW)}
        onConfirm={cancleAppointment}
        />}
      {mode === ERROR && <Error message="Something went wrong" onClose={() => back(SHOW)} /> }
      {mode === EDIT && <Form student={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onCancel={() => back(EMPTY)} onSave={save} />}

    </article>
  )
}