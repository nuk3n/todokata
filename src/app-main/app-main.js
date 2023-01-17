import TodoFooter from './todo-footer';
import TodoList from './todo-list';
import PropTypes from 'prop-types';
import './app-main.css';

function AppMain(props) {
  const {
    todoItems,
    onDelete,
    onCompleted,
    activeTaskCount,
    filter,
    activeFilter,
    completedFilter,
    allFilter,
    deleteCompleted,
    startTimer,
    stopTimer,
  } = props;

  return (
    <section className="main">
      <TodoList
        todos={todoItems}
        onCompleted={onCompleted}
        onDelete={onDelete}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
      <TodoFooter
        activeTaskCount={activeTaskCount}
        activeFilter={activeFilter}
        filter={filter}
        completedFilter={completedFilter}
        allFilter={allFilter}
        deleteCompleted={deleteCompleted}
      />
    </section>
  );
}

AppMain.defaultProps = {
  activeTaskCount: 0,
  filter: 'all',
};

AppMain.propTypes = {
  todoItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
  activeTaskCount: PropTypes.number,
  filter: PropTypes.string,
};

export default AppMain;
