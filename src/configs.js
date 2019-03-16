const statusOptions = {
  planned: "Planned 🗓",
  done: "Done ✅",
  cancelled: "Cancelled ❌"
};

const seasonOptions = {
  february: {
    title: "February",
    startDate: new Date("2019-01-29"),
    endDate: new Date("2019-02-25")
  },
  march: {
    title: "March",
    startDate: new Date("2019-02-26"),
    endDate: new Date("2019-04-01")
  },
  aprilJune: {
    title: "April to June",
    startDate: new Date("2019-04-02"),
    endDate: new Date("2019-06-17")
  }
};

export { statusOptions, seasonOptions };
