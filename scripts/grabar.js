// Grabar GIF

let btnEmpezar = document.getElementById('empezar');
let btnTerminar = document.getElementById('terminar');
let btnGuardar = document.getElementById('btnGuardar');
let btnSubir = document.getElementById('btnSubir')
let video = document.getElementById('video');
let mostrarGif = document.getElementById('mostrarGif');
let recorder = null;
let form = new FormData();
let myGifs = [];
let creados = document.getElementById('creados')
const apikey = 'wioJ8mi8wlULE7hExqq9lNJTkDcbiZqB'; 
let pathUpload = `https://upload.giphy.com/v1/gifs?api_key=${apikey}` 
 
// Paso uno
btnEmpezar.style.display = 'none'
let paso1 = document.getElementById('recording-center')
let btnpaso1 = document.getElementById('btnPaso1')
let btn1hover = document.getElementById('btn1Hover')
let btn1 = document.getElementById('btn1')
btn1hover.style.display = 'none'
btnpaso1.addEventListener('click', () =>{
    paso1.style.display = 'none'
    btnpaso1.style.display = 'none'
    btnEmpezar.style.display = 'block'
    paso2.style.display = 'flex'
    btn1hover.style.display = 'block'
    btn1.style.display = 'none'
})

function myFunction() {
  myVar = setTimeout(cambio, 9000);
}
function cambio() {
  subiendoGifo.style.display = 'none'
  GifoSubido.style.display = 'flex'
}

// Paso dos
let paso2 = document.getElementById('recording-center-paso2');
paso2.style.display = 'none'
let btn2 = document.getElementById('btn2');
let btn2Hover = document.getElementById('btn2Hover');

btn2Hover.style.display = 'none'

function cronometrar() {
    h = 0;
    m = 0;
    s = -1;
    document.getElementById("Contador").innerHTML = "00:00:00";
    tiempo();
    id = setInterval(escribir, 1000);
}

// paso 3
let subiendoGifo = document.getElementById('subiendoGifo')
subiendoGifo.style.display = 'none'

let btn3Hover = document.getElementById('btn3Hover')
let btn3 = document.getElementById('btn3')
btn3Hover.style.display = 'none'
btnSubir.addEventListener('click', () =>{
    mostrarGif.style.display = 'none'
    btnSubir.style.display ='none'
    subiendoGifo.style.display = 'flex'
    btn3Hover.style.display = 'block'
    btn3.style.display = 'none'
    btn2.style.display = 'block'
    btn2Hover.style.display = 'none'
    myFunction()
    
})


// Subiendo Gifo

let GifoSubido = document.getElementById('GifoSubido')
GifoSubido.style.display = 'none'






function lola() {
    let gifs = JSON.parse(localStorage.getItem('myGifs'));
    if (gifs) {
        myGifs = gifs;
    }
    console.log('Mis gifs cargados', myGifs);
}

lola()
btnEmpezar.addEventListener('click', () => {
    getStreamAndRecord();
    btn1hover.style.display = 'none'
    btn2.style.display = 'none'
    btn2Hover.style.display = 'block'
    btn1.style.display = 'block'
    btnEmpezar.style.display = "none";
    paso1.style.display = "none";
    btnTerminar.style.display = "block";
    paso2.style.display = "none";
});

btnTerminar.addEventListener('click', () => {
    recorder.stopRecording(async() => {
        btnGuardar.style.display = "block";
        btnTerminar.style.display = "none";
        let blob = recorder.getBlob();
        var uri = URL.createObjectURL(blob);
        video.style.display = "none";
        mostrarGif.style.display = "block";
        mostrarGif.src = uri;
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'));
        let idCreated = await createGif(form);
        myGifs.push(idCreated);
        localStorage.setItem('myGifs', JSON.stringify(myGifs));
        console.log('Mis gifs guardados', myGifs);
    });
})

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia(
        {
            audio: false,
            video: {
                height: { max: 600 },
                width: { max: 500 }
            }
        })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 370,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
            recorder.startRecording();
        })
        .catch(function (err) {
            console.log('error', err);
        });
}
function tiempo() {
    var hAux, mAux, sAux;
    s++;
    if (s > 59) {
        m++;
        s = 0;
    }
    if (m > 59) {
        h++;
        m = 0;
    }
    if (h > 24) { h = 0; }
    if (s < 10) { sAux = "0" + s; } else { sAux = s; }
    if (m < 10) { mAux = "0" + m; } else { mAux = m; }
    if (h < 10) { hAux = "0" + h; } else { hAux = h; }
    document.getElementById("tiempo-repetir").innerHTML = hAux + ":" + mAux + ":" + sAux;
}


async function createGif(formData) {
    const response = await fetch(pathUpload, {
        method: 'POST',
        body: formData
    }); 
    const json = await response.json();
    console.log(json.data.id, 'Aqui');
    return json.data.id;
}
btnGuardar.addEventListener('click' , () => {
    btnGuardar.style.display ='none'
    btnSubir.style.display ='block'
    creados.innerHTML += `
        `;
}) 

