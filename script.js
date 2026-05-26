const songs = [
  {
    title:"Garota de Ipanema",
    artist:"Tom Jobim",
    cover:"capas/GarotadeIpanema.jpg",
    audio:"musicas/GarotadeIpanema.mp3",
    lyrics:`Ah, se ela soubesse que quando ela passa 
O mundo inteirinho se enche de graça`
  },
  {
    title:"Coisa Mais Linda",
    artist:"Caetano Veloso",
    cover:"capas/Coisamaislinda.jpg",
    audio:"musicas/Coisamaislinda.mp3",
    lyrics:`Você é mais bonita que a flor 
Quem dera A primavera da flor 
Tivesse todo esse aroma de beleza que é o amor 
Perfumando a natureza 
Numa forma de mulher`
  },
  {
    title:"Barcelona",
    artist:"L7NNON",
    cover:"capas/Barcelona.jpg",
    audio:"musicas/Barcelona.mp3",
    lyrics:`Então vamos juntos pra Barcelona Madri, Paris 
Nenhuma chega aos seus pés 
Inclusive comprei alguns pares 
Reclama que eu não mando notícia Vi tua mensagem de bom dia 
Olhei pro lado e cê não tava Pensei: 
Bem que podia`
  },
  {
    title:"Lisboa",
    artist:"ANAVITÓRIA",
    cover:"capas/Lisboa.jpg",
    audio:"musicas/Lisboa.mp3",
    lyrics:`Eu vejo tua cara e teu querer perverso 
A gente fica bem aqui no chão da sala 
Eu te queria a vida toda, te confesso 
Por mim, a gente nem precisa mais da estrada 
Eu vejo você longe, quero você perto 
Fica na minha sombra, eu posso ser teu rastro 
Não quero tu na linha, Vivo, morto ou Claro 
Eu quero tu na minha boca 
E a minha boca quer você 
Quer você Diga pra mim que é real 
Que eu te prometo meu melhor 
Fala pra mim o que eu quero ouvir 
Que tu sentiu o que eu senti`
  },
  {
    title:"Poesia Acústica 9",
    artist:"L7NNON",
    cover:"capas/Poesia.jpg",
    audio:"musicas/Poesia.mp3",
    lyrics:`Se ela disser que me ama, eu vou mudar de vida, ahn 
Me chama de vida 
Pra tu ver se eu não te faço feliz 
Como ninguém fez ainda, bebê`
  },
  {
    title:"Serendipity",
    artist:"Jimin",
    cover:"capas/Serendipty.jpg",
    audio:"musicas/Serendipty.mp3",
    lyrics:`Você é meu remédio 
Me salvando 
Meu anjo, meu mundo 
Eu sou seu gato de chita 
Aqui pra te ver 
Me ame agora 
Me toque agora 
Apenas deixe-me te amar`
  },
  {
    title:"Heaven Can Wait",
    artist:"Michael Jackson",
    cover:"capas/Heaven.jpg",
    audio:"musicas/Heaven.mp3",
    lyrics:`Se os anjos vierem para mim eu direi a eles não 
Diga aos anjos não, eu não quero deixar minha querida sozinha 
Eu não quero ninguém mais abraçando você 
Esta é uma chance que eu vou pegar 
Querida eu vou ficar, o Céu pode esperar 
Não, se os anjos me levaram desta Terra 
Eu diria a eles para me trazerem de volta pra ela 
É uma chance que eu vou pegar, talvez eu vou ficar 
O Céu pode esperar`
  }
];

const intro = document.querySelector(".intro");
const playerScreen = document.querySelector(".player-screen");
const finalScreen = document.querySelector(".final-screen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const title = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const lyrics = document.getElementById("lyrics");
const counter = document.getElementById("counter");

const playBtn = document.getElementById("playBtn");
const audio = document.getElementById("audio");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let currentSong = 0;

function formatTime(seconds){
  if(isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function loadSong(){
window.scrollTo({
  top: 0,
  behavior: "smooth"
});
  const song = songs[currentSong];

  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  lyrics.textContent = song.lyrics;
  counter.textContent = `${currentSong + 1}/7`;

  audio.src = song.audio;
  progress.value = 0;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";

const card=document.querySelector(".music-card");

card.style.opacity="0";
card.style.transform="translateY(25px)";

setTimeout(()=>{

card.style.opacity="1";
card.style.transform="translateY(0px)";

},200);

  audio.play();
  playBtn.innerHTML = "⏸";
}

function nextSong(){
  currentSong++;

  if(currentSong >= songs.length){
    playerScreen.classList.remove("active");
    finalScreen.classList.add("active");
    audio.pause();
    return;
  }

  loadSong();
}

startBtn.addEventListener("click", () => {
  intro.classList.remove("active");
  playerScreen.classList.add("active");
  loadSong();
});

playBtn.addEventListener("click", () => {
  if(audio.paused){
    audio.play();
    playBtn.innerHTML = "⏸";
  }else{
    audio.pause();
    playBtn.innerHTML = "▶";
  }
});

nextBtn.addEventListener("click", nextSong);

restartBtn.addEventListener("click", () => {
  currentSong = 0;
  finalScreen.classList.remove("active");
  intro.classList.add("active");
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if(audio.duration){
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
});

progress.addEventListener("input", () => {
  if(audio.duration){
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", () => {
  playBtn.innerHTML = "▶";
});
