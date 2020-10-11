const Btns = document.querySelectorAll("#jsDayBtn")

const handleBtn = (e) => {
    const {
        target: { parentNode: { parentNode: day } }
    } = e
    if(!day.classList.contains("close")){
        day.classList.add("close")
        e.target.outerHTML = '<i class="fas fa-plus"></i>'
    }else{
        day.classList.remove("close")
        e.target.outerHTML = '<i class="fas fa-minus"></i>'
    }
}

const init = () => {
    Btns.forEach(b => b.addEventListener("click", handleBtn))
}

if(Btns){
    init();
}