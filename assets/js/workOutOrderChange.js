import axios from "axios";

const container = document.querySelector(".editWorkOut-container");
const upBtns = document.querySelectorAll("#jsUpBtn");
const downBtns = document.querySelectorAll("#jsDownBtn");
const saveBtn = document.getElementById("jsSaveOrder");
const saveMsg = document.getElementById("jsSaveMsg");

let lists

const changeOrder = (target, direction) => {
    let currentNum, changeNum;
    let changeList = []; 
    for(let i = 0; i < lists.length; i++){
        if(target.id === lists[i].id){
            currentNum = i;
        }
    }
    if(direction === "up" && currentNum > 0){
        changeNum = currentNum - 1;
    } else if (direction === "down" && currentNum < lists.length - 1) {
        changeNum = currentNum + 1;
    } else {
        changeNum = currentNum;
    }
    for(let i = 0; i < lists.length; i++){
        if(i === changeNum){
            changeList.push(lists[currentNum])
        } else if(i === currentNum){
            changeList.push(lists[changeNum])
        } else {
            changeList.push(lists[i])
        }
    }
    lists.forEach(l => container.removeChild(l));
    changeList.forEach(l => container.appendChild(l));
    lists = changeList;
}

const orderBtnHandle = (e) => {
    const { 
        target: { parentNode: { parentNode: { parentNode: targetList}, classList } } 
    } = e
    if(classList.contains("upBtn")){
        changeOrder(targetList, "up");
    } else {
        changeOrder(targetList, "down");
    }
}

const handleSave = async () => {
    let workOutId = [];
    const dayId = window.location.href.split("/")[4];
    lists.forEach(l => workOutId.push(l.id));
    const response = await axios({
        url: `/api/${dayId}/change-order`,
        method: "POST",
        data: {
            workOuts: workOutId
        }
    });
    if(response.status === 200){
        saveMsg.innerHTML = "저장 성공!";
        setTimeout(clearMsg, 3000);
    } else {
        saveMsg.innerHTML = "저장 실패.";
        setTimeout(clearMsg, 3000);
    }
}

const clearMsg = () => saveMsg.innerHTML = "";

function init(){
    lists = container.querySelectorAll("li");
    upBtns.forEach(b => b.addEventListener("click", orderBtnHandle))
    downBtns.forEach(b => b.addEventListener("click", orderBtnHandle))
    saveBtn.addEventListener("click", handleSave);
}

if(container){
    init();
}