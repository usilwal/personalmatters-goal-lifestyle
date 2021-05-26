const reviewEl = document.querySelector('#reviews');
const loadingEl = document.querySelector('#loading');
let loading = false; 

`id: page.id,
title: page.properties.Name.title[0].plain_text,
art: page.properties.Art.files[0].name,
releasedOn: page.properties['Release Date'].date.start,
genre: page.properties.Genre.select.name, 
directors: page.properties.Directors.multi_select.map(director => { return director.name }),
studio: page.properties.Studio.select.name,
score: page.properties['Score /5'].select.name,
summary: page.properties.Summary.rich_text[0].plain_text,
watchedOn: page.properties['Watched On'].date.start`
const getData = async () => {
    loading = true; 
    const res = await fetch('http://localhost:3001/api/reviews')
    let data = await res.json();
    loading = false;
    console.log(data)
    return data 
}

const addData = async () => {
    const reviews = await getData();

    if(!loading) {
        loadingEl.innerHTML = '';
    }

    reviews.forEach(review => {

        const div = document.createElement('div');
        div.className = 'review';
        div.innerHTML = `
            <div class="date"><strong>Watched On: ${review.watchedOn}</strong></div>   
            <hr/>
            <h3>${review.title}</h3>  
            <span><img src="${review.art}" alt="art" class="art"></img></span>
            <p>${review.summary}</p>   
        `
        reviewEl.appendChild(div);
    })
}

addData()

$.get("html/navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});