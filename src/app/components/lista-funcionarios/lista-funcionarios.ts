import { Component, inject, OnInit, signal } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario';
import { Funcionario } from '../../models/funcionario';

@Component({
  imports: [],
  selector: 'app-lista-funcionarios',
  styleUrl: './lista-funcionarios.css',
  templateUrl: './lista-funcionarios.html',
})
export class ListaFuncionarios {
  private readonly funcionarioService = inject(FuncionarioService);

  protected readonly funcionarios = signal<Funcionario[]>([]);

  ngOnInit(): void {
  this.funcionarioService.listar().subscribe({
    next: (dados) => {
      this.funcionarios.set(dados);
    },
    error: (erro) => {
      console.error('Erro ao buscar funcionários:', erro);
    }
  });
}
}
