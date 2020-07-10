const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/public', express.static("public"));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/', 'index.html')))

app.post("/Hello", (req, res) => {

    console.log(req.body)
    
    let user = req.body.user
    let result = "Hello " + user
    return res.send({"msg":result})

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



//app.use(express.static('folderWithCssOrJs'))

// var Hello = function(req, res)
// {
//     let user = req.body.user
//     let result = "Hello " + user
//     return res.send({"msg":result})
// }