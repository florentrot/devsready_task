import { toast } from "react-toastify";

export function errorHandler(error: any) {
    if (!error) {
        toast.error("Unexpected error");
        return;
    }

    if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err: any) => toast.error(`${err.field}: ${err.message}`));
        return;
    }

    toast.error(error.message || "Something went wrong");
}
