var todo = {

    activeStatus() {
        const mas_radio_label = document.querySelectorAll('.todo_radio_label');
        const mas_radio_todo = document.querySelectorAll('input[name="radio_todo"]');
        for (i = 0; i < mas_radio_todo.length; i++) {
            if (mas_radio_todo[i].checked) {
                for (j = 0; j < mas_radio_label.length; j++) {
                    mas_radio_label[j].classList.remove('todo_label_checked');
                }
                mas_radio_label[i].classList.add('todo_label_checked');
            }
        }
    },

    init() {

        const storage_urgently = localStorage.getItem('todo_urgently');
        const storage_not_urgently = localStorage.getItem('todo_not_urgently');

        if (storage_urgently) {
            document.getElementById('todo_list_urgently').innerHTML = storage_urgently;
        }
        if (storage_not_urgently) {
            document.getElementById('todo_list_not_urgent').innerHTML = storage_not_urgently;
        }

        const mas_radio_todo = document.querySelectorAll('input[name="radio_todo"]');
        for (i = 0; i < mas_radio_todo.length; i++) {
            mas_radio_todo[i].addEventListener('change', this.update);
        }

        document.addEventListener('click', this.action.bind(this));
    },

    create(text) {

        const todo_priority = document.getElementById('todo_priority').value;

        const lexicon = {
            urgently: 'срочно',
            not_urgent: 'хорошо бы'
        };

        const date = JSON.stringify({ add: new Date().toLocaleString().slice(0, -3) });

        return `<li class="todo_item" data-todo-state="active" data-priority="${todo_priority}">
        <span class="todo_task">
            ${text}        
            <span class="todo_date" data-todo-date="${date}">               
                <span>                    
                    <span>добавлено: ${new Date().toLocaleString().slice(0, -3)}</span>
                    <span class="todo_status_mark" hidden>${lexicon[todo_priority]}</span>
                </span>
            </span>
        </span>
        <div class="todo_task_btns">
            <div class="todo_action todo_action_restore" data-todo-action="restored"></div>
            <div class="todo_action todo_action_complete" data-todo-action="completed"></div>
            <div class="todo_action todo_action_delay" data-todo-action="delayed"></div>
            <div class="todo_action todo_action_delete" data-todo-action="deleted"></div>         
        </div>
        </li>`;
    },

    add() {
        const todo_task_in = document.getElementById('todo_task_in');
        if (todo_task_in.disabled || !todo_task_in.value.length) {
            return;
        }

        const todo_priority = document.getElementById('todo_priority').value;

        switch (todo_priority) {
            case "urgently":
                document.getElementById('todo_list_urgently').insertAdjacentHTML('beforeend', this.create(todo_task_in.value));
                todo_task_in.value = '';
                return;
            case "not_urgent":
                document.getElementById('todo_list_not_urgent').insertAdjacentHTML('beforeend', this.create(todo_task_in.value));
                todo_task_in.value = '';
                return;
        }
    },

    action(e) {

        const target = e.target;

        if (target.classList.contains('todo_action')) {

            const action = target.dataset.todoAction;
            const elemItem = target.closest('.todo_item');

            if (action === 'deleted') {
                elemItem.remove();
            } else {
                elemItem.dataset.todoState = action;

                const lexicon = {
                    restored: 'восстановлено',
                    completed: 'завершено',
                    delayed: 'отложено'
                };

                const elTodoDate = elemItem.querySelector('.todo_date');
                const html = `<span>${lexicon[action]}: ${new Date().toLocaleString().slice(0, -3)}</span>`;
                elTodoDate.insertAdjacentHTML('beforeend', html);
            }
            this.checkList();
            this.save();
        } else if (target.id == 'todo_clear') {

            const mas_todo_list = document.querySelectorAll('.todo_list');
            for (i = 0; i < mas_todo_list.length; i++) {
                mas_todo_list[i].textContent = '';
            }
            this.save();

        } else if (target.id == 'todo_btn_add') {
            this.add();
            this.checkList();
            this.save();

        }

    },

    update() {
        todo.activeStatus();

        const mas_radio_todo = document.querySelectorAll('input[name="radio_todo"]');
        let menu_status = '';
        for (i = 0; i < mas_radio_todo.length; i++) {
            if (mas_radio_todo[i].checked) {
                menu_status = mas_radio_todo[i].value;
            }
        }

        document.getElementById('todo_list_urgently').dataset.todoOption = menu_status;
        document.getElementById('todo_list_not_urgent').dataset.todoOption = menu_status;

        document.getElementById('todo_task_in').disabled = menu_status !== 'active';

        const mas_name_priority = document.querySelectorAll('.todo_name_priority');
        for (i = 0; i < mas_name_priority.length; i++) {
            if (!mas_radio_todo[0].checked) {
                mas_name_priority[i].classList.add('todo_name_hidden');
            } else {
                mas_name_priority[i].classList.remove('todo_name_hidden');
            }
        }

        const mas_status_mark = document.querySelectorAll('.todo_status_mark');
        for (i = 0; i < mas_status_mark.length; i++) {
            if (!mas_radio_todo[0].checked) {
                mas_status_mark[i].removeAttribute("hidden", "");
            } else {
                mas_status_mark[i].setAttribute("hidden", "");
            }
        }

    },

    checkList() {

        const mas_task = document.querySelectorAll('.todo_name_priority');

        const mas_task_urgently = document.querySelectorAll("[data-priority = 'urgently']");
        const mas_task_noturgent = document.querySelectorAll("[data-priority = 'not_urgent']");

        for (i = 0; i < mas_task_urgently.length; i++) {
            if (mas_task_urgently[i].dataset.todoState == 'active' || mas_task_urgently[i].dataset.todoState == 'restored') {
                mas_task[0].removeAttribute("hidden", "");
                break;
            } else {
                mas_task[0].setAttribute("hidden", "");
            }
        }

        for (j = 0; j < mas_task_noturgent.length; j++) {
            if (mas_task_noturgent[j].dataset.todoState == 'active' || mas_task_noturgent[j].dataset.todoState == 'restored') {
                mas_task[1].removeAttribute("hidden", "");
                break;
            } else {
                mas_task[1].setAttribute("hidden", "");
            }
        }

    },

    save() {

        console.log("сохраняем");

        localStorage.setItem('todo_urgently', document.getElementById('todo_list_urgently').innerHTML);
        localStorage.setItem('todo_not_urgently', document.getElementById('todo_list_not_urgent').innerHTML);

    }
};

todo.init();
todo.activeStatus();
todo.checkList();