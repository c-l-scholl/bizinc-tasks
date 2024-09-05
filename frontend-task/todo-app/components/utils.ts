/*
	Types are kept in a separate file so that
	other files only import from one place
*/

/**
 * used to pass information from TaskManager to Task
 */
type TaskProps = {
	taskName: string;
	dateCreated: Date,
	deleteCurrentTask: () => void;
}

/**
 * used for creating Tasks and interacting with the database
 */
type TaskType = {
	taskName: string;
	id: string;
	dateCreated: Date,
}

export type { TaskProps, TaskType };