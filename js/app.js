'use strict';

var tableEl = document.getElementById('table');


var storeLocation =[];

var customerPerhr = ['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM'];

// function getRandomCustomer(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
function Cookiestore(location,min,max,average){

  this.location = location;
  this.min = min;
  this.max = max;
  this.average = average;
  this.hoursale = [];
  this.totalCookie = 0;


  storeLocation.push(this);

}

var pikeMarket = new Cookiestore('Pikes Place', 23, 65, 6.3);
var airPort = new Cookiestore('SeaTac Airport',3,24,1.2);
var seaTtle = new Cookiestore('Seattle Center',11,38,3.7);
var capHill = new Cookiestore('CapitallHill',20,38,2.3);
var alKi = new Cookiestore('Alki',2,16,4.6);

Cookiestore.prototype.getRandomcustomer = function() {
  return Math.random() * (this.max - this.min) + this.min;

};

Cookiestore.prototype.getHourlySales = function () {
  for (var i = 0; i< customerPerhr.length; i++) {
    var rand = Math.floor(this.getRandomcustomer() * this.average);
    this.hoursale.push(rand);
    this.totalCookie += rand;
  }
  // console.log('hoursale', this.hoursale);
};

function makeFooterRow() { //eslint-disable-line
  var tableRow = document.createElement('tr');
  tableRow.textContent = 'Totals';
  tableEl.appendChild(tableRow);

  var tableD = document.createElement('td');
  tableD.textContent ='';
  tableRow.appendChild(tableD);



  var bigStupidTotal = 0;
  for (var i = 0; i < customerPerhr.length; i++) {
    var hourlyTotal = 0;
    for (var j = 0; j < storeLocation.length; j++) {
      hourlyTotal = hourlyTotal + storeLocation[j].hoursale[i];
      bigStupidTotal += storeLocation[j].hoursale[i];
    }
    var tdElement = document.createElement('td');
    tdElement.textContent = hourlyTotal;
    tableRow.appendChild(tdElement);
    

  }

  tdElement = document.createElement('td');
  tdElement.textContent = bigStupidTotal;
  tableRow.appendChild(tdElement);

  



}

Cookiestore.prototype.renderCookiestore = function(){

  // for every store (for loop)
  // create a tr
  // append to the tbody
  // create a td
  // add content
  // append to the tr

  this.getHourlySales();

  console.log('hoursale inside cookie store', this.hoursale);

  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  

  // add the location
  var tdEl = document.createElement('td');
  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);


  // add the minnimum
  var tdEl2 = document.createElement('td');
  tdEl2.textContent = this.hoursale[i];
  trEl.appendChild(tdEl2);

 


  for(var i = 0; i < this.hoursale.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.hoursale[i];
    trEl.appendChild(tdEl);
  }




  var total = document.createElement('td');
  total.textContent =this.totalCookie;
  trEl.appendChild(total);

 

};

function renderHeader(){
  // create element
  // add content
  // attach it to the DOM

  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  var thEl1 = document.createElement('th');
  thEl1.textContent = 'Location';
  trEl.appendChild(thEl1);

  var thEl2 = document.createElement('th');
  thEl2.textContent ='';
  trEl.appendChild(thEl2);




  for(var i = 0; i < customerPerhr.length; i++){
    var thEl = document.createElement('th');
    thEl.textContent = customerPerhr[i];
    trEl.appendChild(thEl);
  }

  var thEl3 = document.createElement('th');
  thEl3.textContent ='Totals';
  trEl.appendChild(thEl3);

}


// easy shit to do the table
function render(){

 
  //Load Table Header
  renderHeader();
  
  //Load Body Content
  pikeMarket.renderCookiestore();
  airPort.renderCookiestore();
  seaTtle.renderCookiestore();
  capHill.renderCookiestore();
  alKi.renderCookiestore();

 

}

render();
makeFooterRow();