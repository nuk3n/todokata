import { useState } from 'react';
import './app-input-form.css';

function AppInputForm(props) {
  const [taskValue, setTaskValue] = useState('');
  const [minValue, setMinValue] = useState('');
  const [secValue, setSecValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const time = Number(minValue * 60) + Number(secValue);
    props.onAdded(taskValue, time);
    setTaskValue('');
    setMinValue('');
    setSecValue('');
  };

  function handleChange(e) {
    if (e.target.name === 'task') setTaskValue(e.target.value);
    if (e.target.name === 'min') setMinValue(e.target.value);
    if (e.target.name === 'sec') setSecValue(e.target.value);
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input className="new-todo" name="task" placeholder="Task" value={taskValue} onChange={handleChange} required />
      <input
        className="new-todo-form__timer"
        name="min"
        placeholder="Min"
        type="number"
        max="60"
        value={minValue}
        onChange={handleChange}
      />
      <input
        className="new-todo-form__timer"
        name="sec"
        placeholder="Sec"
        type="number"
        max="60"
        value={secValue}
        onChange={handleChange}
      />
      <button type="submit" />
    </form>
  );
}

export default AppInputForm;
