const translations = {
    krb: {
        title: "فورما پەيوەنديێ",
        subtitle: "ئەم بو هەوە یێل ڤێرە چەوا دشێین هاريكاريا تە بكەين ؟",
        fullname: "ناڤ",
        phone: "موبايل",
        email: "ئیمەیل",
        language: "زمان",
        message: "ناما تە",
        submit: "هنارتنا نامێ",
        success: "نامه ب سەركەفتيانە هاتە هنارتن",
        error: "نامە نە هاتە هنارتن دوبارە هەولبدە",
        networkError: "كێشه يا هەی ئينترنێتا خو تاقيكە و دوباره هە ولدە"
    },
    en: {
        title: "Communication form",
        subtitle: "We are here for you how we can help you",
        fullname: "Name",
        phone: "Phone Number",
        email: "Email",
        language: "Language",
        message: "Your Message",
        submit: "Send Message",
        success: "Message sent successfully!",
        error: "Error sending message. Please try again.",
        networkError: "Network error. Please check your connejction."
    },
    ar: {
        title: "اتصل بنا",
        subtitle: "نحن هنا من أجلك! كيف يمكننا خدمتك؟",
        fullname: "اسمك",
        phone: "رقم هاتفك",
        email: "البريد الإلكتروني",
        language: "اللغة المفضلة للتواصل",
        message: "ملخص",
        submit: "إرسال الرسالة",
        success: "تم إرسال رسالتك بنجاح!",
        error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
        networkError: "خطأ في الشبكة. يرجى التحقق من اتصالك."
    },
    krs: {
        title: "فورمێ پەیوەندیکردن",
        subtitle: "ئێمە لێرەین بو ئێوە! چۆن ئەتوانین یارمەتیتان بدەین ؟",
        fullname: "ناوت",
        phone: "ژمارەی موبایل",
        email: "ئیمەیل",
        language: "زمانی مەبەست",
        message: "زمان",
        submit: "ناردنی پەیام",
        success: "نامە بەسەرکەوتویانە نێردرا",
        error: "نامە نە نێردرا تکایە دوبارە هەولبدە!",
        networkError: "هێلەکەت کێشەی هەیە دوبارە هەولبدە."
    }
};

const langSwitcher = document.getElementById('language-switcher');
let currentLang = 'krb';

langSwitcher.addEventListener('change', (e) => {
    currentLang = e.target.value;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = ['ar', 'krb' , 'krs'].includes(currentLang) ? 'rtl' : 'ltr';
    updateTranslations();
});

function updateTranslations() {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.dataset.translate;
        element.textContent = translations[currentLang][key];
    });
}

const form = document.getElementById('contactForm');
const messageElement = document.getElementById('form-message');
const loadingContainer = document.querySelector('.loading-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    loadingContainer.style.display = 'flex';

    const formData = new FormData(form);
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
            showMessage(translations[currentLang].success, 'success');
            form.reset();
        } else {
            showMessage(translations[currentLang].error, 'error');
        }
    } catch (error) {
        showMessage(translations[currentLang].networkError, 'error');
    } finally {
        loadingContainer.style.display = 'none';
    }
});

function showMessage(message, type) {
    messageElement.textContent = message;
    messageElement.className = type;
    messageElement.style.display = 'block';
    
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.style.display = 'none';
            messageElement.style.opacity = '1';
        }, 500);
    }, 4500);
}

document.documentElement.lang = currentLang;
document.documentElement.dir = 'rtl';
updateTranslations();

const container = document.querySelector('.particles-container');

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    const duration = Math.random() * 4 + 2;
    particle.style.animationDuration = `${duration}s`;
    container.appendChild(particle);
    setTimeout(() => particle.remove(), Math.random() * 7000 + 3500);
}

setInterval(createParticle, 200);

container.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.particle').forEach(particle => {
        const dx = e.clientX - particle.offsetLeft;
        const dy = e.clientY - particle.offsetTop;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
            particle.style.transform = `translate(${dx * 0.1}px, ${dy * 0.1}px)`;
        }
    });
});


// candles
let candles = [];
let previousClose = 100;
const maxCandles = 30;
const chartContainer = document.querySelector('.chart-container');
const chartWrapper = document.querySelector('.chart-wrapper');

const resizeObserver = new ResizeObserver(() => {
    updateChart(false); // Redraw without adding new candle
});
resizeObserver.observe(chartContainer);

function generateCandle() {
    const volatility = Math.random() * 20 + 5; // Increased minimum volatility
    const open = previousClose;
    const close = open + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;
    
    previousClose = close;
    
    return {
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2))
    };
}

function createCandleElement(candleData) {
    const candle = document.createElement('div');
    candle.className = 'candle';
    
    const wick = document.createElement('div');
    wick.className = 'wick';
    
    const body = document.createElement('div');
    body.className = 'candle-body';
    
    candle.appendChild(wick);
    candle.appendChild(body);
    
    return { element: candle, wick, body };
}

function updateChart(addNewCandle = true) {
    if (addNewCandle) {
        chartContainer.style.direction = 'ltr';
        chartWrapper.style.direction = 'ltr';
        // Generate new candle
        const newCandleData = generateCandle();
        const { element: newCandle, wick, body } = createCandleElement(newCandleData);
        
        // Add new candle to wrapper
        chartWrapper.appendChild(newCandle);
        candles.push({ element: newCandle, wick, body, data: newCandleData });
        
        // Remove oldest candle if exceeding maximum
        if (candles.length > maxCandles) {
            const oldest = candles.shift();
            oldest.element.remove();
        }
    }
    
    const minLow = Math.min(...candles.map(c => c.data.low));
    const maxHigh = Math.max(...candles.map(c => c.data.high));
    const priceRange = maxHigh - minLow;
    const containerHeight = chartContainer.offsetHeight;
    const scale = containerHeight / (priceRange || 1);

    candles.forEach(candle => {
        const scaled = {
            open: (candle.data.open - minLow) * scale,
            high: (candle.data.high - minLow) * scale,
            low: (candle.data.low - minLow) * scale,
            close: (candle.data.close - minLow) * scale
        };

        candle.wick.style.top = `${containerHeight - scaled.high}px`;
        candle.wick.style.height = `${scaled.high - scaled.low}px`;

        const bodyTop = containerHeight - Math.max(scaled.open, scaled.close);
        const bodyHeight = Math.abs(scaled.close - scaled.open);
        candle.body.style.top = `${bodyTop}px`;
        candle.body.style.height = `${bodyHeight}px`;
        candle.body.style.backgroundColor = candle.data.close > candle.data.open ? '#ff6b00' : '#E0E1E1';
    });
    
    // Adjust translation based on direction
    const scrollPosition = chartWrapper.scrollWidth - chartContainer.offsetWidth;
    const isRTL = ['ar', 'krb', 'krs'].includes(currentLang);

    chartWrapper.style.transform = `translateX(${isRTL ? -scrollPosition : 0}px)`;

    if (isRTL) {
        chartWrapper.style.transform = `translateX(${-scrollPosition}px)`;
    } else {
        chartWrapper.style.transform = `translateX(0)`;
    }
}

// In the language switcher event listener, trigger a redraw
langSwitcher.addEventListener('change', (e) => {
    currentLang = e.target.value;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = ['ar', 'krb', 'krs'].includes(currentLang) ? 'rtl' : 'ltr';
    updateTranslations();
    updateChart(false); // Redraw existing candles
});

// Initial candles
for (let i = 0; i < 15; i++) updateChart();

// Add new candle every second
setInterval(updateChart, 1000);

// Enhanced copy functionality for multiple numbers
const copyButtons = document.querySelectorAll('.copy-btn');
const feedback = document.querySelector('.copy-feedback');

copyButtons.forEach(button => {
button.addEventListener('click', async (e) => {
    const number = e.currentTarget.parentElement.querySelector('.number-text').textContent;
    try {
    await navigator.clipboard.writeText(number);
    showFeedback();
    } catch (err) {
    feedback.textContent = 'Copy failed!';
    feedback.style.backgroundColor = '#e74c3c';
    showFeedback();
    }
});
});

function showFeedback() {
feedback.classList.add('visible');
setTimeout(() => {
    feedback.classList.remove('visible');
    feedback.style.backgroundColor = '#4a90e2';
}, 2000);
}