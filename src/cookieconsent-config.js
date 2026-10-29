import 'vanilla-cookieconsent/dist/cookieconsent.css';
import './cookieconsent-custom.css';
import * as CookieConsent from 'vanilla-cookieconsent';

const GA_ID = 'G-9MFPL17KYR';

function updateAnalyticsConsent() {
  const granted = CookieConsent.acceptedCategory('analytics');

  window.__famorieAnalyticsConsent = granted;

  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  if (granted && !document.getElementById('famorie-ga-script')) {
    const script = document.createElement('script');
    script.id = 'famorie-ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }
}

CookieConsent.run({
  categories: {
    necessary: {
      enabled: true,
      readOnly: true
    },
    analytics: {
      autoClear: {
        cookies: [
          { name: /^_ga/ },
          { name: '_gid' }
        ]
      }
    }
  },

  guiOptions: {
  consentModal: {
  layout: 'bar inline',
  position: 'bottom center',
  equalWeightButtons: true,
  flipButtons: false
},
  preferencesModal: {
    layout: 'box',
    position: 'right',
    equalWeightButtons: true,
    flipButtons: false
  }
},

  onConsent: updateAnalyticsConsent,
  onChange: updateAnalyticsConsent,

  language: {
    default: 'en',
    translations: {
      en: {
        consentModal: {
          title: 'Your privacy matters',
          description:
  'We use essential cookies to run the site and optional analytics to improve it.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject optional',
          showPreferencesBtn: 'Customize'
        },
        preferencesModal: {
          title: 'Cookie preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Reject optional',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Essential cookies',
              description:
                'These cookies are required for the website to function and cannot be disabled.',
              linkedCategory: 'necessary'
            },
            {
              title: 'Analytics cookies',
              description:
                'These optional cookies help us understand website visits and improve Famorie.',
              linkedCategory: 'analytics'
            }
          ]
        }
      }
    }
  }
});