import React, { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [jobsList, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/jobs").then((response) => {
      setList(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="jobs">
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
  );
};
