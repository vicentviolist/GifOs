// Grabar GIF

let btnEmpezar = document.getElementById('empezar');
let btnTerminar = document.getElementById('terminar');
let btnGuardar = document.getElementById('btnGuardar');
let video = document.getElementById('video');
let mostrarGif = document.getElementById('mostrarGif');
let recorder = null;
let form = new FormData();
let myGifs = [];
let creados = document.getElementById('creados')
const apikey = 'VGV16gAxmvVNiaQDsAlPqSFtInXbLyqA';
let pathUpload = `https://upload.giphy.com/v1/gifs?api_key=${apikey}`
let paso1 = document.getElementById('recording-center')

function cronometrar() {
    h = 0;
    m = 0;
    s = -1;
    document.getElementById("tiempo-repetir").innerHTML = "00:00:00";
    escribir();
    id = setInterval(escribir, 1000);
}

window.onload = function () {
    let gifs = JSON.parse(localStorage.getItem('myGifs'));
    if (gifs) {
        myGifs = gifs;
    }
    console.log('Mis gifs cargados', myGifs);
}


btnEmpezar.addEventListener('click', () => {
    getStreamAndRecord();
    btnEmpezar.style.display = "none";
    paso1.style.display = "none";
    btnTerminar.style.display = "block";
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
                width: 360,
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
    creados.innerHTML += `
        <h1 >${myGifs[0]}</h1>
        `;
}) 
