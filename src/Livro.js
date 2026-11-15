export class Livro {
  #id;
  #titulo;
  #autor;
  #categoria;

  constructor(id, titulo, autor, categoria) {
    if (!id || !titulo || !autor || !categoria) {
      throw new Error("Informe id, título, autor e categoria do livro.");
    }

    this.#id = id;
    this.#titulo = titulo;
    this.#autor = autor;
    this.#categoria = categoria;
  }

  get id() {
    return this.#id;
  }

  get titulo() {
    return this.#titulo;
  }

  get autor() {
    return this.#autor;
  }

  get categoria() {
    return this.#categoria;
  }
}
