function TaskCard({
  task,
  onDelete,
  onToggle,
}) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p
        style={{
          color:
            task.status === "Completed"
              ? "green"
              : "orange",
        }}
      >
        Status: {task.status}
      </p>

      <button onClick={onDelete}>
        Delete
      </button>

      <button onClick={onToggle}>
        {task.status === "Pending"
          ? "Complete"
          : "Mark Pending"}
      </button>
    </div>
  );
}

export default TaskCard;