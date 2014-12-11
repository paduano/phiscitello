
$( document ).ready(function() {
    console.log('code injected');
    $.ajaxSetup({
        beforeSend: function (val) {
            console.log('ajax');
            return true;
        }
    });
});