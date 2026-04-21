// ── File Upload UX ──
const fileInput = document.getElementById('fileInput');
const fileInfo  = document.getElementById('fileInfo');
const uploadArea = document.getElementById('uploadArea');

if (fileInput) {
  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) {
      const name = fileInput.files[0].name;
      const size = (fileInput.files[0].size / 1024 / 1024).toFixed(2);
      fileInfo.textContent = `${name} (${size} MB)`;
    }
  });
}

if (uploadArea) {
  uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    if (e.dataTransfer.files[0] && fileInput) {
      fileInput.files = e.dataTransfer.files;
      const name = fileInput.files[0].name;
      const size = (fileInput.files[0].size / 1024 / 1024).toFixed(2);
      if (fileInfo) fileInfo.textContent = `${name} (${size} MB)`;
    }
  });
}

// ── Review Modal ──
function openReview(id, title) {
  const modal = document.getElementById('reviewModal');
  const form  = document.getElementById('reviewForm');
  const titleEl = document.getElementById('modalTitle');
  if (!modal || !form) return;
  form.action = `/supervisor/review/${id}`;
  if (titleEl) titleEl.textContent = title;
  modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('reviewModal');
  if (modal) modal.classList.remove('open');
}

// Close on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('reviewModal');
  if (modal && e.target === modal) closeModal();
});

// ── Admin Export ──
function doExport(fmt) {
  const sel = document.getElementById('exportGroup');
  const gid = sel ? sel.value : '';
  const params = new URLSearchParams({ format: fmt });
  if (gid) params.set('group_id', gid);
  window.location.href = `/admin/export?${params}`;
}

// ── Auto-dismiss alerts ──
setTimeout(() => {
  document.querySelectorAll('.alert').forEach(a => {
    a.style.transition = 'opacity 0.5s';
    a.style.opacity = '0';
    setTimeout(() => a.remove(), 500);
  });
}, 4000);
