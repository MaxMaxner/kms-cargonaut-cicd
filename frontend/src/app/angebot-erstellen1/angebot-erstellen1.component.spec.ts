import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AngebotErstellenEinsComponent } from './angebot-erstellen1.component';

describe('AngebotErstellenEinsComponent', () => {
  let component: AngebotErstellenEinsComponent;
  let fixture: ComponentFixture<AngebotErstellenEinsComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AngebotErstellenEinsComponent],
        imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AngebotErstellenEinsComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log empty inputs', () => {
    spyOn(console, 'log');
    component.myForm.get('datum')?.setValue('');
    component.myForm.get('von')?.setValue('');
    component.myForm.get('nach')?.setValue('');
    component.myForm.get('handynummer')?.setValue('');
    component.validateForm();
    expect(console.log).toHaveBeenCalledWith('Empty inputs:', ['datum', 'von', 'nach', 'handynummer']);
  });

});
