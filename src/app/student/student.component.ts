import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  additonResult: number = 0;
  result: any;

  constructor(private studentSvc: StudentService) { }

  ngOnInit(): void {
  }

  addition(num1: number, num2:number): number {
    this.additonResult = num1 + num2;
    return this.additonResult;
  }

  saveData(): void {
    let info = {
      sumVal: this.addition(5,5),
      name: "Valp"
    };

    this.logToConsole(info);
    this.studentSvc.saveDetails(info).subscribe(response => {
      this.result = response;
    })
  }

  studentResult() {
    const additionTotal = this.addition(10, 20);
    return (additionTotal < 40) ? "fail" : "pass";
  }

  logToConsole(data: any): void {
    console.log(data);
  }

}
