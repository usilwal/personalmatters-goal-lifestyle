const eventEl = document.querySelector('#events');
const loadingEl = document.querySelector('#loading');
let loading = false; 

const getData = async () => {
    loading = true; 
    const res = await fetch('https://personalmatters.herokuapp.com/api/projectstimeline')
    let data = await res.json();
    loading = false;
    console.log(data)
    return data 
}

const addData = async () => {
    const events = await getData();

    if(!loading) {
        loadingEl.innerHTML = '';
    }

    events.forEach(event => {

        const div = document.createElement('div');
        div.className = 'event';
        div.innerHTML = `
            <div class="date"><strong>${event.date}</strong></div>   
            <hr/>
            <h3>${event.title}</h3>  
            <ul>
                <li>${event.description}</li>   
            </ul>
        `

        event.tagsInfo.forEach(tag => {
            borderLeft = `border-left: 2px solid ${tag.color};`
            borderBottom = `border-bottom: 2px solid ${tag.color};`
            div.innerHTML += `<span class="tag" style="${borderLeft} ${borderBottom}">${tag.name}</span>`
        });
        eventEl.appendChild(div);
    })
}

addData()

$.get("html/navbar.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});