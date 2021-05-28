const foodEl = document.querySelector('#foodlog');
const loadingEl = document.querySelector('#loading');
let loading = false; 

const getData = async () => {
    loading = true; 
    const res = await fetch('https://localhost:3001/api/foodlog')
    let data = await res.json();
    loading = false;
    return data 
}

const addData = async () => {
    const foodlog = await getData();

    if(!loading) {
        loadingEl.innerHTML = '';
    }

    foodlog.forEach(food => {

        const div = document.createElement('div');
        div.className = 'food';
        div.innerHTML = `
            <div class="date"><strong>${food.date}</strong></div>   
            <hr/>
            <h3>${food.name}</h3>  
            <p class="location">Eaten at: ${food.location}</p>
            <span><img src="${food.image}" alt="image" class="image"></img></span>
            <hr/>
            <p class="description">${food.description}</p>   
        `

        food.tags.forEach(tag => {
            borderLeft = `border-left: 2px solid black;`
            borderBottom = `border-bottom: 2px solid black;`
            div.innerHTML += `<span class="tag" style="${borderLeft} ${borderBottom}">${tag}</span>`
        });
        foodEl.appendChild(div);
    })
}

addData()

$.get("html/navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});