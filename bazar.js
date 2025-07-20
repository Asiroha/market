class VidgukObject {
    constructor(user, vidgukR, vidguk){
        this.user = user
        this.vidgukR = vidgukR
        this.vidguk = vidguk
    }
}
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
function displaystorynky(){
if(storinka === 1){
     document.querySelector('.place1').style.display = "flex"
    for (let tovar of alltovars) {
        tovar.display();

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
        for (let tovar of alltovars) {
        tovar.user.tovars.push(tovar);

    }
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
         prodash, reiting1, dialog){
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
    chektovar(){
        for (let tovar of this.tovars) {
            this.element.querySelector('.profiltovars').appendChild(tovar.element);
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
                    <img class='avatar2' src=${this.user.ava}>
                    <p class="username1">${this.user.name}</p>
                </div>
                <img class="img3" src=${this.img1}>
                <div class="poslygitovaru">
                    <p class="pokupkabut">купити</p>
                    <p class="korzinabut">у корзину <img class="img1" src='korzina.png'></p>
                    <p class="chatuserbut">чат з продавцем<img class="img1" src="sms.png"></p>
                    <p class="nazad">назад</p>
                </div>
            </div>
            <div class="thistovar">
                <p>${this.nametovar}</p>
                <p>${this.pricetovar}грн</p>
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
            this.user.chektovar()
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
let pomidorka = new User("помідорка", pomidorsp[0], "info", 0, 23, 23, [2, 4.5, 2, 5, 5, 5, 5, 2.7, 4, 4, 2], 456);
let bubu = new User("бубу", "https://ih1.redbubble.net/image.3460018834.0538/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg", "бубубубубубубуббві абаабабаа оооооооо", 0, 23, 23, s1, 98);
let bubu2 = new User("бубу", "https://ih1.redbubble.net/image.3460018834.0538/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg", "бубубубубубубуббві абаабабаа оооооооо", 0, 12, 20, [1, 2, 3, 4, 5,], 98);
let users = [bubu2]
let pomidor3 = new Tovar(pomidorsp, "Помідори3", 20, "Опис товару", bubu2);
let usersAll = [bubu, pomidorka]
let pomi = new Tovar(pomidorsp, "Помідори смачні", 50, "Опис товару", bubu);
    let pomidor = new Tovar(pomidorsp, "Помідори смачні", 50, "Опис товару", pomidorka);
    let pomidor2 = new Tovar(pomidorsp, "Помідори", 20, "Опис товару", pomidorka);
    alltovars.push(pomi, pomidor, pomidor2);
    bubu.tovars.push(pomi);
    pomidorka.tovars.push(pomidor, pomidor2);
    bubu.vidguky = [new VidgukObject(pomidorka, 2, 'в мене краще і вопще ти в мене вкрав шахрай'),
        new VidgukObject(pomidorka, 2, 'ставте йому погані відгуки та оцінки'),
        new VidgukObject(bubu, 1, 'ееееееееее оооооооо щорщощощоопдлддвп'),
        new VidgukObject(bubu, 2, 'як відгуки видаляти еое ееее оооооо'),
        new VidgukObject(bubu2, 2, 'як відгуки видаляти'),
    ]
    
    bubu2.vidguky = [new VidgukObject(pomidorka, 2, 'в мене краще і вопще ти в мене вкрав шахрай')]
loadTovarsFromLocalStorage()
saveTovarsToLocalStorage()
for(tovar of tovars){
    alltovars.push(tovar)
}
let loginfalse = 1
document.querySelector('.startprofil').addEventListener('click', () => {
    storinka = 6
    if(loginfalse){
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
    displaystorynky()
}
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

displaystorynky();
