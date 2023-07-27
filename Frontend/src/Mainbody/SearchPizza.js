import React, { useState } from "react";
import { useEffect } from "react";

export default function SearchPizza(props) {
  //console.log("This is the pizza array",props.pizza)
  const [pizza, setPizza] = useState([]);
  const [price, setPrice] = useState([]);
  const [type, setType] = useState("All");

  useEffect(() => {
    const searchPizzaFromData = () => {
      const originalData = props.pizza;
      console.log(props.selected)
      let selected = originalData.filter(
        (item) => (item.name.toLowerCase()==props.selected.toLowerCase())
      );
      setPizza(selected);
      let priceArr=[selected[0].sizes.small];
      setPrice(priceArr);
      console.log("from search Pizza",priceArr)
      
    };
    searchPizzaFromData();
  }, []);

  //props.pizza,props.selected
  return (
    <div className="border border-warning row">
          {pizza &&
            pizza.map((item, index) => {
              if (type || item.vegetarian) {
                return (
                  <div
                    className="col col-md-3 col-sm-10 m-5"
                    style={{
                      maxWidth: "300px",
                      height: "400px",
                    }}
                    key={item.id}
                  >
                    <div className="card" style={{ width: "20rem" }}>
                      <img
                        src={item.image}
                        alt=""
                        style={{
                          minWidth: "318px",
                          minHeight: "250px",
                        }}
                      />
                      <div className="card-body shadow">
                        <div className="justify-content-around d-flex">
                          <h5 className="card-title">{item.name}</h5>
                          <div
                            className="border text-center "
                            style={{ width: "40px", height: "35px" }}
                          >
                            {item.vegetarian ? (
                              <p className="text-success">&#11044;</p>
                            ) : (
                              <p className="text-danger">&#11044;</p>
                            )}
                          </div>
                        </div>
                        <div className="container d-flex justify-content-around mt-4">
                          <div className="btn-group">
                            <button className="btn btn-outline-secondary">
                              -
                            </button>

                            <button className="btn btn-outline-secondary">
                              &#x2B;
                            </button>
                          </div>
                          <select
                            onChange={(e) => {
                              let pricesArr = price;
                              let index = e.target.value.split(" ");
                              let pizObj = pizza[Number(index[0])].sizes;
                              //console.log(pizObj[])
                              pricesArr[Number(index[0])] = pizObj[index[1]];

                              setPizza((prevPizza) => {
                                const newPizza = [...prevPizza];
                                newPizza[Number(index[0])].selectedSize =
                                  pizObj[index[1]];
                                return newPizza;
                              });
                              console.log("this is setPrice" + pricesArr);
                              console.log(pricesArr[Number(index[0])]);
                            }}
                            className="form-select"
                            id=""
                          >
                            <option value={`${index} small`}>Small</option>
                            <option value={`${index} medium`}>Medium</option>
                            <option value={`${index} large`}>Large</option>
                          </select>
                        </div>
                        <h4 className="text-center pt-3">
                          {pizza[index].selectedSize || price[0]}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
  );
}
