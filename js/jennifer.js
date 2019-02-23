function push_to_api(url, newText) {
    var data = {}
    data["current"] = newText;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, false );
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xmlHttp.send(JSON.stringify(data));
    return JSON.stringify(data);
}

function fetch_from_api(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function changeText(){
    var currentText = JSON.parse(fetch_from_api("https://api.minhyukpark.com/isjenniferhere"))["current"]
    console.log("api says current text is " + currentText)
    if(currentText == "YES") {
	newText = "NO";
    } else {
	newText = "YES";
    }
    document.getElementById('jennifer_text').innerHTML = newText;
    console.log("pushing " + newText);
    push_to_api("https://api.minhyukpark.com/isjenniferhere", newText);
}


function loadText(){
    var currentText = JSON.parse(fetch_from_api("https://api.minhyukpark.com/isjenniferhere"))["current"]
    document.getElementById('jennifer_text').innerHTML = currentText;
}

$(document).ready(function(){
    loadText();
    let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    document.body.addEventListener(touchEvent, changeText, true);
    console.log('loaded');
});
