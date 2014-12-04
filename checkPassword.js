function checkPassword(host, password, callback) {

    // TODO: hashare password
    var hash = hash(password);


    chrome.storage.sync.get(password, function(hosts) {
        console.log(hosts)
    });

    return false;
};
