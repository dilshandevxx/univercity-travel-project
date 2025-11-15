const animation_element = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        //entry.target.classList.remove("animate");
      }
    });
  },
  {
    threshold: 0.5,
  }
);

for (let i = 0; i < animation_element.length; i++) {
  const el = animation_element[i];

  observer.observe(el);
}



// Open image in lightbox on 'View' button click
document.querySelectorAll('.view-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const img = e.target.parentElement.querySelector('img');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    const clone = document.createElement('img');
    clone.src = img.src;
    lightbox.appendChild(clone);
    document.body.appendChild(lightbox);
    lightbox.style.display = 'flex';
    lightbox.addEventListener('click', () => lightbox.remove());
  });
});
