var draggedElement = null;
var items;
var number1;
var number2;
var index1;
var index2;
var number2target;
var i = 0;

function handleDragStart(e) {
	this.style.opacity = "0.4";
	draggedElement = this;
	number1 = e.target.innerText;
	index1 = [...e.target.parentNode.children].indexOf(e.target);
	e.dataTransfer.effectAllowed = "move";
	e.dataTransfer.setData("item", this.innerHTML);
}

function handleDragOver(e) {
	if (e.preventDefault) e.preventDefault();
	e.dataTransfer.dropEffect = "move";
	return false;
}

function handleDragEnter(e) {
	this.classList.add("dragover");
}

function handleDragLeave(e) {
	this.classList.remove("dragover");
}

function handleDrop(e) {
	if (e.stopPropagation) e.stopPropagation();
	if (draggedElement != this) {
		number2 = e.target.innerText;
		//숫자 나누기
		if (number2 > number1) {
			const equal = document.querySelector(".equal");
			equalIndex = [...e.target.parentNode.children].indexOf(equal);
			index2 = [...e.target.parentNode.children].indexOf(e.target);
			if ((equalIndex - index1) * (equalIndex - index2) < 0) {
				divnumbers = `
				<div draggable="true" class="dropzone box" data-item="number"> ${number1} </div>
				<div draggable="true" class="dropzone box" data-item="symbol"> + </div>
				<div draggable="true" class="dropzone box" data-item="number"> ${
					number2 - number1
				} </div>
				`;
				e.target.insertAdjacentHTML("beforebegin", divnumbers);
				e.target.remove();
			}
		}
		//숫자 바꾸기
		if (
			draggedElement != this &&
			this.dataset.item != "symbol" &&
			(equalIndex - index1) * (equalIndex - index2) > 0
		) {
			draggedElement.innerHTML = this.innerHTML;
			draggedElement.setAttribute("data-item", this.innerHTML);

			let replacedItem = e.dataTransfer.getData("item");
			this.innerHTML = replacedItem;
			this.setAttribute("data-item", replacedItem);
		}
	}
	return false;
}

function handleDragEnd(e) {
	this.style.opacity = "1";

	items.forEach(function (item) {
		item.classList.remove("dragover");
	});
}

//문제 바꾸기
function onChangeProblem() {
	const a = [
		`<div draggable="true" class="dropzone box" data-item="number">
		24
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="number">
			15
		</div>
		<div class="dropzone box equal" data-item="symbol">=</div>
		<div draggable="true" class="dropzone box" data-item="number">
			24
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="variable">
			__
		</div>
		</div>`,
		`<div draggable="true" class="dropzone box" data-item="number">
		60
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="variable">
		__
	</div>
	<div class="dropzone box equal" data-item="symbol">=</div>
	<div draggable="true" class="dropzone box" data-item="number">
		48
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="number">
		24
	</div>
	</div>
	`,
		`<div draggable="true" class="dropzone box" data-item="number">
		18
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="number">
		31
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="number">53</div>
	<div class="dropzone box equal" data-item="symbol">=</div>
	<div draggable="true" class="dropzone box" data-item="variables">
		__
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="number">
		63
	</div>
	</div>`,
		`<div draggable="true" class="dropzone box" data-item="number">
			24
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="number">
			15
		</div>
		<div class="dropzone box equal" data-item="symbol">=</div>
		<div draggable="true" class="dropzone box" data-item="number">
			24
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="variable">
			__
		</div>
	</div>`,
		`<div draggable="true" class="dropzone box" data-item="number">
			47
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="number">
			26
		</div>
		<div class="dropzone box equal" data-item="symbol">=</div>
		<div draggable="true" class="dropzone box" data-item="number">
			44
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="variable">
			__
		</div>
	</div>`,
		`<div draggable="true" class="dropzone box" data-item="number">
			24
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="variable">
		__</div>
		<div class="dropzone box equal" data-item="symbol">=</div>
		<div draggable="true" class="dropzone box" data-item="number">
			28
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="number">
			58
		</div>
	</div>`,
	];
	const b = document.querySelector(".container");
	b.innerHTML = a[i];
	i < 5 ? (i += 1) : (i = 0);
}

const btn = document.querySelector(".btn");
btn.addEventListener("click", onChangeProblem);

//더블클릭으로 분할
const dialog = document.querySelector("dialog");

function onDivide(e) {
	number2target = e.target;
	number2 = e.target.innerText;
	dialog.showModal();
}

dialog.addEventListener("close", (e) => {
	if (dialog.returnValue == "confirm") {
		number1 = document.getElementById("dnum").value;
		console.log(number1, number2);
		divnumbers = `
		<div draggable="true" class="dropzone box" data-item="number"> ${number1} </div>
		<div draggable="true" class="dropzone box" data-item="symbol"> + </div>
		<div draggable="true" class="dropzone box" data-item="number"> ${
			number2 - number1
		} </div>
		`;
		number2target.insertAdjacentHTML("beforebegin", divnumbers);
		number2target.remove();
	}
});

//1초 간격 드래그엔드롭 방법 이벤트리스터 재로드
function onEvent() {
	items = document.querySelectorAll(".container .box");
	items.forEach(function (item) {
		item.addEventListener("dragstart", handleDragStart);
		item.addEventListener("dragenter", handleDragEnter);
		item.addEventListener("dragover", handleDragOver);
		item.addEventListener("dragleave", handleDragLeave);
		item.addEventListener("drop", handleDrop);
		item.addEventListener("dragend", handleDragEnd);
		item.addEventListener("dblclick", onDivide);
		item.addEventListener("click", onBorder);
	});
}
setInterval(onEvent, 1000);

//색깔창 추가, 클릭으로 색깔 변경
const colorOptions = Array.from(
	document.getElementsByClassName("color-option")
);

const color = document.getElementById("color");

function onColorClick(e) {
	const colorValue = e.target.dataset.color;
	color.value = colorValue;
}

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

function onBorder(e) {
	e.target.style.border = `3px solid ${color.value}`;
}

//필기 기능
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const destroyBtn = document.getElementById("destroy-btn");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let isPainting = false;
let isFilling = false;

function onMove(e) {
	if (isPainting) {
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
		return;
	}
	ctx.beginPath();
	ctx.moveTo(e.offsetX, e.offsetY);
}

function startPainting() {
	isPainting = true;
}

function cancelPainting() {
	isPainting = false;
}
function onDestroyClick() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 800);
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
destroyBtn.addEventListener("click", onDestroyClick);
