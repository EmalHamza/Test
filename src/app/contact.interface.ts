import {ItemRows} from './itemRows.interface';
export interface Contact {
    id:any;
    name: any;
    fName: any;
    email: any;
    mobile: any;
    department_id:any;
    state_id:any;
    country_id:any;
    itemRows?: ItemRows[];
  }