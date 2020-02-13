import { Injectable } from '@angular/core';
import { CLIENTES } from '../clientes/clientes.json';
import { Cliente } from '../models/cliente.js';
import { Observable, of } from 'rxjs';
import { tap , map } from 'rxjs/operators'; 
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'content-type':'application/json'});
  constructor(private http: HttpClient) { }

  getClientes(page : number): Observable <any> {
    return this.http.get(this.urlEndPoint+'/page/'+page);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint,cliente, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente, {headers:this.httpHeaders});
  }

  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }
}
