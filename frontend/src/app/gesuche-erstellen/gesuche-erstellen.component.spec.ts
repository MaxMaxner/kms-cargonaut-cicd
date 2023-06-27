import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { GesucheErstellenComponent } from './gesuche-erstellen.component';

describe('GesucheErstellenComponent', () => {
  let component: GesucheErstellenComponent;
  let fixture: ComponentFixture<GesucheErstellenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GesucheErstellenComponent],
      imports: [FormsModule,ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(GesucheErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
