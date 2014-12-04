function checkPassword(host, password, callback) {

    // TODO: hashare password
    var bytes = CryptoJS.SHA256(password);

    var hash = "";

    bytes.words.forEach(function(word) {
        hash += word;
    });



    chrome.storage.sync.get(hash, function(returnedValue) {
        if(_.isEmpty(returnedValue)) {

            var obj = {};
            obj[hash] = [host];

            chrome.storage.sync.set(obj, function() {
                console.log("Password " + hash + " not found. Adding it...");
                callback(true);
            });
        }
        else {
            var hosts = returnedValue[hash];

            if(hosts.indexOf(host) != -1) {
                console.log("Password" + hash + " already used in " + host);
                callback(true);
            }
            else {
                console.log("Password " + hash + " never used in " + host);
                callback(false);
            }
        }
    });

    return false;
};
