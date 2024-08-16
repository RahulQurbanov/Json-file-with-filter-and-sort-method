let section=document.querySelector(".right-sec");
let visor=document.querySelector("#supervisor");
console.log(visor);
 let data
 let dataLength
 let dataTaskers
 let day
//  let showSupervisor
 let OriginalDataTaskers
data=fetch("data.json").then(res=>res.json())
.then(data=>{
    console.log(data);
    OriginalDataTaskers=data.data.taskers
    dataLength=data.data.taskers.length;
    dataTaskers=data.data.taskers;
    console.log(dataTaskers);
    showProduct();
})


function showProduct(){
    section.innerHTML = '';
    
    day=new Date("2024-04-03T20:00:00.000Z");
    for (let i = 0; i < dataLength; i++) {
        let name=dataTaskers[i].user.name;
    let surName=dataTaskers[i].user.surname;
    let rating=dataTaskers[i].averageRating;
    let tasks=dataTaskers[i].completedTasks;
    let bio=dataTaskers[i].bio;
    let publicUrl=dataTaskers[i].user.profile_picture.publicUrl;
        // showSupervisor=dataTaskers[i].supervisor
    let startDate = new Date(dataTaskers[i].startDate);
   
        
    // console.log(showSupervisor);

    let topPro=startDate < day
    let newPro=startDate >= day
    
    let newProduct=document.createElement("div");
   newProduct.classList.add("box");
   newProduct.innerHTML=`
   <div class="box-head">
   <div class="img">
       <img src="${publicUrl}" alt="">
   </div>
   <div class="info">
       <div class="info-head">
           <h4>${name +" "+ surName}</h4>
       </div>
       <div class="info-end">
           ${searchRating(rating)}
           <h5 id="rating">${rating}</h5>
           <h5 id="count">(${tasks})</h5>
       </div>
   </div>
</div>
<div class="box-main">
   <div class="icon">
       <div class="tik">
           <img src="./image/Group 26286.png" alt="">
           <p>${tasks} Tasks</p>
       </div>
       <div class="hashtag">
       ${topPro ?'<img src="./image/Hashtag.png" alt=""><p>Top Pro</p>' : ''}
       </div>
       <div class="heart">
       ${newPro ? '<img src="./image/Heart.png" alt=""><p>New Pro</p>' : ''}
       </div>
   </div>
   <div class="text">
       <p>${bio}</p>
   </div>
</div>
<div class="box-end">
   <div class="view">
       <p>View Profile</p>
   </div>
   <div class="price">
       <p>$35</p>
       <button>Book Now</button>
   </div>
</div>
   `
   section.appendChild(newProduct)
 }
}


function searchRating(rating) {
    let ratingImages = '';
    for (let i = 0; i < rating; i++) {
        ratingImages += `<img src="./image/Vector (2).png" alt="" class="RatingImg">`;
    }
    return ratingImages;
}

let select=document.querySelector("#select");
select.addEventListener("change", function() {
    // console.log(select.value);
    if (select.value === "Increasing") {
        dataTaskers.sort((a, b) => b.averageRating - a.averageRating);
    }
     else if(select.value === "Decreasing"){
        dataTaskers.sort((a, b) => a.averageRating - b.averageRating);
    }
    showProduct()
});

let ratingSelect=document.querySelector("#ratingSelect");
ratingSelect.addEventListener("change",function(){
    if (ratingSelect.value === "Increasing") {
        dataTaskers.sort((a, b) => b.completedTasks - a.completedTasks);
    }
     else if(ratingSelect.value === "Decreasing"){
        dataTaskers.sort((a, b) => a.completedTasks - b.completedTasks);
    }
    showProduct()
})

let topProCheckbox = document.querySelector("#check"); 

topProCheckbox.addEventListener("change", function() {
    if (topProCheckbox.checked) { 
        dataTaskers = dataTaskers.filter(dataTaskers => {
            let startDate = new Date(dataTaskers.startDate);
            return startDate < day;
        });
    } else {
        dataTaskers=[...OriginalDataTaskers];
    }
    showProduct();
});

let newProCheckbox=document.querySelector("#newpro");

newProCheckbox.addEventListener("change",function() {
    if(newProCheckbox.checked){
        dataTaskers=dataTaskers.filter(dataTaskers=>{
            let startDate= new Date(dataTaskers.startDate)
            return startDate >= day;
        });
    }else{
        dataTaskers=[...OriginalDataTaskers];
        }
        showProduct()
});

let superVisor=document.querySelector("#supervisor");

superVisor.addEventListener("change",function(){
    if(superVisor.checked){
       let filterVisor=dataTaskers.filter(dataTaskers=>dataTaskers.supervisor===true);        
        dataTaskers=filterVisor
    } 
    else{
        dataTaskers=[...OriginalDataTaskers]
    } 
    showProduct()
})



