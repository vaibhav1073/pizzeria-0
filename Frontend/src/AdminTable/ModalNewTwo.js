import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
export default function ModalNew({
  storeLocation,
  storeAddress,
  storeManager,
  managerNumber,
  updateRequest,
  id
}) {
//   console.log("from modal new", name);
  const defaultValue = {
    storeLocation: storeLocation,
    storeAddress: storeAddress,
    storeManager: storeManager,
    managerNumber: managerNumber,
  };

  const validationSchema = yup.object().shape({
    storeLocation: yup.string().required("Please enter Location"),
    storeAddress: yup.string().required("Please enter Address"),
    storeManager: yup.string().required("Please enter"),
    managerNumber: yup
      .string()
      .min(10, "enter valid mobile")
      .required("enter number"),
  });
  console.log(updateRequest,id)

  const handleSubmit = (values, { resetForm }) => {
    console.log("values", values);
    const authData = {
      storeLocation:values.storeLocation,
      storeAddress:values.storeAddress,
      storeManager:values.storeManager,
      managerNumber:values.managerNumber

    };
    
    if (!updateRequest) {
      axios
        .post("http://localhost:8000/store/", {
          ...authData,
        })
        .then((res) => {
            console.log(authData,updateRequest,"47")
            window.location.reload()})
        .catch((e) => console.log(e));
    } else {
      axios
        .patch(`http://localhost:8000/store/${id}`, {
          ...authData,
        })
        .then((res) => window.location.reload())
        .catch((e) => console.log(e));
    }

    //resetForm({ values: "" });
  };
  return (
    <div
      className="text-center rounded row my-auto mx-auto"
      style={{
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: 1,
        top: "20%",
        height: "70%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <Formik
          initialValues={defaultValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form action="" className="form-control-sm row">
            <div className="mb-3 row mx-auto">
              <div className="col-md-6 col mx-auto">
                <Field
                  name="storeLocation"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Store Location"
                />
                <p className="text-danger text-left">
                  <ErrorMessage name="storeLocation" />
                </p>
              </div>
            </div>
            <div className="mb-3 row mx-auto">
              <div className="col-md-6 col mx-auto">
                <Field
                  name="storeAddress"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Store Address"
                />
                <p className="text-danger text-left">
                  <ErrorMessage name="storeAddress" />
                </p>
              </div>
            </div>
            <div className="mb-3 row mx-auto">
              <div className="col-md-6 col mx-auto">
                <Field
                  name="storeManager"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Manger Name"
                />
                <p className="text-danger text-left">
                  <ErrorMessage name="storeManager" />
                </p>
              </div>
            </div>
            <div className="mb-3 row mx-auto">
              <div className="col-md-6 col mx-auto">
                <Field
                  name="managerNumber"
                  type="text"
                  className="form-control mb-3"
                  placeholder="managerNumber"
                />
                <p className="text-danger text-left">
                  <ErrorMessage name="managerNumber" />
                </p>
              </div>
            </div>
            
            
            

            <div className="container row d-flex">
              <button
                className="btn btn-warning col-md-6 mx-auto"
                type="submit"
              >
                submit
              </button>
            </div>
            {/* <div className="row text-center"></div> */}
          </Form>
        </Formik>
      </div>
    </div>
  );
}
