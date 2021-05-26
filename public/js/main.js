const eventEl = document.querySelector('#events');
const loadingEl = document.querySelector('#loading');
let loading = false; 

const getData = async () => {
    loading = true; 
    const res = await fetch('http://localhost:3001/projectsTimeline')
    const data = await res.json();
    loading = false;
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
            <h3>${event.title}</h3>  
            <ul>
                <li>Date: </strong>${event.date}</li>      
                <li>Description: </strong>${event.description}</li>   
            </ul>
            <div class="tags">${event.tags}</div> 
        `
        eventEl.appendChild(div);
    })
}

addData()