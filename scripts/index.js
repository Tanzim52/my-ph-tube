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

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("rmv-cls");
    for (let button of buttons) {
        button.classList.remove("active")
    }
}

const getCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active")

            displayVideos(data.category)
        })
        .catch((err) => console.log(err))
}

const displayCategories = (data) => {
    data.forEach((item) => {

        const btnContainer = document.createElement("div");
        btnContainer.innerHTML =
            `
            <button id="btn-${item.category_id}" onclick="getCategoryVideos(${item.category_id})" class="rmv-cls btn btn-outline">
                ${item.category}
            </button>
            `
        document.getElementById("category").appendChild(btnContainer);
    })
}

loadCategories()

const loadVideos = (value="") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${value}`)
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((err) => console.log(err))
}

document.getElementById("search-bar").addEventListener("keyup",(event)=>{
    loadVideos(event.target.value);
})


const getTime = (time) => {
    const hour = parseInt(time / 3600);
    const remainingSec = time % 3600;
    const mint = parseInt(remainingSec / 60);
    const Sec = remainingSec % 60;

    return `${hour} hr ${mint} min ${Sec} sec`;

}

const displayVideos = (data) => {
    document.getElementById("vid-sec").innerHTML = ""

    if (data.length == 0) {

        document.getElementById("vid-sec").classList.remove("grid")
        document.getElementById("vid-sec").innerHTML =
            `
        <div class="flex flex-col items-center gap-7">
            <img src="assets/Icon.png" alt="">
            <p class=" text-2xl font-bold">
                OOPS!! Sorry, There's no content here.
            </p>
        </div>
        `

    }
    else {
        document.getElementById("vid-sec").classList.add("grid")
    }
    data.forEach((item) => {

        // console.log(item)
        const cardContainer = document.createElement("div");
        cardContainer.id = `${item.video_id}`
        // console.log(cardContainer.id)

        cardContainer.classList = "card card-compact"
        cardContainer.innerHTML = `
        <figure class="h-48 rounded-md relative">
            <img class="h-full w-full object-cover" src=${item.thumbnail}
            alt= />
            ${item.others.posted_date?.length == 0 ? "" :
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
                    
                    ${item.authors[0].verified == true ? `<img class=" w-5 h-5 " src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></img>` : ""}
                    
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
    
        document.getElementById(`${item.video_id}`).addEventListener('click', function (){
            
            // {
            //     "category_id": "1001",
            //     "video_id": "aaab",
            //     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
            //     "title": "Midnight Serenade",
            //     "authors": [
            //         {
            //             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
            //             "profile_name": "Noah Walker",
            //             "verified": false
            //         }
            //     ],
            //     "others": {
            //         "views": "543K",
            //         "posted_date": ""
            //     },
            //     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
            // }

            fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${item.video_id}`)
            .then((res) => res.json())
            .then((data) => displayDetails(data.video))
            .catch((err) => console.log(err))
        })
    
    })


    
}

const displayDetails=(video)=>{
    // console.log(video)
    const customMod=document.getElementById("customModal");
    customMod.innerHTML=
    `
    <img class=" rounded-md" src=${video.thumbnail} alt="">
    <p class="text-sm font-extrabold">
        ${video.description}
    </p>
    `

    document.getElementById("mModal").showModal();
}
loadVideos()
