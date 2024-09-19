type AddTaskModalProps = {
    title: string;
    task: string;
    taskChange: (task: string) => void;
    showDeleteModal: () => void;
    addTask: () => void;
  };

function AddTaskModal({ title, task, taskChange, showDeleteModal, addTask }: AddTaskModalProps) {
    return (
      <div className="modal height-new-task">
        <h2>{title}</h2>
        <label>
          Título
          <input
            type="text"
            placeholder="Digite"
            value={task}
            onChange={(e) => taskChange(e.target.value)}
            className="send-task"
          />
        </label>
        <div className="button-container">
          <button className="cancel" onClick={showDeleteModal}>Cancelar</button>
          <button className="button-effect linear-gradient-add" onClick={addTask}>
            Adicionar
          </button>
        </div>
      </div>
    );

    }

export default AddTaskModal;