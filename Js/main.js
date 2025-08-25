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


function goToAbout() {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

function goToBlog() {
  document.getElementById("blog").scrollIntoView({ behavior: "smooth" });
}

