document.querySelector(".game-area").addEventListener("keydown", (e) => {
  console.log("here");
  document.querySelectorAll(".key").forEach((key) => {
    if (e.key == key.dataset.letter) {
      key.classList.add("active");
      setTimeout(() => {
        key.classList.remove("active");
      }, 600);
    }
  });
});
