const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const fromText = document.getElementById("fromText");
const toText = document.getElementById("toText");
const icons = document.querySelectorAll("i");

// Tüm dillerin select butonları içerisine eklenmesi
for(let lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`;

    fromLang.innerHTML += option;
    toLang.innerHTML += option;

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}

// Butona tıklandığında seçilen diller arasında çeviri yapılması 
document.getElementById('btnTranslate').addEventListener('click', () => {
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;

    if (!text == "") {
        fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`)
            .then(response => response.json())
            .then(data => {
                toText.value = data.responseData.translatedText;
        });
    }
    
})

// Exchange butonuna tıklandığında seçili dilleri ve yazılı metinlerin yerini değiştirir.
document.getElementById('exchangeLang').addEventListener("click", () => {
    let firstLang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = firstLang;

    let firstText = fromText.value;
    fromText.value = toText.value;
    toText.value = firstText;
})

// iconları işlevsel hale getirir.
for(let icon of icons) {
    var utterThis;

    icon.addEventListener("click", (element) => {

        if (element.target.id == "fromCopy") {
            navigator.clipboard.writeText(fromText.value);
        }
        else if (element.target.id == "toCopy") {
            navigator.clipboard.writeText(toText.value);
        }
        else if (element.target.id == "fromVolume") {
            utterThis = new SpeechSynthesisUtterance(fromText.value);
            utterThis.lang = fromLang.value;
            speechSynthesis.speak(utterThis);
        }
        else if (element.target.id == "toVolume"){
            utterThis = new SpeechSynthesisUtterance(toText.value);
            utterThis.lang = toLang.value;
            speechSynthesis.speak(utterThis);
        } 

    })
}
