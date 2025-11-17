const Footer = {
  render: () => {
    return `
      <div class="footer-content">
        <div class="footer-section footer-brand">
          <p class="footer-kicker">Premium Grooming Studio</p>
          <h4>RC The Hair Studio</h4>
          <p class="footer-description">
            Experience the art of premium grooming in a luxurious, relaxing space.
            We are dedicated to delivering the highest quality services with meticulous care.
          </p>
        </div>

        <div class="footer-section footer-contact">
          <h4>Visit & Contact</h4>
          <div class="footer-detail">
            <span class="label">Address</span>
            <p>FF/5, Maurya Arcade, Sola Rd, nr. HCG CANCEL HOSPITAL, opp. BAUCHAR MA TEMPLE, Science City, Sola, Ahmedabad, Gujarat 380060</p>
          </div>
          <div class="footer-inline">
            <div>
              <span class="label">Email</span>
              <p>contact@rchairstudio.com</p>
            </div>
            <div>
              <span class="label">Phone</span>
              <p>+91 97231 39290</p>
            </div>
          </div>
        </div>

        <div class="footer-section footer-social">
          <h4>Follow Us</h4>
          <p class="footer-description">Stay in touch for fresh looks, trends, and offers.</p>
          <div class="social-links">
            <a href="#" aria-label="Facebook"><i data-lucide="facebook"></i></a>
            <a href="https://www.instagram.com/rcthehairstudio/" aria-label="Instagram"><i data-lucide="instagram"></i></a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} RC The Hair Studio. All Rights Reserved.</p>
        <p class="footer-credits">Built by Harsh Parekh & Neev Lila</p>
      </div>
    `;
  },
};

export default Footer;
