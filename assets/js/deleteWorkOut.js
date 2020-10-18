import axios from "axios";

const deleteBtns = document.querySelectorAll("#jsDeleteBtn");
const container = document.querySelector(".editWorkOut-container");

const handleDeleteBtn = async (e) => {
    const { 
        target: { offsetParent: { parentNode: targetList } } 
    } = e
    const lists = container.querySelectorAll("li");
    console.dir(lists)
    const response = await axios({
        url: `/api/${targetList.id}/delete`,
        method: "POST"
    });
    if(response.status === 200){
        container.removeChild(targetList)
    }
}

function init() {
    deleteBtns.forEach((b) => b.addEventListener("click", handleDeleteBtn))
}

if(deleteBtns){
    init();
}