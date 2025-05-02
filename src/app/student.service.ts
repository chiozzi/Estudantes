import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }
  
  getAll() : Observable<Student[]>{
    return this.http.get<Student[]>(this.apiUrl); // pede ao servidor a lista de alunos
  }

  save(student:Student): Observable<Student>{
    return this.http.post<Student>(this.apiUrl, student); // pede ao servidor para salvar o aluno
  }

  delete(student:Student): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${student.id}`); // pede ao servidor para deletar o aluno
 }

  update(student:Student): Observable<Student>{
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student); // pede ao servidor para atualizar o aluno
 }
}
