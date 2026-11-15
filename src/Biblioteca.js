import { Emprestimo } from "./Emprestimo.js";
import { transformarDataBRparaUS } from "./utils/functions.js";

export class Biblioteca {
  #livros;
  #usuarios;
  #emprestimos;

  constructor() {
    this.#livros = [];
    this.#usuarios = [];
    this.#emprestimos = [];
  }

  get livros() {
    return this.#livros;
  }

  get usuarios() {
    return this.#usuarios;
  }

  get emprestimos() {
    return this.#emprestimos
  }

  listarLivros() {
    for (let i = 0; i < this.#livros.length; i++) {
      const livro = this.#livros[i];
      console.log(
        `${livro.id} - ${livro.titulo} (autor: ${livro.autor}, categoria: ${livro.categoria})`,
      );
    }
  }

  listarUsuarios() {
    for (let i = 0; i < this.#usuarios.length; i++) {
      const usuario = this.#usuarios[i];
      console.log(
        `${usuario.id} - ${usuario.nome} (matrícula: ${usuario.matricula})`,
      );
    }
  }

  listarEmprestimos() {
    console.log("***** Lista de Empréstimos *****");
    for (let i = 0; i < this.#emprestimos.length; i++) {
      const emprestimo = this.#emprestimos[i];

      console.log(`---- Emprestimo -> ${emprestimo.id} ----`);
      console.log(`| Livro: ${emprestimo.livro.titulo}`);
      console.log(`| Usuário: ${emprestimo.usuario.nome}`);
      console.log(`| Data de empréstimo: ${emprestimo.dataEmprestimo}`);
      console.log(
        `| Data prevista de devolução: ${emprestimo.dataPrevistaDevolucao}`,
      );
      console.log(
        `| Data de devolução: ${emprestimo.dataEfetivaDevolucao ?? ""}\n`,
      );
    }
    console.log("--------------------------------\n");
  }

  cadastrarLivro(livro) {
    this.#livros = [...this.#livros, livro];
  }

  cadastrarUsuario(usuario) {
    this.#usuarios = [...this.#usuarios, usuario];
  }

  registrarEmprestimo(
    id,
    livroId,
    usuarioId,
    dataEmprestimo,
    dataPrevistaDevolucao,
  ) {
    const livro = this.#livros.find((l) => l.id === livroId);
    const usuario = this.#usuarios.find((u) => u.id === usuarioId);

    if (!livro || !usuario) {
      throw new Error("Livro ou usuário não encontrado.");
    }

    const emprestimoAtivoExistente = this.#emprestimos.find((emp) => {
      return emp.livro.id === livroId && emp.dataEfetivaDevolucao === null;
    });

    if (emprestimoAtivoExistente) {
      throw new Error("O livro já está emprestado para outro usuário.");
    }

    const novoEmprestimo = new Emprestimo(
      id,
      livro,
      usuario,
      dataEmprestimo,
      dataPrevistaDevolucao,
    );
    this.#emprestimos = [...this.#emprestimos, novoEmprestimo];
    return novoEmprestimo;
  }

  registrarDevolucao(emprestimoId, dataEfetivaDevolucao) {
    this.#emprestimos = this.#emprestimos.map((emp) => {
      if (emp.id === emprestimoId) {
        return new Emprestimo(
          emp.id,
          emp.livro,
          emp.usuario,
          emp.dataEmprestimo,
          emp.dataPrevistaDevolucao,
          dataEfetivaDevolucao,
        );
      }
      return emp;
    });
  }

  static filtrarLivrosPorCategoria(livros, categoria) {
    return livros.filter(
      (livro) => livro.categoria.toLowerCase() === categoria.toLowerCase(),
    );
  }

  static calcularMulta(diasAtraso, valorDiario = 2.0) {
    if (diasAtraso <= 0) {
      return 0;
    }
    return diasAtraso * valorDiario;
  }

  static filtrarEmprestimosAtrasados(emprestimos, dataReferencia) {
    const dataRef = new Date(transformarDataBRparaUS(dataReferencia));
    return emprestimos.filter((emp) => {
      if (emp.dataEfetivaDevolucao !== null) {
        return false;
      }
      const dataPrevista = new Date(
        transformarDataBRparaUS(emp.dataPrevistaDevolucao),
      );
      return dataRef > dataPrevista;
    });
  }

  static gerarRelatorioMultas(emprestimos, dataReferencia) {
    const atrasados = Biblioteca.filtrarEmprestimosAtrasados(
      emprestimos,
      dataReferencia,
    );
    const dataRef = new Date(transformarDataBRparaUS(dataReferencia));

    const comMultas = atrasados.map((emp) => {
      const dataPrevista = new Date(
        transformarDataBRparaUS(emp.dataPrevistaDevolucao),
      );
      const diffTime = dataRef.getTime() - dataPrevista.getTime();
      const diffDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const valorMulta = Biblioteca.calcularMulta(diffDias);

      return {
        id: emp.id,
        livro: emp.livro.titulo,
        usuario: emp.usuario.nome,
        diasAtraso: diffDias,
        multa: valorMulta,
      };
    });

    const valorTotal = comMultas.reduce((acc, item) => acc + item.multa, 0);

    return {
      detalhes: comMultas,
      valorTotal: valorTotal,
    };
  }

  static calcularEstatisticas(livros, emprestimos, dataReferenciaStr) {
    const livrosPorCategoria = livros.reduce((acc, livro) => {
      acc[livro.categoria] = (acc[livro.categoria] || 0) + 1;
      return acc;
    }, {});

    const emprestimosPorUsuario = emprestimos.reduce((acc, emp) => {
      const nomeUsuario = emp.usuario.nome;
      acc[nomeUsuario] = (acc[nomeUsuario] || 0) + 1;
      return acc;
    }, {});

    const emprestimosAtivos = emprestimos.filter(
      (emp) => emp.dataEfetivaDevolucao === null,
    );
    const emprestimosAtrasados = Biblioteca.filtrarEmprestimosAtrasados(
      emprestimos,
      dataReferenciaStr,
    );
    const relatorio = Biblioteca.gerarRelatorioMultas(
      emprestimos,
      dataReferenciaStr,
    );

    return {
      livrosPorCategoria,
      emprestimosPorUsuario,
      totalEmprestimosAtivos: emprestimosAtivos.length,
      totalEmprestimosAtivosAtrasados: emprestimosAtrasados.length,
      valorTotalMultas: relatorio.valorTotal,
    };
  }
}
