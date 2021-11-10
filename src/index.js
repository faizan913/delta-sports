const express = require('express')
const userRoutes = require('./routes/user.routes')
const contactRoutes = require('./routes/contactus.routes')
const cmsRoutes = require('./routes/cms.routes')
var cors = require('cors')

const app = express() // create express app
const port = process.env.PORT||4000
app.use(express.json())
app.use(cors())
app.use('/api/v1', userRoutes)
app.use('/api/v1', contactRoutes)
app.use('/api/v1', cmsRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})