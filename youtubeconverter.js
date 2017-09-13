

const loaded = function () {


  const content = `

  <div id="ytb-download">
    <button class="firstButton" onclick="dropdown()"> <img src="icon.png">Download mp3</button>
    <button id="Menuitems"><a href="https://www.google.com" target="_blank">item 1</a> </button>
    </div>
      <script>
   

          </script>
    `;


               function dropdown()
        {
            document.getElementById("Menuitems").style.display="block";
        }

  const youtubeSelector = 'top-row';

  function appendMessage() {
    let element = document.getElementById(youtubeSelector);

    setTimeout(() => {
      element = document.getElementById(youtubeSelector);

      console.log("4 4-------- - - - - document load");
      console.log(element)

      var div = document.createElement('div');
      div.innerHTML = content;

      while (div.firstChild) {
        element.appendChild(div.firstChild);
      }
    }, 5000);

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
