function responsiveIcon() {
    var x = document.getElementById("nav-link");
    if (x.className === "nav-link") {
      x.className += " responsive";
    } else {
      x.className = "nav-link";
    }
  }
  
$.get("html/navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});