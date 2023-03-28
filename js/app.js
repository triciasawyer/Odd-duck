'use strict';
console.log('js is connected.');

// global variables
let productContainer = document.querySelector('section');
let resultBox = document.querySelector('div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
console.log(productContainer, resultBox, image1, image2, image3);

// click counts for the rounds
let clicks = 0;
let maxClicks = 10;
Product.allProductsArray = [];



// constructor function to build the image objects
function Product(name, src) {
  this.name = name;
  this.imageSrc = src;
  this.views = 0;
  this.clickedProduct = 0;
  Product.allProductsArray.push(this);
}
console.log('Products ', Product.allProductsArray);


// generate random number
function getRandomNum() {
  return Math.floor(Math.random() * Product.allProductsArray.length);
}


// rendering images
function renderProducts() {
  let product1 = getRandomNum();
  let product2 = getRandomNum();
  let product3 = getRandomNum();
  console.log('typeof product1, product2, product3');

  //rendering images so they are all different
  while (product1 === product2 || product1 === product3) {
    product1 = getRandomNum();
  }

  while (product2 === product1 || product2 === product3) {
    product2 = getRandomNum();
  }

  // image data so we can show and track them
  image1.src = Product.allProductsArray[product1].imageSrc;
  image2.src = Product.allProductsArray[product2].imageSrc;
  image3.src = Product.allProductsArray[product3].imageSrc;

  // image name
  image1.alt = Product.allProductsArray[product1].name;
  image2.alt = Product.allProductsArray[product2].name;
  image3.alt = Product.allProductsArray[product3].name;
  console.log(image1, image2, image3);

  // Go to array, views = views + 1
  Product.allProductsArray[product1].views++;
  Product.allProductsArray[product2].views++;
  Product.allProductsArray[product3].views++;
}

// click on pictures only
function productClicked(event) {
  console.log(event.target);
  if (event.target === productContainer) {
    alert('Click on an image.');
  }

  //tracking total clicks
  clicks++;
  let chosenProduct = event.target.alt;
  console.log('🚀 ~ file: app.js:74 ~ productClicked ~ chosenProduct:', chosenProduct);
  for (let i = 0; i < Product.allProductsArray.length; i++) {
    if (chosenProduct === Product.allProductsArray[i].name) {
      //adding image clicked on totals
      Product.allProductsArray[i].clickedProduct++;
      break;
    }
  }

  if (clicks === maxClicks) {
    productContainer.removeEventListener('click', productClicked);
    resultBox.addEventListener('click', renderResults);

  } else {
    console.log('Clicked', clicks);
    renderProducts();
  }
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < Product.allProductsArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${Product.allProductsArray[i].name} had ${Product.allProductsArray[i].views} views and was clicked ${Product.allProductsArray[i].clickedProduct} times.`;
    ul.appendChild(li);
  }
}



// render result in an unordered list

new Product('Bag', 'images/bag.jpg');
new Product('Banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('figurine', 'images/figurine.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');


renderProducts();
renderResults();


productContainer.addEventListener('click', productClicked);
