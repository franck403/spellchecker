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
var wordList = loadWorldsList(french)
window.wordList = wordList

// check function
function check(word, possible) {
    return wagnerFischer(word, possible)
}

window.check = check
// search diction for sugestion
function setup(text) {
    var wordsListSplit = window.wordList.replaceAll('\n','').split('\r')
    window.findedWord = ''
    var text = text.toLowerCase()
    wordsListSplit.forEach(word => {
        if (check(text,word) == 0  && check(text,word) < 3) {
            console.log('founeded word with no error : ' + word)                
            window.findedWord = word
        }
    });
    return window.findedWord
}

window.setup = setup
// check a string
var checking = []
function checkText(text) {
    var textList = text.split(' ')
    var checking = []
    textList.forEach(string => {
        var search = setup(string)        
        checking.push(search)
    });
    return checking.join(' ')
}

window.checkText = checkText