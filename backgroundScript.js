$( document ).ready(function() {
    var pathname = window.location.hostname;
    console.log("phiscitello loaded on " + pathname);





});


$("form").submit(function(e){
    e.preventDefault();
    var form = this;

    console.log("form submitted");
    form.submit(); // submit bypassing the jQuery bound event
});


