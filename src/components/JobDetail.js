import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { getFormat, setStatus } from "../utils";
import CircularProgress from "@material-ui/core/CircularProgress";

function JobDetail(props) {
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  let client_id = props.match.params.client_id;
  let job_id = props.match.params.job_id;

  let clientFound = props.rows.find((element) => element.id == client_id);

  //Get the pointer to the required Object
  let jobFound = clientFound
    ? clientFound.jobs.find((item) => item.id == job_id)
    : "";

  return (
    <React.Fragment>
      {props.loading ? (
        <CircularProgress style={{ margin: "300px" }}></CircularProgress>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ margin: "auto" }}
        >
          <Grid item>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Name :</strong>
                  </td>
                  <td>{clientFound.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Job started at :</strong>
                  </td>
                  <td>{getFormat(jobFound.startTime)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Time taken :</strong>
                  </td>
                  <td>
                    {jobFound.status === "running"
                      ? getFormat(
                          jobFound.endTime - jobFound.startTime + counter,
                          true
                        )
                      : getFormat(jobFound.endTime - jobFound.startTime, true)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Job Status :</strong>
                  </td>
                  <td style={{ color: setStatus(jobFound.status) }}>
                    {jobFound.status}
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default withRouter(JobDetail);
