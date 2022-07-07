const draggable_list = document.getElementById("draggable-list");
const check = document.querySelector(".check-btn");

const richestPeople = [
  "Elon Musk",
  "Bernard Arnault",
  "Jeff Bezos",
  "Bill Gates",
  "Gautam Adani",
  "Warren Buffett",
  "Larry Ellison",
  "Larry Page",
  "Sergey Brin",
  "Steve Ballmer",
];
console.log(richestPeople);
const listItems = [];

let dragStartIndex;

check.addEventListener('click', checkOrder);

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      // console.log(person);
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true" >
            <p class="person-name">${person}</p>
            <i class="fa-solid fa-bars"></i>
          </div>`;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}
function dragOver(e) {
  //console.log("dragOver");
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}
function dragEnter() {
  //console.log("dragEnter");
  this.classList.add("over");
}
function dragLeave() {
  this.classList.remove("over");
}

// Check the Order of list Items

function checkOrder() {
  //console.log(listItems);
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()
     //   console.log(personName);
        if ( personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        }
        else {
            listItem.classList.add('right');
            listItem.classList.remove('wrong');
        }
    })
    
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragList = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  dragList.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}
