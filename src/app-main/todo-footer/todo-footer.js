import PropTypes from 'prop-types';
import './todo-footer.css';

function TodoFooter(props) {
  const { activeTaskCount, filter, activeFilter, completedFilter, allFilter, deleteCompleted } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{activeTaskCount} items left</span>
      <ul className="filters">
        <li>
          <button className={filter === 'all' ? 'selected' : null} onClick={allFilter} type="button">
            All
          </button>
        </li>
        <li>
          <button className={filter === 'active' ? 'selected' : null} onClick={activeFilter} type="button">
            Active
          </button>
        </li>
        <li>
          <button className={filter === 'completed' ? 'selected' : null} onClick={completedFilter} type="button">
            Completed
          </button>
        </li>
      </ul>
      <button className="clear-completed" onClick={deleteCompleted} type="button">
        Clear completed
      </button>
    </footer>
  );
}

TodoFooter.propTypes = {
  activeFilter: PropTypes.func,
  completedFilter: PropTypes.func,
  allFilter: PropTypes.func,
  deleteCompleted: PropTypes.func,
  activeTaskCount: PropTypes.number,
  filter: PropTypes.string,
};

export default TodoFooter;
