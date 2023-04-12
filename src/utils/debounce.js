function debounce(func, cooldown) {
  let timeoutID = null;

  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func.apply(this, args);
      timeoutID = null;
    }, cooldown);
  };
}

export default debounce;
