import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import "../App.css";

export const AddJob = () => {
  const initialValue = {
    jobTitle: "",
    companyName: "",
    url: "",
  };

  // Redirecting the page after we submit the entry
  let navigate = useNavigate();

  // Making Post requests
  const onSubmit = (data) => {
    const dataAdded = { ...data, applied: false };
    axios.post("http://localhost:3001/jobs", dataAdded).then((response) => {
      navigate("/"); // redirects to home
    });
  };

  const validationSchema = Yup.object().shape({
    jobTitle: Yup.string().required(),
    companyName: Yup.string().required(),
    url: Yup.string().required(),
  });

  return (
    <div className="addJobPage">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Job Title:</label>
          <ErrorMessage name="jobTitle" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="jobTitle"
            placeholder="ex. Software Enginner"
          />

          <label>Company Name:</label>
          <ErrorMessage name="companyName" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="companyName"
            placeholder="ex. Google"
          />

          <label>Url to job:</label>
          <ErrorMessage name="url" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="url"
            placeholder="ex. http://.."
          />
          <button type="submit"> Submit Form</button>
        </Form>
      </Formik>
    </div>
  );
};
