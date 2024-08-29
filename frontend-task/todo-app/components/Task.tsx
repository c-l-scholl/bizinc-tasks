"use client";

import { TaskProps } from "./utils";
import "@/styles/Task.modules.css";
import { Trash2 } from "lucide-react";

const Task = ({ taskName, deleteCurrentTask }: TaskProps) => {
	return (
		<div className="task-container">
			<div className="task-name-container">
				<span className="task-name">{taskName}</span>
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
