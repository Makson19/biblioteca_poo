export class Usuario {
  #id;
  #nome;
  #matricula;

  constructor(id, nome, matricula) {
    if (!id || !nome || !matricula) {
      throw new Error("Informe id, nome e matrícula do usuário.");
    }

    this.#id = id;
    this.#nome = nome;
    this.#matricula = matricula;
  }

  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome;
  }

  get matricula() {
    return this.#matricula;
  }
}
