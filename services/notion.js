const dotenv = require('dotenv').config();
const {Client} = require('@notionhq/client');


const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const projecttimeline_database_id = process.env.NOTION_PROJECTTIMELINE_DATABASE_ID
const review_database_id = process.env.NOTION_REVIEW_DATABASE_ID

exports.getProjectsTimeline = async function getProjectsTimeline() {
    const payload = {
        path: `databases/${projecttimeline_database_id}/query`,
        method: 'POST'
    }

    const {results} = await notion.request(payload)

    let events = results.map(page => {
        //store tags for each entry in array
        tagsInfo = page.properties.Tags.multi_select.map(tag => {
            return { name: tag.name, color: tag.color }
        });
        
        return {
            id: page.id,
            title: page.properties.Name.title[0].text.content, 
            date: page.properties.Date.date.start,
            tagsInfo: tagsInfo,
            description: page.properties.Description.rich_text[0].text.content,
        }
    })

    events = events.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse()

    return events 
}

exports.getReviews = async function getReviews() {
    const payload = {
        path: `databases/${review_database_id}/query`,
        method: 'POST'
    }

    const {results} = await notion.request(payload)

    let reviews = results.map(page => {
        //store tags for each entry in array
        return {
            id: page.id,
            title: page.properties.Name.title[0].plain_text,
            art: page.properties.Art.files[0].name,
            releasedOn: page.properties['Release Date'].date.start,
            genre: page.properties.Genre.select.name, 
            directors: page.properties.Directors.multi_select.map(director => { return director.name }),
            studio: page.properties.Studio.select.name,
            score: page.properties['Score /5'].select.name,
            summary: page.properties.Summary.rich_text[0].plain_text,
            watchedOn: page.properties['Watched On'].date.start
        }
    })

    reviews = reviews.sort((a, b) => new Date(b.watchedOn) - new Date(a.watchedOn))
    return reviews 
}

