const cardsData = [
  {
    name: "VIRENDRA SINGH",
    domain: "Frontend Developer",
    goal: "Building clean, responsive and user-focused web interfaces",
    email: "virusingh0125@gmail.com",
    phone: "+91 8XXXXXXXX",
    skills: "HTML, CSS, JavaScript, React.js, Tailwind CSS",
    location: "Jaipur"
  },
  {
    name: "VEDANT JOSHI",
    domain: "Cloud Engineer",
    goal: "Designing scalable, reliable and cost-efficient cloud solutions",
    email: "vedantjoshi@gmail.com",
    phone: "+91 8XXXXXXX",
    skills: "AWS • Cloud Architecture • Linux",
    location: "Delhi"
  },
  {
    name: "ANSHUL JANGID",
    domain: "Cyber Security Analyst",
    goal: "Protecting systems, networks and data from modern cyber threats",
    email: "anshul@gmail.com",
    phone: "+91 7XXXXXXX",
    skills: "Network Security • Threat Analysis • Ethical Hacking",
    location: "Jodhpur"
  }
];

const wrapper = document.getElementById("cardsWrapper");

cardsData.forEach(data => {
  const container = document.createElement("div");
  container.className = "card-container";

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <div class="card-face front">
      <h2>${data.name}</h2>
      <p>${data.domain}</p>
      <span>🎯 ${data.goal}</span>
    </div>
    <div class="card-face back">
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Skills:</strong> ${data.skills}</p>
      <p><strong>Location:</strong> ${data.location}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  container.appendChild(card);
  wrapper.appendChild(container);
});

/* mouse glow move */
const light = document.getElementById("mouseLight");
document.addEventListener("mousemove", (e) => {
  light.style.left = e.clientX + "px";
  light.style.top = e.clientY + "px";
});

