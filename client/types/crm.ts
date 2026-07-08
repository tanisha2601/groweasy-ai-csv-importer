export interface CRMRecord {
  name: string;
  email: string;
  mobile_without_country_code: string;
  company: string;
  city: string;
  crm_status: string;
}

export interface ImportResult {
  totalImported: number;
  totalSkipped: number;
  records: CRMRecord[];
}