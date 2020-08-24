import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from '../shared/student.model';
import { AppDataService } from '../shared/app-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit, OnDestroy {
  student: Student;
  students: Array<Student>;
  studentsSubscription: Subscription;

  public mask: Array<string | RegExp>;

  constructor(private appData: AppDataService) {
    this.mask = [/[0-9]/, /[0-9]/, /[0]/];
  }

  ngOnInit(): void {
    this.studentsSubscription = this.appData.students$.subscribe((value) => {
      this.students = value;
    });
  }

  deleteStudent(student) {
    this.students.splice(this.students.indexOf(student), 1);
    this.appData.updateStudents(this.students);
  }

  updateStudent(student) {
    student.editable = false;
    student.score = parseInt(student.score);
    this.appData.updateStudents(this.students);
  }

  ngOnDestroy() {
    this.studentsSubscription.unsubscribe();
  }
}
