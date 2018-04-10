export class ListResponse<T> {
  docs: T[];
  readonly limit: number;
  readonly page: number;
  readonly pages: number;
  readonly total: number;
}
