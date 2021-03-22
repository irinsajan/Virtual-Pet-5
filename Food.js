class Food{
    constructor() {
        this.image = loadImage("images/Milk.png");
    }

    readStock() {
        //look at the "food" in database
        var foodRef = database.ref("food");

        //look at value
        //=> calling & defining function (no name) binding
        foodRef.on("value", (data) => {
            foodS = data.val();
            //val is a built-in function
        });
    }

    updateStock(fs) {
        database.ref('/').update({
            "food": fs
          });
    }

    display() {
        var x=400, y=20;
       
        imageMode(CENTER);
        image(this.image, 1055, 360, 70, 70);
       
        if(foodS != 0) {
          for(var i=0; i<foodS; i++){
             if(i%20 == 0) {
                x = 20;
                y = y+50;
             }
             image(this.image, x, y, 50, 50);
             x = x+30
          }
        }
       
       }

        bedroom() {
            background(bedroomImg, 550, 500);
        }
       
        garden() {
            background(gardenImg, 550, 500);
        }
       
        washroom() {
            background(washroomImg, 550, 500);
        }
}