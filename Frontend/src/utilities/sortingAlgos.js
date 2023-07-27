const Fuse = require("fuse.js").default;
const options = {
  keys: ["name", "toppings"],
  findAllMatches: true,
};

export const transformDataArray = (
  data,
  veg,
  sortArr,
  searchTerm,
  toppingArray
) => {
  let pizData = data.dataObj;
  let pizArray = [...data.dataArr];
  let nameArr = data.nameArr;

  if (searchTerm) searchPizza(searchTerm, nameArr, pizArray);
  if (toppingArray.length !== 0) {
    toppingArray.forEach((topping, index) => {
      index === 0
        ? searchPizza(topping, nameArr, pizArray)
        : toppingSearch(topping, nameArr, pizArray);
    });
  }
  //   let fuse=new Fuse(nameArr,options);
  //   let result=fuse.search("margherita")
  //   console.log(result)
  if (veg) filterVeg(pizArray, pizData);
  if (sortArr[0]) {
    if (sortArr[1] === "a-b") sortByLow(pizArray, pizData, "low");
    if (sortArr[1] === "b-a") sortByLow(pizArray, pizData, "high");
  }

  return pizArray;
};
function searchPizza(searchTerm, nameArr, pizArr) {
  let fuse = new Fuse(nameArr, options);
  let result = fuse.search(searchTerm);
  let items = [];
  result.forEach((i) => {
    items.push(i.item._id);
  });
  //   let items=result.reduce((acc,curr)=>{
  //     acc.push(curr.item._id);
  //   },[]);
  //   result.forEach(i=>console.log(i.item.name))
  pizArr.splice(0, pizArr.length, ...items);
}

function toppingSearch(searchTerm, nameArr, pizArr) {
  let fuse = new Fuse(nameArr, options);
  let result = fuse.search(searchTerm);
  let items = []
  result.forEach((i) => {
    if (!pizArr.includes(i.item._id)) {
      items.push(i.item._id);
    }
    console.log(items)
    //tabhin add karenge jab purane wale mai na ho
  });
  console.log(pizArr)
  return pizArr = pizArr.concat(...items);
}
function filterVeg(arr, obj) {
  let vegPizza = arr.filter((x) => obj[x].vegetarian);
  arr.splice(0, arr.length, ...vegPizza);
}

function sortByLow(arr, obj, condition) {
  if (condition === "low") {
    arr.sort(function (a, b) {
      return obj[a].sizes.small - obj[b].sizes.small;
    });
  }
  if (condition === "high") {
    arr.sort(function (a, b) {
      return obj[b].sizes.small - obj[a].sizes.small;
    });
  }
}
