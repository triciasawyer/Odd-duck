'use strict';
// console.log('js is connected.');


// console.log('🚀 ~ file: app.js:5 ~ lastViewed:", lastViewed');

// global variables
let productContainer = document.querySelector('section');
let resultBox = document.querySelector('div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');




// constructor function to build the image objects
function Product(name, src, views, clickedProduct) {
  this.name = name;
  this.imageSrc = src;
  this.views = 0;
  this.clickedProduct = 0;
  Product.allProductsArray.push(this);
}

// click counts for the rounds
let clicks = 0;
let maxClicks = 10;
Product.allProductsArray = [];

let lastViewed = [];


// generate random number
function getRandomImg() {
  return Math.floor(Math.random() * Product.allProductsArray.length);
}


// rendering images
function renderProducts() {
  let product1 = getRandomImg();
  let product2 = getRandomImg();
  let product3 = getRandomImg();

  while (lastViewed.includes(product1)) {
    // console.log('product1',product1);
    product1 = getRandomImg();
  }
  lastViewed.push(product1);

  while (lastViewed.includes(product2)) {
    product2 = getRandomImg();
  }
  lastViewed.push(product2);


  while (lastViewed.includes(product3)) {
    product3 = getRandomImg();
  }
  lastViewed.push(product3);


  if (lastViewed.length > 3) {
    lastViewed.splice(0, 3);
    console.log('inside the if: ', lastViewed);
  }


  // image name
  image1.alt = Product.allProductsArray[product1].name;
  image2.alt = Product.allProductsArray[product2].name;
  image3.alt = Product.allProductsArray[product3].name;

  // image data so we can show and track them
  image1.src = Product.allProductsArray[product1].imageSrc;
  image2.src = Product.allProductsArray[product2].imageSrc;
  image3.src = Product.allProductsArray[product3].imageSrc;

  // Go to array, views = views + 1
  Product.allProductsArray[product1].views++;
  Product.allProductsArray[product2].views++;
  Product.allProductsArray[product3].views++;
}



// click on pictures only
function productClicked(event) {
  if (event.target === productContainer) {
    alert('Click on an image.');
  }

  //tracking total clicks
  clicks++;
  let chosenProduct = event.target.alt;
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
    console.log('Clicked', clicks);
    localStorage.setItem('savedProduct', JSON.stringify(Product.allProductsArray));
  } else {
    renderProducts();
  }
}


function renderResults() {
  let ul = document.getElementById('ul');
  ul.innerHTML = '';
  for (let i = 0; i < Product.allProductsArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${Product.allProductsArray[i].name} had ${Product.allProductsArray[i].views} views and was clicked ${Product.allProductsArray[i].clickedProduct} times.`;
    ul.appendChild(li);
  }
  renderChart();
}


// JSON out of local storage
let savedProductString = localStorage.getItem('savedProduct');
console.log('local storage', savedProductString);


if (savedProductString) {
  let arrayNotProductObject = JSON.parse(savedProductString);
  console.log('🚀 ~ file: app.js:33 ~ arrayNotProductObject:', arrayNotProductObject);

  // run objects through constructor function so they are product objects
  for (let j = 0; j < arrayNotProductObject.length; j++) {
    new Product(
      this.name = arrayNotProductObject[j].name,
      this.imageSrc = arrayNotProductObject[j].imageSrc,
      this.views = arrayNotProductObject[j].views,
      this.clickedProduct = arrayNotProductObject[j].clickedProduct
    );
  }
} else {
  new Product('Bag', 'images/bag.jpg');
  new Product('Banana', 'images/banana.jpg');
  new Product('Bathroom', 'images/bathroom.jpg');
  new Product('Boots', 'images/boots.jpg');
  new Product('Breakfast', 'images/breakfast.jpg');
  new Product('Bubblegum', 'images/bubblegum.jpg');
  new Product('Chair', 'images/chair.jpg');
  new Product('Dog-duck', 'images/dog-duck.jpg');
  new Product('Dragon meat', 'images/dragon.jpg');
  new Product('Figurine', 'images/figurine.jpg');
  new Product('Pen', 'images/pen.jpg');
  new Product('Pet-sweep', 'images/pet-sweep.jpg');
  new Product('Scissors', 'images/scissors.jpg');
  new Product('Shark', 'images/shark.jpg');
  new Product('Baby-sweep', 'images/sweep.png');
  new Product('Tauntaun', 'images/tauntaun.jpg');
  new Product('Unicorn meat', 'images/unicorn.jpg');
  new Product('Water can', 'images/water-can.jpg');
  new Product('Wine glass', 'images/wine-glass.jpg');
}






renderProducts();


productContainer.addEventListener('click', productClicked);


// rendering myChart
function renderChart() {
  console.log(Product.allProductsArray);

  //Make the names, likes, and total views
  let productNames = [];
  let productLikes = [];
  let productViews = [];

  for (let i = 0; i < Product.allProductsArray.length; i++) {
    productNames.push(Product.allProductsArray[i].name);
    productLikes.push(Product.allProductsArray[i].clickedProduct);
    productViews.push(Product.allProductsArray[i].views);
  }
  console.log(productNames, productLikes, productViews);


  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',

    data: {
      labels: productNames,
      backgroundColor: 'rgb(102, 178, 255)',
      datasets: [
        {
          label: 'Liked product',
          backgroundColor: 'rgb(0,250,154)',
          data: productLikes,
          borderWidth: 2,
        },
        {
          label: 'Viewed product',
          backgroundColor: 'rgb(221,160,221)',
          data: productViews,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
