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


  students: Student[] = []; //array
  formGroupStudent: FormGroup; // cria o formulário
  courses: Course[] = []; //array
  isEditing: boolean = false;


  constructor(  // torna objetos externos utilizaveis dentro do componente
    private service: StudentService,
    private formBuilder: FormBuilder,
    private courseService: CourseService
){
this.formGroupStudent = formBuilder.group( // inicia o formulario com os campos
{
   id:[''],
   name: [''],
   courseId:['']
}
);


}
 // quando o componente aparecer na tela
  ngOnInit(): void {
    this.loadStudents(); // carrega a lista de alunos
    this.courseService.getAll().subscribe({
      next: json => this.courses = json  // carrega a lista de cursos
    });
  }
 // busca todos os alunos cadastrados
  loadStudents(){
    this.service.getAll().subscribe({
      next: json => this.students = json
    });
  }
  // salva um aluno
  // se o aluno já existe, atualiza
  save() {
    const student = this.formGroupStudent.value;
    student.courseId = Number(student.courseId);  // converte o id do curso para número
  
    this.service.save(student)
      .subscribe({
        next: json => {
          this.students.push(json);
          this.formGroupStudent.reset();
        }
      });
  }

  
// pega o curso a partir do id
  getCourseName(courseId: number): string {
    const course = this.courses.find(c => c.id === courseId);
    return course ? course.name : 'Não encontrado';
  }
  
// remove um aluno
  delete(student: Student) {
    this.service.delete(student).subscribe(
      {
        next: () => this.loadStudents() // atualiza a lista depois de remover
      }
    )
  }
}