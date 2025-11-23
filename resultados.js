// --- NOVO CÓDIGO resultados.js ---

const counters = document.querySelectorAll('.contador');
const speed = 150;
let animationTriggered = false; // Flag para garantir que a animação só rode uma vez

// Função que contém a lógica da animação de contagem
const animateCounter = (counter) => {
    const animate = () => {
        const value = +counter.getAttribute('data-target');
        // Lê o valor atual, removendo qualquer caractere não-numérico
        const currentText = counter.innerText.replace(/[^\d]/g, '');
        const current = +currentText;
        const increment = value / speed;

        if (current < value) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(animate, 10);
        } else {
            // Define o valor final e aplica a formatação correta
            if (value === 95) {
                counter.innerText = '95%';
            } else {
                counter.innerText = '+' + value;
            }
        }
    };
    animate();
};

// Configurações do Intersection Observer
const observerOptions = {
    root: null, // O viewport (janela do navegador)
    rootMargin: '0px',
    threshold: 0.8 // Aciona quando 80% do elemento estiver visível
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Verifica se o elemento está visível
        if (entry.isIntersecting) {
            // Se estiver visível, inicia a animação para todos os contadores
            if (!animationTriggered) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                animationTriggered = true;
            }
            // Para de observar depois de acionar
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Inicia a observação da seção de resultados
const resultadosSection = document.querySelector('.resultados');

if (resultadosSection) {
    observer.observe(resultadosSection);
}