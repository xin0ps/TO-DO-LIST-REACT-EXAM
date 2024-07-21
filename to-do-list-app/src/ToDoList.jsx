import { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { text: "Eat Breakfast", timestamp: new Date(), tag: "Personal", priority: "Medium" },
    { text: "Take a Shower", timestamp: new Date(), tag: "Personal", priority: "Low" }
  ]);
  const [newTask, setNewTask] = useState("");
  const [newTaskTag, setNewTaskTag] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
    setShowForm(true);
    if(event.target.value==""){
      setShowForm(false);
    }
  };

  const handleTagChange = (event) => {
    setNewTaskTag(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setNewTaskPriority(event.target.value);
  };

  const handleEditInputChange = (event) => {
    setEditTaskValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (newTask.trim() !== "" && newTaskTag && newTaskPriority) {
      setTasks((tasks) => [
        ...tasks,
        { text: newTask, timestamp: new Date(), tag: newTaskTag, priority: newTaskPriority }
      ]);
      setNewTask("");
      setNewTaskTag("");
      setNewTaskPriority("");
      setShowForm(false);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditingTask = (index) => {
    setEditTaskIndex(index);
    setEditTaskValue(tasks[index].text);
  };

  const updateTask = (index) => {
    if (editTaskValue.trim() !== "") {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: editTaskValue } : task
      );
      setTasks(updatedTasks);
      setEditTaskIndex(null);
      setEditTaskValue("");
    }
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index]
      ];
      setTasks(updatedTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index]
      ];
      setTasks(updatedTasks);
    }
  };

  const getPriorityClassName = (priority) => {
    switch (priority) {
      case "High":
        return "high-priority";
      case "Medium":
        return "medium-priority";
      case "Low":
        return "low-priority";
      default:
        return "";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const sortTasksByPriority = () => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedTasks = [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    setTasks(sortedTasks);
  };

  const sortTasksByTimestamp = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    setTasks(sortedTasks);
  };

  return (
    <>
      <div className="to-do-list">
        <h1>To-Do List</h1>

        <div>
          <input
            type="text"
            placeholder="Enter new Task..."
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <button className="add-button" onClick={addTask}>
            Add
          </button>
        </div>

        {showForm && (
          <div className="form">
            <div className="tag-selection">
              <label className="tag">TAG:</label>              
              <label>
                <input
                  type="radio"
                  value="Work"
                  checked={newTaskTag === "Work"}
                  onChange={handleTagChange}
                />
                Work
              </label>
              <label>
                <input
                  type="radio"
                  value="School"
                  checked={newTaskTag === "School"}
                  onChange={handleTagChange}
                />
                School
              </label>
              <label>
                <input
                  type="radio"
                  value="Exercise"
                  checked={newTaskTag === "Exercise"}
                  onChange={handleTagChange}
                />
                Exercise
              </label>
              <label>
                <input
                  type="radio"
                  value="Entertainment"
                  checked={newTaskTag === "Entertainment"}
                  onChange={handleTagChange}
                />
                Entertainment
              </label>
            </div>

            <div className="priority-selection">
              <label className="priority">Priority:</label>  
              <label>
                <input
                  type="radio"
                  value="High"
                  checked={newTaskPriority === "High"}
                  onChange={handlePriorityChange}
                />
                High
              </label>
              <label>
                <input
                  type="radio"
                  value="Medium"
                  checked={newTaskPriority === "Medium"}
                  onChange={handlePriorityChange}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  value="Low"
                  checked={newTaskPriority === "Low"}
                  onChange={handlePriorityChange}
                />
                Low
              </label>
            </div>
          </div>
        )}

        <div className="sort-buttons">
          <button className="sort-button" onClick={sortTasksByPriority}>
            Sort by Priority
          </button>
          <button className="sort-button" onClick={sortTasksByTimestamp}>
            Sort by Time
          </button>
        </div>

        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              {editTaskIndex === index ? (
                <input
                  type="text"
                  value={editTaskValue}
                  onChange={handleEditInputChange}
                  onBlur={() => updateTask(index)}
                  onKeyDown={(e) => e.key === "Enter" && updateTask(index)}
                  autoFocus
                />
              ) : (
                <div className="task">
                  <span className={`priorityname ${getPriorityClassName(task.priority)}`}>{task.priority}</span>
                  <span className="tagname">{task.tag}</span>
                  <span className="timestamp">
                    {formatTimestamp(task.timestamp)}
                  </span>
                  <span className="text" onDoubleClick={() => startEditingTask(index)}>
                    {task.text}
                  </span>
                </div>
              )}
              
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="red"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>

              <button
                className="update-button"
                onClick={() => startEditingTask(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="orange"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>

              <button className="up-button" onClick={() => moveTaskUp(index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="blue"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                  />
                </svg>
              </button>

              <button
                className="down-button"
                onClick={() => moveTaskDown(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  strokeWidth={1.5}
                  stroke="blue"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default ToDoList;
