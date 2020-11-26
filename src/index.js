const express = require('express')
const path = require('path')
const fs = require('fs');
const dateFormat = require('dateformat');
const text2png = require('text2png');
const app = express()
const port = 3000

app.use('/public', express.static("public"));
app.use('/io', express.static("io"));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/', 'index.html')))

app.post("/Hello", (req, res) => {

    if(req.body && req.body.user){
        let user = req.body.user;
        let filename = dateFormat(new Date(), "yyyy-mm-dd-HHMM");
        filename += `_hello-${user}.png`;
        
        console.log(`new image: ${filename}`);

        let msg = `Hello ${user}!`;
        createImage(filename, msg);
        res.send({"msg":filename}) 
    }
    else{
        res.json({error:"no user."}) 
    }

})



app.post("/Attention", (req, res) => {

    if(req.body && req.body.user){
        let user = req.body.user;
        let userMsg = req.body.message;
        let filename = dateFormat(new Date(), "yyyy-mm-dd-HHMM");
        filename += `_Att-${user}.png`;

        console.log(`new image: ${filename}`);

        let msg = `${user} said\:\n${userMsg}`;
        createImage(filename, msg);
        res.send({"msg":filename}) 
    }
    else{
        res.json({error:"no user."}) 
    }

})




app.post("/savetofile", (req, res) => {
    console.log("..s.")

    if(req.body && req.body.streamSession){

        console.log(req.body.streamSession)

        const data = JSON.stringify(req.body.streamSession,null, 2);
        const filename = `io/streamSession_${req.body.streamSession.Id}.json`

        fs.writeFile(filename, data, (err) => {
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

    let filename = "io/" + dateFormat(new Date(), "yyyy-mm-dd");
    filename += ` - ${req.body.id} - ${req.body.project}.md`;

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
    CleanUpGeneratedImages();
})

//test
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


createImage = function(imageName, message){

    fs.writeFileSync(`./public/medias/generated/${imageName}`, text2png(message , {
        color: 'white', 
        strokeWidth: '1.5',
        strokeColor: 'gray',
        font: '65px McKloud Black',
        localFontName: 'McKloud Black'
    }));
}


CleanUpGeneratedImages = function(){
    const directory = './public/medias/generated';

    fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
        });
    }
    });
}