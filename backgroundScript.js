$( document ).ready(function() {

    chrome.storage.sync.get('policy', function(returnedValue) {
        if (_.isEmpty(returnedValue)) {

            var obj = {};
            obj['policy'] = ['strict'];

            chrome.storage.sync.set(obj, function () {
                console.log("default policy set to strict");
                callback(true);
            });
        }
    });

    console.log("phiscitello loaded. Now you are safe and sound!");

    interceptAllForms();

});



