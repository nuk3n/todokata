import React from 'react';
import './app-input-form.css';

export default class AppInputForm extends React.Component {
  state = {
    inputValue: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdded(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  };

  onChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.inputValue}
          onChange={this.onChange}
        />
      </form>
    );
  }
}
