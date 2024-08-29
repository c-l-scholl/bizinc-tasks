type TaskProps = {
	taskName: string;
	dateCreated: Date,
	deleteCurrentTask: () => void;
}

type TaskType = {
	taskName: string;
	id: string;
	dateCreated: Date,
}

export type { TaskProps, TaskType };