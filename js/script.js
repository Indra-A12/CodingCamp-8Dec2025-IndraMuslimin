let todo = [];

function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");

    if (todoInput.value === "" && todoDate.value === "") {
        alert("Please fill in both the todo item and the date.");
        return;
    }
    if (todoInput.value === "") {
        alert("Please fill in the todo item.");
        return;
    }
    if (todoDate.value === "") {
        alert("Please fill in the due date.");
        return;
    }

    // Cek data duplikat
    const exists = todo.some(item => 
        item.task.toLowerCase() === todoInput.value.toLowerCase() && 
        item.date === todoDate.value
    );

    if (exists) {
        alert("Todo item with this date already exists!");
        return;
    }

    const todoObj = {
        task: todoInput.value,
        date: todoDate.value,
        status: "Pending"
    };

    todo.push(todoObj);

    renderTodos();

    todoInput.value = "";
    todoDate.value = "";
}

function deleteTodo(index) {
    todo.splice(index, 1);
    renderTodos();
}

function markDone(index) {
    todo[index].status = "Done";
    renderTodos();
}

function resetTodos() {
    todo = [];
    renderTodos();
}

function renderTodos() {
    const tbody = document.getElementById("todo-body");
    tbody.innerHTML = "";

    if (todo.length === 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="4" class="empty">No task found</td>
        </tr>`;
        return;
    }

    todo.forEach((item, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${item.task}</td>
            <td>${item.date}</td>
            <td class="${item.status === 'Done' ? 'text-green-400' : 'text-yellow-300'}">
                ${item.status}
            </td>
            <td>
                <button onclick="deleteTodo(${index})"
                    class="bg-red-500 px-3 py-1 rounded text-white">
                    Delete
                </button>

                ${item.status === "Pending" ? `
                <button onclick="markDone(${index})"
                    class="bg-green-500 px-3 py-1 rounded text-white ml-2">
                    Done
                </button>
                ` : ""}
            </td>
        </tr>`;
    });
}
