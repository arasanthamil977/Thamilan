const API_URL =
  'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

const jokeMain = document.getElementById('jokeMain');
const anotherBtn = document.getElementById('anotherBtn');
const copyBtn = document.getElementById('copyBtn');
const facebookBtn = document.getElementById('facebookBtn');

let lastJokeText = '';
let isLoading = false;

async function fetchJoke(){
  if(isLoading) return;
  isLoading = true;
  anotherBtn.textContent = 'Loading...';

  try{
    const res = await fetch(API_URL);
    const data = await res.json();
    lastJokeText =
      data.type === 'single'
        ? data.joke
        : `${data.setup}\n\n${data.delivery}`;

    jokeMain.textContent = lastJokeText;
  }catch{
    jokeMain.textContent = 'Failed to load joke 😅';
  }finally{
    isLoading = false;
    anotherBtn.textContent = 'Another!';
  }
}

async function copyJoke(){
  if(!lastJokeText) return;
  await navigator.clipboard.writeText(lastJokeText);
  toast('Copied!');
}

function shareOnFacebook(){
  if(!lastJokeText) return;
  const text = encodeURIComponent(lastJokeText);
  const url =
    `https://www.facebook.com/sharer/sharer.php?quote=${text}`;
  window.open(url,'_blank','noopener');
}

function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style,{
    position:'fixed',
    bottom:'24px',
    left:'50%',
    transform:'translateX(-50%)',
    background:'#000000cc',
    color:'#fff',
    padding:'8px 14px',
    borderRadius:'999px',
    zIndex:9999
  });
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),1400);
}

anotherBtn.onclick = fetchJoke;
copyBtn.onclick = copyJoke;
facebookBtn.onclick = shareOnFacebook;

window.addEventListener('keydown',e=>{
  if(e.code==='Space'){
    e.preventDefault();
    fetchJoke();
  }
});

fetchJoke();
}

function shareOnFacebook(){
  if(!lastJokeText) return;
  const text = encodeURIComponent(lastJokeText);
  const url = `https://www.facebook.com/sharer/sharer.php?quote=${text}`;
  window.open(url,'_blank','noopener');
}

function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style,{
    position:'fixed',
    bottom:'24px',
    left:'50%',
    transform:'translateX(-50%)',
    background:'#000000cc',
    color:'#fff',
    padding:'8px 14px',
    borderRadius:'999px',
    zIndex:9999
  });
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),1400);
}

anotherBtn.onclick = fetchJoke;
copyBtn.onclick = copyJoke;
facebookBtn.onclick = shareOnFacebook;

window.addEventListener('keydown',e=>{
  if(e.code==='Space'){
    e.preventDefault();
    fetchJoke();
  }
});

fetchJoke();
