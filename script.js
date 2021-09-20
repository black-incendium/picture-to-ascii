//let characters = ["M","@","#","a","i","+","_","."];
let characters = [".","_","+","i","a","#","@","M"];
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
let fileInput = document.querySelector('.fileInput');
let reader = new FileReader();
let charactersWidth = 300;
fileInput.addEventListener("custom", e => {
	let file = e.target.files[0];
	reader.addEventListener("load", e2 => {
		let img = new Image();
		img.addEventListener("load", () => {
			canvas.height = img.height*charactersWidth/img.width;
			canvas.width = charactersWidth;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			toAscii(ctx.getImageData(0,0,canvas.width,canvas.height));
			//grayLevel(ctx.getImageData(0,0,canvas.width,canvas.height))
		}, {once: true});

		img.src = e2.target.result;
	}, {once: true});

	reader.readAsDataURL(file);
});

document.querySelector('.button50').addEventListener('click', function(){
	charactersWidth = 50;
	fileInput.dispatchEvent(new Event('custom'));
});

document.querySelector('.button100').addEventListener('click', function(){
	charactersWidth = 100;
	fileInput.dispatchEvent(new Event('custom'));
});

document.querySelector('.button300').addEventListener('click', function(){
	charactersWidth = 300;
	fileInput.dispatchEvent(new Event('custom'));
});

function toAscii(imgData) {
	let grayness = 0;
	let result = "";
	for (let i=0; i<imgData.height*4; i+=4)
	{
		for (let j=0; j<imgData.width*4; j+=4)
		{
			grayness = imgData.data[i*imgData.width+j]*0.299 + imgData.data[i*imgData.width+j+1]*0.587 + imgData.data[i*imgData.width+j+2]*0.114;
			result += characters[Math.floor(grayness/32)]
		}
		result += "<br>";
	}
	document.querySelector(".asciiEffect").innerHTML = result;
}

function fillWith(character) {
	let string = "";
	for (let i=0; i<100; i++) {
		for (let j=0; j<100; j++) {
			string += character;
		}
		string += "<br/>";
	}
	document.querySelector("div").innerHTML = string;
}

function grayLevel(imgData) {
	let grayness = 0;
	let counter = 0;
	for (let i=0; i<imgData.data.length; i+=4)
	{
		counter++;
		grayness += imgData.data[i]*0.299 + imgData.data[i+1]*0.587 + imgData.data[i+2]*0.114;
	}
	console.log(grayness/counter);
}