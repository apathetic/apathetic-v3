// import { FETCH } from '..types/posts';
const INITIAL_STATE = {
  list: [
    {
      "name": "Material Design Spec",
      "year": 2018,
      "tech": ["python", "appengine"]
    }, {
      "name": "MCM",
      "year": 2017,
      "tech": ["firebase", "threejs"]
    }, {
      "name": "SPAN2017",
      "year": 2017,
      "url": "https://design.google/span2017",
      "tech": ["wagtail"]
    }, {
      "name": "Primetime",
      "year": 2017,
      "tech": ["customjs"]
    }, {
      "name": "Walmart Careers",
      "year": 2016,
      "url": "http://careers.walmart.com",
      "tech": ["brightspot"]
    }, {
      "name": "Android Nougat",
      "year": 2016,
      "url": "https://www.android.com/versions/nougat-7-0/",
      "tech": ["customjs"]
    }, {
      "name": "Material Design Blog",
      "year": 2016,
      "tech": ["python"]
    // }, {
      // "name": "Telus",
      // "year": 2016,
      // "description": "Consulting for new offerings"
    }, {
      "name": "Google Custom Case",
      "year": 2015,
      "url": "https://livecase.withgoogle.com/places/style",
      "tech": ["angular 1.x", "threejs"]
    }, {
      "name": "HP",
      "year": 2015,
      "tech": ["wordpress", "threejs"]
    }, {
      "name": "NYULangone",
      "year": 2014,
      "url": "http://www.nyulangone.org",
      "tech": ["drupal", "symfony"]
    }, {
      "name": "Sprout",
      "year": 2014,
      "url": "http://sproutonline.com",
      "tech": ["drupal"],
      "awards": [
        {
          "url": "http://www.cynopsis.com/event/2017-cynopsis-kids-magination-awards-results/",
          "from": "Cynopsis Media",
          "award": "Best Brand Website"
        },
        {
          "url": "https://www.webbyawards.com/winners/2016/websites/general-website/youth/sprout-online/",
          "from": "Webby Awards",
          "award": "Best Youth Website 2016, Honoree"
        }
      ]
    // }, {
    //   "name": "Ride",
    //   "year": 2014
    }, {
      "name": "Huge Inc.",
      "year": 2013,
      "description": "The new website for Huge Inc.",
      "url": "http://www.hugeinc.com",
      "tech": ["sitecore", "jquery"],
      "awards": [
        {
          "url": "https://www.awwwards.com/sites/huge-inc",
          "from": "Awwwards",
          "award": "Site of The Day"
        },
        {
          "url": "https://thefwa.com/cases/the-redesigned-hugeinc-com",
          "from": "FWA",
          "award": ""
        },
        {
          "url": "http://userexperienceawards.com/ux-awards-2015-winners/",
          "from": "UX Awards",
          "award": "2015 UX Awards, Honoree"
        }
      ]
    }, {
      "name": "Google Partners",
      "year": 2013,
      "url": "https://www.google.com/partners",
      "tech": ["angular 1.x"]
    }
  ]
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        list: [],
        status: 'success'
      };

    default:
      return state;
  }
}
