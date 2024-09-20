"use client"
import { useState } from "react";
import './styles/main.scss';
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import DeleteTaskModal from "./components/DeleteTaskModal";
import AddTaskModal from "./components/AddTaskModal";
import AddNewTask from "./components/AddNewTask";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const initialTasks = [
    { id: 1, title: "Lavar as mãos", completed: false },
    { id: 2, title: "Fazer um bolo", completed: false },
    { id: 3, title: "Lavar a louça", completed: false },
    { id: 4, title: "Levar o lixo para fora", completed: true }
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [nextId, setNextId] = useState(initialTasks.length + 1);
  const [task, setTask] = useState("");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null); 

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      setShowDeleteTaskModal(false);
      setTaskToDelete(null);
    }
  };

  const handleAddTask = () => {
    setTask("");
    setTasks([...tasks, { id: nextId, title: task, completed: false }]);
    setNextId(nextId + 1);
    setShowAddTaskModal(false);
  }

  const blur = (showDeleteTaskModal || showAddTaskModal) ? "blur" : "";

  return (
    <main>
     <Header blurClass={blur} />
      <section className={`tasks-container ${blur}`}>
        <div className="tasks-content">
          <div className="tasks-day">
          <TaskList
              tasks={tasks.filter((task) => !task.completed)}
              title="Suas tarefas de hoje"
              toggleComplete={handleToggleComplete}
              deleteTask={setTaskToDelete}
              showDeleteModal={() => setShowDeleteTaskModal(true)}
              />
              </div>
              <div className="tasks-day-finished">
            <TaskList
              tasks={tasks.filter((task) => task.completed)}
              title="Tarefas finalizadas"
              toggleComplete={handleToggleComplete}
              deleteTask={setTaskToDelete}
              showDeleteModal={() => setShowDeleteTaskModal(true)}
              />
              </div>
        </div>
      </section>

      {showAddTaskModal && (
        <AddTaskModal
          title="Adicionar nova tarefa"
          task={task}
          taskChange={setTask}
          showDeleteModal={() => setShowAddTaskModal(false)}
          addTask={handleAddTask}
        />
      )}

      <div className={`${showDeleteTaskModal || showAddTaskModal ? 'overlay' : ""}`}></div>

      {showDeleteTaskModal && (
          <DeleteTaskModal
          showDeleteModal={() => setShowDeleteTaskModal(false)}
          deleteTask={handleDeleteTask}
        />
      )}

      <AddNewTask showAddTaskModal={() => setShowAddTaskModal(true)} />
    </main>
  );
}
