document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    enableSecurity();
});

// 1. LOAD PROJECTS FROM JSON
async function loadProjects() {
    const container = document.getElementById('portfolio-container');
    
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();

        container.innerHTML = ''; // Clear loading spinner

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class="card h-100 project-card shadow-sm" onclick="openProject(${project.id})">
                    <img src="${project.thumbnail}" class="card-img-top" alt="${project.title}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <span class="badge bg-secondary mb-2">${project.category}</span>
                        <h5 class="card-title fw-bold">${project.title}</h5>
                        <p class="card-text text-muted small">${project.description}</p>
                    </div>
                    <div class="card-footer bg-white border-0 pb-3">
                        <button class="btn btn-outline-primary btn-sm w-100">
                            <i class="fas fa-eye"></i> View Securely
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // Store projects globally to access them in openProject
        window.allProjects = projects;

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p class="text-center text-danger">Failed to load projects.</p>';
    }
}

// 2. OPEN SECURE MODAL
window.openProject = function(id) {
    const project = window.allProjects.find(p => p.id === id);
    if (!project) return;

    document.getElementById('modalTitle').innerText = project.title;
    const modalBody = document.getElementById('modalBody');
    
    // Create Secure Image Viewer
    let contentHtml = `<p class="mb-4">${project.description}</p>`;
    
    project.projectImages.forEach(imgSrc => {
        contentHtml += `
            <div class="secure-image-container shadow">
                <div class="watermark">TAFITI99 PREVIEW</div>
                <div class="img-shield"></div> <img src="${imgSrc}" class="img-fluid w-100" alt="Protected Content" oncontextmenu="return false;">
            </div>
        `;
    });

    modalBody.innerHTML = contentHtml;

    // Show Bootstrap Modal
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}

// 3. SECURITY FEATURES
function enableSecurity() {
    // Disable Right Click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable Keyboard Shortcuts (Ctrl+P, Ctrl+S, Ctrl+U, Ctrl+C)
    document.addEventListener('keydown', function(e) {
        if (
            (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u' || e.key === 'c')) || // Ctrl+P/S/U/C
            e.keyCode === 123 // F12 (Developer Tools - basic block)
        ) {
            e.preventDefault();
            alert('This content is protected by Tafiti99 copyright.');
            return false;
        }
    });
}