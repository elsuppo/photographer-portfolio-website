import i18Obj from './translate.js';

// ----------Work burger-menu----------
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const shadow = document.querySelector('.shadow');

// Add/remove active classes for burger-menu elements
function burgerMenu() {
    nav.classList.toggle('nav-open');
    burger.classList.toggle('is-active');
    shadow.classList.toggle('shadow-enabled');
};

burger.addEventListener('click', burgerMenu);

// ----------Сlose burger-menu----------
const navItems = document.querySelectorAll('.nav-item');

// Сlose burger-menu when clicking on the nav link
for (let navItem of navItems) {
    navItem.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        shadow.classList.remove('shadow-enabled');
        burger.classList.remove('is-active');
    });
};

// ----------Сhange pictures in portfolio----------
const portfolioImages = document.querySelectorAll('.photo-card');
const portfolioBtns = document.querySelector('.portfolio-buttons');
const portfolioBtnAll = document.querySelectorAll('.portfolio-button');

function changePic(event) {
    if (event.target.classList.contains('portfolio-button')) {
        portfolioBtnAll.forEach(btn => btn.classList.remove('btn-on'));
        event.target.classList.toggle('btn-on');
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    };
};

portfolioBtns.addEventListener('click', changePic);

// ----------Portfolio image caching----------
function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    seasons.forEach(season => {
        for (let i = 1; i <= 6; i++) {
            const img = new Image();
            img.src = `./assets/img/${season}/${i}.jpg`
        };
    });
};

preloadImages();

// ----------Change theme----------
const btnTheme = document.querySelector('.button-theme');
const forLightElements = ['body', 'footer', '.section-title', '.hero-inner', '.portfolio-button', '.btn-on', '.title-text', '.nav', '.nav-item', '.burger'];

// Change icon-theme, add/remove class .light to the necessary elements
function changeTheme() {
    btnTheme.classList.toggle('button-light-theme');
    forLightElements.forEach((element) => {
        let currentElements = document.querySelectorAll(element);
        currentElements.forEach(item => {
            if (btnTheme.classList.contains('button-light-theme')) {
                item.classList.add('light');
                setLocalStorage('theme_elsuppo', 'light');
            } else {
                item.classList.remove('light');
                localStorage.removeItem('theme_elsuppo');
            };
        });
    });
};

btnTheme.addEventListener('click', changeTheme);

// ----------Translate page----------
const switchItem = document.querySelectorAll('.switch-item');
const forTranslateElements = document.querySelectorAll('[data-i18n]');

// Switch en/ru, save in localStorage
function makeTranslate(event) {
    switchItem.forEach((item) => {
        if (item.classList.contains('switch-on')) {
            item.classList.remove('switch-on');
            event.target.classList.toggle('switch-on');
        };
    });
    let lang = event.target.textContent;
    if (lang === 'ru') {
        setLocalStorage('lang_elsuppo', 'ru');
    } else {
        localStorage.removeItem('lang_elsuppo');
    };
    getTranslate(lang);
};

// translate text/placeholder for data-i18n elements
function getTranslate(lang) {
    forTranslateElements.forEach((item) => {
        const key = item.dataset.i18n;
        const text = i18Obj[lang][key];
        item.textContent = text;
        if (item.placeholder) {
            item.placeholder = text;
            item.textContent = '';
        };
    });
};

switchItem.forEach((item) => item.addEventListener('click', makeTranslate));

// ----------Save in localStorage----------
function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
};

// Get from localStorage
function getLocalStorage() {
    if (localStorage.getItem('lang_elsuppo')) {
        getTranslate('ru');
        switchItem.forEach(item => item.classList.toggle('switch-on'));
    };
    if (localStorage.getItem('theme_elsuppo')) {
        changeTheme();
    };
};

getLocalStorage();

// ----------Scroll top----------
const btnScrollTop = document.querySelector('.scroll-top');

window.onscroll = () => {
    if (window.scrollY > 700) {
        btnScrollTop.classList.remove('hide');
    } else {
        btnScrollTop.classList.add('hide');
    };
};

function scrollTop() {
    window.scrollTo(0, 0);
}

btnScrollTop.addEventListener('click', scrollTop);

// ----------Вutton animation----------
const buttonsRippleAll = document.querySelectorAll('.ripple');

function buttonRipple(e) {
    const x = e.clientX;
    const y = e.clientY;

    let domRect = this.getBoundingClientRect();

    const buttonTop = domRect.top;
    const buttonLeft = domRect.left;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
};

buttonsRippleAll.forEach((item) => {
    item.addEventListener('click', buttonRipple);
});

// ----------Video player----------
const videoPlayer = document.querySelector('.video-player');
const videoViewer = videoPlayer.querySelector('.video-viewer');
const videoControls = videoPlayer.querySelector('.video-controls');
const playButton = videoPlayer.querySelector('.play-button');
const playButtonCenter = videoPlayer.querySelector('.play-hover-btn');
const volumeButton = videoPlayer.querySelector('.volume-button');
const volume = videoPlayer.querySelector('.volume');
const currTimeElement = videoPlayer.querySelector('.current');
const durationElement = videoPlayer.querySelector('.duration');
const progress = videoPlayer.querySelector('.video-progress');
const progressBar = videoPlayer.querySelector('.video-progress-bar');
const fullScrennBtn = videoPlayer.querySelector('.fullscreen-button');
const speed = videoPlayer.querySelector(".player-speed");

// Play and pause video
function playPauseVideo() {
    if (videoViewer.paused) {
        videoViewer.play();
        playButton.classList.add('pause');
        playButtonCenter.classList.toggle('btn-hidden');
    } else {
        videoViewer.pause();
        playButton.classList.remove('pause');
        playButtonCenter.classList.toggle('btn-hidden');
    };
}

videoViewer.addEventListener('click', playPauseVideo);
playButton.addEventListener('click', playPauseVideo);
playButtonCenter.addEventListener('click', playPauseVideo);

// Volume
volume.addEventListener('input', (e) => {
    videoViewer.volume = e.target.value;
    if (e.target.value <= '0.5' & e.target.value > '0') {
        volumeButton.classList.add('volume-low');
    } else {
        volumeButton.classList.remove('volume-low');
    };
    if (e.target.value === '0') {
        volumeButton.classList.add('mute');
    } else {
        volumeButton.classList.remove('mute');
    };
});

volume.addEventListener('input', (e) => {
    const value = e.target.value * 100;
    e.target.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${value}%, rgba(0, 0, 0, 0.5) ${value}%, rgba(0, 0, 0, 0.5) 100%)`
})

volumeButton.addEventListener('click', () => {
    videoViewer.muted = !videoViewer.muted;
    volumeButton.classList.toggle('mute');
});

// Current time and duration
function currentTime() {
    let currentMinutes = Math.floor(videoViewer.currentTime / 60);
    let currentSeconds = Math.floor(videoViewer.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(videoViewer.duration / 60);
    let durationSeconds = Math.floor(videoViewer.duration - durationMinutes * 60);

    currTimeElement.innerHTML = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
    durationElement.innerHTML = `${durationMinutes}:${durationSeconds}`;
};

videoViewer.addEventListener('timeupdate', currentTime);

// Progress bar
videoViewer.addEventListener('timeupdate', () => {
    const percentage = (videoViewer.currentTime / videoViewer.duration) * 100;
    progressBar.style.width =  `${percentage}%`;
});

// Change progress bar
function handleSeek(e) {
    const progressTime = (e.offsetX / progress.offsetWidth) * videoViewer.duration;
    videoViewer.currentTime = progressTime;
};

let mousedown = false;
progress.addEventListener("click", handleSeek);
progress.addEventListener("mousemove", e => mousedown && handleSeek(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

// Full screen
fullScrennBtn.addEventListener('click', () => {
    videoViewer.requestFullscreen();
});

// Speed 
function speedRange() {
    videoViewer[this.name] = this.value;
}

speed.addEventListener("change", speedRange);


console.log('Оценка: 60\n\n',
'1. Вёрстка (10/10)\n',
    '1.1. Вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5\n',
    '1.2. В футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\n\n',
'2. Кнопка Play/Pause на панели управления (10/10)\n',
    '2.1. При клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5\n',
    '2.2. Внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5\n\n',
'3. Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка (10/10)\n\n',
'4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка (10/10)\n\n',
'5. При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля (10/10)\n\n',
'6. Кнопка Play/Pause в центре видео (10/10)\n',
    '6.1. Есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5\n',
    '6.2. Когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5\n');