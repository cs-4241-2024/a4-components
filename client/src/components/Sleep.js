import { useEffect, useState } from 'react';

function Sleep({ activity, editingIndex, onSubmit }) {
  const [sleepDate, setSleepDate] = useState('');
  const [sleepTime, setSleepTime] = useState('');

  useEffect(() => {
    if (activity) {
      setSleepDate(activity.details.sleepDate);
      setSleepTime(activity.details.sleepTime);
    }
  }, [activity])

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit('sleep', {
      sleepDate,
      sleepTime
    })
  }

  return (
    <form id="activity-form" onSubmit={onFormSubmit}>
      <h3>Sleep Form</h3>
      <label htmlFor="sleep-date">Date of Sleep:</label>
      <input type="date" id="sleep-date" name="sleep-date" value={sleepDate} onChange={e => setSleepDate(e.target.value)}
             required />

        <label htmlFor="sleep-time">Time of Sleep:</label>
        <input type="time" id="sleep-time" name="sleep-time" value={sleepTime} onChange={e => setSleepTime(e.target.value)}
               required />

          <button type="submit">{editingIndex !== null ? 'Edit Sleep' : 'Add Sleep'}</button>
    </form>
  )
}

export default Sleep;
