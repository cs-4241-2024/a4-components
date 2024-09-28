import { useEffect, useState } from 'react';

function WorkForm({ activity, editingIndex, onSubmit }) {
  const [course, setCourse] = useState('');
  const [ddl, setDdl] = useState('');
  const [expectedTime, setExpectedTime] = useState('');
  const [actualTime, setActualTime] = useState('');

  useEffect(() => {
    if (activity) {
      setCourse(activity.details.course)
      setDdl(activity.details.ddl)
      setExpectedTime(activity.details.expectedTime)
      setActualTime(activity.details.actualTime)
    }
  }, [activity])

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit('work', {
      course,
      ddl,
      expectedTime,
      actualTime
    })
  }

  return (
    <form id="activity-form" onSubmit={onFormSubmit}>
      <h3>Work Form</h3>
      <label htmlFor="course">Course:</label>
      <input type="text" id="course" name="course" value={course} onChange={e => setCourse(e.target.value)} required />

      <label htmlFor="ddl">Deadline (DDL):</label>
      <input type="date" id="ddl" name="ddl" value={ddl} onChange={e => setDdl(e.target.value)} required />

      <label htmlFor="expected-time">Expected Finish Time:</label>
      <input type="time" id="expected-time" onChange={e => setExpectedTime(e.target.value)} name="expected-time"
             value={expectedTime} required />

      <label htmlFor="actual-time">Actual Finish Time:</label>
      <input type="time" id="actual-time" name="actual-time" onChange={e => setActualTime(e.target.value)}
             value={actualTime} />

      <button type="submit">{editingIndex !== null ? 'Edit Work' : 'Add Work'}</button>
    </form>
  )
}

export default WorkForm;
