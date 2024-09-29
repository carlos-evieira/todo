import "./global.css";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./components/Header";
import { InputTasks } from "./components/InputTasks";
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "todo:savedTasks";

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function setTasksAndSave(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function loadSavedTasks() {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function addTask(taskTitle: string) {
    setTasksAndSave([
      ...tasks,
      {
        id: uuidv4(),
        title: taskTitle,
        isCompleted: false,
      },
    ]);
  }

  function deleteTaskById(taskId: string) {
    const NewTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(NewTasks);
  }

  function toggleTaskCompletedById(taskId: string) {
    const NewTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    setTasksAndSave(NewTasks);
  }

  return (
    <>
      <Header />
      <main>
        <InputTasks
          tasks={tasks}
          onAddTask={addTask}
          onDeleteTask={deleteTaskById}
          onCompleteTask={toggleTaskCompletedById}
        />
      </main>
    </>
  );
}

export default App;
