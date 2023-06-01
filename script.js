var draggedElement = null;
var items;
var number1;
var number2;
var index1;
var index2;
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

//1초 간격 드래그엔드롭 방법 이벤트리스터 재로드
setInterval(() => {
	items = document.querySelectorAll(".container .box");
	items.forEach(function (item) {
		item.addEventListener("dragstart", handleDragStart);
		item.addEventListener("dragenter", handleDragEnter);
		item.addEventListener("dragover", handleDragOver);
		item.addEventListener("dragleave", handleDragLeave);
		item.addEventListener("drop", handleDrop);
		item.addEventListener("dragend", handleDragEnd);
	});
}, 1000);

function onChangeProblem() {
	const a = [
		`<div class="container">
		<div draggable="true" class="dropzone box" data-item="number">
			67
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="number">
			84
		</div>
		<div class="dropzone box equal" data-item="symbol">=</div>
		<div draggable="true" class="dropzone box" data-item="variable">
			__
		</div>
		<div class="dropzone box" data-item="symbol">+</div>
		<div draggable="true" class="dropzone box" data-item="number">
			83
		</div>
	</div>`,
		`<div class="container">
	<div draggable="true" class="dropzone box" data-item="variable">
		__
	</div>
	<div class="dropzone box" data-item="symbol">
		+
	</div>
	<div draggable="true" class="dropzone box" data-item="number">
		55
	</div>
	<div class="dropzone box" data-item="symbol">
		=
	</div>
	<div draggable="true" class="dropzone box" data-item="number">
		37
	</div>
	<div class="dropzone box" data-item="symbol">
		+
	</div>
	<div draggable="true" class="dropzone box" data-item="number">
		54
	</div>
	</div>`,
		`<div class="container">
	<div draggable="true" class="dropzone box" data-item="number">
		60
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="variable">
		__
	</div>
	<div class="dropzone box" data-item="symbol">=</div>
	<div draggable="true" class="dropzone box" data-item="number">
		48
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="number">
		24
	</div>
	</div>
	`,
		`<div class="container">
	<div draggable="true" class="dropzone box" data-item="number">
		18
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="number">
		31
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div class="dropzone box" data-item="number">53</div>
	<div class="dropzone box" data-item="symbol">=</div>
	<div draggable="true" class="dropzone box" data-item="variables">
		__
	</div>
	<div class="dropzone box" data-item="symbol">+</div>
	<div draggable="true" class="dropzone box" data-item="number">
		63
	</div>
	</div>`,
	];
	const b = document.querySelector(".container");
	b.innerHTML = a[i];
}
onChangeProblem;
/*
//문제 바꾸기
function onChangeProblem() {
	const problems = [
		`<div class="container hidden">
			<div draggable="true" class="dropzone box" data-item="variable">
				__
			</div>
			<div class="dropzone box" data-item="symbol">
				+
			</div>
			<div draggable="true" class="dropzone box" data-item="number">
				55
			</div>
			<div class="dropzone box" data-item="symbol">
				=
			</div>
			<div draggable="true" class="dropzone box" data-item="number">
				37
			</div>
			<div class="dropzone box" data-item="symbol">
				+
			</div>
			<div draggable="true" class="dropzone box" data-item="number">
				54
			</div>
		</div>`,
		2,
		3,
	];

	const container = document.querySelector(".container");
	let chnum = 0;
	container.innerHTML = problems[chnum];
	chnum += 1;
}
const btn = querySelector(".btn");
btn.addEventListener("click", onChangeProblem);
*/
