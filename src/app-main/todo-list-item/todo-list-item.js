import { Context } from '../../context';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import './todo-list-item.css';
import '../todo-list/todo-list.css';
import { useState, useEffect, useContext } from 'react';

const classNames = require('classnames');

function TodoListItem(props) {
  const { label, id, completed, date, time, pause } = props;
  const [timeInSeconds, setTimeInSeconds] = useState(time);
  const {
    taskFunctions: { startTimer, stopTimer, onToggleCompleted, deleteItem },
  } = useContext(Context);

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const taskClassNames = classNames({ completed });

  useEffect(() => {
    if (pause || timeInSeconds === 0) {
      return;
    }
    const interval = setInterval(() => {
      if (timeInSeconds > 0) setTimeInSeconds(timeInSeconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [pause, timeInSeconds]);

  const formatedSeconds = seconds < 10 ? `0${seconds % 60}` : seconds;

  return (
    <li className={taskClassNames}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={completed} onChange={() => onToggleCompleted(id)} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => startTimer(id)} type="button" />
            <button className="icon icon-pause" onClick={() => stopTimer(id)} type="button" />
            <span className="timer">
              {minutes}:{formatedSeconds}
            </span>
          </span>
          <span className="description">created {formatDistanceToNow(date, { includeSeconds: true })}</span>
        </label>
        <button className="icon icon-edit" type="button" />
        <button className="icon icon-destroy" onClick={() => deleteItem(id)} type="button" />
      </div>
      <input type="text" className="edit" defaultValue="Editing task" />
    </li>
  );
}

TodoListItem.propTypes = {
  label: PropTypes.string,
  completed: PropTypes.bool,
};

export default TodoListItem;
