import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  additonResult: number = 0;
  studentApprovalState: any;
  counterValue: number = 0;
  private componentName: string = "";
  studentName: string = "Valp Pinedo";
  studentAge: number = 20;
  isInputReaonly: boolean = false;

  num: number = 20;
  redColor: string = "font-red";
  blueColor: string = "font-blue";

  pageHeader: string = "Student Informatión";
  firstName: string = "John";
  lastName: string = "Doe";
  columnSpan = 2;

  label: string = "Real Madrid";

  constructor(private studentSvc: StudentService) { }

  ngOnInit(): void {
  }

  addition(num1: number, num2:number): number {
    this.additonResult = num1 + num2;
    return this.additonResult;
  }

  private setComponentName(): void {
    this.componentName =  "StudentComponent";
  }

  saveData(): void {
    let info = {
      sumVal: this.addition(5,5),
      name: "Valp"
    };

    this.logToConsole(info);
    this.studentSvc.saveDetails(info).subscribe(response => {
      this.studentApprovalState = response;
    })
  }

  getStudentApprovalState(): void {
    const additionTotal = this.addition(10, 20);
    this.studentApprovalState = (additionTotal < 40) ? "fail" : "pass";
  }

  logToConsole(data: any): void {
    console.log(data);
  }

  onDecrement(): void {
    this.counterValue -= 1;
  }

  onIncrement(): void {
    this.counterValue = this.counterValue + 1;
  }

  onButton1Click(): void {
    this.label = "Real Madrid will win the UCL once more time!";
  }

  onButton2Click(): void {
    this.label = "Real Madrid will win The Ligue this season";
  }

  onChangeInput(): void {
    this.label = "Karim Benzema will be gain FIFA Best Soccer Player this year";
  }

  onChangeLabelInput(event: any): void {
    this.label = event.target.value;
  }

}
