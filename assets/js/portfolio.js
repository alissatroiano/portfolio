document.addEventListener("DOMContentLoaded", () => {
    const breadcrumbItems = document.querySelectorAll(".breadcrumb-item a");
    const galleryContainer = document.querySelector(".gallery .row.d-flex.gy-4.g-3.justify-content-center");

    // Load project data from JSON
    fetch("assets/data/portfolio.json")
        .then(response => response.json())
        .then(projects => {
            // Render all projects by default
            renderProjects(projects);

            // Add click event listeners to breadcrumb items
            breadcrumbItems.forEach(link => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const technology = link.textContent.trim();

                    // Filter projects based on the selected technology
                    const filteredProjects = technology === "All" 
                        ? projects 
                        : projects.filter(project => project.technologies.includes(technology));

                    // Render the filtered projects
                    renderProjects(filteredProjects);
                });
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});

// Function to render projects dynamically
function renderProjects(projects) {
    const galleryContainer = document.querySelector(".gallery .row.d-flex.gy-4.g-3.justify-content-center");
    galleryContainer.innerHTML = ""; // Clear existing content

    projects.forEach(project => {
        const projectHTML = `
            <div class="col-12 col-xl-3 col-lg-4 col-md-6">
                <div class="gallery-item h-100">
                    <img src="${project.image}" alt="${project.title}" class="img-fluid" />
                    <div class="gallery-links d-flex align-items-center justify-content-center">
                        <a href="#" class="stretched-link" type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#${project.title.replace(/\s+/g, "")}">
                        </a>
                    </div>
                </div>
            </div>
        `;
        galleryContainer.insertAdjacentHTML("beforeend", projectHTML);
    });
}
