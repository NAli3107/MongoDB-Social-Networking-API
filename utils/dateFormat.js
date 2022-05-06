const dayjs = require("dayjs");

const timeStamp = (date) => {
  const dates = dayjs().format("DD, MMM, YYYY");
  return dates;
};

module.exports = timeStamp;