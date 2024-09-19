
type DeleteTaskModalProps = {
    showDeleteModal: () => void;
    deleteTask: () => void;
  };
  

function DeleteTaskModal({ showDeleteModal, deleteTask }: DeleteTaskModalProps) {
    return (
      <div className="modal height-delete-task">
        <h2>Deletar tarefa</h2>
        <p>Tem certeza que você deseja deletar essa tarefa?</p>
        <div className="button-container">
          <button className="cancel button-modal" onClick={showDeleteModal}>Cancelar</button>
          <button className="button-effect linear-gradient-delete button-modal" onClick={deleteTask}>
            Deletar
          </button>
        </div>
      </div>
    );
  }

export default DeleteTaskModal;