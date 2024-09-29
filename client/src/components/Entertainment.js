import { useEffect, useState } from 'react';

function Entertainment({ activity, editingIndex, onSubmit }) {
  const [entertainmentType, setEntertainmentType] = useState("video-game");

  useEffect(() => {
    if (activity) {
      setEntertainmentType(activity.details.entertainmentType);
    }
  }, [activity])

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit('entertainment', {
      entertainmentType
    })
  }

  return (
    <form id="activity-form" onSubmit={onFormSubmit}>
      <h3>Entertainment Form</h3>
      <label htmlFor="entertainment-type">Type of Entertainment:</label>
      <select id="entertainment-type" name="entertainment-type" value={entertainmentType} onChange={e => setEntertainmentType(e.target.value)}>
        <option value="video-game">Video Game</option>
        <option value="music">Music</option>
        <option value="fitness">Fitness</option>
      </select>
      <button type="submit">{editingIndex !== null ? 'Edit Entertainment' : 'Add Entertainment'}</button>
    </form>
  )
}

export default Entertainment;
