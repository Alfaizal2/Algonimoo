
// Tagline typing effect
document.addEventListener("DOMContentLoaded", () => {
  const tagline = document.querySelector(".tagline");
  const text = tagline.textContent;
  tagline.textContent = "";
  let i = 0;
  (function type() {
    if (i < text.length) {
      tagline.textContent += text.charAt(i++);
      setTimeout(type, 50);
    }
  })();
});