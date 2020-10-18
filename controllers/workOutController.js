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
    const user = await User.findById(req.user.id).populate("days");
    const userFindDay = user.days.find(d => d.day === day);
    let workOutDay
    if(!userFindDay){
      workOutDay = await Day.create({ day, creator: user.id });
      user.days.push(workOutDay.id);
    } else {
      workOutDay = await Day.findById(userFindDay.id)
    }
    const newWorkOut = await WorkOut.create({
      name, weight, repsOrHold, count, set, breakTime, creator: user.id, day: workOutDay.id
    });
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
    params: { id },
    user
  } = req;
  const days = await Day.findById(id).populate("workOuts");
  if(user.id === days.creator.toString()){
    res.render("editWorkOut", { pageTitle: "운동 수정하기", days });
  } else {
    res.redirect(`/work-out${routes.day}`)
  }
};

export const postEditDay = (req, res) => {

}

export const postEditWorkOut = async (req, res) => {
  const {
    body: { name, weight, repsOrHold, count, set, breakTime, day },
    params: { id },
    user
  } = req;
  try {
    const workOut = await WorkOut.findById(id);
    if(user.id === workOut.creator.toString()){
      await WorkOut.findByIdAndUpdate(id, {name, weight, repsOrHold, count, set, breakTime, day});
    } else {
      throw Error
    }
  } catch(error){
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }

}

// Delete Controller
export const postDeleteWorkOut = async (req, res) => {
  const {
    params: { id },
    user
  } = req;
  try{
    const workOut = await WorkOut.findById(id).populate("day");
    if(user.id === workOut.creator.toString()){
      const { day: { workOuts, id: dayId } } = workOut;
      const updateUser = user.workOuts.filter(w => w.toString() !== id);
      const updateDay = workOuts.filter(w => w.toString() !== id);
      await User.findByIdAndUpdate(user.id, {workOuts: updateUser});
      await Day.findByIdAndUpdate(dayId, {workOuts: updateDay});
      await WorkOut.findByIdAndRemove(id);
    } else {
      throw Error
    }
  }catch(error){
    console.log(error)
    res.status(400);
  }finally{
    res.end()
  }
};

// Change Order
export const postChangeOrder = async (req, res) => {
  const {
    body: { workOuts },
    params: { id },
    user
  } = req;
  try {
    const day = await Day.findById(id);
    if(user.id === day.creator.toString()){
      await Day.findByIdAndUpdate(id, { workOuts })
    } else {
      throw Error
    }
  } catch(error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
}