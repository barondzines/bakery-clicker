
var bakedGoods = 0;
var displayBakedGood = document.getElementById("bake_good_display");
var bakedGoodsDemand = 0;
var displayBakedGoodDemand = document.getElementById("bake_good_demand");
var speedOfSelling = document.getElementById("bake_good_speed");
var money = 0;
var displayMoney = document.getElementById("money_display");
var speedOfSelling = 2000;


class BakedGood{

    constructor () {

        this.level = 0;
        this.name = '';
    }

    create() {

       bakedGoods = bakedGoods + 1;
       displayBakedGood.innerHTML = bakedGoods + "<span> Available Bakery Items</span>";

    }

    autoBaker(){

      if(this.level > 0){

        bakedGoods = bakedGoods + 1 + this.level;
        console.log(this.level);
        displayBakedGood.innerHTML = bakedGoods + "<span> Available Bakery Items</span>";

      }

    }


}

class SellBakeGood{

    sell() {

        if(bakedGoods < bakedGoodsDemand && bakedGoods > 0){

            bakedGoods = bakedGoods - 1;
            money = money + 1;
            displayBakedGood.innerHTML = bakedGoods + "<span> Available Bakery Items</span>";
            displayMoney.innerHTML = "<span>$</span>"+ money + "<span> Available Money</span>";

        } else if (bakedGoods >= bakedGoodsDemand && bakedGoods > 0){

          bakedGoods = bakedGoods - bakedGoodsDemand;
          money = money + bakedGoodsDemand;

          displayBakedGood.innerHTML = bakedGoods + "<span> Available Bakery Items</span>";
          displayMoney.innerHTML = "<span>$</span>"+ money + "<span> Available Money</span>";

        }

    }

}

class Bakery
{
    constructor(name, level, price, customerDemand)
    {
        this.name = name;
        this.level = level;
        this.price = price;
        this.customerDemand = customerDemand;

        let singleItem = document.createElement('div');

        singleItem.setAttribute('class', 'cell text-center single-item');
        singleItem.setAttribute( 'id', '' + this.name.replace(/ +/g, "_") + '_block');
        singleItem.innerHTML =
            '<div class="grid-x grid-padding-x align-middle align-center single-item-container">'+
            '<div class="cell small-4 text-left">'+
            this.name +
            '<p id='+ this.name.replace(/ +/g, "_") + '_lvl'+'>'+
            'Level: '+
             this.level +
            '</p>' +
            '</div>'+
            '<div id='+ this.name.replace(/ +/g, "_") + '_price'+' class="cell auto transAmount">'+
            '$' +
            this.price +
            '</div>' +
            '<div class="cell shrink">'+
            '<button id=' + this.name.replace(/ +/g, "_") + '_button'+' class="button primary disabled" onclick="'+ this.name.replace(/ +/g, "") + '.buy()">'+
            'Buy'+
            '</button>'+
            '</div>'+
            '<div class="cell text-left production-text">'+
            '<p>'+
            'Customer Demand ' +
            this.customerDemand +
            '</p>'+
            '</div>'+
            '</div>';

        document.getElementById('building_container').appendChild(singleItem);
    }

    buy(){

      //Get the Id's for the cards so we can change them for the players
      let costId = document.getElementById( this.name.replace(/ +/g, "_") + '_price' );
      let levelId = document.getElementById(this.name.replace(/ +/g, "_") + '_lvl');

      //Decrease the money cost it takes to upgrade
      money = Math.max(0, money - this.price);
      displayMoney.innerHTML = "<span>$</span>"+ money + "<span> Available Money</span>";

      //Increase the level of the building
      this.level = this.level + 1;
      levelId.innerHTML = "Level: " + this.level;

      //Increase the amount it costs to buy another one
      this.price = Math.ceil(this.price * 0.05) * (this.level  + this.price) + this.level;
      costId.innerHTML = "$" + this.price;

      //Increase the demand for bake good since we are opening or upgrading our bakery
      bakedGoodsDemand = bakedGoodsDemand + this.customerDemand;
      displayBakedGoodDemand.innerHTML = bakedGoodsDemand + " Customer(s) Buying";

      //Check to see if the price is more than what is currently available
      this.setVisible();

    }

    setVisible(){

        let itemClass = document.getElementById(this.name.replace(/ +/g, "_") + '_button');

        if(money >= this.price) {

          itemClass.classList.remove('disabled');

       } else if(money < this.price) {

         itemClass.classList.add('disabled');

       }

    }

}

class Bakers{

  constructor(name, level, price, bakeryProduction)
  {
      this.name = name;
      this.level = level;
      this.price = price;
      this.bakeryProduction = bakeryProduction;

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

  buy(){

    //Get the Id's for the cards so we can change them for the players
    let costId = document.getElementById( this.name.replace(/ +/g, "_") + '_price' );
    let levelId = document.getElementById(this.name.replace(/ +/g, "_") + '_lvl');

    //Decrease the money cost it takes to upgrade
    money = Math.max(0, money - this.price);
    displayMoney.innerHTML = "<span>$</span>"+ money + "<span> Available Money</span>";

    //Increase the level of the building
    this.level = this.level + 1;
    levelId.innerHTML = "Level: " + this.level;

    //Increase the amount it costs to buy another one
    this.price = Math.ceil(this.price * 0.05) * (this.level  + this.price) + this.level;
    costId.innerHTML = "$" + this.price;

    //Increase the demand for bake good since we are opening or upgrading our bakery
    bakegood.level = bakegood.level + this.bakeryProduction
    bakedGoods = bakedGoods + this.bakeryProduction;
    displayBakedGood.innerHTML = bakedGoods + " Available Bakery Items";


    //Check to see if the price is more than what is currently available
    this.setVisible();

  }

  setVisible(){

      let itemClass = document.getElementById(this.name.replace(/ +/g, "_") + '_button');

      if(money >= this.price) {

        itemClass.classList.remove('disabled');

     } else if(money < this.price) {

       itemClass.classList.add('disabled');

     }

  }

}

class Kitchen{}


class Confection{

  constructor(name, speedBonus, bakerBonus, level, active, price ){
    this.name = name;
    this.speedBonus = speedBonus;
    this.bakerBonus = bakerBonus;
    this.level = level;
    this.active = active;
    this.price = price;

    let singleItem = document.createElement('div');

    singleItem.setAttribute('class', 'cell small-2 text-center single-confection hide');
    singleItem.setAttribute( 'id', '' + this.name.replace(/ +/g, "_") + '_block');
    singleItem.innerHTML =
        '<div class="grid-x grid-padding-x align-middle align-center single-confection-container">'+
        '<div class="cell text-center '+ this.name.replace(/ +/g, "_") + '_cell' +' ">'+
          '<span id=" ' + this.name.replace(/ +/g, "_") + '_confection_img" class="confection_img"><img src="./assets/'+ this.name.replace(/ +/g, "") +'.png" alt="'+ this.name.replace(/ +/g, " ") +'"></span>'+
          '<span class="confection_lvl">'+ this.level +'</span>'+
          '<div class="confection_name">'+ this.name.replace(/ +/g, " ") +'</div>'+
          '<button id=' + this.name.replace(/ +/g, "_") + '_button'+' class="button primary disabled hide" onclick="'+ this.name.replace(/ +/g, "") + '.increaseLevel()">Level Up</button>'+
          '<button id=' + this.name.replace(/ +/g, "_") + '_active_button'+' class="button primary disabled hide" onclick="'+ this.name.replace(/ +/g, "") + '.setActive()">Active</button>'+
        '</div>'+
        '</div>';

    document.getElementById('confection_container').appendChild(singleItem);
  }

  setActive(){

    let activeItem = document.getLementById(this.name.replace(/ +/g, "_") + '_cell').classname = "active";

      //check if anything else is active, if so turn it off
      //remove all the stats from the previous item
      //then set status set active
      //change button name
      //then update all the status accordingly

  }

  increaseLevel(){

    //if there is enough money
    //then upgraded the level of the confection
    //only do this every 5 levels

  }

  setVisible(){

    let itemClass = document.getElementById(this.name.replace(/ +/g, "_") + '_button');
    let activeClass = document.getElementById(this.name.replace(/ +/g, "_") + '_active_button');
    let containerClass = document.getElementById(this.name.replace(/ +/g, "_") + '_block');

    if(money >= this.price) {

      itemClass.classList.remove('disabled', 'hide');

      if(containerClass.classList.contains('hide')){

        containerClass.classList.remove('disabled', 'hide');

      }

      if(activeClass.classList.contains('active') === false){

        activeClass.classList.remove('disabled', 'hide');

      }

   } else if(money < this.price) {

     itemClass.classList.add('disabled', 'hide');
     activeClass.classList.add('disabled');

   }

  }


}



function checkmoney(){

  //buildings Here
  StreetCart.setVisible();
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

  //Buildings here
  StreetCart = new Bakery('Street Cart', 0, 0, 1);
  StripMallStore = new Bakery('Strip Mall Store', 0, 5, 2);

  //Bakers Here
  HomeBaker = new Bakers('Home Baker', 0, 5, 1);
  CollegeBaker = new Bakers('College Baker', 0, 15, 2);

  //Confection Here
  CupCake = new Confection('Cup Cake', 0, 0, 0, 1, 0);
  Bagel = new Confection('Bagel', 0, 0, 0, 0, 0);

});
