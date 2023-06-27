import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { KasseComponent } from './kasse.component';

describe('KasseComponent', () => {
  let component: KasseComponent;
  let fixture: ComponentFixture<KasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KasseComponent],
      imports: [FormsModule,ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(KasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
