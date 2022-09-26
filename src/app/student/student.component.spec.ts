import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StudentComponent } from './student.component';
import { HttpClientModule } from "@angular/common/http";
import { StudentService } from '../services/student.service';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let h1Tag: HTMLElement;
  let debug: DebugElement
  let service: StudentService;
  let service2: StudentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentComponent ],
      imports: [HttpClientModule, FormsModule],
      providers: [StudentService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    h1Tag = fixture.nativeElement.querySelector("h1");
    debug = fixture.debugElement;
    service = TestBed.get(StudentService);
    service2 = TestBed.inject(StudentService);
  });

  describe("StudentService", function() {
    it("should load the StudentService via TestBed using get method", function() {
      expect(service instanceof(StudentService)).toBeTrue();
    });
  
    it("should load the StudentService via TestBed using inject method", function() {
      expect(service2 instanceof(StudentService)).toBeTrue();
    });
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

  it("should test the ngStyle directive for p tag", function() {
    const element = fixture.debugElement.nativeElement.querySelector("#header1");
    expect(element.getAttribute("style")).toContain("color: black");
  });

  it("should test the ngClass directive for h1 tag", function() {
    const element = fixture.debugElement.nativeElement.querySelector("#header2");
    component.num = 5;
    fixture.detectChanges();
    expect(element.getAttribute("class")).toContain("font-red");
  });

  it("should test table colspan attribute", function() {
    const element: HTMLTableElement = fixture.debugElement.nativeElement.querySelector("#table1");
    expect(element.getAttribute("colspan")).toBe(String(component.columnSpan));
  });

  it("should test click event binding on button #1", function() {
    const element: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("#button1");
    expect(component.label).toEqual("Real Madrid");
    element.click();
    fixture.detectChanges();
    expect(component.label).toBe("Real Madrid will win the UCL once more time!");
  });

  it("should test click event binding on button #2", function() {
    const element: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector("#button2");
    expect(component.label).toBe("Real Madrid");
    element.click();
    fixture.detectChanges();
    expect(component.label).toBe("Real Madrid will win The Ligue this season");
  });

  it("should test changeInput event binding on input #1", function() {
    const element = HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#textBox1");
    expect(component.label).toBe("Real Madrid");
    element.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.label).toBe("Karim Benzema will be gain FIFA Best Soccer Player this year");
  });

  it("should test changeInputLabel event binding on input #2", function() {
    const element = HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#textBox2");
    expect(component.label).toBe("Real Madrid");
    element.value = "Message - updated";
    element.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.label).toBe("Message - updated");
  });

  it("should set new value for studenName property", function(done) {
    component.studentName = "Eden Hazard";
    fixture.detectChanges();
    fixture.whenStable()
      .then(function() {
        const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#student-name-input");
        expect(element.value).toBe("Eden Hazard");
        done();
      })
    });

  it("should set new value for studenName property - using waitForAsync method", waitForAsync(() => {
    component.studentName = "Eden Hazard";
    fixture.detectChanges();
    fixture.whenStable()
      .then(function() {
        const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#student-name-input");
        expect(element.value).toBe("Eden Hazard");
      })
  }));

  it("should set new value for studenName property - using fakeAsync method", fakeAsync(() => {
    component.studentName = "Eden Hazard";
    fixture.detectChanges();
    tick();
    const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#student-name-input");
    expect(element.value).toBe("Eden Hazard");
  }));
    
  it("should textBox studentName value", function(done) {
    fixture.detectChanges();
    fixture.whenStable()
    .then(function() {
      const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector("#student-name-input");
      element.value = "studentName updated";
      element.dispatchEvent(new Event("input"));
      expect(element.value).toBe(component.studentName);
      done();
    });
  });

  it("should test num property is greater than 20", function() {
    const element1: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#div1");
    const element2: HTMLDivElement = fixture.debugElement.nativeElement.querySelector("#div2");
    expect(element1).not.toBeNull();
    expect(element2).toBeNull();
  });

  it("should test num property is smaller than 20 :: ng-template", function() {
    component.num = 15; 
    fixture.detectChanges();
    const element1: HTMLParagraphElement = fixture.debugElement.nativeElement.querySelector("#ng1");
    const element2: HTMLParagraphElement = fixture.debugElement.nativeElement.querySelector("#ng2");
    expect(element1).toBeNull();
    expect(element2).not.toBeNull(); 
  });

  it("should test ngFor1 for simple array", function() {
    const element: DebugElement[] = fixture.debugElement.queryAll(By.css(".ngFor1"));
    expect(element.length).toBe(4);
    element.forEach((obj: DebugElement, index: number) => {
      expect(obj.children[0].nativeElement.innerHTML.trim()).toEqual(component.colorNames[index]);
    });
  });

  it("should test ngFor2 for simple array", function() {
    const element: DebugElement[] = fixture.debugElement.queryAll(By.css(".ngFor2"));
    expect(element.length).toBe(4);
    element.forEach((obj: DebugElement, index: number) => {
      expect(obj.children[0].nativeElement.innerHTML.trim())
      .toEqual(component.colorList[index].name + " - " + component.colorList[index].id);
    });
  });

  it("should test ngFor3 for simple array", function() {
    const element: DebugElement[] = fixture.debugElement.queryAll(By.css(".ngFor3"));
    expect(element.length).toBe(4);
    element.forEach((obj: DebugElement, index: number) => {
      const output = `${index} - ${index === 0 ? true : false} - ${element.length-1 === index ? true : false} - ${index % 2 === 0} - ${index % 2 !== 0}`;
      expect(obj.children[0].nativeElement.innerHTML.trim()).toEqual(output);
    });
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
