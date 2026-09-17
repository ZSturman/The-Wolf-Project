import { assetIndex } from "@/data/assets";
import type {
  AudiencePath,
  CampaignStatus,
  ConditionCard,
  FAQItem,
  HighlightStat,
  ImpactStat,
  MerchProduct,
  Milestone,
  NavItem,
  Pathway,
  ProcessStep,
  SocialLink,
  StoryChapter,
  SupportOption,
  TrustFact,
} from "@/types/site";

export const navigation: NavItem[] = [
  { label: "Donate", href: "/donate" },
  { label: "Get Help", href: "/apply" },
  { label: "For Vets", href: "/for-vets" },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About The Wolf Project",
        href: "/about",
        description: "Mission, Wolf's story, and where we're headed.",
      },
      {
        label: "Our Story",
        href: "/our-story",
        description: "Why we exist, in Wolf's own chapters.",
      },
      {
        label: "Cases",
        href: "/cases",
        description: "Active, completed, and remembered families we've stood with.",
      },
      {
        label: "Stories",
        href: "/blog",
        description: "Vet Talk, family perspectives, and emergency-care guides.",
      },
      {
        label: "Transparency",
        href: "/transparency",
        description: "Where every dollar goes and how we report it.",
      },
      {
        label: "Membership",
        href: "/membership",
        description: "An emerging way for families to stay ahead of emergencies.",
      },
      {
        label: "Community Fundraisers",
        href: "/community-fundraisers",
        description: "Spay, neuter, and wellness events for low-income areas.",
      },
      {
        label: "Shop",
        href: "/shop",
        description: "Wear the mission. Every purchase backs the lifeline.",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/_wolf_project/" },
  { label: "Reels", href: "https://www.instagram.com/_wolf_project/reels/" },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=NMf8mlxO4sk" },
  { label: "SGT Canines", href: "https://www.sgtcanines.com/" },
];

export const campaignStatus: CampaignStatus = {
  phaseLabel: "In its early stages",
  launchGoalUsd: 40000,
  operationalState:
    "At this time, the Access to Care Lifeline is not yet fully operational.",
  acceptingApplications: false,
  summary:
    "We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably.",
};

export const supportOptions: SupportOption[] = [
  {
    label: "Donate Now",
    amount: "Back The Pack",
    description:
      "Your support helps create access to care when it's needed most.",
    href: "https://www.zeffy.com/en-US/donation-form/the-wolf-project-founding-pack-members",
    external: true,
    kind: "donate",
  },
  {
    label: "Join Monthly",
    amount: "Monthly Support",
    description:
      "Help keep the lifeline growing month after month.",
    href: "https://www.zeffy.com/en-US/donation-form/monthly-pack-leaders",
    external: true,
    kind: "monthly",
  },
  {
    label: "Access to Care",
    description:
      "A lifeline when treatment exists - but access to care does not.",
    href: "/how-it-works",
    external: false,
    kind: "learn",
  },
  {
    label: "Wear the Mission",
    description:
      "Every purchase supports access to emergency veterinary care and helps build the lifeline.",
    href: "/shop",
    external: false,
    kind: "shop",
  },
];

export const homePathways: Pathway[] = [
  {
    eyebrow: "Donate",
    title: "Back The Pack",
    description:
      "Your support helps create access to care when it's needed most.",
    href: "/join-the-pack",
  },
  {
    eyebrow: "Learn",
    title: "Access to Care",
    description:
      "When treatment exists but access to care doesn't, families are forced into devastating decisions.",
    href: "/how-it-works",
  },
  {
    eyebrow: "Shop",
    title: "Wear the Mission",
    description:
      "Every purchase supports access to emergency veterinary care and helps build the lifeline.",
    href: "/shop",
  },
];

/**
 * Four-audience routing block surfaced near the top of the homepage so every
 * visitor can self-identify and reach their hub quickly.
 */
export const audiencePaths: AudiencePath[] = [
  {
    audience: "donor",
    eyebrow: "Donors & Supporters",
    title: "Fund the moment that matters",
    description:
      "Your gift turns a devastating estimate into a chance to try. Every dollar goes to emergency care.",
    primaryHref:
      "https://www.zeffy.com/en-US/donation-form/the-wolf-project-founding-pack-members",
    primaryLabel: "Donate Now",
    primaryExternal: true,
    secondaryHref: "/donate",
    secondaryLabel: "See your impact",
  },
  {
    audience: "family",
    eyebrow: "Families in Crisis",
    title: "You're not alone. We can help.",
    description:
      "If your dog needs emergency care and cost is the barrier, start here. We review every case with care.",
    primaryHref: "/apply",
    primaryLabel: "Apply for Help",
    secondaryHref: "/how-it-works",
    secondaryLabel: "How it works",
  },
  {
    audience: "vet",
    eyebrow: "Veterinary Partners",
    title: "We support you in the moments you can't control",
    description:
      "Funded deposits, family handling, and minimal admin so your team can focus on care.",
    primaryHref: "/for-vets",
    primaryLabel: "Partner With Us",
    secondaryHref: "/contact",
    secondaryLabel: "Schedule a call",
  },
  {
    audience: "curious",
    eyebrow: "Just Looking",
    title: "Learn why we exist",
    description:
      "Read Wolf's story, follow the work, and join the email list when you're ready.",
    primaryHref: "/about",
    primaryLabel: "About The Wolf Project",
    secondaryHref: "/blog",
    secondaryLabel: "Read stories",
  },
];

/** Donation impact tiers shown on Donate + Home as visual stat callouts. */
export const impactStats: ImpactStat[] = [
  {
    value: "$5,000",
    label: "can save a life",
    detail:
      "Funds the deposit and emergency care that gets a dog through the door when minutes matter.",
  },
  {
    value: "$40,000",
    label: "sustains the lifeline",
    detail:
      "Builds an upfront-care reserve so we can say yes the moment timing matters most.",
  },
  {
    value: "$12,000",
    label: "= 50 spay/neuters + wellness",
    detail:
      "Powers a community give-back event in a low-income area — preventing crises before they start.",
  },
];

export const storyStats: HighlightStat[] = [
  {
    label: "Upfront estimate",
    value: "$13,000",
    note: "The estimate for Wolf's emergency exploratory surgery was due upfront.",
  },
  {
    label: "Chance to survive",
    value: "0-10%",
    note: "Wolf was given a 0-10% chance to survive.",
  },
  {
    label: "What stood in the way",
    value: "Access",
    note: "The problem was not medicine alone. The barrier was the cost of trying.",
  },
];

export const storyChapters: StoryChapter[] = [
  {
    title: "Why We Exist",
    lead:
      "There were moments where, without CareCredit approval, Wolf's treatment would have stopped.",
    paragraphs: [
      "After days of diagnostics, imaging, and bloodwork, Wolf required emergency exploratory surgery. The estimate came in at $13,000 due upfront.",
      "Wolf wasn't a dying dog - he was a dog with a severe condition. The only thing standing between him and survival was the cost of trying.",
    ],
    assetId: "wolf-hero-1",
  },
  {
    title: "The Problem No One Talks About",
    lead:
      "As we fought for Wolf, we realized this wasn't just our story.",
    paragraphs: [
      "Emergency veterinary deposits can reach thousands of dollars before treatment even begins. For many families, those costs arrive suddenly and without warning.",
      "Dogs arrive with conditions that can be treated. Veterinarians have the tools to save them. Families are willing to do anything. But before care begins, access is denied.",
    ],
    assetId: "wolf-hero-2",
  },
  {
    title: "What Makes Us Different",
    lead:
      "Most organizations step in after surrender. We exist before that moment.",
    paragraphs: [
      "We focus on the moment where diagnosis becomes a decision - because treatment only matters if access exists.",
      "If a life can be saved, access should exist. That belief is what led to something bigger than one story.",
    ],
    assetId: "merch-black-front",
  },
];

export const howItWorksSteps: ProcessStep[] = [
  {
    title: "Emergency Access to Care",
    body:
      "Financial support for dogs requiring urgent veterinary treatment.",
  },
  {
    title: "Preventing Financial Euthanasia or Surrender",
    body:
      "Helping families keep their dogs at home when emergency veterinary costs create crisis situations.",
  },
  {
    title: "Community Impact",
    body:
      "Building partnerships with veterinarians, rescues/financial support organizations, and supporters to expand access to lifesaving care.",
  },
];

export const conditionCards: ConditionCard[] = [
  {
    title: "Emergency surgery",
    description: "$4,000-$10,000+",
    outcome:
      "Treatment often requires at least 75% upfront payment before care can begin.",
  },
  {
    title: "Bloat (GDV)",
    description: "$6,000-$12,000",
    outcome:
      "A life-threatening emergency where time is limited and access matters immediately.",
  },
  {
    title: "Toxic ingestion",
    description: "$1,500-$6,000",
    outcome:
      "Urgent treatment can change everything, but only if care can begin in time.",
  },
  {
    title: "Urinary blockage",
    description: "$2,500-$7,000",
    outcome:
      "Financial barriers can delay care even when the condition is treatable.",
  },
];

export const eligibilityPrinciples: string[] = [
  "We act when time matters most.",
  "We focus on treatable, time-sensitive cases.",
  "We stand with families facing impossible decisions.",
  "We build a system that is ready - not reactive.",
  "Every case is evaluated based on medical viability, urgency, ethical responsibility, and available resources.",
  "We support access to care - we do not replace veterinary judgment.",
];

export const trustFacts: TrustFact[] = [
  {
    title: "Use of Funds",
    body:
      "All funds are directed toward emergency veterinary care, including diagnostics, procedures and surgery, hospitalization, medications and follow-up care.",
  },
  {
    title: "Decision-Making",
    body:
      "Every case is evaluated based on medical viability, urgency, ethical responsibility, and available resources.",
  },
  {
    title: "Veterinary Collaboration",
    body:
      "All care supported by the fund is provided by licensed veterinary professionals. We support access to care - we do not replace veterinary judgment.",
  },
  {
    title: "Where We Are Now",
    body:
      "The Wolf Project is in its early stages. At this time, the Access to Care Lifeline is not yet fully operational, and our priority is to ensure that when we say yes, we can fully stand behind it.",
  },
];

export const promiseCommitments: string[] = [
  "We act when time matters most.",
  "We focus on treatable, time-sensitive cases.",
  "We stand with families facing impossible decisions.",
  "We build a system that is ready - not reactive.",
];

export const faqItems: FAQItem[] = [
  {
    question: "Can families apply for assistance today?",
    answer:
      "At this time, the Access to Care Lifeline is not yet fully operational.",
  },
  {
    question: "Where do donations go?",
    answer:
      "All funds are directed toward emergency veterinary care, including diagnostics, procedures and surgery, hospitalization, medications and follow-up care.",
  },
  {
    question: "How are cases evaluated?",
    answer:
      "Every case is evaluated based on medical viability, urgency, ethical responsibility, and available resources.",
  },
  {
    question: "Who provides care?",
    answer:
      "All care supported by the fund is provided by licensed veterinary professionals.",
  },
  {
    question: "What does access to care mean?",
    answer:
      "It means treatment exists, but the cost of care stands between a dog and the treatment that could save them.",
  },
];

export const monthlySupportNote =
  "Some supporters give once. Others help keep the lifeline growing month after month.";

export const merchProduct: MerchProduct = {
  slug: "access-long-sleeve",
  name: 'The Wolf Project Long Sleeve Tee - "Access to Care Saves Lives"',
  price: "$50",
  colors: ["Black", "White"],
  sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
  images: [
    {
      id: "merch-black-front",
      src: assetIndex["merch-black-front"].localSrc,
      alt: assetIndex["merch-black-front"].alt,
      color: "Black",
      label: "Front",
    },
    {
      id: "merch-black-detail-1",
      src: assetIndex["merch-black-detail-1"].localSrc,
      alt: assetIndex["merch-black-detail-1"].alt,
      color: "Black",
      label: "Graphic detail",
    },
    {
      id: "merch-black-detail-2",
      src: assetIndex["merch-black-detail-2"].localSrc,
      alt: assetIndex["merch-black-detail-2"].alt,
      color: "Black",
      label: "Styled detail",
    },
    {
      id: "merch-black-detail-3",
      src: assetIndex["merch-black-detail-3"].localSrc,
      alt: assetIndex["merch-black-detail-3"].alt,
      color: "Black",
      label: "Additional angle",
    },
    {
      id: "merch-black-detail-4",
      src: assetIndex["merch-black-detail-4"].localSrc,
      alt: assetIndex["merch-black-detail-4"].alt,
      color: "Black",
      label: "Close crop",
    },
    {
      id: "merch-white-front",
      src: assetIndex["merch-white-front"].localSrc,
      alt: assetIndex["merch-white-front"].alt,
      color: "White",
      label: "Front",
    },
    {
      id: "merch-white-detail-1",
      src: assetIndex["merch-white-detail-1"].localSrc,
      alt: assetIndex["merch-white-detail-1"].alt,
      color: "White",
      label: "Graphic detail",
    },
    {
      id: "merch-white-detail-2",
      src: assetIndex["merch-white-detail-2"].localSrc,
      alt: assetIndex["merch-white-detail-2"].alt,
      color: "White",
      label: "Styled detail",
    },
    {
      id: "merch-white-detail-3",
      src: assetIndex["merch-white-detail-3"].localSrc,
      alt: assetIndex["merch-white-detail-3"].alt,
      color: "White",
      label: "Additional angle",
    },
    {
      id: "merch-white-detail-4",
      src: assetIndex["merch-white-detail-4"].localSrc,
      alt: assetIndex["merch-white-detail-4"].alt,
      color: "White",
      label: "Close crop",
    },
  ],
  story: [
    "This is more than a shirt. It's a statement.",
    "Wolf's story changed everything. But access to care gave him a second chance.",
    "This piece represents something bigger - a movement to ensure families don't have to choose between their dog's life and the cost of care.",
    "Every purchase supports access to emergency veterinary care and helps build the lifeline.",
  ],
  care: [
    "Premium unisex long sleeve fit",
    "Soft, breathable cotton blend",
    "Machine wash: cold",
    "Do not bleach",
    "Tumble dry: low heat",
    "Iron, steam or dry: low heat",
    "Do not dryclean",
  ],
  liveHref:
    "https://yourdogcanstay.com/products/the-wolf-project-long-sleeve-tee-access-to-care-saves-lives",
  collectionHref: "https://yourdogcanstay.com/collections/back-the-pack",
};

export const impactMilestones: Milestone[] = [
  {
    title: "Building the funding, structure, and partnerships",
    status: "current",
    description:
      "We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably.",
    evidenceLabel: "Where We Are Now",
  },
  {
    title: "Not yet fully operational",
    status: "current",
    description:
      "At this time, the Access to Care Lifeline is not yet fully operational.",
    evidenceLabel: "Our Promise",
  },
  {
    title: "Ready to stand behind every yes",
    status: "current",
    description:
      "Our priority is to ensure that when we say yes, we can fully stand behind it.",
    evidenceLabel: "Our Promise",
  },
];

export const reportingFramework: TrustFact[] = [
  {
    title: "What We Commit To",
    body:
      "We act when time matters most. We focus on treatable, time-sensitive cases. We stand with families facing impossible decisions.",
  },
  {
    title: "What We Believe",
    body:
      "A dog's life should not depend on a wallet. Survival should not be a luxury. If treatment exists, it deserves the chance.",
  },
  {
    title: "Be Part of the Promise",
    body:
      "This only works if people choose to stand in that space, because every family deserves the chance to say yes.",
  },
];

export const videoEmbedUrl =
  "https://www.youtube.com/embed/NMf8mlxO4sk?rel=0&modestbranding=1";

export const externalReferences = {
  dodo:
    "https://www.facebook.com/thedodosite/videos/the-way-he-never-stopped-telling-his-rescuer-to-keep-going-dodo-producer-keren-f/1221147143424744/",
  privacyPolicy: "https://yourdogcanstay.com/policies/privacy-policy",
};
