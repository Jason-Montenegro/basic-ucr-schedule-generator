# 🗓️ **Schedule Generator**

A simple and responsive web app to generate and customize schedules using **HTML**, **CSS**, and **JavaScript**.

🔗 **Live Preview:** [Click here to view the project](https://jason-montenegro.github.io/ucr-schedule-generator/)

---

## ✨ **Features**

✔️ **Add, edit, and remove courses dynamically**  
✔️ **Color customization** with a visual color picker  
✔️ **Drag & Drop support** for agile restructuring  
✔️ Save schedule as **PDF** or **Image**  
✔️ **Reset schedule** with one click  
✔️ Insert courses using **regular expression input**  
✔️ **Adjustable time grid** to expand/reduce hours  
✔️ **Persistent storage** with `localStorage`  
✔️ **Multiple themes:** Default | Light | Dark | Matrix | Arctic | Cutesy | Solaris | Nebula | Tropical
✔️ Schedule supports **50-minute intervals**  

---

## 🖥️ **Preview**
![Preview Screenshot](https://www.svgrepo.com/show/340812/pending.svg)

---

## 📖 **How to Use**

### ✅ **First method: Manual Input**
1. Enter the **course name** or activity.
2. Select the **days** of the week.
3. Choose **start and end time**.
4. Pick a **color** from the color picker.
5. Click **Add to Schedule**.

---

### ✅ **Second method: Using Regex Expression**
1. Enter the **course name** or activity.
2. Input a valid **regular expression** in the Regex field:
  ```regex
  /^\[([LKMJVSD]\s\d{2}:\d{2}\s-\s\d{2}:\d{2})(,\s[LKMJVSD]\s\d{2}:\d{2}\s-\s\d{2}:\d{2})*\]$/i
  ```
3. Click **Add to Schedule**.

### 📌 Example:
  ```
  [J 13:00 - 14:50, L 13:00 - 15:50]
  ```
---

## ⚙️ Extra Feature

- ✅ **Click to paint or remove activities directly on the schedule.**
- ✅ **Drag & Drop activities between cells.**
- ✅ **Change theme dynamically.**
- ✅ **Save your schedule as PDF or Image.**

---

## 🛠️ Technologies

- 🕸️ **HTML5**  
- 🎨 **CSS3**  
- ⚙️ **JavaScript (ES6)**  

---