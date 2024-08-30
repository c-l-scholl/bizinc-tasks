"use client";

import { useEffect, useState } from "react";
import Task from "./Task";
import { TaskType } from "@/components/utils";
import "@/styles/TaskManager.modules.css";
import { SquareChevronDown, SquareChevronUp } from "lucide-react";
import { v4 as uuidV4 } from "uuid";

const TaskManager = () => {
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [formValue, setFormValue] = useState<string>("");
	const DB_URL = "http://localhost:8000/tasks";

	useEffect(() => {
		getTasks();
	}, []);

	// GET
	const getTasks = async () => {
		try {
			//const response = await fetch(`${DB_URL}?_sort=dateCreated&_order=desc`);
			const response = await fetch(DB_URL);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const tasksJson: TaskType[] = await response.json() as TaskType[];
			setTasks(tasksJson.reverse());

		} catch (err) {
			console.error(err);
		}
	}

	// POST
	const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValue.trim() === "") {
			return;
		}
		const newTask: TaskType = { id: uuidV4(), taskName: formValue, dateCreated: new Date() }; 
		try {
			const response = await fetch(DB_URL, {
				method: "POST", 
				headers: {
					"Content-type": "application/json",
				}, 
				body: JSON.stringify(newTask),
			});
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const createdTask = await response.json();
			
			getTasks();
			setFormValue("");
		} catch (err) {
			console.error(err);
		}
	};

	// DELETE
	const deleteTask = async (toDeleteIndex: number) => {
		if (!tasks) {
			return;
		}
		const taskToDelete: TaskType = tasks[toDeleteIndex];
		try {
			const response = await fetch(`${DB_URL}/${taskToDelete.id}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(taskToDelete),
			});
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const deletedTask = response.json();
			getTasks();
		} catch (err) {
			console.error(err);
		}
		
	};

	const moveTaskUp = async (index: number) => {
		if (index <= 0) {
			return;
		}
		const task1 = tasks[index - 1];
		const task2 = tasks[index];
		try {
			const response1 = await fetch(`${DB_URL}/${task1.id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(task2),
			});
			if (!response1.ok) {
				throw new Error(`Response status: ${response1.status}`);
			}
			const response2 = await fetch(`${DB_URL}/${task2.id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(task1),
			});
			if (!response2.ok) {
				throw new Error(`Response status: ${response2.status}`);
			}
			getTasks();
		} catch (err) {
			console.error(err);
		}
	}

	const moveTaskDown = async (index: number) => {
		if (index > tasks.length - 1) {
			return;
		}
		const task1 = tasks[index + 1];
		const task2 = tasks[index];
		try {
			const response1 = await fetch(`${DB_URL}/${task1.id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(task2),
			});
			if (!response1.ok) {
				throw new Error(`Response status: ${response1.status}`);
			}
			const response2 = await fetch(`${DB_URL}/${task2.id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(task1),
			});
			if (!response2.ok) {
				throw new Error(`Response status: ${response2.status}`);
			}
			getTasks();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className="task-mng-container">
			<div className="task-mng-input-container">
				<form onSubmit={addTask}>
					<input
						className="task-mng-input"
						value={formValue}
						onChange={(event) => {
							setFormValue(event?.target.value);
						}}
						placeholder="Enter a new task..."
					/>
					<button
						className="task-mng-add-button"
						type="submit"
						disabled={!formValue}
					>
						Add Task
					</button>
				</form>
			</div>
			<div className="task-list-container">
				{tasks &&
					tasks.map((task, index) => (
						<div key={index}>
							<Task taskName={task.taskName} dateCreated={task.dateCreated} deleteCurrentTask={() => deleteTask(index)} />
							<div className="task-mng-button-container">
								<button onClick={() => moveTaskUp(index)} className="task-mng-button task-mng-up-button">
									<SquareChevronUp />
								</button>
								<button onClick={() => moveTaskDown(index)} className="task-mng-button task-mng-down-button">
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
