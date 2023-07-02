import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User2Service } from './user2.service';

describe('User2Service', () => {
    let service: User2Service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(User2Service);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
