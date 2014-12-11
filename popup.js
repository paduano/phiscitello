/**
 * Created by fra on 12/10/14.
 */

$( document ).ready(function() {
    console.log('loaded page');
    chrome.storage.sync.get('policy', function(returnedValue) {

            var extension_policy = returnedValue['policy'][0];
            console.log(extension_policy);

            if(extension_policy==='loose'){
                $("#loose").attr('checked', true);
                $("#strict").attr('checked', false);
            } else {
                $("#strict").attr('checked', true);
                $("#loose").attr('checked', false);
            }

            $("#loose").click(update_loose);
            $("#strict").click(update_strict);

    });




});

var update_strict = function(){
    extension_policy = 'strict';
    $("#loose").attr('checked', false);
    $("#strict").attr('checked', true);

    var obj = {};
    obj['policy'] = ['strict'];
    chrome.storage.sync.set(obj, function(){
        console.log('stored strict');
    });
};


var update_loose = function(){
    extension_policy = 'loose';
    $("#strict").attr('checked', false);
    $("#loose").attr('checked', true);

    var obj = {};
    obj['policy'] = ['loose'];
    chrome.storage.sync.set(obj, function(){
        console.log('stored loose');
    });
};