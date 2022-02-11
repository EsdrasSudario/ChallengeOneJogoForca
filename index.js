let word = '';
let inicio = false;
let erros = [];
let count = 14;
let words = [
'A',
'BOLA',
'A-BE-CE',
'RODA']
const btnInit = document.querySelector(".btn-init");
const addWord = document.querySelector(".add-word");
const getWord = () => {
    const newWord = document.querySelector("#new-word");
    newWord.value = newWord.value.replace(/[^A-Z]/ig,"").toUpperCase();
}
const gameOver = (resp) => {
    if(erros.length === 10 || resp == word) {
        document.querySelector('.msg-final').style.color = (resp == word) ? 'green' : 'red';
        document.querySelector('.msg-final').innerHTML = (resp == word) ? 'Você Venceu. Parabéns!' : 'Fim de Jogo';
        inicio = false;
        document.getElementById('new-word').style.display = 'block';
        document.getElementById('add-word').style.display = 'block';
        document.getElementById('desistir').style.display = 'none';
    }
}

const reset = (desistir) => {
    for(let i = 14; i < 24; i++) {
        document.getElementById(`r${i}`).style.background = 'agua';
    }
    count = 14;
    document.querySelector('.msg-final').innerHTML = '';
    document.querySelector('.erros').innerHTML = erros = [];
    document.getElementById('new-word').style.display = desistir ? 'block' : 'none';
    document.getElementById('add-word').style.display = desistir ? 'block' : 'none';
    document.getElementById('desistir').style.display = desistir ? 'none' : 'block';
}

btnInit.addEventListener('click', async () => {

    btnInit.textContent = 'NOVO JOGO';
    const index = Math.floor(Math.random() * words.length);
    word = words[index];
    console.log(word);
    const secret = document.querySelector(".word-secret");
    secret.innerHTML = '';
    for(let i = 0; i < word.length; i++) {
        const value = word[i] == '-' ? '- ' : word[i] == '\'' ? '\' ' : '_ ';
        secret.innerHTML += value;
    }
    inicio = true;
    reset(false);
});

document.getElementById('desistir').addEventListener('click', () => {
    document.querySelector(".word-secret").innerHTML = '';
    reset(true);
    inicio = false;
});

document.querySelector("body").addEventListener('keypress', (e) => {

    const letra = e.key.toUpperCase();
    if(!letra.match(/[A-Z]/i) || erros.length === 10 || !inicio) return;
    if(word.indexOf(letra) < 0 && erros.indexOf(letra) < 0) {
        erros.push(letra);       
        document.querySelector('.erros').innerHTML = erros.join(' ');
        document.getElementById(`r${count++}`).style.background = '#0A3871';
        gameOver(null);
        return;
    }    
    const secret = document.querySelector(".word-secret");
    secret.innerHTML = word.split('').map((l,i) => {
        if(l === letra) return '<u>'+l+'</u>'+' ';
        else return '<u>'+secret.textContent.replace(/\s+/g, '').split('')[i]+'</u>'+' ';
    }).join('');
    const resp = secret.textContent.replace(/\s+/g, '');
    gameOver(resp);
});

addWord.addEventListener('click', async () => {
    const newWord = document.querySelector("#new-word");
    if(!/\S/.test(newWord.value)) return;
    if(words.indexOf(newWord.value) >= 0) {
        alert(`A palavra ${newWord.value} já existe na lista de palavras!`)
        return;
    }
    words.push(newWord.value);    
    newWord.value = "";
});

