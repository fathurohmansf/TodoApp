/** TODO SCHEMA
[
  {
    id: Number,
    title: String,
    isCompleted: Boolean,
  }
]
*/

// // array di bawah ini akan di hapus karna akan membuat web storage baru
// let todos = [{
//         id: 1,
//         title: 'Belajar DOM manipulation',
//         isCompleted: true,
//     },
//     {
//         id: 2,
//         title: 'Belajar event listener',
//         isCompleted: false,
//     },
//     {
//         id: 3,
//         title: 'Belajar web storage',
//         isCompleted: false,
//     },
// ];

// Ini untuk menyimpan data web storage nya
const TODO_KEY = 'todos';

// Ini Func Todo app nya
(function() {
    const todoList = document.getElementById('todoList');
    const createTodoForm = document.getElementById('createTodoForm');
    const todoTitleInput = document.getElementById('todoTitle');

    console.log(createTodoForm)

    //Ini untuk Event Submit
    createTodoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const todoTitleValue = todoTitleInput.value;

        // Membuat object TODO baru
        const newTodo = {
            id: Number(new Date()),
            title: todoTitleValue,
            isCompleted: false,
        };

        // Dapatkan daftar TODO saat ini
        const todos = getAllTodos();

        // Menyimpan TODO baru
        const newTodos = [...todos, newTodo];
        const newTodosString = JSON.stringify(newTodos);
        localStorage.setItem(TODO_KEY, newTodosString);

        // // Menyimpan TODO baru sudah di gantikan dengan yg di atas
        // const newTodos = [...todos, newTodo];
        // todos = newTodos;

        // Perbarui UI
        render();

        // Reset input
        todoTitleInput.value = '';

    });

    function getAllTodos() {
        // Dapatkan data yang tersimpan (string)
        const todosString = localStorage.getItem(TODO_KEY);
        console.log('getAllTodos', todosString);
        // Konversi string ke Array
        const todos = JSON.parse(todosString);

        // Kembalikan Array kosong juka tidak ada yang tersimpan
        if (Array.isArray(todos)) {
            return todos;
        } else {
            return [];
        }
    }



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
        const todos = getAllTodos();
        console.log('render:', todos);

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
        // fungsi bahwa Todo di coret karna telah di kerjakan
        const toggleCheckboxes = document.querySelectorAll('.toggle');
        for (const toggleCheckbox of toggleCheckboxes) {
            toggleCheckbox.addEventListener('change', () => {
                const todoId = toggleCheckbox.dataset.id;

                // Dapatkan daftar TODO saat ini
                const todos = getAllTodos();

                // Update todo agar ditandai selesai
                if (toggleCheckbox.checked == true) {
                    const updatedTodos = todos.map((todo) => {
                        if (todo.id == todoId) {
                            todo.isCompleted = true;
                        }

                        return todo;
                    });

                    // Memperbarui daftar TODO
                    const updatedTodosString = JSON.stringify(updatedTodos);
                    localStorage.setItem(TODO_KEY, updatedTodosString);

                    // di bawah ini ada kesalah paham an(masih di cari)
                    //todos = updatedTodos;
                }
                // Update todo agar ditandai belum selesai
                else {
                    const updatedTodos = todos.map((todo) => {
                        if (todo.id == todoId) {
                            todo.isCompleted = false;
                        }

                        return todo;
                    });

                    // Memperbarui daftar TODO
                    const updatedTodosString = JSON.stringify(updatedTodos);
                    localStorage.setItem(TODO_KEY, updatedTodosString);

                    // di bawah ini ada kesalah paham an(masih di cari)
                    // todos = updatedTodos;
                }


                const destroyButtons = document.querySelectorAll('.destroy');
                for (const destroyButton of destroyButtons) {
                    destroyButton.addEventListener('click', () => {
                        const todoId = destroyButton.dataset.id;

                        // Dapatkan daftar TODO saat ini
                        const todos = getAllTodos();

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

        // Fungsi untuk mendelete TODO per item
        const destroyButtons = document.querySelectorAll('.destroy');
        for (const destroyButton of destroyButtons) {
            destroyButton.addEventListener('click', () => {
                const todoId = destroyButton.dataset.id;

                // Dapatkan daftar TODO saat ini
                const todos = getAllTodos();

                //Dapatkan TODO berdasarkan ID untuk memeriksa keberadaan nya
                const todo = todos.find((todo) => todo.id == todoId);
                const index = todos.indexOf(todo);

                //jika tidak ditemukan, akhiri function ini.
                if (index == -1) {
                    return;
                }

                //Penghapusan TODO
                const updatedTodos = todos.filter((todo) => {
                    return todo.id != todoId;
                });
                const updatedTodosString = JSON.stringify(updatedTodos);
                localStorage.setItem(TODO_KEY, updatedTodosString);


                //Perbarui UI
                render();
            })
        }




        console.log('Do after render jobs...');
        // Do some jobs after render finish...
    }

    render();
})();