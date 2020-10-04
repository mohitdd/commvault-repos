import React from "react";
import Grid from "@material-ui/core/Grid";
import { lastBackupTime, getFormat, setStatus } from "../utils";
import { DataGrid } from "@material-ui/data-grid";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

let match;

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <Link
        to={{
          pathname: `/job_details/${match}/${params.value}`,
        }}
        style={{ textDecoration: "none" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "startTime",
    headerName: "Job started at",
    width: 200,
    valueFormatter: (params) => {
      return getFormat(params.value, true);
    },
  },
  {
    field: "endTime",
    headerName: "Time taken",
    width: 200,
    valueFormatter: (params) => {
      return getFormat(params.value - params.data.startTime, true);
    },
  },
  {
    field: "status",
    headerName: "Job status",
    width: 200,
    renderCell: (params) => (
      <span style={{ color: setStatus(params.value) }}>{params.value}</span>
    ),
  },
];

function ClientDetail(props) {
  let id = props.match.params.id;
  match = props.match.params.id;

  //Get the pointer to the required Object
  let elemFound = props.rows.find((element) => element.id == id);

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
            <table
              style={{
                wordWrap: "break-word",
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <thead></thead>
              <tbody>
                <tr>
                  <td style={{ width: "200px" }}>
                    <strong>Name : </strong>
                  </td>
                  <td>{elemFound.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Description :</strong>
                  </td>
                  <td>{elemFound.description}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Last Backup Time : </strong>
                  </td>
                  <td>{lastBackupTime(elemFound.jobs)}</td>
                </tr>
              </tbody>
            </table>
          </Grid>

          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={elemFound.jobs}
              columns={columns}
              pageSize={10}
              rowHeight={40}
            ></DataGrid>
          </div>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default withRouter(ClientDetail);
