//console.log("Button initialization...");

if (!/play_small/.test(window.location.href))
	setInterval(function() {
		if (document.getElementById("watch8-secondary-actions") && !document.getElementById("YouTubeSideplayerButton"))
		{
			var insert_to = document.getElementById("watch8-secondary-actions");
			insert_to.innerHTML = '<div id="YouTubeSideplayerButton">Play in Sideplayer</div>' + insert_to.innerHTML;
			document.getElementById("YouTubeSideplayerButton").onclick = function() {
				var video = document.getElementsByTagName("video")[0];
				video.pause();
				chrome.runtime.sendMessage({ playSideplayer: window.location.href + "&t=" + parseInt(video.currentTime) + "s" });
			};
		}
		if (document.getElementsByClassName("YouTubeVideoPlayerEmbededButton").length < 1)
		{
			var embed_button_target = document.querySelector(".ytp-fullscreen-button");
			if (embed_button_target)
			{
				var elem = document.createElement("button");
				elem.onclick = function() {
					var video = document.getElementsByTagName("video")[0];
					video.pause();
					chrome.runtime.sendMessage({ playSideplayer: (document.querySelector('.ytp-title-link') || { href: window.location.href }).href + "&t=" + parseInt(video.currentTime) + "s" });
					if (document.getElementsByClassName("ytp-fullscreen").length > 0)
						document.querySelector(".ytp-fullscreen-button").click();
				};
				elem.className = "YouTubeVideoPlayerEmbededButton ytp-button";
				embed_button_target.dispatchEvent(new MouseEvent("mouseover"));
				document.getElementsByClassName("ytp-tooltip-text")[0].style.opacity = "0";
				elem.onmouseover = function() {
					this.hovered = true;
					setTimeout(function(ths) {
						if (!ths.hovered)
							return false;
						document.getElementsByClassName("ytp-tooltip-text")[0].style.opacity = "";
						document.getElementsByClassName("ytp-tooltip-text")[0].innerHTML = "Play in Sideplayer";
						var tlp = document.getElementsByClassName("ytp-tooltip")[0];
						tlp.style.left = ths.offsetLeft - 20 + "px";
						tlp.classList.remove("ytp-preview");
						tlp.setAttribute("aria-hidden", "true");
						tlp.style.display = "block";
						tlp.setAttribute("aria-hidden", "false");
					}, 500, this);
				}
				elem.onmouseleave = function(e) {
					this.hovered = false;
					document.getElementsByClassName("ytp-tooltip-text")[0].innerHTML = "Play in Sideplayer";
					document.getElementsByClassName("ytp-tooltip")[0].setAttribute("aria-hidden", "true");
				}
				elem.title = "Play in Sideplayer"
				var parent = embed_button_target.parentNode;
				var next = embed_button_target.nextSibling;
				if (next)
					parent.insertBefore(elem, next);
				else
					parent.appendChild(elem);
			}
		}
		if (document.getElementsByClassName("yt-lockup-thumbnail").length > 0 || document.getElementsByClassName("thumb-wrapper").length > 0)
		{
			var elem = document.getElementsByClassName("yt-lockup-thumbnail");
			if (elem.length < 1)
				elem = document.getElementsByClassName("thumb-wrapper");
			for (var i = elem.length - 1; i >= 0; i--) {
				if (elem[i].getElementsByClassName("YouTubeSideplayerButtonSmall")[0])
					break;
				if (/yt-lockup-channel/.test(elem[i].parentNode.className))
					continue;
				var button = document.createElement("button");
				button.className = "YouTubeSideplayerButtonSmall";
				button.onmouseover = function(e) {
					var tip = document.createElement("div");
					tip.className = "SidePlayerHoverMessage";
					tip.innerHTML = 'Play in Sideplayer';
					var cors = this.getBoundingClientRect();
					tip.style.left = cors.left + this.offsetWidth / 2 + "px";
					tip.style.top = cors.top + (document.documentElement.scrollTop || document.body.scrollTop) + "px";
					document.body.appendChild(tip);
					setTimeout(function(ths) { ths.classList.add("showSidePlayerMessage"); }, 10, tip);
				};
				button.onmouseleave = function() {
					var tip = document.getElementsByClassName("SidePlayerHoverMessage");
					if (tip.length < 1)
						return false;
					for (var i = 0; i < tip.length; i++) {
						tip[i].classList.remove("showSidePlayerMessage");
						setTimeout(function(ths) { document.body.removeChild(ths); }, 300, tip[i]);
					}
				};
				button.onclick = function(e) {
					e.preventDefault();
					var link = this.parentNode.getElementsByTagName("a")[0].href;
					chrome.runtime.sendMessage({ playSideplayer: link });
					var tip = document.getElementsByClassName("SidePlayerHoverMessage")[0];
					if (tip)
					{
						tip.classList.remove("showSidePlayerMessage");
						setTimeout(function(ths) { document.body.removeChild(ths); }, 300, tip);
					}
					document.body.classList.add("SidePlayerLoading");
					return false;
				};
				elem[i].appendChild(button);
			}
		}
	}, 1000);