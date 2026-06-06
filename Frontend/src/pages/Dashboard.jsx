import { useEffect, useState } from "react";
import API from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title, description) => {
    try {
      await API.post("/tasks", {
        title,
        description,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Failed to delete task");
    }
  };

  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status:
          task.status === "Pending"
            ? "Completed"
            : "Pending",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h2>{tasks.length}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              tasks.filter(
                (task) => task.status === "Pending"
              ).length
            }
          </h2>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              tasks.filter(
                (task) =>
                  task.status === "Completed"
              ).length
            }
          </h2>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              tasks.filter(
                (task) => task.status === "Pending"
              ).length
            }
          </h2>
          <p>Active</p>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder=" Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />
      </div>

      <TaskForm addTask={addTask} />

      {filteredTasks.length === 0 ? (
        <h3>No matching tasks found</h3>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={() =>
              deleteTask(task._id)
            }
            onToggle={() =>
              toggleStatus(task)
            }
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;