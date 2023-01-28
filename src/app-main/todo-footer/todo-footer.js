import { Context } from '../../context';
import PropTypes from 'prop-types';
import './todo-footer.css';
import { useContext } from 'react';

function TodoFooter(props) {
  const { activeTaskCount, deleteCompleted } = props;
  const {
    footerFilters: { filter, allFilter, completedFilter, activeFilter },
  } = useContext(Context);

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
  deleteCompleted: PropTypes.func,
  activeTaskCount: PropTypes.number,
};

export default TodoFooter;
