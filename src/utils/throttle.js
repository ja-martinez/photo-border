function throttle(func, coolDown) {
  let wait = false;
  let mostRecentArgs = null;

  function timeoutCB() {
    if (mostRecentArgs == null) {
      wait = false;
    } else {
      func.apply(this, mostRecentArgs);
      mostRecentArgs = null;
      setTimeout(timeoutCB, coolDown);
    }
  }

  return (...args) => {
    if (wait) {
      mostRecentArgs = args;
      return;
    }

    func.apply(this, args);
    wait = true;
    setTimeout(timeoutCB, coolDown);
  };
}

export default throttle;
