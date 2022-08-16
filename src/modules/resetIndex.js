const resetIndex = (obj) => {
    let initialIndex = 1;
    obj.tasks.forEach((task) => {
      task.index = initialIndex;
      initialIndex += 1;
    });
}
export default resetIndex;

