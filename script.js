// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Portfolio data
const portfolioItems = [
    {
        title: "Project One",
        category: "UI/UX Design",
        image: "https://via.placeholder.com/300x200.png?text=Project+One"
    },
    {
        title: "Project Two",
        category: "Graphics",
        image: "https://via.placeholder.com/300x200.png?text=Project+Two"
    },
    {
        title: "Project Three",
        category: "Project Management",
        image: "https://via.placeholder.com/300x200.png?text=Project+Three"
    },
    {
        title: "Project Four",
        category: "UI/UX Design",
        image: "https://via.placeholder.com/300x200.png?text=Project+Four"
    },
    {
        title: "Project Five",
        category: "Graphics",
        image: "https://via.placeholder.com/300x200.png?text=Project+Five"
    },
    {
        title: "Project Six",
        category: "UI/UX Design",
        image: "https://via.placeholder.com/300x200.png?text=Project+Six"
    }
];

// Populate portfolio gallery
const gallery = document.querySelector('.gallery');
if (gallery) {
    portfolioItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-item-info">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
            </div>
        `;
        gallery.appendChild(galleryItem);
    });
}

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Theme switcher
const themeSwitcher = document.querySelector('.theme-switcher');
const doc = document.documentElement;

const setTheme = (theme) => {
    doc.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update active button
    themeSwitcher.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
    });
    themeSwitcher.querySelector(`[data-theme="${theme}"]`).classList.add('active');
};

if (themeSwitcher) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme') || 'system';

    themeSwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const theme = e.target.dataset.theme;
            if (theme === 'system') {
                setTheme(systemTheme);
                localStorage.removeItem('theme'); // Let system decide
                 // Re-apply system theme class
                themeSwitcher.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                themeSwitcher.querySelector(`[data-theme="system"]`).classList.add('active');
                doc.setAttribute('data-theme', systemTheme);
            } else {
                setTheme(theme);
            }
        }
    });

    // Set initial theme
    if (savedTheme === 'system') {
        setTheme(systemTheme);
        themeSwitcher.querySelector(`[data-theme="system"]`).classList.add('active');
    } else {
        setTheme(savedTheme);
    }
}

// Scroll-triggered animations
const animatedElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach(el => observer.observe(el));
