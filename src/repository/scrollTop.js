const scrollTop = (appRef) => {
  appRef.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};

export default scrollTop;
