const RESPONSIVE_WIDTH = 1024
var submitted = false
let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseHeaderItems = document.getElementById("collapsed-items")
const collapseBtn = document.getElementById("collapse-btn")
const expandingBg = document.getElementById("expanding-header-bg")
const popupEl = document.getElementById('popup1');
const modal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['button', 'escape'],
    closeLabel: "Close",
    cssClass: ['popup1'],
    onOpen: function () {
        console.log('modal opened')
    },
    onClose: function () {
        console.log('modal closed')
    }
})
const form = document.forms.clients
form.action = 'https://docs.google.com/forms/d/e/1FAIpQLSdXR6fhhmyPvkKoflEpDWHLcM5BhD5yhEm1cMEM9JDfWIuJ-w/formResponse?'
form.method = 'GET'
form.target = 'redirect'
const formEls = [
    form.elements[0],
    form.elements[1],
    form.elements[2],
    form.elements[3]
];

function fadeOut(oObj, time, delay) {
    if (time == null) var time = 500;
    if (delay == null) var delay = 50;
    if (time > 0) {
        time -= delay;
        oObj.style.opacity = parseFloat(oObj.style.opacity) - (parseFloat(oObj.style.opacity) / (time / delay));
        window.setTimeout(function (_oObj, _time) { return function () { fadeOut(_oObj, _time) } }(oObj, time), delay);
    } else {
        oObj.style.opacity = '1';
        oObj.style.visibility = 'hidden';
    }
}

function fadeIn(oObj, time, delay) {
    if (oObj.style.visibility != 'visible') {
        oObj.style.visibility = 'visible';
        oObj.style.opacity = '0';
    }
    if (time == null) var time = 500
    if (delay == null) var delay = 50
    if (time > 0) {
        time -= delay;
        oObj.style.opacity = parseFloat(oObj.style.opacity) + (1 - parseFloat(oObj.style.opacity)) / (time / delay);
        window.setTimeout(function (_oObj, _time) { return function () { fadeIn(_oObj, _time) } }(oObj, time), delay);
    }
}

function onHeaderClickOutside(e) {
    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }
}

function toggleHeader() {
    console.log("Collapse", isHeaderCollapsed)
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("!tw-opacity-100")
        collapseHeaderItems.style.width = "50vw"
        collapseBtn.classList.remove("bi-list", "primary-text-color")
        collapseBtn.classList.add("bi-x", "tw-text-white")
        isHeaderCollapsed = false
        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("!tw-opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "tw-text-white")
        collapseBtn.classList.add("bi-list", headerWhiteBg ? "primary-text-color" : null)
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

if (document.readyState == "interactive") {
    document.body.dataset.loaded = false
    document.documentElement.style.cssText = 'background: #fff;overflow:hidden; pointer-events: none';
    fadeIn(document.body, 1500, 30)
    var loader = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    loader.setAttribute("id", "loader")
    loader.setAttribute("viewBox", "0 0 50 50");
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "25");
    circle.setAttribute("cy", "25");
    circle.setAttribute("r", "20");
    loader.appendChild(circle);
    loader.style.cssText = "position:absolute;top:50%;left:50%;translate:-50%;z-index:999"
    document.body.appendChild(loader);
    setInterval(() => {
        document.documentElement.style.cssText = 'background: none;overflow:visible; pointer-events: all';
        loader.remove()
        document.body.dataset.loaded = true
    }, 1500)
    document.addEventListener('DOMContentLoaded', main())
} else {
    document.body.dataset.loaded = true
    main()
}


function main() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    formEls.forEach((element, index) => {
        const maxLength = element.getAttribute('maxlength');
        const counterElement = document.getElementById(`counter${index}`);
        if (counterElement && maxLength) {
            counterElement.innerHTML = `${maxLength}`;
        }
    });
    
    form.addEventListener('input', (e) => {
        const targetElement = e.target;
        const index = formEls.indexOf(targetElement);
        if (index !== -1) {
            const maxLength = targetElement.getAttribute('maxlength');
            const counterElement = document.getElementById(`counter${index}`);
            if (counterElement && maxLength) {
                counterElement.innerHTML = `${maxLength - targetElement.value.length}`;
            }
        }
        if (targetElement === form.elements[1]) {
            targetElement.value = targetElement.value.replace(/[^0-9,+]/g, '');
        }
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        submitted = true
        setTimeout(() => {
            fadeOut(form, 1000, 20)
            document.getElementById('formloader').removeAttribute('hidden')
            form.submit()
        }, 1500);
    })

    document.getElementById('redirect').addEventListener('load', (e) => {
        if (submitted) {
            submitted = false
            setTimeout(() => {
                form.reset()
                document.getElementById('formloader').setAttribute('hidden', '')
                fadeIn(form, 1000, 20)
            }, 1500)
        }
    })

    grecaptcha.ready(function () {
        grecaptcha.execute('6LcfYaorAAAAAHxLxDYR_bATGztdtTw6TyLdSuvc', { action: 'submit' })
            .then(function (token) {
                document.getElementById('g-recaptcha-response').value = token;
            });
    });

    gsap.registerPlugin(ScrollTrigger)

    gsap.to(expandingBg, {
        height: "100%",
        duration: 3,
        scrollTrigger: {
            trigger: "#hero-section",
            start: "50px 10px", // when the top of the trigger hits the top of the viewport
            end: "80px 50px",
            scrub: 1,
        }

    })

    gsap.to("#popup1", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 1,
        scrollTrigger: {
            trigger: "#hero-section",
            toggleActions: "restart none restart none"
        }
    })

    gsap.to("#anim1", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
            trigger: "#about",
            start: "top top",
            toggleActions: "play pause resume pause"
        }
    })

    gsap.to("#clients", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
            trigger: "#feedback",
            start: "top top",
            toggleActions: "play pause resume pause"
        }
    })

    gsap.to("#card1", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
            trigger: "#booking",
            start: "top top",
            toggleActions: "play pause resume pause"
        }
    })

    gsap.to("#card2", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
            trigger: "#booking",
            start: "top top",
            toggleActions: "play pause resume pause"
        }
    })

    gsap.to("#card3", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        scrollTrigger: {
            trigger: "#booking",
            start: "top top",
            toggleActions: "play pause resume pause"
        }
    })

    gsap.to("#contact1", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
            trigger: "#review",
            start: "top top",
            toggleActions: "play pause resume pause"
        }
    })

    gsap.to("#contact2", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
            trigger: "#review",
            start: "top top",
            toggleActions: "play pause resume pause"
        }
    })

    gsap.to("#contact3", {
        scale: 100,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        scrollTrigger: {
            trigger: "#review",
            start: "top top",
            toggleActions: "play pause resume pause"
        }
    })

    ScrollTrigger.create({
        trigger: "#hero-section",
        start: "50px 10px",
        end: "60px 40px",
        scrub: 1,
        onEnter: () => {
            const headerLinks = document.querySelectorAll(".header-links")

            headerLinks.forEach(e => {
                e.classList.add("header-white-bg")
            })
            if (isHeaderCollapsed) {
                collapseBtn.classList.add("primary-text-color")
            }
            headerWhiteBg = true
        },
        onEnterBack: () => {
            const headerLinks = document.querySelectorAll(".header-links")

            headerLinks.forEach(e => {
                e.classList.remove("header-white-bg")
            })
            collapseBtn.classList.remove("primary-text-color")
            collapseBtn.classList.add("tw-text-white")
            headerWhiteBg = false
        }
    })

    const cottage1Container = document.querySelector(".cottage1-container")
    const cottage1SlideShow = new SlideShow(cottage1Container, false, 5000)

    const cottage2Container = document.querySelector(".cottage2-container")
    const cottage2SlideShow = new SlideShow(cottage2Container, false, 5000)

    const cottage3Container = document.querySelector(".cottage3-container")
    const cottage3SlideShow = new SlideShow(cottage3Container, false, 5000)

    const reviewContainer = document.querySelector(".review-container")
    const reviewSlideShow = new SlideShow(reviewContainer, true, 10000)

    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""
        document.addEventListener('click', (e) => {
            if (e.target.closest('#popup1')) {
                modal.open()
                modal.setContent(`<h1 class="text-xl text-center tenor-sans font-bold bg-black text-white">Підписуйтеся на наш ТікТок та Інстаграм</h1>
                <video autoplay loop>
                <source src="assets/video/lg.mp4" type="video/mp4">
                <source src="assets/video/lg.webm" type="video/webm">
                Your browser does not support the video tag.
                </video>`)
            }
        })
    } else {
        isHeaderCollapsed = true
        collapseBtn.classList.add("bi-list", headerWhiteBg ? "primary-text-color" : null)
        document.addEventListener('click', (e) => {
            if (e.target.closest('#popup1')) {
                modal.open()
                modal.setContent(`<h1 class="text-xl text-center tenor-sans font-bold bg-black text-white">Більше в нашому ТікТок та Інстаграм</h1>
        <video autoplay loop>
        <source src="assets/video/sm.mp4" type="video/mp4">
        <source src="assets/video/sm.webm" type="video/webm">
        Your browser does not support the video tag.
    </video>`)
            }
        })
    }
}