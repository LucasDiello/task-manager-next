"use client";

import { useState } from "react";

export type Task = {
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [task, setTask] = useState("");

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

  const handleToggleComplete = (index: number) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index && { ...t, completed: !t.completed } 
    );

    setTasks(updatedTasks as Task[]);
  };

  return (
    <div>
      <h1>Bem-vindo de volta, Marcus</h1>
      <h2>Segunda, 01 de dezembro de 2025</h2>

      <div>
        <h2>Suas tarefas de hoje</h2>
        {tasks
          .filter(task => !task.completed)
          .map((task, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <span>{task.title}</span>
              <button
                onClick={() => {
                  setShowDeleteTaskModal(true);
                }}
              >
                Delete
              </button>
            </div>
          ))}

        <h2>Tarefas finalizadas</h2>
        {tasks
          .filter(task => task.completed)
          .map((task, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <span>{task.title}</span>
              <button
                onClick={() => {
                  setShowDeleteTaskModal(true);
                }}
              >
                Delete
              </button>
            </div>
            
          ))
            
          }
      </div>
      <button onClick={() => setShowAddTaskModal(true)}>
        Adicionar nova tarefa
      </button>

      {showAddTaskModal && (
        <div className="modal">
          <h2>Nova tarefa</h2>
          <label htmlFor="">
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
              setTasks([...tasks, { title: task, completed: false }]);
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
        <button onClick={() => {
          setShowDeleteTaskModal(false);
        }}>Cancelar</button>  
        <button onClick={() => {
          setTasks(tasks.filter((task, index) => index !== 0));
          setShowDeleteTaskModal(false);
}}>Deletar</button>  
      </div>  
      )}
    </div>
  );
}
