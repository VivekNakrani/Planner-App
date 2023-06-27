import './TaskWidget.css';
import React, { useState } from 'react';

export default function TaskWidget() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [progressData, setProgressData] = useState([]);

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const updateProgress = (index) => {
    const updatedProgressData = [...progressData];
    updatedProgressData[index] = !updatedProgressData[index];
    setProgressData(updatedProgressData);
  };

  const calculateCompletionPercentage = () => {
    if (tasks.length === 0) {
      return 0;
    }
    const completedTasks = progressData.filter((progress) => progress === true);
    return (completedTasks.length / tasks.length) * 100;
  };

  return (
    <div>
      <h2>Task Progress Tracker</h2>
      <div>
        <h3>Tasks List</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button onClick={() => updateProgress(index)}>
                {progressData[index] ? 'Completed' : 'Mark as Completed'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add New Task</h3>
        <input type="text" value={newTask} onChange={handleNewTaskChange} />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <h3>Progress Bar</h3>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${calculateCompletionPercentage()}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
