// import registerServiceWorker from './registerServiceWorker';
import "../styles/main.css";


const main = () => {
  // Load custom tracking code lazily, so it's non-blocking.
  import('./analytics/base.js').then((analytics) => {
    analytics.init();
    analytics.reportWebVitals();
  });

  // registerServiceWorker();
  console.log("okay.");
};

main();
