const header = document.getElementById('mainHeader');
const backToTopBtn = document.getElementById('backToTopBtn');


window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


const logoContainers = document.querySelectorAll('.logo-clickable-area, .hero-logo-container');


logoContainers.forEach(container => {
  container.addEventListener('mouseenter', () => {
    
    const svg = container.querySelector('.animated-svg-logo');
    if (!svg) return;

    
    const clonedSvg = svg.cloneNode(true);
    
    
    container.replaceChild(clonedSvg, svg);
  });
});






gsap.registerPlugin(ScrollTrigger);

const nodes = document.querySelectorAll('.timeline-node');
const trackGlow = document.querySelector('.timeline-glow');
const historySection = document.querySelector('.history-section');

ScrollTrigger.create({
  trigger: "#history",          
  start: "top top",             
  end: "bottom bottom",         
  pin: ".history-bg-container", 
  pinSpacing: false             
});

gsap.to(trackGlow, {
  height: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".timeline-container",
    start: "top center", 
    end: "bottom center", 
    scrub: true 
  }
});


nodes.forEach((node, index) => {
  const content = node.querySelector('.node-content');
  const year = node.getAttribute('data-year');
  

  const bgTarget = year === '2008' ? '#bg-2006' : `#bg-${year}`;
  const bgElement = document.querySelector(bgTarget);

  ScrollTrigger.create({
    trigger: node,
    start: "top 60%", 
    onEnter: () => {

      gsap.fromTo(content, 
        { rotationX: 90, opacity: 0, transformOrigin: "bottom center" },
        { rotationX: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
      );

      gsap.to('.bg-layer', { opacity: 0, scale: 1.1, duration: 1 });
      

      if (bgElement) {
        const targetScale = year === '2008' ? 1.05 : 1; 
        gsap.to(bgElement, { opacity: 1, scale: targetScale, duration: 1.5, ease: "power2.out" });
      }
    },
    onLeaveBack: () => {
      gsap.to(content, { opacity: 0, rotationX: -90, duration: 0.5 });
    }
  });
});


// === 教育目標區塊 ===
let matchMedia = gsap.matchMedia();

matchMedia.add("(min-width: 769px)", () => {
  const goalsSection = document.querySelector('.goals-section');
  const track = document.querySelector('.cards-track');
  const allCards = document.querySelectorAll('.goal-card'); 
  
  function getScrollAmount() {
    let trackWidth = track.scrollWidth;
    return -(trackWidth - window.innerWidth + 100); 
  }

  const tween = gsap.to(track, {
    x: () => getScrollAmount(), 
    ease: "none"
  });

  ScrollTrigger.create({
    trigger: goalsSection,
    start: "top top",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tween,
    scrub: 1, 
    invalidateOnRefresh: true 
  });

  
  allCards.forEach(card => {
    ScrollTrigger.create({
      trigger: card,
      containerAnimation: tween, 
      start: "center 65%",       
      end: "center 35%",         
      toggleClass: "active"      
    });
  });
});

// === Modal 與 Tab 分頁邏輯 ===
const modal = document.getElementById('diagramModal');
const closeBtn = document.getElementById('closeModalBtn');
const tabBtns = document.querySelectorAll('.tab-btn');
const imgContainers = document.querySelectorAll('.img-container');


document.addEventListener('click', (e) => {
  if (e.target.closest('#openModalBtn')) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
  }
});


closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = ''; 
});


modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});


window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});


tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    imgContainers.forEach(img => img.classList.remove('active'));
    btn.classList.add('active');
    const targetId = btn.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});



// === 規劃與發展區塊 ===
const futureNodes = document.querySelectorAll('.future-node');

futureNodes.forEach(node => {
  const x = node.getAttribute('data-x');
  const y = node.getAttribute('data-y');
  node.style.setProperty('--x', `${x}%`);
  node.style.setProperty('--y', `${y}%`);
});

gsap.set(futureNodes, { xPercent: -50, yPercent: -50, scale: 0.5, opacity: 0 });

matchMedia.add("(min-width: 769px)", () => {
  const futureSection = document.querySelector('.future-section');
  const futureContainer = document.querySelector('.future-container');
  const svgLines = document.querySelectorAll('.constellation-svg .line');
  const coreNode = document.querySelector('.core-node');
  const mainBranches = document.querySelectorAll('.branch-node:not(.ability)');
  const abilityNodes = document.querySelectorAll('.ability');
  const midTermNodes = document.querySelectorAll('.mid-term');
  const longTermNodes = document.querySelectorAll('.long-term');

  ScrollTrigger.create({
    trigger: futureSection,
    start: "top top",
    end: "bottom bottom",
    pin: futureContainer, 
    pinSpacing: false
  });

  const futureTl = gsap.timeline({
    scrollTrigger: {
      trigger: futureSection,
      start: "top top", 
      end: "bottom bottom",
      scrub: 1, 
    }
  });

 
  futureTl.to(coreNode, { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" })
  
          .to(svgLines, { strokeDashoffset: 0, duration: 3, ease: "power1.inOut" }, "-=0.5")
          .to(mainBranches, { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "back.out(1.2)" }, "-=2.5")
  
          .to(abilityNodes, { opacity: 1, scale: 0.85, duration: 1, stagger: 0.1, ease: "back.out(1.2)" }, "-=2")
  
          .to(midTermNodes, { opacity: 1, scale: 1, duration: 1.5, stagger: 0.05, ease: "elastic.out(1, 0.5)" }, "-=1.5")
  
          .to(longTermNodes, { opacity: 1, scale: 1.1, duration: 1.5, stagger: 0.1, ease: "elastic.out(1, 0.5)" }, "-=1");
});


// === 轉場動畫：首頁 -> 歷史  ===
gsap.to(".hero-dark-fade", {
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",      
    end: "bottom 20%",     
    scrub: true,
  },
  opacity: 1, 
  ease: "none"
});


// === 轉場動畫：歷史 -> 教育目標  ===
matchMedia.add("(min-width: 769px)", () => {
  const transitionTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".goals-section",
      start: "top bottom", 
      end: "top 30%",      
      scrub: true
    }
  });


  transitionTl.to([".history-bg-container", ".timeline-container"], {
    y: 60,
    filter: "blur(10px)",
    ease: "none"
  }, 0);


  transitionTl.to(".history-light-fade", {
    opacity: 1,
    ease: "none"
  }, 0); 
});