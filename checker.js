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
function setup() {
    var re = new RegExp(setup);
    var words = text => text.toLowerCase().match(re);
    var wordList = words(window.wordList);
    wordList.forEach(word => {
        let count = wordList.get(word) || 0;
        wordList.set(word, count + 1);
    
        var P = (word, N = Array.from(WORDS.values()).reduce((a, b) => a + b)) => WORDS.get(word) / N;
    })
    var correction = word => {
        var candidates = known([word]) || known(edits1(word)) || known(edits2(word)) || [word];
        return candidates.reduce((a, b) => P(a) > P(b) ? a : b);
    };
    
    var known = words => new Set(words.filter(word => WORDS.has(word)));
    
    var edits1 = word => {
        var letters = 'abcdefghijklmnopqrstuvwxyz';
        var splits = [(word.slice(0, i), word.slice(i))];
        var deletes = splits.filter(([L, R]) => R).map(([L, R]) => L + R.slice(1));
        var transposes = splits.filter(([L, R]) => R.length > 1).map(([L, R]) => L + R[1] + R[0] + R.slice(2));
        var replaces = splits.filter(([L, R]) => R).flatMap(([L, R]) => [...letters].map(c => L + c + R.slice(1)));
        var inserts = splits.flatMap(([L, R]) => [...letters].map(c => L + c + R));
        return new Set([...deletes, ...transposes, ...replaces, ...inserts]);
    };
    
    var edits2 = word => {
        var edits1Set = new Set(edits1(word));
        return Array.from(edits1Set).flatMap(e1 => Array.from(edits1Set).map(e2 => e1 + e2));
    }
}