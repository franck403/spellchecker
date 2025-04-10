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
function removeDuplicates(arr) {
    return [...new Set(arr)];
}
function filterStringsByPrefix(arr, prefix) {
    return arr.filter(str => str.startsWith(prefix));
}
// cdn url to fetch to get the words
var english = 'https://cdn.jsdelivr.net/gh/dwyl/english-words/words.txt'
var french = 'https://cdn.jsdelivr.net/gh/franck403/spellchecker/liste_francais.txt'
var contries = 'https://cdn.statically.io/gist/dariusz-wozniak/656f2f9070b4205c5009716f05c94067/raw/b291d58154c85dad840859fef4e63efb163005b0/list-of-countries.txt'

// wagner fischer algorithm
var wagner = wagnerFischer

// load js files and load dict
var wordList = loadWorldsList(french) + '\r\n.' + '\r\n,' + '\r\n/' + '\r\n:' + '\r\n(' + '\r\n)' + '\r\n*' + '\r\n?'  + '\r\n!' + '\r\n&' + '\r\n%' + '\r\n$' + '\r\n#' + '\r\n@' + '\r\nse' + '\r\na'
var contriesList = loadWorldsList(contries)
window.wordList = wordList
window.contriesList = contriesList
// check function
function check(word, possible) {
    return wagnerFischer(word, possible)
}

window.check = check
// search diction for sugestion
function setup(text) {
    var wordsListSplit = window.wordList.replaceAll('\n','').split('\r')
    var wordsListSplit = filterStringsByPrefix(wordsListSplit,text.charAt())
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
        window.contriesList.split('\r').forEach(word => {
            if (check(text,word) < 1) {
                console.log('founded contrie with no error : ' + word)                
                possibleWords.push(word)
            }
        });
    }
    if (possibleWords.length == 0) {
        var possibleWords = [text]
    }
    return possibleWords
}

window.setup = setup
// check a string
var checking = []
function checkText(text) {
    const originalText = text;
    const tokens = originalText.split(/(\b[\wÀ-ÿ'-]+\b)/g); // capture words with accents and hyphens
    let result = '';

    tokens.forEach(token => {
        const word = token.trim();

        // Skip non-word tokens (spaces, punctuation)
        if (!/^[\wÀ-ÿ'-]+$/i.test(word)) {
            result += token;
            return;
        }

        const lowerWord = word.toLowerCase();
        const suggestions = removeDuplicates(setup(lowerWord));

        // If word is correct or only suggestion is itself
        if (suggestions.length === 1 && suggestions[0] === lowerWord) {
            result += token;
        } else {
            const filtered = suggestions.filter(w => w !== lowerWord);
            if (filtered.length === 0) {
                result += token;
            } else {
                const html = `<span class="correction" data-tip="Suggestions: ${filtered.join(', ')}">${token}</span>`;
                result += html;
            }
        }
    });

    return result;
}
window.checkText = checkText
