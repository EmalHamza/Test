import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable()
export class myservicd {
  constructor() {}

  getDistrict(value: any) {
    return of([
      { id: 1, district_name: "District 1" },
      { id: 2, district_name: "District 2" },
      { id: 3, district_name: "District 3" },
      { id: 4, district_name: "District 4" }
    ]);
  }
  getProvinces() {
    return of([
      { id: 1, province_name: "Province 1" },
      { id: 2, province_name: "Province 2" },
      { id: 3, province_name: "Province 3" }
    ]);
  }
}
