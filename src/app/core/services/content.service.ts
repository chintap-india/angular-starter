import { Injectable } from '@angular/core';
import { APP_VERSION } from '../version';

export interface ContentSectionItem {
  title: string;
  paragraphs: string[];
  link?: {
    text: string;
    url: string;
    ariaLabel?: string;
  };
}

export type PageKey =
  | 'home'
  | 'features'
  | 'best-practices'
  | 'tasks'
  | 'about'
  | 'contact'
  | 'not-found'
  | string;

export interface NextPathItem {
  badge: string;
  title: string;
  description: string;
  url: string;
  actionText: string;
  ariaLabel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  readonly version = APP_VERSION;

  readonly brand = {
    name: 'chintap',
    tagline: 'Things. Apps. Possibilities.',
    metaTitle: 'Chintap — Things. Apps. Possibilities.',
    metaDescription: 'Chintap explores ideas and builds useful things across the physical and digital worlds — from software and applications to products and connected experiences.',
    address: {
      flat: 'Docking Bay 42,',
      street: 'Orion-Cygnus Spur, Starlight Boulevard,',
      area: 'Neo-Bengaluru Outpost,',
      city: 'Terra Prime',
      state: 'Quadrant 4, Sol Sector',
      pincode: 'SOL-560109-GX',
      country: 'Milky Way',
      lines: [
        'Docking Bay 42, Orion-Cygnus Spur,',
        'Starlight Boulevard, Neo-Bengaluru Outpost,',
        'Quadrant 4, Sol Sector,',
        'Terra Prime, Milky Way - SOL-560109-GX.'
      ],
      full: 'Docking Bay 42, Orion-Cygnus Spur, Starlight Boulevard, Neo-Bengaluru Outpost, Quadrant 4, Sol Sector, Terra Prime, Milky Way - SOL-560109-GX.'
    }
  };

  // Home Page
  readonly home = {
    title: 'Things. Apps. Possibilities.',
    hook: 'Ever caught yourself wondering, what if?',
    introQuestions: [
      'What if that everyday annoyance had a better solution?',
      'What if an idea in your head could become something you could hold, use, or share?',
      'What if two seemingly unrelated things could come together to make something new?'
    ],
    reflection: "You know the feeling. A thought comes along. You turn it over in your head. You tap your chin. And before long, you're wondering where it could lead.",
    taglineBold: "That's Chintap.",
    sections: [
      {
        title: 'It could be a thing. It could be an app.',
        paragraphs: [
          'Some ideas take shape in the physical world. Others live on a screen. Some bring the two together in ways you hadn\'t considered before.',
          'A thought could become a useful little tool, a product, a piece of software, or something that didn\'t have a name until someone thought of it.',
          'We\'re interested in the idea before it has decided what it wants to be.'
        ]
      },
      {
        title: 'So, what could it be?',
        paragraphs: [
          "That's the fun part.",
          "An idea might solve a problem you've lived with for years. It might make an everyday task a little easier. It might lead to a product, an app, a connected device, or an entirely new possibility.",
          "Sometimes the answer is obvious. Sometimes it takes a few wrong turns to find it. And sometimes, following one question leads to another that's even more interesting.",
          "We like exploring that space between what if? and why not?"
        ]
      },
      {
        title: 'Thinking is only the beginning.',
        paragraphs: [
          'Ideas are interesting. Making something out of them is even better.',
          'That means asking questions, trying things, figuring out what works, and being willing to change direction when a better idea comes along.',
          'Sometimes we\'ll build something of our own. Sometimes we\'ll help someone else bring an idea to life. Sometimes we\'ll discover that the simplest answer was the right one all along.',
          "There's no need to make things complicated just to make them interesting."
        ]
      },
      {
        title: "And that's where Chintap begins.",
        paragraphs: [
          'With curiosity. With a question. With the possibility that something could be done a little differently.',
          "We don't have every answer figured out. We don't think we need to.",
          'There are plenty of interesting things to explore, useful things to make, and possibilities worth following.',
          'Some start with us. Some start with you.'
        ]
      }
    ],
    cta: {
      headline: 'Got a what if of your own?',
      sub: "We'd love to hear it.",
      actionText: "Let's Talk",
      ariaLabel: "Let's talk with Chintap about your idea or project",
      link: '/contact'
    }
  };

  // About Chintap Page
  readonly about = {
    title: 'About Chintap.',
    subtitle: 'Curious by nature.',
    intro: [
      'Some people see something and wonder how it works. Others see how it works and wonder how it could be better.',
      "Sometimes, a passing thought becomes an idea you can't quite leave alone. You turn it over, explore it from another angle, and start wondering what might happen if you tried something different.",
      'Chintap comes from that kind of curiosity.',
      "We're interested in ideas, in making things, and in discovering possibilities that aren't always obvious at first."
    ],
    sections: [
      {
        title: 'No single box to fit into.',
        paragraphs: [
          "The world doesn't neatly separate physical things from digital ones. Nor do interesting problems arrive labelled with the technology needed to solve them.",
          'An idea might lead to a product, an app, a connected device, or something entirely unexpected. It might become a venture of its own or take shape through a collaboration with someone else.',
          'We want Chintap to have the room to explore these different directions without losing sight of what matters: making things that are useful, thoughtful, and worth the effort.'
        ]
      },
      {
        title: 'Curious enough to explore. Practical enough to make.',
        paragraphs: [
          "Curiosity is a good place to start. It isn't the whole journey.",
          "Ideas need questions, experiments, decisions, and a willingness to learn along the way. Sometimes the first approach works. Sometimes it doesn't. Sometimes a better idea emerges only after you've tried the original one.",
          "Explore, make, learn — and unlearn. Trying something in the real world is often the quickest way to see what we assumed wrongly. Being practical means knowing when to hold on to an insight, and when to let go of an assumption that doesn't hold up.",
          "We believe in exploring possibilities while staying grounded in the problem we're trying to solve.",
          'Not building something simply because we can. Not adding complexity for its own sake. And not assuming we know the answer before we\'ve properly understood the question.'
        ]
      },
      {
        title: 'A work in progress, by design.',
        paragraphs: [
          "Chintap isn't tied to a single product, industry, or technology.",
          'We can explore our own ideas, develop products, and work with others on interesting problems. As new possibilities emerge, the things we make may change too.',
          "That openness is intentional. We'd rather follow a worthwhile idea than force it into a predefined category.",
          "There's plenty left to explore. That's precisely the point."
        ]
      }
    ],
    cta: {
      headline: 'What about your ideas?',
      paragraphs: [
        'You might have something well defined, or you might only have the beginning of a thought.',
        'Either is a good place to start.',
        "We're interested in conversations that lead somewhere — a better question, a new perspective, a useful experiment, or something worth building."
      ],
      prompt: "Have a thought worth exploring? Let's talk.",
      actionText: "Let's Talk",
      ariaLabel: "Have a thought worth exploring? Let's talk with Chintap",
      link: '/contact'
    }
  };

  // Let's Talk / Contact Page
  readonly contact = {
    title: "Let's talk.",
    subtitle: 'Every interesting thing starts somewhere.',
    paragraphs: [
      "Maybe you have an idea you've been turning over in your head. Maybe there's a problem you'd like to solve, something you'd like to build, or a possibility you're curious about.",
      "You don't need to have it all figured out before reaching out.",
      "Tell us a little about what's on your mind. We'll take it from there."
    ],
    whatThinking: {
      headline: 'What are you thinking about?',
      lead: "It could be a product, an app, a business problem, a collaboration, or something that doesn't quite fit into any of those categories.",
      sub: "We're happy to hear about it."
    },
    guidance: {
      headline: 'A few things that help',
      points: [
        'What are you thinking about?',
        'What problem are you trying to solve, or what would you like to make possible?',
        'Where are you in the process — just exploring, planning something, or ready to get started?'
      ],
      note: "Share as much or as little as you like. There's no need to have all the answers.",
      closing: "Let's see where the conversation leads."
    },
    address: {
      headline: 'Office address',
      lines: [
        'Docking Bay 42, Orion-Cygnus Spur,',
        'Starlight Boulevard, Neo-Bengaluru Outpost,',
        'Quadrant 4, Sol Sector,',
        'Terra Prime, Milky Way - SOL-560109-GX.'
      ],
      full: 'Docking Bay 42, Orion-Cygnus Spur, Starlight Boulevard, Neo-Bengaluru Outpost, Quadrant 4, Sol Sector, Terra Prime, Milky Way - SOL-560109-GX.'
    }
  };

  // Legal Policies (Privacy Policy & Terms of Use)
  readonly legal = {
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: 'Zero Cookies & No Tracking',
          text: 'We respect your privacy completely. Chintap does not use cookies, tracking pixels, local storage trackers, or third-party behavioral analytics. When you browse this site, you leave no tracking footprint.'
        },
        {
          heading: 'Information You Provide',
          text: 'The only personal data we ever receive is what you voluntarily submit through our contact form or direct email — your name, email address, organization (optional), and message.'
        },
        {
          heading: 'How We Use Your Information',
          text: 'We use your message exclusively to read your thoughts, understand your inquiry, and reply to you directly. We will never sell, rent, monetize, or share your contact information with third parties, advertisers, or mailing lists.'
        },
        {
          heading: 'Data Retention & Your Rights',
          text: 'Your inquiries are kept in our secure business inbox only for as long as needed for our correspondence. You can ask us to delete your correspondence or update your details at any time by reaching out through our contact form.'
        }
      ]
    },
    terms: {
      title: 'Terms of Use',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: 'About This Site',
          text: 'This website is operated by Chintap as an exploratory independent venture. It serves as a showcase of our ideas, experiments, and ongoing work across physical products and digital software.'
        },
        {
          heading: 'Intellectual Property',
          text: 'The Chintap brand, emblem, wordmark, tagline ("Things. Apps. Possibilities."), and original writings are owned by Chintap. You may quote or reference our work with proper attribution, but copying, scraping, or misrepresenting our identity without permission is not permitted.'
        },
        {
          heading: 'Third-Party Trademarks & Logos',
          text: 'All third-party product names, logos, registered trademarks, and service marks referenced or displayed across this site (such as JavaScript, TypeScript, NestJS, MongoDB, Angular, React, React Native, Expo, Docker, Playwright, etc.) remain the property of their respective owners. Reference to any third-party products, services, or processes by trade name, trademark, manufacturer, or supplier is solely for identification and educational reference under nominative fair use, and does not constitute or imply endorsement, sponsorship, or affiliation by or with Chintap.'
        },
        {
          heading: 'Exploratory Nature & No Warranties',
          text: 'All materials, writings, and concept showcases on this website are provided in good faith on an "as is" basis for informational and creative exploration. They do not constitute formal commercial warranties or binding commitments.'
        },
        {
          heading: 'Questions & Conversations',
          text: 'If you have questions about our work, intellectual property, or collaborations, feel free to reach out to us directly through our contact form.'
        }
      ]
    }
  };

  readonly nextPathsMap: Record<PageKey, NextPathItem[]> = {
    'home': [
      {
        badge: 'Architecture',
        title: 'Features & Stack',
        description: 'Explore Angular 22, Signals, Tailwind CSS 4, Vitest, and Netlify Free Tier.',
        url: '/features',
        actionText: 'Explore features',
        ariaLabel: 'Explore starter kit features and architecture'
      },
      {
        badge: 'Optimization',
        title: '5 Discovery Pillars',
        description: 'In-depth guide for Technical SEO, AEO, LLMO, GEO, and SSR Hydration.',
        url: '/best-practices',
        actionText: 'Read guide',
        ariaLabel: 'Read the 5 Pillars of Discovery guide'
      },
      {
        badge: 'Demo',
        title: 'Tasks CRUD Showcase',
        description: 'Interactive module featuring Reactive Forms, Markdown preview, and Mock API.',
        url: '/tasks',
        actionText: 'Try demo',
        ariaLabel: 'Try the interactive Tasks CRUD showcase'
      }
    ],
    'features': [
      {
        badge: 'Discovery',
        title: '5 Discovery Pillars',
        description: 'Deep dive into Technical SEO, AEO, LLMO, GEO, and SSR Hydration.',
        url: '/best-practices',
        actionText: 'Read best practices',
        ariaLabel: 'Read best practices guide'
      },
      {
        badge: 'Interactive',
        title: 'Tasks CRUD Demo',
        description: 'Production pattern for reactive forms, mock API simulation, and offline storage.',
        url: '/tasks',
        actionText: 'Explore demo',
        ariaLabel: 'Explore Tasks demo'
      },
      {
        badge: 'Organization',
        title: 'About Chintap',
        description: 'The philosophy, values, and engineering discipline driving Chintap.',
        url: '/about',
        actionText: 'Read about us',
        ariaLabel: 'Read about Chintap'
      }
    ],
    'best-practices': [
      {
        badge: 'Architecture',
        title: 'Features & Stack',
        description: 'Modern Angular 22 toolchain with zoneless signals and Tailwind CSS 4.',
        url: '/features',
        actionText: 'View features',
        ariaLabel: 'View starter kit features'
      },
      {
        badge: 'Showcase',
        title: 'Tasks CRUD Demo',
        description: 'Modular architecture, strictly typed reactive forms, and local persistence.',
        url: '/tasks',
        actionText: 'Explore demo',
        ariaLabel: 'Explore Tasks demo'
      },
      {
        badge: 'Inquiries',
        title: "Let's Talk",
        description: 'Have questions about customizing or deploying the starter kit? Reach out directly.',
        url: '/contact',
        actionText: 'Contact us',
        ariaLabel: 'Contact Chintap'
      }
    ],
    'tasks': [
      {
        badge: 'Architecture',
        title: 'Features & Stack',
        description: 'Modern Angular 22 toolchain with zoneless signals and Tailwind CSS 4.',
        url: '/features',
        actionText: 'View features',
        ariaLabel: 'View starter kit features'
      },
      {
        badge: 'Optimization',
        title: '5 Discovery Pillars',
        description: 'SEO, AEO, LLMO, GEO, and SSR practices for search and AI discovery.',
        url: '/best-practices',
        actionText: 'Read guide',
        ariaLabel: 'Read best practices guide'
      },
      {
        badge: 'Inquiries',
        title: "Let's Talk",
        description: 'Reach out to collaborate, share feedback, or ask questions.',
        url: '/contact',
        actionText: 'Contact us',
        ariaLabel: 'Contact Chintap'
      }
    ],
    'about': [
      {
        badge: 'Architecture',
        title: 'Features & Stack',
        description: 'The zero-compromise developer toolchain: Angular 22, Signals, and Netlify.',
        url: '/features',
        actionText: 'View features',
        ariaLabel: 'View starter kit features'
      },
      {
        badge: 'Discovery',
        title: '5 Discovery Pillars',
        description: 'Technical SEO, Answer Engine, and LLM optimization frameworks.',
        url: '/best-practices',
        actionText: 'Read best practices',
        ariaLabel: 'Read best practices guide'
      },
      {
        badge: 'Inquiries',
        title: "Let's Talk",
        description: 'Have a project, question, or idea? Start a conversation with us.',
        url: '/contact',
        actionText: 'Get in touch',
        ariaLabel: 'Contact Chintap'
      }
    ],
    'contact': [
      {
        badge: 'Overview',
        title: 'Home',
        description: 'Return to the starter kit overview and core architecture highlights.',
        url: '/',
        actionText: 'Back to home',
        ariaLabel: 'Return to Chintap Home'
      },
      {
        badge: 'Architecture',
        title: 'Features & Stack',
        description: 'Explore Angular 22, Signals, Tailwind CSS 4, Vitest, and Netlify.',
        url: '/features',
        actionText: 'Explore features',
        ariaLabel: 'Explore starter kit features'
      },
      {
        badge: 'Perspective',
        title: 'About Chintap',
        description: 'Learn more about our background, values, and why we build the way we do.',
        url: '/about',
        actionText: 'Read about us',
        ariaLabel: 'Read about Chintap'
      }
    ]
  };

  // 404 Not Found Page
  readonly notFound = {
    badge: '404 · Uncharted Route',
    title: 'This path hasn’t taken shape.',
    subtitle: "We couldn't find the page you were looking for.",
    paragraphs: [
      'The address might be misspelled, the page may have moved, or this particular thought hasn’t been explored yet.',
      'You can head back to the main map or report this route to the Chintap team so we can look into it.'
    ],
    homeCta: {
      text: 'Back to Home →',
      url: '/',
      ariaLabel: 'Return to Chintap homepage'
    },
    reportCta: {
      text: 'Report Broken Link →',
      ariaLabel: 'Report broken link or missing route on the Contact page'
    },
    quickReport: {
      text: 'Instant 1-Click Report',
      ariaLabel: 'Send automatic 404 route report directly to Chintap team'
    }
  };

  getNextPaths(page: PageKey): NextPathItem[] {
    return this.nextPathsMap[page] || this.nextPathsMap['home'];
  }
}
