import ReactLazyPreload from "./utilities/ReactLazyPreload";

const AboutSection = ReactLazyPreload(()=>import("./components/about.section/AboutSection"));
const ServiceSimple = ReactLazyPreload(()=>import("./components/service.section/ServiceSimple"));
const SkillsSimple = ReactLazyPreload(()=>import("./components/skills.section/SkillsSimple"));
const ProjectSection = ReactLazyPreload(()=>import("./components/project.section/ProjectSection"));
const BlogSection = ReactLazyPreload(()=>import("./components/blog.section/BlogSection"));
const ContactSection = ReactLazyPreload(()=>import("./components/contact.section/ContactSection"));
const Footer = ReactLazyPreload(()=>import("./components/footer.section/FooterSection"));


const routes = [
	{ name: "about", component: AboutSection },
	{ name: "service", component: ServiceSimple },
	{ name: "skills", component: SkillsSimple },
	{ name: "project", component: ProjectSection },
	{ name: "blog", component: BlogSection },
	{ name: "contact", component: ContactSection },
	{ name: "footer", component: Footer },
]
export default routes