export type AssetCategory = "brand" | "story" | "merch" | "trust";

export interface AssetRecord {
  id: string;
  localSrc: string;
  sourceUrl: string;
  alt: string;
  category: AssetCategory;
  placeholderAllowed: boolean;
}

export interface CampaignStatus {
  phaseLabel: string;
  launchGoalUsd: number;
  operationalState: string;
  acceptingApplications: boolean;
  summary: string;
}

export type SupportKind = "donate" | "monthly" | "learn" | "shop";

export interface SupportOption {
  label: string;
  amount?: string;
  description: string;
  href: string;
  external: boolean;
  kind: SupportKind;
}

export interface NavItem {
  label: string;
  href: string;
  /** Optional sub-items rendered as a mega-menu under this nav entry. */
  children?: NavItem[];
  /** Optional short blurb shown next to mega-menu sub-items. */
  description?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HighlightStat {
  label: string;
  value: string;
  note: string;
}

export interface Pathway {
  title: string;
  description: string;
  href: string;
  eyebrow: string;
}

/**
 * Top-of-page routing card used to direct each of the four core audiences
 * (donors, families, veterinary partners, curious visitors) to their hub.
 */
export interface AudiencePath {
  audience: "donor" | "family" | "vet" | "curious";
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  primaryExternal?: boolean;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/** A single visual impact statistic — large number + label + optional detail. */
export interface ImpactStat {
  value: string;
  label: string;
  detail?: string;
}

export interface StoryChapter {
  title: string;
  lead: string;
  paragraphs: string[];
  assetId: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ConditionCard {
  title: string;
  description: string;
  outcome: string;
  assetId?: string;
}

export interface TrustFact {
  title: string;
  body: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MerchImage {
  id: string;
  src: string;
  alt: string;
  color: string;
  label: string;
}

export interface MerchProduct {
  slug: string;
  name: string;
  price: string;
  images: MerchImage[];
  colors: string[];
  sizes: string[];
  story: string[];
  care: string[];
  liveHref: string;
  collectionHref: string;
}

export type MilestoneStatus = "current" | "next" | "future";

export interface Milestone {
  title: string;
  status: MilestoneStatus;
  description: string;
  evidenceLabel: string;
}

/* ── Case system ─────────────────────────────────────── */

export type CaseStatus =
  | "active"
  | "funded"
  | "in-treatment"
  | "completed"
  | "memorial";

export interface CaseUpdate {
  date: string;
  title: string;
  body: string;
}

export interface DogCase {
  slug: string;
  name: string;
  breed: string;
  age: string;
  summary: string;
  heroImage: string | null;
  gallery: (string | null)[];
  goalUsd: number;
  raisedUsd: number;
  status: CaseStatus;
  featured: boolean;
  featuredPriority?: number;
  donationLink: string;
  veterinaryPartner: string;
  urgencyLabel?: string;
  condition?: string;
  treatmentNeed?: string;
  fundingNeed?: string;
  ownerCommitment?: string;
  approvalCriteriaNote?: string;
  donorImpactNote?: string;
  medicalNotes?: CaseUpdate[];
  timeline?: CaseUpdate[];
  videoUrl?: string;
  updates: CaseUpdate[];
  story: string;
  createdAt: string | null;
}

/* ── Blog ────────────────────────────────────────────── */

export type BlogCategory =
  | "emergency-care"
  | "emergency-signs"
  | "vet-talk"
  | "preventative-care"
  | "vet-resources"
  | "community-updates"
  | "case-updates";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  featuredImage: string | null;
  author: string;
  publishedAt: string | null;
  featured: boolean;
}

/* ── Donation progress ───────────────────────────────── */

export type DonationSource = "manual" | "api";

export interface DonationProgress {
  goalUsd: number;
  raisedUsd: number;
  lastUpdated: string | null;
  source: DonationSource;
  apiProvider: string;
  apiKey: string;
}

/* ── Lifeline applications (case intake) ─────────────── */

export type ApplicationStatus =
  | "submitted"
  | "reviewing"
  | "approved"
  | "declined";

export interface ApplicationAttachment {
  url: string;
  filename: string;
  contentType: string;
}

export interface Application {
  /** Firestore doc id */
  id: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  /** Step 1 */
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactZip: string;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  /** Step 2 */
  situation: string;
  urgency: "immediate" | "within-24h" | "within-week" | "uncertain";
  hospitalName: string;
  vetContact: string;
  estimateUsd: string;
  /** Step 3 */
  attachments: ApplicationAttachment[];
  /** Step 4 */
  agreedTransparency: boolean;
  agreedContentRights: boolean;
  /** Internal admin notes */
  adminNotes?: string;
  /** Generated on approval */
  caseSlug?: string;
  portalToken?: string;
  /** Updates posted by the family from the portal. */
  familyUpdates?: FamilyUpdate[];
}

export interface FamilyUpdate {
  postedAt: string;
  note: string;
  attachments: ApplicationAttachment[];
}

/* ── Application config ──────────────────────────────── */

export interface ApplicationConfig {
  accepting: boolean;
  message: string;
  formUrl: string;
  closedTitle: string;
  closedIntro: string;
  openTitle: string;
  openIntro: string;
  notifyHeading: string;
  notifyDescription: string;
  supportPrompt: string;
}

/* ── Site settings ───────────────────────────────────── */

export interface FundAllocation {
  category: string;
  description: string;
  percentage: number | null;
}

export interface SiteSettings {
  phaseLabel: string;
  operationalState: string;
  summary: string;
  fundAllocation: FundAllocation[];
}

export interface HomeContent {
  heroEyebrow: string;
  heroTitle: string;
  heroIntro: string;
  heroSummary: string;
  storyPanelTitle: string;
  storyPanelBody: string;
  pathways: Pathway[];
  missionTitle: string;
  missionIntro: string;
  missionParagraphs: string[];
  helpTitle: string;
  helpIntro: string;
  promiseTitle: string;
  promiseIntro: string;
  shopTitle: string;
  shopIntro: string;
  videoTitle: string;
  videoIntro: string;
  videoBody: string;
  videoEmbedUrl: string;
  emailHeading: string;
  emailDescription: string;
  blogTitle: string;
  ctaTitle: string;
  ctaParagraphs: string[];
}

export interface StoryContent {
  heroTitle: string;
  heroIntro: string;
  heroBody: string;
  stats: HighlightStat[];
  sectionTitle: string;
  sectionIntro: string;
  chapters: StoryChapter[];
  closingQuote: string;
  closingBody: string;
}

export interface ProcessContent {
  heroTitle: string;
  heroIntro: string;
  stepsTitle: string;
  stepsIntro: string;
  steps: ProcessStep[];
  conditionsTitle: string;
  conditionsIntro: string;
  conditions: ConditionCard[];
  eligibilityTitle: string;
  eligibilityIntro: string;
  principles: string[];
  statusTitle: string;
  statusParagraphs: string[];
}

export interface TrustContent {
  promiseHeroTitle: string;
  promiseHeroIntro: string;
  promiseHeroBody: string;
  commitmentsTitle: string;
  commitmentsIntro: string;
  commitments: string[];
  trustFacts: TrustFact[];
  faqTitle: string;
  faqIntro: string;
  faqItems: FAQItem[];
  promiseCalloutTitle: string;
  promiseCalloutParagraphs: string[];
  impactHeroTitle: string;
  impactHeroIntro: string;
  impactHeroBody: string;
  impactFocusTitle: string;
  impactFocusIntro: string;
  milestones: Milestone[];
  reportingTitle: string;
  reportingIntro: string;
  reportingFramework: TrustFact[];
  impactCtaItems: string[];
  transparencyHeroTitle: string;
  transparencyHeroIntro: string;
  transparencyCommitmentsTitle: string;
  transparencyCommitmentsIntro: string;
}

export interface DonationTier {
  name: string;
  amount: string;
  note: string;
}

export interface DonationContent {
  donateHeroTitle: string;
  donateHeroIntro: string;
  progressLabel: string;
  oneTimeTitle: string;
  oneTimeDescription: string;
  oneTimeButtonLabel: string;
  monthlyTitle: string;
  monthlyDescription: string;
  monthlyButtonLabel: string;
  activeCasesTitle: string;
  activeCasesIntro: string;
  tiersTitle: string;
  tiersIntro: string;
  tiers: DonationTier[];
  tiersButtonLabel: string;
  emailHeading: string;
  emailDescription: string;
  trustText: string;
  joinHeroTitle: string;
  joinHeroIntro: string;
  joinHeroBody: string;
  joinBannerTitle: string;
  joinBannerDescription: string;
  joinBannerNote: string;
  joinWaysTitle: string;
  joinWaysIntro: string;
  monthlySupportTitle: string;
  monthlySupportIntro: string;
  monthlySupportNote: string;
  merchTitle: string;
  merchIntro: string;
  merchBody: string;
}

export interface ShopContent {
  shopHeroTitle: string;
  shopHeroIntro: string;
  shopHeroBody: string;
  purposeCards: TrustFact[];
  accessHeroIntro: string;
  accessHeroBody: string;
  productStoryTitle: string;
  productStoryIntro: string;
  purchaseReasons: string[];
}
