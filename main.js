const wordElement = document.querySelector('#word');
const popupContainer =document.querySelector('#popup-container')
const popupDom = document.querySelector('.popup');
const messageElement =document.querySelector('#success-message');
const wrongLettersDom = document.querySelector('#wrong-letters');
const items = document.querySelectorAll('.item');
const playAgainBtn = document.querySelector('#play-again');

const correctLetters = []
const wrongLetters = [];
const selectedWord = getRondomWord();

function getRondomWord() {
    const words =["javascript","java","css","html","github","react"];

    return words[Math.floor(Math.random()*words.length)]
}
function displayWord() {
   
    wordElement.innerHTML= ` 
    ${selectedWord.split('').map(
        letter=> `<div class="letter">
        ${correctLetters.includes(letter) ? letter: ''}
        </div>
        `
    ).join('')} 

    `;

   const word = wordElement.innerText.replace(/\n/g,'');

   if(word ==selectedWord) {
   showMessage('Tebrikler Kazandınız',1)
   }
}

function updateWrongLetters() {
        wrongLettersDom.innerHTML = `
        ${wrongLetters.length>0 ? '<h3>Hatalı Harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span> ${letter} </span>`)}
        `
        items.forEach((item,index) => {
            const errorCount = wrongLetters.length;
            if(index<errorCount) {
                item.style.display = 'block';
            }else {
                item.style.display = 'none';
            }

        })

        if(wrongLetters.length==6) {
            showMessage('Malesef Kaybettiniz',0)
        }
    
   
}

const showMessage = (mesaj,type) => {
    popupContainer.style.display='flex';
    messageElement.innerText= mesaj;
    type==0 ?  popupDom.style.backgroundColor = 'red':  popupDom.style.backgroundColor = 'green';
   
}

window.addEventListener("keydown", (e)=> {
    if(e.keyCode >=65 && e.keyCode<=90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }else {
                console.log("bu harfi zaten eklediniz");
            }
        }else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
              
               
            }else {
                console.log("bu harfi zaten eklediniz");
            }

        }
    }
})

displayWord()

playAgainBtn.addEventListener("click",()=> {
    location.reload();
})
