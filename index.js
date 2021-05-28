const express = require('express')
const { getProjectsTimeline, getReviews, getFoodlog, getBucketlist } = require('./services/notion')
const path = require('path')
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static('public'))

app.get('/api/projectstimeline', async (req, res) => {
    const projectsTimeline = await getProjectsTimeline()
    res.json(projectsTimeline) 
})

app.get('/api/reviews', async (req, res) => {
    const reviews = await getReviews()
    res.json(reviews) 
})

app.get('/api/bucketlist', async (req, res) => {
    const bucketlist = await getBucketlist()
    res.json(bucketlist) 
})

app.get('/api/foodlog', async (req, res) => {
    const foodlog = await getFoodlog()
    res.json(foodlog) 
})

app.get('/projectstimeline', async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/projectstimeline.html'))
})

app.get('/reviews', async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/reviews.html'))
})

app.get('/foodlog', async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/foodlog.html'))
})

app.get('/bucketlist', async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/bucketlist.html'))
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))
