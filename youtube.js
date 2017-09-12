function addExtendButton(){

    if (document.getElementById("watch8-secondary-actions") !== null && document.getElementById("watch8-secondary-actions").querySelector("#extendButton") === null){

        var extendButton = document.createElement("button");
        extendButton.setAttribute("id", "extendButton");
        extendButton.classList.add("yt-uix-button", "yt-uix-button-size-default", "yt-uix-button-opacity", "yt-uix-tooltip");
        var content = document.createElement("span");
        content.classList.add("yt-uix-button-content");
        content.innerHTML = "Extend";
        extendButton.appendChild(content);
        document.getElementById("watch8-secondary-actions").insertBefore(extendButton, document.getElementById("watch8-secondary-actions").children[2]);var url = window.location.href;
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if(videoid !== null) {
            console.log("video id = ",videoid[1]);
            extendButton.addEventListener('click', function() {
                document.location.href = "https://www.youtube.com/embed/" + videoid[1];
            }, false);

        }
	}

}

setInterval(addExtendButton, 50);