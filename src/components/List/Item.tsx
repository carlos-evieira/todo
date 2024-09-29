import styles from "./Item.module.css";
import { Trash } from "@phosphor-icons/react";
import { ITask } from "../../App";
import { CheckCircle, Circle } from "@phosphor-icons/react";

interface Props {
  task: ITask;
  onDeleteTask: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export function Item({ task, onDeleteTask, onCompleteTask }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.check}>
          <button
            className={styles.checkContainer}
            onClick={() => onCompleteTask(task.id)}
          >
            {task.isCompleted ? (
              <div>
                <CheckCircle size={20} weight="bold" />
              </div>
            ) : (
              <div>
                <Circle size={20} weight="bold" />
              </div>
            )}
          </button>
          <p className={task.isCompleted ? styles.textCompleted : ""}>
            {task.title}
          </p>
        </div>
        <button
          className={styles.deleteButton}
          onClick={() => onDeleteTask(task.id)}
        >
          <Trash size={22} weight="bold" />
        </button>
      </div>
    </div>
  );
}
