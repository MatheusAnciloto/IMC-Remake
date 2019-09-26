let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  console.log("Cliquei no botão");
});

document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  addLocalStorage(nome.value, peso.value, altura.value, imc.toFixed(2));
  carregarLocalStorage();
  limparFormulario();
});


function calcularIMC(peso, altura){
  return peso / (altura * altura);
}

let tabela = document.querySelector('.table');



function limparFormulario(){
  nome.value = '';
  peso.value = '';
  altura.value = '';
  nome.focus();
}

function addLocalStorage(nome, peso, altura, imc){

  let pessoa = {
    "nome": nome,
    "peso": peso,
    "altura": altura,
    "imc": imc
  }

  if (localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  
  } else {

    let listaIMC = [];
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  }

  mostrarMensagem("IMC cadastrado!", "add");
}

function carregarLocalStorage(){
  
  limparTabela();

  if (localStorage.getItem("listaIMC")){
    
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.forEach((pessoa, indice) => {
      addTabela(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, indice);
    });
  } else{    
    mostrarMensagem("Nenhum IMC a ser exibido", "table");
  }
}

function limparTabela(){
  let qtdLinhas = tabela.rows.length;
  for (let i = qtdLinhas - 1; i > 0; i--){
    tabela.deleteRow(i);
  }
}

function addTabela(nome, peso, altura, imc, indice, classific){
  
  let colunaNome = document.createElement('td');
  colunaNome.innerHTML = nome;

  let colunaPeso = document.createElement('td');
  colunaPeso.innerHTML = peso;

  let colunaAltura = document.createElement('td');
  colunaAltura.innerHTML = altura;

  let colunaIMC = document.createElement('td');
  colunaIMC.innerHTML = imc;

  let colunaDeletar = document.createElement('td');
  let btnDeletar = document.createElement('button');
  btnDeletar.innerHTML = '<img src="assets/images/delete.svg" alt="Deletar IMC">';
  btnDeletar.classList.add('btn');
  btnDeletar.classList.add('btn-danger');  

  // Adicionando um event listerner
  btnDeletar.addEventListener("click", (event) => {
    event.preventDefault();
    deletarLinha(indice);
  });

  colunaDeletar.appendChild(btnDeletar);

  let colunaClassificacao = document.createElement('td');
  if (imc < 18.5){
    classific = "Abaixo do peso ideal"
  }
  else if(imc >= 18.5 && imc <= 24.9){
    classific = "Peso ideal. Parabéns!"
  }
  else if(imc >= 25.0 && imc <= 29.9){
    classific = "Levemente acima do peso"
  }
  else if(imc >= 30.0 && imc <= 34.9){
    classific = "Obesidade grau I"
  }
  else if(imc >= 35.0 && imc <= 39.9){
    classific = "Obesidade grau II(severa)"
  }
  else if(imc >= 40.0){
    classific = "Obesidade grau III(mórbida)"
  }
  
  colunaClassificacao.innerHTML = classific;

  let linha = document.createElement('tr');
  linha.appendChild(colunaNome);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaIMC);
  linha.appendChild(colunaClassificacao);
  linha.appendChild(colunaDeletar);

  tabela.appendChild(linha);
}

function deletarLinha(index){
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(index, 1);
  localStorage.setItem("listaIMC", JSON.stringify(pessoas));
  carregarLocalStorage();

  mostrarMensagem("IMC deletado!", "delete");
}

let mensagem = document.querySelector("#mensagem");

function mostrarMensagem(msg, tipo){
  mensagem.innerHTML = msg;
  mensagem.classList.add("d-block");

  if (tipo == 'add'){
    mensagem.classList.add("alert-success");
  } else if (tipo == 'delete'){
    mensagem.classList.add("alert-danger");
  } else if (tipo == 'table'){
    mensagem.classList.add("alert-warning");
  }

  setTimeout(() => {
    mensagem.innerHTML = "";
    mensagem.classList.remove("alert-danger");
    mensagem.classList.remove("alert-success");
    mensagem.classList.remove("alert-warning");
    mensagem.classList.remove("d-none");
  }, 2000);
}
/*
document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  
  // addTable(nome.value, peso.value, altura.value, imc.toFixed(2));
  addLocalStorage(nome.value, peso.value, altura.value, imc);
  loadLocalStorage();
  cleanForm();

});
*/
