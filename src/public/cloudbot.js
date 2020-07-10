let streamSession = [];



class UserSession
{
    constructor(user) {
        this.dropCount = 0;
        this.landedCount = 0;
        this.user = user;
        this.lastMessage = "";
        this.highestScore = 0;
    }
}




getUserPosition = function(userName)
{
    console.log( "... Searching for: " + userName );
    for (i=0; i < streamSession.length; i++) {
        console.log( "... looking at : " + streamSession[i].user );
        if (streamSession[i].user === userName) {
            console.log( "... found in position: " + i );
            return i;
        }
    }
    streamSession.push(new UserSession(userName));
    return i++;
}



updateTrace = function(message)
{
    document.querySelector("#cbTitle").innerHTML = message;
}



clean = function()
{
    document.querySelector("#imageViewer").innerHTML = "";
    document.querySelector("#lastChatMsg").innerHTML = "";
    document.querySelector("#cbTitle").innerHTML = "";
}



cloud = function()
{
    console.log( "!cloud was typed in chat" );
    document.querySelector("#imageViewer").innerHTML = "<img src='public/medias/smillingcloud_50.gif' class='nuage'>";
    setTimeout(() => {  clean(); }, 5000);
}



scores = function()
{
    console.log( "!scores was typed in chat" );

    let strMsg = "<table>";
    for ( i=0; i < streamSession.length; i++) {
        strMsg += "<tr>";
        strMsg += `<td>${streamSession[i].user}</td><td>${streamSession[i].highestScore}</td>`;
        strMsg += "</tr>";
    }
    strMsg += "</table>";

    document.querySelector("#cbTitle").innerHTML = strMsg;
}



UserLanded = function(user, curScore)
{
    let userPos = getUserPosition(user);

    if(userPos >= 0)
    {
        streamSession[userPos].landedCount++;

        if(streamSession[userPos].highestScore < curScore)
        {
            console.log( "... New highscore " + curScore);
            streamSession[userPos].highestScore = curScore;
            HightScoreParty(user, curScore);
        }
        else{
            console.log( "... no new highscore, try again");
        }
    }
    else
    {
        console.log( "... User NOT found?!");
    }
}

        

ParseMessage = function(message)
{
    // FBoucheros: FBoucheros landed for 86.60!
    let splitedMsg = message.split(" ");
   
    if(splitedMsg.length > 1 && splitedMsg[1] === "landed")
    {
        let user = splitedMsg[0].toLowerCase();
        let curScore = splitedMsg[3].slice(0, -1);

        UserLanded(user, curScore);
    }
}


DisplayNotification = function(title, message)
{
    // Need to find a none JQUery lib
    //toastr.success(message, title);
}


HightScoreParty = function(user, score){
    let msg = `${user} just beat his/her highest score! now at: ${score}`
    console.log( "... " + msg);
    ChatBotShout(msg);
    //DisplayNotification("New high score!", msg);
    cloud();
}



StatsFor = function(user){
    
    console.log( "... looking stats for: " + user);
    let userPos = getUserPosition(user);
    console.log( "... userPos: " + userPos);

    let msg = `${user} sorry no stats yet...`


    if(userPos >= 0)
    {
        console.log( "... " + msg);
        msg = `${user} * *Stats* *   Tentative(s): ${streamSession[userPos].dropCount}    Landed: ${streamSession[userPos].landedCount}     Highest score: ${streamSession[userPos].highestScore}`
    }

    ComfyJS.Say( msg );
    document.querySelector("#cbTitle").innerHTML = msg;
    setTimeout(() => {  clean(); }, 5000);
}



ChatBotSay = function(msg)
{
    ComfyJS.Say( msg );
}




ChatBotShout = function(message)
{
    console.log( "!ChatBotShout was typed in chat" );
    document.querySelector("#cbTitle").innerText = message 
    setTimeout(() => { document.querySelector("#cbTitle").innerText = ""; }, 5000);
}



IncrementDropCounter = function(user)
{
    let userPos = getUserPosition(user);
    streamSession[userPos].dropCount++;
}



testing123 = function(user)
{

    fetch('/Hello', {
        method: 'POST',
        body: {"user":user}
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        ChatBotSay(result.msg);
    })
    .catch(error => {
        console.error('Error:', error);
    });


}