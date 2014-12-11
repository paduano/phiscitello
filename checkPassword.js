function checkPassword(host, password, callback) {

    var hash = crypt(password);

    chrome.storage.sync.get("policy", function(returnedValue){
        var policy = returnedValue["policy"][0];
        console.log(policy);


        chrome.storage.sync.get(hash, function(returnedValue) {

            // Password not already used
            if(_.isEmpty(returnedValue)) {

                // If host in blacklist
                if(blacklist.indexOf(host) != -1 || isSuspected(host, hosts)) {
                    if(policy === "strict") {
                        callback("forbidden");
                    }
                    else if(policy === "loose") {
                        callback("notice");
                    }
                }

                // If host is not in blacklist
                else {
                    var obj = {};
                    obj[hash] = [host];

                    chrome.storage.sync.set(obj, function() {
                        console.log("Password " + hash + " not found. Adding it with the host: " + host);
                        callback("allowed");
                    });
                }
            }

            // Password already used
            else {

                var hosts = returnedValue[hash];

                // If host in blacklist or is a perturbation of known sites
                if(blacklist.indexOf(host) != -1 || isSuspected(host, hosts)) {
                    callback("forbidden");
                }
                // If host in whitelist
                else if(whitelist.indexOf(host) != -1){
                    if(policy === "strict") {
                        callback("notice");
                    }
                    else if(policy == "loose") {
                        callback("allowed");
                    }
                }
                // Otherwise
                else {
                    if(policy === "strict") {
                        callback("forbidden");
                    }
                    else if(policy == "loose") {
                        callback("notice");
                    }
                }

                //if(hosts.indexOf(host) != -1) {
                //    console.log("Password" + hash + " already used in " + host);
                //    callback(true);
                //}
                //else {
                //    console.log("Password " + hash + " never used in " + host);
                //    callback(false);
                //}
            }
        });
    });

    return false;
};

var storeData = function(host, password) {

    var hash = crypt(password);

    var obj = {};
    obj[hash] = [host];

    chrome.storage.sync.set(obj, function() {
        console.log("Password " + hash + " not found. Adding it with the host: " + host);
    });
};

var crypt = function(password) {
    var bytes = CryptoJS.SHA256(password);

    var hash = "";

    bytes.words.forEach(function(word) {
        hash += word;
    });

    return hash;
};

/***
 * Return true if the host is similar to one of the stored hosts
 * @param host
 * @param hosts
 * @returns {boolean}
 */
var isSuspected = function(host, hosts) {
    hosts.forEach(function(h) {
        if(areSimilar(h, host)) {
            return true;
        }
    });
    return false;
};


/**
 * Check if two hosts are too similar.
 * @param host1
 * @param host2
 */
var areSimilar = function(host1, host2) {
    return LevenshteinDistance(host1,host2) < 4;
};

var LevenshteinDistance = function(a,b) {
    // Compute the edit distance between the two given strings
    if(a.length === 0) return b.length;
    if(b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                    Math.min(matrix[i][j-1] + 1, // insertion
                        matrix[i-1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}