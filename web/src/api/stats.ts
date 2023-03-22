import { URLSearchParams } from 'url';
import { callAPI } from './base';

// Get stats for specific account
export const getStats = (accId: string, daysPast: number) => callAPI(`/stats?` + new URLSearchParams({ accId, daysPast: daysPast.toString() }).toString());
