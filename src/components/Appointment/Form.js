import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const { student, interviewer, interviewers, onSave } = props;

  const [name, setName] = useState(student || "");
  const [interviewerId, setInterviewerId] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setError("");
    setInterviewerId(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const validate = () => {
    if (name === "") {
      setError("student name cannot be blank");
      return;
    }
    onSave(name, interviewerId);
    setError("");
  } 

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewerId}
          onChange={setInterviewerId}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}