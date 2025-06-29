document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".buttonContainer");

  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("visible");
    }, index * 400); // প্রতিটা item 0.4 সেকেন্ড পরপর আসবে
  });
});