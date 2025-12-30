export interface ApiHoliday {
  title: string;
  date: string;
  notes?: string;
  bunting?: boolean;
}

export interface Holiday extends ApiHoliday {
  id: string; 
}

export interface RegionData {
  division: string;
  events: ApiHoliday[];
}

export interface GovResponse {
  [key: string]: RegionData;
}