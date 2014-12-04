function checkPassword(host, password, callback) {

    // TODO: hashare password
    var hash = myHash(password);


    chrome.storage.sync.get(hash, function(hosts) {
        if(_.isEmpty(hosts)) {
            var newHosts = [host];

            var obj = {};
            obj[hash] = newHosts;

            chrome.storage.sync.set(obj);
            callback(true);
        }
        else {
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
