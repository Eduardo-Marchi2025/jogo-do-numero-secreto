//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
let amigos = [];
let sorteioRealizado = false;
let toRemove = '';
let sorteado = '';

// Coloca a primeira letra de cada palavra em maiúscula
function capitalizar(texto) {
    return texto.split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
        .join(' ');
}

// Verifica se o campo está vazio
function validaCampoVazio(texto) {
    return texto === '';
}

// Adicionar evento de keydown para adicionar amigo ao pressionar Enter
document.getElementById("amigo").addEventListener("keydown", function (event) 
{
  
  if (event.key === "Enter") {
    adicionarAmigo();
  }
});

listaDeAmigos.push(nomeAmigo);
  atualizarListaDeAmigos();
  inputAmigo.value = "";
  
// Verifica se o amigo já foi adicionado
function validaDuplicado(amigo) {
    return amigos.includes(amigo);
}

function validaTrataInput(amigoInput) {

    // remove espaços do começo e final do texto
    const amigo = capitalizar(amigoInput.trim());

    // verifica se o campo está vazio
    if (validaCampoVazio(amigo)) {
        alert('Digite o nome do Amigo!');
        return;
    }

    // valida se o nome possui apenas letras
    if (!/^[a-zA-Z\s]+$/.test(amigo)) {
        alert(`O nome ${amigo} é inválido! O nome deve conter apenas letras!`);
        return;
    }

    // verifica se o amigo já foi adicionado
    if (validaDuplicado(amigo)) {
        alert(`O nome do Amigo ${amigo} já foi adicionado, coloque outro!`);
        return;
    }
    amigos.push(amigo);
}


// Adiciona um amigo à lista
function adicionarAmigo() {
    const amigoInput = document.getElementById('amigo').value;

    //adiciona amigos separados por vírgula
    if (amigoInput.includes(',')) {
        //split a string em um array
        let amigosInput = amigoInput.split(',');
        for (let item of amigosInput) {
           validaTrataInput(item);
        }
    }else{
        validaTrataInput(amigoInput);
    }

    document.getElementById('resultado').innerHTML = '';
    atualizarListaAmigos();
    limparElemento("amigo");
}

// Sorteia um amigo da lista
function sortearAmigo() {
    if (sorteioRealizado) {
        alert('Todos os nomes já foram sorteados, adicione novos amigos para sortear novamente!');
        ocultarResultado();
        return;
    } 
    if (amigos.length === 0) {
        alert('Adicione amigos para sortear!');
        return;
    } 
    
    if(toRemove){
        amigos = amigos.filter(amigo => amigo !== toRemove);
        toRemove = '';
    }
    
    sorteado = amigos[Math.floor(Math.random() * amigos.length)];
    limparElemento('amigo');
    limparElemento('listaAmigos');
    if (amigos.length == 1) {
        alterarValorElemento('resultado', sorteado);
        document.getElementById("hiden-elements").classList.remove("hidden");
        document.getElementById("auto-sorteio").classList.add("hidden");
        sorteioRealizado = true;
    }else{
        alterarValorElemento('resultado', sorteado);
        document.getElementById("hiden-elements").classList.remove("hidden");
        document.getElementById("auto-sorteio").classList.remove("hidden");
        console.log("removeu");
        toRemove = sorteado;
    }
    let mensagem = "O Amigo Secreto Sorteado é: " + sorteado;
    alterarValorElemento('resultado', mensagem);
}

// Atualiza a lista de amigos no HTML
function atualizarListaAmigos() {
    alterarValorElemento('listaAmigos', amigos.map(amigo => `<li>${amigo}</li>`).join(''));
}

// Limpa a lista de amigos no HTML
function reiniciarAmigoSecreto() {
    limparElemento('amigo');
    limparElemento('resultado');
    limparElemento('listaAmigos');
    document.getElementById("hiden-elements").classList.add("hidden");
    amigos = [];
    sorteioRealizado = false;
    sorteado = '';
    toRemove = '';
}


function ocultarResultado(){
    if (!sorteioRealizado) {
        alterarValorElemento('resultado', 'Continue sorteando!');
        document.getElementById("auto-sorteio").classList.remove("hidden");
        document.getElementById("hiden-elements").classList.add("hidden");
    }
    else{
        alterarValorElemento('resultado', '');
        reiniciarAmigoSecreto();
    }
    document.getElementById("auto-sorteio").classList.remove("hidden");
    document.getElementById("hiden-elements").classList.add("hidden");
}

// Limpa o valor de um elemento
function limparElemento(elemento) {
    alterarValorElemento(elemento, '');
    document.getElementById(elemento).value = '';
}

function alterarValorElemento(elemento, valor) {
    document.getElementById(elemento).innerHTML = valor;
}
