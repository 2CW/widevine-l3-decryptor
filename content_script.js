injectScripts();

//监听pop调用消息
chrome.extension.onMessage.addListener(
	function (request, sender, sendMessage) {
		var dom = document.getElementById("allWvKeys");
		if (request.action == "getAllKeys"){
			if (dom) sendMessage(dom.innerHTML);
		}
	}
);

//监听更新图标消息
window.addEventListener("message", function (e) {
	if(e.data.action == "noticeKey"){
		chrome.runtime.sendMessage({ badgeText: e.data.count });
	}
}, false);


async function injectScripts() 
{
	await injectScript('lib/pbf.3.0.5.min.js');
	await injectScript('lib/cryptojs-aes_0.2.0.min.js');
	await injectScript('protobuf-generated/license_protocol.proto.js');


    await injectScript('content_key_decryption.js');
    await injectScript('eme_interception.js');
}

function injectScript(scriptName) 
{
	return new Promise(function(resolve, reject) 
	{
		var s = document.createElement('script');
		s.src = chrome.extension.getURL(scriptName);
		s.onload = function() {
			this.parentNode.removeChild(this);
			resolve(true);
		};
		(document.head||document.documentElement).appendChild(s);
	});
}