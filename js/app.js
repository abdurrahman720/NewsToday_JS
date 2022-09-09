const loadCategory = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const categories = await res.json();
    displayMenu(categories.data.news_category);
}

const displayMenu = async (categories) => {

    const menuBar = document.getElementById('menu-bar');

    categories.forEach(category => {
        const title = category.category_name;
        console.log(category.category_id)
        const a = document.createElement('a');
        a.classList.add('nav-link')
        a.classList.add('mx-4')
        a.innerHTML = `
        <a onclick="loadNews('${category.category_id}')">${title}</a>  
       `;
        menuBar.appendChild(a)

    })

    
}

const loadNews = async(category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url)
    const id =  await res.json()
    displayNews(id.data);
    
}

const displayNews = async (data) => {
    const newDiv = document.getElementById('news');
    newDiv.innerHTML = ``
    data.forEach(datum => {
        
    
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('col-12')
        gridDiv.classList.add('col-lg-12')
        gridDiv.innerHTML = `
        
        <div class="news1 d-flex flex-lg-row flex-md-row flex-column border border-1 rounded-2 shadow">
            <img class="w-25" src="${datum.image_url}"></ alt="">
            <div class="course-text ms-2 d-flex flex-column justify-content-center p-4">
                <h4 class="fw-semibold">${datum.title}</h4>
                <p>${datum.details.slice(0,500)}...</p>
                <div class="bottom d-flex justify-content-between" id="bottom">
                   <div class="author d-flex">
                    <img src="${datum.author.img}" style="width:20px ;height:30px" class="rounded mx-1" alt="">

                    <div class="name d-flex flex-column">
                        <p>${datum.author.name ? datum.author.name : "Data not found"}</p>
                        <p>${datum.author.published_date}</p>
                    </div>
                   </div>
                   <div class="icon d-flex justify-content-between">
                    <div class="eye"><i class="fa-solid fa-eye"></i></div>
                    <div class="view-text mx-1"><p>${datum.total_view ? datum.total_view : "Data not found"}</p></div>
                   </div>
                   <div class="rating">
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                   </div>
                   <div><i onclick="newsDetails('${datum._id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#NewsModal"></i></div>
                </div>
            </div>
        </div>
        `
        newDiv.appendChild(gridDiv);
        
    })
}

const newsDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const news = await res.json();
    displayNewsDetails(news.data[0]);
}

const displayNewsDetails = async (news) => {
    console.log(news)
    const newsTitle = document.getElementById('newsModalLabel');
    newsTitle.innerText = news.title;

    const newsDetails = document.getElementById('newsDetails')
    newsDetails.innerHTML = `
    <img class="w-25" src="${news.image_url}"></ alt="">
    <p>${news.details.slice(0,500)}...</p>
    `
}

loadCategory();