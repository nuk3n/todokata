import { Context } from '../../context';
import PropTypes from 'prop-types';
import './todo-footer.css';
import { useContext } from 'react';

function TodoFooter(props) {
  const { activeTaskCount, deleteCompleted } = props;
  const {
    footerFilters: { filter, allFilter, completedFilter, activeFilter },
  } = useContext(Context);
  const allClass = filter === 'all' ? 'selected' : null;
  const activeClass = filter === 'active' ? 'selected' : null;
  const completedClass = filter === 'completed' ? 'selected' : null;

  return (
    <footer className="footer">
      <span className="todo-count">{activeTaskCount} items left</span>
      <ul className="filters">
        <li>
          <button className={allClass} onClick={allFilter} type="button">
            All
          </button>
        </li>
        <li>
          <button className={activeClass} onClick={activeFilter} type="button">
            Active
          </button>
        </li>
        <li>
          <button className={completedClass} onClick={completedFilter} type="button">
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
