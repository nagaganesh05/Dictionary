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
    const query = inputEl.value.trim();
    if (query) {
        inputEl.style.border = "";
        fetchWordData(query);
    } else {
        inputEl.style.border = "2px solid red";
        inputEl.placeholder = "Please enter a word!";
    }
});

async function searching(data) {
    try {
        const api_data = await fetch(Api + data);
        if (!api_data.ok) throw new Error('Word not found');
        const result = await api_data.json();

        const html = `<div class="sections">
                      <h2>${result[0]?.word}</h2>
                      <p>/${result[0]?.phonetic}</p>
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

       
        let definitions = result[0]?.meanings?.[0]?.definitions;

        if (definitions && definitions.length > 0) {
            const li = definitions.map(definition => `
        <li>${definition.definition}</li>
    `).join("");
            ulEl.innerHTML = li;
        } else {
            ulEl.innerHTML = '<p>No definitions available for this word.</p>'; // Fallback for no definitions
        }


        const sys = result[0].meanings[0].synonyms;
        sysEl.textContent = "";
        for (let i = 0; i < sys.length; i++) {
            sysEl.textContent += sys[i] + " ";
        }

        if (result[0]?.meanings?.[1]) {
            let partofSpeech2 = `
                <div class="verbContent">
                    <h3>${result[0].meanings[1].partOfSpeech}</h3>
                    <p>Meaning:</p>
                    <ul class="meanings">
                        <li>${result[0].meanings[1].definitions?.[0]?.definition || "Definition not available"}</li>
                    </ul>
                </div>`;

            verbEl.innerHTML = partofSpeech2;
        } else {
            verbEl.innerHTML = `
                <p style="color: red; font-size: 1.2rem;">
                    No meanings found for this word.
                </p>`;
        }


        const playBtn = document.querySelector('.playBtn')

        playBtn.addEventListener("click", () => {
            const speechWord = result[0].word;
            sppechText(speechWord)
        })

        console.log(result)
    } catch (error) {
        disContainer.innerHTML = `<p style="color: red; font-size: 1.2rem;">Word not found. Please try again.</p>`;
        console.log(error)
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searching(inputEl.value);
    inputEl.value = "";
})

function sppechText(textSpeech) {
    let speechText = new SpeechSynthesisUtterance();
    speechText.text = textSpeech;
    speechText.voice = window.speechSynthesis.getVoices()[0];
    window.speechSynthesis.speak(speechText);
}




