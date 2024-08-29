"use client";

import { TaskProps } from "./utils";
import "@/styles/Task.modules.css";
import { Trash2 } from "lucide-react";

const Task = ({ taskName, dateCreated, deleteCurrentTask }: TaskProps) => {
	const taskDate = dateCreated ? new Date(dateCreated) : null;
	const taskMonth = taskDate ? taskDate.getMonth() + 1 : 0;
	const taskDay = taskDate ? taskDate.getDate() : 0;
	const taskHours = taskDate ? taskDate.getHours() : 0;
	const taskMinutes = taskDate ? taskDate.getMinutes() : 0;
	const taskSeconds = taskDate ? taskDate.getSeconds() : 0;
	let formattedDate = "";
	if (taskDate) {
		formattedDate = `${taskMonth}/${taskDay} ${taskHours}:${taskMinutes}:${taskSeconds}`;
	}

	return (
		<div className="task-container">
			<div className="task-name-container">
				<span className="task-name">{taskName}</span>
				<p className="task-date">{formattedDate}</p>
			</div>
			<div className="task-button-container">
				<div
					className="task-button task-delete-button"
					onClick={() => deleteCurrentTask()}
				>
					<Trash2 />
				</div>
			</div>
		</div>
	);
};

export default Task;
