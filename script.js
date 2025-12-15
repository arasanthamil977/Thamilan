// QuirkJoke — fetches a random joke from JokeAPI and provides UX helpers.
const API_URL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

const jokeMain = document.getElementById('jokeMain');
const anotherBtn = document.getElementById('anotherBtn');
const copyBtn = document.getElementById('copyBtn');
const tweetBtn = document.getElementById('tweetBtn');
const jokeCard = document.getElementById('jokeCard');

let lastJokeText = '';
let isLoading = false;

async function fetchJoke() {
  if (isLoading) return;
  setLoading(true);
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    let text = '';
    if (data.type === 'single') {
      text = data.joke;
    } else {
      // twopart
      text = `${data.setup}\n\n${data.delivery}`;
    }
    showJoke(text);
  } catch (err) {
    showJoke('Oops — could not fetch a joke right now. Try again!');
    console.error(err);
  } finally {
    setLoading(false);
  }
}

function showJoke(text) {
  lastJokeText = text;
  // small animate: scale + fade
  jokeCard.animate([
    { transform: 'translateY(0) scale(1)', opacity: 1 },
    { transform: 'translateY(-6px) scale(1.01)', opacity: 1 },
    { transform: 'translateY(0) scale(1)', opacity: 1 }
  ], { duration: 420, easing: 'cubic-bezier(.2,.9,.25,1)' });
  // set text
  jokeMain.textContent = text;
  // occasionally trigger confetti for delightful moments
  if (Math.random() > 0.6) createConfetti(22);
}

function setLoading(flag) {
  isLoading = flag;
  anotherBtn.disabled = flag;
  anotherBtn.textContent = flag ? 'Loading...' : 'Another!';
  if (flag) {
    jokeMain.style.opacity = 0.6;
  } else {
    jokeMain.style.opacity = 1;
  }
}

async function copyJoke() {
  if (!lastJokeText) return flashTemporary('No joke to copy');
  try {
    await navigator.clipboard.writeText(lastJokeText);
    flashTemporary('Copied!');
  } catch (err) {
    flashTemporary('Copy failed');
    console.error(err);
  }
}

function tweetJoke() {
  if (!lastJokeText) return flashTemporary('No joke to tweet');
  const maxLen = 280;
  let text = lastJokeText;
  if (text.length > maxLen - 30) text = text.slice(0, maxLen - 33) + '...';
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=Joke,QuirkJoke`;
  window.open(tweet, '_blank', 'noopener');
}

function flashTemporary(message) {
  const el = document.createElement('div');
  el.textContent = message;
  Object.assign(el.style, {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '24px',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '999px',
    zIndex: 9999,
    fontWeight: 700
  });
  document.body.appendChild(el);
  setTimeout(() => el.style.opacity = '0', 1200);
  setTimeout(() => el.remove(), 1600);
}

// simple emoji confetti: generate small spans that fall and rotate
function createConfetti(count = 20) {
  const emojis = ['🎉','✨','😂','😄','🤩','😜'];
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'confetti';
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const size = 12 + Math.random() * 18;
    span.style.fontSize = `${size}px`;
    span.style.left = Math.random() * 100 + 'vw';
    span.style.top = '-8vh';
    span.style.opacity = 1;
    // randomize animation duration and delay
    const dur = 1300 + Math.random() * 1800;
    const delay = Math.random() * 200;
    span.style.animationDuration = dur + 'ms';
    span.style.animationDelay = delay + 'ms';
    document.body.appendChild(span);
    // remove after animation
    setTimeout(() => span.remove(), dur + delay + 200);
  }
}

// keyboard shortcut: Space for new joke
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    fetchJoke();
  }
});

// attach buttons
anotherBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);
tweetBtn.addEventListener('click', tweetJoke);

// initialize with one joke
fetchJoke();  toast('Copied!');
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
