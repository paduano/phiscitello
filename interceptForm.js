
function interceptAllForms(){
    var host = window.location.hostname;

    console.log(whitelist);

    $("form").submit(function(e){
        e.preventDefault();
        var form = this;

        if(hasPasswordField(form)){
            var password = getPassword(form);
            checkPassword(host, password, function(status){
                if(status==='allowed'){
                    form.submit();
                } else if(status==='forbidden'){
                    alert("Suspected website. The submission of personal data is forbidden");
                } else if(status==='notice-password'){
                    var r = confirm("You are trying to submit the same password to a not trusted website. Do you want to proceed?");
                    if (r == true) {
                        storeData(host, password);
                        form.submit();
                    } else {
                        //ignore
                    }
                }  else if(status==='notice-suspected'){
                var r = confirm("You are trying to submit personal data to a not trusted website. Do you want to proceed?");
                if (r == true) {
                    storeData(host, password);
                    form.submit();
                } else {
                    //ignore
                }
            }
            });
        } else {
            form.submit();
        }

    });
}

function hasPasswordField(form) {
    return $(form).find("input:password").length > 0;
}

function getPassword(form) {
    return $(form).find("input:password").val();
}

function blockAjax(){



    var s = document.createElement('script');
    s.src = chrome.extension.getURL('ajaxIntercept.js');
    s.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head||document.documentElement).appendChild(s);


    var jq = document.createElement('script');
    jq.src = chrome.extension.getURL('jquery-2.1.1.js');
    jq.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head||document.documentElement).appendChild(jq);



    (function(open) {
        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
            console.log('ajax');
            open.call(this, method, url, async, user, pass);
        };
    })(XMLHttpRequest.prototype.open);
    /**$.ajaxSetup({
        beforeSend: function(val) {
            console.log('ajax');
            return true;
        }
    });**/
}

