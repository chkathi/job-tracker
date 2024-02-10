import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";

export const AddJob = () => {
  const initialValue = {
    jobTitle: "",
    companyName: "",
    url: "",
  };

  const onSubmit = (data) => {
    console.log(data);
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
