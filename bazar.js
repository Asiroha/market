class VidgukObject {
    constructor(user, vidgukR, vidguk){
        this.user = user
        this.vidgukR = vidgukR
        this.vidguk = vidguk
    }
}
let administrator = {
    name: "Власник Базару",
    ava: "https://tse1.mm.bing.net/th/id/OIP.r74Xykv0CJXTQbXJZa8NEwHaLG?w=1708&h=2560&rs=1&pid=ImgDetMain&o=7&rm=3",

}
administratorbot = {
    name: "БОТ",
    ava: "profil.png",

}
let usersAll = []
let users = []
let thisuser
function sms(avtor, text) {
    let avtorstatus = (avtor === administrator && avtor === administratorbot ) ? "АДМІНІСТРАЦІЯ" : "користувач";


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

sms(administrator ,'ви зарегалились вітаєм оащпо оавзшлп вапощап')
sms(administrator ,'ви зарегалились вітаєм')
let tovars = []

function saveTovarsToLocalStorage() {
  const simpleTovars = tovars.map(t => ({
    nametovar: t.nametovarsearch,
    pricetovar: t.pricetovar,
    userName: t.user.name,
    imgmasyv: t.imgmasyv,
    infotovar: t.infotovar
  }));
  localStorage.setItem('tovars', JSON.stringify(simpleTovars));
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
      tovars.push(restoredTovar);
      foundUser.tovars.push(restoredTovar);
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
}


function perehid(text, num) {
    const words = text.split(" ");
    for (let i = num; i < words.length; i += num + 1) {
        words.splice(i, 0, "<br>");
    }
    return words.join(" ");
}
function algorytm1(masyv){
    let alg1return = 0
    let alg1return2 = 0
    let alg1return3 = 0
    let alg1return4 = 0
    let algreturn = []
    for(let alg1 of masyv){
        alg1return += alg1
        if(alg1 >= 4 && alg1 <= 5){
            alg1return2 += 1
        }
        if(alg1 < 4 && alg1 >= 3){
            alg1return3 += 1
        }
        if(alg1 < 3){
            alg1return4 += 1
        }
    }
    alg1return = alg1return / masyv.length;
    algreturn = [alg1return.toFixed(1), alg1return2, alg1return3, alg1return4,]
    return algreturn;
}
function algorytm2(n1, n2, ng) {
    let alg2return = 0;
    let sum = 50 / (ng + n1 + n2);
    if (ng === 0) {
        alg2return = 60;
    } 
    else if(ng < n1 && ng < n2){
        alg2return = 80
    }
    else if(ng > n1 && ng > n2){
        alg2return = 150
    }
    else{
        alg2return = 110
    }
    return alg2return;
}


 
 
class User{
    constructor(name, ava, info, number, stash,
         prodash, reiting1, dialog, pasword, usAcc = 0){
        this.usAcc = usAcc
        this.pasword = pasword
        this.vidguky = []
        this.name = name
        this.ava = ava
        this.reiting1 = reiting1
        this.info = perehid(info, 4)
        this.number = number
        this.dialog = dialog
        this.prodash = prodash
        this.stash = stash
        this.tovars = []
        this.reitingS = reiting1
        this.reiting =  algorytm1(this.reitingS)
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
        this.reitingdisplay = document.createElement('div')
        this.reitingdisplay.innerHTML = `
        <h1></h1>
        <p></p>`
        this.historysale =  document.createElement('div')
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
                <p class='reting3'>${ Math.min(...this.reitingS)}/5.0 мінімальна оцінка</p>
                </div>
            </div>
        </div>
        <div class='poslygitovaru'>
            <p class="chatuserbut">чати з продавцем<img class="img1" src="sms.png"></p>
            <p class="nazad">назад до товару</p>
            <p class="historysaleuser">історія рейтингу<img class="img1" src="history.png"></p>
            <p class="vidgukuser">відгуки ?</p>
        </div>
    <div class='profiltovars'></div>`
        
        
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
        if(reitingpokupky >= 4 && reitingpokupky <= 5){
            ratingElement.querySelector('h2').style.background = 'rgb(1, 160, 1)'
        
        }
        if(reitingpokupky< 4 && reitingpokupky >= 3){
            ratingElement.querySelector('h2').style.background = 'rgb(201, 197, 0)'
        
        }
        if(reitingpokupky < 3){
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


    display(){
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
        if(this.reiting[0] >= 4 && this.reiting[0] <= 5){
            this.element.querySelector('.reting1').style.background = 'rgb(1, 160, 1)'
        
        }
        if(this.reiting[0] < 4 && this.reiting[0] >= 3){
            this.element.querySelector('.reting1').style.background = 'rgb(201, 197, 0)'
        
        }
        if(this.reiting[0] < 3){
            this.element.querySelector('.reting1').style.background = 'rgb(201, 0, 0)'
        
        }
        
        
        if(Math.max(...this.reitingS)>= 4 && Math.max(...this.reitingS) <= 5){
            this.element.querySelector('.reting2').style.background = 'rgb(1, 160, 1)'
        
        }
        if(Math.max(...this.reitingS) < 4 && Math.max(...this.reitingS) >= 3){
            this.element.querySelector('.reting2').style.background = 'rgb(201, 197, 0)'
        
        }
        if(Math.max(...this.reitingS) < 3){
            this.element.querySelector('.reting2').style.background = 'rgb(201, 0, 0)'
        
        }
        if(Math.min(...this.reitingS)>= 4 && Math.min(...this.reitingS) <= 5){
            this.element.querySelector('.reting3').style.background = 'rgb(1, 160, 1)'
        
        }
        if(Math.min(...this.reitingS)< 4 && Math.min(...this.reitingS) >= 3){
            this.element.querySelector('.reting3').style.background = 'rgb(201, 197, 0)'
        
        }
        if(Math.min(...this.reitingS) < 3){
            this.element.querySelector('.reting3').style.background = 'rgb(201, 0, 0)'
        
        }
    }
    chektovar(element){
        for (let tovar of this.tovars) {
            element.querySelector('.profiltovars').appendChild(tovar.element);
            }
    }
}
class Tovar {
    constructor(
        imgmasyv,
        nametovar, pricetovar, infotovar,  user
    ) {
        this.imgmasyv = imgmasyv
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
let s1 = [2, 4.3, 5, 4, 4, 3.7, 2.1];
let pomidorsp = ["https://auivf.com/wp-content/uploads/2019/05/tomatoes.jpg", "https://varus.ua/img/product/1140/1140/2561735"];
let boba = new User('бубу', 'https://ih1.redbubble.net/image.3460018834.0538/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
    'бубубубубубубуббві абаабабаа оооооооо', 
    1, 23,
    4234, [2, 4.3, 5, 4, 4, 3.7, 2.1, 4, 4, 4,5, 4.9, 2.1, 3.3], 99, '12345')
let pomidorka = new User('ПОМІДОР', 'https://auivf.com/wp-content/uploads/2019/05/tomatoes.jpg',
    'помідорка купуйте помідори', 
    1, 23,
    4234, [2, 4.3, 5, 4, 4, 3.7, 2.1, 4, 4, 4,5, 4.9, 2.1, 3.3], 99, '12345')
let pomidor = new Tovar(pomidorsp,  'tomato', 50, 'info', pomidorka)
let pomidor2 = new Tovar(pomidorsp,  'tomato2', 50, 'info', pomidorka)
let pomidor3 = new Tovar(pomidorsp,  'tomato2', 50, 'info', boba)
alltovars =  [pomidor, pomidor2, pomidor3]
usersAll = [pomidorka, boba]
loadUsersFromLocalStorage()
saveUsersToLocalStorage()
for(tovar of tovars){
    alltovars.push(tovar)
}
let loginfalse = 1
for(user of usersAll){
    if(user.usAcc === 1){
        thisuser = user
        loginfalse = 0
    }
}
document.querySelector('.startprofil').addEventListener('click', () => {
    storinka = 6
    if(loginfalse === 1){
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
    
    `}
    else{
    storinka = 8
    document.querySelector('.myAccaunt').innerHTML = `
    <h1>ваш акаунт<h1>
    <div class='usrow'>
            <img class="img4" src=${thisuser.ava}>
            <h1 class="nameprofil">${thisuser.name}</h1>
    </div>
    <div class="registinput">
        <input class="namezmina" placeholder="(нове ім'я)" type="text">
        <input class="namezmina" placeholder="(зображення профілю(посилання))" type="text">
        <input class="namezmina" placeholder="(нове описання)" type="text">
        <button class="createacc">змінити профіль</button>
    </div> 
    <h1>ваша статистика</h1>
    <div class='statistyk'>
        
    </div>
    <div class="poslygitovaru">
        <p class="login">Увійти</p>
        <p class="registr">зарегестрируватися</p>
    </div>
    <div class="poslygitovaru">
        <p class="nazad">до головної сторінки</p>
    </div> 
    `
    }
    document.querySelector('.login').addEventListener('click', () => {
        storinka = 7
        document.querySelector('.logininput').style.display = 'flex'
        document.querySelector('.registinput').style.display = 'none'
    document.querySelector('.loginacc').addEventListener('click', () => {
            if(document.querySelector('.namelogin').value){
                document.querySelector('.namelogin').style.border = "5px solid green"
            }
            else{
                document.querySelector('.namelogin').style.border = "5px solid red"
            }
            if(document.querySelector('.pasword').value){
                document.querySelector('.pasword').style.border = "5px solid green"
            }
            else{
                document.querySelector('.pasword').style.border = "5px solid red"
            }
    if(document.querySelector('.pasword').value && document.querySelector('.namelogin').value){
        let found = false;
        for(usr of usersAll){
            if(usr.name === document.querySelector('.namelogin').value){
                found = true;
                if(usr.pasword === document.querySelector('.pasword').value){
                    thisuser = usr;
                    storinka = 6
                    usr.usAcc = 1
                    saveUsersToLocalStorage()

                    displaystorynky();
                } else {
                    sms(administratorbot, 'пароль неправильний');
                }
            }
        }
        if (!found) {
            sms(administratorbot, 'користувача з таким ім`ям не існує');
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
            const validName = /^[A-Za-zА-Яа-яґҐєЄіІїЇ0-9\s]{6,18}$/.test(document.querySelector('.nameregistr').value);

            let paswordregistr = 0 
            const paswordreg = /^[A-Za-zА-Яа-яґҐєЄіІїЇ0-9\s]{6,30}$/.test(document.querySelector('.paswordregistr').value)
            if (number.length >= 9 && number.length <= 13) {
                    numberegistr =  document.querySelector('.numberegistr').value;
                    document.querySelector('.numberegistr').style.border = "5px solid green";
            } 
            else {
                    document.querySelector('.numberegistr').style.border = "5px solid red";
            }

            if (validName) {
                    nameregistr = document.querySelector('.nameregistr').value;
                    document.querySelector('.nameregistr').style.border = "5px solid green";
            } 
            else {
                    document.querySelector('.nameregistr').style.border = "5px solid red";
            }
            if (paswordreg) {
                    paswordregistr = document.querySelector('.paswordregistr').value;
                    document.querySelector('.paswordregistr').style.border = "5px solid green";
            } 
            else {
                    document.querySelector('.paswordregistr').style.border = "5px solid red";
            }
            if(paswordregistr && nameregistr && numberegistr){
                let stopadd1 = 1
                for(u of usersAll){
                    if(u.name === nameregistr){
                        sms(administratorbot, `Упс нажаль користувач з ім'ям ${nameregistr} вже є придумай щось нове`)
                        stopadd1 = 0
                        document.querySelector('.registinput').style.border = "5px solid red"
                    }
                }
                if(stopadd1 === 1){
                let imuser = new User(nameregistr, 'profil.png',
                    'Додайте інформацію', 
                    numberegistr, 'недавно',
                    0, [], 99, paswordregistr )
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

})


let animka1 = 0;
const searchbut = document.querySelector('.searchbut');
searchbut.addEventListener('click', () => {
    if (animka1 === 1) return;
    animka1 = 1;
    searchbut.style.marginRight = "500px";
    setTimeout(() => {
        searchbut.innerHTML = `<img class="img1" src="search.png" style="width: 30px;"><input type="text" class="searchinp" placeholder="ведіть назву товару">`;
        const input = document.querySelector('.searchinp');
        setTimeout(() => input.classList.add('show'), 50);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                alltovars.forEach(tovar => tovar.searchtovar(input));
                input.classList.remove('show');
                setTimeout(() => {
                    searchbut.innerHTML = `<img class="img1" src="search.png" style="width: 30px;">`;
                    searchbut.style.marginRight = "0px";
                    animka1 = 0;
                }, 300);
            }
        });
    }, 1000);
});
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
        usAcc:  u.usAcc,
        vidguky: u.vidguky.map(v => ({
            userName: v.user.name,
            vidgukR: v.vidgukR,
            vidguk: v.vidguk
        }))
    }));
    localStorage.setItem('users', JSON.stringify(simpleUsers));
}

function loadUsersFromLocalStorage() {
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    users = [];

    for (let item of usersData) {
        const user = new User(
            item.name,
            item.ava,
            item.info.replace(/<br>/g, ' '),
            item.number,
            item.stash,
            item.prodash,
            item.reiting1,
            item.dialog,
            item.pasword,
            item.usAcc,
        );
        users.push(user);
        usersAll.push(user)
        console.log(user)
    }

    for (let i = 0; i < usersData.length; i++) {
        const item = usersData[i];
        const user = users[i];

        user.vidguky = item.vidguky.map(v => {
            const foundUser = users.find(u => u.name === v.userName);
            return new VidgukObject(foundUser || { name: v.userName, ava: "" }, v.vidgukR, v.vidguk);
        });
    }
}

displaystorynky();
