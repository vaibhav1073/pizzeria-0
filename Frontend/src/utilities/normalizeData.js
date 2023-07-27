export const normalizeDataToObj=(data)=>{
    const dataArr=[],dataObj={},nameArr=[];
    let toppingSet=new Set();
    data?.forEach(item=>{
        function mountData(item){
            dataArr.push(item._id);
            nameArr.push({_id:item._id,name:item.name,toppings:toppingsString(item.toppings,toppingSet)})
            dataObj[item._id]=item;
        }
        mountData(item);

    })
    const toppings=[...toppingSet]
    return {dataArr,dataObj,nameArr,toppings};
   
}

function toppingsString(toppingArray,set){
    let toppingsStr="";
    toppingArray.forEach(topping=>{
        set.add(topping);
        toppingsStr+=topping+"#"
    })
    return toppingsStr;
}
// id
// : 
// "001"
// image
// : 
// "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/j23ok15p0ge6cfwqpg8m"
// name
// : 
// "Margherita"
// sizes
// : 
// {small: 299, medium: 449, large: 599}
// toppings
// : 
// (3) ['Tomato Sauce', 'Mozzarella Cheese', 'Fresh Basil']
// vegetarian
// : 
// true
// __v
// : 
// 0
// _id
// : 
// "6461da10a6f4e3caeccf46ab"