import React from 'react'

type AddNewTaskProps = {
    showAddTaskModal: () => void;
    };

function AddNewTask({showAddTaskModal} : AddNewTaskProps) {
  return (
    <div className="btn-add-task">
        <button onClick={showAddTaskModal}>
          Adicionar nova tarefa
        </button>
      </div>  
  )
}

export default AddNewTask
