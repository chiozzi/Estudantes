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

  constructor(private service: CourseService,
    private formBuilder: FormBuilder
){
this.formGroupCourse = formBuilder.group(
{
   id:[''],
   name: [''],
   level:[''],
   duration:[''], 
   available:[''],
   modality:['']
}
);

}

ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(){
    this.service.getCourse().subscribe({
      next: json => this.courses = json
    });
  }
  
  save()
  {
      this.service.saveCourse(this.formGroupCourse.value)
                  .subscribe
      (
          {
            next: json => {
                this.courses.push(json);
                this.formGroupCourse.reset();
            }
          }
      )
  }

  delete(course: Course) {
    this.service.delete(course).subscribe(
      {
        next: () => this.loadCourses()
      }
    )
  }
}
