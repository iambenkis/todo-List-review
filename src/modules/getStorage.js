const getStorage = (obj) => {
  if (localStorage.getItem('tasks')) {
    obj.tasks = JSON.parse(localStorage.getItem('tasks'));
  }
};
export default getStorage;