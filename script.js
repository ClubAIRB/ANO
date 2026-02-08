// script.js - Основные скрипты сайта
// Обновленный код для работы с подменю на мобильных устройствах
function initMobileDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = this.parentElement;
                const isActive = parent.classList.contains('active');
                
                // Закрываем все открытые dropdown
                document.querySelectorAll('.dropdown.active').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                        item.querySelector('a').classList.remove('active');
                    }
                });
                
                // Переключаем текущий dropdown
                parent.classList.toggle('active');
                this.classList.toggle('active');
            }
        });
    });
    
    // Закрытие подменю при клике вне его
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const isClickInsideDropdown = e.target.closest('.dropdown');
            if (!isClickInsideDropdown) {
                document.querySelectorAll('.dropdown.active').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('a').classList.remove('active');
                });
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Анимация иконки гамбургера
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
    
    // Обработка выпадающих меню на мобильных устройствах
    if (window.innerWidth <= 992) {
        const dropdowns = document.querySelectorAll('.dropdown > a');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    parent.classList.toggle('active');
                }
            });
        });
    }
    
    // Виджет для слабовидящих (имитация подключения внешнего сервиса)
    const accessibilityBtn = document.getElementById('accessibilityBtn');
    if (accessibilityBtn) {
        accessibilityBtn.addEventListener('click', function() {
            alert('Версия для слабовидящих подключается...\n\nДля реального сайта необходимо подключить специализированный сервис, например:\n- "Сайт для слабовидящих" от WebCanape\n- "Версия для слабовидящих" от IdealTech\n- Другие сервисы, соответствующие ГОСТ Р 52872-2019');
            
            // В реальном сайте здесь будет код подключения внешнего виджета
            // Например: 
            // const script = document.createElement('script');
            // script.src = 'https://виджет-для-слабовидящих.рф/widget.js';
            // document.body.appendChild(script);
        });
    }
    
    // Динамическая загрузка документов из JSON
    function loadDocumentsFromJSON() {
        // Проверяем, находимся ли мы на странице документов
        if (window.location.pathname.includes('documents.html')) {
            fetch('data/documents.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Файл documents.json не найден');
                    }
                    return response.json();
                })
                .then(data => {
                    renderDocuments(data);
                })
                .catch(error => {
                    console.error('Ошибка загрузки документов:', error);
                    // В случае ошибки показываем статический список
                    renderStaticDocuments();
                });
        }
    }
    
    function renderDocuments(documents) {
        const container = document.getElementById('documentsContainer');
        if (!container) return;
        
        let html = '';
        
        documents.forEach(doc => {
            html += `
            <div class="document-item">
                <i class="fas fa-file-pdf pdf-icon"></i>
                <div class="document-info">
                    <h3>${doc.name}</h3>
                    <p>${doc.description}</p>
                    <div class="document-meta">
                        <span class="doc-date">Дата: ${doc.date}</span>
                        <span class="doc-size">Размер: ${doc.size}</span>
                    </div>
                    <a href="documents/${doc.filename}" class="doc-link" target="_blank">
                        <i class="fas fa-download"></i> Скачать PDF
                    </a>
                </div>
            </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    function renderStaticDocuments() {
        const container = document.getElementById('documentsContainer');
        if (!container) return;
        
        container.innerHTML = `
            <div class="document-item">
                <i class="fas fa-file-pdf pdf-icon"></i>
                <div class="document-info">
                    <h3>Устав АНО ПСРОО РБ "Современная Школа"</h3>
                    <p>Устав Автономной некоммерческой организации Профессиональное Сообщество Руководителей Образовательных Организаций Республики Башкортостан "Современная Школа"</p>
                    <div class="document-meta">
                        <span class="doc-date">Дата: 22.06.2023</span>
                        <span class="doc-size">Размер: 245 КБ</span>
                    </div>
                    <a href="documents/ustav.pdf" class="doc-link" target="_blank">
                        <i class="fas fa-download"></i> Скачать PDF
                    </a>
                </div>
            </div>
            <div class="document-item">
                <i class="fas fa-file-pdf pdf-icon"></i>
                <div class="document-info">
                    <h3>Лицензия на образовательную деятельность</h3>
                    <p>Лицензия на осуществление образовательной деятельности по дополнительному профессиональному образованию</p>
                    <div class="document-meta">
                        <span class="doc-date">Дата: 15.09.2023</span>
                        <span class="doc-size">Размер: 1.2 МБ</span>
                    </div>
                    <a href="documents/license.pdf" class="doc-link" target="_blank">
                        <i class="fas fa-download"></i> Скачать PDF
                    </a>
                </div>
            </div>
        `;
    }
    
    // Динамическая загрузка данных педагогического состава
    function loadTeachersFromJSON() {
        // Проверяем, находимся ли мы на странице педагогического состава
        if (window.location.pathname.includes('teachers.html')) {
            fetch('data/teachers.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Файл teachers.json не найден');
                    }
                    return response.json();
                })
                .then(data => {
                    renderTeachers(data);
                })
                .catch(error => {
                    console.error('Ошибка загрузки данных преподавателей:', error);
                    renderStaticTeachers();
                });
        }
    }
    
    function renderTeachers(teachers) {
        const container = document.getElementById('teachersContainer');
        if (!container) return;
        
        let html = '<div class="teachers-grid">';
        
        teachers.forEach(teacher => {
            html += `
            <div class="teacher-card">
                <div class="teacher-photo">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                    <p class="teacher-position">${teacher.position}</p>
                    <p class="teacher-discipline"><strong>Преподаваемые дисциплины:</strong> ${teacher.disciplines}</p>
                    <p class="teacher-education"><strong>Образование:</strong> ${teacher.education}</p>
                    <p class="teacher-qualification"><strong>Повышение квалификации:</strong> ${teacher.qualification}</p>
                    <p class="teacher-experience"><strong>Опыт работы:</strong> ${teacher.experience}</p>
                </div>
            </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
    
    function renderStaticTeachers() {
        const container = document.getElementById('teachersContainer');
        if (!container) return;
        
        container.innerHTML = `
            <div class="info-section">
                <p>Информация о педагогическом составе загружается. Если данные не отображаются, пожалуйста, проверьте файл teachers.json в папке data/</p>
                <p>Пример структуры файла teachers.json:</p>
                <pre>
[
  {
    "name": "Гайтанов Сергей Сергеевич",
    "position": "Директор, преподаватель",
    "disciplines": "Управление образовательными организациями, Современные образовательные технологии",
    "education": "Высшее, Башкирский государственный университет",
    "qualification": "Повышение квалификации: 'Управление современной школой', 2024 г.",
    "experience": "15 лет"
  }
]
                </pre>
            </div>
        `;
    }
    
    // Инициализация загрузки данных
    loadDocumentsFromJSON();
    loadTeachersFromJSON();
    
    // Активное меню в зависимости от страницы
    function setActiveMenu() {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (linkPage !== 'index.html' && currentPage.includes(linkPage.replace('.html', '')))) {
                link.classList.add('active');
                
                // Также активируем родительский элемент для выпадающего меню
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const dropdownLink = parentDropdown.querySelector('> a');
                    if (dropdownLink) {
                        dropdownLink.classList.add('active');
                    }
                }
            }
        });
    }
    
    setActiveMenu();
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});