import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsFillCircleFill,
  BsFillPencilFill,
  BsTrash3Fill,
} from "react-icons/bs";
import ModalNew from "./ModalNew";

export default function AdminTableOne() {
  const [pizza, setPizza] = useState([]);
  const [pizzaDetails, setPizzaDetails] = useState({
    name: "",
    image: "",
    smallSizePrize: "",
    mediumSizePrize: "",
    largeSizePrize: "",
    vegetarian: "true",
    updateRequest: false,
    id: null,
  });
  const [addConfirm, setAddConfirm] = useState(false);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/pizza/${id}`);
    window.location.reload();
  };
  const toggleAddConfirm = () => {
    if (addConfirm) setAddConfirm(false);
  };
  useEffect(() => {
    const getPizzaData = () => {
      axios
        .get("http://localhost:8000/pizza")
        .then((res) => {
          console.log(res.data);
          const pizData = res.data;
          console.log("this line is 37",pizData[0].sizes.small)
          pizData.map ( (val) => console.log(val))
           //pizData.map(item=>console.log("Line 38: ",item))
          // console.log(pizData);
          // console.log(pizza);

          // for (let i = 0; i < pizData.length; i++) {
          //   pizData[i].quantity = 0;
          // }
          // console.log(pizza)
          // let priceArray = pizData.map((item) => setPizza(item.sizes.small));
          setPizza(pizData);
        })
        .catch((err) => console.log(err));
    };
    getPizzaData();
  }, []);
  const handleEdit = (dat) => {
    setPizzaDetails({
      name: dat.name,
      image: dat.image,
      smallSizePrize: dat.sizes.small,
      mediumSizePrize: dat.sizes.medium,
      largeSizePrize: dat.sizes.large,
      vegetarian: dat.vegetarian,
      updateRequest: true,
      id: dat.id,
    });
    console.log(dat);
    setAddConfirm(!addConfirm);
  };
  return (
    <div >
      <table className="table mt-4"
      onClick={() => toggleAddConfirm()}>
        <thead className="thead-warning">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col" className="th-sm">
              Vegetarian
            </th>
            <th scope="col" className="th-sm">
              Small
            </th>
            <th scope="col">Medium</th>
            <th scope="col">Large</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pizza.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                {item.vegetarian ? (
                  <p className="text-success">
                    <BsFillCircleFill />
                  </p>
                ) : (
                  <p className="text-danger">
                    <BsFillCircleFill />
                  </p>
                )}
              </td>

              <td>{item.sizes.small}</td>
              <td>{item.sizes.medium}</td>
              <td>{item.sizes.large}</td>
              <td>
                <button className="btn" onClick={() => handleDelete(item.id)}>
                  <BsTrash3Fill className="mx-2" />
                </button>
                <button className="btn" onClick={() => handleEdit(item)}>
                  <BsFillPencilFill className="mx-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container  text-center">
        <button
          className="btn btn-warning"
          onClick={() => setAddConfirm(!addConfirm)}
        >
          Add new
        </button>
      </div>
      {addConfirm && (
        <ModalNew
          name={pizzaDetails.name}
          image={pizzaDetails.image}
          vegetarian={pizzaDetails.vegetarian}
          smallSizePrize={pizzaDetails.smallSizePrize}
          mediumSizePrize={pizzaDetails.mediumSizePrize}
          largeSizePrize={pizzaDetails.mediumSizePrize}
          updateRequest={pizzaDetails.updateRequest}
          id={pizzaDetails.id}
        />
      )}
    </div>
  );
}
