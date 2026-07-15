/**
 * PREMIUM AI SALES ASSISTANT - CORE INTERFACE SCRIPTING (main.js)
 * Coordinates page transitions, sticky states, navigation tracking, and loaders
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Global Preloader Handling
  const loader = document.getElementById("global-loader");
  if (loader) {
    const fadeLoader = () => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.visibility = "hidden";
        loader.style.display = "none";
      }, 500); // Matches CSS transition time
    };
    
    // Fade out when window is completely loaded
    window.addEventListener("load", fadeLoader);
    
    // Fallback: Guarantee loader hides even if assets take too long
    setTimeout(() => {
      if (loader.style.display !== "none") {
        fadeLoader();
      }
    }, 1500);
  }

  // 2. Sticky Header Shadow & Background Blend
  const header = document.querySelector(".site-header");
  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 15) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    
    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll(); // Run immediately on ready
  }

  // 2b. Premium Interactive Offcanvas Mobile Menu
  const mobileMenuOpen = document.getElementById("mobileMenuOpen");
  const mobileMenuClose = document.getElementById("mobileMenuClose");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileMenuDrawer = document.getElementById("mobileMenuDrawer");

  if (mobileMenuOpen && mobileMenuDrawer && mobileMenuOverlay) {
    const openMobileMenu = () => {
      mobileMenuDrawer.classList.add("active");
      mobileMenuOverlay.classList.add("active");
      document.body.classList.add("offcanvas-open");
    };

    const closeMobileMenu = () => {
      mobileMenuDrawer.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      document.body.classList.remove("offcanvas-open");
    };

    mobileMenuOpen.addEventListener("click", openMobileMenu);
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", closeMobileMenu);
    }
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);

    // Close on link click
    const offcanvasLinks = mobileMenuDrawer.querySelectorAll(".offcanvas-link, .offcanvas-submenu-link");
    offcanvasLinks.forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  // 2c. Dynamic Spotlight Hover Effect on Premium Buttons
  const premiumButtons = document.querySelectorAll(".btn-premium");
  premiumButtons.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty("--mouse-x", `${x}px`);
      btn.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 3. Smooth Back To Top Controller
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    const toggleBackToTop = () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    };
    
    window.addEventListener("scroll", toggleBackToTop);
    toggleBackToTop(); // Run check immediately
    
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // 4. Intelligent Navigation Active Link Synchronizer
  const currentPath = window.location.pathname;
  const currentFileName = currentPath.split("/").pop() || "index.html";
  
  const navLinks = document.querySelectorAll(".nav-link, .offcanvas-link, .offcanvas-submenu-link");
  const resourceSubPages = ["blog.html", "blog-details.html", "faq.html", "contact.html"];
  
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    
    const hrefFileName = href.split("/").pop();
    
    // Perfect match comparison
    if (hrefFileName === currentFileName || (currentFileName === "index.html" && hrefFileName === "")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Highlight Resources dropdown parent if viewing a sub-resource page
  if (resourceSubPages.includes(currentFileName)) {
    const desktopResourcesParent = document.getElementById("resourcesDropdown");
    if (desktopResourcesParent) {
      desktopResourcesParent.classList.add("active");
    }
  }

  // =================================================================
  // PHASE 2 - LIVE AI SALES AGENT SIMULATOR
  // =================================================================
  
  const simButtons = document.querySelectorAll(".objection-selector-btn");
  const triggerBtn = document.getElementById("triggerSimulatorBtn");
  const termOutput = document.getElementById("terminalOutput");
  const termStatus = document.getElementById("terminalStatusBadge");
  const simTone = document.getElementById("simulatorTone");
  const simIndustry = document.getElementById("simulatorIndustry");

  if (triggerBtn && termOutput) {
    let isRunning = false;
    let selectedObjection = "competitor";

    const objectionDetails = {
      competitor: {
        title: "Competitor Contract Lock-In",
        prompt: 'Locked in with Salesforce/Competitor for 8 months.',
        subject: "Seamless Parallel Pilot / [Industry] Efficiency Matrix",
        body: `Hey Sarah,\n\nI understand you're locked into your current sales suite for another 8 months. That's exactly why AuraSales is engineered to run as a parallel, non-disruptive layer to boost your current reps' outbound speed *before* your primary contract is up for renewal.\n\nSince AuraSales connects directly with [Industry] records, we can begin building autonomous lists in the background, saving your reps 12+ hours a week immediately.\n\nAre you open to a 10-minute parallel efficiency audit next Thursday?`
      },
      budget: {
        title: "Budget Frozen / No Budget",
        prompt: 'Our budget is frozen for this quarter. We can\'t buy new tools.',
        subject: "Tech Stack Optimization / Zero-Friction ROI Mapping",
        body: `Hey Sarah,\n\nTotally understand budget freezes. AuraSales is actually designed to save teams money from Day 1 by replacing three disconnected, legacy outbound tools (lead scrapers, copywriters, and manual sequencers) into a single cohesive platform.\n\nOn average, our partners in [Industry] realize a 65% reduction in outbound software spend while achieving a 3x lift in pipeline density.\n\nWould you be open to a brief ROI simulation to see if we can save your team cash this quarter?`
      },
      time: {
        title: "Just Send Me An Email",
        prompt: '"I\'m too busy, just send me an email with some info."',
        subject: "45-Second Interactive Showcase for [Industry] Teams",
        body: `Hey Sarah,\n\nI completely understand you're swamped. I'll make this super brief.\n\nInstead of a long whitepaper, here is a 45-second interactive simulation of how AuraSales automates outbound research workflows in the [Industry] sector: [AuraSales Live Demo].\n\nIt demonstrates real-time objection-handling that achieved a 92% response rate in your space.\n\nIf it sparks any ideas, let's connect next month. If not, I'll check back after your next product launch.`
      },
      complexity: {
        title: "Sales Team Onboarding Friction",
        prompt: 'Reps don\'t have time to learn a complicated new platform.',
        subject: "Invisible Inbox Sidekick / Zero-Training Integration",
        body: `Hey Sarah,\n\nSkepticism about tool fatigue is 100% fair. Rushing busy reps into a complex new dashboard is a recipe for friction.\n\nThat's why AuraSales is built to be invisible. There is no new portal for your team to learn. It acts as an ambient co-pilot, drafting hyper-personalized emails directly inside their HubSpot drafts for simple one-click review.\n\nWould you be open to seeing how we achieved 95% team adoption across [Industry] teams in under a week?`
      }
    };

    // Toggle Active Class for Buttons
    simButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (isRunning) return;
        
        simButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedObjection = btn.getAttribute("data-objection");

        // Fast terminal log showing calibration update
        const details = objectionDetails[selectedObjection];
        termOutput.innerHTML = `
          <div class="terminal-line"><span class="terminal-prompt">&gt;</span> Calibration targeted: <span class="text-warning">${details.title}</span></div>
          <div class="terminal-line" style="color: var(--text-muted);"><span class="terminal-prompt">&gt;</span> Input prompt: <em>"${details.prompt}"</em></div>
          <div class="terminal-line"><span class="terminal-prompt">&gt;</span> Standby. Click "RUN OBJECTION SOLVER AGENT" to execute pipeline.</div>
        `;
      });
    });

    // Run Simulator Routine
    triggerBtn.addEventListener("click", () => {
      if (isRunning) return;
      isRunning = true;

      // Lock Controls
      triggerBtn.disabled = true;
      triggerBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> GENERATING SOLUTION...`;
      termStatus.className = "badge-premium font-mono";
      termStatus.style.color = "var(--accent-primary)";
      termStatus.style.backgroundColor = "rgba(217, 119, 6, 0.08)";
      termStatus.style.borderColor = "rgba(217, 119, 6, 0.15)";
      termStatus.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin me-1"></i> RUNNING`;

      const currentIndustry = simIndustry ? simIndustry.value : "SaaS & Tech";
      const currentTone = simTone ? simTone.value : "Data-Driven Value";
      const data = objectionDetails[selectedObjection];

      termOutput.innerHTML = ""; // Clear output

      const logs = [
        `&gt; Initializing autonomous outbound pipeline [ID: AGENT-${Math.floor(Math.random() * 90000 + 10000)}]...`,
        `&gt; Target Sector: <span class="text-info">${currentIndustry}</span> | Strategy Tone: <span class="text-info">${currentTone}</span>`,
        `&gt; Processing objection: "${data.prompt}"`,
        `&gt; Querying brand intelligence cache & objection matrix...`,
        `&gt; Resolving with optimum angle... Success (98.4% match confidence).`,
        `&gt; Drafting outbound hyper-personalized response:`
      ];

      let logIndex = 0;

      const printNextLog = () => {
        if (logIndex < logs.length) {
          const div = document.createElement("div");
          div.className = "terminal-line";
          div.innerHTML = logs[logIndex];
          termOutput.appendChild(div);
          termOutput.scrollTop = termOutput.scrollHeight;
          logIndex++;
          setTimeout(printNextLog, 450);
        } else {
          // Staging the email container
          const emailHeaderDiv = document.createElement("div");
          emailHeaderDiv.className = "terminal-line mt-3";
          emailHeaderDiv.innerHTML = `<strong>Subject:</strong> <span style="color: var(--accent-emerald);">${data.subject.replace("[Industry]", currentIndustry)}</span>`;
          termOutput.appendChild(emailHeaderDiv);

          const emailBodyContainer = document.createElement("div");
          emailBodyContainer.className = "terminal-text-block typing-cursor";
          termOutput.appendChild(emailBodyContainer);
          termOutput.scrollTop = termOutput.scrollHeight;

          // Replace placeholder industry and tone
          let fullText = data.body
            .replace(/\[Industry\]/g, currentIndustry)
            .replace(/SaaS & Tech/g, currentIndustry)
            .replace(/Lead Name/g, "Sarah");

          // Add a line about Tone
          fullText += `\n\n[Tone tuning applied: ${currentTone}]`;

          let charIndex = 0;
          const typewrite = () => {
            if (charIndex < fullText.length) {
              emailBodyContainer.textContent += fullText.charAt(charIndex);
              termOutput.scrollTop = termOutput.scrollHeight;
              charIndex++;
              // Type slightly faster for longer emails so the user doesn't wait forever
              setTimeout(typewrite, 8);
            } else {
              // Typing complete
              emailBodyContainer.classList.remove("typing-cursor");
              
              const footerLine = document.createElement("div");
              footerLine.className = "terminal-line mt-3 text-emerald";
              footerLine.innerHTML = `<i class="fa-solid fa-circle-check"></i> Outbound Agent task complete. Draft queued successfully in CRM.`;
              termOutput.appendChild(footerLine);
              termOutput.scrollTop = termOutput.scrollHeight;

              // Reset status badge to Active
              termStatus.className = "badge-premium badge-premium-emerald font-mono";
              termStatus.style.color = "";
              termStatus.style.backgroundColor = "";
              termStatus.style.borderColor = "";
              termStatus.innerHTML = `<i class="fa-solid fa-circle me-1 animate-pulse text-emerald"></i> ACTIVE`;

              // Unlock trigger button
              triggerBtn.disabled = false;
              triggerBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> RUN OBJECTION SOLVER AGENT`;
              isRunning = false;
            }
          };

          setTimeout(typewrite, 200);
        }
      };

      // Start the log printing sequence
      setTimeout(printNextLog, 200);
    });
  }

  // =================================================================
  // PHASE 3 - HERO SECTION INTERACTIONS (PARALLAX & DYNAMIC COUNTERS)
  // =================================================================

  // 1. Premium Mouse Parallax Movement
  const heroVisualCanvas = document.getElementById("heroVisualCanvas");
  const mainDashboard = document.querySelector(".main-dashboard-mockup");
  const floatingElements = document.querySelectorAll(".floating-element");

  if (heroVisualCanvas && mainDashboard) {
    // Add default initial rotations for absolute floating elements
    const initialRotations = {
      "ai-assistant-card": -2,
      "crm-analytics-widget": 4,
      "revenue-widget": -3,
      "meeting-booked-toast": 1,
      "lead-score-badge": -5,
      "pipeline-progress-card": 3,
      "chat-preview-bubble": -1,
      "floating-success-seal": 12
    };

    heroVisualCanvas.addEventListener("mousemove", (e) => {
      const rect = heroVisualCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2; // X distance from center
      const y = e.clientY - rect.top - rect.height / 2; // Y distance from center

      // 1. subtle tilt/rotation of the main dashboard container
      const dashRotX = -y * 0.015; // vertical tilt
      const dashRotY = x * 0.015;  // horizontal tilt
      const dashTransX = x * 0.012; // horizontal translation
      const dashTransY = y * 0.012; // vertical translation
      
      mainDashboard.style.transform = `rotateX(${dashRotX}deg) rotateY(${dashRotY}deg) translate3d(${dashTransX}px, ${dashTransY}px, 20px)`;

      // 2. move individual floating cards at different speeds based on data-speed
      floatingElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute("data-speed")) || 0.05;
        const rotSpeed = parseFloat(element.getAttribute("data-rot-speed")) || 0.005;
        
        // Find rotation based on class
        let baseRot = 0;
        element.classList.forEach(className => {
          if (initialRotations[className] !== undefined) {
            baseRot = initialRotations[className];
          }
        });

        const elementTransX = x * speed * 0.5;
        const elementTransY = y * speed * 0.5;
        const elementRot = baseRot + (x * rotSpeed);

        element.style.transform = `translate3d(${elementTransX}px, ${elementTransY}px, 40px) rotate(${elementRot}deg)`;
      });
    });

    heroVisualCanvas.addEventListener("mouseleave", () => {
      // Smoothly return main dashboard to standard flat state
      mainDashboard.style.transform = "rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)";

      // Smoothly return cards to default baseline rotations
      floatingElements.forEach((element) => {
        let baseRot = 0;
        element.classList.forEach(className => {
          if (initialRotations[className] !== undefined) {
            baseRot = initialRotations[className];
          }
        });
        element.style.transform = `translate3d(0px, 0px, 0px) rotate(${baseRot}deg)`;
      });
    });
  }

  // 2. Animated Stats Counter
  const statsNumbers = document.querySelectorAll(".stats-number");

  if (statsNumbers.length > 0) {
    const formatNumber = (val, countTo) => {
      if (countTo >= 1000000) {
        return (val / 1000000).toFixed(1) + "M";
      } else if (countTo >= 1000) {
        return (val / 1000).toFixed(0) + "K";
      }
      return val.toString();
    };

    const runCountUp = (element) => {
      const targetCount = parseFloat(element.getAttribute("data-count")) || 0;
      const prefix = element.getAttribute("data-prefix") || "";
      const suffix = element.getAttribute("data-suffix") || "";
      const duration = 2200; // duration in ms
      const startVal = 0;
      let startTime = null;

      const animateStep = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function - easeOutQuad
        const easedProgress = progress * (2 - progress);
        const currentProgressValue = startVal + easedProgress * (targetCount - startVal);

        let displayVal = "";
        if (targetCount % 1 === 0) {
          // integer
          const currentInt = Math.floor(currentProgressValue);
          displayVal = formatNumber(currentInt, targetCount);
        } else {
          // decimal
          const currentDec = currentProgressValue.toFixed(1);
          displayVal = currentDec;
        }

        element.textContent = `${prefix}${displayVal}${suffix}`;

        if (progress < 1) {
          window.requestAnimationFrame(animateStep);
        } else {
          // Finish exactly at precision
          const finalVal = formatNumber(targetCount, targetCount);
          element.textContent = `${prefix}${finalVal}${suffix}`;
        }
      };

      window.requestAnimationFrame(animateStep);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCountUp(entry.target);
          observer.unobserve(entry.target); // trigger animation only once
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    statsNumbers.forEach((num) => {
      counterObserver.observe(num);
    });
  }

  // ================================================================
  // PHASE 6 - INTERACTIVE AI SHOWCASE CODE
  // ================================================================
  const showcaseTabs = document.querySelectorAll(".btn-showcase-tab");
  const showcaseContents = document.querySelectorAll(".showcase-tab-content");

  if (showcaseTabs.length > 0 && showcaseContents.length > 0) {
    showcaseTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetTab = tab.getAttribute("data-tab");

        // Remove active state from all tabs and contents
        showcaseTabs.forEach(t => t.classList.remove("active"));
        showcaseContents.forEach(c => c.classList.remove("active"));

        // Add active to current
        tab.classList.add("active");
        const activeContent = document.getElementById(`tab-${targetTab}`);
        if (activeContent) {
          activeContent.classList.add("active");
        }
      });
    });
  }

  // AI Chat Interactivity
  const chatBody = document.getElementById("chat-mockup-body");
  const chatInput = document.getElementById("chat-showcase-input");
  const chatSendBtn = document.getElementById("btn-chat-showcase-send");
  const typingBubble = document.getElementById("chat-typing-bubble");
  const suggestedReplyBtns = document.querySelectorAll(".btn-suggested-reply");

  if (chatBody && (chatInput || chatSendBtn)) {
    
    const scrollToBottom = () => {
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    const appendMessage = (sender, text) => {
      const bubble = document.createElement("div");
      
      if (sender === "prospect") {
        bubble.className = "chat-message-bubble bubble-prospect align-self-start p-3 rounded text-sm";
        bubble.style.maxWidth = "80%";
        bubble.style.backgroundColor = "var(--bg-secondary)";
        bubble.style.borderRadius = "16px 16px 16px 4px";
        bubble.innerHTML = `
          <p class="mb-1">${text}</p>
          <span class="bubble-time font-mono text-muted d-block text-end" style="font-size: 0.65rem;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        `;
      } else {
        bubble.className = "chat-message-bubble bubble-ai align-self-end p-3 rounded text-sm text-end";
        bubble.style.maxWidth = "80%";
        bubble.style.backgroundColor = "rgba(217, 119, 6, 0.05)";
        bubble.style.border = "1px solid rgba(217, 119, 6, 0.15)";
        bubble.style.borderRadius = "16px 16px 4px 16px";
        bubble.style.textAlign = "left";
        bubble.innerHTML = `
          <div class="ai-badge-sm mb-1 font-mono text-warning text-xs font-bold"><i class="fa-solid fa-brain-circuit me-1"></i> AuraSales Agent</div>
          <p class="mb-1 text-secondary">${text}</p>
          <span class="bubble-time font-mono text-muted d-block text-end" style="font-size: 0.65rem;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        `;
      }

      // Insert before typing bubble
      chatBody.insertBefore(bubble, typingBubble);
      scrollToBottom();
    };

    const triggerAIResponse = (userText) => {
      // Show typing bubble
      typingBubble.classList.remove("d-none");
      scrollToBottom();

      let responseText = "That sounds great! Our AI Agent can coordinate the custom parameters and handle automatic qualification instantly.";
      
      if (userText.toLowerCase().includes("field mapping") || userText.toLowerCase().includes("integrate")) {
        responseText = "Absolutely! AuraSales supports dynamic field matching. Let me map those properties inside your Salesforce panel now.";
      } else if (userText.toLowerCase().includes("sync") || userText.toLowerCase().includes("minute")) {
        responseText = "Yes, syncs run in the background. Your custom webhook triggers will reflect across both databases in under 3 seconds!";
      } else if (userText.toLowerCase().includes("calendar") || userText.toLowerCase().includes("invite")) {
        responseText = "Sure! I will schedule a live integration walkthrough. What day next week works best for your team?";
      }

      setTimeout(() => {
        typingBubble.classList.add("d-none");
        appendMessage("ai", responseText);
      }, 1500);
    };

    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;

      appendMessage("prospect", text);
      chatInput.value = "";
      triggerAIResponse(text);
    };

    if (chatSendBtn) {
      chatSendBtn.addEventListener("click", handleSend);
    }

    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          handleSend();
        }
      });
    }

    // Suggested replies clicking
    if (suggestedReplyBtns.length > 0) {
      suggestedReplyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const replyText = btn.getAttribute("data-reply");
          appendMessage("prospect", replyText);
          
          // Disable all suggested buttons to prevent spamming
          suggestedReplyBtns.forEach(b => b.setAttribute("disabled", "true"));
          
          triggerAIResponse(replyText);
        });
      });
    }
  }

  // ================================================================
  // PHASE 7 - CORE FEATURES CATEGORY FILTER
  // ================================================================
  const filterBtns = document.querySelectorAll(".features-filter-btn");
  const featureItems = document.querySelectorAll(".feature-grid-item");

  if (filterBtns.length > 0 && featureItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");

        // Toggle active button style
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        featureItems.forEach(item => {
          const categoriesStr = item.getAttribute("data-categories") || "";
          const itemCategories = categoriesStr.split(" ");
          
          if (category === "all" || itemCategories.includes(category)) {
            item.classList.remove("filtered-out");
            // Force browser layout reflow to make transition visible
            void item.offsetWidth;
            item.style.opacity = "1";
            item.style.transform = "scale(1) translateY(0)";
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.95) translateY(10px)";
            
            const onTransitionEnd = () => {
              if (item.style.opacity === "0") {
                item.classList.add("filtered-out");
              }
              item.removeEventListener("transitionend", onTransitionEnd);
            };
            item.addEventListener("transitionend", onTransitionEnd);
          }
        });
      });
    });
  }

  // ================================================================
  // PHASE 8 - PREMIUM DASHBOARD LIVE INTERACTIVE SYSTEM
  // ================================================================
  
  // 1. Subtle Parallax effect on whole browser mockup window on mouse movement
  const browserMockupWrapper = document.querySelector(".browser-window-mockup-wrapper");
  const browserMockup = document.querySelector(".browser-window-mockup");
  
  if (browserMockupWrapper && browserMockup) {
    browserMockupWrapper.addEventListener("mousemove", (e) => {
      const rect = browserMockupWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate depth and rotation limits (tilt max 4 degrees for premium visual comfort)
      const rotateX = ((centerY - y) / centerY) * 3;
      const rotateY = ((x - centerX) / centerX) * -3;
      
      browserMockup.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
    
    browserMockupWrapper.addEventListener("mouseleave", () => {
      browserMockup.style.transform = "perspective(1500px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  }

  // 2. SVG Line Chart Tooltip Tracker
  const chartContainer = document.querySelector(".dashboard-svg-chart-container");
  const chartTooltip = document.querySelector("#chart-tooltip");
  
  if (chartContainer && chartTooltip) {
    const dataPoints = [
      { x: 30, y: 130, date: "Mon", value: "$18,240" },
      { x: 90, y: 100, date: "Tue", value: "$24,500" },
      { x: 150, y: 110, date: "Wed", value: "$22,100" },
      { x: 210, y: 60, date: "Thu", value: "$32,800" },
      { x: 270, y: 40, date: "Fri", value: "$41,200" },
      { x: 330, y: 55, date: "Sat", value: "$38,400" },
      { x: 390, y: 15, date: "Sun", value: "$48,900" }
    ];
    
    chartContainer.addEventListener("mousemove", (e) => {
      const rect = chartContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const containerWidth = rect.width;
      
      // Map mouse-X position to the closest dataset point
      const relativeX = (x / containerWidth) * 420; // 420 is the SVG viewbox width
      
      let closestPoint = dataPoints[0];
      let minDiff = Math.abs(relativeX - closestPoint.x);
      
      for (let i = 1; i < dataPoints.length; i++) {
        const diff = Math.abs(relativeX - dataPoints[i].x);
        if (diff < minDiff) {
          minDiff = diff;
          closestPoint = dataPoints[i];
        }
      }
      
      // Calculate absolute positions for tooltip display
      const tooltipX = (closestPoint.x / 420) * containerWidth;
      const tooltipY = (closestPoint.y / 160) * rect.height; // 160 is SVG viewbox height
      
      chartTooltip.innerHTML = `<strong>${closestPoint.date}</strong>: ${closestPoint.value}`;
      chartTooltip.style.left = `${tooltipX}px`;
      chartTooltip.style.top = `${tooltipY}px`;
      chartTooltip.style.opacity = "1";
    });
    
    chartContainer.addEventListener("mouseleave", () => {
      chartTooltip.style.opacity = "0";
    });
  }

  // 3. Dynamic Funnel Row Progress Loading on Scroll / Intersect
  const funnelRows = document.querySelectorAll(".funnel-row");
  if (funnelRows.length > 0) {
    const triggerFunnelLoading = () => {
      funnelRows.forEach(row => {
        const targetWidth = row.getAttribute("data-target-width") || "100%";
        row.style.width = targetWidth;
      });
    };
    
    // Intersection observer to animate funnel beautifully on viewport entry
    const funnelObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(triggerFunnelLoading, 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const funnelSection = document.querySelector(".funnel-container");
    if (funnelSection) {
      funnelObserver.observe(funnelSection);
    }
  }

  // 4. Live Changing Numeric Values & KPI Counter Animations
  const kpiRevenue = document.querySelector("#dashboard-kpi-revenue");
  const kpiLeads = document.querySelector("#dashboard-kpi-leads");
  const kpiMeetings = document.querySelector("#dashboard-kpi-meetings");
  const kpiConversion = document.querySelector("#dashboard-kpi-conversion");
  
  if (kpiRevenue || kpiLeads || kpiMeetings || kpiConversion) {
    // Start with realistic baseline counters on entry
    let revVal = 124850;
    let leadsVal = 2840;
    let meetingsVal = 412;
    let conversionVal = 24.6;
    
    // Periodic subtle random ticks mimicking live production events
    setInterval(() => {
      if (Math.random() > 0.4) {
        // Increment revenue by random value
        const revInc = Math.floor(Math.random() * 250) + 50;
        revVal += revInc;
        if (kpiRevenue) {
          kpiRevenue.innerHTML = `$${revVal.toLocaleString()}`;
          // Temporarily spark success styling on value change
          kpiRevenue.classList.add("text-success");
          setTimeout(() => kpiRevenue.classList.remove("text-success"), 1200);
        }
        
        // Randomly increment leads
        if (Math.random() > 0.5) {
          leadsVal += 1;
          if (kpiLeads) {
            kpiLeads.innerHTML = leadsVal.toLocaleString();
            kpiLeads.classList.add("text-success");
            setTimeout(() => kpiLeads.classList.remove("text-success"), 1200);
          }
        }
        
        // Randomly increment meetings
        if (Math.random() > 0.8) {
          meetingsVal += 1;
          if (kpiMeetings) {
            kpiMeetings.innerHTML = meetingsVal.toLocaleString();
            kpiMeetings.classList.add("text-warning");
            setTimeout(() => kpiMeetings.classList.remove("text-warning"), 1200);
            
            // Trigger floating notification for new meeting booked!
            triggerFloatingNotification(`New Meeting Confirmed with Enterprise Prospect!`);
          }
        }
        
        // Micro adjustment to conversion rate
        if (Math.random() > 0.85) {
          const rateAdjust = (Math.random() * 0.2 - 0.08);
          conversionVal = parseFloat((conversionVal + rateAdjust).toFixed(1));
          if (kpiConversion) {
            kpiConversion.innerHTML = `${conversionVal}%`;
          }
        }
      }
    }, 6000);
  }

  // 5. Simulated Real-time AI Chat Conversation Experience with Typing Indicators
  const chatMessagesContainer = document.querySelector("#dashboard-live-chat-messages");
  const chatTypingIndicator = document.querySelector("#dashboard-chat-typing-indicator");
  
  if (chatMessagesContainer && chatTypingIndicator) {
    const liveConversationFlow = [
      { sender: "prospect", text: "Hi, does your agent integration cover HubSpot bidirectional sync?", delay: 3000 },
      { sender: "ai", text: "Yes! AuraSales performs a dual-handshake bidirectional sync. Updates on lead score, meeting status, and email outcomes mirror to HubSpot instantly.", delay: 4500 },
      { sender: "prospect", text: "Awesome. I'll book a slot for the demo today.", delay: 3500 },
      { sender: "ai", text: "Perfect. I've automatically suggested a slot that fits your current calendar block at 2 PM.", delay: 4000 }
    ];
    
    let conversationIndex = 0;
    
    const triggerNextMessage = () => {
      if (conversationIndex >= liveConversationFlow.length) {
        // Reset/Loop simulation after finishing
        setTimeout(() => {
          chatMessagesContainer.innerHTML = `
            <div class="chat-bubble-mini">Hi, how does the scheduling flow work?</div>
            <div class="chat-bubble-mini ai">AuraSales scans prospect calendar zones, checks availability bounds, and locks in demos instantly.</div>
          `;
          conversationIndex = 0;
          triggerNextMessage();
        }, 8000);
        return;
      }
      
      const currentMsg = liveConversationFlow[conversationIndex];
      
      // Show typing indicator
      chatTypingIndicator.classList.remove("d-none");
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      
      setTimeout(() => {
        // Hide typing indicator
        chatTypingIndicator.classList.add("d-none");
        
        // Create message elements
        const bubble = document.createElement("div");
        bubble.className = `chat-bubble-mini ${currentMsg.sender === "ai" ? "ai" : ""}`;
        bubble.textContent = currentMsg.text;
        
        chatMessagesContainer.appendChild(bubble);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        
        // Unread badge increment
        const unreadBadge = document.querySelector("#dashboard-chat-unread-badge");
        if (unreadBadge && currentMsg.sender === "prospect") {
          const currentCount = parseInt(unreadBadge.textContent, 10) || 0;
          unreadBadge.textContent = (currentCount + 1).toString();
          unreadBadge.classList.add("bg-warning");
          setTimeout(() => unreadBadge.classList.remove("bg-warning"), 1000);
        }
        
        conversationIndex++;
        // Queue next one
        setTimeout(triggerNextMessage, currentMsg.delay);
        
      }, 1500); // 1.5s typing delay simulation
    };
    
    // Start after initial delay
    setTimeout(triggerNextMessage, 5000);
  }

  // 6. Floating Notification Toast trigger function
  const dashboardToast = document.querySelector("#dashboard-toast");
  
  function triggerFloatingNotification(messageText) {
    if (!dashboardToast) return;
    
    const toastMessage = dashboardToast.querySelector(".toast-alert-message");
    if (toastMessage) {
      toastMessage.textContent = messageText;
    }
    
    dashboardToast.classList.add("show");
    
    // Auto-dismiss after 4.5 seconds
    setTimeout(() => {
      dashboardToast.classList.remove("show");
    }, 4500);
  }
  
  // Close button trigger on floating toast
  const toastCloseBtn = document.querySelector("#dashboard-toast-close");
  if (toastCloseBtn && dashboardToast) {
    toastCloseBtn.addEventListener("click", () => {
      dashboardToast.classList.remove("show");
    });
  }
  
  // Kickstart an initial teaser notification
  setTimeout(() => {
    triggerFloatingNotification("Sales AI initialized. Live pipeline synchronized with CRM.");
  }, 3500);

  // 7. Interactive Quick Actions in Dashboard Recommendation Card
  const quickActionBtn = document.querySelector("#dashboard-quick-action-btn");
  const actionBadge = document.querySelector("#crm-sync-badge");
  
  if (quickActionBtn) {
    quickActionBtn.addEventListener("click", () => {
      // Create instant feedback animations
      quickActionBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin me-2"></i> Syncing Salesforce...`;
      quickActionBtn.setAttribute("disabled", "true");
      
      setTimeout(() => {
        quickActionBtn.innerHTML = `<i class="fa-solid fa-check me-2"></i> Synced Successfully`;
        quickActionBtn.classList.remove("btn-premium");
        quickActionBtn.classList.add("btn-premium-outline");
        
        if (actionBadge) {
          actionBadge.textContent = "CRM Synced";
          actionBadge.classList.remove("bg-light", "text-muted");
          actionBadge.classList.add("bg-success", "text-white");
        }
        
        // Add item to Activity Timeline
        const activityTimeline = document.querySelector("#dashboard-timeline-list");
        if (activityTimeline) {
          const newActivity = document.createElement("li");
          newActivity.className = "mb-2 ps-3 position-relative";
          newActivity.style.borderLeft = "1.5px solid var(--accent-emerald)";
          newActivity.innerHTML = `
            <span class="d-block text-muted font-mono" style="font-size: 0.6rem;">JUST NOW</span>
            <span style="font-size: 0.72rem; font-weight: 500;">CRM Bidirectional Handshake Completed</span>
          `;
          activityTimeline.insertBefore(newActivity, activityTimeline.firstChild);
        }
        
        triggerFloatingNotification("Salesforce accounts mapped & matched successfully!");
      }, 1600);
    });
  }

  // 8. Custom Ripple Effect on Interactive Action Buttons
  const rippleButtons = document.querySelectorAll(".btn-premium, .btn-premium-outline");
  rippleButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = "0px";
      ripple.style.height = "0px";
      ripple.style.borderRadius = "50%";
      ripple.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.transition = "width 0.5s ease-out, height 0.5s ease-out, opacity 0.5s ease-out";
      ripple.style.pointerEvents = "none";
      
      // Append ripple style to head or set style dynamically
      btn.style.position = "relative";
      btn.style.overflow = "hidden";
      btn.appendChild(ripple);
      
      // Force browser reflow to animate properly
      void ripple.offsetWidth;
      
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.opacity = "0";
      
      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });

  // =================================================================
  // PHASE 9 - AI SALES CONVERSATION SIMULATION INTERACTIVE ENGINE
  // =================================================================
  const chatMessagesStream = document.getElementById("chat-messages-stream");
  const chatTypingIndicatorWrapper = document.getElementById("chat-typing-indicator-wrapper");
  const thinkingTextLabel = document.getElementById("thinking-text-label");
  const chatQuickRepliesWrapper = document.getElementById("chat-quick-replies-wrapper");
  const chatReplayBtn = document.getElementById("chat-replay-btn");

  const scoreValEl = document.getElementById("score-val");
  const crmValEl = document.getElementById("crm-val");
  const bookingValEl = document.getElementById("booking-val");

  const panelLeadScore = document.getElementById("panel-lead-score");
  const panelCrmStatus = document.getElementById("panel-crm-status");
  const panelBookingStatus = document.getElementById("panel-booking-status");

  const conversationData = [
    {
      sender: "ai",
      text: "Hello! I'm Sophia, your virtual sales assistant. Thanks for dropping by! I can help answer pricing questions, check our integrations, or schedule a custom walkthrough. What can I help you with today?",
      typingMs: 1400,
      analysis: "Sophia is active...",
      quickReplies: ["How much does it cost?", "Do you support HubSpot?", "Can I book a demo?"],
      updates: { score: "35 / 100", crm: "Monitoring visitor", booking: "Unscheduled" }
    },
    {
      sender: "user",
      text: "How much does it cost? Do you have custom pricing for scale-ups?",
      typingMs: 1100,
      updates: { score: "48 / 100" }
    },
    {
      sender: "ai",
      text: "AuraSales has three simple tiers: Professional at $89/mo per seat, Growth at $189/mo, and custom Enterprise agreements. For scale-ups, our Growth plan is highly recommended—it includes unlimited outbound runs and full bi-directional CRM syncing. What's your current team size?",
      typingMs: 2000,
      analysis: "Analyzing budget intent...",
      quickReplies: ["10 - 50 seats", "50+ seats", "Just testing things out"],
      updates: { score: "62 / 100", crm: "Analyzing lead metrics" }
    },
    {
      sender: "user",
      text: "We are currently 25 reps. Also, do you support Salesforce and HubSpot CRM integration?",
      typingMs: 1100,
      updates: { score: "78 / 100" }
    },
    {
      sender: "ai",
      text: "That's a perfect fit! Yes, we offer deep, bi-directional Salesforce and HubSpot integrations. AuraSales automatically syncs prospect records, maps custom fields, logs outbound conversation histories, and updates sales stages without manual entry. Would you like to see a live demo of how the sync works?",
      typingMs: 2200,
      analysis: "Matching CRM schemas...",
      quickReplies: ["Yes, I'd love a demo!", "How is data privacy handled?"],
      updates: { score: "88 / 100", crm: "HubSpot schema matched" }
    },
    {
      sender: "user",
      text: "Yes, I'd love a demo! What times do you have open this week?",
      typingMs: 900,
      updates: { score: "94 / 100" }
    },
    {
      sender: "ai",
      text: "I have three slots open this Thursday and Friday. All sessions include a live walkthrough of the CRM sync and custom agent creation. Which of these works best for you?",
      typingMs: 1800,
      analysis: "Checking calendar slots...",
      options: [
        "Thursday, 2:00 PM EST",
        "Thursday, 4:30 PM EST",
        "Friday, 11:00 AM EST"
      ],
      updates: { score: "98 / 100", booking: "Selecting time..." }
    },
    {
      sender: "user",
      text: "Thursday at 2:00 PM EST works great for me.",
      typingMs: 900,
      updates: { score: "100 / 100" }
    },
    {
      sender: "ai",
      text: "Excellent choice! I've booked your Demo for Thursday at 2:00 PM EST and sent an invite to your email. I've also synchronized your contact card and conversation history directly to your pipeline as a 'High Intent' deal.",
      typingMs: 1800,
      analysis: "Locking calendar invite...",
      updates: { score: "100 (Hot Prospect)", crm: "Synced to CRM (Won)", booking: "Thurs @ 2:00 PM EST" }
    }
  ];

  let currentStep = 0;
  let chatTimeout = null;
  let isDemoPlaying = false;

  const triggerPanelFeedback = (panel) => {
    if (!panel) return;
    panel.classList.add("pulse-glow-amber");
    setTimeout(() => {
      panel.classList.remove("pulse-glow-amber");
    }, 1000);
  };

  const updateStatusPanels = (updates) => {
    if (!updates) return;
    if (updates.score) {
      if (scoreValEl) scoreValEl.textContent = updates.score;
      triggerPanelFeedback(panelLeadScore);
    }
    if (updates.crm) {
      if (crmValEl) crmValEl.textContent = updates.crm;
      triggerPanelFeedback(panelCrmStatus);
    }
    if (updates.booking) {
      if (bookingValEl) bookingValEl.textContent = updates.booking;
      triggerPanelFeedback(panelBookingStatus);
    }
  };

  const scrollToBottom = () => {
    if (chatMessagesStream) {
      chatMessagesStream.scrollTop = chatMessagesStream.scrollHeight;
    }
  };

  const createAvatarImg = (sender) => {
    const img = document.createElement("img");
    img.className = "chat-avatar-mini";
    if (sender === "ai") {
      img.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80";
      img.alt = "Sophia AI";
    } else {
      img.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80";
      img.alt = "Visitor";
    }
    img.referrerPolicy = "no-referrer";
    return img;
  };

  const formatTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  const appendMessage = (sender, text, hasOptions = false, optionsArray = []) => {
    if (!chatMessagesStream) return;
    const wrapper = document.createElement("div");
    wrapper.className = `chat-message-bubble-wrapper ${sender}-bubble`;

    wrapper.appendChild(createAvatarImg(sender));

    const msgContent = document.createElement("div");
    msgContent.className = "chat-message-content";

    const bubbleBody = document.createElement("div");
    bubbleBody.className = "chat-bubble-body shadow-sm";
    bubbleBody.textContent = text;
    msgContent.appendChild(bubbleBody);

    if (hasOptions && optionsArray.length > 0) {
      const optionsWrapper = document.createElement("div");
      optionsWrapper.className = "chat-custom-options-wrapper";
      optionsArray.forEach((optionText) => {
        const optBtn = document.createElement("button");
        optBtn.className = "chat-custom-option-btn";
        optBtn.innerHTML = `<span>${optionText}</span> <i class="fa-solid fa-calendar-days"></i>`;
        
        optBtn.addEventListener("click", () => {
          if (optBtn.classList.contains("selected")) return;
          optionsWrapper.querySelectorAll(".chat-custom-option-btn").forEach(btn => btn.classList.remove("selected"));
          optBtn.classList.add("selected");
          if (isDemoPlaying && currentStep === 7) {
            handleQuickReplyClick(optionText);
          }
        });
        optionsWrapper.appendChild(optBtn);
      });
      msgContent.appendChild(optionsWrapper);
    }

    const meta = document.createElement("div");
    meta.className = "chat-bubble-meta";
    const nameLabel = sender === "ai" ? "Sophia" : "Visitor";
    meta.innerHTML = `${nameLabel} &bull; ${formatTime()}`;
    if (sender === "user") {
      meta.innerHTML += ` &bull; <span class="chat-read-status font-mono"><i class="fa-solid fa-check-double"></i> Read</span>`;
    }
    msgContent.appendChild(meta);

    wrapper.appendChild(msgContent);
    chatMessagesStream.appendChild(wrapper);
    scrollToBottom();
  };

  const showTypingIndicator = (analysisText) => {
    if (chatTypingIndicatorWrapper) {
      if (analysisText && thinkingTextLabel) {
        thinkingTextLabel.textContent = analysisText;
      } else if (thinkingTextLabel) {
        thinkingTextLabel.textContent = "Sophia is analyzing...";
      }
      chatTypingIndicatorWrapper.classList.remove("d-none");
      scrollToBottom();
    }
  };

  const hideTypingIndicator = () => {
    if (chatTypingIndicatorWrapper) {
      chatTypingIndicatorWrapper.classList.add("d-none");
    }
  };

  const clearQuickReplies = () => {
    if (chatQuickRepliesWrapper) {
      chatQuickRepliesWrapper.innerHTML = "";
    }
  };

  const showQuickReplies = (replies) => {
    clearQuickReplies();
    if (!replies || replies.length === 0 || !chatQuickRepliesWrapper) return;

    replies.forEach(replyText => {
      const pill = document.createElement("button");
      pill.className = "chat-quick-reply-pill";
      pill.textContent = replyText;
      pill.addEventListener("click", () => handleQuickReplyClick(replyText));
      chatQuickRepliesWrapper.appendChild(pill);
    });
  };

  const runConversationStep = () => {
    if (!isDemoPlaying || currentStep >= conversationData.length) {
      isDemoPlaying = false;
      return;
    }

    const stepData = conversationData[currentStep];
    
    if (stepData.sender === "ai") {
      showTypingIndicator(stepData.analysis);
      chatTimeout = setTimeout(() => {
        hideTypingIndicator();
        
        const hasOpts = !!stepData.options;
        appendMessage("ai", stepData.text, hasOpts, stepData.options || []);
        updateStatusPanels(stepData.updates);

        currentStep++;
        if (stepData.quickReplies) {
          showQuickReplies(stepData.quickReplies);
        } else if (currentStep < conversationData.length) {
          chatTimeout = setTimeout(runConversationStep, 1500);
        }
      }, stepData.typingMs);
    } else {
      chatTimeout = setTimeout(() => {
        appendMessage("user", stepData.text);
        updateStatusPanels(stepData.updates);
        currentStep++;
        chatTimeout = setTimeout(runConversationStep, 1000);
      }, stepData.typingMs);
    }
  };

  const handleQuickReplyClick = (replyText) => {
    clearQuickReplies();
    appendMessage("user", replyText);
    currentStep++;
    isDemoPlaying = true;
    runConversationStep();
  };

  const resetChatDemo = () => {
    isDemoPlaying = false;
    clearTimeout(chatTimeout);
    
    if (chatMessagesStream) chatMessagesStream.innerHTML = "";
    clearQuickReplies();
    hideTypingIndicator();

    if (scoreValEl) scoreValEl.textContent = "Score: 35";
    if (crmValEl) crmValEl.textContent = "Monitoring";
    if (bookingValEl) bookingValEl.textContent = "Unscheduled";
    
    currentStep = 0;
  };

  const startChatDemo = () => {
    resetChatDemo();
    isDemoPlaying = true;
    runConversationStep();
  };

  const chatDemoSec = document.getElementById("chat-demo-section");
  if (chatDemoSec) {
    let hasTriggeredOnce = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTriggeredOnce) {
          hasTriggeredOnce = true;
          startChatDemo();
        }
      });
    }, { threshold: 0.35 });
    
    observer.observe(chatDemoSec);
  }

  if (chatReplayBtn) {
    chatReplayBtn.addEventListener("click", () => {
      startChatDemo();
    });
  }

  // =================================================================
  // PHASE 10 - INTERACTIVE INDUSTRY SOLUTIONS ENGINE
  // =================================================================
  const industrySolutionsData = {
    saas: {
      badge: "SaaS & B2B",
      heading: "High-growth SaaS Outbound Automation",
      icon: "fa-solid fa-cloud",
      cta: "Deploy SaaS Agent",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80",
      quote: '"AuraSales automated 80% of our security Q&A and tripled our qualified demo bookings in 30 days."',
      author: "Sarah Jenkins",
      company: "SaaSify Inc.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&h=120&q=80",
      metrics: [
        { tag: "QUALIFIED LEADS", val: 1240, suffix: "", percent: "+18% MoM" },
        { tag: "REVENUE RECOVERY", val: 45000, prefix: "$", percent: "High Efficiency" },
        { tag: "MEETINGS BOOKED", val: 312, suffix: "", percent: "Automated Sync" },
        { tag: "CONVERSION RATE", val: 24.5, suffix: "%", percent: "+4.2% lift" }
      ],
      userChat: "Does your software support SSO and SOC2 Type II compliance?",
      aiChat: "Yes! AuraSales supports SAML SSO and we are SOC2 Type II certified. I can send our compliance deck or book a call.",
      aiAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80",
      tools: ["SSO Auto-verifier", "Compliance Engine", "Enterprise Router"]
    },
    realestate: {
      badge: "Real Estate",
      heading: "Autonomous Buyer Qualification & Tour Booking",
      icon: "fa-solid fa-house-chimney",
      cta: "Deploy Estate Agent",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&h=400&q=80",
      quote: '"Physical viewings are now booked instantly. No more back-and-forth emails while properties sell."',
      author: "David Vance",
      company: "Apex Realty",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&h=120&q=80",
      metrics: [
        { tag: "QUALIFIED BUYERS", val: 842, suffix: "", percent: "+22% MoM" },
        { tag: "CLOSED REVENUE", val: 180000, prefix: "$", percent: "In Pipeline" },
        { tag: "TOURS SCHEDULED", val: 156, suffix: "", percent: "Auto-cal Sync" },
        { tag: "STAGE CONVERSION", val: 18.2, suffix: "%", percent: "+3.5% lift" }
      ],
      userChat: "Is the 3-bedroom property on Elm Street still available for a tour tomorrow?",
      aiChat: "Yes, 142 Elm Street is active! I have viewings open at 10 AM or 3 PM tomorrow. Which works best for your schedule?",
      aiAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
      tools: ["MLS Listing Sync", "Tour Scheduler", "Buyer Profiler"]
    },
    healthcare: {
      badge: "Healthcare",
      heading: "HIPAA-Compliant Patient Intake & Care Triage",
      icon: "fa-solid fa-heart-pulse",
      cta: "Deploy Care Agent",
      img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&h=400&q=80",
      quote: '"HIPAA-compliant patient intake is fully automated. Our medical staff saves 4 hours every single day."',
      author: "Dr. Elena Rostova",
      company: "Metro Health Group",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&h=120&q=80",
      metrics: [
        { tag: "QUALIFIED PATIENTS", val: 1890, suffix: "", percent: "+15% MoM" },
        { tag: "CARE EFFICIENCY", val: 35, suffix: "%", percent: "Time Saved" },
        { tag: "APPOINTMENTS BOOKED", val: 420, suffix: "", percent: "Direct EHR Sync" },
        { tag: "PATIENT SATISFACTION", val: 99.4, suffix: "%", percent: "Flawless Score" }
      ],
      userChat: "Do you accept Blue Shield insurance and have any general checkup times this week?",
      aiChat: "We do accept Blue Shield! I can verify your insurance instantly and book a slot with Dr. Chen this Wednesday.",
      aiAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80",
      tools: ["HIPAA Shield", "Insurance Verifier", "Clinical Router"]
    },
    education: {
      badge: "Education & Academies",
      heading: "Dynamic Curriculum Guide & Advisor Routing",
      icon: "fa-solid fa-graduation-cap",
      cta: "Deploy Academy Agent",
      img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80",
      quote: '"AuraSales handles thousands of curriculum questions, freeing admissions reps to close high-value enrolments."',
      author: "Marcus Thorne",
      company: "Nexus Academy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
      metrics: [
        { tag: "QUALIFIED PROSPECTS", val: 920, suffix: "", percent: "+30% MoM" },
        { tag: "ENROLLED STUDENTS", val: 112, suffix: "", percent: "In Progress" },
        { tag: "ADVISORY CALLS", val: 280, suffix: "", percent: "Fully Booked" },
        { tag: "ENGAGEMENT RATE", val: 42.1, suffix: "%", percent: "Industry Best" }
      ],
      userChat: "What are the prerequisites for the Data Science bootcamp, and is there financial aid?",
      aiChat: "You just need basic Python! We offer flexible monthly payment plans and scholarship options. Let's schedule an advisor chat.",
      aiAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80",
      tools: ["Curriculum QA", "Scholarship Triage", "Advisor Scheduler"]
    },
    ecommerce: {
      badge: "E-commerce",
      heading: "Interactive Cart Rescue & Product Recommendation",
      icon: "fa-solid fa-cart-shopping",
      cta: "Deploy Commerce Agent",
      img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&h=400&q=80",
      quote: '"Our cart abandonment rates plummeted by 35% after we set up interactive, personalized discounts."',
      author: "Clara Zhang",
      company: "VogueThreads",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&h=120&q=80",
      metrics: [
        { tag: "CARTS RECOVERED", val: 430, suffix: "", percent: "+28% MoM" },
        { tag: "SALES REVENUE", val: 85000, prefix: "$", percent: "High Recovery" },
        { tag: "SUPPORT RESOLVED", val: 2450, suffix: "", percent: "24/7 Autopilot" },
        { tag: "CART CONVERSION", val: 31.4, suffix: "%", percent: "+5.1% lift" }
      ],
      userChat: "Is the leather jacket water-resistant, and what is your return policy?",
      aiChat: "It is premium water-resistant leather! We offer free 30-day returns. Use code SAVE10 for 10% off if you order now!",
      aiAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
      tools: ["Cart Saver", "Shopify Real-time", "Promo Engine"]
    },
    finance: {
      badge: "Finance & Wealth",
      heading: "Secure Loan Qualification & Advisory Handshakes",
      icon: "fa-solid fa-coins",
      cta: "Deploy Wealth Agent",
      img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&h=400&q=80",
      quote: '"Fintech lead qualification requires absolute precision and compliance. AuraSales passed our SEC audit with flying colors."',
      author: "Julian Croft",
      company: "Aegis Wealth",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80",
      metrics: [
        { tag: "PRE-QUALIFIED LEADS", val: 650, suffix: "", percent: "+14% MoM" },
        { tag: "ASSETS ONBOARDED", val: 2.4, prefix: "$", suffix: "M", percent: "Secure Portfolios" },
        { tag: "CONSULTATIONS BOOKED", val: 185, suffix: "", percent: "Direct Calendar Sync" },
        { tag: "SEC AUDIT SCORE", val: 100, suffix: "%", percent: "Fully Compliant" }
      ],
      userChat: "What are your management fees for portfolios above $500k? Is it compliant?",
      aiChat: "For portfolios over $500k, our advisory fee is only 0.65%. We are fully SEC-registered and audited. I can schedule a private session.",
      aiAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80",
      tools: ["SEC Compliance Engine", "Fee Calculator", "Wealth Router"]
    },
    travel: {
      badge: "Travel & Hospitality",
      heading: "Immersive Itinerary Building & Package Sales",
      icon: "fa-solid fa-plane",
      cta: "Deploy Travel Agent",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80",
      quote: '"Having AuraSales suggest custom packages in real-time boosted vacation bookings by 40%."',
      author: "Sophia Loren",
      company: "Wanderlust Escapes",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80",
      metrics: [
        { tag: "BOOKED PACKAGES", val: 310, suffix: "", percent: "+25% MoM" },
        { tag: "REVENUE RECORDED", val: 120000, prefix: "$", percent: "Holiday Deals" },
        { tag: "INQUIRIES ANSWERED", val: 1120, suffix: "", percent: "Zero Backlog" },
        { tag: "BOOKING RATE", val: 19.5, suffix: "%", percent: "+3.8% lift" }
      ],
      userChat: "I'm looking for a 5-day family resort package in Hawaii under $4,000. Any options?",
      aiChat: "Yes! I have an all-inclusive Maui beach resort package with kids-play-free for $3,750. Would you like details?",
      aiAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
      tools: ["Itinerary Builder", "Budget Planner", "Resort Finder"]
    },
    marketing: {
      badge: "Marketing Agencies",
      heading: "Inbound Budget Triage & Automated SEO Audits",
      icon: "fa-solid fa-bullhorn",
      cta: "Deploy Agency Agent",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80",
      quote: '"We used to waste hours on low-budget leads. AuraSales pre-qualifies everyone and books only high-tier retainers."',
      author: "Thomas Stern",
      company: "Vanguard Digital",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80",
      metrics: [
        { tag: "QUALIFIED CLIENTS", val: 480, suffix: "", percent: "+32% MoM" },
        { tag: "RETAINER SALES", val: 95000, prefix: "$", percent: "Ongoing MRR" },
        { tag: "AUDITS SCHEDULED", val: 210, suffix: "", percent: "Fully Automated" },
        { tag: "AUDIT TO DEAL CONVERSION", val: 27.8, suffix: "%", percent: "+6.5% lift" }
      ],
      userChat: "We want to scale our ad spend to $20k/mo. Do you offer custom SEO audits?",
      aiChat: "We absolutely do! Our SEO audits have driven over 4x ROI for similar brands. Let's lock in a free discovery session.",
      aiAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80",
      tools: ["Audit Scheduler", "Budget Triage", "ROI Predictor"]
    }
  };

  const industryNavCards = document.querySelectorAll(".solutions-section .industry-nav-card");
  
  const previewIndustryIcon = document.getElementById("preview-industry-icon");
  const previewIndustryBadge = document.getElementById("preview-industry-badge");
  const previewIndustryHeading = document.getElementById("preview-industry-heading");
  const previewIndustryCtaBtn = document.getElementById("preview-industry-cta-btn");
  const previewIndustryImg = document.getElementById("preview-industry-img");
  
  const previewTestimonialAvatar = document.getElementById("preview-testimonial-avatar");
  const previewTestimonialQuote = document.getElementById("preview-testimonial-quote");
  const previewTestimonialAuthor = document.getElementById("preview-testimonial-author");
  const previewTestimonialCompany = document.getElementById("preview-testimonial-company");
  
  const previewChatUserText = document.getElementById("preview-chat-user-text");
  const previewChatAiText = document.getElementById("preview-chat-ai-text");
  const previewChatAiAvatar = document.getElementById("preview-chat-ai-avatar");
  
  const previewToolsTags = document.getElementById("preview-tools-tags");
  const flowLineAnim = document.getElementById("flow-line-anim");

  const animateCountValue = (element, start, end, duration, prefix = "", suffix = "") => {
    if (!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentVal = start + progress * (end - start);
      
      if (Number.isInteger(end)) {
        element.textContent = `${prefix}${Math.floor(currentVal).toLocaleString()}${suffix}`;
      } else {
        element.textContent = `${prefix}${currentVal.toFixed(1)}${suffix}`;
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
      }
    };
    window.requestAnimationFrame(step);
  };

  const triggerFlowNodesTransition = () => {
    const nodes = document.querySelectorAll(".solutions-section .flow-node");
    nodes.forEach((node, idx) => {
      node.classList.remove("active");
      setTimeout(() => {
        node.classList.add("active");
      }, idx * 250);
    });

    if (flowLineAnim) {
      flowLineAnim.style.animation = 'none';
      void flowLineAnim.offsetWidth; // Trigger reflow
      flowLineAnim.style.animation = 'flowFillAnim 4s infinite linear';
    }
  };

  const updateIndustryPreview = (industryKey) => {
    const data = industrySolutionsData[industryKey];
    if (!data) return;

    // Apply fade-out class to elements
    const fadeElements = [
      previewIndustryBadge,
      previewIndustryHeading,
      previewIndustryImg,
      previewTestimonialAvatar,
      previewTestimonialQuote,
      previewTestimonialAuthor,
      previewTestimonialCompany,
      previewChatUserText,
      previewChatAiText,
      previewToolsTags
    ];

    fadeElements.forEach(el => {
      if (el) el.classList.add("fade-out", "transition-fade");
    });

    setTimeout(() => {
      // Update general text info
      if (previewIndustryBadge) previewIndustryBadge.textContent = data.badge;
      if (previewIndustryHeading) previewIndustryHeading.textContent = data.heading;
      
      if (previewIndustryCtaBtn) {
        const spanEl = previewIndustryCtaBtn.querySelector("span");
        if (spanEl) spanEl.textContent = data.cta;
      }

      if (previewIndustryIcon) {
        previewIndustryIcon.innerHTML = `<i class="${data.icon}"></i>`;
        // Apply different subtle background classes dynamically if needed
      }

      if (previewIndustryImg) {
        previewIndustryImg.src = data.img;
        previewIndustryImg.alt = `${data.badge} Illustration`;
      }

      // Update testimonial
      if (previewTestimonialAvatar) previewTestimonialAvatar.src = data.avatar;
      if (previewTestimonialQuote) previewTestimonialQuote.textContent = data.quote;
      if (previewTestimonialAuthor) previewTestimonialAuthor.textContent = data.author;
      if (previewTestimonialCompany) previewTestimonialCompany.textContent = data.company;

      // Update metrics
      data.metrics.forEach((metric, idx) => {
        const num = idx + 1;
        const tagEl = document.getElementById(`metric-tag-${num}`);
        const valEl = document.getElementById(`metric-val-${num}`);
        const percentEl = document.getElementById(`metric-percent-${num}`);

        if (tagEl) tagEl.textContent = metric.tag;
        if (percentEl) percentEl.textContent = metric.percent;

        if (valEl) {
          const prefix = metric.prefix || "";
          const suffix = metric.suffix || "";
          animateCountValue(valEl, 0, metric.val, 800, prefix, suffix);
        }
      });

      // Trigger sequential node flow transition
      triggerFlowNodesTransition();

      // Update chat previews
      if (previewChatUserText) previewChatUserText.textContent = `"${data.userChat}"`;
      if (previewChatAiText) previewChatAiText.textContent = `"${data.aiChat}"`;
      if (previewChatAiAvatar) previewChatAiAvatar.src = data.aiAvatar;

      // Update tags
      if (previewToolsTags) {
        previewToolsTags.innerHTML = "";
        data.tools.forEach(toolName => {
          const badge = document.createElement("span");
          badge.className = "badge bg-secondary font-mono text-dark border p-2";
          badge.textContent = toolName;
          previewToolsTags.appendChild(badge);
        });
      }

      // Fade-in the updated elements
      fadeElements.forEach(el => {
        if (el) el.classList.remove("fade-out");
      });

    }, 250);
  };

  // Attach card interaction listeners
  industryNavCards.forEach(card => {
    card.addEventListener("click", () => {
      if (card.classList.contains("active")) return;

      const previousActive = document.querySelector(".solutions-section .industry-nav-card.active");
      if (previousActive) previousActive.classList.remove("active");
      
      card.classList.add("active");
      
      const key = card.dataset.industry;
      updateIndustryPreview(key);
    });
  });

  // Pre-trigger flow transition on load
  const solutionsSectionEl = document.getElementById("industry-solutions-section");
  if (solutionsSectionEl) {
    let solTriggered = false;
    const solObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !solTriggered) {
          solTriggered = true;
          triggerFlowNodesTransition();
        }
      });
    }, { threshold: 0.25 });
    solObserver.observe(solutionsSectionEl);
  }

  if (chatReplayBtn) {
    chatReplayBtn.addEventListener("click", () => {
      startChatDemo();
    });
  }

  // =================================================================
  // PHASE 11 - INTERACTIVE HOW IT WORKS & WORKFLOW ENGINE
  // =================================================================
  const stepCards = document.querySelectorAll(".how-it-works-section .step-card-premium");
  const workflowNodes = document.querySelectorAll(".how-it-works-section .workflow-node-card");
  
  const aiConsoleTask = document.getElementById("ai-console-task");
  const aiConsoleConfidence = document.getElementById("ai-console-confidence");
  const aiConsoleRating = document.getElementById("ai-console-rating");
  const aiConsoleIntent = document.getElementById("ai-console-intent");
  const aiConsoleSentiment = document.getElementById("ai-console-sentiment");
  const aiConsoleStream = document.getElementById("ai-console-stream");
  const aiCoproprocessorTag = document.getElementById("ai-coprocessor-tag");

  let activeStepIndex = 0;
  let stepCycleInterval = null;
  let isUserInteracted = false;

  const stepDetails = [
    {
      task: "Configuring channel webhooks...",
      confidence: "99.2%",
      rating: "Tier-A Premium",
      intent: "Connecting Web Channel",
      sentiment: "Highly Positive (0.91)",
      nodes: [1, 4], // Active nodes in workflow
      log: "Channel connected. Tracking incoming session data."
    },
    {
      task: "Ingesting FAQ corpora...",
      confidence: "98.7%",
      rating: "Tier-A Premium",
      intent: "Knowledge Training",
      sentiment: "Neutral (0.50)",
      nodes: [2, 3],
      log: "Knowledge vectors created. Ingestion status: 100% complete."
    },
    {
      task: "Evaluating response intent...",
      confidence: "97.9%",
      rating: "Tier-A Premium",
      intent: "SLA Inquiry",
      sentiment: "Highly Positive (0.89)",
      nodes: [2, 3],
      log: "Intent matched with index SLA_v2_standard. Formulating optimal response."
    },
    {
      task: "Syncing Calendly slot...",
      confidence: "99.5%",
      rating: "Tier-A Premium",
      intent: "Meeting Scheduled",
      sentiment: "Highly Positive (0.96)",
      nodes: [5, 6, 7],
      log: "Calendar slot verified. Email invitation dispatch successful."
    },
    {
      task: "Finalizing signed contract...",
      confidence: "100.0%",
      rating: "Tier-A Closed",
      intent: "Contract Executed",
      sentiment: "Highly Positive (0.99)",
      nodes: [8],
      log: "Contract fully executed. Triggering closed won alert in slack channels."
    }
  ];

  const updateActiveStep = (index) => {
    // 1. Reset all step cards active class
    stepCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add("active");
        
        // Trigger the width animation inside nested progress lines if there are any
        const fills = card.querySelectorAll(".step-ill-progress-fill");
        fills.forEach(fill => {
          fill.style.width = "0%";
          setTimeout(() => { fill.style.width = "100%"; }, 50);
        });
      } else {
        card.classList.remove("active");
      }
    });

    const info = stepDetails[index];
    if (!info) return;

    // 2. Highlight matching workflow nodes
    workflowNodes.forEach((node) => {
      const nodeId = parseInt(node.id.replace("work-node-", ""));
      if (info.nodes.includes(nodeId)) {
        node.classList.add("active");
        // Ensure active pulse indicator is shown/updated
        const pulse = node.querySelector(".workflow-node-badge-pulse");
        if (!pulse) {
          node.insertAdjacentHTML("beforeend", `
            <span class="workflow-node-badge-pulse">
              <span class="workflow-node-pulse-dot"></span> Active
            </span>
          `);
        }
      } else {
        node.classList.remove("active");
        const pulse = node.querySelector(".workflow-node-badge-pulse");
        if (pulse) pulse.remove();
      }
    });

    // 3. Update Coprocessor Console Panel values
    if (aiConsoleTask) aiConsoleTask.textContent = info.task;
    if (aiConsoleConfidence) aiConsoleConfidence.textContent = info.confidence;
    if (aiConsoleIntent) aiConsoleIntent.textContent = info.intent;
    if (aiConsoleSentiment) aiConsoleSentiment.textContent = info.sentiment;
    
    if (aiConsoleRating) {
      aiConsoleRating.textContent = info.rating;
      if (index === 4) {
        aiConsoleRating.className = "badge bg-warning text-dark px-2 py-1 font-mono";
      } else {
        aiConsoleRating.className = "badge bg-emerald-subtle text-emerald px-2 py-1 font-mono";
      }
    }

    if (aiCoproprocessorTag) {
      if (index === 4) {
        aiCoproprocessorTag.textContent = "SUCCESS";
        aiCoproprocessorTag.className = "ai-panel-status-tag active";
      } else {
        aiCoproprocessorTag.textContent = "PROCESSING";
        aiCoproprocessorTag.className = "ai-panel-status-tag";
      }
    }

    // 4. Append to Stream log
    if (aiConsoleStream) {
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      
      const logDiv = document.createElement("div");
      logDiv.style.opacity = "0";
      logDiv.style.transform = "translateX(-5px)";
      logDiv.style.transition = "all 0.3s ease";
      logDiv.innerHTML = `<span class="text-muted">[${timeStr}]</span> ${info.log}`;
      
      aiConsoleStream.appendChild(logDiv);
      
      // Auto-scroll stream to bottom
      aiConsoleStream.scrollTop = aiConsoleStream.scrollHeight;
      
      // Fade in effect
      setTimeout(() => {
        logDiv.style.opacity = "1";
        logDiv.style.transform = "translateX(0)";
      }, 50);

      // Keep only last 12 entries to avoid heavy memory
      if (aiConsoleStream.children.length > 15) {
        aiConsoleStream.removeChild(aiConsoleStream.firstChild);
      }
    }
  };

  const startStepCycle = () => {
    if (stepCycleInterval) clearInterval(stepCycleInterval);
    stepCycleInterval = setInterval(() => {
      if (!isUserInteracted) {
        activeStepIndex = (activeStepIndex + 1) % stepCards.length;
        updateActiveStep(activeStepIndex);
      }
    }, 4500);
  };

  // Add click events on Step Cards
  stepCards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      isUserInteracted = true; // Stop automatic cycle
      activeStepIndex = idx;
      updateActiveStep(idx);

      // Add temporary subtle pulse indicator to warn user they locked focus
      if (aiCoproprocessorTag) {
        aiCoproprocessorTag.textContent = "CONSOLE MANUALLY LOCK";
        aiCoproprocessorTag.className = "ai-panel-status-tag";
      }
    });
  });

  // Observe intersection to kick off cycle
  const howSectionEl = document.getElementById("how-it-works-section");
  if (howSectionEl) {
    const howObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateActiveStep(activeStepIndex);
          startStepCycle();
          howObserver.unobserve(howSectionEl); // Trigger once
        }
      });
    }, { threshold: 0.15 });
    howObserver.observe(howSectionEl);
  }

  // =================================================================
  // PHASE 12 - PREMIUM INTEGRATIONS & API PANEL ENGINE
  // =================================================================
  const integrationSearchInput = document.getElementById("integration-search");
  const integrationFilterBtns = document.querySelectorAll("#integration-filters .filter-category-btn");
  const integrationCards = document.querySelectorAll("#integrations-grid-container .integration-card-wrapper");
  const integrationEmptyState = document.getElementById("integrations-no-results");

  let integrationCurrentCategory = "all";
  let integrationSearchQuery = "";

  const runIntegrationFiltering = () => {
    let visibleCount = 0;
    integrationCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category") || "";
      const cardName = card.getAttribute("data-name") || "";
      
      const categoryMatches = (integrationCurrentCategory === "all" || cardCategory === integrationCurrentCategory);
      const searchMatches = (integrationSearchQuery === "" || cardName.includes(integrationSearchQuery));

      if (categoryMatches && searchMatches) {
        card.classList.remove("d-none");
        // Trigger elegant fade scale-up
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        setTimeout(() => {
          card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 30);
        visibleCount++;
      } else {
        card.classList.add("d-none");
      }
    });

    if (visibleCount === 0) {
      if (integrationEmptyState) integrationEmptyState.classList.remove("d-none");
    } else {
      if (integrationEmptyState) integrationEmptyState.classList.add("d-none");
    }
  };

  // Search input events
  if (integrationSearchInput) {
    integrationSearchInput.addEventListener("input", (e) => {
      integrationSearchQuery = e.target.value.toLowerCase().trim();
      runIntegrationFiltering();
    });
  }

  // Filter category buttons
  integrationFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      integrationFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      integrationCurrentCategory = btn.getAttribute("data-filter") || "all";
      runIntegrationFiltering();
    });
  });

  // Global functions for API panel
  window.switchApiTab = (tab) => {
    const btnReq = document.getElementById("btn-tab-request");
    const btnRes = document.getElementById("btn-tab-response");
    const codeReq = document.getElementById("api-code-request");
    const codeRes = document.getElementById("api-code-response");

    if (tab === "request") {
      if (btnReq) btnReq.classList.add("active");
      if (btnRes) btnRes.classList.remove("active");
      if (codeReq) codeReq.classList.add("active");
      if (codeRes) codeRes.classList.remove("active");
    } else {
      if (btnReq) btnReq.classList.remove("active");
      if (btnRes) btnRes.classList.add("active");
      if (codeReq) codeReq.classList.remove("active");
      if (codeRes) codeRes.classList.add("active");
    }
  };

  window.copyApiCode = () => {
    const codeReq = document.getElementById("api-code-request");
    const codeRes = document.getElementById("api-code-response");
    const copyBtn = document.getElementById("api-copy-code-btn");
    
    let textToCopy = "";
    if (codeReq && codeReq.classList.contains("active")) {
      textToCopy = codeReq.innerText || codeReq.textContent;
    } else if (codeRes && codeRes.classList.contains("active")) {
      textToCopy = codeRes.innerText || codeRes.textContent;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      if (copyBtn) {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `<i class="fa-solid fa-check text-success"></i> Copied!`;
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 1800);
      }
    }).catch(err => {
      console.error("Failed to copy code payload: ", err);
    });
  };

  // =================================================================
  // PHASE 13 - INTERACTIVE ROI ESTIMATOR ENGINE
  // =================================================================
  const inputTeamSize = document.getElementById("input-team-size");
  const inputMonthlyLeads = document.getElementById("input-monthly-leads");
  const inputDealValue = document.getElementById("input-deal-value");
  const inputConversionRate = document.getElementById("input-conversion-rate");

  const valTeamSize = document.getElementById("val-team-size");
  const valMonthlyLeads = document.getElementById("val-monthly-leads");
  const valDealValue = document.getElementById("val-deal-value");
  const valConversionRate = document.getElementById("val-conversion-rate");

  const displayHoursSaved = document.getElementById("display-hours-saved");
  const displayRevenueIncrease = document.getElementById("display-revenue-increase");
  const displayMeetingsAutomated = document.getElementById("display-meetings-automated");
  const displayFollowupsAutomated = document.getElementById("display-followups-automated");

  const updateROICalculations = () => {
    if (!inputTeamSize || !inputMonthlyLeads || !inputDealValue || !inputConversionRate) return;

    const teamSize = parseInt(inputTeamSize.value, 10);
    const monthlyLeads = parseInt(inputMonthlyLeads.value, 10);
    const dealValue = parseInt(inputDealValue.value, 10);
    const conversionRate = parseFloat(inputConversionRate.value);

    // Update Slider Label Badges
    if (valTeamSize) valTeamSize.textContent = `${teamSize} Reps`;
    if (valMonthlyLeads) valMonthlyLeads.textContent = `${monthlyLeads.toLocaleString()} Leads`;
    if (valDealValue) valDealValue.textContent = `$${dealValue.toLocaleString()}`;
    if (valConversionRate) valConversionRate.textContent = `${conversionRate}%`;

    // 1. Hours Saved: ~16 hours per rep per month of data entry / routing
    const hoursSaved = teamSize * 16;
    if (displayHoursSaved) displayHoursSaved.textContent = `${hoursSaved.toLocaleString()} Hrs`;

    // 2. Potential Revenue Increase: assumes 35% conversion lift with AuraSales automation
    const traditionalRevenue = monthlyLeads * (conversionRate / 100) * dealValue;
    const revenueIncrease = Math.round(traditionalRevenue * 0.35);
    if (displayRevenueIncrease) displayRevenueIncrease.textContent = `$${revenueIncrease.toLocaleString()}`;

    // 3. Meetings Automated: ~15% of lead volume booked automatically
    const meetingsAutomated = Math.round(monthlyLeads * 0.15);
    if (displayMeetingsAutomated) displayMeetingsAutomated.textContent = meetingsAutomated.toLocaleString();

    // 4. Follow-ups Automated: ~3.8 follow-up/nurture messages per lead handled by AI
    const followupsAutomated = Math.round(monthlyLeads * 3.8);
    if (displayFollowupsAutomated) displayFollowupsAutomated.textContent = followupsAutomated.toLocaleString();
  };

  // Bind Input Observers
  if (inputTeamSize) inputTeamSize.addEventListener("input", updateROICalculations);
  if (inputMonthlyLeads) inputMonthlyLeads.addEventListener("input", updateROICalculations);
  if (inputDealValue) inputDealValue.addEventListener("input", updateROICalculations);
  if (inputConversionRate) inputConversionRate.addEventListener("input", updateROICalculations);

  // Run initial calculation sequence on load
  updateROICalculations();

  // =================================================================
  // PHASE 14 - PREMIUM PRICING EXPERIENCE ENGINE
  // =================================================================
  const btnToggleMonthly = document.getElementById("btn-toggle-monthly");
  const btnToggleYearly = document.getElementById("btn-toggle-yearly");

  const priceStarter = document.getElementById("price-starter");
  const priceProfessional = document.getElementById("price-professional");
  const priceBusiness = document.getElementById("price-business");

  const subtextStarter = document.getElementById("annual-subtext-starter");
  const subtextProfessional = document.getElementById("annual-subtext-professional");
  const subtextBusiness = document.getElementById("annual-subtext-business");

  const animatePriceTransition = (el, newVal) => {
    if (!el) return;
    el.style.transform = "scale(0.85)";
    el.style.opacity = "0.5";
    setTimeout(() => {
      el.textContent = newVal;
      el.style.transform = "scale(1)";
      el.style.opacity = "1";
    }, 150);
  };

  const updatePricingBilling = (billingType) => {
    if (billingType === "yearly") {
      if (btnToggleMonthly) btnToggleMonthly.classList.remove("active");
      if (btnToggleYearly) btnToggleYearly.classList.add("active");

      // Set Yearly Prices
      if (priceStarter) animatePriceTransition(priceStarter, priceStarter.getAttribute("data-yearly"));
      if (priceProfessional) animatePriceTransition(priceProfessional, priceProfessional.getAttribute("data-yearly"));
      if (priceBusiness) animatePriceTransition(priceBusiness, priceBusiness.getAttribute("data-yearly"));

      // Set Annual Subtext Details
      if (subtextStarter) subtextStarter.textContent = "Billed $372 annually (Save $96/yr)";
      if (subtextProfessional) subtextProfessional.textContent = "Billed $852 annually (Save $216/yr)";
      if (subtextBusiness) subtextBusiness.textContent = "Billed $1,812 annually (Save $456/yr)";

    } else {
      if (btnToggleYearly) btnToggleYearly.classList.remove("active");
      if (btnToggleMonthly) btnToggleMonthly.classList.add("active");

      // Set Monthly Prices
      if (priceStarter) animatePriceTransition(priceStarter, priceStarter.getAttribute("data-monthly"));
      if (priceProfessional) animatePriceTransition(priceProfessional, priceProfessional.getAttribute("data-monthly"));
      if (priceBusiness) animatePriceTransition(priceBusiness, priceBusiness.getAttribute("data-monthly"));

      // Clear subtext with simple non-breaking space
      if (subtextStarter) subtextStarter.innerHTML = "&nbsp;";
      if (subtextProfessional) subtextProfessional.innerHTML = "&nbsp;";
      if (subtextBusiness) subtextBusiness.innerHTML = "&nbsp;";
    }
  };

  if (btnToggleMonthly) {
    btnToggleMonthly.addEventListener("click", () => updatePricingBilling("monthly"));
  }
  if (btnToggleYearly) {
    btnToggleYearly.addEventListener("click", () => updatePricingBilling("yearly"));
  }

  // Pre-populate correct visual default empty strings for subtexts
  if (subtextStarter) subtextStarter.innerHTML = "&nbsp;";
  if (subtextProfessional) subtextProfessional.innerHTML = "&nbsp;";
  if (subtextBusiness) subtextBusiness.innerHTML = "&nbsp;";

  // =================================================================
  // PHASE 15 - PREMIUM CUSTOMER SUCCESS & TESTIMONIALS SYSTEM
  // =================================================================

  // 1. DYNAMIC STATS COUNTER ANIMATION WITH INTERSECTION OBSERVER
  const counterElements = document.querySelectorAll(".animate-counter");
  
  const startCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target") || "0", 10);
    const duration = parseInt(el.getAttribute("data-duration") || "1000", 10);
    const suffix = el.getAttribute("data-suffix") || "";
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function outQuad
      const easedProgress = percentage * (2 - percentage);
      const currentValue = Math.floor(easedProgress * target);
      
      // Add formatting
      if (suffix === ",") {
        el.textContent = currentValue.toLocaleString();
      } else {
        el.textContent = currentValue + suffix;
      }

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = (suffix === ",") ? target.toLocaleString() : target + suffix;
      }
    };

    requestAnimationFrame(animate);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    counterElements.forEach(el => counterObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    counterElements.forEach(el => {
      const target = el.getAttribute("data-target") || "0";
      const suffix = el.getAttribute("data-suffix") || "";
      el.textContent = target + suffix;
    });
  }

  // 2. PREMIUM TESTIMONIAL CAROUSEL SLIDER
  const testiTrack = document.getElementById("testi-track-element");
  const btnTestiPrev = document.getElementById("btn-testi-prev");
  const btnTestiNext = document.getElementById("btn-testi-next");
  const testiDotsContainer = document.getElementById("testi-dots-element");

  if (testiTrack) {
    const getSlidesCount = () => {
      return testiTrack.querySelectorAll(".testimonial-slide-premium").length;
    };

    const getSlidesVisible = () => {
      const width = window.innerWidth;
      if (width >= 1200) return 3;
      if (width >= 768) return 2;
      return 1;
    };

    let currentTestiIndex = 0;
    let autoplayInterval = null;

    const getMaxIndex = () => {
      return Math.max(0, getSlidesCount() - getSlidesVisible());
    };

    const updateSliderPosition = () => {
      const slideElement = testiTrack.querySelector(".testimonial-slide-premium");
      if (!slideElement) return;

      const slideWidth = slideElement.getBoundingClientRect().width;
      const gap = 24; // Equivalent to gap-24 (24px)
      const translation = currentTestiIndex * (slideWidth + gap);
      
      testiTrack.style.transform = `translateX(-${translation}px)`;
      updateActiveDots();
    };

    const generateDots = () => {
      if (!testiDotsContainer) return;
      testiDotsContainer.innerHTML = "";
      
      const totalDots = getSlidesCount() - getSlidesVisible() + 1;
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("testi-dot");
        if (i === 0) dot.classList.add("active");
        
        dot.addEventListener("click", () => {
          currentTestiIndex = i;
          updateSliderPosition();
          resetAutoplay();
        });
        
        testiDotsContainer.appendChild(dot);
      }
    };

    const updateActiveDots = () => {
      if (!testiDotsContainer) return;
      const dots = testiDotsContainer.querySelectorAll(".testi-dot");
      dots.forEach((dot, idx) => {
        if (idx === currentTestiIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    };

    const handleNextSlide = () => {
      const maxIdx = getMaxIndex();
      if (currentTestiIndex < maxIdx) {
        currentTestiIndex++;
      } else {
        currentTestiIndex = 0; // Infinite loop back to start
      }
      updateSliderPosition();
    };

    const handlePrevSlide = () => {
      const maxIdx = getMaxIndex();
      if (currentTestiIndex > 0) {
        currentTestiIndex--;
      } else {
        currentTestiIndex = maxIdx; // Wrap to end
      }
      updateSliderPosition();
    };

    const startAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(handleNextSlide, 4500); // Autoplay 4.5s rotation
    };

    const stopAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };

    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    // Click events
    if (btnTestiNext) {
      btnTestiNext.addEventListener("click", () => {
        handleNextSlide();
        resetAutoplay();
      });
    }

    if (btnTestiPrev) {
      btnTestiPrev.addEventListener("click", () => {
        handlePrevSlide();
        resetAutoplay();
      });
    }

    // Pause on hover
    testiTrack.addEventListener("mouseenter", stopAutoplay);
    testiTrack.addEventListener("mouseleave", startAutoplay);

    // Initial setup & responsive resize
    generateDots();
    updateSliderPosition();
    startAutoplay();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const maxIdx = getMaxIndex();
        if (currentTestiIndex > maxIdx) {
          currentTestiIndex = maxIdx;
        }
        generateDots();
        updateSliderPosition();
      }, 100);
    });
  }

  // 3. PREMIUM VIDEO POPUP PLAYBACK MODAL
  const btnLaunchVideoPopup = document.getElementById("btn-launch-video-popup");
  const videoPopupModal = document.getElementById("video-popup-modal-element");
  const btnVideoPopupClose = document.getElementById("btn-video-popup-close");
  const simPlayBarFill = document.querySelector(".player-scrub-bar-fill");
  const btnSimPause = document.getElementById("btn-sim-pause");

  let mockPlayerInterval = null;
  let mockPlayPercentage = 32; // Default starting spot
  let mockIsPlaying = true;

  const updateScrubBar = () => {
    if (simPlayBarFill) {
      simPlayBarFill.style.width = `${mockPlayPercentage}%`;
    }
  };

  const startMockPlayback = () => {
    if (mockPlayerInterval) clearInterval(mockPlayerInterval);
    mockPlayerInterval = setInterval(() => {
      if (mockIsPlaying) {
        mockPlayPercentage += 0.5;
        if (mockPlayPercentage >= 100) {
          mockPlayPercentage = 0; // Loop back
        }
        updateScrubBar();
      }
    }, 250);
  };

  const stopMockPlayback = () => {
    if (mockPlayerInterval) clearInterval(mockPlayerInterval);
  };

  if (btnLaunchVideoPopup && videoPopupModal) {
    btnLaunchVideoPopup.addEventListener("click", () => {
      videoPopupModal.classList.add("active");
      mockIsPlaying = true;
      if (btnSimPause) btnSimPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
      startMockPlayback();
    });
  }

  if (btnVideoPopupClose && videoPopupModal) {
    btnVideoPopupClose.addEventListener("click", () => {
      videoPopupModal.classList.remove("active");
      stopMockPlayback();
    });
    
    // Close modal on outside backdrop click
    videoPopupModal.addEventListener("click", (e) => {
      if (e.target === videoPopupModal) {
        videoPopupModal.classList.remove("active");
        stopMockPlayback();
      }
    });
  }

  if (btnSimPause) {
    btnSimPause.addEventListener("click", () => {
      mockIsPlaying = !mockIsPlaying;
      if (mockIsPlaying) {
        btnSimPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        btnSimPause.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    });
  }

  // =================================================================
  // PHASE 16 - SMART SEARCH & CATEGORY FILTERING FAQ ENGINE
  // =================================================================
  const faqSearchInput = document.getElementById("faq-search-input");
  const faqTabBtns = document.querySelectorAll(".faq-tab-btn-premium");
  const faqItems = document.querySelectorAll(".faq-item-box");
  const faqNoResults = document.getElementById("faq-no-results-element");

  let activeFaqCategory = "all";
  let activeFaqSearchQuery = "";

  const applyFaqFilters = () => {
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const category = item.getAttribute("data-category") || "";
      const questionText = (item.querySelector(".accordion-button span")?.textContent || "").toLowerCase();
      const answerText = (item.querySelector(".accordion-body")?.textContent || "").toLowerCase();

      const matchesCategory = (activeFaqCategory === "all" || category === activeFaqCategory);
      const matchesSearch = (
        activeFaqSearchQuery === "" ||
        questionText.includes(activeFaqSearchQuery) ||
        answerText.includes(activeFaqSearchQuery)
      );

      if (matchesCategory && matchesSearch) {
        item.classList.remove("d-none");
        visibleCount++;
        
        // Add subtle active highlights if accordion item is expanded
        const button = item.querySelector(".accordion-button");
        if (button && !button.classList.contains("collapsed")) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      } else {
        item.classList.add("d-none");
      }
    });

    // Update active highlights when accordion is expanded/collapsed
    faqItems.forEach((item) => {
      const button = item.querySelector(".accordion-button");
      if (button) {
        button.addEventListener("click", () => {
          setTimeout(() => {
            if (!button.classList.contains("collapsed")) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          }, 50);
        });
      }
    });

    if (visibleCount === 0) {
      if (faqNoResults) faqNoResults.classList.add("active");
    } else {
      if (faqNoResults) faqNoResults.classList.remove("active");
    }
  };

  // Search input change handler
  if (faqSearchInput) {
    faqSearchInput.addEventListener("input", (e) => {
      activeFaqSearchQuery = e.target.value.toLowerCase().trim();
      applyFaqFilters();
    });
  }

  // Category tab button click handler
  faqTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      faqTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      
      activeFaqCategory = btn.getAttribute("data-category") || "all";
      applyFaqFilters();
    });
  });

  // Attach supportive CTA action handlers
  const contactButtons = [
    "btn-faq-chat",
    "btn-faq-email",
    "btn-faq-docs",
    "btn-faq-demo",
    "panel-btn-support",
    "panel-btn-demo"
  ];

  contactButtons.forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", (e) => {
        // Redirect or scroll smoothly to contact hub form
        const contactHub = document.getElementById("contact-hub");
        if (contactHub) {
          e.preventDefault();
          contactHub.scrollIntoView({ behavior: "smooth" });
          
          // Pre-populate message context based on source button
          const formMessage = document.getElementById("form-message");
          if (formMessage) {
            if (btnId === "btn-faq-chat" || btnId === "panel-btn-support") {
              formMessage.value = "Hi, I need assistance with pipeline setups. Please connect me with support.";
            } else if (btnId === "btn-faq-email") {
              formMessage.value = "Hello, I am sending a question regarding custom integrations.";
            } else if (btnId === "btn-faq-docs") {
              formMessage.value = "Looking for specific API authorization guidelines.";
            } else if (btnId === "btn-faq-demo" || btnId === "panel-btn-demo") {
              formMessage.value = "I would like to schedule a custom 1-on-1 demo walkthrough.";
            }
          }
        }
      });
    }
  });

  // Run initial state filter setup
  applyFaqFilters();

  // =================================================================
  // PHASE 17 - PREMIUM INSIGHTS & RESOURCES HUB ENGINE
  // =================================================================
  
  // Newsletter Form Handle
  const premiumNewsletterForm = document.getElementById("premium-newsletter-form");
  const newsletterEmailInput = document.getElementById("newsletter-email-input");
  const newsletterFormContainer = document.getElementById("newsletter-form-container");
  const newsletterSuccessContainer = document.getElementById("newsletter-success-container");
  const successDisplayEmail = document.getElementById("success-display-email");
  const btnNewsletterReset = document.getElementById("btn-newsletter-reset");

  if (premiumNewsletterForm && newsletterEmailInput && newsletterFormContainer && newsletterSuccessContainer) {
    premiumNewsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailVal = newsletterEmailInput.value.trim();
      if (emailVal) {
        if (successDisplayEmail) successDisplayEmail.textContent = emailVal;
        newsletterFormContainer.classList.add("hidden");
        newsletterSuccessContainer.classList.add("active");
      }
    });

    if (btnNewsletterReset) {
      btnNewsletterReset.addEventListener("click", () => {
        newsletterEmailInput.value = "";
        newsletterFormContainer.classList.remove("hidden");
        newsletterSuccessContainer.classList.remove("active");
        setTimeout(() => {
          newsletterEmailInput.focus();
        }, 50);
      });
    }
  }

  // Bookmark UI toggle feedback
  const bookmarkButtons = document.querySelectorAll(".bookmark-btn-ui");
  bookmarkButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const icon = btn.querySelector("i");
      if (icon) {
        if (icon.classList.contains("fa-regular")) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid");
          btn.style.color = "var(--accent-primary)";
        } else {
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
          btn.style.color = "#FFFFFF";
        }
      }
    });
  });

  // Animated Counter implementation
  const animateCounters = document.querySelectorAll(".animate-counter");
  
  if (animateCounters.length > 0) {
    const runCounterAnimation = (counterEl) => {
      const target = parseInt(counterEl.getAttribute("data-target") || "0", 10);
      const duration = parseInt(counterEl.getAttribute("data-duration") || "1000", 10);
      const startTime = performance.now();
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quadratic
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * target);
        
        counterEl.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counterEl.textContent = target;
        }
      };
      
      requestAnimationFrame(updateCounter);
    };

    // Use IntersectionObserver for perfect trigger timing
    if ("IntersectionObserver" in window) {
      const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
      };

      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            if (!counter.classList.contains("animated")) {
              counter.classList.add("animated");
              runCounterAnimation(counter);
            }
            observer.unobserve(counter);
          }
        });
      }, observerOptions);

      animateCounters.forEach((counter) => {
        counterObserver.observe(counter);
      });
    } else {
      // Fallback
      animateCounters.forEach((counter) => {
        runCounterAnimation(counter);
      });
    }
  }

  // =================================================================
  // PHASE 18 - PREMIUM FINAL CTA & FOOTER SYSTEM ENGINE
  // =================================================================

  // 1. Footer Newsletter Handling
  const footerNewsletterForm = document.getElementById("footer-newsletter-form");
  const footerNewsletterEmail = document.getElementById("footer-newsletter-email");
  const footerNewsletterContainer = document.getElementById("footer-newsletter-container");
  const footerNewsletterSuccess = document.getElementById("footer-newsletter-success");
  const footerSuccessEmail = document.getElementById("footer-newsletter-success-email");

  if (footerNewsletterForm && footerNewsletterEmail && footerNewsletterContainer && footerNewsletterSuccess) {
    footerNewsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = footerNewsletterEmail.value.trim();
      if (email) {
        if (footerSuccessEmail) {
          footerSuccessEmail.textContent = email;
        }
        footerNewsletterContainer.classList.add("d-none");
        footerNewsletterSuccess.classList.remove("d-none");
      }
    });
  }

  // 2. Dynamic Copyright Year Display
  const currentYearDisplay = document.getElementById("current-year-display");
  if (currentYearDisplay) {
    currentYearDisplay.textContent = new Date().getFullYear();
  }

  // 3. Scroll Progress Indicator & Enhanced Back To Top Progress
  const scrollProgressBar = document.getElementById("scroll-progress-bar");
  const bttBtn = document.getElementById("back-to-top");

  if (scrollProgressBar || bttBtn) {
    const handleScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollHeight > 0) {
        const scrolledPercentage = (scrollPosition / scrollHeight) * 100;
        
        // Update top progress bar width
        if (scrollProgressBar) {
          scrollProgressBar.style.width = `${scrolledPercentage}%`;
        }
        
        // Add enhancement classes to Back To Top button when scrolled deep
        if (bttBtn) {
          if (scrolledPercentage > 40) {
            bttBtn.classList.add("enhanced");
          } else {
            bttBtn.classList.remove("enhanced");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollProgress);
    window.addEventListener("resize", handleScrollProgress);
    handleScrollProgress(); // Initial execution
  }

});


