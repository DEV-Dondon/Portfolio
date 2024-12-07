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
    link.style.transition = "color 0.3s ease-in-out"; // Efeito suave de transição
  });
  link.addEventListener('mouseleave', () => {
    link.style.color = "#fff"; // Cor normal
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
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY;
  let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  let scrollPercentage = (scrollPosition / documentHeight) * 100;
  progressBar.style.width = scrollPercentage + '%';
});
