type TaskProps = {
	taskName: string;
	id: string;
	deleteTask: (id: string) => void;
	editTask: (id: string) => void;
}

type TaskType = {
	taskName: string;
	id: string;
}

export type { TaskProps, TaskType };