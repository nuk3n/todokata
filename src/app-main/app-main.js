import TodoFooter from './todo-footer';
import TodoList from './todo-list';
import PropTypes from 'prop-types';
import './app-main.css';

function AppMain(props) {
  const { todoItems, activeTaskCount, deleteCompleted } = props;

  return (
    <section className="main">
      <TodoList todos={todoItems} />
      <TodoFooter activeTaskCount={activeTaskCount} deleteCompleted={deleteCompleted} />
    </section>
  );
}

AppMain.defaultProps = {
  activeTaskCount: 0,
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
};

export default AppMain;
