"use client";

import { TaskProps } from "../utils";
import "./Task.modules.css";
import { Trash2 } from "lucide-react";

/**
 * The Task component contains relevant task information
 * @function
 * @param {TaskProps} - an object containing task data
 * @param {string} taskName - the task text
 * @param {Date} dateCreated - the date when the task was created
 * @param {function} deleteCurrentTask - calls deleteTask from TaskManager
 */
const Task = ({ taskName, dateCreated, deleteCurrentTask }: TaskProps) => {
	const taskDate = dateCreated ? new Date(dateCreated) : null;

	const taskMonth: number = taskDate ? taskDate.getMonth() + 1 : 0;
	const taskDay: number = taskDate ? taskDate.getDate() : 0;
	const taskHours: number = taskDate ? taskDate.getHours() : 0;
	const taskMinutes: number = taskDate ? taskDate.getMinutes() : 0;
	const taskSeconds: number = taskDate ? taskDate.getSeconds() : 0;

	const taskMinutesStr: string = taskMinutes < 10 ? `0${taskMinutes}` : `${taskMinutes}`;
	const taskSecondsStr: string = taskSeconds < 10 ? `0${taskSeconds}` : `${taskSeconds}`;
	
	const formattedDate = taskDate ? `${taskMonth}/${taskDay} at ${taskHours}:${taskMinutesStr}:${taskSecondsStr}` : "";


	return (
		<div className="task-container">
			<div className="task-name-container">
				<span className="task-name">{taskName}</span>
				<p className="task-date">created: {formattedDate}</p>
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
