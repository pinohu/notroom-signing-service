/**
 * Progressive Web App (PWA) Utilities
 * Handles service worker registration and PWA install prompts
 */

// Register service worker
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available - prompt user to refresh
                  console.log('New service worker available');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
};

// Handle PWA install prompt
export const handleInstallPrompt = () => {
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;

    // Show custom install button/prompt
    // You can trigger this from a component
    console.log('PWA install prompt available');
  });

  return {
    prompt: async () => {
      if (!deferredPrompt) {
        return false;
      }

      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for user response
      const { outcome } = await deferredPrompt.userChoice;
      
      deferredPrompt = null;
      
      return outcome === 'accepted';
    },
    isAvailable: () => !!deferredPrompt,
  };
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

