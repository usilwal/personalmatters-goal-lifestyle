const eventEl = document.querySelector('#events');
const loadingEl = document.querySelector('#loading');
let loading = false; 

const getData = async () => {
    loading = true; 
    const res = await fetch('http://localhost:3001/projectsTimeline')
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
            <h3>${event.title}</h3>  
            <ul>
                <li>${event.description}</li>   
            </ul>
        `
        event.tagsInfo.forEach(tag => {
            div.innerHTML += `<span class="tag" style="background-color: ${tag.color}">${tag.name}</span>`
            console.log(tag);
        });
        eventEl.appendChild(div);
    })
}

addData()