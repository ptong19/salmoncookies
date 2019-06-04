'use strict';

var tableEl = document.getElementById('table');
var tableFoot = document.getElementById('footer');
var formEl = document.getElementById('form');


var storeLocation =[];

var customerPerhr = ['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM'];


function Cookiestore(location,min,max,average){

  this.location = location;
  this.min = min;
  this.max = max;
  this.average = average;
  this.hoursale = [];
  this.totalCookie = 0;


  storeLocation.push(this);

}

new Cookiestore('Pikes Place', 23, 65, 6.3);
new Cookiestore('SeaTac Airport',3,24,1.2);
new Cookiestore('Seattle Center',11,38,3.7);
new Cookiestore('CapitallHill',20,38,2.3);
new Cookiestore('Alki',2,16,4.6);

Cookiestore.prototype.getRandomcustomer = function() {
  return Math.random() * (this.max - this.min) + this.min;

};

Cookiestore.prototype.getHourlySales = function () {
  for (var i = 0; i< customerPerhr.length; i++) {
    var rand = Math.floor(this.getRandomcustomer() * this.average);
    this.hoursale.push(rand);
    this.totalCookie += rand;
  }
  
};

function makeFooterRow() { //eslint-disable-line

  var tableRow = addelment('tr','Totals',tableFoot);

  var bigStupidTotal = 0;
  for (var i = 0; i < customerPerhr.length; i++) {
    var hourlyTotal = 0;
    for (var j = 0; j < storeLocation.length; j++) {
      hourlyTotal = hourlyTotal + storeLocation[j].hoursale[i];
      bigStupidTotal += storeLocation[j].hoursale[i];
    }
    addelment('td',hourlyTotal,tableRow);
  }
  addelment('td',bigStupidTotal,tableRow);
}

Cookiestore.prototype.renderCookiestore = function(){

  // for every store (for loop)
  // create a tr
  // append to the tbody
  // create a td
  // add content
  // append to the tr

  this.getHourlySales();

  var trEl = addelment('tr','',tableEl);
  addelment('td',this.location,trEl);

  for(var i = 0; i < this.hoursale.length; i++){
    addelment('td',this.hoursale[i],trEl);
  }

  addelment('td',this.totalCookie,trEl);

};

function renderHeader(){
  // create element
  // add content
  // attach it to the DOM 



  var trEl = addelment('tr','',tableEl);
  addelment('th','Location',trEl);

  for(var i = 0; i < customerPerhr.length; i++){

    addelment('th',customerPerhr[i],trEl);
  }

  addelment('th','Totals',trEl);
}



function render(){

  //Load Table Header
  renderHeader();

  //Load Body Content
  for(var i = 0; i <storeLocation.length; i++){
    storeLocation[i].renderCookiestore();
  }
}

// Store the form input in variables

function handleSubmit(e){
  e.preventDefault();

  var newStorename = e.target.storeLocal.value;
  var minCust = parseInt(e.target.minInput.value);
  var maxCust = parseInt(e.target.maxInput.value);
  var avgCookies = parseFloat(e.target.avgInput.value);

  var store = new Cookiestore(newStorename, minCust, maxCust, avgCookies);

  store.renderCookiestore();
  myFunction();
  makeFooterRow();
  clearFields(event);
}

function myFunction() {
  document.getElementById('footer').innerHTML = '';
}

var clearFields = function(event){
  event.target.storeLocal.value = null;
  event.target.minInput.value = null;
  event.target.maxInput.value = null;
  event.target.avgInput.value = null;
};

function addelment(element,content,parent){
  var newElement = document.createElement(element);
  var newContent = document.createTextNode(content);
  newElement.appendChild(newContent);
  parent.appendChild(newElement);
  return newElement;
}



formEl.addEventListener('submit',handleSubmit);


render();
makeFooterRow();