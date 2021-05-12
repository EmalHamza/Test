import { TestBed } from '@angular/core/testing';

import { ListContactService } from './list-contact.service';

describe('ListContactService', () => {
  let service: ListContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
