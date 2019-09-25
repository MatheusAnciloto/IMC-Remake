let nome = document.querySelector("#nome");
let peso = document.querySelector("#peso");
let altura = document.querySelector("#altura");

function calcularIMC(peso, altura){
  return peso / (altura * altura);
}

let table = document.querySelector('.table')

function addTable(nome, peso, altura, imc, indice){
  
  let colNome = document.createElement('td');
  colNome.innerHTML = nome;

  let colPeso = document.createElement('td');
  colPeso.innerHTML = peso;

  let colAltura = document.createElement('td');
  colAltura.innerHTML = altura;

  let colImc = document.createElement('td');
  colImc.innerHTML = imc;

  let colDelet = document.createElement('td');
  let btnDelet = document.createElement('button');
  btnDelet.innerHTML = "<img src ='assets/images/delete.svg'>";
  btnDelet.classList.add('btn');
  btnDelet.classList.add('btn-danger');
  colDelet.appendChild(btnDelet);

  // Listener para deletar
  btnDelet.addEventListener("click", (event) => {
    event.preventDefault();
    deletarLinha(indice);
  });

  let linha = document.createElement('tr');
  linha.appendChild(colNome);
  linha.appendChild(colPeso);
  linha.appendChild(colAltura);
  linha.appendChild(colImc);
  linha.appendChild(colDelet);

  table.appendChild(linha);
}

function cleanForm(){
  nome.value = "";
  peso.value = "";
  altura.value = "";
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
  }
  else{
    let listaIMC = [];
    listaIMC.push(pessoa);
    localStorage.setItem("listaIMC", JSON.stringify(listaIMC));
  }
  showMessage("Cadastrado com sucesso!", "add");
}

function cleanTable(){
  let qtdLinhas = table.rows.length;

  for(let i = qtdLinhas - 1; i > 0; i--){
    table.deleteRow(i);
  }
}

function loadLocalStorage (){

  cleanTable();

  if (localStorage.getItem("listaIMC")){
    let listaIMC = JSON.parse(localStorage.getItem("listaIMC"));
    listaIMC.forEach((pessoa, indice) => {
      addTable(pessoa.nome, pessoa.peso, pessoa.altura, pessoa.imc, indice);
    });
  }
}

function deletarLinha(indice){
  let pessoas = JSON.parse(localStorage.getItem("listaIMC"));
  pessoas.splice(indice, 1);
  localStorage.setItem("listaIMC", JSON.stringify(pessoas));
  loadLocalStorage();
  showMessage("Removido com sucesso!", "delete");
}

let mensagem = document.querySelector("#mensagem");
function showMessage(msg, tipo){
  mensagem.innerHTML = msg;
  mensagem.classList.remove('d-none');

  if (tipo == "add"){
    mensagem.classList.add('alert-success');
  } else if (tipo == "delete"){
    mensagem.classList.add('alert-danger');
  }

  setTimeout(() =>{
    mensagem.innerHTML = "";
    mensagem.classList.remove('alert-succes');
    mensagem.classList.remove('alert-danger');
    mensagem.classList.add('d-none');
  }, 2000);
}

document.querySelector("#btn-calcular").addEventListener("click", (event) => {
  event.preventDefault();
  let imc = calcularIMC(peso.value, altura.value);
  
  // addTable(nome.value, peso.value, altura.value, imc.toFixed(2));
  addLocalStorage(nome.value, peso.value, altura.value, imc);
  loadLocalStorage();
  cleanForm();

});

