// import module
import wagnerFischer from 'https://cdn.jsdelivr.net/npm/wagner-fischer@1.0.0/+esm'

// load js file
function loadJS(url) { 
    let scriptToAdd = document.createElement('script');     
    scriptToAdd.type = 'text/javascript'; 
    scriptToAdd.src = url
    document.querySelector("head").append(scriptToAdd); 
    return True
}
function loadWorldsList(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false); // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        console.log(request.responseText);
        return request.responseText;
    }
    return null;
}

// cdn url to fetch to get the words
var english = 'https://cdn.jsdelivr.net/gh/dwyl/english-words@master/words.txt'
var french = 'https://cdn.jsdelivr.net/gh/Taknok/French-Wordlist@master/francais.txt'

// wagner fischer algorithm
var wagner = wagnerFischer

// load js files and load dict
loadWorldsList(french)

// check function
function check(word,possible) {
    wagnerFischer(word, possible)
}