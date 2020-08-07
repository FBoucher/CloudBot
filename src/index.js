const express = require('express')
const path = require('path')
const fs = require('fs');
const dateFormat = require('dateformat');
const app = express()
const port = 3000

app.use('/public', express.static("public"));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/', 'index.html')))

app.post("/Hello", (req, res) => {
    console.log("..s.")

    if(req.body && req.body.user){

        console.log(req.body)

        let user = req.body.user
        let result = "Hello " + user
        res.send({"msg":result}) 
    }
    else{
        res.json({error:"no user."}) 
    }

})


app.post("/savetofile", (req, res) => {
    console.log("..s.")

    if(req.body && req.body.streamSession){

        console.log(req.body.streamSession)

        const data = JSON.stringify(req.body.streamSession,null, 2)
        fs.writeFile('streamSession.json', data, (err) => {
            if (err) {
                res.json({error:err}) 
            }
            console.log("JSON data is saved.");
            res.send({"msg":"Data is saved."})
        });
    }
    else{
        res.json({error:"no data"}) 
    }

})


app.get("/loadfromfile", (req, res) => {
    console.log("..l.")

    if(true){


        fs.readFile('streamSession.json', 'utf-8', (err, data) => {
            if (err) {
                res.json({error:err}) 
            }
            console.log("JSON data is load.");
            //console.log("... Trace: " + data.toString());
            const streamSession = JSON.parse(data);
            res.send(streamSession)
        });
    }
    else{
        res.json({error:"no data"}) 
    }

})

 
app.post("/genstreamnotes", (req, res) => {
    console.log("..g.");
    console.log("..project name: " + req.body.project);

    let filename = dateFormat(new Date(), "yyyy-mm-dd");
    filename += `-${req.body.project}.md`;

    console.log("..filename: " +  filename);

    if(req.body && req.body.notes){

        console.log(req.body.notes)

        //const data = JSON.stringify(req.body.notes,null, 2)
        const data = req.body.notes;
        fs.writeFile(filename, data, (err) => {
            if (err) {
                res.json({error:err}) 
            }
            console.log("Notes saved.");
            res.send({"msg":"Notes saved."})
        });
    }
    else{
        res.json({error:"no data"}) 
    }

})

//test
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
