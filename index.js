const express = require('express')
const getProjectsTimeline = require('./services/notion')
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static('public'))

app.get('/projectsTimeline', async (req, res) => {
    const projectsTimeline = await getProjectsTimeline()
    res.json(projectsTimeline) 
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))
