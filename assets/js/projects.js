document.addEventListener('DOMContentLoaded', function() {
  // Path to your CSV file
  const csvPath = 'assets/data/projects.csv'; // Update the path accordingly

  // Fetch and parse the CSV
  Papa.parse(csvPath, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      const projects = results.data;
      createThumbnails(projects);
      createModals(projects);
    },
    error: function(err) {
      console.error('Error parsing CSV:', err);
    }
  });

  // Function to create project thumbnails
  function createThumbnails(projects) {
    const thumbnailContainer = document.getElementById('project-thumbnails');
    
    projects.forEach(project => {
      const projectCol = document.createElement('div');
      projectCol.classList.add('col-12', 'col-xs-8', 'col-sm-4');

      projectCol.innerHTML = `
        <div class="gallery-item h-100">
          <img src="${project.thumbnail}" alt="${project.title}" class="img-fluid" />
          <div class="gallery-links d-flex align-items-center justify-content-center">
            <a href="#" class="stretched-link btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal${project.id}"></a>
          </div>
        </div>
      `;

      thumbnailContainer.appendChild(projectCol);
    });
  }

  // Function to create project modals
  function createModals(projects) {
    const modalContainer = document.getElementById('project-modals');

    projects.forEach(project => {
      const modal = document.createElement('div');
      modal.classList.add('modal', 'fade');
      modal.id = `projectModal${project.id}`;
      modal.setAttribute('tabindex', '-1');
      modal.setAttribute('aria-labelledby', `modalLabel${project.id}`);
      modal.setAttribute('aria-hidden', 'true');

      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="text-end">
              <button type="button" class="btn-close me-3 mt-3" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-header">
              <div class="col-12">
                <h1 class="folio-title display-3 text-center text-sm-start">
                  ${project.title}: <span class="text-light-purple">${project.subtitle}</span>
                </h1>
              </div>
            </div>
            <div class="modal-body">
              <div class="row">
                <!-- Video and About Section -->
                <div class="col-lg-7 mb-4 mb-lg-0">
                  <div class="pe-lg-4 me-lg-3 pe-xl-0 me-xl-0">
                    <div class="ratio ratio-16x9 mb-4">
                      <iframe src="${project.youtube_url}" title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                    </div>
                    <h2 class="h1 my-4 text-mark-projects">
                      <i class="fas fa-circle-info"></i> About
                    </h2>
                    <p class="fs-lg mb-0">${project.description}</p>
                  </div>
                </div>
                <!-- Details Section -->
                <div class="col-lg-5 col-xl-4 offset-xl-1 border-start-lg">
                  ${project.problem || project.solution ? `
                  <div>
                    ${project.problem ? `
                    <h3 class="h5 d-flex align-items-center text-mark-projects">
                      <i class="fas fa-circle-question mx-1"></i> Problem
                    </h3>
                    <p class="my-3">${project.problem}</p>
                    ` : ''}
                    
                    ${project.solution ? `
                    <h3 class="h5 d-flex align-items-center text-mark-projects">
                      <i class="fas fa-lightbulb me-2"></i> Solution
                    </h3>
                    <p class="my-3">${project.solution}</p>
                    ` : ''}
                  </div>
                  ` : ''}
                  
                  <h3 class="h5 d-flex align-items-center text-mark-projects">
                    <i class="fas fa-wrench mx-1"></i> Tech Stack
                  </h3>
                  <p class="tech-stack">${project.tech_stack}</p>
                  
                  ${project.award_text ? `
                  <div class="mt-3">
                    <span class="award-text text-center text-sm-start">${project.award_text}</span>
                  </div>
                  ` : ''}
                  
                  <div class="photo my-3">
                    <img src="${project.modal_image}" class="img-fluid project-img" alt="${project.title}" />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              ${project.live_link ? `<a href="${project.live_link}" target="_blank"><button class="btn btn-primary">Live Project</button></a>` : ''}
              ${project.source_link ? `<a href="${project.source_link}" target="_blank"><button class="btn btn-secondary">Source Code</button></a>` : ''}
            </div>
          </div>
        </div>
      `;

      modalContainer.appendChild(modal);
    });
  }
});
