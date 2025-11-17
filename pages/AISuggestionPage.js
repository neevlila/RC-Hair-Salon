import { createIcons, icons } from 'lucide';
import { getHaircutSuggestion } from '../lib/geminiClient';
import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

const AISuggestionPage = {
  render: () => `
    <section class="container">
      <div class="section-title">
        <h2>AI Haircut Suggestion</h2>
        <p>Not sure what to get? Upload a clear, front-facing photo, and our AI will suggest styles that suit you.</p>
      </div>

      <div class="ai-suggestion-container">
        <div class="ai-upload-panel form-container box-shadow">
          <h3>Upload Your Photo</h3>
          <p>For best results, use a well-lit photo where your face and hair are clearly visible.</p>
          <form id="ai-form">
            <div class="form-field">
              <label for="image-upload" class="upload-label">
                <i data-lucide="upload-cloud"></i>
                <span>Click to select an image</span>
              </label>
              <input type="file" id="image-upload" name="image" accept="image/*" required>
            </div>
            <img id="image-preview" src="" alt="Image preview" style="display: none;" />
            <button type="submit" class="btn" id="ai-submit-btn">Get My Suggestion</button>
          </form>
        </div>

        <div class="ai-results-panel">
          <h3>Your Personalized Suggestions</h3>
          <div id="ai-loader" class="ai-loader" style="display: none;">
            <div class="spinner"></div>
            <p>Our AI is analyzing your photo... Please wait.</p>
          </div>
          <div id="ai-results-content" class="ai-results-content">
            <div class="placeholder">
              <i data-lucide="sparkles"></i>
              <p>Your haircut suggestions will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  addEvents: () => {
    createIcons({ icons, attrs: { 'stroke-width': 1.5 } });

    const form = document.getElementById('ai-form');
    const imageInput = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const uploadLabelSpan = document.querySelector('.upload-label span');
    const submitBtn = document.getElementById('ai-submit-btn');
    const resultsContent = document.getElementById('ai-results-content');
    const loader = document.getElementById('ai-loader');

    imageInput.addEventListener('change', () => {
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
        uploadLabelSpan.textContent = file.name;
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const file = imageInput.files[0];
      if (!file) {
        // This is a fallback, the `required` attribute should prevent this.
        resultsContent.innerHTML = `<div class="placeholder error"><i data-lucide="alert-triangle"></i><p>Please upload an image first.</p></div>`;
        createIcons({ icons, attrs: { 'stroke-width': 1.5 } });
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Analyzing...';
      resultsContent.style.display = 'none';
      loader.style.display = 'flex';

      try {
        const suggestionText = await getHaircutSuggestion(file);
        // Use the 'mangle: false' and 'headerIds: false' options to prevent marked.js from creating unwanted IDs
        const htmlContent = marked.parse(suggestionText, { mangle: false, headerIds: false });
        resultsContent.innerHTML = htmlContent;
        // Re-run createIcons if your markdown could contain them
        createIcons({ icons, attrs: { 'stroke-width': 1.5 }, nameAttr: 'data-lucide' });
      } catch (error) {
        // The error message is now generated inside geminiClient.js
        resultsContent.innerHTML = `<div class="placeholder error"><i data-lucide="alert-triangle"></i><p>${error.message}</p></div>`;
        createIcons({ icons, attrs: { 'stroke-width': 1.5 } });
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get My Suggestion';
        loader.style.display = 'none';
        resultsContent.style.display = 'block';
      }
    });
  }
};

export default AISuggestionPage;
