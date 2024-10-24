const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((err) => console.log(err))
}

// {
//     "category_id": "1005",
//     "category": "Drawing"
// }

const displayCategories = (data) => {
    data.forEach((item) => {
        const btn = document.createElement("button");
        btn.classList = "btn btn-error";
        btn.innerText = item.category;
        document.getElementById("category").appendChild(btn);
    })
}

loadCategories()

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((err) => console.log(err))
}



const getTime=(time)=>{
    const hour=parseInt(time/3600);
    const remainingSec=time%3600;
    const mint=parseInt(remainingSec/60);
    const Sec=remainingSec%60;

    return `${hour} hr ${mint} min ${Sec} sec`; 

}

const displayVideos = (data) => {
    data.forEach((item) => {
        console.log(item)
        const cardContainer = document.createElement("div");
        cardContainer.classList = "card card-compact"
        cardContainer.innerHTML = `
        <figure class="h-48 rounded-md relative">
            <img class="h-full w-full object-cover" src=${item.thumbnail}
            alt= />
            ${item.others.posted_date?.length==0 ?"":
            `<span class="absolute right-2 bottom-2 text-xs rounded-sm text-white p-1 bg-gray-500">
                ${getTime(item.others.posted_date)}
            </span>`}
            
        </figure>
        <div class="flex  gap-3 py-4">
            <div class="w-10 h-10">
                <img class="h-full w-full object-cover rounded-full" src=${item.authors[0].profile_picture} alt="">
            </div>
            <div>
                <h3 class=" font-bold  ">
                    ${item.title}
                </h3>
                
                <p class=" text-sm font-semibold flex gap-2">
                    ${item.authors[0].profile_name}
                    
                    ${item.authors[0].verified == true ?`<img class=" w-5 h-5 " src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></img>`:""}
                    
                </p>
                <span class=" text-xs " >
                    ${item.others.views} views
                </span>
                <p>

                </p>
            </div>
    
        </div>
  `
        document.getElementById("vid-sec").append(cardContainer);
    })
}
loadVideos()
