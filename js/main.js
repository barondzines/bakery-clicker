
var bakedGoods = 0;
var bakeGoodQty = 1;
var displayBakedGood = document.getElementById("bake_good_display");
var floatingBakedGood = document.getElementById("bake_good_display_float");
var bakedGoodsDemand = 0;
var displayBakedGoodDemand = document.getElementById("bake_good_demand");
var speedOfSelling = document.getElementById("bake_good_speed");
var money = 0;
var displayMoney = document.getElementById("money_display");
var speedOfSelling = 2000;
var firstTime = true;


class BakedGood{

    constructor () {

        this.level = 0;
        this.name = '';
    }

    create = () => {

       bakedGoods = bakedGoods + bakeGoodQty;
       displayBakedGood.innerHTML = bakedGoods + "<span> Available Bakery Items</span>";
       this.imageEffect();
    }

    autoBaker = () =>{

      if(this.level > 0){

        bakedGoods = bakedGoods + 1 + this.level;
        console.log(this.level);
        displayBakedGood.innerHTML = bakedGoods + "<span> Available Bakery Items</span>";

      }

    }

    imageEffect = () =>{

      let bakeGood = document.getElementById('confection_img_animation_tag');
      let floatBakeGood = document.getElementById('number-float');

      bakeGood.classList.add('grow');
      setTimeout(() => {
          bakeGood.classList.remove('grow');
      }, 100);

      floatBakeGood.innerHTML = bakeGoodQty;
      floatBakeGood.classList.add('num-effect');
      setTimeout(() => {
          floatBakeGood.classList.remove('num-effect');
      }, 250);


    }


}

class SellBakeGood{

    sell = () => {

        if(bakedGoods < bakedGoodsDemand && bakedGoods > 0){

            bakedGoods = bakedGoods - 1;
            money = money + 1;
            displayBakedGood.innerHTML = bakedGoods + "<span> Available Bakery Items</span>";
            floatingBakedGood.innerHTML = bakedGoods + "<span> Items Baked</span>";
            displayMoney.innerHTML = "<span>$</span>"+ money + "<span> Available Money</span>";

        } else if (bakedGoods >= bakedGoodsDemand && bakedGoods > 0){

          bakedGoods = bakedGoods - bakedGoodsDemand;
          money = money + bakedGoodsDemand;

          displayBakedGood.innerHTML = bakedGoods + "<span> Available Bakery Items</span>";
          floatingBakedGood.innerHTML = bakedGoods + "<span> Items Baked</span>";
          displayMoney.innerHTML = "<span>$</span>"+ money + "<span> Available Money</span>";

        }

    }

}

class Bakery
{
    constructor(name, level, price, customerDemand, active, img)
    {
        this.name = name;
        this.level = level;
        this.price = price;
        this.customerDemand = customerDemand;
        this.active = active;
        this.img = img;

        this.createBakery();

    }

    buy = () =>{

      if(money >= this.price){

        //Get the Id's for the cards so we can change them for the players
        let costId = document.getElementById( this.name.replace(/ +/g, "_") + '_price' );
        let costButtonId = document.getElementById( this.name.replace(/ +/g, "_") + '_button' );
        let levelId = document.getElementById(this.name.replace(/ +/g, "_") + '_lvl');


        //Decrease the money cost it takes to upgrade
        money = Math.max(0, money - this.price);
        displayMoney.innerHTML = "<span>$</span>"+ money + "<span> Available Money</span>";

        //Increase the level of the building
        this.level = this.level + 1;
        levelId.innerHTML = "Lvl. " + this.level;

        //Increase the amount it costs to buy another one
        this.price = Math.ceil(this.price * 0.05) * (this.level + this.price) + this.level;
        //costId.innerHTML = "$" + this.price;
        costButtonId.innerHTML = "$" + this.price;

        //Increase the demand for bake good since we are opening or upgrading our bakery
        bakedGoodsDemand = bakedGoodsDemand + this.customerDemand;
        displayBakedGoodDemand.innerHTML = bakedGoodsDemand + " Customer(s) Buying";

        //Check to see if the price is more than what is currently available
        this.setVisible();

      } else {
        alert('You have no money!')
      }

    }

    setVisible = () =>{

        let itemClass = document.getElementById(this.name.replace(/ +/g, "_") + '_button');

        if(money >= this.price && this.active == false) {

          itemClass.classList.remove('disabled');
          this.active = true;

       } else if(money < this.price && this.active == true) {

         itemClass.classList.add('disabled');
         this.active = false;

       }

    }

    createBakery = () =>{
      let singleItem = document.createElement('div');

      singleItem.setAttribute('class', 'cell text-center single-item');
      singleItem.setAttribute( 'id', '' + this.name.replace(/ +/g, "_") + '_block');
      singleItem.innerHTML =
          '<div class="grid-x grid-padding-x align-middle align-center single-item-container">'+
          '<div id='+ this.name.replace(/ +/g, "_") + '_img'+' class="cell small-3">'+
          '<img src="./assets/'+ this.name.replace(/ +/g, "") +'.png" alt="'+ this.name.replace(/ +/g, " ") +'">'+
          '</div>'+
          '<div class="cell small-7 text-left title">'+
          '<p class="title__level" id='+ this.name.replace(/ +/g, "_") + '_lvl'+'>'+
          'Lvl.'+
           this.level +
          '</p>' +
          '<p class="title__name">'+
          this.name +
          '</p>'+
          '<p class="title__production-text">'+
          'Customer Demand ' +
          ' +' +
          this.customerDemand +
          ' per level'+
          '</p>'+
          '</div>'+
          // '<div id='+ this.name.replace(/ +/g, "_") + '_price'+' class="cell auto transAmount">'+
          // '$' +
          // this.price +
          // '</div>' +
          '<div class="cell small-2 text-right">'+
          '<button id=' + this.name.replace(/ +/g, "_") + '_button'+' class="button primary disabled" onclick="'+ this.name.replace(/ +/g, "") + '.buy()">'+
          '$' +
          this.price +
          '</button>'+
          '</div>'+
          '</div>';

      document.getElementById('building_container').appendChild(singleItem);
    }

}

class Bakers{

  constructor(name, level, price, bakeryProduction, active)
  {
      this.name = name;
      this.level = level;
      this.price = price;
      this.bakeryProduction = bakeryProduction;
      this.active = active;

      this.createBaker();

  }

  buy = () => {


    //Get the Id's for the cards so we can change them for the players
    let costId = document.getElementById( this.name.replace(/ +/g, "_") + '_price' );
    let costButtonId = document.getElementById( this.name.replace(/ +/g, "_") + '_button' );
    let levelId = document.getElementById(this.name.replace(/ +/g, "_") + '_lvl');

    if(money >= this.price){
        //Decrease the money cost it takes to upgrade
        money = Math.max(0, money - this.price);
        displayMoney.innerHTML = "<span>$</span>"+ money + "<span> Available Money</span>";

        //Increase the level of the building
        this.level = this.level + 1;
        levelId.innerHTML = "Level: " + this.level;

        //Increase the amount it costs to buy another one
        this.price = Math.ceil(this.price * 0.05) * (this.level + this.price) + this.level;
        costId.innerHTML = "$" + this.price;
        costButtonId.innerHTML = "$" + this.price;

        //Increase the demand for bake good since we are opening or upgrading our bakery
        bakegood.level = bakegood.level + this.bakeryProduction
        bakedGoods = bakedGoods + this.bakeryProduction;
        displayBakedGood.innerHTML = bakedGoods + " Available Bakery Items";


        //Check to see if the price is more than what is currently available
        this.setVisible();

      } else if(money < this.price) {

        itemClass.classList.add('disabled');

      }

  }

  setVisible = () =>{

      let itemClass = document.getElementById(this.name.replace(/ +/g, "_") + '_button');

      if(money >= this.price  && this.active == false) {

        itemClass.classList.remove('disabled');
        this.active = true;

     } else if(money < this.price && this.active == true) {

       itemClass.classList.add('disabled');
       this.active = false;

     }

  }

  createBaker = () => {

    let singleItem = document.createElement('div');

    singleItem.setAttribute('class', 'cell text-center single-item');
    singleItem.setAttribute( 'id', '' + this.name.replace(/ +/g, "_") + '_block');
    singleItem.innerHTML =
        '<div class="grid-x grid-padding-x align-middle align-center single-item-container">'+
        '<div class="cell small-4 text-left">'+
        this.name +
        '<p id='+ this.name.replace(/ +/g, "_") + '_lvl'+'>'+
        'Bakers Baking: '+
         this.level +
        '</p>' +
        '</div>'+
        '<div id='+ this.name.replace(/ +/g, "_") + '_price'+' class="cell auto transAmount">'+
        '$' +
        this.price +
        '</div>' +
        '<div class="cell shrink">'+
        '<button id=' + this.name.replace(/ +/g, "_") + '_button'+' class="button primary disabled" onclick="'+ this.name.replace(/ +/g, "") + '.buy()">'+
        'Hire'+
        '</button>'+
        '</div>'+
        '<div class="cell text-left production-text">'+
        '<p>'+
        'Bakery Item Per Baker: ' +
        this.bakeryProduction +
        '</p>'+
        '</div>'+
        '</div>';

    document.getElementById('bakers_container').appendChild(singleItem);

  }

}

class Kitchen{}

class Confection{

  constructor(name, speedBonus, maxLevel, level, active, price, oldSpeedBonus ){
    this.name = name;
    this.speedBonus = speedBonus;
    this.maxLevel = maxLevel
    this.oldSpeedBonus = oldSpeedBonus
    this.level = level;
    this.active = active;
    this.price = price;

    this.createConfection();

  }

  setActive = () =>{

    let oldDiv = document.getElementById('confection_img_container').innerHTML;
    let oldActiveButton = '';

        if(money >= this.price){

          // this is how we are changing the image for the item you will click
           let newDiv = oldDiv.replace(oldDiv, this.imgChange);
           let activeButton = document.getElementById(this.name.replace(/ +/g, "_") + '_active_button');
           document.getElementById('confection_img_container').innerHTML = newDiv;

           //this is turning off the button after set it active
           activeButton.classList.add('hide');
           this.active = 1;


           if(oldActiveButton != activeButton){
             oldActiveButton.classList.remove('hide');
             console.log('replacing old button with new one', oldActiveButton);

           } else if (this.active == 0) {
             activeButton.classList.add('hide');
             console.log('button hidden');
           }

           activeButton = activeButton;
           console.log('button logged', activeButton);

        }

      }

  increaseLevel = () =>{

    let levelId = document.getElementById(this.name.replace(/ +/g, "_") + '_lvl');
    let levelNum = levelId.innerHTML;
    let speedDiv = document.getElementById('bake_good_speed');

    if(money >= this.price && this.maxLevel > levelNum){

        let time = (speedOfSelling * 6 / 1000).toFixed(2);
        let timeDecimal = (time/Math.pow(10, 1)).toFixed(3);

        this.level = this.level + 1;
        levelId.innerHTML = this.level;
        console.log('new level is: ', this.level)

        this.price = Math.ceil(this.price * 0.05) * (this.level + this.price) + this.level;
        console.log('the new price is: ', this._price)

        speedOfSelling = speedOfSelling - this.speedBonus;
        speedDiv.innerHTML = '<span>Items Sold Every </span>' + timeDecimal + '<span> second(s)</span>'

        this.upgradeConfection();

    } else if( money < this.price && this.maxLevel > levelNum ){

      alert('you dont enough money');

    } else if( this.maxLevel <= levelNum ) {

      let buttonID = document.getElementById(this.name.replace(/ +/g, "_") + '_button_container');
      let maxDiv = '<div id="confection_img_container" class="max_level">Max</div>';

      buttonID.innerHTML = maxDiv;
      alert('Max Level Reached');

    }

  }

  upgradeConfection = () =>{

      this.oldSpeedBonus = this.speedBonus;
      console.log('Old Speed Bonus', this.oldSpeedBonus);
      this.speedBonus = this.oldSpeedBonus + Math.ceil(this.speedBonus * 0.05);
      console.log('new minus upgradd speed bonus', this.speedBonus);

  }

  setVisible = () =>{

    let itemClass = document.getElementById(this.name.replace(/ +/g, "_") + '_button_lvl');
    let activeClass = document.getElementById(this.name.replace(/ +/g, "_") + '_active_button');
    let containerClass = document.getElementById(this.name.replace(/ +/g, "_") + '_block');

    if(money >= this.price ) {

      if(containerClass.classList.contains('hide')){

        containerClass.classList.remove('disabled', 'hide');


      }
      if(containerClass.classList.contains('disabled') || activeClass.classList.contains('disabled') ){
        containerClass.classList.remove('disabled');
        activeClass.classList.remove('disabled');
      }

      if( this.active === 1) {

       itemClass.classList.remove('disabled', 'hide');

      }

   } else if(money < this.price) {

     itemClass.classList.add('disabled', 'hide');
     activeClass.classList.add('disabled');

   }

  }

  createConfection = () => {

    let singleItem = document.createElement('div');

    singleItem.setAttribute('class', 'cell small-2 text-center single-confection hide');
    singleItem.setAttribute( 'id', '' + this.name.replace(/ +/g, "_") + '_block');
    singleItem.innerHTML =
        '<div class="grid-x grid-padding-x align-middle align-center single-confection-container">'+
        '<div class="cell text-center '+ this.name.replace(/ +/g, "_") + '_cell' +' ">'+
          '<span id=" ' + this.name.replace(/ +/g, "_") + '_confection_img" class="confection_img"><img src="./assets/'+ this.name.replace(/ +/g, "") +'.png" alt="'+ this.name.replace(/ +/g, " ") +'"></span>'+
          '<span id="' + this.name.replace(/ +/g, "_") + '_lvl' + '" class="confection_lvl">'+ this.level +'</span>'+
          '<div class="confection_name">'+ this.name.replace(/ +/g, " ") +'</div>'+
          '<span id=' + this.name.replace(/ +/g, "_") + '_button_container'+'>'+
          '<button id=' + this.name.replace(/ +/g, "_") + '_button_lvl'+' class="button primary disabled hide" onclick="'+ this.name.replace(/ +/g, "") + '.increaseLevel()">Level Up</button>'+
          '</span>'+
          '<span id=' + this.name.replace(/ +/g, "_") + '_active_button_container'+'>'+
          '<button id=' + this.name.replace(/ +/g, "_") + '_active_button'+' class="button primary" onclick="'+ this.name.replace(/ +/g, "") + '.setActive()">Activate</button>'+
        '</div>'+
        '</div>';

    document.getElementById('confection_container').appendChild(singleItem);

  }

  imgChange = () => {

    let imgItem =
    '<div id="confection_img_animation_tag" class="clicker_img" onclick="bakegood.create()">'+
      '<img src="./assets/confections/'+ this.name.replace(/ +/g, "") +'-lg.png" alt="CupCake" onclick="bakegood.create()"> '+
      '</div>'+
      '<button id="make-button" class="primary button" type="button" onclick="bakegood.create()" >' +
          'Make ' +
          this.name.replace(/ +/g, " "); +
      '</button>';

      return imgItem;

  }


}

function checkmoney(){

  //buildings Here
  StreetCart.setVisible();
  FoodTruck.setVisible();
  StoreFront.setVisible();
  StripMallStore.setVisible();

  //bakers Here
  HomeBaker.setVisible();
  CollegeBaker.setVisible();

  //confections Here
  CupCake.setVisible();
  Bagel.setVisible();

}

window.setInterval(function(){
    bakegood.autoBaker();
    sellgoods.sell();
    this.checkmoney();

}, speedOfSelling);

document.addEventListener("DOMContentLoaded", function(event) {

  bakegood = new BakedGood();
  sellgoods = new SellBakeGood();

  /**
  * Buldings Go Below
  * name, level, price, customerDemand, active
  **/
  StreetCart = new Bakery('Street Cart', 0, 0, 1, false);
  FoodTruck = new Bakery('Food Truck', 0, 10, 2, false);
  StoreFront = new Bakery('Store Front', 0, 25, 3, false)
  StripMallStore = new Bakery('Strip Mall Store', 0, 50, 5, false);

  /**
  * Bakers Go below
  * name, level, price, bakeryProduction, active
  **/
  HomeBaker = new Bakers('Home Baker', 0, 5, 1, false);
  CollegeBaker = new Bakers('College Baker', 0, 15, 2, false);

  /**
  * Confection Go Below
  * name, speedBonus, maxlevel, level, active, price, oldSpeedBonus
  **/
  CupCake = new Confection('Cup Cake', 0.1, 10, 0, 0, 0, 0);
  Bagel = new Confection('Bagel', 0.2, 20, 0, 0, 2, 0);

});


class Settings {

  save(){




  }

}
