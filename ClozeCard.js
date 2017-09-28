/*
  * This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.:
    `module.exports = ClozeCard;`

  * The constructor should accept two arguments: `text` and `cloze`.

  * The constructed object should have a `cloze` property that contains _only_ the cloze-deleted portion of the text.

  * The constructed object should have a `partial` property that contains _only_ the partial text.

  * The constructed object should have a `fullText` property that contains _only_ the full text.

  * The constructor should throw or log an error when the cloze deletion does _not_ appear in the input text.

  * Use prototypes to attach these methods, wherever possible.

The bulk of this assignment is implementing `ClozeCard`. If you build a robust `ClozeCard` implementation, feel free to try your hand at implementing a front-end, as well.

*/

//requires

var clozeCard = require('./library/cloze.js');
//var cardDate = require('./cloze.json');
var inquirer = require('inquirer');

var cards;
var count = 0;
var question;

function startGame(){
  //code
    // console.log("Inside StartGame(); Calling checkCreateCards()");
    checkCreateCards();
    // console.log("Inside StartGame(); Returned From checkCreateCards()");
    prompts();
  }

function endGame(){
    console.log("Thanks for Playing!");
  }

function round(){
    //console.log("Inside round");
    if (count < cards.length) {
      question = [{
          name: 'userAnswer',
          message: cards[count].partial,
          default : ''
        }]
      inquirer.prompt(question, round);
      count++;
      //console.log("count", count);
  }
}

function prompts(){
    //console.log("Inside Prompts()");
    if (count < cards.length) {
      inquirer.prompt([
          {
            type: "input",
            message: cards[count].partial,
            name: 'userAnswer'
          }
      ])
      .then(function(answers) {
          // console.log("answers", answers);
          if (answers.userAnswer == cards[count].cloze) {
              console.log("Correct Answer!");
          } else {
              console.log("InCorrect Answer!");
          }
          count++;
          prompts();
      });
  } else {
      endGame();
  }
}

function checkCreateCards() {
  // console.log("Inside checkCreateCards()");

  let fs = require("fs");

  if (!fs.existsSync("./cloze.json")) {
      throw "Cannot Access Cloze Template ('cloze.json')";
  }
  if (fs.existsSync("./clozeOut.json")) {
      console.log("clozeOut Already Exists, no need to create");
  }
  
  // console.log("Reading cloze.json.");

  //Read the File
  let base = require('./cloze.json');
  // console.log("base", base);
  // console.log("base.length", base.length);
  base[0].text = "Rocket Man is the Leader of North Korea";
  base[0].cloze = "North Korea";
  base[0].partial = base[0].text.replace(base[0].cloze, "________");
  // console.log("base After", base);
  //let result = [];
  let result = base;
  //let obj = JSON.parse(JSON.stringify(base));
  var obj = new clozeCard("Gas, Liquid and Solid are Phases", "Phases");
  // console.log("obj", obj);
  result.push(obj);
  // console.log("result", result);
  obj = new clozeCard("The Eiffel Tower is in France", "France");
  // console.log("obj", obj);
  result.push(obj);
  // console.log("result", result);
  obj = new clozeCard("George Washington was the first president of the United States?", "George Washington");
  result.push(obj);
  // console.log("result", result);
 
//    var string = JSON.stringify(base, null, '\t');
//   Also: fs.writeFileSync() && fs.appendFileSync()
  fs.writeFileSync('./clozeOut.json', JSON.stringify(result, null, 4));
//   fs.appendFileSync('./clozeOut.json', JSON.stringify(result, null, 4));
  
/*     fs.writeFile('./clozeOut.json', string, function(err) {
    if (err) return console.error(err);
    console.log('done');
  })
*/
  //Save Result to Global cards Variable
  cards = result;
  // console.log("Returning from checkCreateCards()");

};

startGame();


