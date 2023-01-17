import AppHeader from '../app-header';
import AppMain from '../app-main';
import './app.css';
import AppInputForm from '../app-input-form';
import React from 'react';

export default class App extends React.Component {
  nextID = 1;

  state = {
    todoData: [],
    filter: 'all',
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        const newArr = todoData.map((item) => {
          if (item.timerTime === 0) {
            return item;
          }
          if (!item.pause) {
            // eslint-disable-next-line no-param-reassign
            item.timerTime--;
          }
          return item;
        });
        return {
          todoData: newArr,
        };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const newData = [...todoData].map((item) => {
        if (item.id === id) {
          return { ...item, pause: false };
        }
        return { ...item };
      });
      return {
        todoData: newData,
      };
    });
  };

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const newData = [...todoData].map((item) => {
        if (item.id === id) {
          return { ...item, pause: true };
        }
        return { ...item };
      });
      return {
        todoData: newData,
      };
    });
  };

  addItem = (label, time) => {
    this.setState(({ todoData }) => {
      const newData = [...todoData, this.createItem(label, time)];
      return {
        todoData: newData,
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = [...todoData].filter((item, i) => i !== idx);
      return {
        todoData: newData,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const newData = [...todoData].map((item) =>
        item.id === id ? { ...item, completed: !item.completed, pause: true } : { ...item }
      );
      return {
        todoData: newData,
      };
    });
  };

  deleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newData = [...todoData].filter((item) => !item.completed);
      return {
        todoData: newData,
      };
    });
  };

  stateFilter = () => {
    if (this.state.filter === 'all') {
      return this.state.todoData;
    }

    if (this.state.filter === 'active') {
      return [...this.state.todoData.filter((item) => !item.completed)];
    }

    if (this.state.filter === 'completed') {
      return [...this.state.todoData.filter((item) => item.completed)];
    }
  };

  allFilter = () => {
    this.setState({
      filter: 'all',
    });
  };

  activeFilter = () => {
    this.setState({
      filter: 'active',
    });
  };

  completedFilter = () => {
    this.setState({
      filter: 'completed',
    });
  };

  createItem(label, time) {
    return {
      label,
      completed: false,
      id: this.nextID++,
      date: new Date(),
      timerTime: time,
      pause: true,
    };
  }

  render() {
    const activeTaskCount = this.state.todoData.filter((item) => !item.completed).length;

    return (
      <section className="todoapp">
        <AppHeader />
        <AppInputForm onAdded={this.addItem} />
        <AppMain
          todoItems={this.stateFilter()}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          onCompleted={this.onToggleCompleted}
          onDelete={this.deleteItem}
          activeTaskCount={activeTaskCount}
          deleteCompleted={this.deleteCompleted}
          activeFilter={this.activeFilter}
          completedFilter={this.completedFilter}
          allFilter={this.allFilter}
          filter={this.state.filter}
        />
      </section>
    );
  }
}
