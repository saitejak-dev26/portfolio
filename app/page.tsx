import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects, { type ProjectView } from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { projects } from '@/data/site';
import { tag } from '@/lib/icons';

export default function Home() {
  // Resolve brand icons at build time so the client bundle stays small.
  const projectViews: ProjectView[] = projects.map((p) => ({ ...p, tags: p.stack.map(tag) }));

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Skills />
        <Projects projects={projectViews} />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
