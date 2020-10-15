import routes from "../routes";
import User from "../models/User";
import Day from "../models/Day";
import WorkOut from "../models/WorkOut";

export const getDayWorkOut = async (req, res) => {
  const days = await Day.find({ creator: req.user.id}).populate("workOuts");
  res.render("dayWorkOut", { pageTitle: "요일별 운동", days });
}

// Add Controller
export const getAdd = async (req, res) => {
  const days = await Day.find({ creator: req.user.id}).populate("workOuts");
  res.render("addWorkOut", { pageTitle: "운동 추가하기", days });
};

export const postAddWorkOut = async (req, res) => {
  const {
    body: { name, weight, repsOrHold, count, set, breakTime, day }
  } = req;
  try {
    const user = await User.findById(req.user.id)
    let workOutDay = await Day.findOne({ day });
    if(!workOutDay){
      workOutDay = await Day.create({ day, creator: req.user.id })
    }
    const newWorkOut = await WorkOut.create({
      order: workOutDay.workOuts.length + 1 ,name, weight, repsOrHold, count, set, breakTime, creator: req.user.id
    });
    if(!await User.findOne({_id: req.user.id, days: workOutDay.id})){
      user.days.push(workOutDay.id);
    }
    workOutDay.workOuts.push(newWorkOut.id);
    user.workOuts.push(newWorkOut.id);
    workOutDay.save();
    user.save();
  } catch(error){
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

// Edit Controller
export const getEditDay = async (req, res) => {
  const {
    params: { id }
  } = req;
  const days = await Day.findById(id).populate("workOuts");
  res.render("editWorkOut", { pageTitle: "운동 수정하기", days });
};

export const postEditDay = (req, res) => {

}

export const postEditWorkOut = (req, res) => {

}

// Delete Controller
export const deleteWorkOut = (req, res) => {
  //운동 삭제
};
