const calendar = document.querySelector('.calendar-container');
const calendarFooter = document.querySelector('.calendar-footer');
const notesContainer = document.querySelector('.notes-cont');
const addedNotes = document.querySelector('.added-notes');
let monthPicker = calendar.querySelector('#cur-month');

const monthNamesArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const addedNotesArr = [];

const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0);
}

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

const addActiveClass = (day,year,id) => {

    addedNotesArr.forEach(note => {
        if(note.date.day === day && note.date.month === monthNamesArr[currMonth.value] && note.date.year === year){
            
            document.getElementById(`${id}`).classList.add('added-notes-on-date');
        }
    })
}

const generateCalendar = (month, year) => {


    let calendarDays = calendar.querySelector('.calendar-days');
    let calendarHeaderYear = calendar.querySelector('#year');

    let daysOfMonth = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    calendarDays.innerHTML = '';

    let currDate = new Date();

    if (month === undefined){
        month = currDate.getMonth();
    }
    if (year === undefined)  {
       year = currDate.getFullYear();
    }

    let currMonth = `${monthNamesArr[month]}`;
    monthPicker.innerHTML = currMonth;
    calendarHeaderYear.innerHTML = year;

    
    let firstDay = new Date(year, month, 1);

    for (let i = 0; i <= daysOfMonth[month] + firstDay.getDay() - 1; i++) {
        let day = document.createElement('div');
        let id = Math.random()
        day.setAttribute("id", `${id}`)

        if (i >= firstDay.getDay()) {
            day.classList.add('calendar-day-hover');
            
            
            day.innerHTML = i - firstDay.getDay() + 1;

            if (i - firstDay.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date');
            }
        }
        calendarDays.appendChild(day);

        day.addEventListener('click', () => {
            
            document.querySelector('.added-notes').innerHTML = '';

            if(addedNotesArr.length > 0){
                onRenderNotes(parseInt(day.innerHTML),year);
            }

            onRenderNotesPanel(day.innerHTML, currMonth , year, id);

        });
        addActiveClass(parseInt(day.innerHTML), year, id)
    }
}

let monthList = calendar.querySelector('.month-list');

let currDate = new Date();

let currMonth = {
    value: currDate.getMonth()
}
let currYear = {
    value: currDate.getFullYear()
}

generateCalendar(currMonth.value, currYear.value);

const onRenderNotesPanel = (day, month , year, id) => {
   

    calendarFooter.innerHTML = `<div class="active-notes-body">
    <div class="active-notes-sign-cont">
        <p class="active-notes-sign">Add Notes</p>
        <p class="active-notes-sign">To ${day} ${month}</p>
    </div>
    <div class="active-notes-footer-cont">
        <div>
            <textarea class="notes-input"></textarea>
        </div>
        <div class="active-notes-button-cont">
            <button class="button-notes-active" onclick="onAdd(${day}, ${year},${id})">Add</button>
            <button class="button-notes-active" onclick="onUndo()">Undo</button>
        </div>
    </div>
</div>`;

}

const onPrevYear = () => {
    notesContainer.style.display = 'none';
    calendarFooter.innerHTML = ''

    currYear.value--;
    generateCalendar(currMonth.value, currYear.value);
}

const onNextYear = () => {
    notesContainer.style.display = 'none';
    calendarFooter.innerHTML = ''

    currYear.value++;
    generateCalendar(currMonth.value, currYear.value);
}

const onNextMonth = () => {
    notesContainer.style.display = 'none';
    calendarFooter.innerHTML = ''

    if (currMonth.value < 11){

        currMonth.value++;
        generateCalendar(currMonth.value, currYear.value);

    } else {
        currMonth.value = 0;
        generateCalendar(currMonth.value, currYear.value);
    }

}

const onPrevMonth = () => {
    notesContainer.style.display = 'none';
    calendarFooter.innerHTML = ''

    if (currMonth.value > 0){
        currMonth.value--;
        
        generateCalendar(currMonth.value, currYear.value);

    } else {
        currMonth.value = 11;
        generateCalendar(currMonth.value, currYear.value);
    }

}

const onUndo = () => {
    calendarFooter.innerHTML = '';

    notesContainer.style.display = 'none';
}

const onAdd = (day,year,id) => {
    notesContainer.style.display = 'flex';

    addedNotesArr.push({
        date: {
            day,
            month:monthNamesArr[currMonth.value],
            year
        },

        addedNote: document.querySelector('.notes-input').value
    });
    
    onRenderNotes(day,year);
    addActiveClass(day,year,id);
}

const onRenderNotes = (day, year) => {
    addedNotes.innerHTML = '';

    const filteredNotesArr = addedNotesArr.filter(note => {
        if(note.date.day === day && note.date.month === monthNamesArr[currMonth.value] && note.date.year === year){
            return note
        }
    })

    if(filteredNotesArr.length === 0){
        notesContainer.style.display = 'none';
    } else {
        notesContainer.style.display = 'flex';
    }

    filteredNotesArr.forEach((note,index) => {
        addedNotes.innerHTML += `<p class="added-note">${index + 1}. ${note.addedNote}</p>`
    });

}

