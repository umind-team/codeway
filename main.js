// FAQ Accordion - Only one card can be open at a time
(function() {
    var isHandlingClick = false;
    var expandedTrigger = null;
    
    function initFaqAccordion() {
        var faqSection = document.getElementById('faq');
        if (!faqSection) return;
        
        var triggers = faqSection.querySelectorAll('.f-card');
        if (!triggers.length) return;
        
        console.log('FAQ accordion initialized, triggers:', triggers.length);
        
        triggers.forEach(function(trigger) {
            trigger.addEventListener('click', function(e) {
                if (isHandlingClick) return;
                
                console.log('Click on:', trigger.getAttribute('data-w-id'));
                
                // If we already have an expanded trigger that's not this one
                if (expandedTrigger && expandedTrigger !== trigger) {
                    isHandlingClick = true;
                    
                    console.log('Closing:', expandedTrigger.getAttribute('data-w-id'));
                    
                    // Try to close the expanded one - set data attribute first
                    expandedTrigger.setAttribute('data-wf-expanded', 'false');
                    
                    // Then click to trigger Webflow
                    expandedTrigger.click();
                    
                    // Reset after a delay
                    setTimeout(function() {
                        isHandlingClick = false;
                    }, 100);
                    
                    expandedTrigger = trigger;
                } else {
                    // First click or clicking same trigger - just track it
                    expandedTrigger = trigger;
                }
            });
        });
    }
    
    // Wait for Webflow
    function waitForWebflow() {
        if (typeof Webflow !== 'undefined') {
            console.log('Webflow detected');
            setTimeout(initFaqAccordion, 500);
        } else {
            setTimeout(waitForWebflow, 100);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForWebflow);
    } else {
        waitForWebflow();
    }
})();
