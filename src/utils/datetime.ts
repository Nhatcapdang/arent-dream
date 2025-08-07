import * as dateFns from 'date-fns';

/**
 * 2025-08-06T03:49:14.692Z
 */
export function formatISOToCustom(
  isoString: string,
  formatOutput:
    | 'yyyy.MM.dd HH:mm'
    | 'yyyy.MM.dd'
    | 'yyyy.MM.dd HH:mm:ss'
    | 'dd.MM'
): string {
  const date = new Date(isoString);
  return dateFns.format(date, formatOutput);
}
