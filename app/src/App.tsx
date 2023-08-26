import React, {ChangeEvent, FC, useState} from 'react';
import './App.css';
import {ITask} from "./Interfaces"
import TodoTask from "./Components/TodoTask";

const App: FC = () => {

    const [task, setTask] = useState<string>("");
    const [deadline, setDeadline] = useState<number>(0);
    const [todoList, setTodoList] = useState<ITask[]>([]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
        if (event.target.name === "task") {
            setTask(event.target.value)
        } else {
            setDeadline(Number(event.target.value))
        }
    };

    const addTask = ():void =>{
        const newTask = { taskName: task, deadline: deadline};
        setTodoList([...todoList, newTask]);
        setTask("");
        setDeadline(0);
    };

    const completeTask = (taskNameToDelite: string): void => {
        setTodoList(todoList.filter((task) => {
            return task.taskName != taskNameToDelite
        }))
    };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
              type="text"
              name="task"
              placeholder="Ваша задача"
              value={task}
              onChange={handleChange}
          />
          <input
              type="number"
              name="deadline"
              placeholder="Срок закрытия задачи в днях"
              value={deadline}
              onChange={handleChange}
          />
        </div>
          <button onClick={addTask}>Добавить задачу</button>
      </div>
        <div className="todoList">
            {todoList.map((task: ITask, key: number) => {
                return <TodoTask key={key} task={task} completeTask={completeTask} />;
            })}
        </div>
    </div>
  );
};

export default App;
