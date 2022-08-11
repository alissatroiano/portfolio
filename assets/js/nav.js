const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarText')
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false})
navLinks.forEach((l) => {
    l.addEventListener('click', () => { bsCollapse.toggle() })
})