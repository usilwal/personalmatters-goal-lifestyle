const dotenv = require('dotenv').config();
const {Client} = require('@notionhq/client');


const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getProjectsTimeline() {
    const payload = {
        path: `databases/${database_id}/query`,
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

    events = events.sort((a, b) => new Date(b.date) - new Date(a.date))

    return events 
}