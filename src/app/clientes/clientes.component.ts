import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router'
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
import * as moment from 'moment';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginador:any;
  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

   }

   ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params=>{

      let page: number = +params.get('page');

      this.clienteService.getClientes(page).subscribe(response=>{
        this.clientes = (response.content as Cliente[]);
        this.paginador = response;
      });
    }); 
  
  }

  
  
}
