function checkPassword(host, password, callback) {

    // TODO: hashare password
    var hash = myHash(password);


    chrome.storage.sync.get(hash, function(returnedValue) {
        if(_.isEmpty(returnedValue)) {

            var obj = {};
            obj[hash] = [host];

            chrome.storage.sync.set(obj, function() {
                callback(true);
            });
        }
        else {
            var hosts = returnedValue[hash];

            if(hosts.indexOf(host) != -1) {
                callback(true);
            }
            else {
                callback(false);
            }
        }
    });

    return false;
};
