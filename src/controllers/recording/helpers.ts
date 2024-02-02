import type { FileStorage } from 'florescctvwebservice-types';

export function validateDeleteAllQuery (params: FileStorage.DeleteAllQueryParams): string | null {
  const {
    start_date: startDate,
    end_date: endDate
  } = params;

  if (startDate != null) {
    if (endDate == null) {
      return 'parameters "start_date" and "end_date" must be used together, "end_date" is missing';
    }
  }

  if (endDate != null) {
    if (startDate == null) {
      return 'parameters "start_date" and "end_date" must be used together, "start_date" is missing';
    }
  }

  return null;
}
