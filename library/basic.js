//BasicCard Object Constructor
var BasicCard = function(front, back) {
    //BONUS: scope-safe constructor
    if(this instanceof BasicCard) {
      this.front = front;
      this.back = back;
      } else {
        return new BasicCard(front, back);
      }
};

//Make the BasicCard Object Importable
module.exports = BasicCard;
