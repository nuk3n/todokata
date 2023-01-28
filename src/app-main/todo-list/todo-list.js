import TodoListItem from '../todo-list-item';
import PropTypes from 'prop-types';
import './todo-list.css';

function TodoList(props) {
  const { todos } = props;

  return (
    <ul className="todo-list">
      {todos.map((item) => (
        <TodoListItem
          key={item.id}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...item}
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
};

export default TodoList;
