import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './todo-list-item.css';

function TodoListItem(props) {
  const { label, id, completed, onDelete, onCompleted, date } = props;
  let status = '';
  if (completed) {
    status += 'completed';
  }

  return (
    <li className={status}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={completed} onChange={onCompleted} />
        <label htmlFor={id}>
          <span className="description">{label}</span>
          <span className="created">created {formatDistanceToNow(date, { includeSeconds: true })}</span>
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
