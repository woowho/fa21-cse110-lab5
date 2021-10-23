// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {

    setVoices();
    var image = document.getElementsByTagName('img')[0];
    var text = document.getElementById('text-to-speak');
    var button = document.getElementsByTagName('button')[0];

    pushToTalk();
}

function setVoices() {
    var synth = window.speechSynthesis;
    synth.addEventListener('voiceschanged', ()=>{
      var voices =  window.speechSynthesis.getVoices();
    var select = document.getElementsByTagName('select')[0];
    for (let voice of voices) {
        let node = document.createElement('option');
        node.setAttribute('value', voice.voiceURI);
        node.innerText = voice.name;
        select.appendChild(node);
    }
    });
}

function pushToTalk() {
    var image = document.getElementsByTagName('img')[0];
    var text_elem = document.getElementById('text-to-speak');
    var button = document.getElementsByTagName('button')[0];
    var select = document.getElementsByTagName('select')[0];

    button.addEventListener('click', ()=>{
        var text = text_elem.value;
        var URI = select.value;
        var voices = window.speechSynthesis.getVoices();
        var voice = null;
        for (let i = 0; i < voices.length; i++) {
            if (voices[i].voiceURI == URI) {
                voice = voices[i];
            }
        }
        if (voice == null)
            return;
        var speech = new SpeechSynthesisUtterance(text);
        speech.voice = voice;
        console.log(voice);
        speech.lang = voice.lang;
        speech.volume = 0.5;

        speech.onend = () => {
          image.src = "assets/images/smiling.png";
        };
        speech.onstart = () => {
          image.src = "assets/images/smiling-open.png";
        };

        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(speech);
    }
    )
}