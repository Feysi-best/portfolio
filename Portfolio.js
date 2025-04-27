


  
// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const ctaButton = document.querySelector('.call-to-action');
  const myPhoto = document.querySelector('.my-photo');
  const myName = document.querySelector('.my-name');

  if (hamburger && nav) {
    let isMenuOpen = false;

    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      
      nav.classList.toggle('show', isMenuOpen);
      
      ctaButton?.classList.toggle('hide', isMenuOpen);
      myPhoto?.classList.toggle('hide', isMenuOpen);
      myName?.classList.toggle('move-up', isMenuOpen);
      
      // Update hamburger icon
      hamburger.textContent = isMenuOpen ? '✕' : '☰';
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Close Menu Function
    function closeMenu() {
      if (isMenuOpen) {
        isMenuOpen = false;
        nav.classList.remove('show');
        ctaButton?.classList.remove('hide');
        myPhoto?.classList.remove('hide');
        myName?.classList.remove('move-up');
        hamburger.textContent = '☰';
        document.body.style.overflow = '';
      }
    }

    // Hamburger Click Event
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function(e) {
      if (isMenuOpen && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (isMenuOpen && e.key === 'Escape') {
        closeMenu();
      }
    });
  } else {
    console.error('Missing essential elements: Check if .hamburger and .nav exist in your HTML');
  }
});
//Work Button//
document.querySelectorAll('.work-button').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const distanceX = x - centerX;
    const distanceY = y - centerY;
    
    // Apply transform (magnetic effect to the bottun)
    button.style.transform = `translate(${distanceX * 0.1}px, ${distanceY * 0.1}px)`;
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translate(0, 0)';
  });
});

// About Section
const aboutSection = document.querySelector('#about');
const aboutText = document.querySelector('.about-text');
const paragraphs = document.querySelectorAll('.animated-paragraph');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      
      aboutText.classList.add('visible');
      paragraphs.forEach((para, index) => {
        setTimeout(() => {
          para.classList.add('visible');
        }, index * 200);
      });
    }
  });
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

observer.observe(aboutSection);

// Contact Section 


document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  // Form Validation and Submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (name.value.trim() === '') {
      name.parentElement.classList.add('invalid');
      nameError.textContent = 'Please enter your name';
      isValid = false;
    } else {
      name.parentElement.classList.remove('invalid');
    }

    // Validate email
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      email.parentElement.classList.add('invalid');
      emailError.textContent = 'Please enter a valid email';
      isValid = false;
    } else {
      email.parentElement.classList.remove('invalid');
    }

    // Validate message
    const message = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (message.value.trim() === '') {
      message.parentElement.classList.add('invalid');
      messageError.textContent = 'Please enter your message';
      isValid = false;
    } else {
      message.parentElement.classList.remove('invalid');
    }

    if (isValid) {
      const submitBtn = form.querySelector('.submit-btn');
      const originalBtnText = submitBtn.querySelector('span').textContent;
      submitBtn.querySelector('span').textContent = 'Sending...';
      submitBtn.disabled = true;

      // Prepare Emailjs parameters
      const params = {
        from_name: name.value.trim(),
        from_email: email.value.trim(),
        message: message.value.trim()
      };

      // Send email
      emailjs.send("service_a8gws8l", "template_1a428is", params)
        .then(() => {
          // Success handling
          form.reset();
          successMessage.classList.add('active');
          overlay.classList.add('active');
        })
        .catch((error) => {
          console.error('Email sending failed:', error);
          alert('Failed to send message. Please try again later.');
        })
        .finally(() => {
          submitBtn.querySelector('span').textContent = originalBtnText;
          submitBtn.disabled = false;
        });
    }
  });

   document.querySelector('.close-success').addEventListener('click', function() {
    successMessage.classList.remove('active');
    overlay.classList.remove('active');
  });
  overlay.addEventListener('click', function() {
    successMessage.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// there was a code that i remomed from here and i commented out previously i don't why

document.addEventListener('DOMContentLoaded', () => {
  const featuresSection = document.querySelector('#features');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  observer.observe(featuresSection);
});
 // Hire CTA 
 function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  
  const contactSection = document.querySelector(target);
  contactSection.style.animation = 'pulse-highlight 2s ease';
  setTimeout(() => contactSection.style.animation = '', 2000);
}

 
