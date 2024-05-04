/** TODO SCHEMA
[
  {
    id: Number,
    title: String,
    isCompleted: Boolean,
  }
]
*/
let todos = [{
        id: 1,
        title: 'Belajar DOM manipulation',
        isCompleted: true,
    },
    {
        id: 2,
        title: 'Belajar event listener',
        isCompleted: false,
    },
    {
        id: 3,
        title: 'Belajar web storage',
        isCompleted: false,
    },
];


(function() {
    const todoList = document.getElementById('todoList');
    const createTodoForm = document.getElementById('createTodoForm');
    const todoTitleInput = document.getElementById('todoTitle');

    console.log(createTodoForm)

    createTodoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const todoTitleValue = todoTitleInput.value;

        // Membuat object TODO baru
        const newTodo = {
            id: Number(new Date()),
            title: todoTitleValue,
            isCompleted: false,
        };

        // Menyimpan TODO baru
        const newTodos = [...todos, newTodo];
        todos = newTodos;

        // Perbarui UI
        render();

        // Reset input
        todoTitleInput.value = '';

    });



    function todoItemTemplate(todo) {
        return `
      <li class="todo-item ${todo.isCompleted ? 'completed' : ''}" 
          data-id="${todo.id}"
      >
        <input class="toggle" type="checkbox" data-id="${todo.id}"
              ${todo.isCompleted ? 'checked' : ''}
        >
        <div class="todo-item__title">
          ${todo.title}
        </div>
        <button class="destroy" data-id="${todo.id}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </li>
    `;
    }

    function render() {
        // Kosongkan daftar TODO sebelum render TODO ke halaman web
        todoList.innerHTML = '';


        let todoItemElementsString = '';
        for (const todo of todos) {
            const todoItemElementString = todoItemTemplate(todo);
            todoItemElementsString += todoItemElementString;
        }


        todoList.innerHTML = todoItemElementsString;

        console.log('rendering...');
        // Do some render jobs...
        console.log('rendered...');

        afterRender();
    }

    function afterRender() {
        const toggleCheckboxes = document.querySelectorAll('.toggle');
        for (const toggleCheckbox of toggleCheckboxes) {
            toggleCheckbox.addEventListener('change', () => {
                const todoId = toggleCheckbox.dataset.id;

                // Update todo agar ditandai selesai
                if (toggleCheckbox.checked == true) {
                    const updatedTodos = todos.map((todo) => {
                        if (todo.id == todoId) {
                            todo.isCompleted = true;
                        }

                        return todo;
                    });

                    todos = updatedTodos;
                }
                // Update todo agar ditandai belum selesai
                else {
                    const updatedTodos = todos.map((todo) => {
                        if (todo.id == todoId) {
                            todo.isCompleted = false;
                        }

                        return todo;
                    });

                    todos = updatedTodos;
                }


                const destroyButtons = document.querySelectorAll('.destroy');
                for (const destroyButton of destroyButtons) {
                    destroyButton.addEventListener('click', () => {
                        const todoId = destroyButton.dataset.id;

                        // Dapatkan TODO berdasarkan ID untuk memeriksa keberadaannya
                        const todo = todos.find((todo) => todo.id == todoId);
                        const index = todos.indexOf(todo);

                        // Jika tidak ditemukan, akhiri function ini.
                        if (index === -1) {
                            return;
                        }

                        // Penghapusan TODO
                        const newTodos = todos.filter((todo) => {
                            return todo.id != todoId;
                        });
                        todos = newTodos;

                        // Perbarui UI
                        render();
                    });
                }


                // Perbarui UI
                render();
            });
        }

        const destroyButtons = document.querySelectorAll('.destroy');
        for (const destroyButton of destroyButtons) {
            destroyButton.addEventListener('click', () => {
                const todoId = destroyButton.dataset.id;

                //Dapatkan TODO berdasarkan ID untuk memeriksa keberadaan nya
                const todo = todos.find((todo) => todo.id == todoId);
                const index = todos.indexOf(todo);

                //jika tidak ditemukan, akhiri function ini.
                if (index == -1) {
                    return;
                }

                //Penghapusan TODO
                const newTodos = todos.filter((todo) => {
                    return todo.id != todoId;
                });
                todos = newTodos;

                //Perbarui UI
                render();
            })
        }




        console.log('Do after render jobs...');
        // Do some jobs after render finish...
    }

    render();
})();