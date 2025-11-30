
export interface LatLng {
  lat: number;
  lng: number;
}

export interface Aoi {
  id: string;
  name: string;
  vertices: LatLng[];
  visible: boolean;
}
