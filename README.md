# 🗓️ Schedule Generator

A simple web app that generates schedules using **HTML**, **CSS**, and **JavaScript**.

---

## ✨ Features

- ➕ Add, edit, and remove courses dynamically.  
- 🎨 Visual color picker to customize schedule blocks on schedule table.  
- 🖱️ Drag & drop courses for agile restructuring of schedule.  
- 💾 Save your generated schedule as **PDF** or **image** files.  
- ↩️ Reset functionality for new schedules.
- 🔍 Input course with **regex expression** for quick insertion.  
- ⏰ Adjustable time grid to expand or reduce hours displayed.  
- 💾 Use **localStorage** API to preserve schedule when the tab is closed.  
- 🌗 Multiple themes: Dark | Light | Gray | Arctic | Matrix | Cutesy 
- 🗓️ Schedule times in intervals of 50 minutes.

---

## How to use

The user has two ways to insert course details into the schedule.

### First way
1. The user enters the name of the course, or whatever activity he/she wishes.
2. The user selects the days he/she has to attend this activity in the week.
3. The user selects the initial time, and ending time for which the activity is due.
4. The user selects a color to identify the course data cell in the schedule, in the color picker.
5. The user clicks the **Add to schedule** button.

### Second way
1. The user enters the name of the course, or whatever activity he/she wishes.
2. The user enters a regular expression in the **Regular expression** input box.
3. The regular expression must follow a certain format to function.
5. The user clicks the **Add to schedule** button.

The regular expression must follow this regex:
**/^\[([LKMJVSD]\s\d{2}:\d{2}\s-\s\d{2}:\d{2})(,\s[LKMJVSD]\s\d{2}:\d{2}\s-\s\d{2}:\d{2})*\]$/i**

---
### Use features

- The user can fill name detail, and then can paint instances of the activity in the schedule by
clicking on the desired cell.

- In the same manner, the user can eliminate an instance of an activity by clicking on the desired
cell in the schedule.

- The user could drag activities between cells in the schedule.

- To change the name and color of an activity in the schedule, the user must add the name in the 
course name input, and select a new color. There is no way to edit an existing activity in the schedule.


## 🛠️ Technologies

- 🕸️ **HTML5**  
- 🎨 **CSS3**  
- ⚙️ **JavaScript (ES6)**  

---