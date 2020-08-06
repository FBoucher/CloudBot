

class Note
{
    constructor(text) {
        this.time = new Date();
        this.text = text;
    }
}

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

compareHightScore = function(a, b) {
    return a.hightScore - b.hightScore;
}

class StreamSession
{
    constructor() {
        this.Project;
        this.DateTimeStart;
        this.DateTimeEnd;
        this.Notes = [];
        this.UserSession =  [];
        this.Followers = [];
    }
}

const SoundEnum = {
    yeah : "public/medias/yeah.mp3",
    bonjourHi : "public/medias/BonjourHi.mp3",
    badFeeling : "public/medias/badfeeling.mp3"
};


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



cloud = function(expression)
{

    const fileName = "CB-" + expression + ".gif";
    document.querySelector("#imageViewer").innerHTML = "<img src='public/medias/" + fileName + "' class='nuage'>";
    setTimeout(() => {  clean(); }, 5000);
}

sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

scores = function()
{
    console.log( "!scores was typed in chat" );

    var sortedUsers = streamSession.UserSession.sort(compareHightScore);

    for ( i=0; i < sortedUsers.length; i++) {
        const msg = `${sortedUsers[i].user} --> ${sortedUsers[i].hightScore}`;
        console.log( "... pre Showing: " + sortedUsers[i].user);
        setTimeout(() => {
            DisplayNotification( msg );
        }, i * 1000); 
    }
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
    else if( message.startsWith("Thank you for following") )
    {
        let user = splitedMsg[4].toLowerCase().slice(0, -1);
        streamSession.Followers.push(user);
    }
}


DisplayNotification = function(title, message)
{
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "allowHtml": true
    };
    console.log( "... toasting: " + message);
    toastr.info(message, title);
}


HightScoreParty = function(user, score){
    let msg = `${user} just beat his/her highest score! now at: ${score}`
    console.log( "... " + msg);
    //ChatBotShout(msg);
    DisplayNotification("New high score!", msg);
    cloud("Yeah");
    playSound(SoundEnum.yeah);
}



StatsFor = function(user){
    
    console.log( "... looking stats for: " + user);
    let userPos = getUserPosition(user);
    console.log( "... userPos: " + userPos);

    let msg = `${user} sorry no stats yet...`


    if(userPos >= 0)
    {
        msg = `Tentative(s): ${streamSession.UserSession[userPos].dropCount} <br />Landed: ${streamSession.UserSession[userPos].landedCount} <br />Highest score: ${streamSession.UserSession[userPos].hightScore}`
    }

    //console.log( "... " + msg.replace(/<br \/>/g, "   "));
    ComfyJS.Say( msg.replace(/<br \/>|<br\/>/g, "   ") );
    DisplayNotification(`${user} Stats`, msg)
    //document.querySelector("#cbTitle").innerHTML = msg;
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
    
    // loading users scores
    streamSession.UserSession = data.UserSession.map((o) => { 
        const newUser = new UserSession(); 
        for (const [key, value] of Object.entries(o)) 
        { 
            newUser[key] = value; 
        } return newUser; 
    });

    // loading followers
    streamSession.Followers = data.Followers;
}

playSound = function(fileName)
{
    var audio = new Audio(fileName);
    audio.play();
}

StreamNoteStart = function(projectName)
{
    streamSession.Project = projectName;
    streamSession.DateTimeStart = new Date();

    LoadFromFile();
}


StreamNoteStop = function()
{
    SaveToFile();
    let streamNotes = GenerateStreamNotes();
    console.log('Notes: ', streamNotes);
}


GenerateStreamNotes = function()
{
    let streamNote = "";

    //Project detail
    streamNote += GenerateProjectInfo();

    // Stream Details

    
    // Cloudies info
    streamNote += GenerateCloudiesInfo();

    // Goal extra

    return streamNote;
}


GenerateProjectInfo = function()
{
    let projectSection = "##Project\n"
    projectSection += "All the code for this project is available on GitHub: " + streamSession.projectName + " - https://github.com/FBoucher/" + streamSession.projectName + "n/";

    return projectSection;
}

GenerateCloudiesInfo = function()
{
    let cloudiesSection = GenerateNewFollowerSection(); 

    return cloudiesSection;
}


GenerateNewFollowerSection = function()
{
    let followerSection = "##New Followers\n"

    for(c in StreamSession.Followers)
    {
        followerSection += `- [@${c}](https://www.twitch.tv/${c})\n`;
    }

    return followerSection;
}









