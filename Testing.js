/*
### Examples

    Your constructors should work as follows.

    ```
    var firstPresident = new BasicCard(
        "Who was the first president of the United States?", "George Washington");

    // "Who was the first president of the United States?"
    console.log(firstPresident.front); 

    // "George Washington"
    console.log(firstPresident.back); 

    var firstPresidentCloze = new ClozeCard(
        "George Washington was the first president of the United States.", "George Washington");

    // "George Washington"
    console.log(firstPresidentCloze.cloze); 

    // " ... was the first president of the United States.
    console.log(firstPresidentCloze.partial); "

    // "George Washington was the first president of the United States.
    console.log(firstPresidentCloze.fullText): "

    // Should throw or log an error because "oops" doesn't appear in "This doesn't work"
    var brokenCloze = new ClozeCard("This doesn't work", "oops");
    ```

*/

var ClozeCard = require('./ClozeCard.js');
var BasicCard = require('./BasicCard.js');

var firstPresident = new BasicCard(
    "Who was the first president of the United States?",
    "George Washington");

var firstPresidentNotNew = BasicCard(
    "Who was the first president of the United States?",
    "George Washington");

// "Who was the first president of the United States?"
console.log("firstPresident.front", firstPresident.front); 
console.log("firstPresidentNotNew.front", firstPresidentNotNew.front); 

// "George Washington"
console.log("firstPresident.back", firstPresident.back); 
console.log("firstPresidentNotNew.back", firstPresidentNotNew.back); 

var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.",
    "George Washington");

var firstPresidentClozeNotNew = new ClozeCard(
    "George Washington was the first president of the United States.",
    "George Washington");
    
// "George Washington"
console.log("firstPresidentCloze.cloze", firstPresidentCloze.cloze); 
console.log("firstPresidentClozeNotNew.cloze", firstPresidentClozeNotNew.cloze); 

// " ... was the first president of the United States.
console.log("firstPresidentCloze.partial", firstPresidentCloze.partial);
console.log("firstPresidentClozeNotNew.partial", firstPresidentClozeNotNew.partial);

// "George Washington was the first president of the United States.
console.log("firstPresidentCloze.fullText", firstPresidentCloze.fullText);
console.log("firstPresidentClozeNotNew.fullText", firstPresidentClozeNotNew.fullText);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
//var brokenClozeNotNew = ClozeCard("This doesn't work", "oops");
var brokenCloze = new ClozeCard("This doesn't work", "oops");
