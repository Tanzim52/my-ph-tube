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

const displayVideos = (data) => {
    data.forEach((item) => {
        console.log(item.thumbnail)
        const cardContainer = document.createElement("div");
        cardContainer.classList="card card-compact"
        cardContainer.innerHTML = `
        <figure class="h-48">
    <img class="h-full w-full object-cover" src=${item.thumbnail}
      alt=${item.title} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    
  </div>
  `
        document.getElementById("vid-sec").append(cardContainer);
    })
}
loadVideos()
