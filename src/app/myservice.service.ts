import { Injectable } from '@angular/core';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

  constructor() { }

  getDistrict(value: any) {
    switch (Number(value)) {
      case 1: {
        return of([
          { id: 1, district_name: "District 1" },
          { id: 2, district_name: "District 2" },
          { id: 3, district_name: "District 3" }
        ]);
      }
      case 2: {
        return of([
          { id: 7, district_name: "District 7" },
          { id: 10, district_name: "District 10" }
        ]);
      }
      case 3: {
        return of([
          { id: 11, district_name: "District 5" },
          { id: 12, district_name: "District 6" },
          { id: 8, district_name: "District 8" },
          { id: 9, district_name: "District 9" }
        ]);
      }
      default: {
        return of([
          { id: 13, district_name: "District 9" },
          { id: 14, district_name: "District 10" },
          { id: 4, district_name: "District 4" }
        ]);
      }
    }
  }
  getProvinces() {
    return of([
      { id: 1, province_name: "Province 1" },
      { id: 2, province_name: "Province 2" },
      { id: 3, province_name: "Province 3" },
      { id: 4, province_name: "Province 4" }
    ]);
  }
}
