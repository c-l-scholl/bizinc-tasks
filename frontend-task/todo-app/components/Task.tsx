"use client";

import { TaskProps } from "./utils";
import "@/styles/Task.modules.css";

const Task = ({ taskName, id }: TaskProps) => {
	
	return (
		<div className="task-container">
			<div className="task-name-container">
				<h2 className="task-name">{taskName}</h2>
			</div>
			<div className="task-button-container">
				<button className="task-button task-edit-button">Edit</button>
				<button className="task-button task-delete-button">Delete</button>
			</div>
		</div>
	);
}

export default Task;