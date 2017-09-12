var addButton = function() {
  var container = document.getElementById("watch8-secondary-actions");
  var link = document.createElement("a");
  var span = document.createElement("span");
  var youtube_id = window.location.href.match(/v=([^&]*)/)[1];

  link.setAttribute("target", "_blank");
  link.className += "yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay action-panel-trigger action-panel-trigger-download yt-uix-tooltip";
  link.href = "https://yout.com/video/" + youtube_id;
  span.innerHTML = "download";
  span.className += "yt-uix-button-content";
  debugger
  link.appendChild(span);
    debugger;
console.log(link)
  container.appendChild(link);

};

document.addEventListener("spfdone", function() {
  addButton();
});

addButton();
