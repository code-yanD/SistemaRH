import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root',})
export class FuncionarioService {
  private readonly http = inject(HttpClient);

  

  listar(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${environment.apiUrl}/usuarios`);
  }

  deletar(id: number): Observable<void>{
    return this.http.delete<void>(`${environment.apiUrl}/usuarios/${id}`);
  }
}