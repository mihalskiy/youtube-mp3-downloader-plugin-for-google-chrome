document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    var selector = document.querySelector("select");
    selector.options[1].selected = true;
    document.querySelector(".ladda-label").click();
  }
};