function ActivityList({ activities, onEdit, onDelete }) {

  return (
    <ul id="activity-list">
      <h2>Your Activity List</h2>
      <table id="activity-table">
        <thead>
        <tr>
          <th>Activity Type</th>
          <th>Details</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {
            activities.map(activity => {
              let details = '';
              if (activity.activityType === 'work') {
                details = `Course: ${activity.details.course}, DDL: ${activity.details.ddl}, Expected: ${activity.details.expectedTime}, Actual: ${activity.details.actualTime}`;
              } else if (activity.activityType === 'entertainment') {
                details = `Type: ${activity.details.entertainmentType}`;
              } else if (activity.activityType === 'sleep') {
                details = `Date: ${activity.details.sleepDate}, Time: ${activity.details.sleepTime}`;
              }
              return (
                <tr key={activity._id}>
                  <td>{activity.activityType}</td>
                  <td>{details}</td>
                  <td><button onClick={() => onEdit(activity)}>Edit</button></td>
                  <td><button onClick={() => onDelete(activity)}>Delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </ul>
  )
}

export default ActivityList;
