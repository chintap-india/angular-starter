import { Component, ChangeDetectionStrategy, Input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import type { GraphInspectionData } from '../../../features/modals/graph-inspection-dialog/graph-inspection-dialog.component';

export type NetworkGraphMode =
  | 'home'
  | 'home-thing-app'
  | 'home-what-could-it-be'
  | 'home-thinking'
  | 'home-begins'
  | 'building-teams'
  | 'what-we-do'
  | 'how-we-work'
  | 'explorations'
  | 'partners'
  | 'customers'
  | 'about'
  | 'contact'
  | 'academy';

export interface NodeInfo {
  label: string;
  detail: string;
  route?: string;
  routeLabel?: string;
}

export const NODE_DETAILS: Record<string, NodeInfo> = {
  // Home
  'home-thought': { label: 'A Thought', detail: 'What if? A passing observation or curiosity.' },
  'home-chintap': { label: 'Chintap', detail: 'Things. Apps. Possibilities.' },
  'home-things': { label: 'Things', detail: 'Physical products and useful objects.', route: '/what-we-do', routeLabel: 'What we do →' },
  'home-apps': { label: 'Apps', detail: 'Software with a reason to exist.', route: '/what-we-do', routeLabel: 'What we do →' },
  'home-possibilities': { label: 'Possibilities', detail: 'Connections, combinations, and things not yet defined.', route: '/explorations', routeLabel: 'Explorations →' },

  // How We Work
  'hww-explore': { label: 'Explore', detail: 'Understand the problem and question assumptions.' },
  'hww-make': { label: 'Make', detail: 'Create a sketch, prototype, working example, or first version.' },
  'hww-learn': { label: 'Learn', detail: 'See what works, what doesn\'t, and what was missed.' },
  'hww-rethink': { label: 'Rethink', detail: 'Refine, change direction, simplify, or stop.' },
  'hww-right-thing': { label: 'The Right Thing', detail: 'The right thing for the job — simpler is often better.' },

  // What We Do
  'wwd-problem': { label: 'The Problem / Possibility', detail: 'The starting point — understanding what is worth solving.' },
  'wwd-physical': { label: 'A Physical Thing', detail: 'Something you can use, hold, or experience.' },
  'wwd-software': { label: 'Software', detail: 'A tool or application with a clear purpose.' },
  'wwd-combination': { label: 'A Combination', detail: 'When the physical and digital work better together.' },
  'wwd-another': { label: 'Another Approach', detail: 'Sometimes the first framing isn\'t the right one.' },
  'wwd-makes-sense': { label: 'What Makes Sense?', detail: 'The form should follow the function, not the other way around.' },

  // Explorations
  'exp-questions': { label: 'Questions Worth Following', detail: 'An exploration is a question worth spending time with.' },
  'exp-growing': { label: 'Growing Up, Growing Together', detail: 'Children, parents, teachers learning and connecting.' },
  'exp-habits': { label: 'Small Habits', detail: 'Everyday routines supported without unnecessary noise.' },
  'exp-conversations': { label: 'Better Conversations', detail: 'Helping people communicate more meaningfully when it counts.' },
  'exp-everyday': { label: 'Everyday Life Easier', detail: 'Useful tools and subtle frictions made better.' },
  'exp-connections': { label: 'Unexpected Connections', detail: 'Finding possibilities where disciplines intersect.' },
  'exp-question': { label: 'A Question', detail: 'An inquiry worth holding on to.' },
  'exp-experiment': { label: 'An Experiment', detail: 'A small test to learn what happens.' },
  'exp-concept': { label: 'A Concept', detail: 'A tangible model or framework.' },
  'exp-direction': { label: 'A Change of Direction', detail: 'Willingness to pivot when learning demands it.' },

  // Partners
  'part-strengths': { label: 'Different Strengths', detail: 'Creative, practical, technical, community, and experience.' },
  'part-possibility': { label: 'Shared Possibility', detail: 'A reason to work together on something worthwhile.' },
  'part-chintap': { label: 'Chintap', detail: 'Make it make sense — bridging strengths into useful results.' },
  'part-mockwin': { label: 'MockWin', detail: 'Partner in technical depth, simulation, and interview preparation.', route: '/building-teams', routeLabel: 'Building Teams →' },
  'part-figcube': { label: 'Figcube', detail: 'Partner in practical digital products, publishing, and commerce.' },

  // Customers
  'cust-chintap': { label: 'Chintap', detail: 'Good work comes from good conversations.' },
  'cust-conversation': { label: 'Good Conversations', detail: 'Every piece of work begins with dialogue, context, and shared clarity.' },
  'cust-discretion': { label: 'Trust & Discretion', detail: 'Not every engagement is shared publicly. The work matters, and so does mutual trust.' },
  'cust-astar': { label: 'AStar Electricals', detail: 'Brand identity, letter A & bolt mark, and business communication in Bengaluru.', route: '/customers', routeLabel: 'View Customer Story →' },

  // About
  'abt-chintap': { label: 'Chintap', detail: 'Curious about how things work, and how they could be better.' },
  'abt-no-box': { label: 'No Single Box', detail: 'The world doesn\'t neatly separate physical from digital. We follow worthwhile ideas rather than predefined categories.' },
  'abt-explore-make': { label: 'Explore & Make', detail: 'Curious enough to explore, practical enough to make, learn, and unlearn along the way.' },
  'abt-work-in-progress': { label: 'Work in Progress', detail: 'Not tied to a single product or industry. Openness is intentional—there is plenty left to explore.' },
  'abt-your-ideas': { label: 'Your Ideas', detail: 'Conversations that lead somewhere — a better question, a new perspective, or something worth building.', route: '/contact', routeLabel: 'Let\'s Talk →' },

  // Building Teams
  'teams-work': { label: 'The Work to Be Done', detail: 'Start with what needs to happen before defining roles.' },
  'teams-capabilities': { label: 'Capabilities Needed', detail: 'Identifying skills, craft, and judgment required.' },
  'teams-people': { label: 'People & Team', detail: 'Bringing together people with shared direction.' },
  'teams-way': { label: 'Shared Way of Working', detail: 'Establishing clarity, rhythm, and room to learn.' },
  'teams-grow': { label: 'Capability That Can Grow', detail: 'Building durable momentum that outlasts any single sprint.' },
  'teams-mockwin': { label: 'MockWin', detail: 'Partner for evaluating technical depth and practical capability.' },

  // Contact
  'cnt-question': { label: 'A Question', detail: 'What you\'re thinking about or trying to solve.' },
  'cnt-conversation': { label: 'A Conversation', detail: 'Reach out via our contact form — no finished brief required.', route: '/contact', routeLabel: 'Get in Touch →' },
  'cnt-next-step': { label: 'A Possible Next Step', detail: 'Exploring together what makes sense to make.' },

  // Academy
  'acd-center': { label: 'Academy by Chintap', detail: 'From ideas to life. Imagine → Explore → Learn → Build → Test → Launch', route: '/academy', routeLabel: 'Academy' },
  'acd-imagine': { label: '01. Imagine', detail: 'Every great product starts with a thought, a problem worth solving, or curiosity.' },
  'acd-explore': { label: '02. Explore', detail: 'Understand possibilities, product thinking, and choose the right technical approach.' },
  'acd-learn': { label: '03. Learn', detail: 'Master modern full-stack web, mobile apps, backend APIs, and AI co-pilots.' },
  'acd-build': { label: '04. Build', detail: 'Turn ideas into working code through hands-on creation and real feedback.' },
  'acd-test': { label: '05. Test', detail: 'Refine, benchmark, write tests, and ensure code craftsmanship and speed.' },
  'acd-launch': { label: '06. Launch', detail: 'Deploy to production cloud environments and share your working product.' }
};

export const GRAPH_METADATA_MAP: Record<NetworkGraphMode, { title: string; subtitle: string; excerpt: string; defaultLine: string }> = {
  'home': {
    title: 'The Possibility Space',
    subtitle: 'Things. Apps. Possibilities.',
    excerpt: 'An idea doesn\'t have to know what it will become. From physical objects to software with a reason to exist, and connections not yet defined.',
    defaultLine: 'An idea doesn\'t have to know what it will become.'
  },
  'how-we-work': {
    title: 'The Learning Loop',
    subtitle: 'Four guiding principles in an iterative cycle',
    excerpt: 'Progress means getting closer to a useful result. Explore before you commit. Make something we can learn from. Keep what works, rethink what doesn\'t. Know when it\'s enough.',
    defaultLine: 'Progress means getting closer to a useful result.'
  },
  'what-we-do': {
    title: 'Let the Problem Choose the Form',
    subtitle: 'Physical things, software, and combinations',
    excerpt: 'The form should follow the function, not the other way around. Whether a physical thing, software, a combination, or another approach entirely.',
    defaultLine: 'The form should follow the function, not the other way around.'
  },
  'explorations': {
    title: 'Open Questions',
    subtitle: 'Inquiries worth spending time with',
    excerpt: 'An exploration is a question worth spending time with, not a promise that a product will exist.',
    defaultLine: 'An exploration is a question worth spending time with, not a promise that a product will exist.'
  },
  'partners': {
    title: 'Different Strengths, Shared Possibilities',
    subtitle: 'A useful connection begins with a reason to work together',
    excerpt: 'A useful connection begins with a reason to work together. Independent capabilities coming together to make something make sense.',
    defaultLine: 'A useful connection begins with a reason to work together.'
  },
  'customers': {
    title: 'Good Work, Good Conversations',
    subtitle: 'Client collaborations built on trust and clarity',
    excerpt: 'Every piece of work begins somewhere. We work with businesses to shape identities, tools, and communications that earn their place.',
    defaultLine: 'Good work comes from good conversations.'
  },
  'about': {
    title: 'No Single Box',
    subtitle: 'Curious by nature, practical enough to make',
    excerpt: 'Follow a worthwhile idea. Don\'t force it into a predefined category.',
    defaultLine: 'Follow a worthwhile idea. Don\'t force it into a predefined category.'
  },
  'building-teams': {
    title: 'Build Around the Work',
    subtitle: 'The answers shape the team — not the other way around',
    excerpt: 'The answers shape the team — not the other way around. Understanding the work ahead and assembling the capabilities needed to grow.',
    defaultLine: 'The answers shape the team — not the other way around.'
  },
  'contact': {
    title: 'A Starting Point',
    subtitle: 'A question, a conversation, a possible next step',
    excerpt: 'Every interesting product starts somewhere. Tell us what you\'re thinking about — let\'s see where the conversation leads.',
    defaultLine: 'Let\'s see where the conversation leads.'
  },
  'academy': {
    title: 'From Ideas to Life',
    subtitle: 'The Maker’s Journey: Imagine → Explore → Learn → Build → Test → Launch',
    excerpt: 'You don\'t come here just to learn technology. You come here to discover what you can create with it.',
    defaultLine: 'Imagine → Explore → Learn → Build → Test → Launch'
  },
  'home-thing-app': {
    title: 'It Could Be a Thing. It Could Be an App.',
    subtitle: 'Form uncommitted — physical hardware, digital software, or both',
    excerpt: 'Some ideas take shape in the physical world. Others live on a screen. Some bring the two together in ways you hadn\'t considered before.',
    defaultLine: 'Form uncommitted — physical, digital, or both.'
  },
  'home-what-could-it-be': {
    title: 'So, What Could It Be?',
    subtitle: 'Exploring the space between what if? and why not?',
    excerpt: 'An idea might solve a problem you\'ve lived with for years. It might lead to a product, an app, a connected device, or an entirely new possibility.',
    defaultLine: 'Exploring the space between what if? and why not.'
  },
  'home-thinking': {
    title: 'Thinking Is Only the Beginning.',
    subtitle: 'Empirical prototyping, evaluation, and simplest working solutions',
    excerpt: 'Ideas are interesting. Making something out of them is even better. That means asking questions, trying things, and finding that the simplest answer is the right one.',
    defaultLine: 'Making something we can learn from.'
  },
  'home-begins': {
    title: 'And That\'s Where Chintap Begins.',
    subtitle: 'Curiosity, shared direction, and purposeful making',
    excerpt: 'With curiosity. With a question. With the possibility that something could be done a little differently.',
    defaultLine: 'Possibilities worth following.'
  }
};

@Component({
  selector: 'app-network-graph',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './network-graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'relative block w-full h-full select-none group/graph'
  }
})
export class NetworkGraphComponent {
  @Input({ required: true }) mode: NetworkGraphMode = 'home';
  @Input() allowExpand = true;

  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  readonly selectedNode = signal<string | null>(null);

  readonly activeNodeInfo = computed<NodeInfo | null>(() => {
    const key = this.selectedNode();
    if (!key) return null;
    return NODE_DETAILS[key] || null;
  });

  readonly supportingLine = computed<string>(() => {
    const info = this.activeNodeInfo();
    if (info) {
      return info.detail;
    }
    const meta = GRAPH_METADATA_MAP[this.mode];
    return meta?.defaultLine || 'Things. Apps. Possibilities.';
  });

  selectNode(nodeKey: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (this.selectedNode() === nodeKey) {
      this.selectedNode.set(null);
    } else {
      this.selectedNode.set(nodeKey);
    }
  }

  navigateToRoute(route: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.router.navigateByUrl(route);
  }

  clearSelection(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedNode.set(null);
  }

  async openExpandedView(event?: MouseEvent): Promise<void> {
    if (event) {
      event.stopPropagation();
    }
    if (!this.allowExpand) return;

    try {
      const { GraphInspectionDialogComponent } = await import(
        '../../../features/modals/graph-inspection-dialog/graph-inspection-dialog.component'
      );

      const meta = GRAPH_METADATA_MAP[this.mode] || GRAPH_METADATA_MAP.home;
      const dialogData: GraphInspectionData = {
        mode: this.mode,
        title: meta.title,
        subtitle: meta.subtitle,
        excerpt: meta.excerpt
      };

      this.dialog.open(GraphInspectionDialogComponent, {
        data: dialogData,
        panelClass: ['graph-modal-panel', 'p-0', 'bg-transparent', 'shadow-none', 'overflow-visible'],
        maxWidth: 'min(94vw, 540px)',
        width: '100%',
        maxHeight: '94dvh',
        autoFocus: false,
        restoreFocus: true
      });
    } catch (err) {
      console.error('Error in openExpandedView:', err);
    }
  }
}
