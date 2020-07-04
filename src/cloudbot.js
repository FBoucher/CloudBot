class score
{
    constructor(user, lastMessage, score) {
        this.user = user;
        this.lastMessage = lastMessage;
        this.highestScore = score;
    }
}

searchByUser = function(userName)
{
    console.log( "... Searching for: " + userName );
    for (i=0; i < scoreskeeper.length; i++) {
        console.log( "... looking at : " + scoreskeeper[i].user );
        if (scoreskeeper[i].user === userName) {
            console.log( "... found in position: " + i );
            return i;
        }
    }
    return -1;
}


testAzFunc = async function(name, callback)
{
    const Http = new XMLHttpRequest();
    const url=`http://<FunctionAppName>.azurewebsites.net/api/WhatsNew?name=${name}`;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        callback(Http.responseText);
    } 
}

updateTrace = function(message)
{
    document.querySelector("#fbTrace").innerHTML = message;
}


clean = function()
{
    document.querySelector("#imageViewer").innerHTML = "";
    document.querySelector("#lastChatMsg").innerHTML = "";
    document.querySelector("#fbTrace").innerHTML = "";
}

test = function(message)
{
    console.log( "!test was typed in chat" );
    document.querySelector("#fbTrace").innerText = message 
    setTimeout(() => { document.querySelector("#fbTrace").innerText = ""; }, 5000);
}

cloud = function()
{
    console.log( "!cloud was typed in chat" );
    document.querySelector("#imageViewer").innerHTML = "<img src='medias/smillingcloud.gif' class='nuage'>";
    setTimeout(() => {  clean(); }, 5000);
}

scores = function()
{
    console.log( "!scores was typed in chat" );

    let strMsg = "<table>";
    for ( i=0; i < scoreskeeper.length; i++) {
        strMsg += "<tr>";
        strMsg += `<td>${scoreskeeper[i].user}</td><td>${scoreskeeper[i].highestScore}</td>`;
        strMsg += "</tr>";
    }
    strMsg += "</table>";

    document.querySelector("#fbTrace").innerHTML = strMsg;
}

CheckForHighScore = function(user, curScore)
{
    let userPos = searchByUser(user);

    if(userPos >= 0)
    {
        console.log( "... User found at : " + userPos);
        console.log( "... previous highscore: " + scoreskeeper[userPos].highestScore);

        if(scoreskeeper[userPos].highestScore < curScore)
        {
            console.log( "... New highscore " + curScore);
            scoreskeeper[userPos].highestScore = curScore;
            HightScoreParty(user, curScore);
        }
        else{
            console.log( "... no new highscore, try again");
        }
    }
    else
    {
        console.log( "... User NOT found, creating new Stats...");
        scoreskeeper.push(new score(user, "", curScore));
    }
}

AddUserToScoreKeeper = function()
{
    scoreskeeper.push(new score(user, message, 0));
}
        

ParseMessage = function(message)
{
    // FBoucheros: theunoriginaljerk landed for 86.60!
    let splitedMsg = message.split(" ");
    let user = splitedMsg[0];
    let curScore = splitedMsg[3].slice(0, -1);

    if(splitedMsg.length > 1 && splitedMsg[1] === "landed")
    {
        CheckForHighScore(user, curScore);
    }
}

HightScoreParty = function(user, score){
    let msg = `${user} just beat his/her highest score! now at: ${score}`
    console.log( "... " + msg);
    test(msg);
    cloud();
}

StatsFor = function(user){
    
    console.log( "... looking stats for: " + user);
    let userPos = searchByUser(user);
    console.log( "... userPos: " + userPos);

    let msg = `${user} sorry no stats yet...`


    if(userPos >= 0)
    {
        console.log( "... " + msg);
        msg = `${user} *Stats* highest score: ${scoreskeeper[userPos].highestScore}`
    }

    //ComfyJS.Say( msg );
    document.querySelector("#fbTrace").innerHTML = msg;
    setTimeout(() => {  clean(); }, 5000);
}

ChatBotSay = function(msg)
{
    ComfyJS.Say( msg );
}