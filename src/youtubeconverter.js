
const loaded = function () {
  const content = `
    <div id="ytb-download">
      <button class="firstButton" onclick="(function () {let a = document.getElementById('Menuitems');if ( a) {a.style.display='block'; }})()"> 
          <img src="icon.png">Download mp3
      </button>
      <button id="Menuitems"><a href="https://www.google.com" target="_blank">item 1</a> </button>
    </div>`;

  const youtubeSelector = 'top-row';

  function appendMessage() {
    let element = document.getElementById(youtubeSelector);

    setTimeout(() => {
      element = document.getElementById(youtubeSelector);
      const div = document.createElement('div');
      div.innerHTML = content;

      while (div.firstChild) {
        element.appendChild(div.firstChild);
      }
    }, 4200);
  }

  if (window.location.href.includes('youtube.com')) {
    console.log("333333(window.location.href.includes('youtube.com')");
    appendMessage();
  }
};

window.addEventListener("load", function () {
  console.log("6666END - window load");
  loaded();
});


// document.addEventListener("load", function () {
//   console.log("11 - document load");
//   loaded()
// });
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("22 - DOMContentLoaded");
//   loaded()
// });
// document.addEventListener("load", function () {
//   console.log("33 - document load");
//   loaded()
// });
