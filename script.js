const itemsArray=localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):[];
console.log(itemsArray);


function displayDate(){
    let date=new Date();
    date=date.toString().split(" ");
    document.getElementById('date').innerHTML=date[1]+" "+date[2]+" "+date[3];
}

const enterBtn=document.getElementById('enter');

enterBtn.addEventListener('click' ,()=>{
    if(item.value!=""){
        const item=document.getElementById('item');
        createItem(item);
    }
})

function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem("items",JSON.stringify(itemsArray));
    location.reload();
}

function displayItems(){
    let items="";
    for(let i=0;i<itemsArray.length;i++){
        items+= `<div class="item">
                    <div class="input-controller">
                        <textarea disabled>${itemsArray[i]}</textarea>
                        <div class="edit-controller">
                            <i class="fa-sharp fa-solid fa-check deleteBtn"></i>
                            <i class="fa-regular fa-pen-to-square editBtn"></i>                            
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".list").innerHTML=items
    activateDeleteListners();
    activateEditListners();
    activateSaveListners();
    activateCancelListners();
}

function activateDeleteListners(){
    let deleteBtn=document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((db,i)=>{
        db.addEventListener('click',()=>{ deleteItem(i)});
    })
}
function deleteItem(i){
    itemsArray.splice(i,1);
    localStorage.setItem("items",JSON.stringify(itemsArray));
    location.reload();
}
function activateEditListners(){
    const editBtn=document.querySelectorAll(".editBtn");
    const updateController=document.querySelectorAll(".update-controller");
    const inputs= document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb,i)=>{
        eb.addEventListener("click",()=>{
            updateController[i].style.display="block";
            inputs[i].disabled=false;
        })
    })
}

function activateSaveListners(){
    const saveBtn=document.querySelectorAll(".saveBtn");
    const inputs= document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb,i)=>{
        sb.addEventListener('click',()=>{updateItem(inputs[i].value,i)});
    })
}

function updateItem(text,i){
    itemsArray[i]=text;
    localStorage.setItem("items",JSON.stringify(itemsArray));
    location.reload();
}

function activateCancelListners(){
    const cancelBtn=document.querySelectorAll(".cancelBtn");
    const updateController=document.querySelectorAll(".update-controller");
    const inputs= document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cb,i)=>{
        cb.addEventListener('click',()=>{
            updateController[i].style.display="none";
            inputs[i].disabled=true;
            localStorage.setItem("items",JSON.stringify(itemsArray));
            location.reload();
        })
    })
}

window.onload=function(){
    displayDate();
    displayItems();
}