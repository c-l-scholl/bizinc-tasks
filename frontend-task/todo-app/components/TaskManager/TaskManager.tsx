"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { TaskType } from "@/components/utils";
import Task from "../Task/Task";
import "./TaskManager.modules.css";
import { SquareChevronDown, SquareChevronUp } from "lucide-react";
import { v4 as uuidV4 } from "uuid";

/**
 * TaskManager the logic and database connections.
 */
const TaskManager = () => {
	/**
	 * State to manage the loading status of the task list.
	 * @type {boolean}
	 */
	const [isTaskListLoading, setIsTaskListLoading] = useState<boolean>(false);

	/**
	 * State to manage the list of tasks.
	 * @type {TaskType[]}
	 */
	const [tasks, setTasks] = useState<TaskType[]>([]);

	/**
	 * State to manage the form input value.
	 * @type {string}
	 */
	const [formValue, setFormValue] = useState<string>("");

	/**
	 * URL of the database endpoint.
	 * note: Could be updated to have a variable for port
	 * @type {string}
	 */
	const DB_URL = "http://localhost:8000/tasks";

	/**
	 * Fetches the list of tasks from the database when the component mounts.
	 * @function
	 */
	useEffect(() => {
		getTasks();
	}, []);


	/**
	 * Update the layout when the loading state changes
	 * @function
	 */
	useLayoutEffect(() => {

	}, [isTaskListLoading]);

	/**
	 * Fetches the list of tasks from the database
	 * Sets tasks to the reverse of the list to maintain
	 * @function
	 */
	const getTasks = async () => {
		setIsTaskListLoading(true);
		try {
			const response = await fetch(DB_URL);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const tasksJson: TaskType[] = (await response.json()) as TaskType[];
			setTasks(tasksJson.reverse());
		} catch (err) {
			console.error(err);
		}
		setIsTaskListLoading(false);
	};

	/** 
	 * Adds a task to the database
	 * Prevents form event resetting the page
	 * Cannot submit an invalid or empty string
	 * @function
	 * @param {React.FormEvent<HTMLFormElement>} e - the form submit event
	 */
	const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formValue.trim() === "") {
			return;
		}

		const newTask: TaskType = {
			id: uuidV4(),
			taskName: formValue.trim(),
			dateCreated: new Date(),
		};

		setIsTaskListLoading(true);

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
			console.log("Created Task:", createdTask);
			getTasks();
			setFormValue("");
		} catch (err) {
			console.error(err);
		}
		setIsTaskListLoading(false);
	};

	/**
	 * Deletes a task by id from the database
	 * @function
	 * @param {number} toDeleteIndex - 	the index of the task to be deleted 
	 * 																	in the tasks array
	 */
	const deleteTask = async (toDeleteIndex: number) => {
		if (!tasks) {
			return;
		}

		const taskToDelete: TaskType = tasks[toDeleteIndex];

		setIsTaskListLoading(true);

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
			console.log("Deleted task:", deletedTask);
			getTasks();
		} catch (err) {
			console.error(err);
		}
		setIsTaskListLoading(false);
	};

	/**
	 * Moves a task up in the tasks array
	 * @function
	 * @param {number} index - the index of the task to be moved up
	 */
	const moveTaskUp = async (index: number) => {
		if (index <= 0) {
			return;
		}
		const task1: TaskType = tasks[index - 1];
		const task2: TaskType = tasks[index];

		switchTasks(task1, task2);
	};

	/**
	 * Moves a task up in the tasks array
	 * @function
	 * @param {number} index - the index of the task to be moved down
	 */
	const moveTaskDown = async (index: number) => {
		if (index > tasks.length - 1) {
			return;
		}
		const task1: TaskType = tasks[index + 1];
		const task2: TaskType = tasks[index];

		switchTasks(task1, task2);
	};


	/**
	 * Switches the order of two tasks in the database using PUT
	 * @function
	 * @param {TaskType} task1 - a task to be switched
	 * @param {TaskType} task2 - the other task to be switched
	 */
	const switchTasks = async (task1: TaskType, task2: TaskType) => {
		setIsTaskListLoading(true);
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
			const updatedTask1 = response1.json();
			console.log("Updated Task 1:", updatedTask1);

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
			const updatedTask2 = response2.json();
			console.log("Updated Task 2:", updatedTask2);
			getTasks();
		} catch (err) {
			console.error(err);
		}
		setIsTaskListLoading(false);
	};

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

				{/* Show loading based on state */}

				{isTaskListLoading && <span className="loading-text">Loading...</span>}
				{tasks &&
					!isTaskListLoading &&
					tasks.map((task, index) => (
						<div key={index}>
							<Task
								taskName={task.taskName}
								dateCreated={task.dateCreated}
								deleteCurrentTask={() => deleteTask(index)}
							/>
							<div className="task-mng-button-container">
								<button
									onClick={() => moveTaskUp(index)}
									className="task-mng-button task-mng-up-button"
									disabled={index <= 0}
								>
									<SquareChevronUp />
								</button>
								<button
									onClick={() => moveTaskDown(index)}
									className="task-mng-button task-mng-down-button"
									disabled={index >= tasks.length - 1}
								>
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
