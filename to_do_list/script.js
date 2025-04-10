// window.onload = function() {
		// 	loadData();	//Producing code
		// 	updateDisplay(data);	//Consuming code
		// }


const taskInput = document.getElementById("taskInput");
    const taskForm = document.getElementById("todoForm");
    const taskList = document.getElementById("taskList");
    const sessionCountDisplay = document.getElementById("sessionCount");
    const themeToggle = document.getElementById("themeToggle");


    
    window.addEventListener("load", () => {
        const tasks = getTasks();
        renderTasks(tasks);
  
        const sessionCount = sessionStorage.getItem("sessionCount") || 0;
        sessionCountDisplay.textContent = sessionCount;


      const savedTheme = getCookie("theme");
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        themeToggle.textContent = savedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    }
    fetchQuote();

});

    
    taskForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const task = taskInput.value.trim();
      if (task !== "") {
        addTask(task);
        taskInput.value = "";


        let sessionCount = sessionStorage.getItem("sessionCount") || 0;
        sessionCount = parseInt(sessionCount) + 1;
        sessionStorage.setItem("sessionCount", sessionCount);
        sessionCountDisplay.textContent = sessionCount;
      }
    });


    themeToggle.addEventListener("click", () => {
        const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.body.classList.remove(currentTheme);
        document.body.classList.add(newTheme);
        
        setCookie("theme", newTheme, 365);
        
        themeToggle.textContent = newTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    });    

    

    function getTasks() {
      const tasks = localStorage.getItem("tasks");

      return tasks ? JSON.parse(tasks) : [];
    }

    function saveTasks(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(tasks) {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => deleteTask(index));


        li.appendChild(btn);
        taskList.appendChild(li);
      });
    }

    function addTask(task) {
      const tasks = getTasks();
      tasks.push(task);
      saveTasks(tasks);
      renderTasks(tasks);
    }

    function deleteTask(index) {
      const tasks = getTasks();
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTasks(tasks);
    }

    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function getCookie(name) {
        const nameEq = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length, c.length);
        }
        return "";
    }

    document.getElementById('fetchQuoteButton').addEventListener('click', fetchQuote);

    async function fetchQuote() {
        const quoteDisplay = document.getElementById('quoteDisplay');
        try {
            console.log("Fetching dog image...");
    
            const response = await fetch('https://dog.ceo/api/breeds/image/random');

            if (!response.ok) {
                console.error("Failed to fetch dog image, status:", response.status);
                throw new Error('Failed to fetch dog image');
            }
    
            const data = await response.json();
            console.log("Dog image fetched successfully:", data);
    
            quoteDisplay.innerHTML = `<img src="${data.message}" alt="Random Dog" style="max-width: 100%; height: auto;">`;
        } catch (error) {
            console.error("Error fetching dog image:", error);
            quoteDisplay.textContent = 'If you are seeing this, something is wrong. Oops!';
        }
    }
    

    