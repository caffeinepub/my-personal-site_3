import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Compass,
  Github,
  Globe,
  Instagram,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const CAPABILITIES = [
  {
    icon: <Palette size={24} />,
    title: "UI/UX Design",
    description:
      "Crafting intuitive, delightful interfaces that put users first — from wireframes to polished pixel-perfect experiences.",
  },
  {
    icon: <Layers size={24} />,
    title: "Brand Identity",
    description:
      "Building cohesive visual identities that communicate your brand's values with clarity, elegance, and purpose.",
  },
  {
    icon: <Globe size={24} />,
    title: "Web Development",
    description:
      "Bringing designs to life with clean, performant code — React, TypeScript, and modern web standards.",
  },
  {
    icon: <Compass size={24} />,
    title: "Creative Direction",
    description:
      "Leading visual storytelling across campaigns, products, and platforms with a consistent creative vision.",
  },
];

const PROJECTS = [
  {
    title: "Solstice Web Platform",
    category: "Web Design",
    image: "/assets/generated/project-web-design.dim_400x300.jpg",
  },
  {
    title: "Lumen Mobile App",
    category: "UI/UX Design",
    image: "/assets/generated/project-mobile-app.dim_400x300.jpg",
  },
  {
    title: "Auris Photography",
    category: "Photography",
    image: "/assets/generated/project-photography.dim_400x300.jpg",
  },
  {
    title: "Vora Logo Collection",
    category: "Logo Design",
    image: "/assets/generated/project-logo-design.dim_400x300.jpg",
  },
];

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-sm shadow-xs"
            : "bg-background"
        } border-b border-border`}
      >
        <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="font-display font-bold text-lg tracking-wider text-foreground hover:text-primary transition-colors"
            data-ocid="nav.link"
          >
            ASHWIN PREM
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-body text-sm px-5"
              data-ocid="header.primary_button"
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
            type="button"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-background border-t border-border"
            >
              <nav className="container mx-auto px-6 py-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground py-2 transition-colors"
                    onClick={() => setMobileOpen(false)}
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  className="mt-2 bg-primary text-primary-foreground"
                  data-ocid="header.primary_button"
                >
                  Start a Project
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── Hero ── */}
        <section id="home" className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="font-body text-sm font-medium text-secondary uppercase tracking-[0.14em] mb-3"
                >
                  Creative Designer with AI & Visual Storyteller
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.12 }}
                  className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground mb-6"
                >
                  I Design Brands,
                  <em className="block not-italic text-secondary">
                    {" "}
                    Products,
                  </em>
                  & Digital Experiences
                  <span className="block text-4xl md:text-5xl lg:text-6xl mt-1">
                    That Resonate.
                  </span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.38 }}
                  className="flex flex-wrap gap-3"
                >
                  <a href="#projects">
                    <Button
                      className="bg-secondary text-foreground hover:bg-secondary/85 font-body px-6 py-3 text-sm rounded-full"
                      data-ocid="hero.primary_button"
                    >
                      Explore my Work
                      <ArrowRight size={15} className="ml-2" />
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button
                      variant="outline"
                      className="border-border text-foreground hover:bg-muted font-body px-6 py-3 text-sm rounded-full"
                      data-ocid="hero.secondary_button"
                    >
                      Get in Touch
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* Right — Portrait */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex justify-center"
              >
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-3 rounded-3xl bg-accent opacity-60 blur-sm" />
                  <img
                    src="/assets/uploads/whatsapp_image_2026-03-27_at_6.05.21_pm-019d2f4b-aa46-736b-b8de-f7b8ece500d8-1.jpeg"
                    alt="Ashwin Prem"
                    className="relative w-full rounded-3xl object-cover shadow-card border border-border"
                    style={{ aspectRatio: "4/5", objectPosition: "center top" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-24 bg-band">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left text */}
              <FadeUp>
                <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                  About Ashwin
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6">
                  Design is how I make sense of the world.
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  For the past 6 months, I've express complex ideas through
                  clear, thoughtful design. My work bridges strategy and
                  execution — from early-stage brand discovery to
                  production-ready systems.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  I believe great design is often invisible: it removes
                  friction, builds trust, and creates a lasting impression
                  without drawing attention to itself.
                </p>
              </FadeUp>

              {/* Right stats card */}
              <FadeUp delay={0.15}>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <div className="flex gap-4 items-center mb-6 pb-6 border-b border-border">
                    <img
                      src="/assets/uploads/whatsapp_image_2026-03-27_at_6.05.21_pm-019d2f4b-aa46-736b-b8de-f7b8ece500d8-1.jpeg"
                      alt="Ashwin Prem"
                      className="w-16 h-16 rounded-full object-cover border-2 border-border"
                      style={{ objectPosition: "center top" }}
                    />
                    <div>
                      <h3 className="font-display font-bold text-foreground text-lg">
                        Ashwin Prem
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        Creative Designer with AI & Visual Storyteller
                      </p>
                      <p className="font-body text-xs text-muted-foreground/70 mt-0.5 flex items-center gap-1">
                        <MapPin size={10} /> Switzerland & India
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 text-center">
                    {[{ value: "1", label: "Website Developed" }].map(
                      (stat) => (
                        <div key={stat.label}>
                          <p className="font-display text-3xl font-bold text-foreground">
                            {stat.value}
                          </p>
                          <p className="font-body text-xs text-muted-foreground mt-1">
                            {stat.label}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── Core Capabilities ── */}
        <section id="services" className="py-24 bg-background">
          <div className="container mx-auto max-w-6xl px-6">
            <FadeUp className="text-center mb-14">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                What I Do
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Core Capabilities
              </h2>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {CAPABILITIES.map((cap, i) => (
                <FadeUp key={cap.title} delay={i * 0.08}>
                  <div className="bg-card border border-border rounded-2xl p-6 h-full shadow-card hover:shadow-md transition-shadow group">
                    <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center text-foreground mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {cap.icon}
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                      {cap.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Portfolio Showcase ── */}
        <section id="projects" className="py-24 bg-band">
          <div className="container mx-auto max-w-6xl px-6">
            <FadeUp className="text-center mb-14">
              <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Selected Work
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Portfolio Showcase
              </h2>
            </FadeUp>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROJECTS.map((project, i) => (
                <FadeUp key={project.title} delay={i * 0.06}>
                  <div
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
                    data-ocid={`projects.item.${i + 1}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-foreground text-sm mb-1 leading-snug">
                        {project.title}
                      </h3>
                      <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Connect / Contact ── */}
        <section id="contact" className="py-24 bg-background">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Left: headline */}
              <div className="md:col-span-1">
                <FadeUp>
                  <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
                    Let's Talk
                  </p>
                  <h2 className="font-display text-4xl font-bold text-foreground mb-4 leading-tight">
                    Start a New Project Together
                  </h2>
                  <p className="font-body text-muted-foreground leading-relaxed mb-8">
                    Have a project in mind? I'd love to hear about it. Send me a
                    message and let's make something great.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="mailto:ashwinmunni7@gmail.com"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                        <Mail size={15} className="text-foreground" />
                      </div>
                      <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        ashwinmunni7@gmail.com
                      </span>
                    </a>
                    <a
                      href="tel:+918639139641"
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                        <Phone size={15} className="text-foreground" />
                      </div>
                      <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        +91 86391 39641
                      </span>
                    </a>
                  </div>
                  <div className="flex gap-3 mt-6">
                    {[
                      {
                        icon: <Twitter size={16} />,
                        href: "#",
                        label: "Twitter",
                      },
                      {
                        icon: <Instagram size={16} />,
                        href: "#",
                        label: "Instagram",
                      },
                      {
                        icon: <Linkedin size={16} />,
                        href: "#",
                        label: "LinkedIn",
                      },
                      {
                        icon: <Github size={16} />,
                        href: "#",
                        label: "GitHub",
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center text-muted-foreground transition-colors"
                        data-ocid="contact.link"
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </FadeUp>
              </div>

              {/* Center: form */}
              <FadeUp delay={0.1} className="md:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-2xl p-8 shadow-card space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block"
                      >
                        Name
                      </label>
                      <Input
                        id="contact-name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        className="bg-background border-border font-body text-sm"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block"
                      >
                        Email
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                        className="bg-background border-border font-body text-sm"
                        data-ocid="contact.input"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block"
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      required
                      className="bg-background border-border font-body text-sm resize-none"
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-3 bg-accent rounded-xl font-body text-sm text-foreground"
                        data-ocid="contact.success_state"
                      >
                        ✓ Message sent! I'll get back to you soon.
                      </motion.div>
                    ) : (
                      <motion.div key="btn" initial={{ opacity: 1 }}>
                        <Button
                          type="submit"
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body text-sm py-3"
                          data-ocid="contact.submit_button"
                        >
                          Send Message
                          <ArrowRight size={15} className="ml-2" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-band border-t border-border pt-12 pb-6">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-3 gap-8 items-start mb-10">
            {/* Logo */}
            <div>
              <a
                href="#home"
                className="font-display font-bold text-xl tracking-wider text-foreground"
              >
                ASHWIN PREM
              </a>
              <p className="font-body text-sm text-muted-foreground mt-1 leading-relaxed">
                Creative Designer with AI & Visual Storyteller
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
                I Design Brands, Products, And Digital Experiences That
                Resonate. Based In Switzerland And India.
              </p>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-2">
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Navigation
              </p>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                  data-ocid="footer.link"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div>
              <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Connect
              </p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { icon: <Twitter size={16} />, href: "#", label: "Twitter" },
                  {
                    icon: <Instagram size={16} />,
                    href: "#",
                    label: "Instagram",
                  },
                  {
                    icon: <Linkedin size={16} />,
                    href: "#",
                    label: "LinkedIn",
                  },
                  { icon: <Github size={16} />, href: "#", label: "GitHub" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center text-muted-foreground transition-all"
                    data-ocid="footer.link"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-5 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="font-body text-xs text-muted-foreground">
              © {new Date().getFullYear()} Ashwin Prem. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
