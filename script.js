// Função para navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Efeito de hover para links de navegação
const navLinks = document.querySelectorAll('.menu a');
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.color = "#FFD700"; // Cor de hover
    link.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)'; // Sombra suave
    link.style.transition = "color 0.3s ease-in-out, text-shadow 0.3s ease-in-out"; // Efeito suave de transição
  });
  link.addEventListener('mouseleave', () => {
    link.style.color = "#fff"; // Cor normal
    link.style.textShadow = 'none'; // Remove a sombra
  });
});

// Função para scroll para o topo
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Adiciona um botão de "Voltar ao topo" quando rolar a página para baixo
const backToTopButton = document.createElement('button');
backToTopButton.innerText = "Voltar ao topo";
backToTopButton.classList.add('back-to-top');
backToTopButton.style.position = 'fixed';
backToTopButton.style.bottom = '20px';
backToTopButton.style.right = '20px';
backToTopButton.style.padding = '10px 20px';
backToTopButton.style.fontSize = '16px';
backToTopButton.style.backgroundColor = '#FFD700';
backToTopButton.style.color = '#1D1F28';
backToTopButton.style.border = 'none';
backToTopButton.style.borderRadius = '50px';
backToTopButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
backToTopButton.style.display = 'none'; // Inicialmente invisível
backToTopButton.style.cursor = 'pointer';
backToTopButton.style.transition = 'background-color 0.3s ease-in-out';

backToTopButton.addEventListener('click', scrollToTop);
document.body.appendChild(backToTopButton);

// Exibe o botão de "Voltar ao topo" quando rolar a página
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

// Efeito de hover no botão de "Voltar ao topo"
backToTopButton.addEventListener('mouseenter', () => {
  backToTopButton.style.backgroundColor = '#ffcc00'; // Cor ao passar o mouse
});
backToTopButton.addEventListener('mouseleave', () => {
  backToTopButton.style.backgroundColor = '#FFD700'; // Cor original
});

// Adicionando barra de progresso de rolagem
const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.height = '5px';
progressBar.style.backgroundColor = '#FFD700';
progressBar.style.zIndex = '9999';
progressBar.style.width = '0%';
progressBar.style.transition = 'width 0.3s ease-in-out'; // Adiciona uma transição suave
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY;
  let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  let scrollPercentage = (scrollPosition / documentHeight) * 100;
  progressBar.style.width = scrollPercentage + '%';
});

// Efeito de slide para a barra de navegação (ocultar ao rolar para baixo, mostrar ao rolar para cima)
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar'); // Seletor da sua barra de navegação
window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY;
  if (scrollTop > lastScrollTop) {
    navbar.style.transform = 'translateY(-100%)'; // Esconde a barra ao rolar para baixo
  } else {
    navbar.style.transform = 'translateY(0)'; // Exibe a barra ao rolar para cima
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Impede que o valor seja negativo
});
