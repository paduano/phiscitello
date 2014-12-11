function checkPassword(host, password, callback) {

    var bytes = CryptoJS.SHA256(password);

    var hash = "";

    bytes.words.forEach(function(word) {
        hash += word;
    });

    chrome.storage.sync.get("policy", function(returnedValue){
        var policy = returnedValue["policy"][0];
        console.log(policy);


        chrome.storage.sync.get(hash, function(returnedValue) {

            // Password not already used
            if(_.isEmpty(returnedValue)) {

                // If host in blacklist
                if(blacklist.indexOf(host) != -1) {
                    if(policy == "strict") {
                        return "forbidden";
                    }
                    else if(policy == "loose") {
                        var obj = {};
                        obj[hash] = [host];

                        chrome.storage.sync.set(obj, function() {
                            console.log("Password " + hash + " not found. Adding it...");
                            callback(true);
                        });
                    }
                }
            }

            // Password already used
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
    });

    return false;
};
