function throttle(cb, coolDown) {
  let wait = false;
  let mostRecentArgs = null;

  function checkMostRecentArgs() {
    if (mostRecentArgs == null) {
      wait = false;
    } else {
      cb(...mostRecentArgs);
      mostRecentArgs = null;
      setTimeout(checkMostRecentArgs, coolDown);
    }
  }

  return (...args) => {
    if (wait) {
      mostRecentArgs = args;
      return;
    }

    cb(...args);
    wait = true;
    setTimeout(checkMostRecentArgs, coolDown);
  };
}

export default throttle;
