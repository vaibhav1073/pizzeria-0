const initialCart = [{id:2,name:"buffalo pizza",price:42}];
const reducer = (state, action) => {
  
  switch (action.value) {
    case 'ADD': {
        console.log(action.value)
      return [...state,action.value];
    }
    default: {
      return state;
    }
  }
};
export { initialCart };
export default reducer;
