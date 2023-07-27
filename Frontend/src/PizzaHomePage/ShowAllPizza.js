import React from "react";
import { useGetAllPizzaQuery } from "../services/slices/pizzaSlice";
import LoadingSpinner from "../LoadingSpinner";
import PizzaCard from "./PizzaCard";
import SearchBar from "../SearchAndSort/SearchBar";
import { useSelector } from "react-redux";
import { transformDataArray } from "../utilities/sortingAlgos";
import CarouselPizza from "./CarouselPizza";
import "./ShowAllPizza.css";

export default function ShowAllPizza() {
  const { data, error, isLoading, isSuccess } = useGetAllPizzaQuery();
//   console.log(data);
  const filterVeg = useSelector((state) => state.sortFilter.filterVeg);
  const sortByPrice = useSelector((state) => state.sortFilter.sortByPrice);
  const searchTerm = useSelector((state) => state.sortFilter.searchByPrompt);
  const toppingsArray=useSelector((state) => state.sortFilter.searchByToppings);
  let transformedDataArray;
  if (isSuccess) {
    // const processedDataArr=utilityFuntion(data,filterVeg,sortByPrice);
    // console.log(data.dataObj);
    transformedDataArray = transformDataArray(
      data,
      filterVeg,
      sortByPrice,
      searchTerm,
      toppingsArray
    );
  }
  function renderPizzaData() {
    return transformedDataArray.map((item) => (
      <PizzaCard key={item} item={data.dataObj[item]} />
    ));
  }
  return (
    <div className="row container mx-auto mt-3">
      {isLoading || data === undefined ? (
        <LoadingSpinner />
      ) : (
        <div className="container">
          <CarouselPizza />
          <SearchBar />
          <div className="grid-container">
          {renderPizzaData()}
          </div>
        </div>
      )}
      {error ? (
        <h1 className="text-center">
          
          Seems like some error , kindly reload {console.log(error.error)}
        </h1>
      ) : (
        <></>
      )}
    </div>
    //can make the error make generic inline style should be in the classes remove the console statements use use Strict to avooid the elint errors
  );
}
