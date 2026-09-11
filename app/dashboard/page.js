"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Check, Edit3, FileText, FolderKanban, LayoutDashboard, Link2, LockKeyhole, LogOut, Menu, Plus, Save, ShieldCheck, Sparkles, Trash2, X } from "lucide-react";
import { startTransition, useEffect, useMemo, useState } from "react";
import { DProjects, DSkills } from "../../Data";
import { defaultCv, defaultHeader, defaultSiteContent, getProjectDetails, getProjectImageUrl, normalizeProject } from "../../lib/content";
import { firebaseEnabled, loadPortfolioData, savePortfolioData } from "../../lib/firebase";
import PortfolioAvatar from "../../components/PortfolioAvatar";

const defaultProject = { id: "", name: "", category: "", img: "", btn: "", tech: "", explan: "", demo: "", buy: "", price: "5", badge: "" };
const newId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function readLocal(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

async function getPortfolioContent() {
  try {
    const remote = await loadPortfolioData();
    if (remote) return remote;
  } catch (error) {
    console.error("Dashboard Firebase load failed", error);
  }
  return {
    skills: readLocal("portfolio-skills", DSkills),
    projects: readLocal("portfolio-projects", DProjects),
    cv: readLocal("portfolio-cv", defaultCv),
    header: readLocal("portfolio-header", defaultHeader),
    siteContent: readLocal("portfolio-site-content", defaultSiteContent),
  };
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "cv", label: "CV profile", icon: FileText },
  { id: "site-content", label: "About section", icon: BookOpen },
  { id: "header", label: "Header text", icon: Link2 },
];

export default function DashboardPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [skills, setSkills] = useState(DSkills);
  const [projects, setProjects] = useState(DProjects);
  const [cv, setCv] = useState(defaultCv);
  const [siteContent, setSiteContent] = useState(defaultSiteContent);
  const [header, setHeader] = useState(defaultHeader);
  const [skillForm, setSkillForm] = useState({ title: "", img: "" });
  const [projectForm, setProjectForm] = useState(defaultProject);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [persisting, setPersisting] = useState(false);
  const queryClient = useQueryClient();

  const portfolioQuery = useQuery({
    queryKey: ["portfolio-content"],
    queryFn: getPortfolioContent,
    enabled: unlocked,
  });

  useEffect(() => {
    const authenticated = window.localStorage.getItem("portfolio-dashboard-auth") === "true";
    startTransition(() => setUnlocked(authenticated));
  }, []);

  useEffect(() => {
    if (!portfolioQuery.data) return;
    startTransition(() => {
      setSkills(portfolioQuery.data.skills || DSkills);
      setProjects((portfolioQuery.data.projects || DProjects).map(normalizeProject));
      setCv({ ...defaultCv, ...(portfolioQuery.data.cv || {}) });
      setSiteContent({ ...defaultSiteContent, ...(portfolioQuery.data.siteContent || {}) });
      setHeader({ ...defaultHeader, ...(portfolioQuery.data.header || {}) });
    });
  }, [portfolioQuery.data]);

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = { skills, projects, cv, siteContent, header };
      window.localStorage.setItem("portfolio-skills", JSON.stringify(skills));
      window.localStorage.setItem("portfolio-projects", JSON.stringify(projects));
      window.localStorage.setItem("portfolio-cv", JSON.stringify(cv));
      window.localStorage.setItem("portfolio-header", JSON.stringify(header));
      window.localStorage.setItem("portfolio-site-content", JSON.stringify(siteContent));
      return savePortfolioData(payload);
    },
    onSuccess: (savedToFirebase) => {
      queryClient.setQueryData(["portfolio-content"], { skills, projects, cv, siteContent, header });
      setFeedback({ type: "success", text: savedToFirebase ? "All changes synced to Firebase" : "Saved on this device. Firebase is not configured." });
    },
    onError: (error) => setFeedback({ type: "error", text: `Firebase save failed: ${error.message}` }),
  });

  const persistDraft = async (nextSkills, nextProjects) => {
    setPersisting(true);
    const payload = { skills: nextSkills, projects: nextProjects, cv, siteContent, header };
    window.localStorage.setItem("portfolio-skills", JSON.stringify(nextSkills));
    window.localStorage.setItem("portfolio-projects", JSON.stringify(nextProjects));
    try {
      await savePortfolioData(payload);
      queryClient.setQueryData(["portfolio-content"], payload);
      setFeedback({ type: "success", text: "Changes saved to Firebase" });
    } catch (error) {
      setFeedback({ type: "error", text: `Firebase save failed: ${error.message}` });
    } finally {
      setPersisting(false);
    }
  };

  const totals = useMemo(() => ({ skills: skills.length, projects: projects.length }), [skills.length, projects.length]);

  const unlock = (event) => {
    event.preventDefault();
    const expectedPassword = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "admin123";
    if (password !== expectedPassword) {
      setPasswordError("That password is not correct.");
      return;
    }
    setUnlocked(true);
    setPasswordError("");
    window.localStorage.setItem("portfolio-dashboard-auth", "true");
  };

  const logout = () => {
    window.localStorage.removeItem("portfolio-dashboard-auth");
    setUnlocked(false);
    setPassword("");
  };

  const selectSection = (section) => {
    setActiveSection(section);
    setMobileMenu(false);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addSkill = (event) => {
    event.preventDefault();
    const title = skillForm.title.trim();
    if (!title) return;
    const nextSkills = [{ id: newId(), title, img: skillForm.img.trim() }, ...skills];
    setSkills(nextSkills);
    setSkillForm({ title: "", img: "" });
    persistDraft(nextSkills, projects);
  };

  const addProject = (event) => {
    event.preventDefault();
    const name = projectForm.name.trim();
    if (!name) return;
    const projectId = editingProjectId || newId();
    const nextProject = {
      id: projectId,
      name,
      category: projectForm.category.trim() || "Project",
      img: projectForm.img.trim(),
      btn: editingProjectId ? projectForm.btn || `/projects/${projectId}` : `/projects/${projectId}`,
      Details: {
        tech: projectForm.tech.split(",").map((item) => item.trim()).filter(Boolean),
        explan: projectForm.explan.trim(),
        Demo: projectForm.demo.trim() || "#",
        buy: projectForm.buy.trim() || "#",
        price: projectForm.price.trim() || "5",
      },
      price: projectForm.price.trim() || "5",
      badge: projectForm.badge,
    };
    const nextProjects = editingProjectId
      ? projects.map((project) => project.id === editingProjectId ? nextProject : project)
      : [nextProject, ...projects];
    setProjects(nextProjects);
    setProjectForm(defaultProject);
    setEditingProjectId(null);
    persistDraft(skills, nextProjects);
  };


  const editProject = (project) => {
    const details = getProjectDetails(project);
    setEditingProjectId(project.id);
    setProjectForm({
      id: project.id,
      name: project.name || "",
      category: project.category || "",
      img: project.img || project.image || "",
      btn: project.btn || "",
      tech: (details.tech || []).join(", "),
      explan: details.explan || "",
      demo: details.Demo || "",
      buy: details.buy || "",
      price: details.price || "5",
      badge: project.badge || "",
    });
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelProjectEdit = () => {
    setEditingProjectId(null);
    setProjectForm(defaultProject);
  };

  const removeSkill = (id) => {
    const nextSkills = skills.filter((item) => item.id !== id);
    setSkills(nextSkills);
    persistDraft(nextSkills, projects);
  };

  const removeProject = (id) => {
    const nextProjects = projects.filter((item) => item.id !== id);
    setProjects(nextProjects);
    persistDraft(skills, nextProjects);
  };

  if (!unlocked) {
    return (
      <main className="dashboard-auth-page">
        <motion.div className="auth-art-panel" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="auth-art-content">
            <div className="dashboard-brand-mark">Am</div>
            <p className="dashboard-kicker">Private workspace</p>
            <h1>Your work,<br /><em>beautifully managed.</em></h1>
            <p>Keep your portfolio fresh, focused, and ready for the next opportunity.</p>
            <div className="auth-benefit"><ShieldCheck size={18} /> Secure content management</div>
            <div className="auth-benefit"><Sparkles size={18} /> Instant Firebase sync</div>
          </div>
        </motion.div>
        <motion.form onSubmit={unlock} className="auth-form-panel" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <div className="auth-form-inner">
            <div className="auth-icon"><LockKeyhole size={22} /></div>
            <p className="dashboard-kicker">Welcome back</p>
            <h2>Enter your workspace</h2>
            <p className="auth-muted">Use your dashboard password to continue.</p>
            <label className="dashboard-label" htmlFor="dashboard-password">Password</label>
            <div className={`password-field ${passwordError ? "field-error" : ""}`}>
              <LockKeyhole size={17} />
              <input id="dashboard-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" autoFocus />
            </div>
            {passwordError ? <p className="form-error">{passwordError}</p> : null}
            <button className="dashboard-primary auth-submit" type="submit">Open dashboard <ArrowUpRight size={17} /></button>
            <p className="auth-footer"><ShieldCheck size={14} /> Your workspace is private</p>
          </div>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className={`dashboard-mobile-overlay ${mobileMenu ? "is-visible" : ""}`} onClick={() => setMobileMenu(false)} />
      <aside className={`dashboard-sidebar ${mobileMenu ? "is-open" : ""}`}>
        <div className="sidebar-topline">
          <div className="dashboard-brand-mark small">Am</div>
          <button type="button" className="sidebar-close" onClick={() => setMobileMenu(false)}><X size={19} /></button>
        </div>
        <div className="sidebar-heading"><span>Portfolio</span><strong>Studio</strong></div>
        <nav className="dashboard-nav">
          <p className="nav-caption">Workspace</p>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" className={activeSection === id ? "active" : ""} onClick={() => selectSection(id)}><Icon size={18} />{label}</button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sync-badge"><span className={firebaseEnabled ? "online-dot" : "offline-dot"} /><div><strong>{firebaseEnabled ? "Firebase connected" : "Local mode"}</strong><small>{firebaseEnabled ? "Cloud sync is ready" : "Configure Firebase to sync"}</small></div></div>
          <button type="button" className="logout-button" onClick={logout}><LogOut size={17} /> Log out</button>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-topbar">
          <button type="button" className="dashboard-menu-trigger" onClick={() => setMobileMenu(true)}><Menu size={21} /></button>
          <div><p className="dashboard-kicker">Tuesday, September 9</p><h1>Good to see you, Ahmed.</h1></div>
          <button type="button" className="dashboard-primary top-save" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}><Save size={17} /> {saveMutation.isPending ? "Saving..." : "Save changes"}</button>
        </header>

        <AnimatePresence>
          {feedback ? <motion.div className={`dashboard-feedback ${feedback.type}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check size={17} /> {feedback.text}<button type="button" onClick={() => setFeedback(null)}><X size={15} /></button></motion.div> : null}
        </AnimatePresence>

        {portfolioQuery.isLoading ? <div className="dashboard-loading"><span /> Loading your workspace...</div> : null}

        <section id="overview" className="dashboard-section overview-section">
          <div className="section-intro"><div><p className="dashboard-kicker">Overview</p><h2>Everything in one place.</h2></div><span className="last-saved"><span className="online-dot" /> Ready to edit</span></div>
          <div className="dashboard-stat-grid">
            <motion.div className="dashboard-stat-card violet" whileHover={{ y: -4 }}><div className="stat-icon"><Sparkles size={19} /></div><span>Published skills</span><strong>{totals.skills}</strong><small>Across your toolkit</small></motion.div>
            <motion.div className="dashboard-stat-card orange" whileHover={{ y: -4 }}><div className="stat-icon"><FolderKanban size={19} /></div><span>Portfolio projects</span><strong>{totals.projects}</strong><small>Stories you&apos;ve shipped</small></motion.div>
            <motion.div className="dashboard-stat-card blue" whileHover={{ y: -4 }}><div className="stat-icon"><FileText size={19} /></div><span>CV status</span><strong>{cv.downloadUrl ? "Ready" : "Draft"}</strong><small>{cv.downloadUrl ? "Download link is ready" : "Add your PDF link"}</small></motion.div>
          </div>
        </section>

        <section id="projects" className="dashboard-section editor-section">
          <div className="section-intro"><div><p className="dashboard-kicker">Content editor</p><h2>Projects</h2></div><span className="section-count">{projects.length} total</span></div>
          <div className="editor-grid">
            <form onSubmit={addProject} className="editor-card project-form-card">
              <div className="card-heading"><div><span className="card-icon orange-icon">{editingProjectId ? <Edit3 size={18} /> : <Plus size={18} />}</span><h3>{editingProjectId ? "Edit project" : "Add a project"}</h3></div><span className="required-note">* Required</span></div>
              <div className="form-grid-two"><label className="dashboard-label">Project name *<input className="dashboard-field" value={projectForm.name} onChange={(event) => setProjectForm({ ...projectForm, name: event.target.value })} placeholder="e.g. Dream Cart" required /></label><label className="dashboard-label">Category<input className="dashboard-field" value={projectForm.category} onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })} placeholder="e.g. Ecommerce" /></label></div>
              <label className="dashboard-label">Project image URL<input className="dashboard-field" value={projectForm.img} onChange={(event) => setProjectForm({ ...projectForm, img: event.target.value })} placeholder="https://... or /assets/projects/project.png" /></label>
              <div className="project-image-preview"><PortfolioAvatar label={projectForm.name || "Project"} src={getProjectImageUrl(projectForm.img)} /><span>{projectForm.img ? "Image preview" : "No image link yet - avatar will be used"}</span></div>
              <label className="dashboard-label">Technologies<input className="dashboard-field" value={projectForm.tech} onChange={(event) => setProjectForm({ ...projectForm, tech: event.target.value })} placeholder="React, Next.js, Firebase" /></label>
              <label className="dashboard-label">Description<textarea className="dashboard-field dashboard-textarea" value={projectForm.explan} onChange={(event) => setProjectForm({ ...projectForm, explan: event.target.value })} placeholder="What makes this project special?" rows={3} /></label>
              <div className="form-grid-two"><label className="dashboard-label">Demo URL<input className="dashboard-field" value={projectForm.demo} onChange={(event) => setProjectForm({ ...projectForm, demo: event.target.value })} placeholder="https://..." /></label><label className="dashboard-label">Project route<input className="dashboard-field" value={projectForm.btn} onChange={(event) => setProjectForm({ ...projectForm, btn: event.target.value })} placeholder="/project" /></label></div>
              <label className="dashboard-label">Price<input className="dashboard-field" type="number" min="0" step="0.01" value={projectForm.price} onChange={(event) => setProjectForm({ ...projectForm, price: event.target.value })} placeholder="5" /></label>
              <label className="dashboard-label">Project badge<select className="dashboard-field" value={projectForm.badge} onChange={(event) => setProjectForm({ ...projectForm, badge: event.target.value })}><option value="">No badge</option><option value="Freelance client">Freelance client</option><option value="Personal project">Personal project</option></select></label>
              <div className="project-form-actions"><button className="dashboard-primary form-submit" type="submit" disabled={persisting}>{editingProjectId ? <Edit3 size={17} /> : <Plus size={17} />} {persisting ? "Saving..." : editingProjectId ? "Update project" : "Add project"}</button>{editingProjectId ? <button className="dashboard-secondary form-submit" type="button" onClick={cancelProjectEdit}>Cancel</button> : null}</div>
            </form>
              <div className="editor-card collection-card"><div className="card-heading"><div><span className="card-icon blue-icon"><FolderKanban size={18} /></span><h3>Your projects</h3></div><span className="required-note">Manage</span></div><div className="collection-list">{projects.map((project) => <div className="collection-row" key={project.id}><div className="collection-thumb"><PortfolioAvatar label={project.name} src={project.img || project.image} /></div><div className="collection-info"><strong>{project.name}</strong><span>{project.category} · ${getProjectDetails(project).price || "5"}{project.badge ? ` · ${project.badge}` : ""}</span></div><button type="button" className="edit-button" disabled={persisting} onClick={() => editProject(project)} aria-label={`Edit ${project.name}`}><Edit3 size={15} /></button><button type="button" className="delete-button" disabled={persisting} onClick={() => removeProject(project.id)} aria-label={`Delete ${project.name}`}><Trash2 size={16} /></button></div>)}</div></div>
          </div>
        </section>

        <section id="skills" className="dashboard-section editor-section">
          <div className="section-intro"><div><p className="dashboard-kicker">Your toolkit</p><h2>Skills</h2></div><span className="section-count">{skills.length} total</span></div>
          <div className="editor-grid skills-editor-grid">
            <form onSubmit={addSkill} className="editor-card skill-form-card"><div className="card-heading"><div><span className="card-icon violet-icon"><Plus size={18} /></span><h3>Add a skill</h3></div></div><label className="dashboard-label">Skill name *<input className="dashboard-field" value={skillForm.title} onChange={(event) => setSkillForm({ ...skillForm, title: event.target.value })} placeholder="e.g. React" required /></label><label className="dashboard-label">Icon path or URL<input className="dashboard-field" value={skillForm.img} onChange={(event) => setSkillForm({ ...skillForm, img: event.target.value })} placeholder="/assets/skills/react.png" /></label><button className="dashboard-primary form-submit" type="submit" disabled={persisting}><Plus size={17} /> {persisting ? "Saving..." : "Add skill"}</button></form>
            <div className="editor-card collection-card"><div className="card-heading"><div><span className="card-icon violet-icon"><Sparkles size={18} /></span><h3>Your skills</h3></div></div><div className="skill-collection">{skills.map((skill) => <div className="skill-collection-item" key={skill.id}><PortfolioAvatar label={skill.title} src={skill.img} /><span>{skill.title}</span><button type="button" className="delete-button" disabled={persisting} onClick={() => removeSkill(skill.id)} aria-label={`Delete ${skill.title}`}><Trash2 size={15} /></button></div>)}</div></div>
          </div>
        </section>

        <section id="cv" className="dashboard-section editor-section cv-section">
          <div className="section-intro"><div><p className="dashboard-kicker">Professional profile</p><h2>CV & identity</h2></div><span className="section-count"><FileText size={15} /> PDF support</span></div>
          <div className="editor-card cv-editor-card"><div className="cv-editor-heading"><div><span className="card-icon blue-icon"><BookOpen size={18} /></span><h3>Keep your profile current</h3></div><p>Use a public PDF link. It will power the download button on your CV page.</p></div><div className="form-grid-two"><label className="dashboard-label">Full name<input className="dashboard-field" value={cv.name} onChange={(event) => setCv({ ...cv, name: event.target.value })} /></label><label className="dashboard-label">Professional title<input className="dashboard-field" value={cv.title} onChange={(event) => setCv({ ...cv, title: event.target.value })} /></label></div><label className="dashboard-label">Short summary<textarea className="dashboard-field dashboard-textarea" value={cv.summary} onChange={(event) => setCv({ ...cv, summary: event.target.value })} rows={4} /></label><label className="dashboard-label">Skills text<input className="dashboard-field" value={cv.skillsText} onChange={(event) => setCv({ ...cv, skillsText: event.target.value })} placeholder="HTML | CSS | React | Next.js" /></label><div className="form-grid-two"><label className="dashboard-label">CV PDF link<input className="dashboard-field" type="url" value={cv.downloadUrl} onChange={(event) => setCv({ ...cv, downloadUrl: event.target.value })} placeholder="https://drive.google.com/..." /></label><label className="dashboard-label">Download button text<input className="dashboard-field" value={cv.downloadLabel} onChange={(event) => setCv({ ...cv, downloadLabel: event.target.value })} placeholder="Download my CV" /></label></div><div className="cv-upload-row">{cv.downloadUrl ? <a className="pdf-ready" href={cv.downloadUrl} target="_blank" rel="noreferrer"><Check size={17} /> Test CV link <ArrowUpRight size={15} /></a> : <span className="pdf-empty"><FileText size={17} /> Add a PDF link below</span>}</div><div className="cv-save-row"><button type="button" className="dashboard-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}><Save size={17} /> Save CV content</button></div></div>
        </section>

        <section id="site-content" className="dashboard-section editor-section">
          <div className="section-intro"><div><p className="dashboard-kicker">Website copy</p><h2>About section</h2></div><span className="section-count">Live content</span></div>
          <div className="editor-card cv-editor-card">
            <div className="form-grid-two">
              <label className="dashboard-label">Small label<input className="dashboard-field" value={siteContent.aboutLabel} onChange={(event) => setSiteContent({ ...siteContent, aboutLabel: event.target.value })} /></label>
              <label className="dashboard-label">Heading<input className="dashboard-field" value={siteContent.aboutTitle} onChange={(event) => setSiteContent({ ...siteContent, aboutTitle: event.target.value })} /></label>
            </div>
            <label className="dashboard-label">About text<textarea className="dashboard-field dashboard-textarea" value={siteContent.aboutText} onChange={(event) => setSiteContent({ ...siteContent, aboutText: event.target.value })} rows={5} /></label>
            <label className="dashboard-label">Button text<input className="dashboard-field" value={siteContent.aboutButton} onChange={(event) => setSiteContent({ ...siteContent, aboutButton: event.target.value })} /></label>
            <div className="cv-save-row"><button type="button" className="dashboard-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}><Save size={17} /> Save website copy</button></div>
          </div>
        </section>

        <section id="header" className="dashboard-section editor-section">
          <div className="section-intro"><div><p className="dashboard-kicker">Homepage copy</p><h2>Header text</h2></div><span className="section-count">Live content</span></div>
          <div className="editor-card cv-editor-card">
            <div className="form-grid-two">
              <label className="dashboard-label">Eyebrow<input className="dashboard-field" value={header.eyebrow} onChange={(event) => setHeader({ ...header, eyebrow: event.target.value })} /></label>
              <label className="dashboard-label">Name<input className="dashboard-field" value={header.name} onChange={(event) => setHeader({ ...header, name: event.target.value })} /></label>
            </div>
            <label className="dashboard-label">Role / headline<input className="dashboard-field" value={header.role} onChange={(event) => setHeader({ ...header, role: event.target.value })} /></label>
            <label className="dashboard-label">Description<textarea className="dashboard-field dashboard-textarea" value={header.description} onChange={(event) => setHeader({ ...header, description: event.target.value })} rows={4} /></label>
            <div className="cv-save-row"><button type="button" className="dashboard-primary" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}><Save size={17} /> Save header text</button></div>
          </div>
        </section>
      </section>
    </main>
  );
}
