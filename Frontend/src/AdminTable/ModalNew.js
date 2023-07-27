import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
export default function ModalNew({name,image,smallSizePrize,mediumSizePrize,largeSizePrize,vegetarian,updateRequest,id}) {
  console.log("from modal new",name);
    const defaultValue = {
    name: name,
    image: image,
    smallSizePrize: smallSizePrize,
    mediumSizePrize: mediumSizePrize,
    largeSizePrize: largeSizePrize,
    vegetarian:vegetarian
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter pizza name"),
    image: yup.string().required("Please enter url"),
    smallSizePrize: yup
      .number()
      .typeError("That doesn't look like a price")
      .positive("Price can't be negative")
      .integer("Enter valid price")
      .min(299, "Value should be atleast 299")
      .required("enter price"),
    mediumSizePrize: yup
      .number()
      .typeError("That doesn't look like price")
      .positive("Prize can't be negative")
      .integer("Enter valid number")
      .min(399, "Value should be atleast 399")
      .required("enter price"),
    largeSizePrize: yup
      .number()
      .typeError("That doesn't look like price")
      .positive("Price can't be negative")
      .integer("Enter valid number")
      .min(499, "Value should be atleast 499")
      .required("enter price"),
      vegetarian:yup.string().required("change kar bhai")
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("values", values);
    const authData = {
        id: (updateRequest ? (id) : String(Math.random()*10000).slice(0,3) ),
      name: values.name,
      vegetarian:(values.vegetarian)==="true"?true:false,
      image: values.image,
      sizes:{
        small:Number(values.smallSizePrize),
        medium:Number(values.mediumSizePrize),
        large:Number(values.largeSizePrize)
      }


    };
    console.log(authData);
    if(!updateRequest){axios
      .post("http://localhost:8000/pizza", {
        ...authData,
      })
      .then((res) => window.location.reload())
      .catch((e) => console.log(e));}
      else{
        axios.patch(`http://localhost:8000/pizza/${id}`,{
            ...authData,
        }
        ).then((res)=>window.location.reload())
        .catch((e) => console.log(e))
        
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
                  name="name"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Pizza Name"
                />
                <p className="text-danger text-left">
                  <ErrorMessage name="name" />
                </p>
              </div>
            </div>
            <div className="mb-3 row mx-auto">
              <div className="col-md-6 col mx-auto">
                <Field
                  name="image"
                  type="text"
                  className="form-control"
                  placeholder="Imgae URL"
                />
                <p className="text-danger">
                  <ErrorMessage
                    className="text-danger"
                    name="image"
                  ></ErrorMessage>
                </p>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-2 mx-auto">
                <Field
                  name="smallSizePrize"
                  type="Text"
                  className="form-control mb-3"
                  placeholder="Enter Small Pizza Price"
                />

                <p className="text-danger">
                  <ErrorMessage
                    className="text-danger"
                    name="smallSizePrize"
                  ></ErrorMessage>
                </p>
              </div>
              <div className="col-md-2 mx-auto">
                <Field
                  name="mediumSizePrize"
                  type="text"
                  className="form-control"
                  placeholder="Medium Price"
                />
                <p className="text-danger">
                  <ErrorMessage
                    className="text-danger"
                    name="mediumSizePrize"
                  ></ErrorMessage>
                </p>
              </div>
              <div className="col-md-2">
                <Field
                  name="largeSizePrize"
                  type="text"
                  className="form-control"
                  placeholder="Large Pizza Price"
                />
                <p className="text-danger">
                  <ErrorMessage name="largeSizePrize"></ErrorMessage>
                </p>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6 col mx-auto">
                <Field
                  as="select"
                  type="select"
                  name="vegetarian"
                  className="form-select"
                  required
                  >
                    
                <option value={true}>Vegetarian Pizza</option>
                <option value={false}>Non Vegetarian Pizza</option>
                
                </Field>
                <p className="text-danger">
                  <ErrorMessage
                    className="text-danger"
                    name="vegetarian"
                  />
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
