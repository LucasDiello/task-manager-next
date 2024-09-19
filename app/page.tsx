"use client";

import { useState } from "react";
import './styles/main.scss';
import Image from "next/image";

import Trash from "./public/Icon.png";
import Logo from "./public/Logomark.png";

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
    { id: 4, title: "Levar o lixo fora", completed: true }
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [nextId, setNextId] = useState(initialTasks.length + 1);
  const [task, setTask] = useState("");

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const blur = (showDeleteTaskModal || showAddTaskModal) ? "blur" : "";

  return (
    <main>
      <header className={`header ${blur}`}>
        <div className="content-header">
          <div className="logo-header">
            <Image src={Logo} alt="Logo" width={33.1} height={32.93} />
            <h1 className="h1-logo">FocalPoint</h1>
          </div>
          <h1>Bem-vindo de volta, Marcus</h1>
          <h2>Segunda, 01 de dezembro de 2025</h2>
        </div>
      </header>

      <section className={`tasks-container ${blur}`}>
        <div className="tasks-content">
          <div className="tasks-content2">
            <h2>Suas tarefas de hoje</h2>

            <ul>
              {tasks.filter((task) => !task.completed).map((task) => (
                <div key={task.id} className="task">
                  <div className="content-nochecked">
                    <div className="task-checked">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                      />
                      <span>{task.title}</span>
                    </div>
                  </div>
                  <button onClick={() => setShowDeleteTaskModal(true)}>
                    <Image src={Trash} alt="trash" width={18} height={20} />
                  </button>
                </div>
              ))}
            </ul>

            <h2>Tarefas finalizadas</h2>
            <ul>
              {tasks.filter((task) => task.completed).map((task) => (
                <div key={task.id} className="task-finished">
                  <div className="content-checked">
                    <div className="task-checked">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        readOnly
                      />
                      <label onClick={() => handleToggleComplete(task.id)}>
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
                  <button onClick={() => setShowDeleteTaskModal(true)}>
                    <Image src={Trash} alt="trash" width={18} height={20} />
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {showAddTaskModal && (
        <div className="modal height-new-task">
          <h2>Nova tarefa</h2>
          <label>
            Título
            <input
              type="text"
              placeholder="Digite"
              name="task"
              onChange={(e) => setTask(e.target.value)}
              className="send-task"
            />
          </label>
          <div className="button-container">
            <button className="cancel" onClick={() => setShowAddTaskModal(false)}>Cancelar</button>
            <button
              className="button-effect linear-gradient-add"
              onClick={() => {
                setTasks([...tasks, { id: nextId, title: task, completed: false }]);
                setNextId(nextId + 1);
                setShowAddTaskModal(false);
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}

      <div className={`${showDeleteTaskModal || showAddTaskModal ? 'overlay' : ""}`}></div>

      {showDeleteTaskModal && (
        <div className="modal height-delete-task">
          <h2>Deletar tarefa</h2>
          <p>Tem certeza que você deseja deletar essa tarefa?</p>
          <div className="button-container">
            <button className="cancel button-modal" onClick={() => setShowDeleteTaskModal(false)}>Cancelar</button>
            <button
              className="button-effect linear-gradient-delete button-modal"
              onClick={() => {
                setTasks(tasks.filter((_, index) => index !== 0));
                setShowDeleteTaskModal(false);
              }}
            >
              Deletar
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setShowAddTaskModal(true)}>
        Adicionar nova tarefa
      </button>
    </main>
  );
}
