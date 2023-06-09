"use strict";
const buttons = document.querySelector('.buttons');
const volumeControl = document.querySelector('.volume-control');
const defaultVolumeLevel = parseInt(volumeControl.value) / 100;
const defaultWeather = 'summer';
let currentVolumeLevel = defaultVolumeLevel;
let prevWeather = defaultWeather;
let currentWeather = prevWeather;
let isPlaying = false;
const icons = {
    winter: 'assets/icons/cloud-snow.svg',
    summer: 'assets/icons/sun.svg',
    rain: 'assets/icons/cloud-rain.svg',
    pause: 'assets/icons/pause.svg'
};
function playAudio(target) {
    function resetPrevAudio() {
        const prevAudioBlock = buttons.querySelector(`[data-weather=${prevWeather}`);
        prevAudioBlock.querySelector('img').src = icons[`${prevAudioBlock.dataset.weather}`];
        const prevAudio = prevAudioBlock.querySelector('audio');
        prevAudio.pause();
        prevAudio.currentTime = 0;
        target.querySelector('audio').volume = prevAudio.volume;
    }
    const audio = target.querySelector('audio');
    audio.volume = currentVolumeLevel;
    if (!isPlaying) {
        isPlaying = true;
        target.querySelector('img').src = icons['pause'];
        audio.play();
    }
    else {
        if (currentWeather === prevWeather) {
            target.querySelector('img').src = icons[`${target.dataset.weather}`];
            audio.pause();
            isPlaying = false;
        }
        else {
            resetPrevAudio();
            target.querySelector('img').src = icons['pause'];
            audio.play();
        }
    }
}
function changeBackground(target) {
    const bgSrc = target.dataset.bg;
    document.body.style.backgroundImage = `url("${bgSrc}")`;
}
buttons.addEventListener('click', (e) => {
    let target = e.target;
    if (target.tagName === 'IMG') {
        target = target.parentNode;
    }
    if (target.classList.contains('button')) {
        currentWeather = target.dataset.weather;
        changeBackground(target);
        playAudio(target);
        prevWeather = target.dataset.weather;
    }
});
volumeControl.addEventListener('change', (e) => {
    const target = e.target;
    currentVolumeLevel = parseInt(target.value) / 100;
    const activeAudio = document
        .querySelector(`[data-weather=${currentWeather}`)
        .querySelector('audio');
    activeAudio.volume = currentVolumeLevel;
});
