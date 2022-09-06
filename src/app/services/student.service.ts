import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class StudentService {

    constructor(public http: HttpClient) {}

    saveDetails(info: object): Observable<Object> {
        return this.http.post("https://localhost:4200", info);
    }
}