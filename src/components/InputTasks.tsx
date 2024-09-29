import { PlusCircle } from "@phosphor-icons/react";
import styles from "./InputTasks.module.css";
import { ITask } from "../App";
import { Item } from "./List/Item";
import { useState } from "react";
import { Empty } from "./List/Empty";

interface Props {
  tasks: ITask[];
  onAddTask: (taskTitle: string) => void;
  onDeleteTask: (taskTitle: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export function InputTasks({
  tasks,
  onAddTask,
  onDeleteTask,
  onCompleteTask,
}: Props) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const [title, setTitle] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onAddTask(title);
    setTitle("");
  }

  function onChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <div className={styles.container}>
      <form className={styles.taskForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={onChangeTitle}
          value={title}
        />
        <button type="submit">
          Criar
          <PlusCircle size={16} weight="bold" />
        </button>
      </form>

      <div className={styles.taskNumbers}>
        <div className={styles.createdTask}>
          <strong>Tarefas criadas</strong>
          <span> {tasksQuantity} </span>
        </div>
        <div className={styles.concludedTask}>
          <strong>Concluídas</strong>
          <span>
            {" "}
            {completedTasks} de {tasksQuantity}{" "}
          </span>
        </div>
      </div>

      <div>
        {tasks.map((task) => (
          <Item
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
          />
        ))}
        {tasks.length <= 0 && <Empty />}
      </div>
    </div>
  );
}
