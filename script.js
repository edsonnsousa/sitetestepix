// Função para copiar a chave Pix
async function copyPixKey() {
    const pixKeyInput = document.getElementById("pixKey");
    const copyBtn = document.getElementById("copyBtn");
    const toast = document.getElementById("toast");
    
    try {
        // Seleciona o texto
        pixKeyInput.select();
        pixKeyInput.setSelectionRange(0, 99999); // Para dispositivos móveis
        
        // Tenta usar a API moderna do clipboard
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(pixKeyInput.value);
        } else {
            // Fallback para navegadores mais antigos
            document.execCommand("copy");
        }
        
        // Feedback visual no botão
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML = "<i class=\"fas fa-check\"></i> Copiado!";
        copyBtn.classList.add("copied");
        
        // Mostra o toast
        showToast();
        
        // Restaura o botão após 2 segundos
        setTimeout(() => {
            copyBtn.innerHTML = originalContent;
            copyBtn.classList.remove("copied");
        }, 2000);
        
    } catch (err) {
        console.error("Erro ao copiar:", err);
        
        // Feedback de erro
        const originalContent = copyBtn.innerHTML;
        copyBtn.innerHTML = "<i class=\"fas fa-exclamation-triangle\"></i> Erro";
        copyBtn.style.background = "linear-gradient(135deg, #dc3545 0%, #c82333 100%)";
        
        setTimeout(() => {
            copyBtn.innerHTML = originalContent;
            copyBtn.style.background = "";
        }, 2000);
    }
}

// Função para mostrar o toast
function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Adiciona evento de clique no campo de texto para seleção automática
document.getElementById("pixKey").addEventListener("click", function() {
    this.select();
    this.setSelectionRange(0, 99999);
});

// Adiciona suporte para tecla Enter no campo de texto
document.getElementById("pixKey").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        copyPixKey();
    }
});

// Adiciona suporte para atalho de teclado Ctrl+C
document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "c") {
        const pixKeyInput = document.getElementById("pixKey");
        if (document.activeElement === pixKeyInput) {
            copyPixKey();
            event.preventDefault();
        }
    }
});

// Animação de entrada quando a página carrega
document.addEventListener("DOMContentLoaded", function() {
    const card = document.querySelector(".card");
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    
    setTimeout(() => {
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 100);
});

// Função para detectar se é dispositivo móvel
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajusta o comportamento para dispositivos móveis
if (isMobileDevice()) {
    // Remove hover effects em dispositivos móveis
    document.body.classList.add("mobile-device");
    
    // Adiciona estilo específico para mobile
    const style = document.createElement("style");
    style.textContent = `
        .mobile-device .card:hover {
            transform: none;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .mobile-device .copy-btn:hover {
            transform: none;
            box-shadow: none;
        }
    `;
    document.head.appendChild(style);
}

