"use client";

import { useState } from "react";
import './styles/main.scss';
import Image from "next/image";

import Trash from "./public/Icon.png";
import Logo from "./public/Logomark.png";
import IconChecked from "./public/IconChecked.png";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [task, setTask] = useState("");

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  
  

  return (
    <main >
      <header className="header">
        <div className="content-header">
        <div className="logo-header">
      <Image src={Logo} alt="Logo" width={33.1} height={32.93} />
      <h1 className="h1-logo">
      FocalPoint
        </h1>
        </div>
      <h1>Bem-vindo de volta, Marcus</h1>
      <h2>Segunda, 01 de dezembro de 2025</h2>
        </div>
      </header>

      <section className="tasks-container">
        <div className="tasks-content">
           <div className="tasks-content2">

        <h2>Suas tarefas de hoje</h2>

<ul>

        {
          tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <div key={task.id} className="task">
              <div className="content-nochecked" >
              <div className="task-checked">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
                />
              <span>{task.title}</span>
                </div>
                </div>
              <button
                onClick={() => {
                  setShowDeleteTaskModal(true);
                }}
                >
                  <Image src={Trash} alt="trash" width={18} height={20}/>
              </button>
                </div>
          ))}

          </ul>

  <h2>Tarefas finalizadas</h2>
          <ul>
  {tasks
    .filter((task) => task.completed)
    .map((task) => (
      <div key={task.id} className="task-finished">
        <div className="content-checked">

        <div className="task-checked">
          <input
            type="checkbox"
            checked={task.completed}
            />
          <label
          onClick={() => handleToggleComplete(task.id)}
 >
            {task.completed && (
              <svg
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1.5L4.75 9.75L1 6"
                  stroke="#0796D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  />
              </svg>
            )}
          </label>
        </div>
          <span>{task.title}</span>
            </div>
        <button
          onClick={() => {
            setShowDeleteTaskModal(true);
          }}
        >
          <Image src={Trash} alt="trash" width={18} height={20} />
        </button>
      </div>
    ))}
</ul>

      
      {showAddTaskModal && (
        <div className="modal">
          <h2>Nova tarefa</h2>
          <label >
            Tarefa
            <input
              type="text"
              placeholder="Título"
              name="task"
              onChange={(e) => setTask(e.target.value)}
            />
          </label>
          <button onClick={() => setShowAddTaskModal(false)}>Cancelar</button>
          <button
            onClick={() => {
              setShowAddTaskModal(false);
              setTasks([...tasks, { id: Date.now(), title: task, completed: false }]);
            }}
          >
            Adicionar
          </button>
        </div>
      )}

      {showDeleteTaskModal && (
        <div className="modal">
          <h2>Deletar tarefa</h2>
          <p>Tem certeza que você deseja deletar essa tarefa?</p>
          <button
            onClick={() => {
              setShowDeleteTaskModal(false);
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setTasks(tasks.filter((task, index) => index !== 0));
              setShowDeleteTaskModal(false);
            }}
          >
            Deletar
          </button>
        </div>
        
      )}
        </div>

        </div>
      </section>
      <button onClick={() => setShowAddTaskModal(true)}>
        Adicionar nova tarefa
      </button>

    </main>
  );
}
