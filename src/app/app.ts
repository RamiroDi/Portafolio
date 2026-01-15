import { Component, signal, effect, OnInit, PLATFORM_ID, inject, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  // Signals para el estado de la app
  scrollY = signal(0);
  activeSection = signal('inicio');
  isNavbarScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isDarkMode = signal(true); // Nuevo: tema oscuro por defecto

  // Formulario de contacto
  contactForm = {
    name: '',
    email: '',
    message: ''
  };
  formSubmitted = signal(false);
  formSubmitting = signal(false);

  constructor() {
    // Inicializar IntersectionObserver después de renderizar
    afterNextRender(() => {
      this.initScrollAnimations();
      this.loadThemePreference();
    });
  }

  ngOnInit() {
    // Listener para el scroll
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => this.handleScroll());
    }
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    this.scrollY.set(currentScrollY);
    
    // Cambiar estilo del navbar después de 50px
    this.isNavbarScrolled.set(currentScrollY > 50);
    
    // Detectar sección activa
    this.detectActiveSection();
  }

  detectActiveSection() {
    const sections = ['inicio', 'proyectos', 'habilidades', 'sobre-mi', 'contacto'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      this.isMobileMenuOpen.set(false);
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  isActive(section: string): boolean {
    return this.activeSection() === section;
  }

  // Animaciones de scroll
  initScrollAnimations() {
    if (!isPlatformBrowser(this.platformId)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
  }

  // Tema oscuro/claro
  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    this.applyTheme();
    this.saveThemePreference();
  }

  applyTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    if (this.isDarkMode()) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  loadThemePreference() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    }
    this.applyTheme();
  }

  saveThemePreference() {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  // Formulario de contacto
  async submitContactForm() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.formSubmitting.set(true);

    // Simular envío (aquí conectarías con un backend o servicio de email)
    setTimeout(() => {
      this.formSubmitted.set(true);
      this.formSubmitting.set(false);
      
      // Resetear formulario
      this.contactForm = {
        name: '',
        email: '',
        message: ''
      };

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        this.formSubmitted.set(false);
      }, 5000);
    }, 1500);
  }
}