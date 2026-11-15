# 📚 Sistema de Gerenciamento de Biblioteca

Projeto desenvolvido na disciplina de **Paradigmas de Linguagens de Programação** (4º período - [Unipê](https://www.unipe.edu.br)), com o objetivo de aplicar na prática os principais conceitos dos paradigmas de programação — em especial a **Programação Orientada a Objetos (POO)** e elementos de **Programação Funcional** — usando **JavaScript moderno (ES Modules)**.

O sistema simula o funcionamento de uma biblioteca: cadastro de livros e usuários, registro de empréstimos e devoluções, cálculo de multas por atraso e geração de relatórios e estatísticas, tudo exibido no terminal.

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Requisitos](#-requisitos)
- [Como executar](#-como-executar)
- [Documentação das classes](#-documentação-das-classes)
  - [Livro](#classe-livro)
  - [Usuario](#classe-usuario)
  - [Emprestimo](#classe-emprestimo)
  - [Biblioteca](#classe-biblioteca)
  - [utils/functions.js](#utilsfunctionsjs)
- [Regras de negócio](#-regras-de-negócio)
- [Paradigmas e conceitos aplicados](#-paradigmas-e-conceitos-aplicados)
- [Exemplo de saída](#-exemplo-de-saída)
- [Licença](#-licença)

---

## 🚀 Funcionalidades

- ✅ **Cadastro de livros** (id, título, autor e categoria)
- ✅ **Cadastro de usuários** (id, nome e matrícula)
- ✅ **Registro de empréstimos**, vinculando um livro a um usuário com data de empréstimo e data prevista de devolução
- ✅ **Validação de empréstimo**: não permite emprestar um livro que já está emprestado, nem registrar empréstimo de livro/usuário inexistente
- ✅ **Registro de devoluções**, com data efetiva de devolução
- ✅ **Cálculo de multas por atraso** (R$ 2,00 por dia de atraso, valor configurável)
- ✅ **Filtro de livros por categoria** (sem diferenciar maiúsculas de minúsculas)
- ✅ **Filtro de empréstimos atrasados** a partir de uma data de referência
- ✅ **Relatório de multas**, com detalhes por empréstimo e valor total
- ✅ **Estatísticas do sistema**: livros por categoria, empréstimos por usuário, totais de empréstimos ativos/atrasados e valor total de multas
- ✅ **Listagem formatada** de usuários, livros e empréstimos no terminal

---

## 🗂️ Estrutura do projeto

```
biblioteca/
├── package.json            # Configuração do projeto (ES Modules + script de execução)
├── .gitignore              # Ignora a pasta node_modules
├── README.md               # Este arquivo
└── src/
    ├── index.js            # Ponto de entrada: monta o cenário de demonstração
    ├── Biblioteca.js       # Classe principal: gerencia livros, usuários e empréstimos
    ├── Livro.js            # Entidade Livro
    ├── Usuario.js          # Entidade Usuario
    ├── Emprestimo.js       # Entidade Emprestimo
    └── utils/
        └── functions.js    # Funções utilitárias de conversão de datas (BR ⇄ US)
```

---

## ⚙️ Requisitos

- [Node.js](https://nodejs.org/) **14 ou superior** (recomenda-se uma versão LTS).

  > O projeto usa **ES Modules** (`"type": "module"` no `package.json`) e **campos privados de classe** (`#campo`), recursos suportados nativamente pelo Node nas versões citadas.

- Não há **dependências externas** — todo o código utiliza apenas recursos nativos da linguagem.

---

## ▶️ Como executar

Na raiz do projeto, execute:

```bash
npm run dev
```

Esse comando roda o script definido no `package.json` (`node ./src/index.js`), que monta um cenário de demonstração com:

- **2 usuários**: Makson Douglas (matrícula 2026001) e Karine Dantas (matrícula 2026002);
- **5 livros**: *Qualidade de Software Vol. 1*, *O Senhor dos Anéis*, *Maze Runner*, *Harry Potter e a Pedra Filosofal* e *Duna*;
- **4 empréstimos**, sendo 1 devolvido dentro do prazo e 2 com atraso;
- Ao final, exibe a lista de empréstimos, o **relatório de multas** e as **estatísticas do sistema** com a data de referência `13/11/2026`.

> 💡 Para experimentar outros cenários, edite o arquivo `src/index.js`: cadastre novos livros/usuários, registre outros empréstimos/devoluções ou mude a data de referência dos relatórios.

---

## 🏛️ Documentação das classes

### Classe `Livro`

Representa um **livro** do acervo. Está definida em `src/Livro.js`.

```js
new Livro(id, titulo, autor, categoria)
```

| Parâmetro    | Tipo     | Descrição                                        |
| ------------ | -------- | ------------------------------------------------ |
| `id`         | `number` | Identificador único do livro                     |
| `titulo`     | `string` | Título da obra                                   |
| `autor`      | `string` | Nome do autor                                    |
| `categoria`  | `string` | Categoria/gênero (ex.: `Ficção`, `Programação`)  |

- **Validação**: se qualquer parâmetro estiver vazio, o construtor lança `Error("Informe id, título, autor e categoria do livro.")`.
- **Encapsulamento**: todos os atributos são **privados** (`#id`, `#titulo`, `#autor`, `#categoria`) e expostos apenas por *getters* de leitura — os dados do livro não podem ser alterados depois de criado (**imutabilidade**).

```js
import { Livro } from './Livro.js';

const livro = new Livro(1, 'Duna', 'Frank Herbert', 'Ficção');

livro.titulo;    // 'Duna'
livro.categoria; // 'Ficção'
```

### Classe `Usuario`

Representa um **usuário** da biblioteca (leitor). Está definida em `src/Usuario.js`.

```js
new Usuario(id, nome, matricula)
```

| Parâmetro   | Tipo     | Descrição                          |
| ----------- | -------- | ---------------------------------- |
| `id`        | `number` | Identificador único do usuário     |
| `nome`      | `string` | Nome completo                      |
| `matricula` | `string` | Matrícula institucional            |

- **Validação**: se qualquer parâmetro estiver vazio, o construtor lança `Error("Informe id, nome e matrícula do usuário.")`.
- **Encapsulamento**: atributos privados (`#id`, `#nome`, `#matricula`) com *getters* somente leitura.

```js
import { Usuario } from './Usuario.js';

const usuario = new Usuario(1, 'Makson Douglas', '2026001');

usuario.nome;      // 'Makson Douglas'
usuario.matricula; // '2026001'
```

### Classe `Emprestimo`

Representa um **empréstimo**, vinculando um `Livro` a um `Usuario`. Está definida em `src/Emprestimo.js`.

```js
new Emprestimo(id, livro, usuario, dataEmprestimo, dataPrevistaDevolucao, dataEfetivaDevolucao = null)
```

| Parâmetro               | Tipo      | Descrição                                                          |
| ----------------------- | --------- | ------------------------------------------------------------------ |
| `id`                    | `number`  | Identificador único do empréstimo                                  |
| `livro`                 | `Livro`   | Objeto `Livro` emprestado                                          |
| `usuario`               | `Usuario` | Objeto `Usuario` que pegou o livro                                 |
| `dataEmprestimo`        | `string`  | Data do empréstimo, no formato brasileiro `dd/mm/aaaa`             |
| `dataPrevistaDevolucao` | `string`  | Data prevista de devolução, em `dd/mm/aaaa`                        |
| `dataEfetivaDevolucao`  | `string`  | Data em que o livro foi devolvido (`dd/mm/aaaa`). Padrão: `null`    |

> 📌 **Convenção importante**: um empréstimo com `dataEfetivaDevolucao === null` é considerado **ativo** (livro ainda não devolvido). Essa condição é usada por todo o sistema para identificar empréstimos em aberto, atrasados e elegíveis a multa.

```js
import { Emprestimo } from './Emprestimo.js';

const emprestimo = new Emprestimo(
  1,
  livro1,
  usuario1,
  '10/11/2026', // data de empréstimo
  '17/11/2026', // data prevista de devolução
); // devolução ainda não registrada → dataEfetivaDevolucao === null
```

### Classe `Biblioteca`

É a **classe central** do sistema: gerencia as coleções de livros, usuários e empréstimos e concentra as regras de negócio. Está definida em `src/Biblioteca.js`.

```js
new Biblioteca()
```

Ao ser instanciada, começa com três coleções **vazias** (privadas): `#livros`, `#usuarios` e `#emprestimos`.

#### 📥 Métodos de instância

| Método | Descrição |
| ------ | --------- |
| `cadastrarLivro(livro)` | Adiciona um objeto `Livro` ao acervo. |
| `cadastrarUsuario(usuario)` | Adiciona um objeto `Usuario` à lista de leitores. |
| `registrarEmprestimo(id, livroId, usuarioId, dataEmprestimo, dataPrevistaDevolucao)` | Cria e registra um novo `Emprestimo`. Retorna o objeto criado. |
| `registrarDevolucao(emprestimoId, dataEfetivaDevolucao)` | Registra a devolução do empréstimo com o id informado. |
| `listarLivros()` | Imprime no console todos os livros cadastrados. |
| `listarUsuarios()` | Imprime no console todos os usuários cadastrados. |
| `listarEmprestimos()` | Imprime no console um painel detalhado dos empréstimos (livro, usuário, datas). |
| `get livros` / `get usuarios` / `get emprestimos` | *Getters* de leitura para as coleções internas. |

**Comportamento de `registrarEmprestimo`** — antes de criar o empréstimo, o método aplica duas validações:

1. **Existência**: o livro e o usuário devem estar cadastrados. Caso contrário, lança `Error("Livro ou usuário não encontrado.")`.
2. **Disponibilidade**: o livro não pode ter outro empréstimo **ativo** (ou seja, com `dataEfetivaDevolucao === null`). Caso contrário, lança `Error("O livro já está emprestado para outro usuário.")`.

```js
// Lança erro: livro 1 já está emprestado (empréstimo 1 ainda está ativo)
minhaBiblioteca.registrarEmprestimo(2, 1, 2, '12/11/2026', '15/11/2026');
// Error: O livro já está emprestado para outro usuário.
```

**Comportamento de `registrarDevolucao`** — em vez de alterar (mutar) o objeto existente, o método **recria o empréstimo** com a mesma identidade, mas agora com a data efetiva de devolução preenchida, e substitui o antigo na coleção:

```js
minhaBiblioteca.registrarDevolucao(2, '13/11/2026');
```

#### 🧮 Métodos estáticos (funções utilitárias / puras)

| Método | Descrição |
| ------ | --------- |
| `Biblioteca.filtrarLivrosPorCategoria(livros, categoria)` | Retorna um novo array com os livros cuja categoria corresponde ao filtro (**case-insensitive**). |
| `Biblioteca.calcularMulta(diasAtraso, valorDiario = 2.0)` | Calcula a multa: `diasAtraso * valorDiario`. Retorna `0` se `diasAtraso <= 0`. |
| `Biblioteca.filtrarEmprestimosAtrasados(emprestimos, dataReferencia)` | Retorna os empréstimos **ativos** cuja data prevista de devolução é **anterior** à data de referência. |
| `Biblioteca.gerarRelatorioMultas(emprestimos, dataReferencia)` | Retorna `{ detalhes, valorTotal }`, com um item por empréstimo atrasado: `{ id, livro, usuario, diasAtraso, multa }`. |
| `Biblioteca.calcularEstatisticas(livros, emprestimos, dataReferenciaStr)` | Retorna um objeto consolidado com as estatísticas do acervo e dos empréstimos. |

**Formato do retorno de `gerarRelatorioMultas`:**

```js
{
  detalhes: [
    {
      id: 3,
      livro: 'Duna',
      usuario: 'Makson Douglas',
      diasAtraso: 5,
      multa: 10, // 5 dias × R$ 2,00
    },
    // ...
  ],
  valorTotal: 18, // soma de todas as multas
}
```

**Formato do retorno de `calcularEstatisticas`:**

```js
{
  livrosPorCategoria: { Programação: 1, Fantasia: 1, Ficção: 2, Aventura: 1 },
  emprestimosPorUsuario: { 'Makson Douglas': 2, 'Karine Dantas': 2 },
  totalEmprestimosAtivos: 3,
  totalEmprestimosAtivosAtrasados: 2,
  valorTotalMultas: 18,
}
```

> ⚠️ Os métodos estáticos **não dependem do estado de uma instância**: recebem os dados como parâmetro, não modificam nada e sempre retornam um novo valor — são **funções puras**, um conceito típico da programação funcional.

### `utils/functions.js`

Módulo com funções utilitárias para lidar com as **datas em formato brasileiro** (`dd/mm/aaaa`), já que o construtor `Date` do JavaScript interpreta datas no formato ISO (`aaaa-mm-dd`).

| Função | Descrição |
| ------ | --------- |
| `transformarDataBRparaUS(data)` | Converte `'10/11/2026'` → `'2026-11-10'` (para uso com `new Date`). |
| `transformarDataUSparaBR(data)` | Converte `'2026-11-10'` → `'10/11/2026'` (para exibição). |

```js
import { transformarDataBRparaUS, transformarDataUSparaBR } from './utils/functions.js';

transformarDataBRparaUS('10/11/2026'); // '2026-11-10'
transformarDataUSparaBR('2026-11-10'); // '10/11/2026'
```

---

## 📏 Regras de negócio

1. **Datas**: todas as datas de entrada/saída usam o formato brasileiro `dd/mm/aaaa`; a conversão para o formato ISO é feita internamente pelas funções utilitárias.
2. **Unicidade de empréstimo**: cada livro pode ter apenas **um empréstimo ativo por vez**. Só é possível emprestá-lo novamente depois que a devolução for registrada.
3. **Empréstimo ativo**: é todo empréstimo sem data efetiva de devolução (`dataEfetivaDevolucao === null`).
4. **Atraso**: um empréstimo ativo está **atrasado** se a data prevista de devolução for anterior à data de referência informada. Empréstimos já devolvidos nunca são considerados atrasados.
5. **Multa**: R$ **2,00 por dia** de atraso (padrão do parâmetro `valorDiario`, podendo ser alterado na chamada de `calcularMulta`). Os dias de atraso são calculados arredondando para cima (`Math.ceil`) a diferença entre a data de referência e a data prevista.
6. **Integridade dos dados**: `Livro` e `Usuario` validam seus campos obrigatórios no construtor, e `Biblioteca` valida a existência de livro/usuário e a disponibilidade do livro antes de cada empréstimo.

---

## 🧠 Paradigmas e conceitos aplicados

Este projeto foi pensado como material de estudo da disciplina — cada trecho ilustra um conceito de paradigma:

### 1. Programação Orientada a Objetos (POO)

- **Abstração**: cada entidade do domínio (`Livro`, `Usuario`, `Emprestimo`, `Biblioteca`) virou uma classe que modela apenas o que é relevante do mundo real.
- **Encapsulamento**: todos os atributos usam **campos privados de classe** (`#id`, `#titulo`, ...), acessíveis somente pelos *getters*. Não existem *setters*, impedindo alterações externas.
- **Imutabilidade de objetos**: uma vez criado, um `Livro` ou `Usuario` não muda de estado. `Emprestimo` também não é mutado — a devolução **cria uma nova instância** no lugar da antiga.
- **Métodos estáticos**: as regras de cálculo e filtro ficam na própria classe `Biblioteca`, sem depender de instância.

### 2. Programação Funcional

- **Imutabilidade de coleções**: em vez de `array.push(...)`, as coleções são atualizadas criando **novos arrays** com o operador *spread*:
  ```js
  this.#livros = [...this.#livros, livro];
  ```
  E, em vez de alterar um item, a devolução usa `map` para gerar uma nova lista:
  ```js
  this.#emprestimos = this.#emprestimos.map((emp) =>
    emp.id === emprestimoId ? new Emprestimo(...) : emp,
  );
  ```
- **Funções de alta ordem**: uso intensivo de `find`, `filter`, `map` e `reduce` para busca, filtragem, transformação e agregação de dados — sem laços manuais nas regras de negócio.
- **Funções puras**: os métodos estáticos (`calcularMulta`, `filtrarEmprestimosAtrasados`, `gerarRelatorioMultas`, `calcularEstatisticas`, `transformarDataBRparaUS`) sempre retornam o mesmo resultado para as mesmas entradas e não produzem efeitos colaterais.

### 3. Características da linguagem JavaScript

- **ES Modules** (`import`/`export`) com `"type": "module"` no `package.json`;
- **Campos privados** (`#campo`) e *getters*;
- **Template literals** para montar as saídas formatadas no console;
- **Operador *spread*** (`...`) e **parâmetros com valor padrão** (`dataEfetivaDevolucao = null`, `valorDiario = 2.0`);
- **Operador de coalescência nula** (`??`) na exibição da data de devolução.

---

## 🖥️ Exemplo de saída

Saída gerada por `npm run dev` (resumida):

```
==== Usuário Cadastrados ====
1 - Makson Douglas (matrícula: 2026001)
2 - Karine Dantas (matrícula: 2026002)
-----------------------------

==== Livros Cadastrados ====
1 - Qualidade de Software Vol. 1 (autor: Carlos Moreira, categoria: Programação)
2 - O Senhor dos Anéis: A Sociedade do Anel (autor: J. R. R. Tolkien, categoria: Fantasia)
3 - Maze Runner: Correr ou Morrer (autor: James Dashner, categoria: Ficção)
4 - Harry Potter e a Pedra Filosofal (autor: J. K. Rowling, categoria: Aventura)
5 - Duna (autor: Frank Herbert, categoria: Ficção)
-----------------------------

***** Lista de Empréstimos *****
---- Emprestimo -> 1 ----
| Livro: Qualidade de Software Vol. 1
| Usuário: Makson Douglas
| Data de empréstimo: 10/11/2026
| Data prevista de devolução: 17/11/2026
| Data de devolução:
...
```

**Relatório de multas** (data de referência `13/11/2026`):

```json
{
  "detalhes": [
    { "id": 3, "livro": "Duna", "usuario": "Makson Douglas", "diasAtraso": 5, "multa": 10 },
    { "id": 4, "livro": "Maze Runner: Correr ou Morrer", "usuario": "Karine Dantas", "diasAtraso": 4, "multa": 8 }
  ],
  "valorTotal": 18
}
```

**Estatísticas do sistema:**

```json
{
  "livrosPorCategoria": { "Programação": 1, "Fantasia": 1, "Ficção": 2, "Aventura": 1 },
  "emprestimosPorUsuario": { "Makson Douglas": 2, "Karine Dantas": 2 },
  "totalEmprestimosAtivos": 3,
  "totalEmprestimosAtivosAtrasados": 2,
  "valorTotalMultas": 18
}
```

---

## 📄 Licença

Projeto distribuído sob a licença **ISC** — consulte o campo `license` no arquivo [`package.json`](package.json).

---

<p align="center">
  Desenvolvido para a disciplina de <strong>Paradigmas de Linguagens de Programação</strong> — UNIPÊ 🎓
</p>
