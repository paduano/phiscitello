function interceptAllForms(){


    $("form").submit(function(e){
        e.preventDefault();
        var form = this;

        console.log("form submitted");
        form.submit(); // submit bypassing the jQuery bound event
    });
}