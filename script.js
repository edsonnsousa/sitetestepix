// Função para mostrar o toast
function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

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

