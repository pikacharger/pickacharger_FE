export type ViewStyle = "map" | "list";

export interface ChargerType {
  id: number;
  type: string;
}

export interface Charger {
  chargerId: number;
  chargerLocation: string;
  chargerName: string;
  latitude: number;
  longitude: number;
  chargerTypeList: ChargerType[];
  chargerRole: string;
  avgRate: number;
  chargerStatus: string;
  chargingSpeed?: string;
  content?: string;
  memberPrice?: number;
  nonmemberPrice?: number;
  personalPrice?: number;
  chargerImageList?: any[];
  reviewList?: any[];
  favorite?: boolean;
  myChargerCheck? : boolean;
}

export interface ChargerStation {
  chargerGroupId: number;
  chargerLocation: string;
  chargerName: string;
  chargers: Charger[];
}

