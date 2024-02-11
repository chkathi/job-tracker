import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const Home = () => {
  const [jobsList, setList] = useState([]);
  const [companySearch, setCompanySearch] = useState("");
  const initialValue = {
    companyName: "",
  };
  // Making Post requests
  const onSubmit = (data) => {
    console.log(data);
    setCompanySearch(data.companyName);
  };

  const validationSchema = Yup.object().shape({
    companyName: Yup.string().required(),
  });

  useEffect(() => {
    console.log(companySearch);
    if (companySearch === "") {
      axios.get("http://localhost:3001/jobs").then((response) => {
        setList(response.data);
      });
    } else {
      axios
        .get(`http://localhost:3001/jobs/byCompany/${companySearch}`)
        .then((response) => {
          setList(response.data);
        });
    }
  }, [companySearch]);

  return (
    <div>
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Company Name:</label>
          <ErrorMessage name="companyName" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="companyName"
            placeholder="ex. Google"
          />
          <button type="submit"> Search</button>
        </Form>
      </Formik>
      <button onClick={() => setCompanySearch("")}> Show All</button>
      <div className="jobs">
        <div className="job-post">
          <h2 className="job-title">Job Title</h2>
          <h2 className="company">Company Name</h2>
          <h2 className="url">Link to job</h2>
        </div>

        {jobsList.map((job, key) => {
          return (
            <div className="job-post" key={job.id}>
              <div
                className="job-title"
                style={{ backgroundColor: job.applied ? "green" : "dodgeblue" }}
              >
                {job.jobTitle}
              </div>
              <div className="company">{job.companyName}</div>
              <div className="url">{job.url}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
