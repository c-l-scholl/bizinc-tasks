
import { CustomError } from "./CustomError";

export default class BadRequestError extends CustomError {
	private static readonly mStatus = 400;
	readonly status: number;
	readonly hasLogging: boolean;
	readonly mContext: { [key: string]: any };

	constructor(params?: { code?: number, message?: string, logging?: boolean, context?: { [key: string]: any }}) {
		const { code, message, logging } = params || {};

		super(message || "Bad Request");
		this.status = code || BadRequestError.mStatus;
		this.hasLogging = logging || false;
		this.mContext = params?.context || {};

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	get errors() {
		return [{ message: this.message, context: this.mContext }];
	}

	get statusCode() {
		return this.status;
	}

	get logging() {
		return this.hasLogging;
	}

}