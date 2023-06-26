import { TestBed } from '@angular/core/testing';

import { SessionServiceService } from './session-service.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SessionServiceService', () => {
  let service: SessionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],});

    service = TestBed.inject(SessionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
