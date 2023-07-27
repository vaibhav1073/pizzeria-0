import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { NavLink ,useNavigate} from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { useDispatch, } from "react-redux";
import { setShowAction,setShowAlertText } from "../services/slices/cartSlice";
import { login } from "../services/slices/userSlice";


export default function Signin() {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  function dispatcher(text){
        dispatch(setShowAction(true));
        dispatch(setShowAlertText(text))
        setTimeout(() => {
          dispatch(setShowAction(false))
        }, 2000);
        
  }
  const defaultValue = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("please enter a valid email"),
    password: yup.string().required("enter password"),
  });
  const handleSubmit = (values, { resetForm }) => {
    
    axios
      .post("http://localhost:5050/check", {
        ...values,
      })
      .then((res) => {
        console.log(res)
        let name=res.data.userResponse.firstName
       dispatch(login(res.data.userResponse))
        dispatcher(`Welcome ${name}`)
        resetForm({ values: "" });
        localStorage.setItem("token",res.data.token);
        navigate('/')
      })
      .catch((e) => {  
        resetForm({ values: "" });
        dispatcher(e.response.data.msg)
      });
    
  };
  return (
    <div className="container mt-4 text-center col col-md-8 shadow">
      <h1 className="mt-3 mb-3">Sign in</h1>
      <div
       
      >
        <Formik
          initialValues={defaultValue}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form-control border-0 ">
            <div className="row  mb-2 ">
              <div className="col-md-8 col mx-auto">
                <Field
                  type="text"
                  placeholder="email address"
                  className="form-control-sm col-md-6"
                  name="email"
                />
                <p className="text-danger">
                  <ErrorMessage name="email"></ErrorMessage>
                </p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col col-md-8 mx-auto">
                <Field
                  type="password"
                  placeholder="enter password"
                  className="form-control-sm col-md-6"
                  name="password"
                />
                <p className="text-danger">
                  <ErrorMessage name="password"></ErrorMessage>
                </p>
              </div>
            </div>
            <div className=" row text-center">
              <button className="btn btn-warning col col-md-4 mx-auto" type="submit">
                submit
              </button>
            </div>
            <div className="row text-center">
            <NavLink className="col col-md-4 mx-auto mt-3 text-warning" to="/login">
                <b>New User? Register Here</b>
              </NavLink>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
