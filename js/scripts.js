const RESPONSIVE_WIDTH = 1024

gsap.registerPlugin(ScrollTrigger)

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseHeaderItems = document.getElementById("collapsed-items")
const collapseBtn = document.getElementById("collapse-btn")
const logoWhite = document.getElementById("logoWhite")
const logoBlack = document.getElementById("logoBlack")
if(scrollY === 0) {
    logoBlack.style.display = 'none'
}

const dropdowns = document.querySelectorAll('.dropdown')
dropdowns.forEach(dropdown => new Dropdown(`#${dropdown.id}`))


gsap.to("#hero-section", {
    scale: 1,
    duration: 30
})


const expandingBg = document.getElementById("expanding-header-bg")

gsap.to(expandingBg, {

    height: "100%",
    duration: 3,
    scrollTrigger: {
        trigger: "#hero-section",
        // pin: true, 
        start: "50px 10px", // when the top of the trigger hits the top of the viewport
        end: "80px 50px",
        scrub: 1,
        // markers: true
    }

})

ScrollTrigger.create({
    trigger: "#hero-section",
    start: "50px 10px", // when the top of the trigger hits the top of the viewport
    end: "60px 40px",
    scrub: 1,
    // markers: true,
    onEnter: () => {
        const headerLinks = document.querySelectorAll(".header-links")

        headerLinks.forEach(e => {
            e.classList.add("header-white-bg")
        })
        if (isHeaderCollapsed){
            collapseBtn.classList.add("primary-text-color")
        }
        logoBlack.style.display = 'block'
        logoWhite.style.display = 'none'
        headerWhiteBg = true
    },
    onEnterBack: () => {
        const headerLinks = document.querySelectorAll(".header-links")

        headerLinks.forEach(e => {
            e.classList.remove("header-white-bg")
        })
        logoBlack.style.display = 'none'
        logoWhite.style.display = 'block'
        collapseBtn.classList.remove("primary-text-color")
        collapseBtn.classList.add("tw-text-white")
        headerWhiteBg = false
    }
})

const cottage0Container = document.querySelector(".cottage0-container")
const cottage0SlideShow = new SlideShow(cottage0Container, false, 5000)

const cottage1Container = document.querySelector(".cottage1-container")
const cottage1SlideShow = new SlideShow(cottage1Container, false, 5000)

const cottage2Container = document.querySelector(".cottage2-container")
const cottage2SlideShow = new SlideShow(cottage2Container, false, 5000)

const cottage3Container = document.querySelector(".cottage3-container")
const cottage3SlideShow = new SlideShow(cottage3Container, false, 5000)

const reviewContainer = document.querySelector(".review-container")
const reviewSlideShow = new SlideShow(reviewContainer, true, 10000)

function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}

function toggleHeader() {
    console.log("Colappse", isHeaderCollapsed)
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("!tw-opacity-100")
        collapseHeaderItems.style.width = "60vw"
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

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""
        
    }else{
        isHeaderCollapsed = true
        collapseBtn.classList.add("bi-list", headerWhiteBg ? "primary-text-color" : null)
    }
}

window.addEventListener("resize", responsive)

