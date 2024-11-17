// Load the CSV file using PapaParse
Papa.parse("assets/data/portfolio.csv", {
    download: true,
    header: true, // Automatically treats the first row as headers
    skipEmptyLines: true, // Skips empty lines in the CSV
    dynamicTyping: true,  // Converts numeric fields to numbers
    complete: function (results) {
        const projects = results.data; // Parsed data
        initializeBreadcrumbFilter(projects); // Initialize filtering with data
    },
    error: function (error) {
        console.error("Error parsing CSV:", error);
    },
});
console.log("Parsed Projects Data:", projects);

function initializeBreadcrumbFilter(projects) {
    const breadcrumbLinks = document.querySelectorAll(".breadcrumb-item a");

    // Attach click event to each breadcrumb link
    breadcrumbLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default link behavior
            const selectedTech = link.textContent.trim(); // Get the breadcrumb text (technology)

            if (selectedTech === "All") {
                // Show all projects when "All" is selected
                displayProjects(projects);
            } else {
                // Filter projects by selected technology
                const filteredProjects = projects.filter((project) => {
                    const techList = project.Technologies.split(",").map((tech) => tech.trim().toLowerCase());
                    return techList.includes(selectedTech.toLowerCase());
                });
                displayProjects(filteredProjects);
            }
        });
    });

    // Display all projects initially
    displayProjects(projects);
}


function displayProjects(projects) {
    const container = document.querySelector("#project-container .row"); // Target the correct row container

    container.innerHTML = ""; // Clear existing content

    projects.forEach((project) => {
        // Extract data for each project
        const { Project, Technologies, ModalID, ImageSrc } = project;

        // Split the technologies into an array
        const techList = Technologies.split(",").map((tech) => tech.trim());

        const projectCard = `
            <div class="col-12 col-xl-3 col-lg-4 col-md-6">
                <div class="gallery-item h-100">
                    <img src="${ImageSrc}" alt="${Project}" class="img-fluid" />
                    <div class="gallery-links d-flex align-items-center justify-content-center">
                      <a href="#" class="stretched-link" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${ModalID}"></a>
                    </div>
                    <div class="technologies">
                      ${techList
                .map((tech) => `<span class="badge bg-secondary me-1">${tech}</span>`)
                .join("")}
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", projectCard); // Add each project card dynamically
    });
}