import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Student } from './student.model';

import students from '../shared/students.json';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  public students: Array<Student> = [];
  private studentsSource = new BehaviorSubject<Array<Student>>(this.students);
  students$ = this.studentsSource.asObservable();

  constructor() {
    const storedData = JSON.parse(sessionStorage.getItem('studentGrades'));
    if (storedData) {
      this.students = storedData;
      this.updateStudents(this.students);
    }
  }

  updateStudents(students: Array<Student>) {
    sessionStorage.setItem('studentGrades', JSON.stringify(students));
    this.studentsSource.next(students);
  }
}
