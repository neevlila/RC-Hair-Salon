import { createIcons, icons } from 'lucide';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ServicesPage = {
  render: () => {
    const allServices = [
      { name: 'Classic Haircut', price: '800', img: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2670&auto=format&fit=crop', description: 'A timeless, sharp cut tailored to your preference.' },
      { name: 'Modern Fade', price: '1200', img: 'https://images.unsplash.com/photo-1622286342621-4bd78cf2e59a?q=80&w=2574&auto=format&fit=crop', description: 'A clean, high-contrast fade, from skin fades to tapers.' },
      { name: 'Beard Trim & Style', price: '600', img: 'https://images.unsplash.com/photo-1632345031435-8727f669d281?q=80&w=2574&auto=format&fit=crop', description: 'Expert shaping, trimming, and conditioning for a perfect beard.' },
      { name: 'Royal Shave', price: '900', img: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=2670&auto=format&fit=crop', description: 'A luxurious hot towel and straight-razor shave experience.' },
      { name: 'Head Shave', price: '1000', img: 'https://images.unsplash.com/photo-1567894340345-a63c1c7931cb?q=80&w=2574&auto=format&fit=crop', description: 'A smooth, clean head shave with hot towels and premium balms.' },
      { name: 'Hair Coloring', price: '2500', img: 'https://images.unsplash.com/photo-1583253468223-c37894354533?q=80&w=2670&auto=format&fit=crop', description: 'From subtle highlights to bold new colors, using top-tier products.' },
      { name: 'Keratin Treatment', price: '4000', img: 'https://images.unsplash.com/photo-1560793733-9a3e14a739c2?q=80&w=2670&auto=format&fit=crop', description: 'Smooth, de-frizz, and add shine with a professional keratin treatment.' },
      { name: 'The Royal Package', price: '2500', img: 'https://images.unsplash.com/photo-1599351379359-2d185a0859a4?q=80&w=2574&auto=format&fit=crop', description: 'The ultimate grooming experience: a modern haircut and a royal shave.' },
    ];

    return `
      <section class="container">
        <div class="section-title gsap-reveal">
          <h2>Our Full Suite of Services</h2>
          <p>Explore our comprehensive menu of grooming services, each performed with meticulous attention to detail.</p>
        </div>
        <div class="services-grid">
          ${allServices.map((service, index) => `
            <div class="service-card gsap-reveal" data-gsap-delay="${index * 0.1}">
               <div class="service-image-wrapper">
                <img src="${service.img}" alt="${service.name}" class="service-image">
              </div>
              <div class="service-content">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <a href="/#booking" class="service-price" data-service="${service.name}">Book for ₹${service.price}</a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },
  addEvents: () => {
    createIcons({ icons, attrs: { 'stroke-width': 1.5 } });

    // GSAP Animations
    gsap.utils.toArray('.gsap-reveal').forEach(elem => {
      gsap.fromTo(elem, 
        { y: 50, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: elem.dataset.gsapDelay || 0,
          scrollTrigger: {
            trigger: elem,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Store service choice and redirect to booking
    document.querySelectorAll('.service-price').forEach(priceEl => {
      priceEl.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = priceEl.dataset.service;
        sessionStorage.setItem('selectedService', serviceName);
        // Use router to navigate to allow for smooth transitions if ever added
        window.location.href = '/#booking'; 
      });
    });
  }
};

export default ServicesPage;
