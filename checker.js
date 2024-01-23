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
var contries = 'https://cdn.statically.io/gist/dariusz-wozniak/656f2f9070b4205c5009716f05c94067/raw/b291d58154c85dad840859fef4e63efb163005b0/list-of-countries.txt'

// wagner fischer algorithm
var wagner = wagnerFischer

// load js files and load dict
var wordList = loadWorldsList(french) + '\r\n.' + '\r\n,' + '\r\n/' + '\r\n:' + '\r\n(' + '\r\n)' + '\r\n*' + '\r\n?'  + '\r\n!' + '\r\n&' + '\r\n%' + '\r\n$' + '\r\n#' + '\r\n@' + '\r\nse' + '\r\na'
var contriesList = loadWorldsList(contries)
window.wordList = wordList

// check function
function check(word, possible) {
    return wagnerFischer(word, possible)
}

window.check = check
// search diction for sugestion
function setup(text) {
    var wordsListSplit = window.wordList.replaceAll('\n','').split('\r')
    var possibleWords = []
    var text = text.toLowerCase()
    wordsListSplit.forEach(word => {
        if (check(text,word) < 1) {
            console.log('founded word with no error : ' + word)                
            possibleWords.push(word)
        }
    });
    if (possibleWords.length == 0) {
        wordsListSplit.forEach(word => {
            if (check(text,word) < 2 && word.startsWith(text.charAt())) {
                console.log('founded word with no error : ' + word)                
                possibleWords.push(word)
            }
        });
    }
    if (possibleWords.length == 0) {
        wordsListSplit.forEach(word => {
            if (check(text,word) < 3) {
                console.log('founded word with no error : ' + word)                
                possibleWords.push(word)
            }
        });
    }
    if (possibleWords.length == 0) {
        contriesList.split('\r').forEach(word => {
            if (check(text,word) < 1) {
                console.log('founded contrie with no error : ' + word)                
                possibleWords.push(word)
            }
        });
    }
    return possibleWords
}

window.setup = setup
// check a string
var checking = []
function checkText(text) {
    var textList = text.split(' ')
    var checking = []
    textList.forEach(string => {
        var search = setup(string)        
        checking.push(search.join('|'))
    });
    return checking.join(' ')
}

window.checkText = checkText