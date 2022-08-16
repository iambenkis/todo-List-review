const getStorage = (obj) => {
    console.log(localStorage.getItem('tasks'))
    if (localStorage.getItem('tasks')) {
      obj.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
};
export default getStorage;