import Day from "../models/Day";

export const home = async (req, res) => {
  let days = null;
  if(req.user){
    days = await Day.find({ creator: req.user.id }).populate("workOuts")
  }
  res.render("home", {days});
};

export const search = (req, res) => {
  res.render("search");
};
