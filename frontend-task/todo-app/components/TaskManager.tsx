"use client";

import { useEffect, useState } from "react";
import Task from "./Task";
import { TaskProps, TaskType } from "@/components/utils";
import "@/styles/TaskManager.modules.css";
import { SquareChevronDown, SquareChevronUp } from "lucide-react";

const TaskManager = () => {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [formValue, setFormValue] = useState<string>("");

	useEffect(() => {
		setTasks([
			{ id: "1", taskName: "Do Laundry" },
			{ id: "2", taskName: "Fold Laundry" },
		]);
	}, []);

	const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTask: TaskType = { id: String(Math.random() * 100), taskName: formValue }; // add random id to this
		if (!tasks) {
			setTasks([newTask])
		} else {
			setTasks(t => [newTask, ...t]);
		}
		
		setFormValue("");
	};

	// pass as prop into Task, call when delete pressed
	const deleteTask = async (taskId: string) => {
		if (!tasks) {
			return;
		}
		setTasks(t => t.filter((task, _) => task.id !== taskId));
	}

	const editTask = async (taskId: string) => {
		
	}

	return (
		<div className="task-mng-container">
			<div className="task-mng-input-container">
				<form onSubmit={addTask}>
					<input
						className="task-mng-input"
						value={formValue}
						onChange={(event) => {setFormValue(event?.target.value)}}
						placeholder="Enter a new task..."
					/>
					<button className="task-mng-add-button" type="submit" disabled={!formValue}>Add Task</button>
				</form>
			</div>
			<div className="task-list-container">
				{tasks &&
					tasks.map((t) => (
						<div key={t.id}>
							<Task taskName={t.taskName} id={t.id} deleteTask={deleteTask} editTask={editTask}/>
							<div className="task-mng-button-container">
								<button className="task-mng-button task-mng-up-button">
									<SquareChevronUp />
								</button>
								<button className="task-mng-button task-mng-down-button">
									<SquareChevronDown />
								</button>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default TaskManager;
