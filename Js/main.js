function goToAbout() {
  
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}

function goToBlog() {
   document.getElementById("blog").scrollIntoView({ behavior: "smooth" });
 }

document.addEventListener('DOMContentLoaded', function() { 
  //  main section
  const words = ['coder', 'YouTuber', 'designer', 'creator', 'developer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const textChanger = document.querySelector('.text-changer');

  function typeWriter() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textChanger.textContent = currentWord.substring(0, charIndex);

    // random typing speed for realism
    let typeSpeed = isDeleting ? 80 : Math.random() * (200 - 100) + 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1000; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // pause before typing next word
    }

    setTimeout(typeWriter, typeSpeed);
  }

  // Start typing
  typeWriter();

  // const words = ['coder', 'YouTuber', 'designer'];
  // let index = 0;

  // function changeText() {
  //     const textChanger = document.querySelector('.text-changer');
  //     textChanger.textContent = words[index];
  //     index = (index + 1) % words.length;
  // }

  // setInterval(changeText, 2000);


  
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
  


    const section = document.querySelector(".about-text");
  const paras = section.querySelectorAll("p");
  const texts = [...paras].map(p => p.innerText); // save original text
  let lock = false;

  function runAnimation() {
    let delayOffset = 0; // keeps track of when each paragraph should start

    paras.forEach((p, idx) => {
      const words = texts[idx].split(" ");

      // wrap each word in <span> with increasing delay + offset
      p.innerHTML = words
        .map((w,i)=>`<span style="animation-delay:${(i*0.1 + delayOffset).toFixed(2)}s">${w}</span>`)
        .join(" ");

      // calculate total time for this paragraph
      const paragraphTime = words.length * 0.1 + 0.5; // 0.1s per word + 0.5s buffer
      delayOffset += paragraphTime; // next paragraph starts after this one finishes
    });

    // lock until *all* paragraphs are done
    lock = true;
    const totalTime = delayOffset * 1000;
    setTimeout(()=> lock=false, totalTime);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !lock) {
        runAnimation();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);
})