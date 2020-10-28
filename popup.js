
var allKeys = [];
chrome.tabs.getSelected(null, function (tab) {
    var keyDom = document.getElementById("nd_wv_keys");
    chrome.tabs.sendMessage(tab.id, { action: "getAllKeys" }, function (response) {
        try {
            allKeys = eval(response);
            document.getElementById("nd_wv_title").innerHTML = "<b>Current tab found <font color='#00d061'>" + allKeys.length + "</font> keys.</b><hr>";
            let html = "";
            allKeys.forEach(element => {
                html += "<div><div id='line'><span>KID:</span><input value='" + element.kid
                    + "'></div><div id='line'><span>BASE64:</span><input value='" + element.base64_key + "'></div>"
                    + "<div id='line'><span>HEX:</span><input value='" + element.hex_key + "'></div></div><hr>";
            });
            keyDom.innerHTML = html;
        } catch (err) {
            document.getElementById("copyBtn").setAttribute("disabled", "disabled");
        }
    });
});

//复制按钮点击事件
document.getElementById("copyBtn").addEventListener('click', function () {
    const input = document.getElementById("forCopy");
    input.value = JSON.stringify(allKeys, null, 2);
    console.log(input.value)
    new ClipboardJS('#copyBtn', {
        text: function () {
            return input.value;
        }
    });
    document.getElementById("copyBtn").innerHTML = "<b>Copied!</b>";
    window.setTimeout("document.getElementById('copyBtn').innerHTML = 'Copy All Results'", 600);
}, false);