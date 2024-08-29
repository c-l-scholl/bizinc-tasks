"use client";

import { TaskProps } from "./utils";
import "@/styles/Task.modules.css";

const Task = ({ taskName, id, deleteTask, editTask }: TaskProps) => {
	
	return (
		<div className="task-container">
			<div className="task-name-container">
				<h2 className="task-name">{taskName}</h2>
			</div>
			<div className="task-button-container">
				<button className="task-button task-edit-button" onClick={() => editTask(id)}>Edit</button>
				<button className="task-button task-delete-button" onClick={() => deleteTask(id)}>Delete</button>
			</div>
		</div>
	);
}

export default Task;