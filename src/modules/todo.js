import setStorage from "./setStorage.js";
import getStorage from "./getStorage.js";
const taskContainer = document.querySelector('.task-container');

export default class MyTodo {
  constructor() {
    this.tasks = [];
  }

    addTask = (description) => {
      const myTask = {
        description,
        completed: false,
        index: this.tasks.length + 1,
      };
      this.tasks.push(myTask);
      setStorage(this.tasks);
    }

    remove = (id) => {
      this.resetIndex();
      this.tasks.forEach((task) => {
        if (task.index === Number(id)) {
          this.tasks
            .splice(task.index - 1, 1);
          this.resetIndex();// Update of indexes after deleting
        }
      });
    }

    resetIndex = () => {
      let initialIndex = 1;
      this.tasks.forEach((task) => {
        task.index = initialIndex;
        initialIndex += 1;
      });
    }

    cleanCompleted = () => {
      this.tasks = this.tasks.filter((task) => task.completed === false);
      setStorage(this.tasks);
    }

    taskTemplate = (task) => `
        <div class="task">
            <div class="t-left" id=${task.index}>
                <input 
                    type="checkbox" 
                    name="Drag" 
                    class='checkbox' ${task.completed ? 'checked' : ''} 
                    id=${task.index}> 
                <input 
                    type="text" 
                    id="${task.index}" 
                    class=${task.completed ? 'line task-label' : 'task-label'} 
                    value="${task.description}">
            </div>
            <p class="deleteTask" id=${task.index}>Delete</p> 
        </div>`;

    displayTasks = () => {
      const checkboxes = document.querySelectorAll('.checkbox');  // variables at the top of the function
      const taskLabel = taskContainer.querySelectorAll('.task-label');
      getStorage(this);
      taskContainer.innerHTML = '';
      this.tasks.forEach((task) => taskContainer.insertAdjacentHTML('beforeend', this.taskTemplate(task)));
      checkboxes.forEach((checkbox, id) => {
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            taskLabel[id]?.classList.add('line');
            this.tasks = this.tasks.map((task) => {
              if (task.index === parseInt(checkbox.parentElement.id, 10)) {
                task.completed = true;
              }
              return task;
            });
            setStorage(this.tasks);
          } else {
            taskLabel[id]?.classList.remove('line');
            this.tasks = this.tasks.map((task) => {
              if (task.index === parseInt(checkbox.parentElement.id, 10)) {
                task.completed = false;
              }
              return task;
            });
            setStorage(this.tasks);
          }
        });
      });

      const deleteBtn = document.querySelectorAll('.deleteTask');
      deleteBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const { id } = e.currentTarget;
          this.remove(id);
          setStorage(this.tasks);
          taskContainer.innerHTML = '';
          this.displayTasks(this.tasks);
        });
      });
      // Editing task function
      taskLabel.forEach((textarea) => {
        textarea.addEventListener('change', () => {
          const result = this.tasks.filter((task) => task.index === Number(textarea.id));
          this.tasks[result[0].index - 1].description = textarea.value;
          setStorage(this.tasks);
        });
      });
    }
}