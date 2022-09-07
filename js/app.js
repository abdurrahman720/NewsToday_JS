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
    data.forEach(datum => {
        console.log(datum)
    })
}


loadCategory();