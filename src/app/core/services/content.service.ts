import { Injectable } from '@angular/core';
import { APP_VERSION } from '../version';
import { PartnerItem } from '../models/partner.model';
import { CustomerItem } from '../models/customer.model';
import partnersData from '../../../../content/partners.json';
import customersData from '../../../../content/customers.json';

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
  | 'what-we-do'
  | 'how-we-work'
  | 'explorations'
  | 'building-teams'
  | 'partners'
  | 'customers'
  | 'about'
  | 'contact'
  | 'academy';

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
      flat: 'Flat No. 403,',
      street: '1st Cross, Manjunatha Nagar, Raghuvanahalli,',
      area: 'Kanakapura Main Road,',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560109',
      country: 'India',
      lines: [
        'Flat No. 403,',
        '1st Cross, Manjunatha Nagar, Raghuvanahalli,',
        'Kanakapura Main Road,',
        'Bengaluru, Karnataka - 560109, India.'
      ],
      full: 'Flat No. 403, 1st Cross, Manjunatha Nagar, Raghuvanahalli, Kanakapura Main Road, Bengaluru, Karnataka - 560109, India.'
    }
  };

  // Home Page (lines 1-55 in public/contents.md)
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

  // What We Do Page (lines 61-129 in public/contents.md)
  readonly whatWeDo = {
    title: 'What we do.',
    subtitle: 'It depends on the idea.',
    intro: [
      'Some ideas are easier to explain once you can see them. Some need a little exploring before they make sense. And some turn out to be something quite different from what you first imagined.',
      "That's part of the fun.",
      'At Chintap, we explore ideas, build products, and work on problems that are worth solving. Sometimes that means making something physical. Sometimes it means writing software. Sometimes it means bringing the two together.',
      'The starting point can be almost anything. What matters is figuring out what to do with it.'
    ],
    sections: [
      {
        title: 'Things you can use, hold, wear, or play with.',
        paragraphs: [
          'Not everything belongs on a screen.',
          'Some ideas call for something tangible — an object, a product, a useful tool, or a hands-on experience. Others might involve electronics, sensors, or devices that interact with the world around them.',
          "The interesting question isn't just what we can make. It's what would make sense to make."
        ]
      },
      {
        title: 'Apps that have a reason to exist.',
        paragraphs: [
          "Software can do a lot. That doesn't mean every problem needs another app.",
          'Sometimes a simple tool is enough. Sometimes an idea calls for a web application, a mobile experience, or software that connects systems and makes a complicated process feel straightforward.',
          'We like technology that serves a purpose — something people can use, something that solves a real problem, something that earns its place.'
        ]
      },
      {
        title: "And sometimes, it's both.",
        paragraphs: [
          'A physical product might become more useful with an app. A device might need software to make it work. A digital experience might be better when it connects to something in the real world.',
          'This is where things get particularly interesting.',
          'When hardware, software, people, and the world around them come together, the possibilities change. We like exploring those connections without assuming that every idea needs them.'
        ]
      },
      {
        title: "From “what if?” to “let's see.”",
        paragraphs: [
          "You don't always need a finished specification to begin.",
          "Maybe you have a problem that keeps coming back. Maybe you have an idea but aren't sure whether it's practical. Maybe you know what you want to achieve but haven't figured out the best way to get there.",
          'We can start by understanding the problem, exploring possible approaches, and working out what is worth trying.',
          'That might lead to a prototype, a first version, a complete product, or simply a better understanding of the problem.',
          'Not every exploration needs to become a product. But every worthwhile attempt should teach us something.'
        ]
      },
      {
        title: 'Our ideas. Your ideas. Somewhere in between.',
        paragraphs: [
          'Some things begin as ideas of our own. We explore them, build them, and see where they lead.',
          "Other things begin with someone else's question, challenge, or ambition. We enjoy working with people who want to explore a possibility and turn it into something useful.",
          'And sometimes, the most interesting ideas emerge when different perspectives come together.',
          "We're open to all three."
        ],
        link: {
          text: "Explore what we're thinking about →",
          url: '/explorations',
          ariaLabel: "Explore what we're thinking about at Chintap"
        }
      }
    ],
    cta: {
      headline: 'Have an idea?',
      paragraphs: [
        "It doesn't have to be fully formed. You don't need all the answers before starting a conversation.",
        "Tell us what you're thinking about, what you're trying to solve, or what you've been wondering whether it's possible to make.",
        "We'll take it from there."
      ],
      actionText: 'Get in Touch',
      ariaLabel: 'Get in touch with Chintap about your idea',
      link: '/contact'
    }
  };

  // Explorations Page
  readonly explorations = {
    title: 'Explorations.',
    subtitle: 'Some thoughts are worth following.',
    intro: [
      'Not every idea begins with a plan. Sometimes it begins with a question, a small frustration, or the feeling that something could work a little better.',
      'A passing thought becomes something you return to. You look at it from another angle. You wonder who else might have thought about it. And gradually, a possibility begins to take shape.',
      'This is where some of our own explorations begin.'
    ],
    sections: [
      {
        title: 'The little things matter.',
        paragraphs: [
          'Much of everyday life is made up of small moments, familiar routines, and conversations we barely notice.',
          "A habit we're trying to build. A thought that's difficult to explain. A question a child asks. A conversation between people who want the best for someone but don't always find it easy to connect.",
          'None of these may seem like a big problem on its own. Yet sometimes, a small change in how we approach them can make a meaningful difference.',
          "We're curious about those possibilities."
        ]
      },
      {
        title: 'Growing up, growing together.',
        paragraphs: [
          "Children learn and grow in ways that don't always fit neatly into plans or expectations.",
          'The people around them — parents, teachers, and other caregivers — each see a different part of that journey. There are everyday discoveries, small milestones, questions, challenges, and moments worth noticing.',
          'What might help those people understand one another a little better? What could make it easier to encourage independence, nurture useful habits, or stay connected to the things that matter?',
          "We don't assume there's one answer. We're interested in exploring what might help."
        ]
      },
      {
        title: 'Small habits. Everyday possibilities.',
        paragraphs: [
          'Some changes begin with grand intentions. Others begin with one small thing repeated, remembered, or made a little easier.',
          'A routine that becomes more natural. A child learning to take ownership of a task. A family finding a rhythm that works for them. A simple way to pause and reflect on the day.',
          'We\'re interested in how thoughtful ideas and useful tools might support these everyday moments — without turning life into another system to manage.',
          'Sometimes, simpler is better.'
        ]
      },
      {
        title: 'Better conversations begin somewhere.',
        paragraphs: [
          'People can care about the same things and still struggle to share what they see, what they need, or what they hope for.',
          'A little more understanding can change a conversation. A useful prompt can help someone find the words. A simple way to share an observation can bring different perspectives closer together.',
          "We're curious about the things that help people communicate more meaningfully — especially when their shared understanding matters.",
          'Not more noise. Not communication for its own sake. Just better ways to connect when it counts.'
        ]
      },
      {
        title: 'Ideas are allowed to change.',
        paragraphs: [
          "An exploration isn't a promise that a particular product will exist.",
          'Some ideas become clearer as we spend time with them. Some lead to experiments or early versions. Some change direction. Others teach us something useful and then make room for a different question.',
          'We want to give ideas enough space to develop before deciding what they should become.',
          'A product, an app, a physical thing, a collaboration — or something we haven\'t imagined yet.',
          'The form should follow the function, not the other way around.'
        ]
      },
      {
        title: 'Building something takes people.',
        paragraphs: [
          'Sometimes an idea needs more than time and curiosity. It needs people who can bring it to life, learn together, and take responsibility for what comes next.',
          'We also work with organisations that want to bring the right people together and build teams around meaningful work.'
        ],
        link: {
          text: 'Building teams →',
          url: '/building-teams',
          ariaLabel: 'Learn more about building teams with Chintap'
        }
      },
      {
        title: 'This is only the beginning.',
        paragraphs: [
          "These are some of the questions we're interested in exploring. They aren't a fixed list, a finished catalogue, or a declaration of everything Chintap will do.",
          'As thoughts develop, some may become things you can see, use, and experience. Others may remain questions for a while longer. New ones will find their way in.',
          "That's part of the process.",
          'We\'re here to stay curious, try things, learn, and see where a worthwhile thought might lead.'
        ]
      }
    ],
    cta: {
      headline: 'Have a thought of your own?',
      paragraphs: [
        "Maybe something here connects with a question you've been asking. Maybe your experience gives you a different perspective. Or perhaps you've been thinking about something entirely unrelated.",
        "We'd be glad to hear about it."
      ],
      prompt: "Have a thought worth exploring? Let's talk.",
      actionText: "Let's Talk",
      ariaLabel: "Have a thought worth exploring? Let's talk with Chintap",
      link: '/contact'
    }
  };

  // Building Teams Page
  readonly buildingTeams = {
    title: 'Building teams.',
    subtitle: 'Good work needs the right people.',
    intro: [
      'Sometimes the ambition is clear, but the way to get there isn\'t.',
      'An organisation may be starting something new. An existing team may need to take on a different kind of work. A promising idea may need people with the right mix of skills, experience, and shared direction to move beyond the drawing board.',
      'Building the team is part of building the thing.',
      'That\'s where we can help.'
    ],
    sections: [
      {
        title: 'Start with what needs to happen.',
        paragraphs: [
          'Before thinking about roles, structures, or headcount, it helps to understand the work ahead.',
          'What are you trying to make possible? What needs to happen that isn\'t happening today? What should the team be able to do, and what would meaningful progress look like?',
          'The answers shape the team — not the other way around.',
          'Sometimes that means bringing a new team together from the beginning. Sometimes it means strengthening an existing group or helping an organisation develop a capability it wants to own.',
          'There isn\'t one template for every situation.'
        ]
      },
      {
        title: 'More than filling seats.',
        paragraphs: [
          'A team is more than a collection of people with matching job descriptions.',
          'People need to understand what they\'re working towards, how their work fits together, and how to make good decisions when the answers aren\'t obvious. They need room to learn, take responsibility, and improve the way they work.',
          'We pay attention to those things as well as the practical work of getting a team in place.',
          'The aim isn\'t simply to assemble a group. It\'s to help create the conditions in which that group can do meaningful work well.'
        ]
      },
      {
        title: 'Built for the work ahead.',
        paragraphs: [
          'Some teams are small and focused. Others grow into larger groups with their own practices, leadership, and ways of working.',
          'A new capability may begin with a few people and develop into a lasting centre of expertise. An organisation may need help getting started, finding its footing, and becoming confident enough to carry the work forward on its own.',
          'The right approach depends on where you\'re starting and what you want the team to become.',
          'We work through those questions with you, keeping the needs of the work and the people doing it in view.'
        ]
      }
    ],
    partner: {
      eyebrow: 'Technology partner',
      badge: 'AI interview platform',
      name: 'MockWin',
      description: 'Adaptive AI interview simulations for job seekers and automated screening infrastructure for modern hiring teams. An intelligent evaluation partner helping organisations assess technical and communicative depth with clarity.',
      logoUrl: 'images/partners/mockwin.svg',
      websiteUrl: 'https://mockwin.ai',
      ariaLabel: 'Visit MockWin website (opens in a new tab)'
    },
    cta: {
      headline: 'A useful place to begin.',
      paragraphs: [
        'You don\'t need a complete organisation chart or a finished hiring plan.',
        'You might know the outcome you\'re aiming for but be unsure how to build towards it. You might have a team that needs a fresh direction. Or you might be considering a new capability and want to think through what it would take.',
        'Bring us the situation as it is. We can explore what the next sensible step might be.'
      ],
      prompt: 'Building something new? Let\'s talk.',
      actionText: "Let's Talk",
      ariaLabel: 'Building something new? Let\'s talk with Chintap',
      link: '/contact'
    }
  };

  // Partners Page
  readonly partners = {
    title: 'Partners.',
    subtitle: 'Better things can happen together.',
    items: (partnersData as unknown) as PartnerItem[],
    intro: [
      'Some ideas need a different perspective. Some need a skill we don\'t have in the room. Others need the right introduction, a shared effort, or someone who sees the same possibility and wants to help explore it.',
      'Good partnerships aren\'t built by matching labels. They begin when people find a reason to work together.',
      'That\'s what we\'re interested in at Chintap.'
    ],
    sections: [
      {
        title: 'Different strengths. Shared possibilities.',
        paragraphs: [
          'The right person or organisation might help shape an idea, bring it into the world, help it reach the people it is meant for, or make the next step possible.',
          'Sometimes the contribution is creative. Sometimes it\'s practical. Sometimes it\'s a platform, a connection, an audience, or experience we can learn from.',
          'There\'s no single kind of partner we\'re looking for, and no fixed formula for how a partnership should work.',
          'What matters is whether there\'s something worthwhile we can do together.'
        ]
      },
      {
        title: 'Start with what you bring.',
        paragraphs: [
          'You might have a capability, a community, a platform, an idea, or simply a perspective that changes how we see a problem.',
          'You might be exploring something of your own and wondering whether there\'s a natural connection with Chintap. Or you may have come across something we\'re doing and see a way we could help each other.',
          'You don\'t need to arrive with a formal proposal or a fully worked-out plan.',
          'A good conversation is often enough to discover whether there\'s a fit.'
        ]
      },
      {
        title: 'Make it make sense.',
        paragraphs: [
          'We believe partnerships work best when the purpose is clear, the expectations are honest, and everyone has a reason to be involved.',
          'Not every conversation will become a collaboration. That\'s fine. The point is to find the connections that are useful to the people involved and meaningful to the work.',
          'If there\'s a possibility worth exploring, we can work out the shape together.'
        ]
      }
    ],
    cta: {
      headline: 'Something we could do together?',
      paragraphs: [
        'Tell us a little about what you have in mind, what you bring, or what you\'d like to explore.',
        'We\'ll start there.'
      ],
      prompt: "Let's talk.",
      actionText: "Let's Talk",
      ariaLabel: "Let's talk about partnering with Chintap",
      link: '/contact'
    }
  };

  // Customers Page
  readonly customers = {
    title: 'Customers.',
    subtitle: 'Good work comes from good conversations.',
    items: (customersData as unknown) as CustomerItem[],
    intro: [
      'Every piece of work begins somewhere. Sometimes with a question, sometimes with a challenge, and sometimes with someone who sees an opportunity to do things a little differently.',
      'We\'ve had the opportunity to work with people and businesses across different kinds of work. Each brings its own context, needs and way of looking at things.',
      'Here are a few of the people we\'ve worked with and some of the things we\'ve helped bring together.'
    ],
    confidentiality: {
      title: 'More work, different stories.',
      paragraphs: [
        'Not every engagement can be shared publicly. Some work is best kept between the people involved. Where we can, we\'ll share a little about what we worked on, without necessarily naming the organisation.',
        'The work matters. So does the trust that makes it possible.'
      ]
    },
    cta: {
      headline: 'Have a project in mind?',
      paragraphs: [
        'Every good piece of work begins with a simple conversation.',
        'Tell us what you\'re trying to solve, build, or articulate.'
      ],
      prompt: "Let's talk.",
      actionText: "Let's Talk",
      ariaLabel: "Let's talk about your project with Chintap",
      link: '/contact'
    }
  };

  // About Chintap Page (lines 136-186 in public/contents.md)
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

  // How We Work Page (lines 193-257 in public/contents.md)
  readonly howWeWork = {
    title: 'How we work.',
    subtitle: "First, let's figure it out.",
    intro: [
      "Not every idea arrives with a plan. Sometimes there's a clear problem and an obvious place to begin. Sometimes there's only a hunch that something could work better.",
      'Either way, we start by getting curious.',
      "What's the problem? Who is it affecting? What would a better outcome look like? And is there a simpler way to get there?",
      'The answers help us figure out what to do next.'
    ],
    sections: [
      {
        title: 'Explore before you commit.',
        paragraphs: [
          'There is rarely just one way to approach a problem.',
          "We look at different possibilities, question our assumptions, and consider what makes sense given the time, resources, and outcome we're aiming for.",
          "Sometimes the right answer is an app. Sometimes it's a physical product. Sometimes it's a combination of things. And sometimes, exploring an idea reveals that the problem needs a completely different approach.",
          "We'd rather discover that early than build the wrong thing beautifully."
        ]
      },
      {
        title: 'Make something we can learn from.',
        paragraphs: [
          'An idea can sound perfect until you try it.',
          "That's why we like making things tangible as early as it makes sense — a sketch, a working example, a prototype, or a first version that people can actually use.",
          "The point isn't to rush towards a finished product. It's to move beyond assumptions and learn something useful.",
          "What works? What's awkward? What did we miss? What could be simpler?",
          'Those questions are part of making something good.'
        ]
      },
      {
        title: "Keep what works. Rethink what doesn't.",
        paragraphs: [
          'Building something rarely follows a perfectly straight line.',
          'New information changes the picture. An experiment opens up another possibility. A small improvement makes a bigger difference than expected.',
          'We pay attention to what happens when an idea meets the real world. We refine what works, reconsider what doesn\'t, and keep the original problem in sight.',
          "Progress isn't about sticking to the first plan at all costs. It's about getting closer to a useful result."
        ]
      },
      {
        title: "Know when it's enough.",
        paragraphs: [
          "More features don't automatically make a better product. More technology doesn't automatically make a better solution.",
          'Sometimes a small, focused tool is all that\'s needed. Sometimes a problem deserves a more ambitious approach.',
          'We try to match the effort to the opportunity — making sensible choices about complexity, cost, and what actually matters.',
          "The goal is not to build the biggest thing possible. It's to build the right thing for the job."
        ]
      }
    ],
    cta: {
      headline: 'Good things can start with a conversation.',
      paragraphs: [
        "You don't need a finished brief, a complete specification, or all the answers.",
        "Bring us a problem, an idea, or even a question you've been thinking about. We can work out what deserves exploring, what might be possible, and whether there's something worth building together.",
        "Sometimes the next step is a prototype. Sometimes it's a different perspective. Sometimes it's discovering that the simplest answer was there all along."
      ],
      prompt: "Have something worth exploring? Let's talk.",
      actionText: "Let's Talk",
      ariaLabel: "Have something worth exploring? Let's talk with Chintap",
      link: '/contact'
    }
  };

  // Let's Talk / Contact Page (lines 263-297 in public/contents.md)
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
        'Flat No. 403,',
        '1st Cross, Manjunatha Nagar, Raghuvanahalli,',
        'Kanakapura Main Road,',
        'Bengaluru, Karnataka - 560109, India.'
      ],
      full: 'Flat No. 403, 1st Cross, Manjunatha Nagar, Raghuvanahalli, Kanakapura Main Road, Bengaluru, Karnataka - 560109, India.'
    }
  };

  // Academy by Chintap (content/academy.md)
  readonly academy = {
    badge: 'Academy by Chintap • From ideas to life',
    title: 'Academy by Chintap',
    subtitle: 'From ideas to life.',
    manifesto: "You don't come here just to learn technology. You come here to discover what you can create with it.",
    motto: 'Imagine · Explore · Learn · Build · Test · Launch',
    intro: [
      'Every great product starts somewhere. A thought, a problem worth solving, a little curiosity, or an idea that refuses to go away.',
      'At Academy by Chintap, we help turn that starting point into something real.',
      'Explore technology, learn by doing, experiment with ideas, build meaningful things, and discover what you\'re capable of creating.'
    ],
    approach: {
      headline: "More than learning. It's about making.",
      lead: 'Knowing something is one thing. Knowing what to do with it is another.',
      description: 'We believe the best way to learn is to create. To explore possibilities, ask questions, make mistakes, solve problems, and gradually turn ideas into working products.',
      pillars: [
        {
          num: '01',
          name: 'Curiosity',
          description: 'Develop the habit of asking questions and exploring possibilities.'
        },
        {
          num: '02',
          name: 'Understanding',
          description: 'Learn the core principles behind modern software, systems, and digital products.'
        },
        {
          num: '03',
          name: 'Creation',
          description: 'Move from passive learning to building functional, real-world applications.'
        },
        {
          num: '04',
          name: 'Experimentation',
          description: 'Try ideas freely, learn through iteration, and discover what works.'
        },
        {
          num: '05',
          name: 'Confidence',
          description: 'Gain the practical experience needed to build and ship independently.'
        }
      ]
    },
    exploration: {
      headline: 'What can you explore?',
      lead: 'The world of technology is vast. At Academy by Chintap, you can explore the ideas, tools, and practices that bring modern products to life.',
      dimensions: [
        {
          code: '01',
          title: 'Ideas & Product Thinking',
          description: 'How ideas evolve from a thought into a product people actually use.',
          tag: 'Product Discovery'
        },
        {
          code: '02',
          title: 'Web Applications & Experiences',
          description: 'Modern front-end and full-stack development that powers the modern web.',
          tag: 'Web Platforms'
        },
        {
          code: '03',
          title: 'Mobile Applications',
          description: 'Building useful, intuitive experiences for Android and iOS devices.',
          tag: 'iOS & Android'
        },
        {
          code: '04',
          title: 'Backend Systems & Intelligence',
          description: 'Designing APIs, databases, business logic, and cloud services that scale.',
          tag: 'APIs & Cloud'
        },
        {
          code: '05',
          title: 'Data & Connectivity',
          description: 'Working with data, real-time communication, and connected systems.',
          tag: 'Realtime Data'
        },
        {
          code: '06',
          title: 'AI & Emerging Technologies',
          description: 'Understanding and applying artificial intelligence and intelligent tools in practical ways.',
          tag: 'AI Tools & Agents'
        },
        {
          code: '07',
          title: 'Code Quality & Craftsmanship',
          description: 'Writing clean, maintainable, readable code and building with care.',
          tag: 'Engineering Craft'
        },
        {
          code: '08',
          title: 'From Idea to Deployment',
          description: 'Going through the full lifecycle: building, testing, deploying, and maintaining products.',
          tag: 'CI/CD & DevOps'
        }
      ]
    },
    journey: {
      headline: 'Learn by building.',
      lead: "Learning shouldn't be about sitting through lectures and memorizing syntax. At Academy by Chintap, you learn the way real products are built:",
      closing: 'Think of something. Build something. Make it happen.',
      steps: [
        {
          step: '01',
          name: 'Imagine',
          description: 'Start with an idea or a problem worth solving.'
        },
        {
          step: '02',
          name: 'Explore',
          description: 'Understand the possibilities and choose the right approach.'
        },
        {
          step: '03',
          name: 'Learn',
          description: 'Pick up the tools, concepts, and skills you need along the way.'
        },
        {
          step: '04',
          name: 'Build',
          description: 'Turn the idea into a working product, step by step.'
        },
        {
          step: '05',
          name: 'Test',
          description: 'Refine, optimize, and make sure it works well.'
        },
        {
          step: '06',
          name: 'Launch',
          description: 'Share it with the world.'
        }
      ]
    },
    flagshipCohort: {
      eyebrow: 'Flagship learning programme',
      title: 'The Full-Stack & Mobile App Development Cohort',
      description: 'Our flagship cohort is an intensive, hands-on learning experience designed to take you from fundamentals to building and deploying modern web and mobile applications.',
      highlights: [
        {
          label: 'Duration',
          value: '12 weeks of structured, project-driven learning.'
        },
        {
          label: 'Format',
          value: 'Small cohorts with direct mentorship and code reviews. Maximum of 15 participants per batch.'
        },
        {
          label: 'Focus',
          value: 'Modern full-stack web, cross-platform mobile, backend APIs, cloud deployment, and AI-assisted workflows.'
        },
        {
          label: 'Outcome',
          value: 'A fully functional, production-ready product designed, built, and shipped by you.'
        },
        {
          label: 'AI as Co-Pilot',
          value: 'Learn how to use modern AI development tools effectively to accelerate your workflow without losing foundational engineering principles.'
        }
      ],
      ctaText: 'Inquire About the Cohort',
      ctaUrl: '/contact',
      ctaAriaLabel: 'Inquire about joining the Full-Stack and Mobile App Development Cohort'
    },
    audiences: {
      headline: 'Who is it for?',
      lead: 'Academy by Chintap is for anyone who wants to build:',
      items: [
        {
          title: 'Students & graduates',
          description: 'Bridge the gap between academic theory and real-world software creation.'
        },
        {
          title: 'Career switchers',
          description: 'Transition into tech with practical, portfolio-backed engineering experience.'
        },
        {
          title: 'Working professionals',
          description: 'Level up into modern full-stack development, mobile apps, and AI tooling.'
        },
        {
          title: 'Founders & creators',
          description: 'Learn to prototype and launch your own digital products and MVPs.'
        },
        {
          title: 'Curious minds',
          description: 'Anyone who wants to understand how software works and experience the joy of making.'
        }
      ]
    },
    belief: {
      headline: 'Our belief',
      quote: "You don't come here just to learn technology. You come here to discover what you can create with it.",
      motto: 'Think of something. Build something. Make it happen.',
      inquireCta: {
        text: 'Inquire about Academy',
        url: '/contact',
        ariaLabel: 'Inquire about Academy by Chintap programmes and cohorts'
      },
      exploreCta: {
        text: 'Explore what we do',
        url: '/what-we-do',
        ariaLabel: 'Explore what we do at Chintap'
      }
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
        badge: 'Capabilities',
        title: 'What we do',
        description: 'From physical hardware to purposeful software — exploring how an idea finds the form that makes sense.',
        url: '/what-we-do',
        actionText: 'Explore what we do',
        ariaLabel: 'Explore What We Do at Chintap'
      },
      {
        badge: 'Process',
        title: 'How we work',
        description: 'The iterative learning loop, early prototypes, and finding the simplest answer for the job.',
        url: '/how-we-work',
        actionText: 'Explore how we work',
        ariaLabel: 'Explore How We Work at Chintap'
      },
      {
        badge: 'Inquiries',
        title: 'Explorations',
        description: 'Open questions, active experiments, and possibilities we are curious enough to pursue.',
        url: '/explorations',
        actionText: 'See explorations',
        ariaLabel: 'See active explorations at Chintap'
      }
    ],
    'what-we-do': [
      {
        badge: 'Process',
        title: 'How we work',
        description: 'See how our iterative prototyping loop guides ideas from problem framing to the simplest answer.',
        url: '/how-we-work',
        actionText: 'Read how we work',
        ariaLabel: 'Read How We Work at Chintap'
      },
      {
        badge: 'Inquiries',
        title: 'Explorations',
        description: 'Browse open questions, experimental concepts, and early inquiries currently in motion.',
        url: '/explorations',
        actionText: 'See explorations',
        ariaLabel: 'See active explorations at Chintap'
      },
      {
        badge: 'Ventures',
        title: 'Partners',
        description: 'Discover how we collaborate with technology and manufacturing specialists like Figcube.',
        url: '/partners',
        actionText: 'Meet our partners',
        ariaLabel: 'Meet partners of Chintap'
      }
    ],
    'how-we-work': [
      {
        badge: 'People',
        title: 'Building teams',
        description: 'The work shapes the capabilities needed — how we assemble small, high-agency teams.',
        url: '/building-teams',
        actionText: 'Explore building teams',
        ariaLabel: 'Explore Building Teams at Chintap'
      },
      {
        badge: 'Capabilities',
        title: 'What we do',
        description: 'From hardware tools to purposeful apps, explore the range of forms that emerge from the loop.',
        url: '/what-we-do',
        actionText: 'Explore what we do',
        ariaLabel: 'Explore What We Do at Chintap'
      },
      {
        badge: 'Inquiries',
        title: 'Explorations',
        description: 'See how our hands-on prototyping philosophy applies to open questions and active experiments.',
        url: '/explorations',
        actionText: 'See explorations',
        ariaLabel: 'See active explorations at Chintap'
      }
    ],
    'explorations': [
      {
        badge: 'Capabilities',
        title: 'What we do',
        description: 'See how raw inquiries and initial prototypes mature into complete, purposeful products.',
        url: '/what-we-do',
        actionText: 'Explore what we do',
        ariaLabel: 'Explore What We Do at Chintap'
      },
      {
        badge: 'Process',
        title: 'How we work',
        description: 'Dive into the craft of rapid hypothesis testing, learning loops, and honest evaluation.',
        url: '/how-we-work',
        actionText: 'Read how we work',
        ariaLabel: 'Read How We Work at Chintap'
      },
      {
        badge: 'Academy',
        title: 'Academy',
        description: 'A hands-on cohort programme to learn, build and ship real software with AI assistance.',
        url: '/academy',
        actionText: 'Explore Academy',
        ariaLabel: 'Explore Academy by Chintap'
      }
    ],
    'building-teams': [
      {
        badge: 'Ventures',
        title: 'Partners',
        description: 'Learn how we team up with independent builders, creators, and technology partners like Figcube.',
        url: '/partners',
        actionText: 'Explore partners',
        ariaLabel: 'Explore Partners of Chintap'
      },
      {
        badge: 'Process',
        title: 'How we work',
        description: 'The shared principles, rapid iterations, and learning rhythm our teams rally around.',
        url: '/how-we-work',
        actionText: 'Read how we work',
        ariaLabel: 'Read How We Work at Chintap'
      },
      {
        badge: 'Capabilities',
        title: 'What we do',
        description: 'Explore the spectrum of physical products and software tools our teams design and build.',
        url: '/what-we-do',
        actionText: 'Explore what we do',
        ariaLabel: 'Explore What We Do at Chintap'
      }
    ],
    'partners': [
      {
        badge: 'People',
        title: 'Building teams',
        description: 'How the work defines the capabilities needed, and how we assemble focused teams around it.',
        url: '/building-teams',
        actionText: 'Explore building teams',
        ariaLabel: 'Explore Building Teams at Chintap'
      },
      {
        badge: 'Process',
        title: 'How we work',
        description: 'Our open, hypothesis-driven approach to shared development and joint ventures.',
        url: '/how-we-work',
        actionText: 'Read how we work',
        ariaLabel: 'Read How We Work at Chintap'
      },
      {
        badge: 'Perspective',
        title: 'About Chintap',
        description: 'The curiosity, generalist mindset, and founding principles behind everything we do.',
        url: '/about',
        actionText: 'Read about Chintap',
        ariaLabel: 'Read About Chintap'
      }
    ],
    'about': [
      {
        badge: 'Capabilities',
        title: 'What we do',
        description: 'Explore the tangible manifestations of our philosophy across hardware and software.',
        url: '/what-we-do',
        actionText: 'Explore what we do',
        ariaLabel: 'Explore What We Do at Chintap'
      },
      {
        badge: 'Process',
        title: 'How we work',
        description: 'Understand our iterative method from problem framing to the simplest, most useful solution.',
        url: '/how-we-work',
        actionText: 'Read how we work',
        ariaLabel: 'Read How We Work at Chintap'
      },
      {
        badge: 'Inquiries',
        title: 'Explorations',
        description: 'See the questions and open-ended experiments currently occupying our attention.',
        url: '/explorations',
        actionText: 'See explorations',
        ariaLabel: 'See active explorations at Chintap'
      }
    ],
    'contact': [
      {
        badge: 'Overview',
        title: 'Home',
        description: 'Return to the possibility space: Things, apps, and ideas taking shape.',
        url: '/',
        actionText: 'Back to home',
        ariaLabel: 'Return to Chintap Home'
      },
      {
        badge: 'Process',
        title: 'How we work',
        description: 'What to expect when collaborating with Chintap on an idea or project.',
        url: '/how-we-work',
        actionText: 'Read how we work',
        ariaLabel: 'Read How We Work at Chintap'
      },
      {
        badge: 'Perspective',
        title: 'About Chintap',
        description: 'Learn more about our background, values, and why we build the way we do.',
        url: '/about',
        actionText: 'Read about Chintap',
        ariaLabel: 'Read About Chintap'
      }
    ],
    'customers': [
      {
        badge: 'Collaboration',
        title: 'Partners',
        description: 'Explore independent capabilities collaborating with Chintap across technology and platforms.',
        url: '/partners',
        actionText: 'Explore partners',
        ariaLabel: 'Explore Chintap Partners'
      },
      {
        badge: 'Process',
        title: 'How we work',
        description: 'Understand our iterative method from problem framing to the simplest, most useful solution.',
        url: '/how-we-work',
        actionText: 'Read how we work',
        ariaLabel: 'Read How We Work at Chintap'
      },
      {
        badge: 'Inquiries',
        title: 'Contact',
        description: 'Tell us about your project, challenge, or what you\'ve been wondering whether it\'s possible to make.',
        url: '/contact',
        actionText: "Let's Talk",
        ariaLabel: "Let's talk with Chintap"
      }
    ],
    'academy': [
      {
        badge: 'Capabilities',
        title: 'What we do',
        description: 'See the physical products, purposeful applications, and connected experiences built at Chintap.',
        url: '/what-we-do',
        actionText: 'Explore what we do',
        ariaLabel: 'Explore What We Do at Chintap'
      },
      {
        badge: 'Process',
        title: 'How we work',
        description: 'Discover the iterative discovery loop, rapid prototyping, and shipping discipline that fuels our work.',
        url: '/how-we-work',
        actionText: 'Read how we work',
        ariaLabel: 'Read How We Work at Chintap'
      },
      {
        badge: 'Get In Touch',
        title: 'Contact',
        description: 'Have a question about our cohorts or want to explore learning with Academy by Chintap?',
        url: '/contact',
        actionText: 'Get in touch',
        ariaLabel: 'Contact Chintap about Academy'
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
