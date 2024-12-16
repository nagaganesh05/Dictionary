const bodyEl = document.querySelector('body');
const checkBox = document.querySelector('.switching input');

const selectOptions = document.querySelector('.data select');

const search = document.querySelector('.search');
const inputEl = document.querySelector('form input');

const disContainer = document.querySelector('.dictionary-content')

const partofSpeech = document.querySelector('.partofspeechNoun');
const ulEl = document.querySelector('.meanings');
const sysEl = document.querySelector('.syn');
const verbEl = document.querySelector('.verb');
const form = document.querySelector('form');

const Api = "https://api.dictionaryapi.dev/api/v2/entries/en/"

checkBox.addEventListener("click", () => {
    bodyEl.classList.toggle("dark");
});

selectOptions.addEventListener("change", (e) => {
    let fonts = e.target.value;
    bodyEl.style.fontFamily = fonts;
});

search.addEventListener("click", () => {
    if (inputEl.value !== "") {
        searching(inputEl.value);
        inputEl.style.border="";
        inputEl.value = "";
    } else {
        inputEl.style.border = "1px solid black";
    }
})

async function searching(data) {
    try {
        const api_data = await fetch(Api + data);
        const result = await api_data.json();

        const html = `<div class="sections">
                      <h2>${result[0].word}</h2>
                      <p>/${result[0].phonetic}</p>
                      </div >
                      <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewbox="0 0 75 75"
                      class="playBtn"
                      >
                      <g fill="#2E236C" fill-rule="evenodd">
                      <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                      <path d="M29 27v21l21-10.5z" />
                      </g>
                     </svg>`
        disContainer.innerHTML = html;
        partofSpeech.textContent = result[0].meanings[0].partOfSpeech;

        const li = `<li>
                  ${result[0].meanings[0].definitions[0].definition}
                   </li>
                   <li>
                  ${result[0].meanings[0].definitions[1].definition}
                   </li>
                   <li>
                  ${result[0].meanings[0].definitions[2].definition}
                   </li>
                   ` ;

        ulEl.innerHTML = li;

        const sys = result[0].meanings[0].synonyms;
        sysEl.textContent = "";
        for (let i = 0; i < sys.length; i++) {
            sysEl.textContent += sys[i] + " ";
        }

        let partofSpeech2 = ` <div class="verbContent">
                             <h3>${result[0].meanings[1].partOfSpeech}</h3>
                             <p>meaning</p>
                             <ul class="meanings">
                             <li>${result[0].meanings[1].definitions[0].definition}</li>
                             </ul>
                             </div>`

        verbEl.innerHTML = partofSpeech2;

        const playBtn = document.querySelector('.playBtn')

        playBtn.addEventListener("click",()=>{
            const speechWord = result[0].word;
            sppechText(speechWord)
        })
    } catch (error) {
        console.log(error)
    }
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    searching(inputEl.value);
    inputEl.value = "";
})

function sppechText (textSpeech){
    let speechText = new SpeechSynthesisUtterance();
    speechText.text = textSpeech;
    speechText.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(speechText);
}

