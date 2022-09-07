import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentComponent } from './student.component';
import { HttpClientModule } from "@angular/common/http";
import { StudentService } from '../services/student.service';
import { of } from 'rxjs';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let h1Tag: HTMLElement;

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
