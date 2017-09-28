/*
  * This file should define a Node module that exports a constructor for creating basic flashcards, e.g.:
    `module.exports = BasicCard;`

  * The constructor should accept two arguments: `front` and `back`.

  * The constructed object should have a `front` property that contains the text on the front of the card.

  * The constructed object should have a `back` property that contains the text on the back of the card.

*/

/* REQUIRES */

var basicCard = require('./library/basic.js');
//var cardDate = require('./basic.json');
var inquirer = require('inquirer');

/* GLOBAL VARIABLES */
var cards;
var count = 0;
var question;

/* FUNCTIONS */

function startGame(){
    //code
    //console.log("Inside StartGame(); Calling checkCreateCards()");
    //This will create JSON File with Questions/Answers if it has not been created already
    checkCreateCards();
    //console.log("Inside StartGame(); Returned From checkCreateCards()");
    //round();
    prompts();
}

function prompts(){
    
    //console.log("Inside Prompts()");
    //Only loop as many times as we have cards.
    if (count < cards.length) {
        //Prompt User with card front
        inquirer.prompt([
            {
                type: "input",
                message: cards[count].front,
                name: 'userAnswer'
            }
        ])
        .then(function(answers) {
            // console.log("answers", answers);
            //answers has the user response
            if (answers.userAnswer == cards[count].back) {
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
} //prompts()
    
function endGame(){
    //code
    console.log("Thanks for Playing!");
}

function round(){
    //console.log("Inside round");
    //Check Cards Length
    if (count < cards.length) {
        question = [{
            name: 'userAnswer',
            message: cards[count].front,
            default : ''
          }]
        inquirer.prompt(question, round);
        count++;
        //console.log("count", count);
    }
}

//Read JSON file with Questions and Answers if not there then creates it!
function checkCreateCards() {
//    console.log("Inside checkCreateCards()");

    let fs = require("fs");

    //Check for existence of Template
    if (!fs.existsSync("./basic.json")) {
        throw "Cannot Access Basic Template ('basic.json')";
    }
    //Have we already created the output file?
    if (fs.existsSync("./basicOut.json")) {
        console.log("basicOut Already Exists, no need to create");
    }
    
    // console.log("Reading basic.json.");

    //Read the File
    let base = require('./basic.json');
    // console.log("base", base);
    // console.log("base.length", base.length);
    //Modify Template in Memory only
    base[0].front = "Rocket Man is the Leader of ...";
    base[0].back = "North Korea";
    // console.log("base After", base);
    //let result = [];
    let result = base;
    //let obj = JSON.parse(JSON.stringify(base));
    //Add Question/Answer Cards
    var obj = new basicCard("Gas, Liquid and Solid are ...", "Phases");
    // console.log("obj", obj);
    result.push(obj);
    // console.log("result", result);
    obj = new basicCard("The Eiffel Tower is in ...", "France");
    // console.log("obj", obj);
    result.push(obj);
    // console.log("result", result);
    obj = new basicCard("... was the first president of the United States?", "George Washington");
    result.push(obj);
    // console.log("result", result);
   
 //    var string = JSON.stringify(base, null, '\t');
//   Also: fs.writeFileSync() && fs.appendFileSync()
    //Write the Output File now
    fs.writeFileSync('./basicOut.json', JSON.stringify(result, null, 4));
//   fs.appendFileSync('./basicOut.json', JSON.stringify(result, null, 4));
    
/*     fs.writeFile('./basicOut.json', string, function(err) {
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

