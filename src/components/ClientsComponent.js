import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { lastBackupTime, averageTime, lastBackupJob } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-cellRight": { textAlign: "left" },
  },
}));

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 120,
    renderCell: (params) => {
      return (
        <Link
          to={{ pathname: `/client_details/${params.data.id}` }}
          style={{ textDecoration: "none" }}
        >
          {params.value}
        </Link>
      );
    },
  },
  {
    field: "osType",
    type: "number",
    headerName: "Operating System",
    width: 150,
    valueFormatter: (params) => {
      if (params.value === 0) return "Windows 32-bit";
      else if (params.value === 1) return "Windows 64-bit";
      else if (params.value === 2) return "Mac OS";
      else {
        return "Linux";
      }
    },
  },
  {
    field: "job",
    headerName: "isProtected",
    width: 140,
    renderCell: (params) => {
      let result = params.data.jobs.map((elem) => elem.status);
      return result.includes("success") ? (
        <CheckRoundedIcon
          fontSize="small"
          style={{ color: "green" }}
        ></CheckRoundedIcon>
      ) : (
        <ClearRoundedIcon
          fontSize="small"
          style={{ color: "red" }}
        ></ClearRoundedIcon>
      );
    },
  },
  {
    field: "job1",
    headerName: "Last backup time",
    type: "dateTime",
    width: 200,
    valueFormatter: (params) => lastBackupTime(params.data.jobs),
  },
  {
    field: "jobs",
    headerName: "Last backup job",
    width: 150,
    renderCell: (params) => {
      if (params.value.length === 0) return "NA";
      else {
        let latestJob = lastBackupJob(params.value);
        return (
          <Link
            to={{ pathname: `/job_details/${params.data.id}/${latestJob}` }}
            style={{ textDecoration: "none", margin: "auto" }}
          >
            {latestJob}
          </Link>
        );
      }
    },
  },
  {
    field: "job2",
    headerName: "Avg. time taken",
    type: "time",
    width: 150,
    valueFormatter: (params) => averageTime(params.data.jobs),
  },
];

export const Clients = (props) => {
  const classes = useStyles();

  return (
    <div style={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={10}
        rowHeight={40}
        className={classes.root}
        scrollbarSize={16}
        loading={props.loading}
      ></DataGrid>
    </div>
  );
};
