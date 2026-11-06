import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, PawPrint, Stethoscope, Scissors, House, ShoppingBasket, Menu, X, ArrowRight, CheckCircle2, MapPin, Clock3, Phone, Instagram, Facebook, MessageCircle, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import './styles.css';

// CONFIGURACIÓN: reemplazar con los datos reales antes de publicar.
const CONFIG = {
  whatsapp: '', // Ejemplo: '525512345678' (sin + ni espacios)
  instagram: '',
  facebook: '',
  address: 'Ciudad de México · Ubicación por confirmar',
  hours: 'Horario por confirmar',
};
const services = [
  { icon: House, title: 'Pensión y guardería', detail: 'Un espacio pensado para acompañar, cuidar y consentir a tu mejor amigo.', tag: 'Cuidado y compañía' },
  { icon: Scissors, title: 'Grooming', detail: 'Baño, estética y cuidados para perros y gatos, con atención personalizada.', tag: 'Belleza y bienestar' },
  { icon: Stethoscope, title: 'Veterinaria', detail: 'Atención y orientación profesional para cuidar su salud en cada etapa.', tag: 'Salud y prevención' },
  { icon: ShoppingBasket, title: 'Tienda de mascotas', detail: 'Productos y accesorios seleccionados para la vida diaria de tu mascota.', tag: 'Todo en un lugar' },
];
const faqs = [
  ['¿Cómo puedo solicitar información o reservar?', 'Puedes escribirnos por WhatsApp mediante los botones de contacto. Confirmaremos disponibilidad, horarios y condiciones de cada servicio.'],
  ['¿Atienden perros y gatos?', 'Nuestra propuesta incluye servicios para perros y gatos. La disponibilidad específica se confirmará al abrir cada área.'],
  ['¿Dónde se encuentran?', 'El proyecto está pensado para Ciudad de México. Publicaremos la dirección exacta y los horarios cuando estén confirmados.'],
];
function whatsappLink(message) {
  if (!CONFIG.whatsapp) return '#contacto';
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}
function Logo({ light = false }) {
  return <a className={`logo ${light ? 'logo-light' : ''}`} href="#inicio" aria-label="Klupho Pet Vet, ir al inicio"><span className="logo-symbol"><Heart size={31} strokeWidth={2.8}/><PawPrint className="logo-paw" size={15}/></span><span className="logo-words"><strong>Klupho</strong><small>Pet Vet</small></span></a>;
}

const MEDIA = 'https://raw.githubusercontent.com/Julibe/Guau/master/public';
function MotionHero({ id, label, title, text, dog, tone = 'cream', children, next }) {
  const section = useRef(null);
  const video = useRef(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update(); preference.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) entry.target.classList.add('has-entered');
    }, { threshold: 0.15 });
    observer.observe(section.current);
    return () => { observer.disconnect(); preference.removeEventListener('change', update); };
  }, []);
  useEffect(() => {
    if (!video.current) return;
    if (visible && !paused && !reduced) video.current.play().catch(() => {});
    else video.current.pause();
  }, [visible, paused, reduced]);
  return <section id={id} ref={section} className={`motion-hero motion-${tone}`}>
    <div className="motion-paws" aria-hidden="true"><PawPrint/><PawPrint/><PawPrint/></div>
    <div className="motion-media" aria-hidden="true">
      <img className="motion-poster" src={`${MEDIA}/images/dogs/${dog}.webp`} alt="" loading={id === 'inicio' ? 'eager' : 'lazy'}/>
      {!failed && <video ref={video} src={visible && !reduced ? `${MEDIA}/video/dogs/${dog}.mp4` : undefined} muted loop playsInline preload="none" onError={() => setFailed(true)}/>}
    </div>
    <div className="container motion-layout"><div className="motion-copy"><span className="overline">{label}</span><h1>{title}</h1><p className="motion-description">{text}</p>{children}</div></div>
    <div className="motion-bottom"><span>KLUPHO PET VET · CIUDAD DE MÉXICO</span><div>{!reduced && !failed && <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Reanudar' : 'Pausar'} animación</button>}{next && <a href={`#${next}`}>Sigue explorando <ChevronDown size={18}/></a>}</div></div>
  </section>;
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const closeMenu = () => setMenuOpen(false);
  const serviceHeroes = [
    {id:'guarderia',label:'01 / PENSIÓN Y GUARDERÍA', title:<>Su segundo <em>hogar.</em></>, text:services[0].detail, dog:'kelpie',tone:'cream'},
    {id:'grooming',label:'02 / GROOMING CANINO Y FELINO',title:<>Cuidado que <em>se siente.</em></>,text:services[1].detail,dog:'wet_corgi',tone:'rose'},
    {id:'veterinaria',label:'03 / SALUD Y PREVENCIÓN',title:<>Su bienestar, <em>primero.</em></>,text:services[2].detail,dog:'lupe',tone:'yellow'},
    {id:'tienda',label:'04 / TIENDA DE MASCOTAS',title:<>Pequeños detalles. <em>Grandes alegrías.</em></>,text:services[3].detail,dog:'pomeranian',tone:'cream'}
  ];
  return <>
    <header className="site-header"><div className="container nav"><Logo/><nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navegación principal">{[['inicio','Inicio'],['servicios','Servicios'],['nosotros','Nosotros'],['preguntas','Preguntas'],['contacto','Contacto']].map(([id,title])=><a key={id} onClick={closeMenu} href={`#${id}`}>{title}</a>)}<a className="button button-small" href={whatsappLink('Hola, quiero información sobre Klupho Pet Vet.')} onClick={closeMenu}><MessageCircle size={17}/> Escríbenos</a></nav><button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button></div></header>
    <main>
      <MotionHero id="inicio" label="BIENVENIDOS A KLUPHO PET VET" title={<>Su felicidad es <em>nuestro corazón.</em></>} text="Un lugar para consentir, cuidar y acompañar a quienes llenan tu vida de amor." dog="border_collieup" tone="cream" next="servicios"><div className="hero-actions"><a className="button" href={whatsappLink('Hola, quiero conocer Klupho Pet Vet.')}><MessageCircle size={18}/> Quiero información</a><a className="button button-outline" href="#servicios">Explorar servicios <ArrowRight size={18}/></a></div><div className="motion-brand"><img src="/klupho-logo-original.png" alt="Logo original de Klupho Pet Vet"/><span>Amor, salud y bienestar.<br/>Todo en un mismo lugar.</span></div></MotionHero>
      <div id="servicios" className="service-ribbon" aria-label="Nuestros servicios">{serviceHeroes.map((hero,i)=><a key={hero.id} href={`#${hero.id}`}><span>0{i+1}</span>{services[i].title}<ArrowRight size={17}/></a>)}</div>
      {serviceHeroes.map((hero,i)=><MotionHero key={hero.id} {...hero} next={serviceHeroes[i+1]?.id || 'nosotros'}><div className="motion-tag"><PawPrint size={20}/>{services[i].tag}</div><a className="button" href={whatsappLink(`Hola, quiero información sobre ${services[i].title}.`)}>Consultar servicio <ArrowRight size={18}/></a></MotionHero>)}
      <MotionHero id="nosotros" label="NUESTRA ESENCIA" title={<>Son parte <em>de la familia.</em></>} text="En Klupho Pet Vet creemos que cada compañero merece atención cercana, trato respetuoso y momentos felices." dog="bernese_mountain" tone="rose" next="preguntas"><div className="motion-values">{['Trato cálido y personalizado','Bienestar en cada servicio','Una comunidad que ama a los animales'].map(value=><span key={value}><CheckCircle2 size={19}/>{value}</span>)}</div></MotionHero>
      <MotionHero id="preguntas" label="RESOLVEMOS TUS DUDAS" title={<>Conócenos <em>un poco más.</em></>} text="Todo empieza con confianza. Aquí respondemos tus primeras preguntas." dog="french_bulldog" tone="cream" next="contacto"><div className="faq-items">{faqs.map(([q,a],i)=><div className="faq-item" key={q}><button aria-expanded={openFaq===i} aria-controls={`faq-${i}`} onClick={()=>setOpenFaq(openFaq===i ? -1 : i)}>{q}<ChevronDown size={19} className={openFaq===i ? 'rotated' : ''}/></button><div id={`faq-${i}`} hidden={openFaq!==i}><p>{a}</p></div></div>)}</div></MotionHero>
      <MotionHero id="contacto" label="ESTAMOS PARA AYUDARTE" title={<>Hablemos de tu <em>mejor amigo.</em></>} text="Cuéntanos qué necesita tu compañero y te orientaremos." dog="akita" tone="yellow"><div className="motion-values"><span><MapPin size={19}/>{CONFIG.address}</span><span><Clock3 size={19}/>{CONFIG.hours}</span><span><Phone size={19}/>{CONFIG.whatsapp ? `+${CONFIG.whatsapp}` : 'WhatsApp pendiente de configurar'}</span></div>{CONFIG.whatsapp ? <a className="button" href={whatsappLink('Hola, quisiera conocer más sobre Klupho Pet Vet.')}><MessageCircle size={18}/> Escríbenos por WhatsApp</a> : <p className="contact-pending">Pronto compartiremos nuestros datos de contacto.</p>}</MotionHero>
    </main>
    <footer className="footer"><div className="container footer-top"><div><Logo light/><p>Amor, salud y bienestar para quienes más quieres.</p></div><div><strong>Explora</strong><a href="#servicios">Servicios</a><a href="#nosotros">Nuestra esencia</a><a href="#preguntas">Preguntas frecuentes</a></div><div><strong>Conecta</strong><span>Ciudad de México</span><div className="socials">{CONFIG.instagram && <a href={CONFIG.instagram} aria-label="Instagram"><Instagram/></a>}{CONFIG.facebook && <a href={CONFIG.facebook} aria-label="Facebook"><Facebook/></a>}</div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Klupho Pet Vet. Todos los derechos reservados.</span><span>Hecho con <Heart size={13} fill="currentColor"/> para ellos</span></div></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
