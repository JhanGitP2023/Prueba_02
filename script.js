document.addEventListener('DOMContentLoaded', () => {
    // 1. Escribe tu número real aquí: Código de país (57) + número de 10 dígitos.
    // Ejemplo para el número 300 123 4567 -> "573001234567"
    const phoneNumber = "573001234567";     
    // 2. Mensaje predeterminado que enviará el cliente
    const defaultMessage = "¡Hola Flores Medellín! Quisiera información sobre un arreglo floral."; 
    const waBtn = document.getElementById('waBtn');
    const waTooltip = document.getElementById('waTooltip');
    // Construcción de la URL universal compatible con dispositivos móviles y escritorio
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    // Asignar la URL al botón
    waBtn.setAttribute('href', whatsappUrl);
    // Mostrar el mensaje flotante a los 3 segundos
    setTimeout(() => {
        if (waTooltip) waTooltip.classList.add('active');
    }, 3000);
    // Ocultar la burbuja al pasar el mouse por el botón
    waBtn.addEventListener('mouseenter', () => {
        if (waTooltip && waTooltip.classList.contains('active')) {
            waTooltip.classList.remove('active');
        }
    });
});

// Función para cerrar la burbuja con la (X)
function closeTooltip(event) {
    event.preventDefault();
    event.stopPropagation();
    const waTooltip = document.getElementById('waTooltip');
    if (waTooltip) waTooltip.classList.remove('active');
}