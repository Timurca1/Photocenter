// Простая валидация формы
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && phone && email && message) {
                alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
                this.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля.');
            }
        });
    }
    
    // Подсветка активного пункта меню
    const currentPage = location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('nav a');
    
    menuItems.forEach(item => {
        const itemPage = item.getAttribute('href');
        if (currentPage === itemPage || (currentPage === '' && itemPage === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Фильтрация галереи
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Удаляем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс к текущей кнопке
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // FAQ аккордеон
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Закрываем все открытые вопросы
                faqItems.forEach(faq => {
                    if (faq !== item) {
                        faq.classList.remove('active');
                    }
                });
                
                // Переключаем текущий вопрос
                item.classList.toggle('active');
            });
        });
    }
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Если это внутренняя ссылка на странице
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } 
            // Если это ссылка на другую страницу с якорем
            else if (targetId.includes('#')) {
                const [page, anchor] = targetId.split('#');
                if (currentPage === page || (currentPage === '' && page === 'index.html')) {
                    const targetElement = document.querySelector('#' + anchor);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    window.location.href = targetId;
                }
            }
        });
    });
    
    // Инициализация карты (заглушка, в реальном проекте нужно подключить API карт)
    if (document.querySelector('.map')) {
        console.log('Карта инициализирована');
        // Здесь будет код инициализации карты, например:
        // ymaps.ready(initMap);
    }
    
    // Таймер обратного отсчета для акций (пример)
    const promoEndDate = new Date();
    promoEndDate.setDate(promoEndDate.getDate() + 3); // Акция действует 3 дня
    
    function updatePromoTimer() {
        const now = new Date();
        const timeLeft = promoEndDate - now;
        
        if (timeLeft <= 0) {
            document.getElementById('promo-timer').innerHTML = 'Акция завершена';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        document.getElementById('promo-timer').innerHTML = 
            `${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }
    
    // Если на странице есть таймер акции
    if (document.getElementById('promo-timer')) {
        setInterval(updatePromoTimer, 1000);
        updatePromoTimer();
    }
    
    // Обработка форм заказа
    const orderForms = document.querySelectorAll('form[data-order]');
    orderForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const service = this.getAttribute('data-service') || 'Услуга не указана';
            const formData = new FormData(this);
            const name = formData.get('name') || 'Не указано';
            const phone = formData.get('phone') || 'Не указан';
            
            // В реальном проекте здесь будет отправка данных на сервер
            alert(`Спасибо, ${name}! Ваша заявка на "${service}" принята. Мы свяжемся с вами по номеру ${phone} в ближайшее время.`);
            this.reset();
        });
    });
    
    // Модальное окно для изображений галереи
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const imageUrl = this.style.backgroundImage
                .replace('url("', '')
                .replace('")', '');
            
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            const modalImage = document.createElement('div');
            modalImage.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                background-image: url(${imageUrl});
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                width: 100%;
                height: 100%;
            `;
            
            modal.appendChild(modalImage);
            document.body.appendChild(modal);
            
            // Закрытие модального окна
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
    
    // Анимация появления элементов при скролле
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .team-member, .gallery-item');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация анимации
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Проверить при загрузке
    
    // Обработка телефонного номера для кликабельных ссылок
    const phoneElements = document.querySelectorAll('.phone-number');
    phoneElements.forEach(element => {
        const phoneText = element.textContent;
        const phoneLink = phoneText.replace(/\D/g, ''); // Оставляем только цифры
        
        if (phoneLink.length >= 10) {
            element.innerHTML = `<a href="tel:${phoneLink}">${phoneText}</a>`;
        }
    });
});