//ClozeCard Object Constructor
var ClozeCard = function(text, cloze) {
    //BONUS: scope-safe constructor
    if(this instanceof ClozeCard) {
      this.cloze = cloze;
      this.fulltext = text;
      this.partial = text.replace(cloze, "________");
      //The constructor should throw or log an error when the cloze deletion does _not_ appear in the input text.
      this.init = function(){
        if (text.includes(cloze) == false) {
          throw "Error: Full Text Must Contain the Cloze Text";
        }
        //console.log("this.partial", this.partial);
      }();
    } else {
      return new ClozeCard(text, cloze);
    }
  };

//Make the ClozeCard Object Importable
module.exports = ClozeCard;
