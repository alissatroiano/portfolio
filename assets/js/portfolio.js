fetch("assets/data/portfolio.json")
    .then((response) => response.json())
    .then((projects) => {
        initializeCategoryFilter(projects);
    })
    .catch((error) => {
        console.error("Error loading JSON:", error);
    });

function initializeCategoryFilter(projects) {
    const breadcrumbLinks = document.querySelectorAll(".breadcrumb-item a");

    breadcrumbLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedCategory = link.textContent.trim();

            if (selectedCategory === "All") {
                displayProjects(projects);
            } else {
                const filteredProjects = projects.filter(
                    (project) =>
                        project.Category?.toLowerCase() === selectedCategory.toLowerCase()
                );
                displayProjects(filteredProjects);
            }
        });
    });

    displayProjects(projects); // Show all by default
}

function displayProjects(projects) {
    const container = document.querySelector("#project-container .row");
    container.innerHTML = "";

    projects.forEach((project) => {
        const { Project, ModalID, ImageSrc } = project;

        const projectCard = `
            <div class="col-12 col-xl-3 col-lg-4 col-md-6">
                <div class="gallery-item h-100">
                    <img src="${ImageSrc}" alt="${Project}" class="img-fluid" />
                    <div class="gallery-links d-flex align-items-center justify-content-center">
                        <a href="#" class="stretched-link" data-bs-toggle="modal" data-bs-target="#${ModalID}"></a>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", projectCard);
    });
}
