//TWITCH PLAYER
var options = {
	width: '100%',
	height: '100%',
	channel: "wormtube",
	parent: ["assburrowingbuttworms.info"]
};
var streamer = new Twitch.Player("streamer", options);
streamer.setMuted(false);

//ARCHIVE PLAYER

let player = document.getElementById('player')
player.addEventListener('ended', function (event) { nextVideo() });

const playlistA = ['0046.mp4', '0038.mp4', '0034.mp4', '0033.mp4', '0027.mp4']
const playlistB = ['0043.mp4', '0039.mp4', '0037.mp4', '0024.mp4', '0023.mp4', '0017.mp4', '0011.mp4', '0007.mp4']


//DEFAULT SOURCE

streamer.addEventListener(Twitch.Player.ONLINE, function (event) { goLive(); console.log('live') });
streamer.addEventListener(Twitch.Player.OFFLINE, function (event) { goArchive(); console.log('unlive') });
streamer.addEventListener(Twitch.Player.PLAYBACK_BLOCKED, function (event) { console.log('blocked') });

//SOURCE SELECT Functions

function goLive() {
	document.getElementById('archivebutton').innerHTML = '|ARCHIVE|';
	document.getElementById('vcpbutton').innerHTML = '|VCP|';
	document.getElementById('vidgen').innerHTML = '|GENERATOR|';
	document.getElementById('archivebutton').className = 'buttonX';
	document.getElementById('vcpbutton').className = 'buttonX';
	document.getElementById('vidgen').className = 'buttonX';
	document.getElementById('player').className = 'srcOverlay';
	document.getElementById('playerN').className = 'srcOverlay';
	document.getElementById('playerA').className = 'srcOverlay';
	document.getElementById('playerB').className = 'srcOverlay';
	document.getElementById('vcp').className = 'srcOverlay'
	document.getElementById('vcp2').className = 'srcOverlay'
	document.getElementById('streamer').className = 'srcAb';
	document.getElementById('scan').className = 'buttonX';
	document.getElementById('scanSwitch').className = 'sliderX';
	document.getElementById('blend1').className = 'buttonX';
	document.getElementById('blender1').className = 'sliderX';
	document.getElementById('blend2').className = 'buttonX';
	document.getElementById('blender2').className = 'sliderX';
	document.getElementById('keySwitch').className = 'sliderX';
	document.getElementById('key').className = 'buttonX';
	document.getElementById('playerB').src = '';
	document.getElementById('playerA').src = '';
	document.getElementById('playerN').src = '';
	player.src = '';
	clearInterval(scanInt);
	streamer.play();
}

function goArchive() {
	document.getElementById('archivebutton').innerHTML = '>|ARCHIVE|';
	document.getElementById('vcpbutton').innerHTML = '|VCP|';
	document.getElementById('vidgen').innerHTML = '|GENERATOR|';
	document.getElementById('archivebutton').className = 'button';
	document.getElementById('vcpbutton').className = 'button';
	document.getElementById('vidgen').className = 'button';
	document.getElementById('player').className = 'srcAb';
	document.getElementById('playerN').className = 'srcOverlay';
	document.getElementById('playerB').className = 'srcOverlay';
	document.getElementById('playerA').className = 'srcOverlay';
	document.getElementById('streamer').className = 'srcOverlay';
	document.getElementById('vcp').className = 'srcOverlay'
	document.getElementById('vcp2').className = 'srcOverlay'
	document.getElementById('scan').className = 'buttonLabel';
	document.getElementById('blend1').className = 'buttonX';
	document.getElementById('blender1').className = 'sliderX';
	document.getElementById('blend2').className = 'buttonX';
	document.getElementById('blender2').className = 'sliderX';
	document.getElementById('scanSwitch').className = 'slider';
	document.getElementById('keySwitch').className = 'sliderX';
	document.getElementById('key').className = 'buttonX';
	document.getElementById('playerB').src = '';
	document.getElementById('playerA').src = '';
	document.getElementById('playerN').src = '';
	streamer.setMuted(true);
	streamer.pause();
	vcp.pause()
	vcp2.pause()
	nextVideo();
	scanState();
}
const archiveButton = document.getElementById('archivebutton')
archiveButton.addEventListener('click', function (event) { goArchive() });

function goVCP() {
	document.getElementById('archivebutton').innerHTML = '|ARCHIVE|';
	document.getElementById('vcpbutton').innerHTML = '>|VCP|';
	document.getElementById('vidgen').innerHTML = '|GENERATOR|';
	document.getElementById('archivebutton').className = 'button';
	document.getElementById('vcpbutton').className = 'button';
	document.getElementById('vidgen').className = 'button';
	document.getElementById('player').className = 'srcOverlay';
	document.getElementById('playerN').className = 'srcOverlay';
	document.getElementById('playerB').className = 'srcOverlay';
	document.getElementById('playerA').className = 'srcOverlay';
	document.getElementById('streamer').className = 'srcOverlay';
	document.getElementById('scan').className = 'buttonX';
	document.getElementById('scanSwitch').className = 'sliderX';
	document.getElementById('blend1').className = 'buttonX';
	document.getElementById('blender1').className = 'sliderX';
	document.getElementById('blend2').className = 'buttonX';
	document.getElementById('blender2').className = 'sliderX';
	document.getElementById('keySwitch').className = 'sliderX';
	document.getElementById('key').className = 'buttonX';
	document.getElementById('player').src = '';
	document.getElementById('playerB').src = '';
	document.getElementById('playerA').src = '';
	document.getElementById('playerN').src = '';
	streamer.setMuted(true);
	clearInterval(scanInt);
	vcp.play()
	vcp2.play()

}

document.getElementById('vcpbutton').addEventListener('click', function (event) { goVCP() });

function goVidGen() {
	document.getElementById('archivebutton').innerHTML = '|ARCHIVE|';
	document.getElementById('vcpbutton').innerHTML = '|VCP|';
	document.getElementById('vidgen').innerHTML = '>|GENERATOR|';
	document.getElementById('archivebutton').className = 'button';
	document.getElementById('vcpbutton').className = 'button';
	document.getElementById('vidgen').className = 'button';
	document.getElementById('playerN').className = 'srcAb';
	document.getElementById('playerB').className = 'srcAb';
	document.getElementById('playerA').className = 'srcAb';
	changeOpacity();
	document.getElementById('player').className = 'srcOverlay';
	document.getElementById('streamer').className = 'srcOverlay';
	document.getElementById('vcp').className = 'srcOverlay'
	document.getElementById('vcp2').className = 'srcOverlay'
	document.getElementById('scan').className = 'buttonX';
	document.getElementById('scanSwitch').className = 'sliderX';
	document.getElementById('blend1').className = 'buttonLabel';
	document.getElementById('blender1').className = 'slider';
	document.getElementById('blend2').className = 'buttonLabel';
	document.getElementById('blender2').className = 'slider';
	document.getElementById('keySwitch').className = 'slider';
	document.getElementById('key').className = 'buttonLabel';
	streamer.setMuted(true);
	player.src = '';
	vcp.pause()
	vcp2.pause()
	clearInterval(scanInt);
	document.getElementById('playerA').src = 'sourceA.html';
	document.getElementById('playerB').src = 'sourceA.html';
	document.getElementById('playerN').src = 'sourceN.html';
}
document.getElementById('vidgen').addEventListener('click', function (event) { goVidGen() });

//VIDEO CONTROL Functions

//HUE SHIFT
let hueShift = document.getElementById('hueShift');

function changeHue() {
	let newHue = hueShift.value + 'deg';
	document.getElementById('hueController').style.setProperty('--hue', newHue);
};

hueShift.addEventListener('input', function (event) {
	changeHue();
});

//
//SATURATION
let satShift = document.getElementById('satShift');

function changeSat() {
	let newSat = satShift.value + '%';;
	document.getElementById('hueController').style.setProperty('--sat', newSat);
};

satShift.addEventListener('input', function (event) {
	changeSat();
});

//
//NEGATIVE
let invShift = document.getElementById('invShift');

function changeInv() {
	let newInv = invShift.value + '%';
	document.getElementById('negController').style.setProperty('--inv', newInv);
};

invShift.addEventListener('input', function (event) {
	changeInv();
});

//
//BLEND

const blenderMode = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn',
	'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

let blender1 = document.getElementById('blender1');

function changeOpacity() {
	let newOpacity = blender1.value
	let newOpacityN = 0.2 + (blender1.value * 0.3)
	document.getElementById('playerB').style.opacity = newOpacity
	document.getElementById('playerN').style.opacity = newOpacityN
};

blender1.addEventListener('input', function (event) {
	changeOpacity();
});

let blender2 = document.getElementById('blender2');

function changeBlend() {
	let newBlendB = blenderMode[blender2.value];
	let newBlendA = blenderMode[blender2.value - 1];
	document.getElementById('playerB').style.mixBlendMode = newBlendB;
};

blender2.addEventListener('input', function (event) {
	changeBlend();
});

//
//KEY

let keySwitch = document.getElementById('keySwitch')
keySwitch.addEventListener('input', function (event) {
	switch (true) {
		case keySwitch.value == 0:
			goKeyNull();
			break;
		case keySwitch.value == 1:
			goKeyR();
			break;
		case keySwitch.value == 2:
			goKeyG();
			break;
		case keySwitch.value == 3:
			goKeyB();
	};
});

function goKeyR() {
	document.getElementById('playerB').className = 'srcKeyR';
}

function goKeyG() {
	document.getElementById('playerB').className = 'srcKeyG';
}

function goKeyB() {
	document.getElementById('playerB').className = 'srcKeyB';
}

function goKeyNull() {
	document.getElementById('playerB').className = 'srcAb';
	changeOpacity();
}
//

let reset = document.getElementById('none')
function goNone() {
	document.getElementById('playerB').className = 'srcBlend';
	hueShift.value = '0';
	satShift.value = '100';
	invShift.value = '0';
	hueValue.innerHTML = '0deg';
	satValue.innerHTML = '100%';
	invValue.innerHTML = '0%';
	blender1.value = '0.5';
	blender2.value = '0';
	keySwitch.value = '0';
}
reset.addEventListener('click', function (event) {
	goNone();
	changeHue();
	changeSat();
	changeInv();
});

function goFS() {
	document.getElementById('vidContainer').requestFullscreen();
}
document.getElementById('fs').onclick = function () { goFS() };

//SCAN			 

function nextVideo() {
	let playerSourceString = (player.src).toString()
	let nowPlaying
	if (playerSourceString.startsWith('file')) {
		nowPlaying = playerSourceString.substring(28)
		console.log('local')
		if (playlistA.includes(nowPlaying)) {
			let randomVidB = Math.floor(Math.random() * playlistB.length)
			player.src = '/E:/WORMTUBE/Archive/' + playlistB[randomVidB]
		} else if (playlistB.includes(nowPlaying)) {
			let randomVidA = Math.floor(Math.random() * playlistA.length)
			player.src = '/E:/WORMTUBE/Archive/' + playlistA[randomVidA]
		} else if (!playlistA.includes(nowPlaying) && !playlistB.includes(nowPlaying)) {
			let randomVidB = Math.floor(Math.random() * playlistB.length)
			player.src = '/E:/WORMTUBE/Archive/' + playlistB[randomVidB]
		}
	} else {
		nowPlaying = playerSourceString.substring(27)
		console.log('web')
		if (playlistA.includes(nowPlaying)) {
			let randomVidB = Math.floor(Math.random() * playlistB.length)
			player.src = "https://wormtube.b-cdn.net/" + playlistB[randomVidB]
		} else if (playlistB.includes(nowPlaying)) {
			let randomVidA = Math.floor(Math.random() * playlistA.length)
			player.src = "https://wormtube.b-cdn.net/" + playlistA[randomVidA]
		} else if (!playlistA.includes(nowPlaying) && !playlistB.includes(nowPlaying)) {
			let randomVidB = Math.floor(Math.random() * playlistB.length)
			player.src = "https://wormtube.b-cdn.net/" + playlistB[randomVidB]
		}
	}
	console.log(nowPlaying)
	player.className = 'srcOverlay'
	player.pause()
}

function timeSet() {
	let vidDur = player.duration;
	let startTime = Math.floor(Math.random() * vidDur);
	player.currentTime = startTime;
};

function changeChannel() {
	player.className = 'srcAb'
	player.play()
}

player.addEventListener('durationchange', function (event) {
	timeSet()
});

player.addEventListener('seeked', function (event) {
	changeChannel()
});

function skip() {
	clearInterval(scanInt);
	nextVideo();
	scanState();
	console.log('skipped')
}

const scanSwitch = document.getElementById('scanSwitch');
let scanInt;

function scanState() {
	if (scanSwitch.value > 0) {
		let scanny = scanSwitch.value;
		let scanno = Math.floor(Math.random() * ((200 + 1) / scanny) + 50);
		let scanTime = 1000 * (scanno / scanny);
		scanInt = setInterval(skip, scanTime);
	} else {
		clearInterval(scanInt);
	}
};

scanSwitch.addEventListener('change', function (event) {
	clearInterval(scanInt);
	scanState();
});

//SOUND CONTROL Functions

let volume = document.getElementById('volume');
let nowVol

volume.addEventListener('input', function (event) {
	nowVol = (this.value)
});
volume.addEventListener('input', function (event) {
	player.muted = false
}
);
volume.addEventListener('input', function (event) {
	streamer.setMuted(false)
}
);

document.body.addEventListener('load', function (event) { player.muted = true; });
document.body.addEventListener('load', function (event) { volume.value = '0'; });

function setVolArc() {
	player.volume = nowVol
};
setInterval(setVolArc, 10);

function setVolStr() {
	streamer.setVolume(nowVol)
};
setInterval(setVolStr, 10);

//TIMECODE CHEAT

function scanEnable() {
	sessionStorage.setItem('scanEnable', '1')
}

let timecodeCheat = {};

document.addEventListener('keydown', (event) => {
	timecodeCheat[event.key] = true;
});

document.addEventListener('keyup', (event) => {
	delete this.timecodeCheat[event.key];
});

document.addEventListener('keydown', (event) => {
	timecodeCheat[event.key] = true;

	if (timecodeCheat['w'] && event.key == 't') {
		sessionStorage.setItem('scanEnable', '0')
		let seek = prompt('Time (seconds)');
		player.currentTime = seek;
		scanSwitch.value = 0;
		setTimeout(scanEnable, 1000)
	}
});

document.addEventListener('keyup', (event) => {
	delete timecodeCheat[event.key];
});

//SKIP VIDEO CHEAT

let skipvideoCheat = {};

document.addEventListener('keydown', (event) => {
	skipvideoCheat[event.key] = true;
});

document.addEventListener('keyup', (event) => {
	delete this.skipvideoCheat[event.key];
});

document.addEventListener('keydown', (event) => {
	skipvideoCheat[event.key] = true;

	if (skipvideoCheat['s'] && event.key == 'v') {
		nextVideo()
	}
});

document.addEventListener('keyup', (event) => {
	delete skipvideoCheat[event.key];
});
