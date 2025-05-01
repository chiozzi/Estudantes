import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course',
  standalone: false,
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {

  courses: Course[] = [];
  formGroupCourse: FormGroup;
  editingCourse: Course | null = null;


  constructor(private service: CourseService,
    private formBuilder: FormBuilder
){
this.formGroupCourse = formBuilder.group(
{
   id:[''],
   name: [''],
   level:[''],
   duration:[''], 
   available:[false],
   modality:['']
}
);

}

ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(){
    this.service.getAll().subscribe({
      next: json => this.courses = json
    });
  }
  
  save() {
    if (this.editingCourse) {
      this.service.update(this.formGroupCourse.value).subscribe({
        next: () => {
          this.loadCourses();
          this.formGroupCourse.reset();
          this.editingCourse = null;
        }
      });
    } else {
      this.service.save(this.formGroupCourse.value).subscribe({
        next: json => {
          this.courses.push(json);
          this.formGroupCourse.reset();
        }
      });
    }
  }
  
  edit(course: Course) {
    this.formGroupCourse.setValue(course);
    this.editingCourse = course;
  }
    


  delete(course: Course) {
    this.service.delete(course).subscribe(
      {
        next: () => this.loadCourses()
      }
    )
  }
}
