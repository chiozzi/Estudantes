import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl = 'http://localhost:3000/courses';


  constructor(private http: HttpClient) { }

  getAll() : Observable<Course[]>{
    return this.http.get<Course[]>(this.apiUrl); // pede ao servidor a lista de cursos
  }

  save(course:Course): Observable<Course>{
    return this.http.post<Course>(this.apiUrl, course); // pede ao servidor para salvar o curso
  }

  delete(course:Course): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${course.id}`); // pede ao servidor para deletar o curso
 }

  update(course:Course): Observable<Course>{
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course); // pede ao servidor para atualizar o curso
 }


}
