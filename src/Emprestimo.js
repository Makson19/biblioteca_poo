export class Emprestimo {
  #id;
  #livro;
  #usuario;
  #dataEmprestimo;
  #dataPrevistaDevolucao;
  #dataEfetivaDevolucao;

  constructor(id, livro, usuario, dataEmprestimo, dataPrevistaDevolucao, dataEfetivaDevolucao = null) {
    this.#id = id;
    this.#livro = livro;
    this.#usuario = usuario;
    this.#dataEmprestimo = dataEmprestimo;
    this.#dataPrevistaDevolucao = dataPrevistaDevolucao;
    this.#dataEfetivaDevolucao = dataEfetivaDevolucao;
  }

  get id() {
    return this.#id;
  }

  get livro() {
    return this.#livro;
  }

  get usuario() {
    return this.#usuario;
  }

  get dataEmprestimo() {
    return this.#dataEmprestimo;
  }

  get dataPrevistaDevolucao() {
    return this.#dataPrevistaDevolucao;
  }

  get dataEfetivaDevolucao() {
    return this.#dataEfetivaDevolucao;
  }
}

