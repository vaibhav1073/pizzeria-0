import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsFillPencilFill,
  BsTrash3Fill,
} from "react-icons/bs";
import ModalNewTwo from "./ModalNewTwo";

export default function AdminTableTwo() {
  const [pizza, setPizza] = useState([]);
  const [pizzaDetails, setPizzaDetails] = useState({
    storeLocation: "",

    storeAddress: "",
    storeManager: "",
    managerNumber: "",
    updateRequest: false,
    id: null,
  });
  const [addConfirm, setAddConfirm] = useState(false);
  const handleDelete = (id) => {
    
    
    axios.delete(`http://localhost:8000/store/${id}`);
    window.location.reload();
  };
  const toggleAddConfirm = () => {
    if (addConfirm) setAddConfirm(false);
  };
  useEffect(() => {
    const getPizzaData = () => {
      axios
        .get("http://localhost:8000/store")
        .then((res) => {
          console.log(res.data);
          const pizData = res.data;

          
          setPizza(pizData);
        })
        .catch((err) => console.log(err));
    };
    getPizzaData();
  }, []);
  const handleEdit = (dat) => {
    setPizzaDetails({
        storeLocation: dat.storeLocation,

        storeAddress:dat.storeAddress,
        storeManager: dat.storeManager,
        managerNumber: dat.managerNumber,
        updateRequest: true,
        id:dat._id ,
    });
    console.log(dat);
    setAddConfirm(!addConfirm);
  };
  return (
    <div>
      <table className="table mt-4" onClick={() => toggleAddConfirm()}>
        <thead className="thead-warning">
          <tr>
            <th scope="col">Store Location</th>
            <th scope="col">Address</th>
            <th scope="col" className="th-sm">
              Store Manager
            </th>
            <th scope="col" className="th-sm">
              Contact
            </th>
            <th scope="col">Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {pizza.map((item) => (
            <tr key={item._id}>
              
              <td>{item.storeLocation}</td>
              <td>{item.storeAddress}</td>
              <td>{item.storeManager}</td>
              <td>{item.managerNumber}</td>
              

              
              <td>
                <button className="btn" onClick={() => {
                    console.log(item._id);
                    handleDelete(item._id)
                }}>
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
        <ModalNewTwo
        storeLocation={pizzaDetails.storeLocation}

        storeAddress={pizzaDetails.storeAddress}ß
        storeManager={pizzaDetails.storeManager}
        managerNumber={pizzaDetails.managerNumber}
        updateRequest={pizzaDetails.updateRequest}
        id={pizzaDetails.id}
          
        />
        
        
      )}
      
    </div>
  );
}
