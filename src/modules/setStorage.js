const setStorage = (arr) => {
  const formData = JSON.stringify(arr);
  localStorage.setItem('tasks', formData);
};

export default setStorage;