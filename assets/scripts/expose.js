// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  chooseHorn();
  setVolume();
  soundHorn();
}


function chooseHorn(){
  var image = document.querySelector('header + img');
  var select = document.getElementsByTagName('select')[0];
  var horn = document.getElementsByTagName('audio')[0];

  select.addEventListener('change', function(){
    var image_src = "assets/images/";
    var image_alt = "No image selected";
    var horn_src = "assets/audio/"
    switch(select.value){
      case "select":
        image_src += "no-image.png";
        horn_src = "";
        break;
      default:
        image_src += select.value + '.svg';
        image_alt = select.value.split('-').join(' ')
        horn_src += select.value + '.mp3';
    }
    image.src = image_src;
    image.alt = image_alt;
    horn.src = horn_src;
  })
}

function setVolume(){
  var slider = document.getElementById('volume');
  var icon = document.querySelector('div img');
  slider.addEventListener('input', function(){
    var vol = slider.value;
    var level;
    if (vol == 0) level = 0;
    else if (vol < 33) level = 1;
    else if (vol < 67) level = 2;
    else level = 3;

    var icon_src = "assets/icons/volume-level-"+level+'.svg';
    icon.src = icon_src;
    icon.alt = "Volume level "+ level
  })
}

function soundHorn(){
  var controls = document.getElementsByTagName('button')[0];
  var horn = document.querySelector('audio');
  var slider = document.getElementById('volume');
  var select = document.getElementsByTagName('select')[0];
  const jsConfetti = new JSConfetti()
  controls.addEventListener('click',function () {
    var src_array = horn.src.split('.');
    if (slider.value == 0 || src_array[src_array.length-1] != 'mp3'){
      return;
    }
    horn.volume = slider.value / 100;
    if (select.value == "party-horn"){
      jsConfetti.addConfetti();
    }
    horn.play();
  });
}
