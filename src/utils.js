//Utility function to return the date, time or time format

export const getFormat = (UTCSeconds, onlyTime) => {
  let time = new Date(0);
  time.setUTCMilliseconds(UTCSeconds * 1000);
  let Rdate = `${[time.getMonth() + 1, time.getDate(), time.getFullYear()].join(
    "/"
  )}`;
  let Rtime = `${[
    time.getUTCHours().toString().padStart(2, 0),
    time.getUTCMinutes().toString().padStart(2, 0),
    time.getSeconds().toString().padStart(2, 0),
  ].join(":")}`;

  return onlyTime ? Rtime : Rdate + ", " + Rtime;
};

//Utility function to get the last backup time

export const lastBackupTime = (params) => {
  let result = params.map((elem) => elem.startTime);
  result.sort((a, b) => b - a);
  return result.length !== 0 ? getFormat(result[0], false) : "NA";
};

//Utility function to get the last backup job

export const lastBackupJob = (params) => {
  if (params.length === 0) {
    return "NA";
  }

  params.sort((a, b) => b.startTime - a.startTime);
  return params[0].id;
};

//Utility function to get the average time.
export const averageTime = (params) => {
  if (params.length === 0) {
    return "NA";
  }

  var avgTime = params.map((elem) => elem.endTime - elem.startTime);

  var averageSeconds = avgTime.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });

  averageSeconds = averageSeconds / params.length;
  console.log(averageSeconds);
  return getFormat(averageSeconds, true);
};

//Utility function to set the color of the job status

export const setStatus = (status) => {
  if (status === "success") return "green";
  else if (status === "failed") return "red";
  else return "orange";
};
