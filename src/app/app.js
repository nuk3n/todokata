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

  addItem = (label) => {
    this.setState(({ todoData }) => {
      const newData = [...todoData, this.createItem(label)];
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
        item.id === id ? { ...item, completed: !item.completed } : { ...item }
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

  createItem(label) {
    return {
      label,
      completed: false,
      id: this.nextID++,
      date: new Date(),
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
