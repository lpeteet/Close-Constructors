/*
  * This file should define a Node module that exports a constructor for creating basic flashcards, e.g.:
    `module.exports = BasicCard;`

  * The constructor should accept two arguments: `front` and `back`.

  * The constructed object should have a `front` property that contains the text on the front of the card.

  * The constructed object should have a `back` property that contains the text on the back of the card.

*/

//requires

var basicCard = require('./library/basic.js');
//var cardDate = require('./basic.json');
var inquirer = require('inquirer');

var cards;
var count = 0;
var question;

function startGame(){
    //code
    console.log("Inside StartGame(); Calling checkCreateCards()");
    checkCreateCards();
    console.log("Inside StartGame(); Returned From checkCreateCards()");
    //round();
    prompts();
}

function endGame(){
    //code
    console.log("Thanks for Playing!");
}

function round(){
    //console.log("Inside round");
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

function prompts(){

    //console.log("Inside Prompts()");
    if (count < cards.length) {
        inquirer.prompt([
            {
              type: "input",
              message: cards[count].front,
              name: 'userAnswer'
            }
        ])
        .then(function(answers) {
            // console.log("answers", answers);
            if (answers.userAnswer == cards[count].back) {
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
} //prompts()

function checkCreateCards() {
//    console.log("Inside checkCreateCards()");

    let fs = require("fs");

    if (!fs.existsSync("./basic.json")) {
        throw "Cannot Access Basic Template ('basic.json')";
    }
    if (fs.existsSync("./basicOut.json")) {
        console.log("basicOut Already Exists, no need to create");
    }
    
    // console.log("Reading basic.json.");

    //Read the File
    let base = require('./basic.json');
    // console.log("base", base);
    // console.log("base.length", base.length);
    base[0].front = "Rocket Man is the Leader of ...";
    base[0].back = "North Korea";
    // console.log("base After", base);
    //let result = [];
    let result = base;
    //let obj = JSON.parse(JSON.stringify(base));
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

startGame();


function Bogus() {
    // if statement to ensure that our questions are only asked five times
    if (count < cards.length) {
        console.log("NEW Question");
        // runs inquirer and asks the user a series of questions whose replies are
        // stored within the variable answers inside of the .then statement
        inquirer.prompt([ {
            name: "response",
            message: cards[count].front
        }
        ]).then(function(answers) {
            //Did they answer correctly?
            if (answers.response == cards[count].back) {
                console.log("Correct Answer!");
            } else {
                console.log("InCorrect Answer!");
            }
            //add one to count to increment our recursive loop by one
            count++;
            //run the askquestion function again so as to either end the loop or ask the questions again
            prompts();
        });
    }
}
