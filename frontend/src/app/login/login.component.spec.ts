import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { RouterModule } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import {HttpClientModule} from "@angular/common/http";

describe('LoginComponent', () => {
    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:
              [
                RouterModule.forRoot([]),
                RouterTestingModule,
                FormsModule,
                HttpClientModule,
              ],
            declarations: [LoginComponent],
        })
        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
