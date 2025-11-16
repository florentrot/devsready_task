import type { FieldError } from "./FieldError"

export interface ValidationErrorResponse {
  errors: FieldError[];
}