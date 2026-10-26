/* Study syllabus for the PSPO I assessment. Content is trusted, static HTML. */
window.SYLLABUS = {
  exam: {
    questions: 80,
    minutes: 60,
    pass: 85,
    summary: 'The Professional Scrum Product Owner I (PSPO I) assessment from Scrum.org validates that you understand the Scrum framework and how a Product Owner maximizes the value of a product. Questions are scenario based and test the <strong>2020 Scrum Guide</strong> plus product value concepts such as Evidence-Based Management.',
    facts: [
      { value: '80', label: 'questions' },
      { value: '60 min', label: 'time limit' },
      { value: '85%', label: 'passing score' },
      { value: '3 types', label: 'single choice, multiple answer, true/false' },
      { value: 'English', label: 'language' },
      { value: 'Lifetime', label: 'certification, no renewal' },
    ],
    note: 'Fees, format and policies can change. Always confirm the current details on scrum.org before booking.',
  },

  plan: [
    { title: 'Days 1–2 · Foundations', text: 'Read the Scrum Guide end to end twice. Study <em>Scrum Theory & Values</em> and <em>The Scrum Team</em>, then practice those topics.' },
    { title: 'Days 3–4 · Events and artifacts', text: 'Study <em>Scrum Events</em> and <em>Artifacts & Commitments</em>. Memorize timeboxes and the commitment for each artifact.' },
    { title: 'Days 5–6 · The Product Owner', text: 'Study <em>The Product Owner</em> and <em>Product Backlog Management</em>. Focus on accountability versus delegation.' },
    { title: 'Days 7–8 · Value and planning', text: 'Read the Evidence-Based Management Guide. Study <em>Product Value & EBM</em> and <em>Forecasting, Release & Scaling</em>.' },
    { title: 'Days 9–10 · Close the gaps', text: 'Use <em>Review mistakes</em> until it is empty. Take the free Product Owner Open and Scrum Open assessments on scrum.org.' },
    { title: 'Days 11–14 · Simulate', text: 'Take full exam simulations. Book the real assessment once you score 90% or more three times in a row.' },
  ],

  resources: [
    { title: 'The Scrum Guide (2020)', text: 'The primary source. Most questions are answered here.', url: 'https://scrumguides.org/scrum-guide.html' },
    { title: 'Evidence-Based Management Guide', text: 'Key Value Areas and goals used in value questions.', url: 'https://www.scrum.org/resources/evidence-based-management-guide' },
    { title: 'PSPO I assessment page', text: 'Official format, price and focus areas.', url: 'https://www.scrum.org/assessments/professional-scrum-product-owner-i-certification' },
    { title: 'Product Owner Open assessment', text: 'Free official practice questions.', url: 'https://www.scrum.org/open-assessments/product-owner-open' },
    { title: 'Scrum Open assessment', text: 'Free official practice on the Scrum framework.', url: 'https://www.scrum.org/open-assessments/scrum-open' },
    { title: 'Scrum Glossary', text: 'Definitions of the terms used in the exam.', url: 'https://www.scrum.org/resources/scrum-glossary' },
  ],

  topics: [
    {
      id: 'theory', short: 'Theory & Values', title: 'Scrum Theory & Values', icon: 'lightbulb',
      summary: 'Why Scrum works: empiricism, lean thinking, the three pillars and the five values.',
      objectives: [
        'Explain empiricism and lean thinking and why Scrum relies on them',
        'Describe transparency, inspection and adaptation and how they depend on each other',
        'Recognize the five Scrum values in real situations',
        'Explain why Scrum is a purposefully incomplete framework and why it is immutable',
      ],
      sections: [
        { h: 'What Scrum is', html: '<p>Scrum is a <strong>lightweight framework</strong> that helps people, teams and organizations generate value through <strong>adaptive solutions for complex problems</strong>. In complex work more is unknown than known, so detailed up-front plans quickly become wrong.</p><p>Scrum is <strong>purposefully incomplete</strong>: it defines only the parts required to implement Scrum theory. Other practices (user stories, Kanban boards, TDD, story points…) can be used within it, but none are required.</p>' },
        { h: 'Empiricism and lean thinking', html: '<ul><li><strong>Empiricism</strong> asserts that knowledge comes from experience and making decisions based on what is observed.</li><li><strong>Lean thinking</strong> reduces waste and focuses on the essentials.</li><li>Scrum uses an <strong>iterative, incremental</strong> approach to <strong>optimize predictability and control risk</strong>.</li></ul>' },
        { h: 'The three pillars', html: '<ul><li><strong>Transparency</strong> — the emergent process and work must be visible to those performing the work and those receiving it. Low transparency leads to decisions that <em>diminish value and increase risk</em>. Transparency enables inspection.</li><li><strong>Inspection</strong> — artifacts and progress toward agreed goals are inspected frequently and diligently. The events provide the cadence. Inspection enables adaptation.</li><li><strong>Adaptation</strong> — if any aspect deviates outside acceptable limits or the product is unacceptable, adjust <em>as soon as possible</em>. Inspection without adaptation is considered pointless.</li></ul>' },
        { h: 'The five values', html: '<table><tr><th>Value</th><th>In practice</th></tr><tr><td>Commitment</td><td>Committing to achieve goals and support each other.</td></tr><tr><td>Focus</td><td>Focusing on the work of the Sprint to make the best possible progress toward goals.</td></tr><tr><td>Openness</td><td>Being open about the work and the challenges.</td></tr><tr><td>Respect</td><td>Respecting each other as capable, independent people.</td></tr><tr><td>Courage</td><td>Having the courage to do the right thing and work on tough problems.</td></tr></table>' },
        { h: 'Immutability', html: '<p>Changing the core design, leaving out elements or not following the rules of Scrum covers up problems and limits its benefits. <strong>Implementing only parts of Scrum is possible, but the result is not Scrum.</strong></p>' },
      ],
      tips: [
        'Distractors often list “predictability”, “velocity”, “commitment” or “compliance” as pillars. The pillars are only transparency, inspection and adaptation.',
        'Adaptation happens as soon as possible — not only at the Sprint Retrospective.',
        'Scrum is for complex work. Answers describing fixed, fully known requirements point to predictive approaches.',
        'Scrum does not mandate any technique (user stories, story points, burn-downs).',
      ],
      refs: [
        { label: 'Scrum Guide – Scrum Theory', url: 'https://scrumguides.org/scrum-guide.html#scrum-theory' },
        { label: 'Scrum Guide – Scrum Values', url: 'https://scrumguides.org/scrum-guide.html#scrum-values' },
      ],
    },
    {
      id: 'team', short: 'Scrum Team', title: 'The Scrum Team', icon: 'groups',
      summary: 'One Scrum Master, one Product Owner and Developers: a small, cross-functional, self-managing unit.',
      objectives: [
        'Describe the composition and size of a Scrum Team',
        'Explain the accountabilities of the Developers, Product Owner and Scrum Master',
        'Explain what cross-functional and self-managing mean in practice',
        'Explain how the Scrum Master serves the Product Owner, the team and the organization',
      ],
      sections: [
        { h: 'Composition', html: '<ul><li>One <strong>Scrum Master</strong>, one <strong>Product Owner</strong> and <strong>Developers</strong>.</li><li><strong>No sub-teams or hierarchies</strong>; a cohesive unit focused on one objective at a time, the Product Goal.</li><li><strong>Typically 10 or fewer people</strong> — small enough to stay nimble, large enough to complete significant work in a Sprint.</li><li>If a team grows too large, it should consider reorganizing into multiple cohesive Scrum Teams focused on the same product, sharing the <strong>same Product Goal, Product Backlog and Product Owner</strong>.</li></ul>' },
        { h: 'Cross-functional and self-managing', html: '<p><strong>Cross-functional</strong>: members have all the skills necessary to create value each Sprint. <strong>Self-managing</strong>: they internally decide who does what, when and how.</p><p>The Scrum Team is responsible for <strong>all product-related activities</strong>: stakeholder collaboration, verification, maintenance, operation, experimentation, research and development. The <strong>entire Scrum Team</strong> is accountable for creating a valuable, useful Increment every Sprint.</p>' },
        { h: 'Developers', html: '<p>Accountable for:</p><ul><li>Creating a plan for the Sprint, the Sprint Backlog</li><li>Instilling quality by adhering to a Definition of Done</li><li>Adapting their plan each day toward the Sprint Goal</li><li>Holding each other accountable as professionals</li></ul>' },
        { h: 'Scrum Master', html: '<p>Accountable for establishing Scrum as defined in the Scrum Guide and for the <strong>Scrum Team’s effectiveness</strong>. True leaders who serve the Scrum Team and the larger organization.</p><ul><li><strong>Serves the Product Owner</strong> by helping find techniques for effective Product Goal definition and Product Backlog management, helping the team understand the need for clear and concise items, helping establish empirical product planning, and facilitating stakeholder collaboration as requested or needed.</li><li><strong>Serves the team</strong> by coaching self-management and cross-functionality, helping create high-value Increments, removing impediments and ensuring events are positive, productive and timeboxed.</li><li><strong>Serves the organization</strong> by leading, training and coaching Scrum adoption and removing barriers between stakeholders and Scrum Teams.</li></ul>' },
      ],
      tips: [
        '“3 to 9 Developers” is the old 2017 rule. The 2020 guide says typically 10 or fewer people in total.',
        'There is no “team lead”, “tester” or “architect” role inside a Scrum Team — only Developers.',
        'Managers do not assign work to Developers; Developers self-manage how they do the work.',
        'The Scrum Master does not order the Product Backlog or decide releases.',
      ],
      refs: [
        { label: 'Scrum Guide – Scrum Team', url: 'https://scrumguides.org/scrum-guide.html#scrum-team' },
      ],
    },
    {
      id: 'events', short: 'Events', title: 'Scrum Events', icon: 'loop',
      summary: 'The Sprint and the four events inside it, their purpose, participants and timeboxes.',
      objectives: [
        'State the purpose, participants and timebox of each event',
        'Explain what can and cannot change during a Sprint',
        'Explain who can cancel a Sprint and when',
        'Describe the Product Owner’s role in each event',
      ],
      sections: [
        { h: 'Timeboxes (for a one-month Sprint)', html: '<div class="table-wrap"><table><tr><th>Event</th><th>Timebox</th><th>Purpose</th></tr><tr><td>Sprint</td><td>≤ 1 month, fixed length</td><td>Container for all other events; turns ideas into value.</td></tr><tr><td>Sprint Planning</td><td>8 hours max</td><td>Why is this Sprint valuable? What can be Done? How will the work get done?</td></tr><tr><td>Daily Scrum</td><td>15 minutes</td><td>Developers inspect progress toward the Sprint Goal and adapt the Sprint Backlog.</td></tr><tr><td>Sprint Review</td><td>4 hours max</td><td>Inspect the outcome of the Sprint and determine future adaptations.</td></tr><tr><td>Sprint Retrospective</td><td>3 hours max</td><td>Plan ways to increase quality and effectiveness.</td></tr></table></div><p>Shorter Sprints usually mean shorter events.</p>' },
        { h: 'The Sprint', html: '<ul><li>A new Sprint starts <strong>immediately after</strong> the conclusion of the previous one. There is no gap and no “Sprint 0” or “hardening Sprint”.</li><li>During the Sprint: no changes that would endanger the Sprint Goal; quality does not decrease; the Product Backlog is refined as needed; scope may be clarified and renegotiated with the Product Owner as more is learned.</li><li>Shorter Sprints generate more learning cycles and limit risk of cost and effort to a smaller time frame.</li><li>A Sprint can be cancelled if the Sprint Goal becomes obsolete. <strong>Only the Product Owner</strong> has the authority to cancel.</li></ul>' },
        { h: 'Sprint Planning', html: '<ul><li>The Product Owner ensures attendees are prepared to discuss the most important items and how they map to the Product Goal.</li><li>The whole Scrum Team crafts the <strong>Sprint Goal</strong>; it must be finalized before the end of Sprint Planning.</li><li>The <strong>Developers</strong> select items from the Product Backlog and decide how to do the work. The team may invite others to provide advice.</li></ul>' },
        { h: 'Daily Scrum', html: '<p>A 15-minute event <strong>for the Developers</strong>, same time and place each working day. If the Product Owner or Scrum Master are actively working on Sprint Backlog items, they participate as Developers. The Developers choose the structure and techniques.</p>' },
        { h: 'Sprint Review and Retrospective', html: '<ul><li><strong>Sprint Review</strong>: the Scrum Team presents results to <strong>key stakeholders</strong> and progress toward the Product Goal is discussed. It is a <strong>working session</strong>, not just a demo, and the Product Backlog may be adjusted. It is <strong>not a gate</strong> to releasing value.</li><li><strong>Sprint Retrospective</strong>: the Scrum Team inspects how the last Sprint went regarding individuals, interactions, processes, tools and its Definition of Done. Improvements may be added to the next Sprint Backlog. It concludes the Sprint.</li><li><strong>Product Backlog refinement</strong> is an ongoing activity, <em>not</em> an event.</li></ul>' },
      ],
      tips: [
        'Only the Product Owner can cancel a Sprint, though others can influence that decision.',
        'The Sprint is never extended to finish work.',
        'The Daily Scrum is not a status meeting for the Product Owner or managers.',
        'The Sprint Review is not a sign-off or acceptance meeting.',
        'Refinement is not one of the five events.',
      ],
      refs: [
        { label: 'Scrum Guide – Scrum Events', url: 'https://scrumguides.org/scrum-guide.html#scrum-events' },
      ],
    },
    {
      id: 'artifacts', short: 'Artifacts', title: 'Artifacts & Commitments', icon: 'layers',
      summary: 'Product Backlog, Sprint Backlog and Increment — and the commitment that makes each one transparent.',
      objectives: [
        'Describe each artifact and who owns it',
        'Match each artifact to its commitment: Product Goal, Sprint Goal, Definition of Done',
        'Explain what happens to work that does not meet the Definition of Done',
        'Explain how multiple Increments and early releases work',
      ],
      sections: [
        { h: 'Artifacts and commitments', html: '<div class="table-wrap"><table><tr><th>Artifact</th><th>Commitment</th><th>Notes</th></tr><tr><td>Product Backlog</td><td><strong>Product Goal</strong></td><td>Emergent, ordered list of what is needed to improve the product. Single source of work. Product Owner accountable.</td></tr><tr><td>Sprint Backlog</td><td><strong>Sprint Goal</strong></td><td>Sprint Goal (why) + selected items (what) + actionable plan (how). By and for the Developers.</td></tr><tr><td>Increment</td><td><strong>Definition of Done</strong></td><td>Concrete stepping stone toward the Product Goal, additive to all prior Increments and thoroughly verified.</td></tr></table></div>' },
        { h: 'Product Goal and Sprint Goal', html: '<ul><li>The <strong>Product Goal</strong> describes a future state of the product that serves as a target to plan against. It is in the Product Backlog. The Scrum Team must <strong>fulfill (or abandon) one objective before taking on the next</strong>.</li><li>The <strong>Sprint Goal</strong> is the single objective for the Sprint. It is the Developers’ commitment and gives flexibility in the exact work needed. If work turns out different than expected, Developers collaborate with the Product Owner to negotiate the scope of the Sprint Backlog without affecting the Sprint Goal.</li></ul>' },
        { h: 'Increment and Definition of Done', html: '<ul><li>Multiple Increments may be created within a Sprint. An Increment <strong>may be delivered to stakeholders before the end of the Sprint</strong>.</li><li>Work cannot be considered part of an Increment unless it meets the Definition of Done. Undone work cannot be released or presented at the Sprint Review; it <strong>returns to the Product Backlog</strong>.</li><li>If the Definition of Done is an organizational standard, all Scrum Teams follow it as a minimum. Otherwise the <strong>Scrum Team</strong> creates one appropriate for the product.</li><li>Multiple Scrum Teams on the same product must <strong>mutually define and comply with the same Definition of Done</strong>.</li></ul>' },
      ],
      tips: [
        'The Sprint Backlog belongs to the Developers; the Product Owner cannot add work to it unilaterally.',
        'Quality never decreases to meet a date — negotiate scope instead.',
        'Releasing is not tied to the Sprint Review.',
        'Acceptance criteria apply to individual items; the Definition of Done applies to the whole Increment.',
      ],
      refs: [
        { label: 'Scrum Guide – Scrum Artifacts', url: 'https://scrumguides.org/scrum-guide.html#scrum-artifacts' },
      ],
    },
    {
      id: 'po', short: 'Product Owner', title: 'The Product Owner', icon: 'person',
      summary: 'One person accountable for maximizing the value of the product resulting from the work of the Scrum Team.',
      objectives: [
        'Explain what the Product Owner is accountable for and what can be delegated',
        'Explain why the Product Owner is one person and how stakeholders influence the backlog',
        'Describe how the Product Owner collaborates with Developers and stakeholders',
        'Distinguish effective Product Owner stances from misunderstood ones',
      ],
      sections: [
        { h: 'Accountability', html: '<p>The Product Owner is accountable for <strong>maximizing the value of the product</strong> resulting from the work of the Scrum Team, and for effective Product Backlog management:</p><ul><li>Developing and explicitly communicating the <strong>Product Goal</strong></li><li>Creating and clearly communicating Product Backlog items</li><li><strong>Ordering</strong> Product Backlog items</li><li>Ensuring the Product Backlog is transparent, visible and understood</li></ul><p>The Product Owner may do this work or <strong>delegate</strong> it to others, but <strong>remains accountable</strong>.</p>' },
        { h: 'One person, respected decisions', html: '<ul><li>The Product Owner is <strong>one person, not a committee</strong>. They may represent the needs of many stakeholders in the Product Backlog.</li><li>Those wanting to change the Product Backlog do so by <strong>trying to convince the Product Owner</strong>.</li><li>For Product Owners to succeed, <strong>the entire organization must respect their decisions</strong>, which are visible in the content and ordering of the Product Backlog and in the inspectable Increment at the Sprint Review.</li><li>The Product Owner decides when to release an Increment.</li></ul>' },
        { h: 'Product Owner stances (Scrum.org)', html: '<table><tr><th>Preferred</th><th>Misunderstood</th></tr><tr><td>Visionary, Collaborator, Customer Representative, Decision Maker, Experimenter, Influencer</td><td>Clerk/Scribe, Story Writer, Project Manager, Subject-Matter Expert, Manager, Gatekeeper</td></tr></table><p>A strong Product Owner is an empowered <strong>value maximizer</strong>, not a proxy writing down requirements.</p>' },
        { h: 'What is a product?', html: '<p>A product is a <strong>vehicle to deliver value</strong>. It has a clear boundary, known stakeholders and well-defined users or customers. It could be a service, a physical product or something more abstract.</p>' },
      ],
      tips: [
        'Delegating work is fine; delegating accountability is not.',
        'Stakeholders never go around the Product Owner to the Developers.',
        'The Product Owner does not size items or tell Developers how to work.',
        'The Product Owner is a member of the Scrum Team and attends Sprint Planning, Review and Retrospective.',
      ],
      refs: [
        { label: 'Scrum Guide – Product Owner', url: 'https://scrumguides.org/scrum-guide.html#product-owner' },
        { label: 'Product Owner learning path', url: 'https://www.scrum.org/pathway/product-owner-learning-path' },
      ],
    },
    {
      id: 'backlog', short: 'Backlog Mgmt', title: 'Product Backlog Management', icon: 'list',
      summary: 'Keeping an emergent, ordered, transparent Product Backlog through ongoing refinement.',
      objectives: [
        'Describe the characteristics of a healthy Product Backlog',
        'Explain refinement, readiness and who sizes items',
        'Explain how to order items and handle technical work, defects and non-functional requirements',
        'Recognize practices Scrum does not require (user stories, story points, Definition of Ready)',
      ],
      sections: [
        { h: 'The Product Backlog', html: '<ul><li>An <strong>emergent, ordered</strong> list of what is needed to improve the product — the <strong>single source of work</strong> undertaken by the Scrum Team.</li><li>One product has <strong>one Product Backlog</strong>, regardless of how many teams work on it.</li><li>It is never “complete”; it evolves as the product and its environment evolve. A Sprint can start as soon as there is enough to craft a valuable Sprint Goal.</li></ul>' },
        { h: 'Refinement', html: '<ul><li>Refinement is the act of breaking down and further defining items into smaller, more precise items. It adds details such as <strong>description, order and size</strong>; attributes vary with the domain of work.</li><li>It is an <strong>ongoing activity</strong>, not an event. The 2020 guide sets no fixed percentage of capacity.</li><li>Items that can be Done within one Sprint are deemed <strong>ready for selection</strong> in Sprint Planning.</li><li>The <strong>Developers who will do the work are responsible for sizing</strong>. The Product Owner may influence them by helping them understand and select trade-offs.</li></ul>' },
        { h: 'Ordering', html: '<p>The Product Owner orders items to maximize value. Typical factors: <strong>value, risk, dependencies, cost, learning opportunities, and timing</strong>. Order is a single sequence, not priority buckets like High/Medium/Low.</p>' },
        { h: 'Special kinds of work', html: '<ul><li><strong>Technical work</strong> (upgrades, refactoring) should be transparent in the Product Backlog so it can be ordered on value and risk.</li><li><strong>Defects</strong> found after release go into the Product Backlog. Critical ones may be addressed in the current Sprint through collaboration with the Product Owner.</li><li><strong>Non-functional requirements</strong> can be Product Backlog items or, if they apply to every Increment, part of the Definition of Done.</li></ul>' },
      ],
      tips: [
        'Scrum does not require user stories, story points, Planning Poker or a Definition of Ready.',
        'The Product Owner never overrides the Developers’ estimates.',
        'A big, stale backlog reduces transparency; removing items that no longer add value is good practice.',
        'Multiple teams on one product still use a single Product Backlog.',
      ],
      refs: [
        { label: 'Scrum Guide – Product Backlog', url: 'https://scrumguides.org/scrum-guide.html#product-backlog' },
      ],
    },
    {
      id: 'value', short: 'Value & EBM', title: 'Product Value & Evidence-Based Management', icon: 'trending',
      summary: 'Measuring outcomes, not output: EBM Key Value Areas, goals, experiments and investment decisions.',
      objectives: [
        'Distinguish outcomes from output and explain why velocity is not value',
        'Name the four EBM Key Value Areas and examples of each',
        'Relate Strategic, Intermediate and Immediate Tactical Goals to Scrum',
        'Explain how technical debt, experiments and investment decisions affect value',
      ],
      sections: [
        { h: 'Value is about outcomes', html: '<p>Value is defined by the product’s purpose: revenue, customer outcomes, mission impact, time saved. The Product Owner measures <strong>outcomes</strong> (satisfaction, retention, usage, revenue) rather than <strong>output</strong> (features delivered, story points, velocity). Velocity is a team planning aid, not a measure of value or a way to compare teams.</p>' },
        { h: 'EBM Key Value Areas', html: '<div class="table-wrap"><table><tr><th>Key Value Area</th><th>Question</th><th>Example measures</th></tr><tr><td><strong>Current Value</strong> (CV)</td><td>What value does the product deliver today?</td><td>Customer and employee satisfaction, revenue per employee, product cost ratio</td></tr><tr><td><strong>Unrealized Value</strong> (UV)</td><td>What additional value could be realized?</td><td>Market share, customer satisfaction gap</td></tr><tr><td><strong>Time to Market</strong> (T2M)</td><td>How quickly can we deliver and learn?</td><td>Release frequency, lead time, cycle time, time to learn, mean time to repair</td></tr><tr><td><strong>Ability to Innovate</strong> (A2I)</td><td>How effectively can we deliver new capabilities?</td><td>Technical debt, defect trends, innovation rate, time spent on new features</td></tr></table></div>' },
        { h: 'Goals in EBM', html: '<ul><li><strong>Strategic Goal</strong> — a large, ambitious goal, far off and uncertain (similar to a vision).</li><li><strong>Intermediate Goals</strong> — milestones toward the strategic goal (similar to a Product Goal).</li><li><strong>Immediate Tactical Goals</strong> — near-term objectives the team works toward now (similar to a Sprint Goal).</li></ul><p>Teams move toward goals through a loop of <strong>experiment → inspect → adapt</strong>.</p>' },
        { h: 'Value decisions', html: '<ul><li>When unsure whether users want something, build the smallest thing that tests the hypothesis, release it, measure, and adapt.</li><li><strong>Technical debt</strong> slows future delivery, reduces the ability to innovate and makes the true state of the Increment less transparent.</li><li>Investment decisions compare remaining value to the cost of further development. Past spending (sunk cost) is irrelevant. The Product Owner may decide to stop development when remaining value is low.</li></ul>' },
      ],
      tips: [
        'If an answer measures activity (hours, story points, lines of code, features shipped) it is output, not value.',
        'Release frequency and lead time = Time to Market. Technical debt and defect trends = Ability to Innovate.',
        'Market share and unmet customer needs = Unrealized Value.',
      ],
      refs: [
        { label: 'Evidence-Based Management Guide', url: 'https://www.scrum.org/resources/evidence-based-management-guide' },
      ],
    },
    {
      id: 'forecasting', short: 'Forecast & Scale', title: 'Forecasting, Release & Scaling', icon: 'calendar',
      summary: 'Empirical forecasting, release decisions, stakeholders and multiple teams on one product.',
      objectives: [
        'Explain empirical forecasting and how often to update it',
        'Explain who decides on releases and why “Done” does not mean “released”',
        'Connect business strategy, vision, Product Goal and Sprint Goal',
        'Explain how several Scrum Teams work on one product',
      ],
      sections: [
        { h: 'Forecasting', html: '<ul><li>Practices such as <strong>burn-downs, burn-ups and cumulative flow</strong> can help forecasting, but they <strong>do not replace the importance of empiricism</strong>. In complex environments, only what has already happened may be used for forward-looking decisions.</li><li>Forecast from historical data about what the team has actually completed plus the current ordered Product Backlog. Be transparent about uncertainty and update forecasts as new information emerges, typically at each Sprint Review.</li><li>Progress toward the Product Goal is discussed with stakeholders at the <strong>Sprint Review</strong>.</li></ul>' },
        { h: 'Releasing', html: '<ul><li>Every Sprint produces at least one <strong>usable, Done</strong> Increment. Whether to <strong>release</strong> it is a business decision made by the Product Owner.</li><li>Increments can be released at any time, including mid-Sprint. The Sprint Review is not a release gate.</li></ul>' },
        { h: 'Strategy, vision and goals', html: '<p>Business strategy and the product vision describe the long-term direction. The <strong>Product Goal</strong> is a concrete long-term objective that moves the product toward that vision; <strong>Sprint Goals</strong> are steps toward the Product Goal. If the market shifts, the Product Owner can abandon a Product Goal and define a new one.</p>' },
        { h: 'Multiple teams on one product', html: '<ul><li>One product = <strong>one Product Owner, one Product Backlog, one Product Goal</strong> and a shared Definition of Done.</li><li>The teams together produce an <strong>integrated Increment</strong> that is inspected at the Sprint Review.</li><li>Identify and minimize cross-team dependencies during refinement. Frameworks such as <strong>Nexus</strong> scale Scrum for roughly 3–9 teams.</li></ul>' },
      ],
      tips: [
        '“Every Increment must be released at the end of the Sprint” is false — it must be releasable (Done).',
        'A forecast is not a commitment; avoid answers that guarantee scope and date in complex work.',
        'Separate Product Backlogs or separate Product Owners for one product are always wrong answers.',
      ],
      refs: [
        { label: 'Scrum Guide – Increment', url: 'https://scrumguides.org/scrum-guide.html#increment' },
        { label: 'Nexus Guide', url: 'https://www.scrum.org/resources/nexus-guide' },
      ],
    },
  ],
};
