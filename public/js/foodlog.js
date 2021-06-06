const foodEl = document.querySelector('#foodlog');
const loadingEl = document.querySelector('#loading');
let loading = false; 

function getFoodlogBorder(firstTag) {
    switch(firstTag) {
        case "Breakfast":
            return "#F3AF2F";
        case "Lunch":
            return "#F96B00";
        case "Dinner":
            return "#B23A3C";
        default:
            return "#613C47";
    } 
}

const getData = async () => {
    loading = true; 
    const res = await fetch('https://personalmatters.herokuapp.com/api/foodlog')
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
            borderLeft = `border-left: 1px solid black;`
            borderBottom = `border-bottom: 2px solid black;`
            div.innerHTML += `<span class="tag" style="${borderLeft} ${borderBottom}">${tag}</span>`
        });

        div.style.borderBottom = `10px solid ${getFoodlogBorder(food.tags[0])}`;
        console.log(getFoodlogBorder(food.tags[0]))
        foodEl.appendChild(div);
    })
}

addData()

function responsiveIcon() {
    var x = document.getElementById("nav-link");
    if (x.className === "nav-link") {
      x.className += " responsive";
    } else {
      x.className = "nav-link";
    }
  }
  
$.get("html/navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});