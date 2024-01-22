let listaDeNumeroSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela ('h1', 'O jogo do número secreto');
    exibirTextoNaTela ('p', 'Escolha um número de 1 a 10');
}

exibirMensagemInicial();


function verificarChute () {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!')
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = 'Isso ai! Você acertou o número secreto com '+ tentativas + ' ' + palavraTentativa;
        exibirTextoNaTela ('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('h1', 'Errou!');
            exibirTextoNaTela ('p', 'Ops, o numero secreto é menor. Tente novamente!');
        } else {
                exibirTextoNaTela('h1', 'Errou!');
                exibirTextoNaTela ('p', 'Ops, o numero secreto é maior. Tente novamente!');
        }     
        tentativas++;
        limparCampo();
    } 

}

function gerarNumeroAleatorio () {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumeroSorteado.length;
   if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteado = [];
   }
   if (listaDeNumeroSorteado.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
   } else{
    listaDeNumeroSorteado.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo (){
    chute = document.querySelector('input');
    chute.value = ' ';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}