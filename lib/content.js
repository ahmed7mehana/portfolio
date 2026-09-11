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

  const driveFile = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|thumbnail\?id=|uc\?.*?id=)([\w-]+)/);
  if (driveFile) return `https://drive.google.com/thumbnail?id=${driveFile[1]}&sz=w1200`;

  return url;
}

export function getProjectImageCandidates(value) {
  const url = String(value || "").trim();
  const driveFile = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|thumbnail\?id=|uc\?.*?id=)([\w-]+)/);
  if (!driveFile) return url ? [url] : [];

  const id = driveFile[1];
  return [
    `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
    `https://drive.google.com/uc?export=view&id=${id}`,
    `https://lh3.googleusercontent.com/d/${id}=w1200`,
  ];
}

export function getProjectDetails(project = {}) {
  const details = project.Details || {};
  return {
    ...details,
    tech: project.tech || details.tech || [],
    explan: project.explan || details.explan || "",
    Demo: project.demo || details.Demo || "#",
    buy: project.buy || details.buy || "https://wa.me/201558533755",
    price: project.price ?? details.price ?? "5",
  };
}

export function normalizeProject(project = {}) {
  const details = getProjectDetails(project);
  return { ...project, img: project.img || project.image || "", badge: project.badge || project.type || "", tech: details.tech, Details: details };
}
