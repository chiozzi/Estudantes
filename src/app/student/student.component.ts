import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {


  students: Student[] = [];
  formGroupStudent: FormGroup;
  courses: Course[] = [];


  constructor(
    private service: StudentService,
    private formBuilder: FormBuilder,
    private courseService: CourseService
){
this.formGroupStudent = formBuilder.group(
{
   id:[''],
   name: [''],
   courseId:['']
}
);


}

  ngOnInit(): void {
    this.loadStudents();
    this.courseService.getAll().subscribe({
      next: json => this.courses = json
    });
  }

  loadStudents(){
    this.service.getAll().subscribe({
      next: json => this.students = json
    });
  }
  
  save()
  {
      this.service.save(this.formGroupStudent.value)
                  .subscribe
      (
          {
            next: json => {
                this.students.push(json);
                this.formGroupStudent.reset();
            }
          }
      )
  }

  getCourseName(courseId: number): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.name : 'Não encontrado';
  }
  

  delete(student: Student) {
    this.service.delete(student).subscribe(
      {
        next: () => this.loadStudents()
      }
    )
  }
}