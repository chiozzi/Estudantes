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
  formGroupCourse: FormGroup; //cria o formulário
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
// quando o componente aparecer na tela

ngOnInit(): void {
    this.loadCourses();
  }
// busca todos os cursos cadastrados
  loadCourses(){
    this.service.getAll().subscribe({
      next: json => this.courses = json
    });
  }
  // salva um curso
  // se o curso já existe, atualiza
  save() {
    // se estiver editando um curso, atualiza
    if (this.editingCourse) {
      this.service.update(this.formGroupCourse.value).subscribe({
        next: () => {
          this.loadCourses(); // atualiza a lista de cursos
          this.formGroupCourse.reset(); // limpa o formulário
          this.editingCourse = null; // para de editar
        }
      });
    } else {
      // se for um novo curso, salva
      this.service.save(this.formGroupCourse.value).subscribe({
        next: json => {
          this.courses.push(json); // adiciona curso na lista
          this.formGroupCourse.reset(); // limpa o formulário
        }
      });
    }
  }
   // quando o usuário clicar no botão editar, carrega os dados do curso no formulário
  edit(course: Course) {
    this.formGroupCourse.setValue(course); // coloca os dados do curso no formulário
    this.editingCourse = course; // marca que está editando
  }
    


  delete(course: Course) {
    this.service.delete(course).subscribe( // remove o curso
      {
        next: () => this.loadCourses() // atualiza a lista de cursos
      }
    )
  }
}
