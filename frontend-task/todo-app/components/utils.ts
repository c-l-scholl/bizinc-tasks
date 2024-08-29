type TaskProps = {
	taskName: string;
	deleteCurrentTask: () => void;
}

type TaskType = {
	taskName: string;
}

export type { TaskProps, TaskType };