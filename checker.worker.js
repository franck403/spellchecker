// wagner algorith
function wagnerFischer(str1, str2) {
  
    if (typeof(str1) !== 'string' || typeof(str2) !== 'string') throw new Error('Pass two strings!')
    
    var distances = []
    
    for (var i = 0; i <= str1.length; ++i) distances[i]    = [ i ]
    for (var i = 0; i <= str2.length; ++i) distances[0][i] =   i
    
    for (var j = 1; j <= str2.length; ++j)
      for (var i = 1; i <= str1.length; ++i)
  
        distances[i][j] =
  
          str1[i - 1] === str2[j - 1] ? // if the characters are equal
          distances[i - 1][j - 1] :     // no operation needed
                                        // else
          Math.min.apply(Math, [        // take the minimum between
             distances[i - 1][  j  ] + 1 // a  deletion
           , distances[  i  ][j - 1] + 1 // an insertion
           , distances[i - 1][j - 1] + 1 // a  substitution
         ])
  
    return distances[str1.length][str2.length]
    
}
// load js file
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
var english = 'https://cdn.jsdelivr.net/gh/dwyl/english-words@master/words.txt'
var french = 'https://cdn.jsdelivr.net/gh/franck403/spellchecker@master/liste_francais.txt'
var contries = 'https://cdn.statically.io/gist/dariusz-wozniak/656f2f9070b4205c5009716f05c94067/raw/b291d58154c85dad840859fef4e63efb163005b0/list-of-countries.txt'

// wagner fischer algorithm
var wagner = wagnerFischer

// load js files and load dict
var wordList = loadWorldsList(french) + '\r\n.' + '\r\n,' + '\r\n/' + '\r\n:' + '\r\n(' + '\r\n)' + '\r\n*' + '\r\n?'  + '\r\n!' + '\r\n&' + '\r\n%' + '\r\n$' + '\r\n#' + '\r\n@' + '\r\nse' + '\r\na'
var contriesList = loadWorldsList(contries)
// check function
function check(word, possible) {
    return wagnerFischer(word, possible)
}

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

// check a string
var checking = []
function checkText(text) {
    var text = text.toLowerCase()
    var textList = text.split(' ')
    var checking = []
    textList.forEach(string => {
        var search = setup(string)        
        checking.push(removeDuplicates(search).join('|'))
    });
    return checking.join(' ')
}