document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".buttonContainer");

  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("fade-in");
    }, index * 200); // প্রতিটা item 0.2 সেকেন্ড পরপর আসবে
  });
});
