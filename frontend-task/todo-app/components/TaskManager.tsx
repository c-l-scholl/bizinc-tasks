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
			{ taskName: "Do Laundry" },
			{ taskName: "Fold Laundry" },
		]);
	}, []);

	const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (formValue.trim() === "") {
			return;
		}
		const newTask: TaskType = {
			taskName: formValue,
		}; 
		if (!tasks) {
			setTasks([newTask]);
		} else {
			setTasks((t) => [newTask, ...t]);
		}

		setFormValue("");
	};

	// pass as prop into Task, call when delete pressed
	const deleteTask = async (toDeleteIndex: number) => {
		if (!tasks) {
			return;
		}
		setTasks((t) => t.filter((task, index) => index !== toDeleteIndex));
	};

	const moveTaskUp = (index: number) => {
		if (index > 0) {
			const updatedTasks = [...tasks];
			[updatedTasks[index], updatedTasks[index - 1]] = 
				[updatedTasks[index - 1], updatedTasks[index]];
			setTasks(updatedTasks);
		}
	}

	const moveTaskDown = (index: number) => {
		if (index < tasks.length - 1) {
			const updatedTasks = [...tasks];
			[updatedTasks[index + 1], updatedTasks[index]] = 
				[updatedTasks[index] , updatedTasks[index + 1]];
			setTasks(updatedTasks);
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
							<Task taskName={task.taskName} deleteCurrentTask={() => deleteTask(index)} />
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
