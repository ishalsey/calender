let changeMonth = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const cover = document.querySelector('.cover');
const calendar = document.querySelector('.calendar');
const addForm = document.querySelector('.addForm');
const deleteEvent = document.querySelector('.deleteEvent');
const formCover = document.querySelector('.formCover');
const header = document.querySelector('.header');
const week = document.querySelector('.week');
const textarea = document.querySelector('#event');
const weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const print = () => {
  const date = new Date();

  if (changeMonth !== 0) {
    date.setMonth(new Date().getMonth() + changeMonth);
  }

  const day = date.getDate();
  const month = date.getMonth();
  // const month = 5;
  const year = date.getFullYear();

  const lastDay = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1);
  const dateFormat = firstDay.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const blankDays = weekArray.indexOf(dateFormat.split(', ')[0]);
  header.textContent = `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= blankDays + lastDay; i++) {
    const days = document.createElement('div');
    const dayFormat = `${month + 1}/${i - blankDays}/${year}`;
    if (i > blankDays) {
      days.textContent = i - blankDays;
      days.classList.add('boxes');
      const dayEvent = events.find(e => e.date === dayFormat);
      if (i - blankDays === day && changeMonth === 0) {
        days.classList.add('currentDay');
      }
      if (dayEvent) {
        const item = document.createElement('div');
        item.classList.add('event');
        item.textContent = dayEvent.info;
        days.appendChild(item);
      }
      days.addEventListener('click', () => openPop(dayFormat));
    } else {
      days.classList.add('blankBoxes');
    }
    calendar.appendChild(days);
  }
};

const openPop = date => {
  clicked = date;
  const dayEvent = events.find(e => e.date === clicked);
  if (dayEvent) {
    document.querySelector('.formText').innerHTML = dayEvent.info;
    deleteEvent.classList.remove('hidden');
  } else {
    addForm.classList.remove('hidden');
  }
  formCover.classList.remove('hidden');
};
const cancelPop = () => {
  addForm.classList.add('hidden');
  deleteEvent.classList.add('hidden');
  formCover.classList.add('hidden');
  textarea.value = '';
  print();
};
const savePop = e => {
  e.preventDefault();
  events.push({ date: clicked, info: textarea.value });
  localStorage.setItem('events', JSON.stringify(events));
  cancelPop();
};
const deletePop = () => {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  cancelPop();
};
const buttons = () => {
  document.querySelector('.leftItem').addEventListener('click', () => {
    changeMonth--;
    print();
  });
  document.querySelector('.rightItem').addEventListener('click', () => {
    changeMonth++;
    print();
  });
  document.querySelector('.cancel').addEventListener('click', cancelPop);
  document.querySelector('.addEvent').addEventListener('click', savePop);
  document.querySelector('.delete').addEventListener('click', deletePop);
  document.querySelector('.quit').addEventListener('click', cancelPop);
};

buttons();
print();
