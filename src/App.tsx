import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import { ITask } from './Interfaces';
import TodoTask from './Components/TodoTask';

const App: FC = () => {

  const [task, setTask] = useState<string>("")
  const [limit, setLimit] = useState<number>(0)
  const [todoList, setTodoList] = useState<ITask[]>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task")
    {
      setTask(event.target.value);
    } else {
      setLimit(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, limit: limit };
    setTodoList([...todoList, newTask]);
    setTask("");
    setLimit(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
    }))
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input 
            type="text"
            placeholder="Task..."
            value={task}
            name="task"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Days to do..."
            value={limit}
            name="limit"
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  )
}

export default App;
