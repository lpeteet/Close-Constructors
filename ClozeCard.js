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

/* REQUIRES */

var clozeCard = require('./library/cloze.js');
//var cardDate = require('./cloze.json');
var inquirer = require('inquirer');

/* GLOBAL VARIABLES */
var cards;
var count = 0;
var question;

/* FUNCTIONS */
function startGame(){
  //code
    // console.log("Inside StartGame(); Calling checkCreateCards()");
    //This will create JSON File with Questions/Answers if it has not been created already
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
    //Only loop as many times as we have cards.
    if (count < cards.length) {
      inquirer.prompt([
          {
            type: "input",
            message: cards[count].partial,
            name: 'userAnswer'
          }
      ])
      .then(function(answers) {
            //answers has the user response
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
        //All Done!  End the game
        endGame();
  }
}

//Read JSON file with Questions and Answers if not there then creates it!
function checkCreateCards() {
  // console.log("Inside checkCreateCards()");

  let fs = require("fs");

  //Check for existence of Template
  if (!fs.existsSync("./cloze.json")) {
      throw "Cannot Access Cloze Template ('cloze.json')";
  }
    //Have we already created the output file?
    if (fs.existsSync("./clozeOut.json")) {
      console.log("clozeOut Already Exists, no need to create");
  }
  
  // console.log("Reading cloze.json.");

  //Read the File
  let base = require('./cloze.json');
  // console.log("base", base);
  // console.log("base.length", base.length);
    //Modify Template in Memory only
  base[0].fulltext = "Rocket Man is the Leader of North Korea";
  base[0].cloze = "North Korea";
  base[0].partial = base[0].fulltext.replace(base[0].cloze, "________");
  // console.log("base After", base);
  //let result = [];
  let result = base;
  //let obj = JSON.parse(JSON.stringify(base));
  //Add Question/Answer Cards
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
 
//   Also: fs.writeFileSync() && fs.appendFileSync()
    //Write the Output File now
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

/* MAIN CODE */
startGame();




