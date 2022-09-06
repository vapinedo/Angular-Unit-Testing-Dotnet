import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentComponent } from './student.component';
import { HttpClientModule } from "@angular/common/http";
import { StudentService } from '../services/student.service';
import { of } from 'rxjs';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe("AdditionMethod", function() {
    it("should spy on addition method", function() {
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
      expect(component.result).toEqual({"result": 200});
    });
  });
});
