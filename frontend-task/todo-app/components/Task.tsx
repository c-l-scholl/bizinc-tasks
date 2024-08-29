import { TaskProps } from "./utils";

const Task = ({ taskName, id, dateCreated}: TaskProps) => {
	

	return (
		<div className="task-container">
			<div className="task-name-container">
				<h2 className="task-name">{taskName}</h2>
			</div>
			<div className=""></div>
		</div>
	);
}

export default Task;