import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { AngebotErstellenZweiComponent } from './angebot-erstellen2.component';

describe('AngebotErstellenZweiComponent', () => {
  let component: AngebotErstellenZweiComponent;
  let fixture: ComponentFixture<AngebotErstellenZweiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngebotErstellenZweiComponent],
      imports: [FormsModule,ReactiveFormsModule] // Add the FormsModule here
    });
    fixture = TestBed.createComponent(AngebotErstellenZweiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
