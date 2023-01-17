import TodoListItem from '../todo-list-item';
import PropTypes from 'prop-types';
import './todo-list.css';

function TodoList(props) {
  const { todos, onDelete, onCompleted, startTimer, stopTimer } = props;

  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <TodoListItem
          key={item.id}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...item}
          onCompleted={() => onCompleted(item.id)}
          onDelete={() => onDelete(item.id)}
          startTimer={() => startTimer(item.id)}
          stopTimer={() => stopTimer(item.id)}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
  onDelete: PropTypes.func,
  onCompleted: PropTypes.func,
};

export default TodoList;
