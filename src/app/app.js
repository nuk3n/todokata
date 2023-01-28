import AppHeader from '../app-header';
import AppMain from '../app-main';
import './app.css';
import AppInputForm from '../app-input-form';
import { Context } from '../context';
import { useState, useMemo } from 'react';

function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [nextId, setNextId] = useState(0);

  const startTimer = (id) => {
    setTodoData((data) =>
      data.map((item) => {
        if (item.id === id) {
          return { ...item, pause: false };
        }
        return { ...item };
      })
    );
  };

  const stopTimer = (id) => {
    setTodoData((data) =>
      data.map((item) => {
        if (item.id === id) {
          return { ...item, pause: true };
        }
        return item;
      })
    );
  };

  function createItem(label, time) {
    setNextId(nextId + 1);
    return {
      label,
      completed: false,
      id: nextId,
      date: new Date(),
      time,
      pause: true,
    };
  }

  const addItem = (label, time) => {
    setTodoData((data) => [...data, createItem(label, time)]);
  };

  const deleteItem = (id) => {
    setTodoData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      return [...data].filter((item, i) => i !== idx);
    });
  };

  const onToggleCompleted = (id) => {
    setTodoData((data) =>
      data.map((item) => (item.id === id ? { ...item, completed: !item.completed, pause: true } : { ...item }))
    );
  };

  const deleteCompleted = () => {
    setTodoData((data) => data.filter((item) => !item.completed));
  };

  const stateFilter = () => {
    if (filter === 'all') {
      return todoData;
    }

    if (filter === 'active') {
      return [...todoData.filter((item) => !item.completed)];
    }

    if (filter === 'completed') {
      return [...todoData.filter((item) => item.completed)];
    }
  };

  const allFilter = () => {
    setFilter('all');
  };

  const activeFilter = () => {
    setFilter('active');
  };

  const completedFilter = () => {
    setFilter('completed');
  };

  const activeTaskCount = todoData.filter((item) => !item.completed).length;
  const taskFunctions = useMemo(
    () => ({
      startTimer,
      stopTimer,
      onToggleCompleted,
      deleteItem,
    }),
    []
  );
  const footerFilters = useMemo(
    () => ({
      filter,
      allFilter,
      completedFilter,
      activeFilter,
    }),
    [filter]
  );
  const contextItems = useMemo(
    () => ({
      taskFunctions,
      footerFilters,
    }),
    [taskFunctions, footerFilters]
  );
  return (
    <section className="todoapp">
      <Context.Provider value={contextItems}>
        <AppHeader />
        <AppInputForm onAdded={addItem} />
        <AppMain todoItems={stateFilter()} activeTaskCount={activeTaskCount} deleteCompleted={deleteCompleted} />
      </Context.Provider>
    </section>
  );
  // }
}

export default App;
