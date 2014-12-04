function checkPassword(host, password, callback) {

    // TODO: hashare password
    var hash = myHash(password);


    chrome.storage.sync.get(hash, function(returnedValue) {
        if(_.isEmpty(returnedValue)) {

            var obj = {};
            obj[hash] = [host];

            chrome.storage.sync.set(obj, function() {
                console.log("Pasword not found. Adding it...");
                callback(true);
            });
        }
        else {
            var hosts = returnedValue[hash];

            if(hosts.indexOf(host) != -1) {
                console.log("Password already used in " + host);
                callback(true);
            }
            else {
                console.log("Password never used in " + host);
                callback(false);
            }
        }
    });

    return false;
};
