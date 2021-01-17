const apikey = 'wioJ8mi8wlULE7hExqq9lNJTkDcbiZqB';
const pathTendencias = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=7`;
let gifosBuscados = 12;

// Para cargar el texto en trending y cargar las tendencias a la seccion de carrousel
async function getGiftsByText(campo, offset) {
    const pathBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${gifosBuscados}&q=${campo}&offset=${offset}&rating=g&lang=es`;
    const response = await fetch(pathBusqueda);
    const gifs = await response.json();
    let download = gifs.bitly_url;
    return gifs.data;
}
let tendencias = document.getElementById('tendencias');
async function cargarTendencias() {
    // utilizamos fetch y recibimos los datos para hacerlos .json
    const response = await fetch(pathTendencias);
    const tendencias = await response.json();
    return tendencias.data;
    
}      

window.onload = function () {
    invocarTendencias();
}
let textoTendencias = document.getElementById('p-textodeTenencias');

async function invocarTendencias() {
    let trendings = await cargarTendencias();
    textoTendencias.innerHTML = '';
    tendenciasscroll.innerHTML = '';
    
    trendings.forEach((t, i) => {
        textoTendencias.innerHTML += t.title +
        (i === trendings.length - 1 ? '' : ', ');
        let card = document.createElement("div");
        let download = t.bitly_url;
        card.className = "card-gifo"
        card.innerHTML = `

        <div id="container-hover" class="container-hover">
            <div class="container-icon">
               <a href="${download}" target="_blank" >  <img id="${t.id}" src="./img/icon-download.svg" alt="icon" class="icon-gifo download"> </a>
                <img id="${t.id}" src="./img/icon-fav.svg" alt="icon" class="icon-gifo fav">
                <img  id="${t.id}" src="./img/icon-max-normal.svg" alt="icon" class="icon-gifo extend">
            </div>
            <div class="container-desc">
                <p class="gif-title">${t.title}</p>
            </div>
            </div>
            <img class="gifo-trend" id="${t.id}" src="${t.images.fixed_height.url}" alt="${t.title}"/>`
        
        tendenciasscroll.appendChild(card);
});
    tendenciasscroll.querySelectorAll('.extend').forEach((img) => {
        img.addEventListener('click', onGifClick, false);
    });
    tendenciasscroll.querySelectorAll('.download').forEach((img) => {
        img.addEventListener('click',  downloadGifclick, false);
    });
    guardarFavorito()
}

 

// Aquí es para realizar las busqudas
let resultado = document.getElementById('resultados');
let resultadoh1 = document.getElementById('resultadosh1');
let searchBtn = document.getElementById('searchBtn');
let search = document.getElementById('search-input');
let searchIcon = document.querySelector('.resultados img')
let btnvermas = document.getElementById('btnvermas')
let desaparecer = document.getElementById('desaparecer')


search.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
            buscarGif();
            desaparecer.style.display = "none"
             lupaDer.src = "./img/close.svg";
    lupaDer.style.width = '18px';
    lupaDer.style.height = '18px';
    lupaIzq.style.display = "block";
    sugerencias.innerHTML = " ";
    sugerencias.style.display = "block";
            
    }if(search.value <= 1){
        desaparecer.style.display = "flex"
    }if(search.value <= 1){
        resultadoh1.innerHTML = '';
         resultado.innerHTML = '';
         btnvermas.style.display ='none'
    }
});
search.addEventListener('keyup', () => {
    if ('keyup') {
            llamaSugerencias()
            desaparecer.style.display = "none"
    }if(search.value <= 1){
        desaparecer.style.display = "flex"
    }
});
searchBtn.addEventListener('click', () => {
    if ('click') {
            buscarGif();
            desaparecer.style.display = "none"
    }if(search.value <= 1){
        desaparecer.style.display = "flex"
    }
});

async function buscarGif() {
    let campo = search.value;
    const pathBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${gifosBuscados}&q=${campo}`;
    const respuesta = await fetch(pathBusqueda);
    console.log(respuesta);
    const json = await respuesta.json();
    console.log(json);
    let gifts = await getGiftsByText(search.value, 0);
    if (json.data.length === 0){
        resultadoh1.innerHTML = '';
         resultado.innerHTML = '';
         btnvermas.classList.add('btnvermas-hide')
         btnvermas.style.display = 'none'
            resultadoh1.innerHTML += `
            <div class="hrResBox">
                <hr class="hrRes">
                <h1 class="h1resultadobusqueda">Lorem Impsu</h1>
                <img class="" src="./img/icon-busqueda-sin-resultado.svg" alt=''/>
            </div>
        `;
    } else {
        resultadoh1.innerHTML = '';
        resultadoh1.innerHTML += `
        <h1 class="h1resultadobusqueda">${campo}</h1>
        `;
        resultado.innerHTML = '';
        btnvermas.classList.add('btnvermas-show')
        btnvermas.style.display = 'block'
            gifts.forEach((gift) => {
                
         let card = document.createElement("div");
         let download = gift.bitly_url;
        card.className = "card-gifo"
        card.innerHTML = ` <div id="container-hover" class="container-hover">
            <div class="container-icon">
              <a href='${download}'>  <img id="${gift.id}" src="./img/icon-download.png" alt="icon" class="icon-gifo"></a>
                <img id="${gift.id}" src="./img/icon-fav.png" alt="icon" class="icon-gifo fav">
                <img  id="${gift.id}" src="./img/icon-max-normal.png" alt="icon" class="icon-gifo extend">
            </div>
            <div class="container-desc">
                <p class="gif-title">${gift.title}</p>
            </div>
            </div>
            <img class="gifo-search" id="${gift.id}" src="${gift.images.fixed_height_small.url}" alt="${gift.title}"/>
            `;
             resultado.appendChild(card);
        });
        document.querySelectorAll('.extend').forEach((img) => {
            img.addEventListener('click', onGifClick, false);
        });
    }
    guardarFavorito()
}
// Para realizar el slide con los
 let btnslide1 =  document.getElementById('btn-slide1');
 let btnslide2 =  document.getElementById('btn-slide2');
btnslide1.addEventListener('mouseover', () => {
    btnslide1.src = "./img/button-slider-left-hover.svg"
});
btnslide1.addEventListener('mouseout', () => {
    btnslide1.src = "./img/button-slider-left.svg"
});
btnslide2.addEventListener('mouseover', () => {
    btnslide2.src = "./img/button-slider-right-hover.svg"
});
btnslide2.addEventListener('mouseout', () => {
    btnslide2.src = "./img/button-slider-right.svg"
});

// aqui se le hace slider con los botones
btnslide1.addEventListener('click', function leftSlider() {
    tendenciasscroll.scrollLeft -= 1100;
});
btnslide2.addEventListener('click', function rightSlider() {
    tendenciasscroll.scrollLeft += 1100;
});

// Boton ver mas
let gifoContainer = document.getElementById("gifo-comtainer");
btnvermas.addEventListener("click", () => {
    if (gifosBuscados < 20) {
        gifosBuscados += 4;
        try {
            buscarGif();
            if (gifosBuscados === 20) {
                btnvermas.innerHTML = `<p>ver menos</p>`
            }
        } catch (error) {
            console.log(error);
        }
    } else if (gifosBuscados = 20) {
        gifosBuscados = 16;
        btnvermas.innerHTML = `<p>ver más</p>`
        try {
            buscarGif();
        } catch (error) {
            console.log(error);
        }
    }
})  

// Funcion para auto contemplado
let sugerencias = document.getElementById('sugerencias');
let lupaDer = document.getElementById("lupa-close");
let lupaIzq = document.getElementById("lupa-izq");
lupaIzq.addEventListener('click', () =>{
     if ('click') {
            buscarGif();
             contenedor = document.getElementById("opciones");
    contenedor.innerHTML = " ";
            desaparecer.style.display = "none"
    }if(search.value <= 1){
        desaparecer.style.display = "flex"
    }
})
async function llamaSugerencias() {
    const busqueda = search.value;
    let apikey = 'wioJ8mi8wlULE7hExqq9lNJTkDcbiZqB';
    const path = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apikey}&q=${busqueda}&limit=4&offset=0&rating=g&lang=en`;
    let llamado = await fetch(path);
    let json = await llamado.json();
    sugerencias.innerHTML = " ";
    contenedor = document.createElement("div");
    contenedor.id = "opciones";
    contenedor.className = "opciones";
    contenedor.innerHTML = `<hr class="hrop">`;
    contenedor.style.cursor = "pointer";
    for (let i = 0; i < json.data.length; i++) {
        const element = json.data[i];
        let id = i;
        let sugerencia = document.createElement("p");
        sugerencia.className = "suggestion"
        sugerencia.innerHTML = `<label class="suggest" for="${id}">${element.name}</label>`
        contenedor.appendChild(sugerencia);
    }
    sugerencias.appendChild(contenedor);
    let select = document.getElementsByClassName("suggest"); 
    for (let i = 0; i < select.length; i++) {
        const element = select[i];
        element.addEventListener("mouseover", () => {
            event.target.style.color = "#0078d7";
        })
        element.addEventListener("click", () => {
            search.value = element.innerHTML;
            buscarGif();
            contenedor.style.display="none";
        })
    }
}
search.addEventListener("keyup", (contenedor) => {
    lupaDer.src = "./img/close.svg";
    lupaDer.style.width = '18px';
    lupaDer.style.height = '18px';
    lupaIzq.style.display = "block";
    sugerencias.innerHTML = " ";
    sugerencias.style.display = "block";
    llamaSugerencias();

})
lupaDer.addEventListener("click", () => {
    search.value = "";
    contenedor = document.getElementById("opciones");
    contenedor.innerHTML = " ";
    lupaDer.src = "./img/close.svg" ? lupaDer.src = "./img/icon-search.svg" : lupaDer.src = "./img/close.svg";
    lupaDer.style.width = '23px';
    lupaDer.style.height = '23px';
    lupaIzq.style.display = 'none';
    resultadoh1.innerHTML = '';
    resultado.innerHTML = '';
    btnvermas.style.display ='none'
    desaparecer.style.display = "flex"
    if(search.value <= 1){
         contenedor.innerHTML = " ";
    }

})

// Para entrar en modo nocturno 
let modoNocturno = document.getElementById('modoNocturno');
let body = document.getElementsByName('body')
let logo = document.getElementById('logobox')

modoNocturno.addEventListener('click',() => {
    if (document.body.className === 'dark') {
        document.body.classList.toggle('dark')
        modoNocturno.innerHTML =`<div>Modo Nocturno</div>`
        logo.innerHTML = `<a href="./index.html"> <img class="logo" id="logo" src="./img/Logo.png" alt="Gifoslogo" /> </a>`
        
    } else {
        document.body.classList.toggle('dark')
        console.log('Cambio de tema');
        modoNocturno.innerHTML =`<div>Modo Diurno</div>`
        logo.innerHTML = `<a href="./index.html"><img class="logo" id="logo" src="./img/LogoMobile.svg" alt="Gifoslogo" /> </a>`
    }
    
})


// ventana modal
async function getGifById(id) {
    const pathBusqueda = `https://api.giphy.com/v1/gifs/${id}?api_key=${apikey}`;
    const response = await fetch(pathBusqueda);
    const gif = await response.json();
    return gif.data;
}
let downloadGi = document.querySelectorAll('.download');
async function downloadGifclick(img){
    let gifData = await getGifById(img.target.id);
    downloadGi.href = gifData.images.downsized.url;
}


let modal = document.getElementById('modal');
let selectedGif = document.getElementById('selectedGif');
let modalClose = document.querySelector('#modal .modal-close');
let gifTitle = document.querySelector('#modal h3');
let gifUser = document.querySelector('#modal h4');
let downloadGif = document.getElementById('downloadGif');

async function onGifClick(img) {
    console.log(img);
    let gifData = await getGifById(img.target.id);
    selectedGif.src = gifData.images.fixed_height_small.url;
    gifTitle.innerHTML = gifData.title;
    gifUser.innerHTML = gifData.username;
    downloadGif.href = gifData.images.downsized.url;
    modal.style.display = 'flex';
}

modal.addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target.id === 'modal-close') {
        modal.style.display = 'none';
    }
});


// PARA GUARDAR FAVORITOS
let favorites = []

document.getElementById("favoritos").addEventListener("click", favoritos);

function favoritos() {
    document.getElementById("favBlock").style.display = "none";
    document.getElementById("favoritesSect").style.display = "block";
    misGuifos.style.display = "none";
    
}

function guardarFavorito() {
    let favIcon = document.getElementsByClassName("icon-gifo fav");
    for (let i = 0; i < favIcon.length; i++) {
        const element = favIcon[i];
        if (localStorage.getItem("favoritos", JSON.stringify(favorites))) {
            favorites= JSON.parse(localStorage.getItem("favoritos"));
        }
        element.addEventListener("click", () => {
            let idFav = (event.target.id);
            if (element.src === "./img/icon-fav-hover.svg") {
                alert("Ya has guardado este gif como favorito");
            } else {
                favorites.push(idFav);
            }
            element.src = "./img/icon-fav-hover.svg";
            localStorage.setItem("favoritos", JSON.stringify(favorites))
            
        })
    }
}
console.log(localStorage)
// Para traer a los favoritos

var favContainer = document.getElementById("gifo-container-fav");

// con esta funcion consultamos el localstorage y mostramos los gif guardados
async function muestraFavoritos(params) {
    favContainer.innerHTML = ""
    let favorites = JSON.parse(localStorage.getItem("favoritos"));
    // verificamos si hay algun gif guardado para poner icono
    if (favorites === null) {
       console.log('No hay favoritos');
       let favoritesIcon = document.getElementById('favorites-icon')
       let favoritesTitle = document.getElementById('favorites-title')
       favoritesIcon.style.display = 'none'
       favoritesTitle.style.display = 'none'
       console.log('No hay favoritos');
    }else{
       let textSinContenido = document.getElementById('text-fav-sc')
       let favIconNoContent = document.getElementById('fav-no-content')
       favIconNoContent.style.display = "none"
       textSinContenido.style.display = 'none'
       console.log('Si hay favoritos');
    }
     
    for (let i = 0; i < favorites.length; i++) {
        const element = favorites[i];
        let apikey = 'wioJ8mi8wlULE7hExqq9lNJTkDcbiZqB';
        let path = `https://api.giphy.com/v1/gifs?api_key=${apikey}&ids=${element}`;
        let llamado = await fetch(path);
        let json = await llamado.json();
        let elemento = json.data[0]; 
        let src = elemento.images.fixed_width.url;
        let gifoName = elemento.title;
        let download = elemento.bitly_url;
        let user = elemento.username;
        let id = elemento.id;
        let card = document.createElement("div");
        card.id = "card-gifo"
        card.className = "card-gifo"
        card.innerHTML = `<div id="container-hover" class="container-hover">
        <div class="container-icon">
        <a href="${download}" target="_blank" > <img id="${id}" src="./img/icon-download.svg" alt="icon" class="download"></a>
            <img id="${id}" src="./img/icon-trash-normal.svg" alt="icon" class="icon-gifo fav">
            <img  id="${id}" src="./img/icon-max-normal.svg" alt="icon" class="icon-gifo extend">
        </div>
        <div class="container-desc">
            <p class="gif-user">${user}</p>
            <p class="gif-title">${gifoName}</p>
        </div>
        </div>
       <img id="${id}" class="gifo-search" src="${src}" alt="${gifoName}">`

        
        favContainer.appendChild(card);
       
            
           document.querySelectorAll('.extend').forEach((img) => {
            img.addEventListener('click', onGifClick, false);
        });
        
        let unselect = document.getElementsByClassName("icon-gifo fav");
        for (let i = 0; i < unselect.length; i++) {
            const element = unselect[i];
            element.addEventListener("click", () => {
                let id = event.target.id;
                eliminarFav(id);
            })
        }
    }

}
 muestraFavoritos()

function eliminarFav(id) {
    let deleteId = id;
    let favGuardados = JSON.parse(localStorage.getItem("favoritos"));
    for (let i = 0; i < favGuardados.length; i++) {
        const element = favGuardados[i];
        if (deleteId === element) {
            let indice = favGuardados.indexOf(element);
            favGuardados.splice(indice, 1);
            localStorage.setItem("favoritos", JSON.stringify(favGuardados));
            muestraFavoritos();
        }
    }
}


// Mig Gifos
    let misGuifos = document.getElementById('misGifos');
    let btnMisGifos = document.getElementById('btnMisGifos');
    let favBlock = document.getElementById('favBlock')

    btnMisGifos.addEventListener('click', ()=>{
        misGuifos.style.display ='block'
        favBlock.style.display = 'none'
        document.getElementById("favoritesSect").style.display = "none";
    })

