import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthContext } from "../Helper/AuthContext";
import SearchIcon from "@mui/icons-material/Search";

export const Home = () => {
  const [jobsList, setList] = useState([]);
  const [companySearch, setCompanySearch] = useState("");
  const initialValue = {
    companyName: "",
  };

  const { authState } = useContext(AuthContext);

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

  const deleteJob = (id) => {
    axios
      .delete(`http://localhost:3001/jobs/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        // Deletes the job
        setList(
          jobsList.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  return (
    <div className="home">
      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="searchCompanyFrom">
          {/* <label>Company Name:</label> */}
          {/* <ErrorMessage name="companyName" component="span" /> */}
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="companyName"
            placeholder="ex. Google"
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </Form>
      </Formik>
      <button onClick={() => setCompanySearch("")}> Show All</button>
      <div className="jobs">
        <div className="job-post">
          <h2 className="job-title">Job Title</h2>
          <h2 className="company">Company Name</h2>
          <h2 className="url">Link to job</h2>
        </div>

        {authState.status &&
          jobsList.map((job, key) => {
            // display all jobs associate with current user
            // Q1 How do we know what userId currently is
            // get token -> we have to get username -> get username's id
            // -> compareId
            if (authState.id === job.UserId) {
              return (
                <div className="job-post" key={job.id}>
                  <div
                    className="job-title"
                    style={{
                      backgroundColor: job.applied ? "green" : "dodgeblue",
                    }}
                  >
                    {job.jobTitle}
                  </div>
                  <div className="company">{job.companyName}</div>
                  <div className="url">{job.url} </div>
                  <button
                    onClick={() => {
                      deleteJob(job.id);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            }
            return <></>;
          })}
      </div>
    </div>
  );
};
