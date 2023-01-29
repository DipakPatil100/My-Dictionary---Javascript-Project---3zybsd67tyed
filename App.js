const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-button');
const historyBtn = document.getElementById('history-btn');
const result = document.getElementById('result');   
let sound = document.getElementById('sound')

var search = JSON.parse(localStorage.getItem('search')) || [];

searchBtn.addEventListener('click', ()=>{
    let value = searchInput.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
    .then((res)=> res.json())
    .then((output)=>{  
        // console.log(output);
        let description = output[0].meanings[0].definitions[0].definition   
        let wordBox = `<div class="word">
                                <div class="word-head">
                                    <audio id="sound"></audio>
                                    <h2>Word: ${value}</h2>
                                    <button onclick="onClickFnSound()" class="btn"><i class="fa-solid fa-volume-high" ></i></button>
                                </div>
                                <p>Defination: ${description}</p>
                            </div>`;
        result.innerHTML = wordBox
        search.push({word: value, meaning: description});
        localStorage.setItem("search", JSON.stringify(search));        
        sound.setAttribute('src', output[0].phonetics[0].audio);         
    })
    .catch(()=>{
        alert("Wront Input")
        result.innerText = "Wrong Input"
    })
})

console.log(search);
const history = document.getElementById('history');

historyBtn.addEventListener('click', ()=>{
    history.innerHTML=""
    history.style.display = 'flex';
    search.forEach((words)=>{   
        console.log(words);
        let historyBox = ` 
                            <div class="history-wrap">
                                <button onclick="deleteItem('${words.word}')"><i class="fa-solid fa-x"></i></button>
                                <h2>${words.word}</h2>   
                                <p>${words.meaning}</p>                    
                            </div>`;
        history.innerHTML += historyBox;
    })
    
})

function deleteItem(word){
    search = search.filter((srch)=> srch.word !== word)
    localStorage.setItem('search', search);
    historyBtn.click();
}

// console.log(sound)
function onClickFnSound(){
    sound.play();
}



