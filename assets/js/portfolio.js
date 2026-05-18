fetch("assets/data/portfolio.json")
    .then((response) => response.json())
    .then((projects) => {
        initializeCategoryFilter(projects);
    })
    .catch((error) => {
        console.error("Error loading JSON:", error);
    });

function initializeCategoryFilter(projects) {
    const filterLinks = document.querySelectorAll(".filter-btn");

    filterLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedCategory = link.getAttribute("data-category");

            const filteredProjects =
                selectedCategory === "All"
                    ? projects
                    : projects.filter((project) => {
                          const categories = Array.isArray(project.Category)
                              ? project.Category
                              : project.Category.split(",").map((cat) => cat.trim());
                          return categories.some(
                              (cat) =>
                                  cat?.toLowerCase() ===
                                  selectedCategory.toLowerCase()
                          );
                      });

            displayProjects(filteredProjects);
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
