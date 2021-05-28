const dotenv = require('dotenv').config();
const {Client} = require('@notionhq/client');


const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const projecttimeline_database_id = process.env.NOTION_PROJECTTIMELINE_DATABASE_ID;
const review_database_id = process.env.NOTION_REVIEW_DATABASE_ID;
const bucketlist_database_id = process.env.NOTION_REVIEW_BUCKETLIST_ID;
const foodlog_database_id = process.env.NOTION_REVIEW_FOODLOG_ID;

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
        return {
            id: page.id,
            title: page.properties.Name.title[0].plain_text,
            art: page.properties.Art.files[0].name,
            releasedOn: page.properties['Release Date'].date.start,
            genre: page.properties.Genre.select.name, 
            directors: page.properties.Directors.multi_select.map(director => { return director.name }),
            studio: page.properties.Studio.select.name,
            score: page.properties['Score /5'].select.name,
            summary: page.properties.Summary.rich_text[0].text.content,
            postedOn: page.properties['Posted On'].date.start
        }
    })

    reviews = reviews.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
    return reviews 
}

exports.getFoodlog = async function getFoodlog() {
    const payload = {
        path: `databases/${foodlog_database_id}/query`,
        method: 'POST'
    }

    const {results} = await notion.request(payload)

    let foodlog = results.map(page => {

        tags = page.properties.Tags.multi_select.map(tag => {
            return tag.name 
        });

        return {
            id: page.id,
            name: page.properties.Name.title[0].plain_text,
            date: page.properties.Date.date.start,
            location: page.properties.Location.rich_text[0].text.content,
            image: page.properties.Image.url,
            description: page.properties.Description.rich_text[0].text.content,
            tags: tags
        }
    })
    foodlog = foodlog.sort((a, b) => new Date(b.date) - new Date(a.date))

    return foodlog 
}

exports.getBucketlist = async function getBucketlist() {
    const payload = {
        path: `databases/${bucketlist_database_id}/query`,
        method: 'POST'
    }

    const {results} = await notion.request(payload)

    let bucketlist = results.map(page => {

        tags = page.properties.Tags.multi_select.map(tag => {
            return tag.name 
        });
        
        return {
            id: page.id,
            name: page.properties.Name.title[0].plain_text,
            date: page.properties['Estimated Date'].rich_text[0].plain_text,
            remarks: page.properties.Remarks.rich_text[0].text.content,
            tags: tags
        }
    })

    return bucketlist 
}
