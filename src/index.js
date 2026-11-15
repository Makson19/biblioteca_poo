import { Biblioteca } from './Biblioteca.js';
import { Livro } from './Livro.js';
import { Usuario } from './Usuario.js';
import { Emprestimo } from './Emprestimo.js';
import { transformarDataBRparaUS } from './utils/functions.js';

const usuario1 = new Usuario(1, 'Makson Douglas', '2026001');
const usuario2 = new Usuario(2, 'Karine Dantas', '2026002');

const livro1 = new Livro(1, 'Qualidade de Software Vol. 1', 'Carlos Moreira', 'Programação');
const livro2 = new Livro(2, 'O Senhor dos Anéis: A Sociedade do Anel', 'J. R. R. Tolkien', 'Fantasia');
const livro3 = new Livro(3, 'Maze Runner: Correr ou Morrer', 'James Dashner', 'Ficção');
const livro4 = new Livro(4, 'Harry Potter e a Pedra Filosofal', 'J. K. Rowling', 'Aventura');
const livro5 = new Livro(5, 'Duna', 'Frank Herbert', 'Ficção');

const minhaBiblioteca = new Biblioteca();
minhaBiblioteca.cadastrarUsuario(usuario1);
minhaBiblioteca.cadastrarUsuario(usuario2);
minhaBiblioteca.cadastrarLivro(livro1);
minhaBiblioteca.cadastrarLivro(livro2);
minhaBiblioteca.cadastrarLivro(livro3);
minhaBiblioteca.cadastrarLivro(livro4);
minhaBiblioteca.cadastrarLivro(livro5);

console.log('==== Usuário Cadastrados ====');
minhaBiblioteca.listarUsuarios();
console.log('-----------------------------\n');


console.log('==== Livros Cadastrados ====');
minhaBiblioteca.listarLivros();
console.log('-----------------------------\n');


minhaBiblioteca.registrarEmprestimo(1, 1, 1, '10/11/2026', '17/11/2026');
minhaBiblioteca.registrarEmprestimo(2, 2, 2, '12/11/2026', '19/11/2026');
minhaBiblioteca.registrarEmprestimo(3, 5, 1, '01/11/2026', '08/11/2026');
minhaBiblioteca.registrarEmprestimo(4, 3, 2, '02/11/2026', '09/11/2026');
// minhaBiblioteca.registrarEmprestimo(2, 1, 2, '12/11/2026', '15/11/2026');

minhaBiblioteca.registrarDevolucao(2, '13/11/2026');
// minhaBiblioteca.registrarDevolucao(3, '13/11/2026');
// minhaBiblioteca.registrarDevolucao(4, '10/11/2026');
minhaBiblioteca.listarEmprestimos();

const relatorioMultas = Biblioteca.gerarRelatorioMultas(minhaBiblioteca.emprestimos, '13/11/2026');
console.log('Relatório de Multas: ', JSON.stringify(relatorioMultas, null, 2));

console.log('\n-----------------------------\n');

const estatisticas = Biblioteca.calcularEstatisticas(minhaBiblioteca.livros, minhaBiblioteca.emprestimos, '13/11/2026');
console.log("Estatísticas do Sistema:", JSON.stringify(estatisticas, null, 2));
