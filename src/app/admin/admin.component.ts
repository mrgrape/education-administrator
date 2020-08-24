import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppDataService } from '../shared/app-data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Student } from '../shared/student.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public studentScoreForm;
  public mask: Array<string | RegExp>;
  studentsSubscription: Subscription;
  students: Array<Student>;

  minScore: number;
  maxScore: number;
  averageScore: number;

  constructor(private fb: FormBuilder, private appData: AppDataService) {
    this.mask = [/[0-9]/, /[0-9]/, /[0]/];
  }

  ngOnInit() {
    this.studentsSubscription = this.appData.students$.subscribe((value) => {
      this.students = value;
      if (this.students.length > 0) {
        this.calculateStats();
      } else {
        this.minScore = 0;
        this.maxScore = 0;
        this.averageScore = 0;
      }
    });
    this.buildStudentScoreForm();
  }

  calculateStats() {
    const sortedStudents = this.students.sort((a, b) => a.score - b.score);
    if (sortedStudents) {
      this.minScore = sortedStudents[0].score;
      this.maxScore = sortedStudents[sortedStudents.length - 1].score;
    }
    let total = 0;
    sortedStudents.forEach((student) => {
      total += student.score;
    });
    this.averageScore = Math.round(total / sortedStudents.length);
  }

  buildStudentScoreForm() {
    this.studentScoreForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      score: [0, [Validators.required, Validators.maxLength(3)]],
      editable: [false],
    });
  }

  onSaveChanges() {
    const studentScore = this.studentScoreForm.value;
    studentScore.score = parseInt(studentScore.score);
    this.students.push(studentScore);
    this.appData.updateStudents(this.students);
    this.studentScoreForm.reset();
  }
}
