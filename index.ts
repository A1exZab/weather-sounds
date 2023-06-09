const buttons = document.querySelector('.buttons') as HTMLDivElement
const volumeControl = document.querySelector('.volume-control') as HTMLInputElement
const defaultVolumeLevel = parseInt(volumeControl.value) / 100
const defaultWeather = 'summer'
let currentVolumeLevel = defaultVolumeLevel
let prevWeather: string = defaultWeather
let currentWeather: string = prevWeather
let isPlaying: boolean = false

const icons: { [icon: string]: string } = {
	winter: 'assets/icons/cloud-snow.svg',
	summer: 'assets/icons/sun.svg',
	rain: 'assets/icons/cloud-rain.svg',
	pause: 'assets/icons/pause.svg'
}

function playAudio(target: HTMLElement): void {
	function resetPrevAudio(): void {
		const prevAudioBlock = buttons.querySelector(`[data-weather=${prevWeather}`) as HTMLDivElement
		prevAudioBlock.querySelector('img')!.src = icons[`${prevAudioBlock.dataset.weather}`]
		const prevAudio = prevAudioBlock.querySelector('audio')!
		prevAudio.pause()
		prevAudio.currentTime = 0
		target.querySelector('audio')!.volume = prevAudio.volume
	}

	const audio: HTMLAudioElement = target.querySelector('audio')!
	audio.volume = currentVolumeLevel

	if (!isPlaying) {
		isPlaying = true
		target.querySelector('img')!.src = icons['pause']
		audio.play()
	} else {
		if (currentWeather === prevWeather) {
			target.querySelector('img')!.src = icons[`${target.dataset.weather}`]
			audio.pause()
			isPlaying = false
		} else {
			resetPrevAudio()
			target.querySelector('img')!.src = icons['pause']
			audio.play()
		}
	}
}

function changeBackground(target: HTMLElement): void {
	const bgSrc = target.dataset.bg!
	document.body.style.backgroundImage = `url("${bgSrc}")`
}

buttons.addEventListener('click', (e: MouseEvent) => {
	let target = e.target as HTMLElement

	if (target.tagName === 'IMG') {
		target = target.parentNode as HTMLDivElement
	}

	if (target.classList.contains('button')) {
		currentWeather = target.dataset.weather!
		changeBackground(target)
		playAudio(target)
		prevWeather = target.dataset.weather!
	}
})

volumeControl.addEventListener('change', (e: Event) => {
	const target = e.target as HTMLInputElement
	currentVolumeLevel = parseInt(target.value) / 100

	const activeAudio = document
		.querySelector(`[data-weather=${currentWeather}`)!
		.querySelector('audio') as HTMLAudioElement

	activeAudio.volume = currentVolumeLevel
})
