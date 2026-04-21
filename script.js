/* ASHMIL OMAR - PREMIUM INTERACTION SCRIPT
*/

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const menuTrigger = document.querySelector('#menu-trigger');
    const closeTrigger = document.querySelector('.close-menu');
    const contactMenu = document.querySelector('.contact-menu');

    // 1. SMOOTH CURSOR FOLLOW
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4,
            ease: "power2.out"
        });

        // Background Blob Interaction (Parallax)
        gsap.to(".b1", { x: e.clientX * 0.04, y: e.clientY * 0.04, duration: 2 });
        gsap.to(".b2", { x: -e.clientX * 0.04, y: -e.clientY * 0.04, duration: 2 });
    });

    // 2. MAGNETIC UI ELEMENTS
    const magnetics = document.querySelectorAll('.magnetic, .nav-links, .logo');
    magnetics.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(el, { x: x * 0.4, y: y * 0.4, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.3 });
        });
    });

    // 3. CURSOR HOVER EFFECTS
    const applyHover = () => {
        const targets = document.querySelectorAll('.hover-target, h1 span, .project-card, .menu-item, .close-menu, .nav-links');
        targets.forEach(t => {
            t.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 4, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.3 }));
            t.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, backgroundColor: "transparent", duration: 0.3 }));
        });
    };
    applyHover();

    // 4. AUTO DRIFT BACKGROUND
    gsap.to(".blob", {
        x: "random(-120, 120)",
        y: "random(-120, 120)",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4
    });

    // 5. CONTACT MENU LOGIC
    const menuTl = gsap.timeline({ paused: true });
    menuTl.to(contactMenu, { top: 0, duration: 1.1, ease: "expo.inOut" })
          .from(".menu-item", { y: 60, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power4.out" }, "-=0.6");

    menuTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        menuTl.play();
        document.body.classList.add('no-scroll');
        setTimeout(applyHover, 100); // Ensures new items are hoverable
    });

    closeTrigger.addEventListener('click', () => {
        menuTl.reverse();
        document.body.classList.remove('no-scroll');
    });

    // 6. HERO REVEAL (ON LOAD)
    gsap.timeline()
        .to(".hero h1 span", { y: 0, duration: 1.5, stagger: 0.2, ease: "expo.out", delay: 0.4 })
        .to(".hero-desc", { opacity: 1, y: -15, duration: 1 }, "-=1");

    // 7. HIDE HEADER ON SCROLL
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        // At the very top
        gsap.to(navbar, { y: 0, duration: 0.4, ease: "power2.out" });
        return;
    }

    if (currentScroll > lastScroll && !document.body.classList.contains('no-scroll')) {
        // Scrolling down - Hide Navbar
        gsap.to(navbar, { y: "-100%", duration: 0.4, ease: "power2.in" });
    } else {
        // Scrolling up - Show Navbar
        gsap.to(navbar, { y: 0, duration: 0.4, ease: "power2.out" });
    }
    
    lastScroll = currentScroll;
});
});