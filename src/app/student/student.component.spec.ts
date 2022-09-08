import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StudentComponent } from './student.component';
import { HttpClientModule } from "@angular/common/http";
import { StudentService } from '../services/student.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let h1Tag: HTMLElement;
  let debug: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentComponent ],
      imports: [HttpClientModule],
      providers: [StudentService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h1Tag = fixture.nativeElement.querySelector("h1");
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should verify element h1 value", function() {
    component.getStudentApprovalState();
    fixture.detectChanges();
    expect(h1Tag.textContent).toBe(component.studentApprovalState);
    expect(component.studentApprovalState).toBe("fail");
  });

  it("should h1 element value be fail", function() {
    component.getStudentApprovalState();
    fixture.detectChanges();
    expect(component.studentApprovalState).toBe("fail");
  });

  it("should increase counterValue when increase button is clicked", function() {
    const counterValue = debug.query(By.css("#counter-value"));
    const increaseButton = debug.query(By.css("#increase-button"));
    increaseButton.triggerEventHandler("click", {});
    fixture.detectChanges();
    expect(component.counterValue).toEqual(Number(counterValue.nativeElement.innerText));
  });

  it("should be call or run the setDisplayName private method", function() {
    component["setComponentName"]();
    expect(component["componentName"]).toBe("StudentComponent");
  });

  it("should spy on setDisplayName private method", function() {
    let spyOnSetComponentName = spyOn<any>(component, "setComponentName");
    spyOnSetComponentName();
    expect(spyOnSetComponentName).toHaveBeenCalled();
  });

  it("should test interpolation is working fine", function() {
    const studentName: HTMLElement = fixture.debugElement.nativeElement.querySelector("#student-name");
    expect(studentName.innerHTML).toBe(component.studentName);
    component.studentName = "Karin Benzema";
    fixture.detectChanges();
    expect(studentName.innerHTML).toBe(component.studentName);
  });

  it("should test property binding is working fine", function() {
    const studentInputText: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#student-input-text");
    expect(studentInputText.readOnly).toBeFalse();
  });
  
  describe("AdditionMethod", function() {
    xit("should spy on addition method", function() {
      spyOn(component, "addition");
      component.saveData();
      expect(component.addition).toHaveBeenCalled();
    });

    it("should spy on student service call", function() {
      let service = fixture.debugElement.injector.get(StudentService);
      spyOn(service, "saveDetails").and.callFake(function() {
        return of({
          "result": 200
        });
      });
      component.saveData();
      expect(component.studentApprovalState).toEqual({"result": 200});
    });
  });
});
