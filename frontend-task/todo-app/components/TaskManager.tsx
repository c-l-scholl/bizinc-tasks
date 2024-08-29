"use client";

import { useEffect, useState } from "react";
import Task from "./Task";
import { TaskProps } from "@/components/utils";
import "@/styles/TaskManager.modules.css";


const TaskManager = () => {
	const [tasks, setTasks] = useState<TaskProps[] | null>(null);

	useEffect(() => {
		setTasks([{ id: 1, taskName: "Do Laundry"}, { id: 2, taskName: "Fold Laundry"}]);
	}, []);

	return (
		<div className="task-mng-container">
			<div className="task-mng-input-container">
				<input className="task-mng-input" placeholder="Enter a new task..."/>
				<button className="task-mng-add-button">Add Task</button>
			</div>
			<div className="task-list-container">
					{tasks && tasks.map((t) => (
						<div key={t.id}>
							<Task taskName={t.taskName} id={t.id} />
							<div className="task-mng-button-container">
								<button className="task-mng-button task-mng-up-button">Up</button>
								<button className="task-mng-button task-mng-down-button">Down</button>
							</div>
						</div>
					))}
			</div>

		</div>
	);
}

export default TaskManager;