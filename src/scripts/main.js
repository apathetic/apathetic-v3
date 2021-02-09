import "../styles/main.css";
import registerSW from './service-worker/register';


const main = () => {
  // Load custom tracking code lazily, so it's non-blocking.
  import('./analytics/base.js').then((analytics) => {
    analytics.init();
    analytics.reportWebVitals();
  });

  registerSW();
  console.log("okay.");
};

main();
