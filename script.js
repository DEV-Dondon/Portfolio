// ==================== AGUARDA O DOM CARREGAR ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== NAVEGAÇÃO SUAVE ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== FORMULÁRIO DE CONTATO ====================
    const form = document.getElementById('contactForm');
    const cepInput = document.getElementById('cep');
    const buscarCepBtn = document.getElementById('buscarCep');
    const enderecoInfo = document.getElementById('endereco-info');

    if (form) {
        // ==================== VIA CEP API ====================
        async function buscarEndereco(cep) {
            // Remove caracteres não numéricos
            cep = cep.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                mostrarNotificacao('Erro', 'CEP inválido! Digite 8 números.', 'error');
                return;
            }

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    mostrarNotificacao('Erro', 'CEP não encontrado!', 'error');
                    return;
                }

                // Preenche os campos
                document.getElementById('logradouro').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';

                // Mostra a área de endereço
                enderecoInfo.classList.add('active');
                
                mostrarNotificacao('Sucesso', 'Endereço encontrado com sucesso!', 'success');
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
                mostrarNotificacao('Erro', 'Erro ao buscar o CEP. Tente novamente.', 'error');
            }
        }

        // Evento do botão Buscar CEP
        if (buscarCepBtn) {
            buscarCepBtn.addEventListener('click', function() {
                buscarEndereco(cepInput.value);
            });
        }

        // Buscar CEP ao pressionar Enter no campo
        if (cepInput) {
            cepInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    buscarEndereco(cepInput.value);
                }
            });

            // Máscara para o CEP
            cepInput.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                if (value.length > 8) {
                    value = value.slice(0, 8);
                }
                if (value.length > 5) {
                    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
                }
                this.value = value;
            });
        }

        // ==================== ENVIO DO FORMULÁRIO ====================
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validação simples
            if (!name || !email || !message) {
                mostrarNotificacao('Atenção', 'Por favor, preencha todos os campos obrigatórios!', 'error');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                mostrarNotificacao('Atenção', 'Por favor, digite um e-mail válido!', 'error');
                return;
            }

            // Simula envio com mensagem de agradecimento
            mostrarNotificacao('Mensagem Enviada!', 
                `Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`,
                'success'
            );

            // Limpa o formulário
            form.reset();
            if (enderecoInfo) {
                enderecoInfo.classList.remove('active');
            }
        });
    }

    // ==================== SISTEMA DE NOTIFICAÇÃO (TOAST) ====================
    function mostrarNotificacao(titulo, mensagem, tipo = 'info') {
        // Remove notificações anteriores
        const notificacaoExistente = document.querySelector('.toast-notification');
        if (notificacaoExistente) {
            notificacaoExistente.remove();
        }

        // Cria a notificação
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        
        const cores = {
            info: '#0066CC',
            success: '#28a745',
            error: '#dc3545'
        };

        toast.style.borderLeftColor = cores[tipo] || cores.info;
        toast.innerHTML = `
            <h4>${titulo}</h4>
            <p>${mensagem}</p>
        `;

        document.body.appendChild(toast);

        // Mostra a notificação
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Remove após 5 segundos
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 5000);

        // Fecha ao clicar
        toast.addEventListener('click', function() {
            this.classList.remove('show');
            setTimeout(() => {
                this.remove();
            }, 500);
        });
    }

    // ==================== BOTÃO VOLTAR AO TOPO ====================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerText = "⬆ Voltar ao topo";
    backToTopButton.classList.add('back-to-top');
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.padding = '12px 24px';
    backToTopButton.style.fontSize = '14px';
    backToTopButton.style.backgroundColor = '#0066CC';
    backToTopButton.style.color = '#fff';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50px';
    backToTopButton.style.boxShadow = '0 4px 15px rgba(0, 102, 204, 0.3)';
    backToTopButton.style.display = 'none';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.transition = 'all 0.3s ease-in-out';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.style.fontWeight = '600';
    backToTopButton.style.letterSpacing = '0.5px';

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    document.body.appendChild(backToTopButton);

    // Exibe o botão quando rolar a página
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });

    // Hover do botão
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#FFD700';
        this.style.color = '#1D1F28';
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.4)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#0066CC';
        this.style.color = '#fff';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 102, 204, 0.3)';
    });

    // ==================== BARRA DE PROGRESSO DE ROLAGEM ====================
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = '#FFD700';
    progressBar.style.zIndex = '9999';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.2s ease-in-out';
    progressBar.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;
        let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        let scrollPercentage = (scrollPosition / documentHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });

    // ==================== NAVBAR HIDE/SHOW AO ROLAR ====================
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar-custom');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.scrollY;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.transition = 'transform 0.3s ease-in-out';
            } else {
                navbar.style.transform = 'translateY(0)';
                navbar.style.transition = 'transform 0.3s ease-in-out';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // ==================== EFECTO HOVER NOS LINKS DO MENU ====================
    const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#FFD700';
            this.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
            this.style.transition = 'all 0.3s ease-in-out';
        });
        link.addEventListener('mouseleave', function() {
            this.style.color = '#e0e0e0';
            this.style.textShadow = 'none';
        });
    });

    // ==================== ANIMAÇÃO DOS CARDS AO SCROLL ====================
    function animarCards() {
        const cards = document.querySelectorAll('.project-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }

    // Executa a animação dos cards
    animarCards();

    // ==================== MASCARAS DE INPUT ====================
    // Máscara para telefone (opcional)
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d)/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d)/, '($1) $2');
            }
            this.value = value;
        });
    }

    // ==================== VALIDAÇÃO DE EMAIL EM TEMPO REAL ====================
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && (!email.includes('@') || !email.includes('.'))) {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            } else if (email) {
                this.style.borderColor = '#28a745';
                this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
            } else {
                this.style.borderColor = '#e0e0e0';
                this.style.boxShadow = 'none';
            }
        });

        emailInput.addEventListener('focus', function() {
            this.style.borderColor = '#0066CC';
            this.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
        });
    }

    console.log('✅ Landing Page carregada com sucesso!');
    console.log('🚀 Funcionalidades ativas:');
    console.log('  - Navegação suave');
    console.log('  - Formulário com ViaCEP');
    console.log('  - Notificações toast');
    console.log('  - Botão voltar ao topo');
    console.log('  - Barra de progresso');
    console.log('  - Navbar dinâmica');
    console.log('  - Animações de cards');
});