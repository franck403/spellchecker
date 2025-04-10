# Spell Checker
## what is this ?
Spell Checker is a app you can use or add in you're project to correct user text.

## Suported feature
- [x] english
- [x] french
- [ ] contries
- [ ] capitalization
- [ ] word chords
- [x] french accent ex : é,ç, etc
- [x] New website UI

## Speed
Please note That the project was never tested for production.

## How to use
###### <script type='module' src="checker.js"></script>
###### or
###### var checker = new worker('https://spellcheckgeoloup.netlify.app/checker.worker.js')

## api
- window.setup('word') (get list for a word)
- window.checkText('text') 

checkText returns a HTML ready string that can be styled using class
