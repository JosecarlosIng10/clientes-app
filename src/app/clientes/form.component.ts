import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private cliente: Cliente= new Cliente();
  private titulo: string ="Crear Cliente";
 
  constructor(private clientesService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params=>{
      let id = params.get('id');
      if (id){
        this.clientesService.getCliente(id).subscribe(data=>{
          this.cliente = data;
        });
      }
    });
  }

 
  create(): void{
    console.log(this.cliente);
    this.clientesService.create(this.cliente).subscribe(
      data=> {
        this.router.navigate(['/clientes']);
        swal('Nuevo Cliente',`El cliente ${data.nombre} ha sido creado con exito`,'success');
    },
      error=>{
        swal('Error','No se pudo crear el cliente',"error");
      }
    )
  }

  updateCliente(): void{
    this.clientesService.updateCliente(this.cliente).subscribe(
      data=>{
        this.router.navigate(['/clientes']);
        swal('Actualizar Cliente',`El cliente ${data.nombre} ha sido actualizado con exito`,'success')
    });
  }

}
