import { Component, signal, ViewChild, effect, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';

// Interfaces
interface Translation {
  nav: {
    inicio: string;
    proyectos: string;
    habilidades: string;
    sobreMi: string;
    contacto: string;
  };
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    description: string;
    disponible: string;
    verProyectos: string;
    descargarCV: string;
  };
  proyectos: {
    titulo: string;
    subtitulo: string;
    enDesarrollo: string;
    completado: string;
    codigoPrivado: string;
    verCodigo: string;
    verDemo: string;
  };
  habilidades: {
    titulo: string;
    frontend: string;
    backend: string;
    baseDatos: string;
    herramientas: string;
  };
  sobreMi: {
    titulo: string;
    educacion: string;
    ubicacion: string;
    quienSoy: string;
    descripcion1: string;
    descripcion2: string;
  };
  contacto: {
    titulo: string;
    subtitulo: string;
    email: string;
    enviarCorreo: string;
    verPerfil: string;
    conectar: string;
    formulario: {
      titulo: string;
      nombre: string;
      nombrePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      mensaje: string;
      mensajePlaceholder: string;
      enviar: string;
      enviando: string;
      exito: string;
      error: string;
    };
  };
  footer: {
    construido: string;
  };
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  es: {
    nav: {
      inicio: 'Inicio',
      proyectos: 'Proyectos',
      habilidades: 'Habilidades',
      sobreMi: 'Sobre Mí',
      contacto: 'Contacto'
    },
    hero: {
      greeting: 'Hola, soy',
      title: 'Ramiro Di Fraia',
      subtitle: 'Desarrollador Web Full Stack',
      description: 'Estudiante avanzado de Tecnicatura en Programación en UTN Avellaneda. Especializado en desarrollo web con Angular, TypeScript y tecnologías modernas. Apasionado por crear soluciones eficientes y escalables.',
      disponible: 'Disponible para trabajar',
      verProyectos: 'Ver Proyectos',
      descargarCV: 'Descargar CV'
    },
    proyectos: {
      titulo: 'Mis Proyectos',
      subtitulo: 'Algunos de los proyectos en los que he trabajado',
      enDesarrollo: 'En desarrollo',
      completado: 'Completado',
      codigoPrivado: 'Código Privado',
      verCodigo: 'Ver Código',
      verDemo: 'Ver Demo'
    },
    habilidades: {
      titulo: 'Habilidades Técnicas',
      frontend: 'Frontend',
      backend: 'Backend',
      baseDatos: 'Bases de Datos',
      herramientas: 'Herramientas'
    },
    sobreMi: {
      titulo: 'Sobre Mí',
      educacion: 'Tecnicatura en Programación',
      ubicacion: 'UTN Avellaneda, Buenos Aires',
      quienSoy: '¿Quién soy?',
      descripcion1: 'Soy un desarrollador apasionado por la tecnología y el aprendizaje continuo. Me especializo en crear aplicaciones web modernas y funcionales, siempre buscando las mejores prácticas y soluciones eficientes.',
      descripcion2: 'Utilizo herramientas modernas como IA para optimizar mi flujo de trabajo, sin perder de vista la importancia de entender profundamente el código que escribo. Estoy constantemente explorando nuevas tecnologías y metodologías para mejorar mis habilidades.'
    },
    contacto: {
      titulo: 'Conectemos',
      subtitulo: 'Estoy disponible para nuevas oportunidades. ¡Hablemos!',
      email: 'Email',
      enviarCorreo: 'Enviar correo',
      verPerfil: 'Ver perfil',
      conectar: 'Conectar',
      formulario: {
        titulo: 'O envíame un mensaje directo',
        nombre: 'Nombre',
        nombrePlaceholder: 'Tu nombre',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        mensaje: 'Mensaje',
        mensajePlaceholder: 'Escribe tu mensaje aquí...',
        enviar: 'Enviar Mensaje',
        enviando: 'Enviando...',
        exito: '¡Mensaje enviado con éxito! Te responderé pronto.',
        error: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'
      }
    },
    footer: {
      construido: 'Este portafolio fue construido con'
    }
  },
  en: {
    nav: {
      inicio: 'Home',
      proyectos: 'Projects',
      habilidades: 'Skills',
      sobreMi: 'About Me',
      contacto: 'Contact'
    },
    hero: {
      greeting: "Hi, I'm",
      title: 'Ramiro Di Fraia',
      subtitle: 'Full Stack Web Developer',
      description: 'Advanced student of Programming Technology at UTN Avellaneda. Specialized in web development with Angular, TypeScript and modern technologies. Passionate about creating efficient and scalable solutions.',
      disponible: 'Available for work',
      verProyectos: 'View Projects',
      descargarCV: 'Download CV'
    },
    proyectos: {
      titulo: 'My Projects',
      subtitulo: 'Some of the projects I have worked on',
      enDesarrollo: 'In development',
      completado: 'Completed',
      codigoPrivado: 'Private Code',
      verCodigo: 'View Code',
      verDemo: 'View Demo'
    },
    habilidades: {
      titulo: 'Technical Skills',
      frontend: 'Frontend',
      backend: 'Backend',
      baseDatos: 'Databases',
      herramientas: 'Tools'
    },
    sobreMi: {
      titulo: 'About Me',
      educacion: 'Programming Technology Degree',
      ubicacion: 'UTN Avellaneda, Buenos Aires',
      quienSoy: 'Who am I?',
      descripcion1: "I'm a developer passionate about technology and continuous learning. I specialize in creating modern and functional web applications, always looking for best practices and efficient solutions.",
      descripcion2: 'I use modern tools like AI to optimize my workflow, without losing sight of the importance of deeply understanding the code I write. I am constantly exploring new technologies and methodologies to improve my skills.'
    },
    contacto: {
      titulo: "Let's Connect",
      subtitulo: "I'm available for new opportunities. Let's talk!",
      email: 'Email',
      enviarCorreo: 'Send email',
      verPerfil: 'View profile',
      conectar: 'Connect',
      formulario: {
        titulo: 'Or send me a direct message',
        nombre: 'Name',
        nombrePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        mensaje: 'Message',
        mensajePlaceholder: 'Write your message here...',
        enviar: 'Send Message',
        enviando: 'Sending...',
        exito: 'Message sent successfully! I will respond soon.',
        error: 'There was an error sending the message. Please try again.'
      }
    },
    footer: {
      construido: 'This portfolio was built with'
    }
  }
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Signals para estado
  currentLang = signal<'es' | 'en'>('es');
  isDarkMode = signal(true);
  activeSection = signal('inicio');
  isMobileMenuOpen = signal(false);
  
  // Signals para el formulario
  formSubmitting = signal(false);
  formSubmitted = signal(false);
  formError = signal(false);
  
  // ViewChild para el formulario
  @ViewChild('contactFormRef') contactFormRef?: NgForm;

  // Datos del formulario
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  // Traducciones computadas
  t = signal<Translation>(translations['es']);

  constructor() {
    // Inicializar EmailJS
    emailjs.init('aPBNob_2cmXxQmQpe');

    // Cargar preferencias guardadas
    const savedLang = localStorage.getItem('preferredLang') as 'es' | 'en' | null;
    const savedTheme = localStorage.getItem('preferredTheme');
    
    if (savedLang) {
      this.currentLang.set(savedLang);
      this.t.set(translations[savedLang]);
    }
    
    if (savedTheme === 'light') {
      this.isDarkMode.set(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }

    // Efecto para actualizar traducciones cuando cambia el idioma
    effect(() => {
      this.t.set(translations[this.currentLang()]);
    });
  }

  ngOnInit() {
    this.setupScrollAnimations();
  }

  // Toggle idioma
  toggleLanguage() {
    const newLang = this.currentLang() === 'es' ? 'en' : 'es';
    this.currentLang.set(newLang);
    localStorage.setItem('preferredLang', newLang);
  }

  // Toggle tema
  toggleTheme() {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('preferredTheme', newTheme ? 'dark' : 'light');
  }

  // Toggle mobile menu
  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  // Scroll a sección
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      this.activeSection.set(sectionId);
      this.isMobileMenuOpen.set(false);
    }
  }

  // Check si sección está activa
  isActive(section: string): boolean {
    return this.activeSection() === section;
  }

  // Listener para scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['inicio', 'proyectos', 'habilidades', 'sobre-mi', 'contacto'];
    const scrollPosition = window.pageYOffset + 100;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection.set(sectionId);
          break;
        }
      }
    }
  }

  // Check si navbar tiene scroll
  isNavbarScrolled(): boolean {
    return window.pageYOffset > 50;
  }

  // Descargar CV
  downloadCV() {
    const cvUrl = this.currentLang() === 'es' 
      ? 'assets/cv/CV-Ramiro-Di-Fraia-ES.pdf'
      : 'assets/cv/CV-Ramiro-Di-Fraia-EN.pdf';
    
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = `CV-Ramiro-Di-Fraia-${this.currentLang().toUpperCase()}.pdf`;
    link.click();
  }

  // Enviar formulario de contacto
  async submitContactForm() {
    if (!this.contactFormRef?.valid) {
      return;
    }

    this.formSubmitting.set(true);
    this.formError.set(false);
    this.formSubmitted.set(false);

    try {
      const response = await emailjs.send(
        'service_var1028',
        'template_ayba3xd',
        {
          from_name: this.contactForm.name,
          from_email: this.contactForm.email,
          message: this.contactForm.message,
        },
        'aPBNob_2cmXxQmQpe'
      );

      console.log('Email enviado con éxito:', response);
      
      this.formSubmitted.set(true);
      this.contactForm = { name: '', email: '', message: '' };
      this.contactFormRef?.reset();

      setTimeout(() => {
        this.formSubmitted.set(false);
      }, 5000);

    } catch (error) {
      console.error('Error al enviar email:', error);
      this.formError.set(true);
      
      setTimeout(() => {
        this.formError.set(false);
      }, 5000);
    } finally {
      this.formSubmitting.set(false);
    }
  }

  // Configurar animaciones de scroll
  private setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observar todos los elementos con la clase animate-on-scroll
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }, 100);
  }
}