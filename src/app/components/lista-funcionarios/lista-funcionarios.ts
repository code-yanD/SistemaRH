import { Component, inject, OnInit, signal } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario';
import { Funcionario } from '../../models/funcionario';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-lista-funcionarios',
  styleUrl: './lista-funcionarios.css',
  templateUrl: './lista-funcionarios.html',
})
export class ListaFuncionarios implements OnInit {
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

  deletarFuncionario(id: number): void {
    const confirmar = confirm('Tem certeza que deseja excluir este funcionário?');

    if (!confirmar) {
        return;
    }

    this.funcionarioService.deletar(id).subscribe({
      next: () => {
        this.funcionarios.update(lista =>
          lista.filter(funcionario => funcionario.id !== id)
        );
      },
      error: (erro) => {
        console.error('Erro ao excluir funcionário:', erro);
        alert('Não foi possível excluir o funcionário. Tente novamente.');
      }
    });
  }
}
