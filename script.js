//get relevant elements
const rightArrow = document.getElementById('arrow-right');
const scrollBox = document.getElementById('product-carousel');
const colorOptions = document.querySelectorAll('#color-option');

//add event listeners to color options
colorOptions.forEach((el) => {
	el.addEventListener('click', ({ target }) => {
		const relatedOptions = target.parentElement.children;
		for (option of relatedOptions) {
			if (option.classList.contains('selected')) {
				option.classList.remove('selected');
			}
		}
		target.classList.add('selected');
	});
});

//add click event listener
rightArrow.addEventListener('click', () => {
	//scroll till next element
	const items = document.querySelectorAll('#product-carousel li');
	if (items.length > 1) {
		const diff =
			items[1].getBoundingClientRect().left -
			items[0].getBoundingClientRect().left;
		//we need to remove smooth scrolling for drag-scroll to work seamlessly
		scrollBox.style.scrollBehavior = 'smooth';
		scrollBox.scrollLeft += diff;
		scrollBox.style.scrollBehavior = 'auto';
	}
});

let startX = 0;
let scrollLeft; //initial scroll position
let isMouseDown = false;
//add event listeners for drag-to-scroll functionality
scrollBox.addEventListener('mousedown', (e) => {
	startX = e.pageX;
	isMouseDown = true;
	scrollLeft = scrollBox.scrollLeft;
});
scrollBox.addEventListener('mouseup', () => {
	isMouseDown = false;
});
scrollBox.addEventListener('mouseleave', () => {
	isMouseDown = false;
	e.preventDefault();
});
scrollBox.addEventListener('mousemove', (e) => {
	if (!isMouseDown) {
		return;
	}
	e.preventDefault();
	const currentX = e.pageX;
	const diff = startX - currentX;
	scrollBox.scrollLeft = scrollLeft + diff;
});
