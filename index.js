const express = require('express')
const { getProjectsTimeline, getReviews } = require('./services/notion')
const path = require('path')
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static('public'))

app.get('/api/projectsTimeline', async (req, res) => {
    const projectsTimeline = await getProjectsTimeline()
    res.json(projectsTimeline) 
})

app.get('/api/reviews', async (req, res) => {
    const reviews = await getReviews()
    res.json(reviews) 
})

app.get('/projectstimeline', async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})


app.get('/reviews', async (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/reviews.html'))
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))
