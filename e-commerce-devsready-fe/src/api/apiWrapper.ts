import { errorHandler } from "../utils/errorHandler";


export async function apiWrapper<T>(promise: Promise<T>): Promise<T | null> {
    try {
        return await promise;
    } catch (error) {
        errorHandler(error);
        return null;
    }
}
