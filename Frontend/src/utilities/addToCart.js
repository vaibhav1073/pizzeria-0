export const checkData=(entry,cartData)=>{
    console.log(cartData)
    let text="New Item Added!"
    let items=cartData.items;
    for(let i=0;i<items.length;i++){
        console.log(items)
        if(items[0]===entry[0] && items[1]===entry[1] ) {entry[2]++ 
            text="Cart Item Updated!";
            console.log(entry,"entry array")
            return {entry,text}
        
    }

    }
    console.log(entry)
    return {entry,text}

}