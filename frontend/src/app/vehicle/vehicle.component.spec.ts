import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleComponent } from './vehicle.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VehicleComponent', () => {
    let component: VehicleComponent;
    let fixture: ComponentFixture<VehicleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([]),
                RouterTestingModule,
                FormsModule,
                HttpClientTestingModule,
            ],
            declarations: [VehicleComponent],
        });
        fixture = TestBed.createComponent(VehicleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
