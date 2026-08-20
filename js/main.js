/* Muhadz Techo — lightweight Vanilla JavaScript */
const PROJECTS = [
  {name:"Havenly",category:"Real Estate",filter:"business",url:"https://dev-muhadz.github.io/havenly-real-estate-template/",visual:"visual-havenly",label:"REAL ESTATE"},
  {name:"Savoria",category:"Restaurant & Cafe",filter:"creative",url:"https://dev-muhadz.github.io/savoria-restaurant-cafe-template/",visual:"visual-savoria",label:"RESTAURANT"},
  {name:"Kaizen",category:"Developer Portfolio",filter:"creative",url:"https://dev-muhadz.github.io/kaizen-interactive-portfolio/",visual:"visual-kaizen",label:"PORTFOLIO"},
  {name:"Vertex",category:"Digital Agency",filter:"business",url:"https://dev-muhadz.github.io/vertex-digital-agency-template/",visual:"visual-vertex",label:"AGENCY"},
  {name:"Altitude",category:"Agency / Product Studio",filter:"business",url:"https://dev-muhadz.github.io/altitude-agency-template/",visual:"visual-altitude",label:"STUDIO"},
  {name:"Pulse",category:"Admin Dashboard",filter:"tools",url:"https://dev-muhadz.github.io/pulse-admin-analytics-dashboard/",visual:"visual-pulse",label:"DASHBOARD"},
  {name:"VoltPay",category:"Fintech & Digital Wallet",filter:"fintech",url:"https://dev-muhadz.github.io/voltpay-fintech-digital-wallet-template/",visual:"visual-voltpay",label:"FINTECH"}
];

const collection = document.querySelector("#collection-grid");
const filterButtons = document.querySelectorAll(".filter-button");

function renderProjects(filter = "all") {
  const matches = PROJECTS.filter(project => filter === "all" || project.filter === filter);
  collection.innerHTML = matches.map((project,index) => `
    <article class="project-card collection-card" style="animation-delay:${index*45}ms">
      <div class="project-visual ${project.visual}">
        <div class="visual-window">
          <span>${project.name.toUpperCase()}</span>
          <strong>${project.name}</strong>
          <small>${project.label}</small>
        </div>
      </div>
      <div class="project-meta">
        <div><span class="project-number">${String(index+4).padStart(2,"0")}</span><h3>${project.name}</h3></div>
        <p>${project.category}</p>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${project.name} live demo">View live ↗</a>
      </div>
    </article>
  `).join("");
}

filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderProjects(button.dataset.filter);
}));
renderProjects();

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

function closeMenu() {
  menuToggle.classList.remove("is-open");
  navMenu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded","false");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const open = menuToggle.classList.toggle("is-open");
  navMenu.classList.toggle("is-open",open);
  menuToggle.setAttribute("aria-expanded",String(open));
  document.body.classList.toggle("menu-open",open);
});
navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click",closeMenu));

const header = document.querySelector(".site-header");
window.addEventListener("scroll",() => header.classList.toggle("scrolled",window.scrollY > 20),{passive:true});

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = Number(entry.target.dataset.count);
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now-start)/900,1);
      const eased = 1-Math.pow(1-progress,3);
      entry.target.textContent = Math.round(target*eased);
      if(progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(entry.target);
  });
},{threshold:.5});
counters.forEach(counter => counterObserver.observe(counter));

document.querySelector("#current-year").textContent = new Date().getFullYear();
