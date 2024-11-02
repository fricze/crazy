const start = {
  ArrowLeft: "end",
  ArrowRight: "center",
  ArrowUp: "end",
  ArrowDown: "center",
};
const end = {
  ArrowLeft: "center",
  ArrowRight: "start",
  ArrowUp: "center",
  ArrowDown: "start",
};
const center = {
  ArrowLeft: "start",
  ArrowRight: "end",
  ArrowUp: "start",
  ArrowDown: "end",
};

const newPosition = {
  start,
  end,
  center,
};

const makeVerticalShadowPos = (pos) => {
  if (pos === "start") {
    return "2px";
  }

  if (pos === "center") {
    return "0px";
  }

  if (pos === "end") {
    return "-2px";
  }
};

const makeHorizontalShadowPos = (pos) => {
  if (pos === "start") {
    return "2px";
  }

  if (pos === "center") {
    return "0px";
  }

  if (pos === "end") {
    return "-2px";
  }
};

const makeSkew = (ver, hor) => {
  if (ver === "end") {
    if (hor === "start") {
      return "skew(-1deg, -1deg) scaleX(1)";
    }

    if (hor === "end") {
      return "skew(1deg, 1deg) scaleX(1)";
    }
  }

  return "";
};

const makeDarkness = (ver, hor) => {
  let res;
  if (ver === "center" && hor === "center") {
    res = "hsl(261.6deg 51.87% 40%)";
    filter = "";
  } else {
    res = "hsl(261.6deg 51.87% 27%)";
    filter = "";
  }

  return [res, filter];
};

const shadowColor = "rgb(249 37 212 / 47%)";
window.rect.style.boxShadow = `${makeVerticalShadowPos(window.rect.style.justifySelf)} ${makeHorizontalShadowPos(window.rect.style.alignSelf)} 0px 3px ${shadowColor}`;

const throttle = (fn, delay) => {
  let last = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - last < delay) {
      return;
    }
    last = now;
    fn(...args);
  };
};

document.onkeydown = throttle(async (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    const current = window.rect.style.alignSelf;
    await document.startViewTransition(() => {
      const styles = window.rect.style;

      const newPos = newPosition[current][e.key];
      window.rect.style.alignSelf = newPos;

      window.rect.style.boxShadow = `${makeVerticalShadowPos(window.rect.style.justifySelf)} ${makeHorizontalShadowPos(newPos)} 0px 3px ${shadowColor}`;

      window.door.style.transform = makeSkew(
        styles.alignSelf,
        styles.justifySelf,
      );

      const [darkness, filter] = makeDarkness(
        styles.alignSelf,
        styles.justifySelf,
      );
      door.style.backgroundColor = darkness;
      door.style.filter = filter;
    }).finished;
  }

  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const current = window.rect.style.justifySelf;
    await document.startViewTransition(() => {
      const styles = window.rect.style;

      const newPos = newPosition[current][e.key];
      window.rect.style.justifySelf = newPos;

      window.rect.style.boxShadow = `${makeVerticalShadowPos(newPos)} ${makeHorizontalShadowPos(window.rect.style.alignSelf)} 0px 3px ${shadowColor}`;

      window.door.style.transform = makeSkew(
        styles.alignSelf,
        styles.justifySelf,
      );

      const [darkness, filter] = makeDarkness(
        styles.alignSelf,
        styles.justifySelf,
      );
      door.style.backgroundColor = darkness;
      door.style.filter = filter;
    }).finished;
  }
}, 200);
