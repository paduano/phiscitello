
function interceptAllForms(){
    var host = window.location.hostname;

    $("form").submit(function(e){
        e.preventDefault();
        var form = this;

        if(hasPasswordField(form)){
            var password = getPassword(form);
            checkPassword(host, password, function(approved){
                if(approved){
                    form.submit();
                } else {
                    alert("form blocked password=" + password);
                }
            });
        }

    });
}

function hasPasswordField(form) {
    return $(form).find("input:password").length > 0;
}

function getPassword(form) {
    return $(form).find("input:password").val();
}

