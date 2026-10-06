const intro = document.querySelector('#intro');

const wrap = document.querySelector('#bookWrap');

const pages = [
  ...document.querySelectorAll('.page')
];

const prev = document.querySelector('#prevBtn');

const next = document.querySelector('#nextBtn');

const count = document.querySelector('#pageCount');

const fill = document.querySelector('#progressFill');

const chapter = document.querySelector('#chapter');

const dots = [
  ...document.querySelector('#dots').children
];


let current = 0;


const names = [
  'A little hello',
  'Your smile',
  'Little things',
  'More memories',
  'Your day'
];


/* =========================================
   PAGE CHANGING
   ========================================= */

function showPage(n) {

  const old = pages[current];

  if (n === current) return;


  old.classList.remove('active');

  old.classList.add('leaving');


  setTimeout(() => {
    old.classList.remove('leaving');
  }, 360);


  current = n;


  pages[current].classList.add('active');


  count.textContent =
    `0${n + 1} / 05`;


  fill.style.width =
    `${(n + 1) * 20}%`;


  chapter.textContent =
    names[n];


  prev.disabled =
    n === 0;


  next.textContent =
    n === 4
      ? 'Read again ↻'
      : 'Next page →';


  dots.forEach((dot, i) => {

    dot.classList.toggle(
      'selected',
      i === n
    );

  });

}


/* =========================================
   OPEN SURPRISE
   ========================================= */

document
  .querySelector('#openBtn')
  .addEventListener('click', () => {

    intro.classList.add('hidden');

    wrap.classList.remove('hidden');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });


/* =========================================
   PREVIOUS
   ========================================= */

prev.addEventListener('click', () => {

  showPage(
    Math.max(
      0,
      current - 1
    )
  );

});


/* =========================================
   NEXT
   ========================================= */

next.addEventListener('click', () => {

  if (current === 4) {

    showPage(0);

  } else {

    showPage(current + 1);

  }

});


/* =========================================
   DOT NAVIGATION
   ========================================= */

dots.forEach((dot, i) => {

  dot.addEventListener(
    'click',
    () => showPage(i)
  );

});


/* =========================================
   LOVE NOTES
   ========================================= */

document
  .querySelectorAll('.note')
  .forEach(button => {

    button.addEventListener(
      'click',
      () => {

        document.querySelector(
          '#modalText'
        ).textContent =
          button.dataset.note;


        document
          .querySelector('#modal')
          .classList.remove('hidden');

      }
    );

  });


/* =========================================
   CLOSE MODAL
   ========================================= */

function closeModal() {

  document
    .querySelector('#modal')
    .classList.add('hidden');

}


document
  .querySelector('#closeModal')
  .addEventListener(
    'click',
    closeModal
  );


document
  .querySelector('#modal')
  .addEventListener(
    'click',
    event => {

      if (
        event.target.id === 'modal'
      ) {

        closeModal();

      }

    }
  );


/* =========================================
   KEYBOARD
   ========================================= */

document.addEventListener(
  'keydown',
  event => {

    if (event.key === 'Escape') {

      closeModal();

    }


    if (
      !wrap.classList.contains('hidden') &&
      event.key === 'ArrowRight' &&
      current < 4
    ) {

      showPage(current + 1);

    }


    if (
      !wrap.classList.contains('hidden') &&
      event.key === 'ArrowLeft' &&
      current > 0
    ) {

      showPage(current - 1);

    }

  }
);


/* =========================================
   BIRTHDAY WISH
   ========================================= */

document
  .querySelector('#wishBtn')
  .addEventListener(
    'click',
    () => {

      document.querySelector(
        '#flame'
      ).textContent = '♡';


      document.querySelector(
        '#wishText'
      ).classList.remove('hidden');


      document.querySelector(
        '#wishBtn'
      ).textContent =
        'Wish sent with love 💗';


      document.querySelector(
        '#wishBtn'
      ).disabled = true;


      confetti();

    }
  );


/* =========================================
   CONFETTI
   ========================================= */

function confetti() {

  for (let i = 0; i < 24; i++) {

    const element =
      document.createElement('span');


    element.textContent =
      ['♡', '✦', '✿'][i % 3];


    element.style.cssText = `
      position: fixed;
      z-index: 8;
      left: ${Math.random() * 100}vw;
      top: 55vh;
      color: ${i % 2
        ? '#d77f9f'
        : '#e8b36d'};
      font-size: ${12 + Math.random() * 17}px;
      pointer-events: none;
      animation:
        confettiFall
        ${2 + Math.random() * 2}s
        ease-out
        forwards;
    `;


    document.body.append(element);


    setTimeout(() => {

      element.remove();

    }, 4100);

  }

}


/* =========================================
   CONFETTI ANIMATION
   ========================================= */

const confettiStyle =
  document.createElement('style');


confettiStyle.textContent = `

  @keyframes confettiFall {

    to {

      transform:
        translateY(-65vh)
        rotate(300deg);

      opacity: 0;

    }

  }

`;


document.head.append(
  confettiStyle
);


/* =========================================
   BACKGROUND DECORATION
   ========================================= */

const ambient =
  document.createElement('div');

ambient.className =
  'ambient';


ambient.innerHTML = `
  <span>♡</span>
  <span>✦</span>
  <span>♡</span>
  <span>✿</span>
  <span>♡</span>
  <span>✦</span>
  <span>♡</span>
`;


document.body.append(
  ambient
);


/* =========================================
   MUSIC
   ========================================= */

let audio = null;

let playing = false;

let timer = null;

let step = 0;


const melody = [

  523.25,
  659.25,
  783.99,
  659.25,

  587.33,
  698.46,
  880,
  698.46,

  523.25,
  659.25,
  783.99,
  1046.5,

  880,
  783.99,
  659.25,
  587.33

];


function playTone() {

  if (!audio || !playing) return;


  const now =
    audio.currentTime;


  const oscillator =
    audio.createOscillator();


  const gain =
    audio.createGain();


  oscillator.type =
    'sine';


  oscillator.frequency.value =
    melody[
      step % melody.length
    ];


  gain.gain.setValueAtTime(
    .0001,
    now
  );


  gain.gain.exponentialRampToValueAtTime(
    .045,
    now + .08
  );


  gain.gain.exponentialRampToValueAtTime(
    .0001,
    now + .75
  );


  oscillator.connect(gain);

  gain.connect(
    audio.destination
  );


  oscillator.start(now);

  oscillator.stop(
    now + .8
  );


  step++;


  timer = setTimeout(
    playTone,
    570
  );

}


/* =========================================
   MUSIC BUTTON
   ========================================= */

document
  .querySelector('#musicBtn')
  .addEventListener(
    'click',
    async () => {

      const button =
        document.querySelector(
          '#musicBtn'
        );


      if (!audio) {

        const AudioContext =
          window.AudioContext ||
          window.webkitAudioContext;


        if (!AudioContext) {

          button.querySelector(
            'span'
          ).textContent =
            'Audio unavailable';

          return;

        }


        audio =
          new AudioContext();

      }


      if (
        audio.state ===
        'suspended'
      ) {

        await audio.resume();

      }


      playing =
        !playing;


      button.setAttribute(
        'aria-pressed',
        String(playing)
      );


      button.querySelector(
        'span'
      ).textContent =
        playing
          ? 'Pause melody'
          : 'Play a little melody';


      if (playing) {

        playTone();

      } else {

        clearTimeout(timer);

      }

    }
  );
