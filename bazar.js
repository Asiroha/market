class VidgukObject {
    constructor(user, vidgukR, vidguk) {
        this.user = user
        this.vidgukR = vidgukR
        this.vidguk = vidguk
    }
}
let pd = 0
let stop2 = 0
let nopw = 1
let administrator = {
    name: "Власник Базару",
    ava: "https://tse1.mm.bing.net/th/id/OIP.r74Xykv0CJXTQbXJZa8NEwHaLG?w=1708&h=2560&rs=1&pid=ImgDetMain&o=7&rm=3",
}

let administratorbot = {
    name: "БОТ",
    ava: "profil.png",
}
let bots = []
let botsALL = []
let usersAll = []
let users = []
let thisuser = null
function sms(avtor, text) {
    let avtorstatus = (avtor === administrator || avtor === administratorbot) ? "АДМІНІСТРАЦІЯ" : "користувач";
    let smstext = perehid(text, 3);

    let smshtml = document.createElement('div');
    smshtml.className = 'sms';
    smshtml.innerHTML = `
      <div class="usrow">
          <img class="avatar2" src="${avtor.ava}">
          <p class="username1">${avtor.name}</p>
          <p class="avtorstatus">${avtorstatus}</p>
      </div>
      <p class='textsms'>${smstext}</p>
    `;

    let pole = document.querySelector('.smspole');
    pole.appendChild(smshtml);

    let allsms = pole.querySelectorAll('.sms');

    allsms.forEach((el, i) => {
        let indexFromLast = allsms.length - 1 - i;

        if (indexFromLast >= 1) {
            el.style.opacity = '0.7';
            el.style.transform = 'scale(0.85)';
        }
        if (indexFromLast >= 2) {
            el.style.opacity = '0.5';
            el.style.transform = 'scale(0.7)';
        }
        if (indexFromLast >= 3) {
            el.style.opacity = '0.3';
            el.style.transform = 'scale(0.5)';
        }
        if (indexFromLast >= 4) {
            el.remove(); 
        }
    });

    setTimeout(() => {
        smshtml.style.animation = 'opacityend 4s';
    }, 4500);

    setTimeout(() => {
        smshtml.remove();
    }, 8400);
}

let tovars = []

function saveTovarsToLocalStorage() {
    const simpleTovars = tovars.map(t => ({
        nametovar: t.nametovarsearch,
        pricetovar: t.pricetovar,
        userName: t.user.name,
        imgmasyv: t.imgmasyv,
        infotovar: t.infotovar,
    }));
    localStorage.setItem('tovars', JSON.stringify(simpleTovars));
}

function saveBotsToLocalStorage() {
    localStorage.setItem('bots', JSON.stringify(bots));
}
function loadBotsFromLocalStorage() {
    bots =  JSON.parse(localStorage.getItem('bots')) || [];
}
function chekbots(){
    for(let b of bots){
        for(let u of usersAll){
            if(b === u.name){
                botsALL.push(u)
            }
        }
    }
}
function SeeBots() {
    const botContainer = document.querySelector('.botall');
    botContainer.innerHTML = '';
    
    for(let bot of botsALL) {
        const botElement = document.createElement('div');
        botElement.className = 'htmlbot';
        botElement.innerHTML = `
            <img class='botimg' src="${bot.ava}">
            <p>${bot.name}</p>
        `;
        botElement.addEventListener('click', () => {
            for(let u of users){
                u.usAcc = 0
            }
            thisuser = bot
            storinka = 9
            displaystorynky()
            sms(thisuser, 'вітаємо ви увійшли на акаунт свого продавця-бота')
        });
        botContainer.appendChild(botElement);
    }
    
    if(botsALL.length === 0) {
        botContainer.innerHTML = '<p>No bots available</p>';
    }
}
function loadTovarsFromLocalStorage() {
    const tovarsData = JSON.parse(localStorage.getItem('tovars')) || [];
    
    for (let item of tovarsData) {
        const foundUser = users.find(u => u.name === item.userName);
        if (foundUser) {
            const restoredTovar = new Tovar(
                item.imgmasyv || ["default.png"],
                item.nametovar,
                item.pricetovar,
                item.infotovar || "без опису",
                foundUser
            );
            alltovars.push(restoredTovar);
            tovars.push(restoredTovar);
        }
    }
}

let storinka = 1
let numreiting = 0
let regbg = ['regbg.png', 'https://cdn.hudy.cz/images/w1920h1200-cover-2x/2/33652.jpg',
'https://live.staticflickr.com/65535/52535942118_92829ac578_b.jpg',
'https://i.etsystatic.com/27744849/r/il/08b82b/2916257755/il_fullxfull.2916257755_e7lc.jpg',
'https://wallpaper.forfun.com/fetch/34/3484413e87569d10be4dbbec88681ed4.jpeg'
]

let images = [];
regbg.forEach(src => {
    let img = new Image();
    img.src = src;
    images.push(img);
});

let index = 0;
let registerPole = document.querySelector('.registerpole');

function displaystorynky(){
    if(storinka === 1){
        document.querySelector('.place1').style.display = "flex"
        for (let tovar of alltovars) {
            tovar.display();
        }
        for (let tovar of alltovars) {
            tovar.user.tovars.push(tovar);
        }
    }
    else{
        document.querySelector('.place1').style.display = "none"
    }
    if(storinka === 2){
        document.querySelector('.tovarinfoall').style.display = "flex"
    }
    else{
        document.querySelector('.tovarinfoall').style.display = "none"
    }
    if(storinka === 3){
        document.querySelector('.profil').style.display = "flex"
    }
    else{
        document.querySelector('.profil').style.display = "none"
    }
    if(storinka === 4){
        document.querySelector('.historysale1').style.display = "flex"
    }
    else{
        document.querySelector('.historysale1').style.display = "none"
    }
    if(storinka === 5){
        document.querySelector('.vidguksall').style.display = "flex"
    }
    else{
        document.querySelector('.vidguksall').style.display = "none"
    }
    if(storinka === 6){
        document.querySelector('.myprofil').style.display = "flex"
    }
    else{
        document.querySelector('.myprofil').style.display = "none"
    }
    if(storinka === 7){
        document.querySelector('.registerpole').style.display = "flex"
        setInterval(() => {
            registerPole.style.backgroundImage = `url(${regbg[index]})`;
            index = (index + 1) % regbg.length;
        }, 2100);
    }
    else{
        document.querySelector('.registerpole').style.display = "none"
    }
    if(storinka === 8){
        document.querySelector('.myAccaunt').style.display = "flex"
    }
    else{
        document.querySelector('.myAccaunt').style.display = "none"
    }
    if(storinka === 9){
        document.querySelector('.chatspole').style.display = "flex"
    }
    else{
        document.querySelector('.chatspole').style.display = "none"
    }
    if(storinka === 10){
        document.querySelector('.liketovars').style.display = "flex";
        if(thisuser) thisuser.chekliketovars();
    }
    else{
        document.querySelector('.liketovars').style.display = "none"
    }
    if(storinka === 11){
        document.querySelector('.botnewwork').style.display = "flex";
        SeeBots()
    }
    else{
        document.querySelector('.botnewwork').style.display = "none"
    }
    if(storinka === 12){
        document.querySelector('.createtovarpack').style.display = "flex";
    }
    else{
        document.querySelector('.createtovarpack').style.display = "none"
    }
    if(storinka === 13){
        document.querySelector('.widgukcreate').style.display = "flex";
    }
    else{
        document.querySelector('.widgukcreate').style.display = "none"
    }
}
function perehid(text, num) {
    const words = text.split(" ");
    for (let i = num; i < words.length; i += num + 1) {
        words.splice(i, 0, "<br>");
    }
    return words.join(" ");
}

function algorytm1(masyv) {
    if (!masyv || masyv.length === 0) return [0, 0, 0, 0];
    
    let alg1return = 0
    let alg1return2 = 0
    let alg1return3 = 0
    let alg1return4 = 0
    
    for (let alg1 of masyv) {
        alg1return += alg1
        if (alg1 >= 4 && alg1 <= 5) {
            alg1return2 += 1
        }
        if (alg1 < 4 && alg1 >= 3) {
            alg1return3 += 1
        }
        if (alg1 < 3) {
            alg1return4 += 1
        }
    }
    
    alg1return = alg1return / masyv.length;
    return [alg1return.toFixed(1), alg1return2, alg1return3, alg1return4];
}

function algorytm2(n1, n2, ng) {
    let alg2return = 0;
    let sum = 50 / (ng + n1 + n2);
    
    if (ng === 0) {
        alg2return = 60;
    } 
    else if (ng < n1 && ng < n2) {
        alg2return = 80
    }
    else if (ng > n1 && ng > n2) {
        alg2return = 150
    }
    else {
        alg2return = 110
    }
    
    return alg2return;
}

class Thisusersmschat {
    constructor(thisusersms, user) {
        this.thisusersms = thisusersms
        this.user = user
        if (this.user === thisuser) {
            this.sms = document.createElement('div')
            this.smsdata = 'Mysms'
            this.sms.className = this.smsdata
            this.sms.innerHTML = `${thisusersms}`
        }
        else {
            this.sms = document.createElement('div')
            this.smsdata = 'userssms'
            this.sms.className = this.smsdata
            this.sms.innerHTML = `${thisusersms}`
        }
    }

    static fromJSON(json, users) {
        const foundUser = users.find(u => u.name === json.userName) || { name: json.userName, ava: json.userAva };
        return new Thisusersmschat(json.thisusersms, foundUser);
    }

    toJSON() {
        return {
            thisusersms: this.thisusersms,
            userName: this.user.name,
            userAva: this.user.ava
        };
    }
}

class Chat {
    constructor(user, user2) {
        this.user = user
        this.user2 = user2
        this.alldialog = []
        this.chatdisplay = document.createElement('div')
        this.chatdisplay.className = 'chatuser'
        this.chatdisplay.innerHTML = `
            <img class="chat-avatar" src="${user2.ava}">
            <h2>${user2.name}</h2>
        `;
        
        this.inputField = document.createElement('input');
        this.inputField.type = 'text';
        this.inputField.placeholder = 'напишить повідомлення';
        this.inputField.className = 'chat-input';
        
        this.sendButton = document.createElement('button');
        this.sendButton.textContent = 'відправити';
        this.sendButton.className = 'send-button';
        
        this.sendButton.addEventListener('click', () => {
            this.sendMessage();
        });
        
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    sendMessage() {
        const messageText = this.inputField.value.trim();
        if (messageText) {
            const newMessage = new Thisusersmschat(messageText, thisuser);
            this.alldialog.push(newMessage);
            this.displaysms();
            this.inputField.value = '';
            saveChatsToLocalStorage();
            
            this.user2.checkAutoResponses(messageText, this);
        }
    }

    displaysms() {
        const chatContainer = document.querySelector('.thischat');
        chatContainer.innerHTML = '';
        
        const messagesContainer = document.createElement('div');
        messagesContainer.className = 'messages-container';
        
        for (let smschat of this.alldialog) {
            messagesContainer.appendChild(smschat.sms);
        }
        
        chatContainer.appendChild(messagesContainer);
        
        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';
        inputContainer.appendChild(this.inputField);
        inputContainer.appendChild(this.sendButton);
        
        chatContainer.appendChild(inputContainer);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    display() {
        const myChats = this.user.chatsdisplay.querySelector('.mychats');
        if (!myChats.querySelector(`.chatuser[data-user="${this.user2.name}"]`)) {
            myChats.appendChild(this.chatdisplay);
            this.chatdisplay.setAttribute('data-user', this.user2.name);
            
            this.chatdisplay.addEventListener('click', () => {
                document.querySelector('.thischat').innerHTML = '';
                this.displaysms();
            });
        }
    }

    static fromJSON(json, users) {
        const user1 = users.find(u => u.name === json.user1Name) || { name: json.user1Name, ava: json.user1Ava };
        const user2 = users.find(u => u.name === json.user2Name) || { name: json.user2Name, ava: json.user2Ava };
        
        const chat = new Chat(user1, user2);
        chat.alldialog = json.alldialog.map(msg => Thisusersmschat.fromJSON(msg, users));
        return chat;
    }

    toJSON() {
        return {
            user1Name: this.user.name,
            user1Ava: this.user.ava,
            user2Name: this.user2.name,
            user2Ava: this.user2.ava,
            alldialog: this.alldialog.map(msg => msg.toJSON())
        };
    }
}

function saveChatsToLocalStorage() {
    if (!thisuser) return;
    
    const chatsData = thisuser.chats.map(chat => chat.toJSON());
    localStorage.setItem(`chats_${thisuser.name}`, JSON.stringify(chatsData));
}

function loadChatsFromLocalStorage() {
    if (!thisuser) return;
    
    const chatsData = JSON.parse(localStorage.getItem(`chats_${thisuser.name}`)) || [];
    thisuser.chats = chatsData.map(chatJson => Chat.fromJSON(chatJson, usersAll));
}

class AutoResponse {
    constructor(keyword, response) {
        this.keyword = keyword.toLowerCase();
        this.response = response;
    }

    matches(message) {
        return message.toLowerCase().includes(this.keyword);
    }
}

class User {
    constructor(name, ava, info, number, stash, prodash, reiting1, dialog, pasword, usAcc = 0, autoResponses = []) {
        this.autoResponses = autoResponses
        if (this.autoResponses.length === 0) {
            this.autoResponses = [
                new AutoResponse("привіт", "Привіт! Як справи?"),
                new AutoResponse("ціна", "Ціну можна знайти в описі товару."),
                new AutoResponse("доставка", "Доставка здійснюється протягом 1-3 днів."),
                new AutoResponse("дякую", "Будь ласка! Звертайтеся ще!")
            ];
        }
        
        this.usAcc = usAcc
        this.chats = []
        this.pasword = pasword
        this.vidguky = []
        this.name = name
        this.ava = ava
        this.reiting1 = reiting1 || []
        this.info = perehid(info, 4)
        this.number = number
        this.dialog = dialog
        this.prodash = prodash || 0
        this.stash = stash
        this.tovars = []
        this.reitingS = reiting1 || []
        this.reiting = algorytm1(this.reitingS)
        this.liketovars = []
        this.vidguksalldisplay = document.createElement('div')
        this.vidguksalldisplay.className = 'vidguks1'
        this.vidguksalldisplay.innerHTML = `<h1>відгуки про продавця</h1>
        <div class='poslygitovaru'>
        <p class="add">залишити відгук</p>
        <p class="nazad">назад до продавця</p>
        </div>
        <div class='addvidguk'>

        </div>
        `
        
        this.chatsdisplay = document.createElement('div')
        this.chatsdisplay.className = 'chatsdisplay'
        this.chatsdisplay.innerHTML = `
        <div class='mychats'>
            
        </div>
        <div class='thischat'>

        </div>
        `
        
        this.reitingdisplay = document.createElement('div')
        this.reitingdisplay.innerHTML = `
        <h1></h1>
        <p></p>`
        
        this.historysale = document.createElement('div')
        this.historysale.className = 'historysale'
        this.historysale.innerHTML = `<h1>оцінки проданих товарів</h1>
        <div class="addreitng">

        </div>
        <div class='poslygitovaru'>
        <p class="nazad">назад до продавця</p>
        </div>
        `
        
        this.element = document.createElement('div')
        this.element.className = 'user'
        this.element.innerHTML = `<div class='usrow'>
            <img class="img4" src=${this.ava}>
            <h1 class="nameprofil">${this.name}</h1>
        </div>
        <div class='usrow'>
            <div class='infostash'>
                <p>${this.name} на платформі ${this.stash} роки</p>
                <p>продано ${this.prodash} товарів</p>
            <div class="infostash">
                    <p class="ocinkytovaru1">${this.reiting[1]}</p>
                    <p class="ocinkytovaru2">${this.reiting[2]}</p>
                    <p class="ocinkytovaru3">${this.reiting[3]}</p>
                    <p>оцінки товарів</p>
            </div>
            </div>
            <div class="infostash">
                <div class="infouser">
                    <p>${this.info}
                    </p>
                </div>
                
                <div class="infostash">
                <p class='reting1'>${this.reiting[0]}/5.0 рейтинг</p>
                <p class='reting2'>${Math.max(...this.reitingS)}/5.0 максимальна оцінка</p>
                <p class='reting3'>${Math.min(...this.reitingS)}/5.0 мінімальна оцінка</p>
                </div>
            </div>
        </div>
        <div class='poslygitovaru'>
            <p class="nazad">назад до товару</p>
            <p class="historysaleuser">історія рейтингу<img class="img1" src="history.png"></p>
            <p class="vidgukuser">відгуки ?</p>
        </div>
        <div class='profiltovars'></div>`
    }

    toJSON() {
    return {
        name: this.name,
        ava: this.ava,
        info: this.info,
        number: this.number,
        stash: this.stash,
        prodash: this.prodash,
        reiting1: this.reitingS,
        dialog: this.dialog,
        pasword: this.pasword,
        usAcc: this.usAcc,
        vidguky: this.vidguky.map(v => ({
            userName: v.user.name,
            vidgukR: v.vidgukR,
            vidguk: v.vidguk
        })),
        autoResponses: this.autoResponses.map(ar => ({
            keyword: ar.keyword,
            response: ar.response
        })),
        likedTovarIds: this.liketovars.map(t => alltovars.indexOf(t))
    };
}

    static fromJSON(json) {
        const user = new User(
            json.name,
            json.ava,
            json.info,
            json.number,
            json.stash,
            json.prodash,
            json.reiting1,
            json.dialog,
            json.pasword,
            json.usAcc,
            json.autoResponses ? json.autoResponses.map(ar => new AutoResponse(ar.keyword, ar.response)) : []
        );
        
        user.vidguky = json.vidguky.map(v => {
            const foundUser = usersAll.find(u => u.name === v.userName) || { name: v.userName, ava: "" };
            return new VidgukObject(foundUser, v.vidgukR, v.vidguk);
        });
        
        return user;
    }

    checkAutoResponses(message, chat) {
        for (let response of this.autoResponses) {
            if (response.matches(message)) {
                setTimeout(() => {
                    const autoMessage = new Thisusersmschat(response.response, this);
                    chat.alldialog.push(autoMessage);
                    chat.displaysms();
                    saveChatsToLocalStorage();
                }, 1500);
                return true;
            }
        }
        return false;
    }

    chekchats() {
        for (let chatof of this.chats) {
            if (chatof && typeof chatof.display === 'function') {
                chatof.display();
            } else {
                console.warn("Некоректний об'єкт у чатах:", chatof);
            }
        }
    }
    
    displayvidgyk() {
        storinka = 5;
        document.querySelector('.vidguksall').innerHTML = ``
        document.querySelector('.vidguksall').appendChild(this.vidguksalldisplay);
        const container = this.vidguksalldisplay.querySelector('.addvidguk');
        container.innerHTML = ''; 

        for (let vidgukO of this.vidguky) {
            vidgukO.vidguk = perehid(vidgukO.vidguk, 5);
            if (vidgukO.vidgukR === 1) {
                vidgukO.vidgukR = 'позитивний';
            } else {
                vidgukO.vidgukR = 'негативний';
            }

            const vidgukDiv = document.createElement('div');
            vidgukDiv.className = 'vidguk';
            vidgukDiv.innerHTML = `
                <div class='usrow'>
                    <img class='avatar' src=${vidgukO.user.ava}>
                    <p>${vidgukO.user.name}</p>
                </div>
                <p>${vidgukO.vidguk}</p>
                <p class="vidgukR">${vidgukO.vidgukR}</p>
            `;

            container.appendChild(vidgukDiv);

            if (vidgukO.vidgukR === 'негативний') {
                vidgukDiv.querySelector('.vidgukR').style.color = 'red';
            } else {
                vidgukDiv.querySelector('.vidgukR').style.color = 'green';
            }
        }
        
        this.vidguksalldisplay.querySelector('.nazad').addEventListener('click', () => {
            storinka = 3;
            displaystorynky();
        });
        this.vidguksalldisplay.querySelector('.add').addEventListener('click', () => {
                storinka = 13
                displaystorynky()
        });
        document.querySelector('.addw').addEventListener('click', () => {
            if(thisuser){
                if(document.querySelector('.iaw').value){
                    this.vidguky.push(new VidgukObject(thisuser, nopw, document.querySelector('.iaw').value))
                }
            }
            
        });
        document.querySelector('.addn').addEventListener('click', () => {
            if(thisuser){
                nopw = 2
            }
            
        });
        document.querySelector('.addp').addEventListener('click', () => {
            if(thisuser){
                nopw = 1
            }
            
        });
        displaystorynky();
    }

    displayhistory() {
        const container = document.querySelector('.historysale1');
        container.innerHTML = '';
        container.appendChild(this.historysale); 
        
        storinka = 4;
        numreiting = 0;
        this.historysale.querySelector('.addreitng').innerHTML = '';

        for (let reitingpokupky of this.reitingS) {
            numreiting += 1;
            const ratingElement = document.createElement('div');
            ratingElement.className = 'reitingitem';
            ratingElement.innerHTML = `
                <h2>${reitingpokupky}</h2>
                <h2>${numreiting}</h2>
            `;
            this.historysale.querySelector('.addreitng').appendChild(ratingElement);
            
            if (reitingpokupky >= 4 && reitingpokupky <= 5) {
                ratingElement.querySelector('h2').style.background = 'rgb(1, 160, 1)'
            }
            else if (reitingpokupky < 4 && reitingpokupky >= 3) {
                ratingElement.querySelector('h2').style.background = 'rgb(201, 197, 0)'
            }
            else if (reitingpokupky < 3) {
                ratingElement.querySelector('h2').style.background = 'rgb(201, 0, 0)'
            }
            
            ratingElement.querySelector('h2').style.height = reitingpokupky * 60 + 'px'
        }

        this.historysale.querySelector('.nazad').addEventListener('click', () => {
            storinka = 3;
            displaystorynky();
        });

        displaystorynky();
    }

    display() {
        this.element.querySelector('.historysaleuser').addEventListener('click', () => {
            this.displayhistory()
            displaystorynky();
        });
        
        this.element.querySelector('.vidgukuser').addEventListener('click', () => {
            this.displayvidgyk()
        });
        
        this.element.querySelector('.nazad').addEventListener('click', () => {
            storinka = 2;
            displaystorynky();
        });
        
        document.querySelector('.profil').innerHTML = ''
        document.querySelector('.profil').appendChild(this.element)
        
        this.element.querySelector('.ocinkytovaru1').style.width = `${algorytm2(this.reiting[2], this.reiting[3], this.reiting[1])}px`;
        this.element.querySelector('.ocinkytovaru2').style.width = `${algorytm2(this.reiting[1], this.reiting[3], this.reiting[2])}px`;
        this.element.querySelector('.ocinkytovaru3').style.width = `${algorytm2(this.reiting[2], this.reiting[1], this.reiting[3])}px`;
        
        const setRatingStyle = (element, value) => {
            if (value >= 4 && value <= 5) {
                element.style.background = 'rgb(1, 160, 1)'
            }
            else if (value < 4 && value >= 3) {
                element.style.background = 'rgb(201, 197, 0)'
            }
            else if (value < 3) {
                element.style.background = 'rgb(201, 0, 0)'
            }
        }
        
        setRatingStyle(this.element.querySelector('.reting1'), this.reiting[0])
        setRatingStyle(this.element.querySelector('.reting2'), Math.max(...this.reitingS))
        setRatingStyle(this.element.querySelector('.reting3'), Math.min(...this.reitingS))
    }
    
    chektovar(element) {
        for (let tovar of this.tovars) {
            element.querySelector('.profiltovars').appendChild(tovar.element);
        }
    }
   chekliketovars() {

    this.liketovars = [];
    

    for(let tovar of alltovars) {
        if(tovar.like === 1) {

            if(!this.liketovars.some(lt => lt.nametovar === tovar.nametovar)) {
                this.liketovars.push(tovar);
            }
        }
    }
    

    document.querySelector('.korzinatovars').innerHTML = '';
    for(let lt of this.liketovars) {
        document.querySelector('.korzinatovars').appendChild(lt.element);
    }

    if(this.liketovars.length === 0) {
        document.querySelector('.korzinatovars').innerHTML = '<p>Кошик порожній</p>';
    }
}
}

class Tovar {
    constructor(imgmasyv, nametovar, pricetovar, infotovar, user) {
        this.imgmasyv = imgmasyv
        this.like = 0
        this.lengthimg = this.imgmasyv.length
        this.img = 0
        this.img1 = this.imgmasyv[this.img]
        this.nametovar = perehid(nametovar, 3)
        this.nametovarsearch = nametovar;
        this.pricetovar = pricetovar;
        this.infotovar = perehid(infotovar, 5);
        this.user = user;
        this.element = document.createElement('div');
        this.element.className = 'tovar';
        this.element.innerHTML = `
            <img class='imgtovar' src=${this.img1}>         
            <p class="nametovar">${this.nametovar} <br>
            ${this.pricetovar}грн<br>
            <img class='avatar' src=${this.user.ava}>
            ${this.user.name}</p>
        `;
    }
    
    updateDisplay() {
        this.img1 = this.imgmasyv[this.img];
        document.querySelector('.tovarinfoall').innerHTML = `
            <div class="thistovar">
                <div class="usrow">
                    <img class="avatar2" src="${this.user.ava}">
                    <p class="username1">${this.user.name}</p>
                </div>
                <img class="img3" src="${this.img1}">
                <div class="poslygitovaru">
                    <p class="pokupkabut">купити</p>
                     <p class="delkorzinabut">з корзини<img class="img1" src="korzina.png"></p>
                    <p class="korzinabut">у корзину <img class="img1" src="korzina.png"></p>
                    <p class="chatuserbut">чат з продавцем <img class="img1" src="sms.png"></p>
                    <p class="nazad">назад</p>
                </div>
            </div>

            <div class="thistovar">
                <p>${this.nametovar}</p>
                <p>${this.pricetovar} грн</p>
                <div class="opystovaru">
                    <h1>опис товару</h1>
                    <p>${this.infotovar}</p>
                </div>
            </div>
        `;
document.querySelector('.korzinabut').addEventListener('click', () => {
    if (!thisuser) {
        sms(administratorbot, 'Для додавання в корзину потрібно увійти в акаунт');
    } else {
        this.like = 1;
        thisuser.chekliketovars();
        sms(thisuser, 'Товар додано до кошика');
        saveUsersToLocalStorage()
    }
});

document.querySelector('.delkorzinabut').addEventListener('click', () => {
    if (!thisuser) {
        sms(administratorbot, 'Для видалення з корзини потрібно увійти в акаунт');
    } else {
        this.like = 0;
        thisuser.chekliketovars();
        sms(this.user, 'Білльше не роби так');
        saveUsersToLocalStorage()
    }
});
        document.querySelector('.nazad').addEventListener('click', () => {
            storinka = 1;
            displaystorynky();
        });
        
        document.querySelector('.avatar2').addEventListener('click', () => {
            storinka = 3;
            displaystorynky();
            this.user.display()
            this.user.chektovar(this.user.element)
        });
        
        document.querySelector('.img3').addEventListener('click', () => {
            this.img = (this.img + 1) % this.lengthimg;
            this.updateDisplay();
        });
        document.querySelector('.pokupkabut').addEventListener('click', () => {
        if (thisuser) {
                sms(this.user, 'посилка буде під вашими дверима через 3 дні чекайте')
            }
        else{
            sms(this.user, 'ви хто')
        }
        });
        document.querySelector('.chatuserbut').addEventListener('click', () => {
            if (!thisuser) {
                sms(administratorbot, 'Для використання чату потрібно увійти в акаунт');
                return;
            }
            
            let existingChat = thisuser.chats.find(chat => chat.user2.name === this.user.name);
            
            if (!existingChat) {
                existingChat = new Chat(thisuser, this.user);
                thisuser.chats.push(existingChat);
                
                let reciprocalChat = this.user.chats.find(chat => chat.user2.name === thisuser.name);
                if (!reciprocalChat) {
                    reciprocalChat = new Chat(this.user, thisuser);
                    this.user.chats.push(reciprocalChat);
                }
                
                saveChatsToLocalStorage();
            }
            
            storinka = 9;
            document.querySelector('.chatspole').appendChild(thisuser.chatsdisplay);
            displaystorynky();
            thisuser.chekchats();
            
            existingChat.displaysms();
        });
    }

    display() {
        document.querySelector('.market').appendChild(this.element);
        this.element.addEventListener('click', () => {
            storinka = 2;
            this.img = 0; 
            this.updateDisplay();
            displaystorynky();
        });
    }
    
    searchtovar(input) {
        if (this.nametovarsearch.toLowerCase().startsWith(`${input.value.toLowerCase()}`)) {
            this.element.style.display = "flex"
        } else {
            this.element.style.display = "none"
        }
    }
}

let alltovars = []

function saveUsersToLocalStorage() {
    const simpleUsers = users.map(u => ({
        name: u.name,
        ava: u.ava,
        info: u.info,
        number: u.number,
        stash: u.stash,
        prodash: u.prodash,
        reiting1: u.reitingS,
        dialog: u.dialog,
        pasword: u.pasword,
        usAcc: u.usAcc,
        vidguky: u.vidguky.map(v => ({
            userName: v.user.name,
            vidgukR: v.vidgukR,
            vidguk: v.vidguk
        })),
        autoResponses: u.autoResponses.map(ar => ({
            keyword: ar.keyword,
            response: ar.response
        })),
        // Зберігаємо лише ID товарів, які лайкнув користувач
        likedTovarIds: alltovars
            .filter(t => t.like === 1 && t.user.name === u.name)
            .map(t => alltovars.indexOf(t))
    }));
    localStorage.setItem('users', JSON.stringify(simpleUsers));

    const likesData = alltovars.map(t => ({
        id: alltovars.indexOf(t),
        like: t.like
    }));
    localStorage.setItem('tovarLikes', JSON.stringify(likesData));
}
function loadUsersFromLocalStorage() {
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    const likesData = JSON.parse(localStorage.getItem('tovarLikes')) || [];
    
    // Оновлюємо стан лайків для товарів
    likesData.forEach(likeData => {
        if (alltovars[likeData.id]) {
            alltovars[likeData.id].like = likeData.like;
        }
    });

    users = [];
    usersAll = [];

    for (let item of usersData) {
        const user = User.fromJSON(item);
        

        if (item.likedTovarIds) {
            user.liketovars = item.likedTovarIds
                .filter(id => alltovars[id])
                .map(id => alltovars[id]);
        }
        
        users.push(user);
        usersAll.push(user);
        
    }
    console.log(users)

}
function Setaccaunt() {
    if (!thisuser) {
        storinka = 6
        document.querySelector('.myprofil').innerHTML = `
        <h1>Нема акаунту</h1>
        <h2>зайдіть на свій акаунт</h2>
        <h3>Увійдіть в акаунт<br>
        або зарегестрируйтесь</h3>
        <div class="poslygitovaru">
            <p class="login">Увійти</p>
            <p class="registr">зарегестрируватися</p>
        </div>
        <div class="poslygitovaru">
            <p class="nazad">до головної сторінки</p>
        </div> 
        `
    }
    else {
        storinka = 8
        document.querySelector('.myAccaunt').innerHTML = `
        <div class='profil-div'>
            <div class='profil-divbloor'>
                <div class='usrow'>
                    <img class="img4" src=${thisuser.ava}>
                    <div class='uscolumn'>
                        <h1 class="nameprofil">${thisuser.name}</h1>
                        <div class="infouser">
                            <p>${thisuser.info}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='usrow'>
            <div class='uscolumnwidth50'>
                <div
                <div class="poslygitovaru">
                    <p class="seeprofil">мій профіль</p>
                    <p class="vidgukuser">відгуки</p>
                    <p class="historysaleuser">оцінки</p>
                </div>
                <div class="poslygitovaru">
                    <p class="login">Увійти</p>
                    <p class="registr">зарегестрируватися</p>
                </div>
            </div>
            <div class='uscolumnwidth50'>
                <input class="namezmina" placeholder="(нове ім'я)" type="text">
                <input class="avazmina" placeholder="(зображення профілю(посилання))" type="text">
                <input class="infozmina" placeholder="(нове описання)" type="text">
                <button class="zminacc">змінити профіль</button>
            </div>
        </div>
        <div class='uscenter'>
        <h1>ваші товари</hi>
        </div>
        <div class='profiltovars'>

        </div>
        `
        thisuser.chektovar(document.querySelector('.myAccaunt'))
        document.querySelector('.profil-div').style.backgroundImage = 
            `url(${thisuser.ava})`;
            
        document.querySelector('.zminacc').addEventListener('click', () => {
            if (document.querySelector('.namezmina').value) {
                thisuser.name = document.querySelector('.namezmina').value
            }
            if (document.querySelector('.avazmina').value) {
                thisuser.ava = document.querySelector('.avazmina').value
            }
            if (document.querySelector('.infozmina').value) {
                thisuser.info = document.querySelector('.infozmina').value
            }
            saveUsersToLocalStorage()
            Setaccaunt()
        })
        
        document.querySelector('.seeprofil').addEventListener('click', () => {
            thisuser.display()
            storinka = 3
            displaystorynky()
        })
        
        document.querySelector('.vidgukuser').addEventListener('click', () => {
            thisuser.displayvidgyk()
            storinka = 5
            displaystorynky()
        })
        
        document.querySelector('.historysaleuser').addEventListener('click', () => {
            thisuser.displayhistory()
            storinka = 4
        })
    }
    
    document.querySelector('.login').addEventListener('click', () => {
        storinka = 7
        document.querySelector('.logininput').style.display = 'flex'
        document.querySelector('.registinput').style.display = 'none'
        
        document.querySelector('.loginacc').addEventListener('click', () => {
            const nameInput = document.querySelector('.namelogin')
            const passInput = document.querySelector('.pasword')
            
            nameInput.style.border = nameInput.value ? "5px solid green" : "5px solid red"
            passInput.style.border = passInput.value ? "5px solid green" : "5px solid red"
            
            if (nameInput.value && passInput.value) {
                let found = false;
                for (let usr of usersAll) {
                    if (usr.name === nameInput.value) {
                        found = true;
                        if (usr.pasword === passInput.value) {
                            usersAll.forEach(user => user.usAcc = 0)
                            users.forEach(user => user.usAcc = 0)
                            thisuser = usr;
                            storinka = 6
                            usr.usAcc = 1
                            saveUsersToLocalStorage()
                            loadChatsFromLocalStorage()
                            displaystorynky()
                            return
                        } else {
                            sms(administratorbot, 'пароль неправильний')
                            return
                        }
                    }
                }
                if (!found) {
                    sms(administratorbot, 'користувача з таким ім`ям не існує')
                }
            }
        })
        displaystorynky()
    })
    
    document.querySelector('.registr').addEventListener('click', () => {
        storinka = 7
        document.querySelector('.registinput').style.display = 'flex'
        document.querySelector('.logininput').style.display = 'none'
        
        document.querySelector('.createacc').addEventListener('click', () => {
            let numberegistr = 0
            let number = document.querySelector('.numberegistr').value.split("").filter(c => /\d/.test(c))
            
            let nameregistr = 0 
            const validName = /^[A-Za-zА-Яа-яґҐєЄіІїЇ0-9\s]{6,18}$/.test(document.querySelector('.nameregistr').value)

            let paswordregistr = 0 
            const paswordreg = /^[A-Za-zА-Яа-яґҐєЄіІїЇ0-9\s]{6,30}$/.test(document.querySelector('.paswordregistr').value)
            
            if (number.length >= 9 && number.length <= 13) {
                numberegistr = document.querySelector('.numberegistr').value
                document.querySelector('.numberegistr').style.border = "5px solid green"
            } 
            else {
                document.querySelector('.numberegistr').style.border = "5px solid red"
            }

            if (validName) {
                nameregistr = document.querySelector('.nameregistr').value
                document.querySelector('.nameregistr').style.border = "5px solid green"
            } 
            else {
                document.querySelector('.nameregistr').style.border = "5px solid red"
            }
            
            if (paswordreg) {
                paswordregistr = document.querySelector('.paswordregistr').value
                document.querySelector('.paswordregistr').style.border = "5px solid green"
            } 
            else {
                document.querySelector('.paswordregistr').style.border = "5px solid red"
            }
            
            if (paswordregistr && nameregistr && numberegistr) {
                let stopadd1 = true
                for (let u of usersAll) {
                    if (u.name === nameregistr) {
                        sms(administratorbot, `Упс нажаль користувач з ім'ям ${nameregistr} вже є придумай щось нове`)
                        stopadd1 = false
                        document.querySelector('.registinput').style.border = "5px solid red"
                        break
                    }
                }
                
                if (stopadd1) {
                    let imuser = new User(
                        nameregistr, 
                        'profil.png',
                        'Додайте інформацію', 
                        numberegistr, 
                        'недавно',
                        0, 
                        [], 
                        99, 
                        paswordregistr
                    )
                    
                    usersAll.push(imuser)
                    users.push(imuser)
                    saveUsersToLocalStorage()
                    document.querySelector('.registinput').style.border = "5px solid green"
                }
            }
        })
        displaystorynky()
    })
    

    
    displaystorynky()
}

let stopbot = 0
let alldialogbot = []
let dialogbot = []
let returnalldialog = []
let dialogbotcomand = []
document.querySelector('.adddialog').addEventListener('click', () => {
    if(thisuser){
        dialogbot = []
        if(document.querySelector('.dialog1bot').value && document.querySelector('.dialog2bot').value){
            dialogbot = [document.querySelector('.dialog1bot').value, document.querySelector('.dialog2bot').value]
            alldialogbot.push(dialogbot)
        }
        else{
            sms(thisuser, 'для створення відповіді продавця треба заповнити 2 поля а точніше повідомлення користувача та відповідь продавця')
        }
    }
    else{
        sms(administrator, 'ви не зарегались')
    }
})
let imgtovardd = []
document.querySelector('.but12').addEventListener('click', () => {
    storinka = 12
    displaystorynky()
    imgtovardd = []
})
document.querySelector('.imgtovaradd').addEventListener('click', () => {
    if(thisuser){
    if(document.querySelector('.imgtovarcreate').value){
        imgtovardd.push(document.querySelector('.imgtovarcreate').value)
        console.log(imgtovardd)
    }
    else{
        sms(thisuser, 'додайте посилання на зображееня')
    }}
    else{
        sms(administrator, 'зарегайтесь')
    }
})
document.querySelector('.createtovarbut').addEventListener('click', () => {
    if(thisuser){
        if(document.querySelector('.nametovarcreate').value && 
    document.querySelector('.infotovarcreate').value && 
    document.querySelector('.pricetovarcreate').value){
       if (imgtovardd.length >= 1){
            let newtovar = new Tovar(imgtovardd, document.querySelector('.nametovarcreate').value,
            document.querySelector('.pricetovarcreate').value,
            document.querySelector('.infotovarcreate').value, thisuser)
            tovars.push(newtovar)
            alltovars.push(newtovar)
            imgtovardd = []
         saveTovarsToLocalStorage()
         saveUsersToLocalStorage()
        }
        else{
            sms(thisuser, 'додайте мінімум 2 зображення')
        }
        
        }
        else{
            sms(thisuser, 'заповніть усі поля')
        }
    }
    else{
        sms(administrator, 'зарегайтесь')
    }
})
document.querySelector('.addbot').addEventListener('click', () => {
    if(thisuser){
        stopbot = 0
        if(document.querySelector('.namebot').value, document.querySelector('.avabot').value,
         document.querySelector('.paswordbot').value, document.querySelector('.opysbot').value){
            if(alldialogbot.length < 1)
            {
                sms(thisuser, 'для створення продавця потрібно додати не менше 2 діалогів')
            }
            else{
                for(let u of usersAll){
                    if(u.name === document.querySelector('.namebot').value){
                        sms(thisuser, `користувач ${document.querySelector('.namebot').value}, вже є`)
                        stopbot = 1
                    }

                }
                if(stopbot === 0){
                        returnalldialog = []
                        dialogbotcomand = []
                        for(let d of alldialogbot){
                            returnalldialog.push(
                                new AutoResponse(d[0], d[1])
                            )
                            dialogbotcomand.push(d[0])
                        }
                        returnalldialog.push(
                                new AutoResponse(`діалог`, `${document.querySelector('.namebot').value} відповідає на ${dialogbotcomand}, діалог`)
                            )
                        let bot = new User(document.querySelector('.namebot').value, document.querySelector('.avabot').value,
                        document.querySelector('.opysbot').value,
                        12121212, 0, 0, [0], 99, document.querySelector('.paswordbot').value, 0, returnalldialog)
                        users.push(bot)
                        usersAll.push(bot)
                        bots.push(bot.name)
                        botsALL.push(bot)
                        saveBotsToLocalStorage()
                        saveUsersToLocalStorage()
                        SeeBots()
                        stopbot = 0
                        sms(bot, 'УВАГА не використовуйте бота як свій основний акаунт безпечність бота не гарантована не використовуйте свої основні дані для регистраціі продавця якщо вже дані бота такіж самі що і ваші то створіть нового бота а цим не користуйтесь !!!!!!')
                        
                    }
            }
         }
         else{
            sms(thisuser, 'для створення продавця потрібно заповнити усі поля опис пароль ім`я аватар ')
         }
    }
    else{
        sms(administrator, 'ви не зарегались')
    }
})
document.querySelector('.startprofil').addEventListener('click', Setaccaunt)
document.querySelector('.likebtn').addEventListener('click', () => {
    if (!thisuser) {
        sms(administratorbot, 'щоб дивитись корзину треба увійти в акаунт');
        return;
    }
    else{
        storinka = 10
        displaystorynky()
    }
})
document.querySelector('.home').addEventListener('click', () => {
    storinka = 1
    displaystorynky()
})
let animka1 = 0
const searchbut = document.querySelector('.searchbut')
searchbut.addEventListener('click', () => {
    if (animka1 === 1) return
    animka1 = 1
    searchbut.style.marginRight = "500px"
    
    setTimeout(() => {
        searchbut.innerHTML = `<img class="img1" src="search.png" style="width: 30px;"><input type="text" class="searchinp" placeholder="ведіть назву товару">`
        const input = document.querySelector('.searchinp')
        setTimeout(() => input.classList.add('show'), 50)
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                alltovars.forEach(tovar => tovar.searchtovar(input))
                input.classList.remove('show')
                setTimeout(() => {
                    searchbut.innerHTML = `<img class="img1" src="search.png" style="width: 30px;">`
                    searchbut.style.marginRight = "0px"
                    animka1 = 0
                }, 300)
            }
        })
    }, 1000)
})
document.querySelector('.butbott1').addEventListener('click', () => {
    storinka = 11
    displaystorynky()
})

document.querySelector('.chatsbtn').addEventListener('click', () => {
    if (!thisuser) {
        sms(administratorbot, 'Для використання чату потрібно увійти в акаунт')
        return
    }
    
    storinka = 9
    document.querySelector('.chatspole').appendChild(thisuser.chatsdisplay)
    displaystorynky()
    thisuser.chekchats()
})

let menustan = 0
document.querySelector('.menubut').addEventListener('click', () => {
    if(menustan === 0){
        menustan = 1
        document.querySelector('.menupack').style.display = 'flex'
         document.querySelector('.menupack').style.width = '70%'
    }
    else{
        menustan = 0
        document.querySelector('.menupack').style.display = 'none'
        document.querySelector('.menupack').style.width = '100%'
    }
})
let s1 = [2, 4.3, 5, 4, 4, 3.7, 2.1]
let pomidorsp = ["https://auivf.com/wp-content/uploads/2019/05/tomatoes.jpg", "https://varus.ua/img/product/1140/1140/2561735"]

let boba = new User(
    'бубу', 
    'https://ih1.redbubble.net/image.3460018834.0538/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
    'бубубубубубубуббві абаабабаа оооооооо', 
    1, 
    23,
    4234, 
    [2, 4.3, 5, 4, 4, 3.7, 2.1, 4, 4, 4, 5, 4.9, 2.1, 3.3], 
    99, 
    '12345', 
    0,
    [
        new AutoResponse("бубу", "Бубу бу бубубу!"),
        new AutoResponse("продаж", "Я зайнятий продажем помідорів, напишіть пізніше.")
    ]
)

let pomidorka = new User(
    'ПОМІДОР', 
    'https://auivf.com/wp-content/uploads/2019/05/tomatoes.jpg',
    'помідорка купуйте помідори', 
    1, 
    23,
    4234, 
    [2, 4.3, 5, 4, 4, 3.7, 2.1, 4, 4, 4, 5, 4.9, 2.1, 3.3], 
    99, 
    '12345', 
    0,
    [
        new AutoResponse("помідор", "Свіжі помідори по 50 грн за кг!"),
        new AutoResponse("куплю", "Я можу вам допомогти з покупкою помідорів."),
        new AutoResponse("допобаченя", "пака.")
    ]
)
let poroshenko = new User(
    'Петро Порошенко', 
    'https://tse4.mm.bing.net/th/id/OIP.OLQOFqIN8XfTk8mxzOBVngHaD-?rs=1&pid=ImgDetMain&o=7&rm=3',
    'маю свою фабрику ROSHEN дарую кожному хто проголусує за мене 2 шоколадки і 200г цукерок корівка', 
    1, 
    23,
    4234, 
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4.7, 4.5, 4.9, 4, 4, 3, 2], 
    99, 
    '12345', 
    0,
    [
        new AutoResponse("порошенко", "шо за нєуважєнія ка мнє"),
        new AutoResponse("Порошенко", "шо"),
        new AutoResponse("Петро", "шо за нєуважєнія ка мнє"),
        new AutoResponse("петро", "ти це мені?????????????????"),
        new AutoResponse("ціна цукерок", "ти шо сліпий"),
        new AutoResponse("асортимент", "асортимент цукерок корівка, бджілка, молочний стакан, і багато інших також в нас є шоколадки пузиристий, з начинкою, щє є печиво абсолютно різне на ваш вибір"),
        new AutoResponse("цукерки", "асортимент цукерок корівка, бджілка, молочний стакан, і багато іншого"),
        new AutoResponse("знижки", "знижки діють на весь шоколаді цукерки корівка"),
        new AutoResponse("а для мене знижки", "для тебе в атб знижки -50% на хімічні відходи а в нас роскош"),
        new AutoResponse("фабрика", "Фабрика ROSHEN працює навіть уночі"),
        new AutoResponse("вибори", "Я все ще чекаю на твій голос"),
        new AutoResponse("президент", "Так, був колись і я..."),
        new AutoResponse("шоколад", "Пузиристий, з начинкою, темний, білий – який бажаєш?"),
        new AutoResponse("діалог", "порошенко відповідає тільки на діалог: порошенко, Порошенко, Петро, петро, ціна цукерок, асортимент, знижки, а для мене знижки, фабрика, вибори, президент, шоколад"),
    ]
);
let zelensky = new User(
    'Володимир Зеленський',
    'https://tse3.mm.bing.net/th/id/OIP.j3opIhdM4cMmjKSAdz8XEAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    'Я вам нічого не обіцяв, але дам знижку на квитки на "Квартал 95"',
    2,
    35,
    6789,
    [5, 4.5, 5, 5, 5, 4.7, 4.8],
    100,
    'servant2024',
    0,
    [
        new AutoResponse("Зеленський", "Шо трапилось, народ?"),
        new AutoResponse("Вова", "Я не Вова, я Президент"),
        new AutoResponse("квартал", "Квитки вже у продажу!"),
        new AutoResponse("цукерки", "Я не кондитер, то не до мене"),
        new AutoResponse("95", "Сміятись дозволено"),
        new AutoResponse("слуга", "Слуга народу вже тут"),
        new AutoResponse("президент", "Так, це я"),
        new AutoResponse("комік", "Коміки теж можуть керувати"),
        new AutoResponse("пісні", "Можу і заспівати, якщо треба"),
        new AutoResponse("діалог", "Зеленський відповідає тільки на діалог: Зеленський, Вова, квартал, цукерки, 95, слуга, президент, комік, пісні"),
    ]
);
let tymoshenko = new User(
    'Юлія Тимошенко',
    'https://th.bing.com/th/id/R.71d3648c85ac773817ea4b04c2767857?rik=wdsaWuJOVoXIAw&riu=http%3a%2f%2fpolitrussia.com%2fupload%2fiblock%2fa80%2fa8084cae6ecbe905fe3c7b506cace88e.jpg&ehk=mlR0P5XQdhsNguFliBavTApm3DKbg2W7%2b5j4Rp7X0jg%3d&risl=&pid=ImgRaw&r=0',
    'Коса — то сила. Купуй газ за старими цінами!',
    3,
    27,
    3120,
    [3.5, 4, 4.2, 4, 3.8, 4.1],
    101,
    'gazzakosa',
    0,
    [
        new AutoResponse("Тимошенко", "Я за народ!"),
        new AutoResponse("газ", "Ціни зафіксовані ще з 2009 року"),
        new AutoResponse("Юля", "Я ще тут"),
        new AutoResponse("коса", "Моя суперсила 💇‍♀️"),
        new AutoResponse("вибори", "Знову йду!"),
        new AutoResponse("реформи", "Обіцяю й обіцяю"),
        new AutoResponse("опозиція", "Моя улюблена позиція"),
        new AutoResponse("діалог", "тимошенко відповідає тільки на діалог: Тимошенко, газ, Юля, коса, вибори, реформи, опозиція"),
    ]
);
let yanukovych = new User(
    'Віктор Янукович',
    'https://img.pravda.com/images/doc/d/9/d987980-yanyk.jpg',
    'Мєдвєд, страус і золотий батон — все ще зі мною!',
    5,
    0,
    666,
    [1, 2, 1.5, 1.2, 2.1],
    103,
    'mezhyhirya',
    0,
    [
        new AutoResponse("Янукович", "Я в Ростові, не турбуй"),
        new AutoResponse("батон", "То не я брав"),
        new AutoResponse("страус", "Живий!"),
        new AutoResponse("втеча", "Я не втікав, я евакуювався"),
        new AutoResponse("Мєдвєд", "Домашній"),
        new AutoResponse("діалог", "янукович відповідає тільки на діалог: Янукович, батон, страус, втеча, Мєдвєд"),
    ]
);
let prodavec1 = new User(
    'Користувач',
    'https://luckylabrador.de/wp-content/uploads/2024/05/Lucky-Labrador-Retriever-Ratgeber-Blog-21.jpg',
    'не придумав',
    5,
    0,
    666,
    [4, 5, 4, 3],
    103,
    'mezhyhirya',
    0,
    [
        new AutoResponse("Привіт", "пишіть по ділу"),
         new AutoResponse("навушники", "навушники файні недорогі можу зробити знижку 20%"),
        new AutoResponse("діалог", "Користувач відповідає тільки на діалог: Привіт, навушники"),
    ]
);
let prodavec2 = new User(
    'Сантехнік',
    'https://tse1.mm.bing.net/th/id/OIP.tu59wY3HzRn5GxTvk5zgDAHaDS?rs=1&pid=ImgDetMain&o=7&rm=3',
    'не придумав',
    5,
    0,
    666,
    [4, 5, 4, 3],
    103,
    'mezhyhirya',
    0,
    [
        new AutoResponse("Привіт", "треба труби починити"),
        new AutoResponse("Труби", 'ціна від 400-1000 від сітуації'),
        new AutoResponse("Проводка", 'ціна від 400-1000 від сітуації'),
        new AutoResponse("діалог", "prodavec2 відповідає тільки на діалог: Привіт, Труби, діалог, Проводка"),
    ]
);

let pomidor = new Tovar(pomidorsp, 'tomato', 50, 'info', pomidorka)
let pomidor2 = new Tovar(pomidorsp, 'tomato2', 50, 'info', pomidorka)
let pomidor3 = new Tovar(pomidorsp, 'tomato2', 50, 'info', boba)

usersAll = [pomidorka, boba, poroshenko, yanukovych, tymoshenko, zelensky]
alltovars = [pomidor, pomidor2, pomidor3,
    new Tovar(['https://s1.1zoom.ru/big0/241/Headphones_Reflection_Black_background_586911_1280x1024.jpg',
     ]
    , 'навушники huawei', 870, 'навушники оріх на базарі покупав причина продажі колір не сподобався.', prodavec1),
    new Tovar(
    [
       "https://www.datocms-assets.com/23036/1677763124-wykop-pod-rure-drenazowa.jpg"
    ],
    'чиню труби недорого',
    0.99,
    'чиню труби недорого',
    prodavec2
    ),

    new Tovar(
    [
       "https://ukrnova.com/images/2021/11/13/624202_large.jpg"
    ],
    'проводка недорого',
    0.99,
    'проводка недорого',
    prodavec2
    ),

     new Tovar(['https://e-delikatesydwojka.pl/app/uploads/2019/12/cukierki-roshen-milky-splash-1-kg-600x600.jpg',
     ]
    , 'цукерки стакан молока 100г', 20, 'смачні цукерки я сам провіряв', poroshenko),
    new Tovar(['https://i5.walmartimages.com/seo/Roshen-Romashka-with-Cream-Brulee-Cocoa-Filling-Delicious-Flavorful-Sweets-Bulk-Gourmet-Chocolate-Candy-4-4lb-2kg_e95250cb-f10d-447c-966b-7a4f3bd9cb87.13ade57003c3534ee357b3512c407382.jpeg?odnHeight=580&odnWidth=580&odnBg=FFFFFF',
     ]
    , 'цукерки ромашка 100г', 30, 'цукерки для олігархів і корупцеонерів як я', poroshenko),
     new Tovar(['https://www.kuri.com.pl/img/products/18/44/2_max.jpg',
        'https://tse4.mm.bing.net/th/id/OIP.h-eTlkMbzkdNURhI5T5jrQHaFF?rs=1&pid=ImgDetMain&o=7&rm=3',
        'https://www.elukmar.pl/userdata/public/gfx/3931/krowka4.jpg'
     ]
    , 'цукерки корівка 100г', 25, 'діє знижка 15%', poroshenko) ,
     new Tovar(
    [
'https://soyztm.kz/wp-content/uploads/2023/04/toilet-paper-65.jpg'
    ],
    'DVD “Квартал 95: Золотий випуск”',
    120,
    'при купівлі 2 — третій безкоштовно!',
    zelensky

    ),
    new Tovar(
    [
    "https://ireland.apollo.olxcdn.com/v1/files/eyc2rih23tp11-UA/image;s=3000x4000",
    ],
    'газ у балонах (патріотичний)',
    320,
    'акційна ціна від Юлі',
    tymoshenko
    ),
    new Tovar(
    [
       "https://4party.ua/upload/iblock/b20/zolotoy_baton_yanukovicha_kopilka.jpg"
    ],
    'золотий батон сувенірний',
    999,
    'тільки для обраних, в наявності 1 шт.',
    yanukovych
    ),

]

loadUsersFromLocalStorage()
loadTovarsFromLocalStorage()
loadBotsFromLocalStorage()
chekbots()
for (let user of usersAll) {
    if (user.usAcc === 1) {
        thisuser = user
        break
    }
}


if (thisuser) {
    loadChatsFromLocalStorage()
    saveChatsToLocalStorage()
    
}


displaystorynky()


sms(administrator, 'ви зарегалились вітаєм оащпо оавзшлп вапощап')
sms(administrator, 'ви зарегалились вітаєм')