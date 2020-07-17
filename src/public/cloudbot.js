



class UserSession
{
    constructor(user) {
        this.dropCount = 0;
        this.landedCount = 0;
        this.user = user;
        this.lastMessage = "";
        this.hightScore = 0;
    }
}



class StreamSession
{
    constructor() {
        this.UserSession =  [];
        this.Followers= [];
    }
}


let streamSession = new StreamSession();


getUserPosition = function(userName)
{
    console.log( "... Searching for: " + userName );
    for (i=0; i < streamSession.UserSession.length; i++) {
        console.log( "... looking at : " + streamSession.UserSession[i].user );
        if (streamSession.UserSession[i].user === userName) {
            console.log( "... found in position: " + i );
            return i;
        }
    }
    streamSession.UserSession.push(new UserSession(userName));
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
    for ( i=0; i < streamSession.UserSession.length; i++) {
        strMsg += "<tr>";
        strMsg += `<td>${streamSession.UserSession[i].user}</td><td>${streamSession.UserSession[i].hightScore}</td>`;
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
        streamSession.UserSession[userPos].landedCount++;

        if(streamSession.UserSession[userPos].hightScore < curScore)
        {
            console.log( "... New highscore " + curScore);
            streamSession.UserSession[userPos].hightScore = curScore;
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
        msg = `${user} * *Stats* *   Tentative(s): ${streamSession.UserSession[userPos].dropCount}    Landed: ${streamSession.UserSession[userPos].landedCount}     Highest score: ${streamSession.UserSession[userPos].hightScore}`
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
    streamSession.UserSession[userPos].dropCount++;
}



testing123 = function(user)
{
    const data = {user: user};
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch('/Hello', options)
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        ChatBotSay(result.msg);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}


SaveToFile = function()
{
    const data = {streamSession: streamSession};
    console.log('..c. data: ', data);
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch('/savetofile', options)
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        ChatBotSay(result.msg);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}



LoadFromFile = function()
{
    
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    fetch('/loadfromfile', options)
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        console.log('...Trace:', Object.values(result));
        //streamSession = Object.values(result);
        LoadStreamSession(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}


LoadStreamSession = function(data)
{
    streamSession = new StreamSession();
    streamSession.UserSession = data.UserSession.map((o) => { 
        const newUser = new UserSession(); 
        for (const [key, value] of Object.entries(o)) 
        { 
            newUser[key] = value; 
        } return newUser; 
    });
}



















