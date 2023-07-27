import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { NavLink,useNavigate } from "react-router-dom";

export default function Login() {
  const defaultValue = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const navigate=useNavigate()
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Please enter first Name"),
    lastName: yup.string().required("Please enter Last Name"),
    email: yup
      .string()
      .required("email required")
      .email("please enter valid Email"),
    password: yup
      .string()
      .required("password required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    phone: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(6666666666, "this doesn't looks like a valid number")
      .max(10000000000, "not a valid phone number")
      .required("A phone number is required"),
    confirmPassword: yup
      .string()
      .required("confirm password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = (values, { resetForm }) => {
    
    const authData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password:values.password,
      phone:values.phone,
      isAdmin:false
    };
    
    axios
      .post("http://localhost:5050/", {
        ...authData
      })
      .then((res) => {
        resetForm({ values: "" });
        navigate('/signin')
      })
      .catch((e) => {console.log(e)
      alert("Email id already in use!")});
    
  };
  return (
    <div className="container shadow border  mt-5"
    >
      <h1 className="text-center">Register</h1>
      <div className="container">
        <Formik
          initialValues={defaultValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form action="" className="form-control-sm row">
            <div className="mb-3 row">
              <div className="col-md-6">
                <Field
                  name="firstName"
                  type="text"
                  className="form-control mb-3"
                  placeholder="First Name"
                />
                <p className="text-danger text-left">
                  <ErrorMessage name="firstName" />
                </p>
              </div>
              <div className="col-md-6">
                <Field
                  name="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
                <p className="text-danger">
                  <ErrorMessage
                    className="text-danger"
                    name="lastName"
                  ></ErrorMessage>
                </p>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <Field
                  name="email"
                  type="Email"
                  className="form-control mb-3"
                  placeholder="Email Address"
                />

                <p className="text-danger">
                  <ErrorMessage
                    className="text-danger"
                    name="email"
                  ></ErrorMessage>
                </p>
              </div>
              <div className="col-md-6">
                <Field
                  name="phone"
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                />
                <p className="text-danger">
                  <ErrorMessage name="phone"></ErrorMessage>
                </p>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
                <p className="text-danger">
                  <ErrorMessage
                    className="text-danger"
                    name="password"
                  ></ErrorMessage>
                </p>
              </div>
              <div className="col-md-6">
                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="confirm password"
                />
                <p className="text-danger">
                  <ErrorMessage
                    className="text-danger"
                    name="confirmPassword"
                  ></ErrorMessage>
                </p>
              </div>
            </div>
            <div className="row container">
              
            </div>
            <div className="container row d-flex">
              <button className="btn btn-warning col-md-6 mx-auto" type="submit">
                submit
              </button>
            </div>
            <div className="row text-center">
            <NavLink className="col col-md-4 mx-auto mt-3 text-warning" to="/signin">
                <b>Already a user? Sign in</b>
              </NavLink>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
