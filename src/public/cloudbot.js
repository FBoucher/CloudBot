

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
        this.lastUpdate = "";
        this.dropCount = 0;
        this.landedCount = 0;
        this.user = user;
        this.lastMessage = "";
        this.highScore = 0;
        this.bestHighScore = 0;
    }
}

class Raider{

    constructor(user, viewers) {
        this.user = user;
        this.viewers = viewers;
    }
}


class Subscriber{

    constructor(user, viewers) {
        this.user = user;
        this.streamMonths = streamMonths;
    }
}


class Cheerer{

    constructor(user, bits) {
        this.user = user;
        this.bits = bits;
    }
}

class Todo{

    constructor(id, description, status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }
}

class Reminder{

    constructor(name, message) {
        
        this.Name = name;
        this.Message = message;
        this.Status = ReminderStatusEnum.active;
        this.LastCheck = new Date();
    }
}

class TimeLog{
    
    constructor(user, message, time) {
        this.user = user;
        this.message = message;
        this.time = time;
    }
}

compareHightScore = function(a, b) {
    return a.highScore - b.highScore;
}

compareBestHightScore = function(a, b) {
    return a.bestHighScore - b.bestHighScore;
}

class StreamSession
{
    Project = function(value)
    {
        this.Project = value;
    }

    Id = function(value)
    {
        this.Id = value;
    }

    Init = function(){
        this.Id = 0;
        this.Project = "";
        this.DateTimeStart = "";
        this.DateTimeEnd = "";
        this.Notes = [];
        this.UserSession =  [];
        this.NewFollowers = [];
        this.Raiders = [];
        this.Subscribers = [];
        this.Hosts = [];
        this.Cheerers = [];
        this.TimeLogs = [];
        this.Todos = [];
        this.Reminders = [];
    }

    constructor() {
        this.Id = 0;
        this.Project = "";
        this.DateTimeStart = "";
        this.DateTimeEnd = "";
        this.Notes = [];
        this.UserSession =  [];
        this.NewFollowers = [];
        this.Raiders = [];
        this.Subscribers = [];
        this.Hosts = [];
        this.Cheerers = [];
        this.TimeLogs = [];
        this.Todos = [];
        this.Reminders = [];
    }
}

const SoundEnum = {
    yeah : "public/medias/yeah.mp3",
    bonjourHi : "public/medias/BonjourHi.mp3",
    badFeeling : "public/medias/badfeeling.mp3",
    doorknock: "public/medias/knocking-on-door.mp3",
    hmmhmm: "public/medias/hmmhmm.mp3"
};

const TodoStatusEnum = {
    new : "new",
    inProgress : "inProgress",
    done : "done",
    cancel: "cancel"
};

const ReminderStatusEnum = {
    active : "active",
    inactive : "inactive",
    done : "done"
};

getUserPosition = function(userName)
{
    console.log( "... Searching for: " + userName );
    for (i=0; i < _streamSession.UserSession.length; i++) {
        console.log( "... looking at : " + _streamSession.UserSession[i].user );
        if (_streamSession.UserSession[i].user === userName) {
            console.log( "... found in position: " + i );
            return i;
        }
    }
    _streamSession.UserSession.push(new UserSession(userName));
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

ChatBotShow = function(expression, imgText)
{

    const fileName = "CB-" + expression + ".gif";
    document.querySelector("#imageViewer").innerHTML = "<img src='public/medias/" + fileName + "' class='nuage'>";
    document.querySelector("#imageViewer").innerHTML += "<img src='public/medias/generated/" + imgText + "' class='textBubble'>";
    setTimeout(() => {  clean(); }, 5000);
}

sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

scores = function()
{
    console.log( "!scores was typed in chat" );
    const today = new Date();
    let cntScoreDisplayed = 1;

    var sortedUsers = _streamSession.UserSession.sort(compareHightScore);
    
    for ( i=0; i < sortedUsers.length; i++) {
        //console.log(`... checking: ${sortedUsers[i].user} --- d2: ${sortedUsers[i].lastUpdate}`);

        if(isSameDay(today, new Date(sortedUsers[i].lastUpdate))){
            const msg = `${sortedUsers[i].user} --> ${sortedUsers[i].highScore}`;
            setTimeout(() => {
                DisplayNotification( msg );
            }, cntScoreDisplayed++ * 1000); 
        }
        // else{
        //     console.log( `... Skipping ${sortedUsers[i].user}, didn't play today.`);
        // }
    }
    cloud("Wow");
}


isSameDay = function(d1, d2) {

    if((d1 instanceof Date) && (d2 instanceof Date)){
        return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    }
    return false;
}


UserLanded = function(user, curScore)
{
    let userPos = getUserPosition(user);

    if(userPos >= 0)
    {
        _streamSession.UserSession[userPos].landedCount++;

        if(_streamSession.UserSession[userPos].highScore < curScore)
        {
            console.log( "... New highscore " + curScore);
            _streamSession.UserSession[userPos].highScore = curScore;

            if(_streamSession.UserSession[userPos].bestHighScore < curScore)
            {
                _streamSession.UserSession[userPos].bestHighScore = curScore;
            }
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
        _streamSession.NewFollowers.push(user);
    }
}


DisplayNotification = function(title, message)
{
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-full-width",
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
        msg = `Tentative(s): ${_streamSession.UserSession[userPos].dropCount} <br />Landed: ${_streamSession.UserSession[userPos].landedCount} <br />Highest score: ${_streamSession.UserSession[userPos].highScore}`
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
    _streamSession.UserSession[userPos].dropCount++;
    _streamSession.UserSession[userPos].lastUpdate = new Date();
}



hello = function(user)
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
        //ChatBotSay(result.msg);

        setTimeout(() => {
            ChatBotShow('Thumbs-up', result.msg)
        }, 1000); 
        
    })
    .catch(error => {
        console.error('Error:', error);
    });

}



Attention = function(user, message)
{
    const data = {user: user, message: message};
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch('/Attention', options)
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
  
        setTimeout(() => {
            ChatBotShow('Thumbs-up', result.msg)
            playSound(SoundEnum.hmmhmm);
        }, 1000); 
        
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

addTodo = function(description)
{
    const cntTodos = _streamSession.Todos.length;

    _streamSession.Todos.push(new Todo(cntTodos + 1, description, TodoStatusEnum.new));
    RefreshTodosArea();
}


RefreshTodosArea = function()
{
    let htmlTodos = "";
    _streamSession.Todos.forEach(element => {
        htmlTodos += `<div class="todo ${element.status}">${element.id} - ${element.description}</div>`
    });  
    document.querySelector("#todoList").innerHTML = htmlTodos;
}

SetTodoStatus = function(id, status)
{
    let found = false;
    const max = _streamSession.Todos.length;

    console.log(`... searching for!: ${id}`);

    for(i = 0; i < max && !found; i++){
        console.log(`Look at: ${_streamSession.Todos[i].id} - ${_streamSession.Todos[i].status}`);
        if(_streamSession.Todos[i].id == id){
            console.log(`match!: ${_streamSession.Todos[i].id} - ${_streamSession.Todos[i].status}`);
            _streamSession.Todos[i].status = status;
            found = true;
        }
    }
    RefreshTodosArea();
}




addReminder = function(name, message)
{ 
    _streamSession.Reminders.push(new Reminder(name, message));
}



SetReminderStatus = function(name, status)
{
    let found = false;
    const max = _streamSession.Reminders.length;

    console.log(`... searching for!: ${name}`);

    for(i = 0; i < max && !found; i++){
        console.log(`Look at: ${_streamSession.Reminders[i].Name} - ${_streamSession.Reminders[i].Status}`);
        if(_streamSession.Reminders[i].id == id){
            console.log(`match!: ${_streamSession.Reminders[i].Name} - ${_streamSession.Reminders[i].Status}`);
            _streamSession.Reminders[i].Status = status;
            found = true;
        }
    }
}



SaveToFile = function(verbose = true)
{
    const data = {streamSession: _streamSession};
    //console.log('..c. data: ', data);
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch('/savetofile', options)
    .then(response => response.json())
    .then(result => {
        //console.log('Success:', result);
        if(verbose){
            ChatBotSay(result.msg);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}



LoadFromFile = async function(projectName, isReload, callback)
{
    
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }

    fetch('/loadfromfile', options)
    .then(response => response.json())
    .then(result => {
        console.log('session reveived from server side:', result);
        //console.log('...Trace:', Object.values(result));
        //_streamSession = Object.values(result);
        LoadStreamSession(result, projectName, isReload, callback);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}


LoadStreamSession = function(data, projectName, isReload, callback)
{
    _streamSession.Init();

    if(isReload == undefined || isReload == null){
        isReload = false;
        console.log('... this is not a reload!');
    }
        
    
    // loading users scores
    _streamSession.UserSession = data.UserSession.map((o) => { 
        const newUser = new UserSession(); 
        for (const [key, value] of Object.entries(o)) 
        { 
            newUser[key] = value; 
        } return newUser; 
    });

    if(callback !== undefined && callback !== null){
        callback(projectName);
    }
        
    if(isReload){
        // loading NewFollowers
        _streamSession.NewFollowers = data.NewFollowers;

        if(data.Raiders.length > 0){
            _streamSession.Raiders = data.Raiders.map((o) => { 
                const newRaider = new Raider(); 
                for (const [key, value] of Object.entries(o)) 
                { 
                    newRaider[key] = value; 
                } return newRaider; 
            });
        }

        if(data.TimeLogs.length > 0){
            _streamSession.TimeLogs = data.TimeLogs.map((o) => { 
                const newTimeLog = new TimeLog(); 
                for (const [key, value] of Object.entries(o)) 
                { 
                    newTimeLog[key] = value; 
                } return newTimeLog; 
            });
        }

        if(data.Todos.length > 0){
            _streamSession.Todos = data.Todos.map((o) => { 
                const newTodo = new Todo(); 
                for (const [key, value] of Object.entries(o)) 
                { 
                    newTodo[key] = value; 
                } return newTodo; 
            });
        }

        if(data.Reminders.length > 0){
            _streamSession.Reminders = data.Reminders.map((o) => { 
                const newReminder = new Todo(); 
                for (const [key, value] of Object.entries(o)) 
                { 
                    newReminder[key] = value; 
                } return newReminder; 
            });
        }

        _streamSession.Subscribers = data.Subscribers;
        _streamSession.Hosts = data.Hosts;
        _streamSession.Cheerers = data.Cheerers;
        _streamSession.Project = data.Project;
        _streamSession.DateTimeStart = data.DateTimeStart;
        _streamSession.Notes = data.Notes;
        _streamSession.Id = data.Id;
    }
    else{
        ResetHightScore();
    }

    console.log('done loading:', _streamSession);
}

playSound = function(fileName)
{
    var audio = new Audio(fileName);
    audio.play();
}


CheckReminders = function()
{
    _streamSession.Reminders.forEach(reminder => {
        console.log(`... looking at: ${reminder.Name}`);
        if( reminder.Status == ReminderStatusEnum.active){
            console.log(`... ${reminder.Name} is active`);
            reminder.LastCheck = new Date();
            ChatBotSay(reminder.Message);
        }
    });
}


ResetHightScore = function()
{
    console.log('... Resetting highScores');
    for (i=0; i < _streamSession.UserSession.length; i++) {
        _streamSession.UserSession[i].highScore = 0;
    }
}







// == Generate files =========================================
// ===

StreamNoteStart = async function(projectName)
{

    LoadFromFile(projectName, false, function(projectName){
        //console.log('.. the project name: ', projectName);
        //console.log('.. streamSession before : ', _streamSession);
        _streamSession.Project = projectName;
        _streamSession.DateTimeStart = new Date();
        _streamSession.Reminders.push(new Reminder("time", "What are we working on? Should I update the TimeLog of ToDos?"));
        //console.log('.. streamSession just after : ', _streamSession);
    });

}





StreamNoteStop = function()
{
    SaveToFile();
    let streamNotes = Generate_streamSessions();
    //console.log('Notes: ', streamNotes);
    SaveNotesToFile(streamNotes);
}


Generate_streamSessions = function()
{
    let streamNotes = "";

    //Project detail
    streamNotes += GenerateSessiontInfo();

    // Stream Details
    streamNotes += GenerateTimeLogSection();
    
    // Cloudies info
    streamNotes += GenerateCloudiesInfo();

    // Goal extra
    streamNotes += GenerateExtraInfo();
    return streamNotes;
}



GenerateSessiontInfo = function()
{
    let sessionSection = "\n### Project\n\n"
    sessionSection += "All the code for this project is available on GitHub: " + _streamSession.Project + " - https://github.com/FBoucher/" + _streamSession.Project + "\n";

    sessionSection += GenerateTodoSection();
    return sessionSection;
}



GenerateCloudiesInfo = function()
{
    let cloudiesSection = GenerateNewFollowerSection(); 
    cloudiesSection     += GenerateRaidersSection();
    cloudiesSection     += GenerateHostSection();
    cloudiesSection     += GenerateCheersSection();
    cloudiesSection     += GenerateParachuteSection();

    return cloudiesSection;
}


GenerateNewFollowerSection = function()
{
    if(_streamSession.NewFollowers.length > 0){
        let followerSection = "\n### New Followers\n\n"

        for(userName of _streamSession.NewFollowers)
        {
            followerSection += `- [@${userName}](https://www.twitch.tv/${userName})\n`;
        }

        return followerSection;
    }
    return "";
}


GenerateRaidersSection = function()
{
    if(_streamSession.Raiders.length > 0){
        let raidersSection = "\n### Raids\n\n"

        for(raider of _streamSession.Raiders)
        {
            raidersSection += `- [@${raider.user}](https://www.twitch.tv/${raider.user}) has raided you with a party of ${raider.viewers}\n`;
        }

        return raidersSection;
    }

    return "";
}


GenerateHostSection = function()
{
    if(_streamSession.Hosts.length > 0){
        let hostSection = "\n### Hosts\n\n"

        for(userName of _streamSession.Hosts)
        {
            hostSection += `- [@${userName}](https://www.twitch.tv/${userName})\n`;
        }

        return hostSection;
    }
    return "";
}



GenerateTodoSection = function()
{
    if(_streamSession.Todos.length > 0){
        let todoSection = "\n### TodDos\n\n"

        _streamSession.Todos.forEach(element => {
            const checkbox = (element.status == TodoStatusEnum.done) ? "[X]": "[ ]";
            const isCancelled = (element.status == TodoStatusEnum.cancel) ? "~": "";
            const isInProgress = (element.status == TodoStatusEnum.inProgress) ? "**": "";
            todoSection += `- ${isCancelled}${checkbox} ${isInProgress}${element.description}${isInProgress}${isCancelled}\n`;
        });

        return todoSection;
    }
    return "";
}




GenerateCheersSection = function()
{
    if(_streamSession.Cheerers.length > 0){
        let cheerersSection = "\n### Cheers\n\n"

        for(cheerer of _streamSession.Cheerers)
        {
            cheerersSection += `- [@${cheerer.user}](https://www.twitch.tv/${cheerer.user})  ${cheerer.bits} bits\n`;
        }

        return cheerersSection;
    }

    return "";
}


GenerateTimeLogSection = function()
{
    if(_streamSession.TimeLogs.length > 0){
        let timeLogsSection = "\n### TimeLogs\n\n"

        for(timeLog of _streamSession.TimeLogs)
        {
            timeLogsSection += `    ${timeLog.time} ${timeLog.message}\n`;
        }

        return timeLogsSection;
    }

    return "";
}


GenerateParachuteSection = function(){

    if(_streamSession.UserSession.length > 0){
        const today = new Date();
        let parachuteSection = "\n### Game Results\n\n"
        
        var sortedUsers = _streamSession.UserSession.sort(compareHightScore);

        for ( i=0; i < sortedUsers.length; i++) {
            if(isSameDay(today, new Date(sortedUsers[i].lastUpdate))){
                parachuteSection += `- [@${sortedUsers[i].user}](https://www.twitch.tv/${sortedUsers[i].user}): ${sortedUsers[i].highScore}\n`;
            }
        }
        return parachuteSection;
    }

    return "";
}


GenerateExtraInfo = function(){

    if(_streamSession.Notes.length > 0){
        let noteSection = "\n### Notes/ References / Snippets\n\n"

        for(note of _streamSession.Notes){
            noteSection += `- ${note}\n`;
        }
        return noteSection;
    }

    return "";
}



SaveNotesToFile = function(_streamSessions)
{
    const data = {id: _streamSession.Id, project: _streamSession.Project, notes: _streamSessions};
    console.log('..g. data: ', data);
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch('/genstreamnotes', options)
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        ChatBotSay(result.msg);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


CreateTimeLog = function(message, user){

    const now = new Date();
    const startTime = Date.parse(_streamSession.DateTimeStart);
    //console.log('startTime: ', startTime);

    const msec = Math.abs(now - startTime);   
    const seconds = Math.floor(msec / 1000);
    const minutes = Math.floor(seconds / 60 );
    const hours = Math.floor(minutes / 60 );
    
    const strHH = ("0" + hours% 60).substr(-2,2);
    const strMM = ("0" + minutes% 60).substr(-2,2);
    const strSS = ("0" + seconds% 60).substr(-2,2);
    
    const strTime = `${strHH}:${strMM}:${strSS}`
 
    console.log('strTime: ', strTime);

    _streamSession.TimeLogs.push(new TimeLog(user, message, strTime));
}

SavingNote = function(message){
    _streamSession.Notes.push(message);
}



// Twitch Events handling

LogRaid = function(user, viewers){
    
    _streamSession.Raiders.push(new Raider(user, viewers));
}


LogSub = function(user, message, subTierInfo, streamMonths, cumulativeMonths){

    cloud("Yeah");
    playSound(SoundEnum.yeah);
    _streamSession.Subscribers.push(new Subscriber(user, streamMonths));
}


LogHost = function(user, viewers, autohost, extra ){
    _streamSession.Hosts.push(user);
}


LogCheer = function( user, message, bits, flags, extra ){
    _streamSession.Cheerers.push( new Cheerer(user, bits));
}

