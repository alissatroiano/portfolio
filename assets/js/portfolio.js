// Load the CSV file using PapaParse
Papa.parse("assets/data/portfolio.csv", {
    download: true,
    header: true, // Automatically treats the first row as headers
    complete: function (results) {
      const projects = results.data; // Get project data
      initializeBreadcrumbFilter(projects); // Pass data to initialize the filter
    },
  });
  
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
          const filteredProjects = projects.filter((project) =>
            project.Technologies.toLowerCase().includes(selectedTech.toLowerCase())
          );
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
      const projectCard = `
        <div class="col-12 col-xl-3 col-lg-4 col-md-6">
          <div class="gallery-item h-100">
            <img src="${project.Image}" alt="${project.Project}" class="img-fluid" />
            <div class="gallery-links d-flex align-items-center justify-content-center">
              <a href="#" class="stretched-link" type="button" data-bs-toggle="modal" data-bs-target="#${project.ModalID}"></a>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", projectCard); // Add each project card dynamically
    });
  }
  
  