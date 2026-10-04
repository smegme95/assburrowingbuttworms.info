//VIDEO PLAYER

let vcp = document.getElementById('vcp')
let vcp2 = document.getElementById('vcp2')
let archive = document.getElementById('player')

vcp.addEventListener('ended', function (event) {
	ejectAVid()
});

vcp2.addEventListener('ended', function (event) {
	ejectBVid()
});

//TAPES
let vcrA = document.getElementById('vcrA')
let vcrB = document.getElementById('vcrB')
let deadair = document.getElementById('deadair')

const tapes = document.getElementsByClassName('vhs');
for (let i = 0; i < tapes.length; i++) {
	document.getElementById('div1').appendChild(tapes[i])
}

function loadLibItem(cas) {
	let libItemString = localStorage.getItem(cas)
	let libItem = JSON.parse(libItemString)
	let item = document.createElement('div')
	item.dataset.vidid = libItem[1]
	item.dataset.title = libItem[0]
	item.innerHTML = libItem[0]
	item.className = 'vhs'
	item.draggable = true
	item.setAttribute('ondragstart', 'drag(event)')
	item.setAttribute('data-start', libItem[2])
	item.setAttribute('data-stop', libItem[3])
	div1.appendChild(item)
}

function overdub() {
	oldTape = vcrBlank.lastChild.innerHTML
	if (oldTape != '_______') {
		localStorage.removeItem(oldTape)
		let libraryString = localStorage.getItem('library00')
		let library = JSON.parse(libraryString)
		let oldIndex = library.indexOf(oldTape)
		library.splice(oldIndex, 1)
		newLibrary = JSON.stringify(library)
		localStorage.setItem('library00', newLibrary)
	}
}

function loadLib() {
	let libraryString = localStorage.getItem('library00')
	let library = JSON.parse(libraryString)
	for (let i = 0; i < library.length; i++) {
		loadLibItem(library[i])
	}
}

window.onload = function (event) {
	if (localStorage.getItem('library00') != null) {
		loadLib();
	}
	dub();
}

function allowDrop(ev) {
	ev.preventDefault();
}

let dragImage

function drag(ev) {
	ev.dataTransfer.setData('vidid', ev.target.dataset.vidid);
	ev.dataTransfer.setData('title', ev.target.dataset.title);
	dragImage = ev.target.cloneNode(true);
	ev.target.style.opacity = '0';
	dragImage.id = 'draggeimage';
	dragImage.style.position = 'absolute';
	dragImage.style.pointerEvents = 'none';
	document.body.appendChild(dragImage);
	document.addEventListener('dragover', function (event) {
		if (dragImage) {
			dragImage.style.left = (event.pageX - 25) + "px";
			dragImage.style.top = (event.pageY - 25) + "px";
		}
	});
	ev.target.ondragend = function () {
		dragImage.remove();
		ev.target.style.opacity = '1';
		document.removeEventListener('dragover', function (event) {
			if (dragImage) {
				dragImage.style.left = (page.clientX - 25) + "px";
				dragImage.style.top = (page.clientY - 25) + "px";
			}
		});
	}
}

function vidChange(ev) {
	if (vcrA.children.length < 3) {
		ev.preventDefault();
		var vidNewId = ev.dataTransfer.getData('vidid');
		var vidNewTitle = ev.dataTransfer.getData('title');
		var localCheck = (window.location.href).toString()
		ev.target.appendChild(document.querySelector(`[data-title="${CSS.escape(vidNewTitle)}"]`));
		ev.target.lastChild.style.zIndex = '-2'
		const intervalTimecodeA = setInterval(updateTimecodeA, 100);
		if (localCheck.startsWith('file')) {
			vcp.src = "/E:/WORMTUBE/Archive/" + vidNewId + '.mp4'
		} else {
			vcp.src = "https://wormtube.b-cdn.net/" + vidNewId + '.mp4'
		}
	}
}

function vidBChange(ev) {
	if (vcrB.children.length < 3) {
		ev.preventDefault();
		var vidNewId = ev.dataTransfer.getData('vidid');
		var vidNewTitle = ev.dataTransfer.getData('title');
		var localCheck = (window.location.href).toString()
		ev.target.appendChild(document.querySelector(`[data-title="${CSS.escape(vidNewTitle)}"]`));
		ev.target.lastChild.style.zIndex = '-2'
		const intervalTimecodeB = setInterval(updateTimecodeB, 100);
		if (localCheck.startsWith('file')) {
			vcp2.src = "/E:/WORMTUBE/Archive/" + vidNewId + '.mp4'
		} else {
			vcp2.src = "https://wormtube.b-cdn.net/" + vidNewId + '.mp4'
		}
	}
}

function loadBlank(ev) {
	var vidNewId = ev.dataTransfer.getData('vidid');
	var vidNewTitle = ev.dataTransfer.getData('title');
	ev.preventDefault();
	ev.target.appendChild(document.querySelector(`[data-title="${CSS.escape(vidNewTitle)}"]`));
	ev.target.lastChild.style.zIndex = '-2'
	let tapeNumber = document.getElementById('div1').children.length
	customTitle.value = 'tape ' + (1 + tapeNumber)
}

function vidPlay() {
	goVCP()
	let clip = vcrA.children[2]
	let startTC = Number(clip.dataset.start);
	if (document.getElementById('vcrA').children.length >= 3) {
		nowRate = 1;
		document.getElementById('seeker').value = 1;
		vcp.currentTime = startTC;
		vcp.playbackRate = 1.0;
		vcp.play()
		document.getElementById('vcp').className = 'srcAb';
		stopCheck = setInterval(clipStopA, 100);
	}
}

function vidPlay2() {
	goVCP()
	let clip = vcrB.children[2]
	let startTC = Number(clip.dataset.start);
	if (document.getElementById('vcrB').children.length >= 3) {
		nowRate2 = 1;
		document.getElementById('seeker2').value = 1;
		vcp2.currentTime = startTC;
		vcp2.playbackRate = 1.0;
		vcp2.play()
		document.getElementById('vcp2').className = 'srcAb';
		vcp.style.setProperty('--invop', 100);
		stopCheckB = setInterval(clipStopB, 100);
	}
}

function vidStop() {
	resetTimecodeA();
	nowRate = 0;
	document.getElementById('seeker').value = 0;
	vcp.pause();
	vcp.className = 'srcOverlay';
	clearInterval(stopCheck);

}

function vidStop2() {
	resetTimecodeB();
	nowRate2 = 0;
	document.getElementById('seeker2').value = 0;
	vcp2.pause();
	vcp2.className = 'srcOverlay';
	vcp.style.setProperty('--invop', mixInv);
	clearInterval(stopCheckB);
}

function ejectAVid() {
	if (document.getElementById('vcrA').children.length >= 3) {
		resetTimecodeA();
		nowRate = 0;
		document.getElementById('seeker').value = 0;
		document.getElementById('vcp').className = 'srcOverlay';
		vcp.src = '';
		var tape = document.getElementById('vcrA').lastChild;
		if (tape.dataset.title == '123456789') {
			blankSource.appendChild(tape)
		} else {
			div1.appendChild(tape)
		};
		tape.style.zIndex = '0'
		clearInterval(intervalTimecodeA);
	}
}

function ejectBVid() {
	if (document.getElementById('vcrB').children.length >= 3) {
		resetTimecodeB();
		nowRate2 = 0;
		document.getElementById('seeker2').value = 0;
		document.getElementById('vcp2').className = 'srcOverlay';
		vcp2.src = '';
		var tape2 = document.getElementById('vcrB').lastChild;
		if (tape2.dataset.title == '123456789') {
			blankSource.appendChild(tape2)
		} else {
			div1.appendChild(tape2)
		};
		tape2.style.zIndex = '0'
		clearInterval(intervalTimecodeB);
	}
}

function ejectBlank() {
	if (document.getElementById('vcrBlank').children.length >= 1) {
		var tapeBlank = document.getElementById('vcrBlank').lastChild;
		tapeBlank.style.zIndex = '0'
		if (tapeBlank.innerHTML == '_______') {
			blankSource.appendChild(tapeBlank)
		} else {
			div1.appendChild(tapeBlank);
		}
	}
}

document.getElementById('ejectA').addEventListener('click', function (event) {
	ejectAVid()
});
document.getElementById('ejectB').addEventListener('click', function (event) {
	ejectBVid()
});
document.getElementById('ejectBlank').addEventListener('click', function (event) {
	ejectBlank()
});
document.getElementById('play').addEventListener('click', function (event) {
	vidPlay()
});
document.getElementById('play2').addEventListener('click', function (event) {
	vidPlay2()
});
document.getElementById('stop').addEventListener('click', function (event) {
	vidStop()
});
document.getElementById('stop2').addEventListener('click', function (event) {
	vidStop2()
});

function clipStopA() {
	let clip = vcrA.lastChild
	let startTime = clip.dataset.start
	let stopTime = clip.dataset.stop
	if (nowTime > stopTime || nowTime < startTime) {
		vidStop()
		ejectAVid()
	}
}

function clipStopB() {
	let clip = vcrB.lastChild
	let startTime = clip.dataset.start
	let stopTime = clip.dataset.stop
	if (nowTime2 > stopTime || nowTime2 < startTime) {
		vidStop2()
		ejectBVid()
	}
}

//RECORD

let vcrBlank = document.getElementById('vcrBlank')
let recLight = document.getElementById('recLight')

let customTitle = document.getElementById('customTitle')
let customId = document.getElementById('customA')

function recStart() {
	let testTape = vcrBlank.lastChild
	testTape.dataset.vidid = ((archive.src).toString()).slice(-8, -4)
	testTape.dataset.start = archive.currentTime
	recLight.className = 'recOn'
	scanSwitch.value = 0;
	scanState();
	scanSwitch.className = 'sliderX'
	scan.className = 'buttonX'
	overdub();
}

function recStop() {
	let testTape = vcrBlank.lastChild
	testTape.dataset.stop = archive.currentTime
	recLight.className = 'recOff'
	let tapeName = JSON.stringify(customTitle.value)
	testTape.innerHTML = customTitle.value
	testTape.dataset.title = customTitle.value
	let tapeInfo = [customTitle.value, testTape.dataset.vidid, Math.floor(testTape.dataset.start), Math.floor(testTape.dataset.stop)]
	let tapeInfoString = JSON.stringify(tapeInfo)
	localStorage.setItem(customTitle.value, tapeInfoString)
	appendToStorage('library00', tapeName)
	ejectBlank();
	scanSwitch.className = 'slider'
	scan.className = 'buttonLabel'
	dub();
}

function appendToStorage(name, data) {
	var old = localStorage.getItem(name);
	if (old === null) old = '[]';
	let comma = ','
	if (old.length < 8) comma = '';
	localStorage.setItem(name, old.slice(0, -1) + comma + data + ']');
}

function dub() {
	let blankNumber = document.querySelectorAll(`[data-vidid="blank"]`).length
	if (blankNumber == 0) {
		let newDub = document.createElement('div')
		newDub.dataset.vidid = 'blank'
		newDub.dataset.title = '123456789'
		newDub.innerHTML = '_______'
		newDub.className = 'vhs'
		newDub.draggable = true
		newDub.setAttribute('ondragstart', 'drag(event)')
		newDub.setAttribute('data-start', '0')
		newDub.setAttribute('data-stop', '0')
		blankSource.appendChild(newDub)
	}
}

let div1 = document.getElementById('div1')
let blankSource = document.getElementById('blankSource')

document.getElementById('rec').addEventListener('click', function (event) {
	if (recLight.className == 'recOff') {
		recStart()
	} else if (recLight.className == 'recOn') {
		recStop()
	}
});

//SEEK
let speed = document.getElementById('seeker');
let speed2 = document.getElementById('seeker2');
let nowRate
let nowRate2
let wind
let wind2
let nowTime
let nowTime2

speed.addEventListener('input', function (event) {
	nowRate = this.value
}
);

speed2.addEventListener('input', function (event) {
	nowRate2 = this.value
}
);

function vidRate() {
	let newRate = nowRate
	if (newRate >= 0) {
		vcp.playbackRate = newRate;
		wind = 0
	} else if (newRate < 0 && newRate > -1) {
		wind = 1;
		rewind025();
	} else if (newRate < -0.75 && newRate > -1.5) {
		wind = 1;
		rewind1();
	} else if (newRate < -1.25) {
		wind = 1;
		rewind2();
	}
};

function vidRate2() {
	let newRate2 = nowRate2
	if (newRate2 >= 0) {
		wind2 = 0;
		vcp2.playbackRate = newRate2
	} else if (newRate2 < -0 && newRate2 > -1) {
		wind2 = 1;
		rewind025B();
	} else if (newRate2 < -0.75 && newRate2 > -1.5) {
		wind2 = 1;
		rewind1B();
	} else if (newRate2 < -1.25) {
		wind2 = 1;
		rewind2B();
	}
};

setInterval(vidRate, 100);
setInterval(vidRate2, 100);

function rewind025() {
	let newTime = nowTime - 0.25;
	vcp.currentTime = newTime;
};

function rewind1() {
	let newTime = nowTime - 1;
	vcp.currentTime = newTime;
};

function rewind2() {
	let newTime = nowTime - 2;
	vcp.currentTime = newTime;
};

function rewind025B() {
	let newTime2 = nowTime2 - 0.25;
	vcp2.currentTime = newTime2;
};

function rewind1B() {
	let newTime2 = nowTime2 - 1;
	vcp2.currentTime = newTime2;
};

function rewind2B() {
	let newTime2 = nowTime2 - 2;
	vcp2.currentTime = newTime2;
};

function updateTimecodeA() {
	nowTime = vcp.currentTime;
	let currentA = vcrA.lastChild

	let codeTime = nowTime - Number(currentA.dataset.start)

	let sec = Math.floor(codeTime) - ((60 * document.getElementById('minu').innerHTML) + (3600 * document.getElementById('hr').innerHTML));
	let minu = Math.floor(codeTime / 60) - (60 * document.getElementById('hr').innerHTML);
	let hr = Math.floor((codeTime / 60) / 60);

	if (vcp.paused == false) {
		document.getElementById('sec').innerHTML = (sec.toString()).padStart(2, '0');
		document.getElementById('minu').innerHTML = (minu.toString()).padStart(2, '0');
		document.getElementById('hr').innerHTML = hr;
	}
};

function updateTimecodeB() {
	nowTime2 = vcp2.currentTime;
	let currentB = vcrB.lastChild

	let codeTime2 = nowTime2 - Number(currentB.dataset.start)

	let sec = Math.floor(codeTime2) - ((60 * document.getElementById('min2').innerHTML) + (3600 * document.getElementById('hr2').innerHTML));
	let minu = Math.floor(codeTime2 / 60) - (60 * document.getElementById('hr2').innerHTML);
	let hr = Math.floor((codeTime2 / 60) / 60);

	if (vcp2.paused == false) {
		document.getElementById('sec2').innerHTML = (sec.toString()).padStart(2, '0');
		document.getElementById('min2').innerHTML = (minu.toString()).padStart(2, '0');
		document.getElementById('hr2').innerHTML = hr;
	}
};

function resetTimecodeA() {
	vcp.currentTime = 0
	document.getElementById('sec').innerHTML = '00';
	document.getElementById('minu').innerHTML = '00';
	document.getElementById('hr').innerHTML = '0'
};

function resetTimecodeB() {
	vcp2.currentTime = 0
	document.getElementById('sec2').innerHTML = '00';
	document.getElementById('min2').innerHTML = '00';
	document.getElementById('hr2').innerHTML = '0'
};

//
//MIXER
let mix = document.getElementById('mix');
let vol
let mixValue
let mixInv

function changeMixAB() {
	let voll = 100 - mix.value
	mixValue = mix.value + '%';
	mixInv = voll + '%';
	vol = voll / 100
	let invMix = mixInv
	vcp2.style.setProperty('--op', mixValue);
	vcp.style.setProperty('--invop', 100);
	vcp2.volume = (mix.value / 100) * nowVol
	vcp.volume = vol * nowVol
};

function changeMix() {
	let voll = 100 - mix.value
	mixValue = mix.value + '%';
	mixInv = voll + '%';
	vol = voll / 100
	vcp2.style.setProperty('--op', mixValue);
	vcp.style.setProperty('--invop', mixInv);
	vcp2.volume = (mix.value / 100) * nowVol
	vcp.volume = vol * nowVol
};

mix.addEventListener('input', function (event) {
	let playA = vcp.className
	let playB = vcp2.className
	if (playA == 'srcAb' && playB == 'srcAb') {
		changeMixAB();
	} else {
		changeMix();
	}
});

volume.addEventListener('input', function (event) {
	let playA = vcp.className
	let playB = vcp2.className
	if (playA == '' && playB == '') {
		changeMixAB();
	} else {
		changeMix();
	}
});

window.addEventListener('load', function (event) {
	nowVol = 0
	changeMix()
});


//