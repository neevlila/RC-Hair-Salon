import { createIcons, icons } from 'lucide';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HomePage = {
  render: () => {
    const services = [
      { name: 'Classic Haircut', price: '800', img: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2670&auto=format&fit=crop' },
      { name: 'Modern Fade', price: '1200', img: 'https://images.unsplash.com/photo-1622286342621-4bd78cf2e59a?q=80&w=2574&auto=format&fit=crop' },
      { name: 'Beard Trim & Style', price: '600', img: 'https://images.unsplash.com/photo-1632345031435-8727f669d281?q=80&w=2574&auto=format&fit=crop' },
      { name: 'Royal Shave', price: '900', img: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=2670&auto=format&fit=crop' },
      { name: 'Luxury Scalp Treatment', price: '1100', img: 'https://images.unsplash.com/photo-1590556642351-3d22f3da04c9?q=80&w=2574&auto=format&fit=crop', desktopOnly: true },
      { name: 'Hair Spa & Massage', price: '1400', img: 'https://images.unsplash.com/photo-1612705227716-707bfb3b542f?q=80&w=2574&auto=format&fit=crop', desktopOnly: true },
    ];

    const fmtDate = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 2);

    return `
      <section class="hero">
        <div class="hero-content">
          <h1 class="gsap-reveal">Timeless Style, Modern Man</h1>
          <p class="gsap-reveal" data-gsap-delay="0.2">Welcome to RC The Hair Studio, where tradition meets trend.</p>
          <a href="#booking" class="btn gsap-reveal" data-gsap-delay="0.4">Book an Appointment</a>
        </div>
      </section>

      <section id="services" class="container">
        <div class="section-title gsap-reveal">
          <h2>Featured Services</h2>
          <p>Crafted with precision, tailored for you.</p>
        </div>
        <div class="services-grid">
          ${services.map((service, index) => `
            <div class="service-card gsap-reveal ${service.desktopOnly ? 'desktop-only' : ''}" data-gsap-delay="${index * 0.1}">
              <div class="service-image-wrapper">
                <img src="${service.img}" alt="${service.name}" class="service-image">
              </div>
              <div class="service-content">
                <h3>${service.name}</h3>
                <p>A premium service for the discerning gentleman.</p>
                <a class="service-price" data-service="${service.name}">Book for ₹${service.price}</a>
              </div>
            </div>
          `).join('')}
        </div>
         <div style="text-align: center; margin-top: var(--spacing-lg);">
            <a href="/services" class="btn btn-secondary" data-link>View All Services</a>
        </div>
      </section>

      <section id="booking" class="container">
        <div class="booking-container">
          <div class="booking-info gsap-reveal">
            <h2>Book Your Slot</h2>
            <p>Select your desired service and time. We'll be ready to provide you with an unparalleled grooming experience.</p>
            <p>For custom requests or group bookings, please call us at <strong>+91 97231 39290</strong>.</p>
            <ul class="booking-highlights gsap-reveal" data-gsap-delay="0.1">
              <li><i data-lucide="check-circle-2"></i><span>Expert stylists with modern techniques</span></li>
              <li><i data-lucide="check-circle-2"></i><span>Premium products for long-lasting finish</span></li>
              <li><i data-lucide="check-circle-2"></i><span>Hassle-free scheduling and quick confirmation</span></li>
            </ul>
          </div>
          <div class="booking-form form-container gsap-reveal box-shadow" data-gsap-delay="0.2">
            <form id="booking-form">
              <input type="hidden" name="access_key" value="${import.meta.env.VITE_WEB3FORMS_API_KEY}">
              <div id="form-result"></div>
              <div class="form-field">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
              </div>
              <div class="form-field">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
              </div>
              <div class="form-field">
                <label for="service-select">Service</label>
                <select id="service-select" name="service" required>
                  <option value="">Select a service</option>
                  ${services.map(s => `<option value="${s.name}">${s.name} - ₹${s.price}</option>`).join('')}
                   <option value="Other">Other (Specify below)</option>
                </select>
              </div>
               <div class="form-field">
                <label for="custom-haircut">Custom Haircut Request (Optional)</label>
                <textarea id="custom-haircut" name="custom_haircut" placeholder="e.g., 'High fade with a textured top' or specific instructions."></textarea>
              </div>
              <div class="form-field">
                <label for="booking-date">Preferred Date</label>
                <input type="date" id="booking-date" name="date" required min="${fmtDate(today)}" max="${fmtDate(maxDate)}">
              </div>
              <div class="form-field">
                <label for="booking-time">Preferred Time</label>
                <input type="time" id="booking-time" name="time" required step="1800">
              </div>
              <button type="submit" class="btn">Confirm Booking</button>
            </form>
          </div>
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

    // Service card click
    document.querySelectorAll('.service-price').forEach(priceEl => {
      priceEl.addEventListener('click', () => {
        const serviceName = priceEl.dataset.service;
        const select = document.getElementById('service-select');
        if (select) {
          select.value = serviceName;
          document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Date range (today to next 2 days)
    const dateInput = document.getElementById('booking-date');
    const timeInput = document.getElementById('booking-time');
    if (dateInput) {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const min = `${y}-${m}-${d}`;
      const maxD = new Date(now);
      maxD.setDate(now.getDate() + 2);
      const max = `${maxD.getFullYear()}-${String(maxD.getMonth() + 1).padStart(2, '0')}-${String(maxD.getDate()).padStart(2, '0')}`;
      dateInput.setAttribute('min', min);
      dateInput.setAttribute('max', max);
      if (!dateInput.value) dateInput.value = min;
    }

    const form = document.getElementById('booking-form');
    if (form) {
      const result = document.getElementById('form-result');
      const dateInputEl = document.getElementById('booking-date');
      const timeInputEl = document.getElementById('booking-time');
      const SLOT_CAPACITY = 2;
      const STEP_MINUTES = 30;
      const storageKeyFor = (dateStr, timeStr) => `booking:${dateStr} ${timeStr}`;
      const getCount = (key) => parseInt(localStorage.getItem(key) || '0', 10);
      const incCount = (key) => localStorage.setItem(key, String(getCount(key) + 1));
      const minutesOk = (timeStr) => {
        const [hh, mm] = timeStr.split(':').map(Number);
        return mm % STEP_MINUTES === 0;
      };
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);

        // Basic required field checks
        if (!object.name || !object.name.trim()) {
          result.innerHTML = "Please enter your full name.";
          result.className = 'form-message error';
          return;
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(object.email || '');
        if (!emailOk) {
          result.innerHTML = "Please enter a valid email address.";
          result.className = 'form-message error';
          return;
        }
        if (!object.service || object.service === '') {
          result.innerHTML = "Please select a service.";
          result.className = 'form-message error';
          return;
        }
        if (!dateInputEl.value || !timeInputEl.value) {
          result.innerHTML = "Please choose date and time.";
          result.className = 'form-message error';
          return;
        }
        if (!minutesOk(timeInputEl.value)) {
          result.innerHTML = `Please pick a time in ${STEP_MINUTES}-minute intervals (e.g., 10:00, 10:30).`;
          result.className = 'form-message error';
          return;
        }
        const key = storageKeyFor(dateInputEl.value, timeInputEl.value);
        if (getCount(key) >= SLOT_CAPACITY) {
          result.className = 'form-message error';
          result.innerHTML = 'This slot is fully booked. Please choose a time 30 minutes later.';
          return;
        }
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";
        result.className = 'form-message';
        result.style.display = 'block';

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200) {
            result.className = 'form-message success';
            result.innerHTML = json.message;
            incCount(key);
          } else {
            console.log(response);
            result.className = 'form-message error';
            result.innerHTML = json.message;
          }
        })
        .catch(error => {
          console.log(error);
          result.className = 'form-message error';
          result.innerHTML = "Something went wrong!";
        })
        .then(function() {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 5000);
        });
      });
    }
  }
};

export default HomePage;
