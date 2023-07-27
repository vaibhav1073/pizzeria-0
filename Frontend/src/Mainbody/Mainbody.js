import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SearchPizza from "./SearchPizza";
import { NavLink } from "react-router-dom";
//import { CartContext } from "../CartContext/CartContext";

export default function Mainbody() {
  const [pizza, setPizza] = useState([]);
  const [price, setPrice] = useState([]);
  const [type, setType] = useState("All");
  const [searchPizza, setSearchPizza] = useState("");
  const [filterPizza, setFilterPizza] = useState("");
  const findPrice=(sizes,price)=>{
    for(const key in sizes){
      if(price==sizes[key])return (key);
    }
  }

  useEffect(() => {
    const getPizzaData = () => {
      axios
        .get("http://localhost:8000/pizza")
        .then((res) => {
          console.log(res.data);
          const pizData = res.data;
          // console.log(pizData);
          // console.log(pizza);

          for (let i = 0; i < pizData.length; i++) {
            pizData[i].quantity = 0;
          }
          let priceArray = pizData.map((piz) => piz.sizes.small);
          setPizza(pizData);
          setPrice(priceArray);
        })
        .catch((err) => console.log(err));
    };
    getPizzaData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="container row">
        <div className="text-center col-md-2 mb-3">
          <h6>Sort Pizza by:</h6>
        </div>

        <div className="col">
          <select
            name=""
            id=""
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="1">All</option>
            <option value="">Veg</option>
          </select>
        </div>
      </div>
      <div className="container mx-auto row">
        <input
          type="text"
          name=""
          placeholder="Search Pizza"
          value={searchPizza}
          style={{ borderRadius: "10px 0px 0px 10px" }}
          onChange={(e) => {
            setSearchPizza(e.target.value);
          }}
          className="col col-md-8 col-sm-8  mb-3 mt-2 border-warning"
        />
        <button
          style={{ borderRadius: "0px 10px 10px 0px" }}
          className="btn btn-warning col col-md-1 mb-3 mt-2"
          onClick={() => {
            console.log("Hello");
            setFilterPizza(searchPizza);
          }}
        >
          search
        </button>
      </div>
      {filterPizza === "" || searchPizza === "" ? (
        <div
          className="border border-warning row"
          style={{
            backgroundImage: `url("https://freesvg.org/img/FoodAndDrinkDesign.png")`,
            backgroundColor: "rgba(255,193,7,0.1)",
          }}
        >
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
                    <div className="card" style={{ width: "20rem",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
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
                        <div className="container d-flex justify-content-around mt-4 row">
                          <select
                            onChange={(e) => {
                              let pricesArr = price;
                              let index = e.target.value.split(" ");
                              
                              let pizObj = pizza[Number(index[0])].sizes;
                              
                              pricesArr[Number(index[0])] = pizObj[index[1]];

                              setPizza((prevPizza) => {
                                const newPizza = [...prevPizza];
                                newPizza[Number(index[0])].selectedSize =
                                  pizObj[index[1]];
                                  return newPizza;
                              });
                              // console.log("this is setPrice" + pricesArr);
                              // console.log("this is the first index",pricesArr[(index[1])]);
                            }}
                            className="form-select"
                            id=""
                          >
                            <option value={`${index} small`}>Small</option>
                            <option value={`${index} medium`}>Medium</option>
                            <option value={`${index} large`}>Large</option>
                          </select>
                        </div>
                        <div className="container row mx-auto pt-2">
                          <h4 className="text-center pt-3 col col-md-4">
                            {pizza[index].selectedSize || price[index]}
                          </h4>
                          <div className="col col-md-6 mt-2 ml-3">
                            <NavLink
                              className="btn btn-warning"
                              to={`/buy/${item.name}/${findPrice(item.sizes,pizza[index].selectedSize || price[index])}/${pizza[index].selectedSize || price[index]}`}
                             
                            >
                              Buy Now
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      ) : (
        <SearchPizza selected={filterPizza} pizza={pizza} />
      )}
    </div>
  );
}
