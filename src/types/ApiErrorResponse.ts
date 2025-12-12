export interface ApiErrorResponse {
  error: boolean;
  message: string;
  data: Record<string, string[]>;
}
