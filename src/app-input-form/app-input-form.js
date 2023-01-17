import React from 'react';
import './app-input-form.css';

export default class AppInputForm extends React.Component {
  state = {
    taskValue: '',
    minValue: '',
    secValue: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const timeInSec = Number(this.state.minValue * 60) + Number(this.state.secValue);
    this.props.onAdded(this.state.taskValue, timeInSec);
    this.setState({
      taskValue: '',
      minValue: '',
      secValue: '',
    });
  };

  onChangeTask = (e) => {
    this.setState({
      taskValue: e.target.value,
    });
  };

  onChangeMin = (e) => {
    this.setState({
      minValue: e.target.value,
    });
  };

  onChangeSec = (e) => {
    this.setState({
      secValue: e.target.value,
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="Task"
          value={this.state.taskValue}
          onChange={this.onChangeTask}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          max="60"
          value={this.state.minValue}
          onChange={this.onChangeMin}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          max="60"
          value={this.state.secValue}
          onChange={this.onChangeSec}
        />
        <button type="submit" />
      </form>
    );
  }
}
