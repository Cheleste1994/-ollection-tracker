export interface Timezone {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
  countryId: string;
}

export interface Country {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isoCode: string;
  name: string;
  phonecode: string;
  flag: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones: Timezone[];
}

type Nullable<T> = T | null;
