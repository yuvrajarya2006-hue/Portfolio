function addTask() {
  const input = document.getElementById("taskInput");
  const taskValue = input.value.trim();

  if (taskValue === "") return;

  const li = document.createElement("li");

  // Task Text
  const span = document.createElement("span");
  span.innerText = taskValue;
  span.onclick = function () {
    span.classList.toggle("completed");
  };

  // Delete Button
  const delBtn = document.createElement("button");
  delBtn.innerText = "✕";
  delBtn.className = "delete-btn";
  delBtn.onclick = function (e) {
    e.stopPropagation();
    // Add a slight fade out before removing
    li.style.opacity = "0";
    li.style.transform = "translateX(20px)";
    setTimeout(() => li.remove(), 300);
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);

  input.value = "";
  input.focus();
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});