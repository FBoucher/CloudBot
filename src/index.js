const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile('index.html'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//app.use(express.static('folderWithCssOrJs'))