import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './todo-list-item.css';
import '../todo-list/todo-list.css';

function TodoListItem(props) {
  const { label, id, completed, onDelete, onCompleted, date, timerTime, startTimer, stopTimer } = props;
  let status = '';
  if (completed) {
    status += 'completed';
  }

  const timerMinutes = Math.floor(timerTime / 60);
  const timerSeconds = timerTime % 60 < 10 ? `0${timerTime % 60}` : timerTime % 60;

  return (
    <li className={status}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onCompleted} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={startTimer} type="button" />
            <button className="icon icon-pause" onClick={stopTimer} type="button" />
            <span className="timer">
              {timerMinutes}:{timerSeconds}
            </span>
          </span>
          <span className="description">created {formatDistanceToNow(date, { includeSeconds: true })}</span>
        </label>
        <button className="icon icon-edit" type="button" />
        <button className="icon icon-destroy" onClick={onDelete} type="button" />
      </div>
      <input type="text" className="edit" defaultValue="Editing task" />
    </li>
  );
}

TodoListItem.propTypes = {
  label: PropTypes.string,
  onCompleted: PropTypes.func,
  onDelete: PropTypes.func,
  completed: PropTypes.bool,
};

export default TodoListItem;
