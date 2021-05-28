const reviewEl = document.querySelector('#reviews');
const loadingEl = document.querySelector('#loading');
let loading = false; 


const getData = async () => {
    loading = true; 
    const res = await fetch('https://personalmatters.herokuapp.com/api/reviews')
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
            <div class="date"><strong>Posted On: ${review.postedOn}</strong></div>   
            <hr/>
            <div class="review-container">
                <span><img src="${review.art}" alt="art" class="art"></img></span>
                <div class="review-info">
                    <h3>${review.title}</h3>  
                    <p class="releasedOn">Release Date: ${review.releasedOn}</p>
                    <p class="directors">Director: ${review.directors}</p>
                    <p class="studio">Studio: ${review.studio}</p>
                    <p class="genre">Genre: ${review.genre}</p>
                    <p class="score">${review.score}</p>
                </div>
            </div>
            <hr/>
            <p class="summary">${review.summary}</p>   
        `

        reviewEl.appendChild(div);
    })
}

addData()

$.get("html/navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});