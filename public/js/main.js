$.get("html/navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});