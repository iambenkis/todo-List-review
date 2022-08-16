import setStorage from './setStorage.js';

const cleanCompleted = (obj) => {
  obj.tasks = obj.tasks.filter((task) => task.completed === false);
  setStorage(obj.tasks);
};
export default cleanCompleted;