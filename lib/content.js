export const defaultHeader = {
  eyebrow: "Let's build something together",
  name: "Ahmed",
  role: "A Front-End Web Developer",
  description: "I'm focused on building responsive front-end web applications.",
};

export const defaultCv = {
  name: "Ahmed Mehana",
  title: "Front-End Web Developer",
  summary: "A front-end developer specializing in responsive and visually appealing web applications using React, Next.js, Vue.js, and Firebase. Skilled in clean, scalable code, seamless user experiences, and high-performance ecommerce and dashboard products.",
  skillsText: "HTML | CSS | JavaScript | React | Next.js | Redux | Tailwind | Firebase | REST API | Vue | Nuxt | PrimeVue",
  downloadUrl: "https://drive.google.com/file/d/1TKMvBDTnwNB1TeNjL1nwFSJ_2aOWseQE/view?usp=drivesdk",
  downloadLabel: "Download my CV",
};

export const defaultSiteContent = {
  aboutLabel: "About",
  aboutTitle: "Who I Am",
  aboutText: "I'm Ahmed, a front-end developer who turns complex ideas into clear, fast, and memorable digital experiences.",
  aboutButton: "Explore my projects.",
};

export function getCvDownloadUrl(url) {
  if (!url) return "";
  const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  return match ? `https://drive.google.com/uc?export=download&id=${match[1]}` : url;
}

export function getProjectImageUrl(value) {
  const url = String(value || "").trim();
  if (!url) return "";

  const driveFile = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveFile) return `https://drive.google.com/uc?export=view&id=${driveFile[1]}`;

  return url;
}
