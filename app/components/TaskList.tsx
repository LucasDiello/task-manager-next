import Image from "next/image";
import TrashIcon from "../public/Icon.png";
import { Task } from "../page";
import CheckIcon from "./CheckIcon";

type TaskListProps = {
  tasks: Task[];
  title: string;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  showDeleteModal: () => void;
};

function TaskList({
  tasks,
  title,
  toggleComplete,
  deleteTask,
  showDeleteModal,
}: TaskListProps) {
  const verifyTask =
    title === "Suas tarefas de hoje" ? "tasks-nochecked" : "tasks-checked";

  return (
    <>
      <h2>{title}</h2>
      <ul className={`${verifyTask}`}>
        {tasks.map((task: Task) => (
          <li
            key={task.id}
            className={`task ${task.completed ? "task-finished" : ""}`}
          >
            <div
              className={`content-${task.completed ? "checked" : "nochecked"}`}
            >
              <div className="task-checked">
                {task.completed ? (
                  <>
                    <div>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        readOnly
                      />
                    </div>
                    <label onClick={() => toggleComplete(task.id)}>
                      <CheckIcon />
                    </label>
                  </>
                ) : (
                  <div className="task-item">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                    />
                    <span>{task.title}</span>
                  </div>
                )}
                {task.completed && <span> {task.title}</span>}
              </div>
              <button
                onClick={() => {
                  showDeleteModal();
                  deleteTask(task.id);
                }}
              >
                <Image src={TrashIcon} alt="trashIcon" width={18} height={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
