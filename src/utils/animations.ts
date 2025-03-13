
export const observeElements = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const staggeredItems = document.querySelectorAll('.staggered-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Apply staggered delay to items
  staggeredItems.forEach((element, index) => {
    const delay = index * 100;
    (element as HTMLElement).style.animationDelay = `${delay}ms`;
    observer.observe(element);
  });
};

export const setupImageFadeIn = () => {
  const images = document.querySelectorAll('.image-fade-in');
  
  images.forEach((img) => {
    if (img instanceof HTMLImageElement) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    }
  });
};

export const initializeAnimations = () => {
  observeElements();
  setupImageFadeIn();
  
  // Reapply on resize (for items that might enter viewport)
  window.addEventListener('resize', observeElements);
  
  return () => {
    window.removeEventListener('resize', observeElements);
  };
};
