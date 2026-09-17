import "server-only";

import { getSingleton } from "@/lib/db/singletons";
import {
  campaignStatus as defaultCampaignStatus,
  conditionCards as defaultConditionCards,
  faqItems as defaultFaqItems,
  homePathways as defaultHomePathways,
  howItWorksSteps as defaultHowItWorksSteps,
  impactMilestones as defaultImpactMilestones,
  merchProduct,
  monthlySupportNote as defaultMonthlySupportNote,
  promiseCommitments as defaultPromiseCommitments,
  reportingFramework as defaultReportingFramework,
  storyChapters as defaultStoryChapters,
  storyStats as defaultStoryStats,
  trustFacts as defaultTrustFacts,
  videoEmbedUrl as defaultVideoEmbedUrl,
} from "@/data/site-content";
import type {
  ApplicationConfig,
  CampaignStatus,
  DonationContent,
  DonationProgress,
  HomeContent,
  ProcessContent,
  ShopContent,
  SiteSettings,
  StoryContent,
  TrustContent,
} from "@/types/site";

function pickArray<T>(
  value: readonly T[] | null | undefined,
  fallback: readonly T[],
): T[] {
  return value && value.length > 0 ? Array.from(value) : Array.from(fallback);
}

const defaultFundAllocation: SiteSettings["fundAllocation"] = [
  {
    category: "Emergency Veterinary Care",
    description:
      "Diagnostics, procedures, surgery, hospitalization, medications, and follow-up care for approved cases.",
    percentage: 85,
  },
  {
    category: "Operations & Partnerships",
    description:
      "Veterinary network development, case management systems, and operational infrastructure.",
    percentage: 10,
  },
  {
    category: "Education & Outreach",
    description:
      "Community resources, prevention education, and awareness campaigns.",
    percentage: 5,
  },
];

const defaultDonationProgress: DonationProgress = {
  goalUsd: defaultCampaignStatus.launchGoalUsd,
  raisedUsd: 0,
  lastUpdated: null,
  source: "manual",
  apiProvider: "",
  apiKey: "",
};

const defaultApplicationConfig: ApplicationConfig = {
  accepting: false,
  message:
    "The Access to Care Lifeline is not yet accepting applications. We are building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably.",
  formUrl: "",
  closedTitle: "Applications Are Not Yet Open",
  closedIntro:
    "We're building the lifeline responsibly. When we open applications, we want to ensure we can fully stand behind every case we accept.",
  openTitle: "Submit a Case",
  openIntro:
    "If your dog is facing an emergency and you need help accessing veterinary care, you can submit a case for review.",
  notifyHeading: "Be the First to Know",
  notifyDescription: "Sign up to be notified when applications open.",
  supportPrompt: "In the meantime, you can help us reach our goal:",
};

const defaultSiteSettings: SiteSettings = {
  phaseLabel: defaultCampaignStatus.phaseLabel,
  operationalState: defaultCampaignStatus.operationalState,
  summary: defaultCampaignStatus.summary,
  fundAllocation: defaultFundAllocation,
};

const defaultHomeContent: HomeContent = {
  heroEyebrow: "Access to Care Lifeline Initiative under SGT Canines",
  heroTitle: "When Treatment Exists But Access To Care Doesn't",
  heroIntro:
    "The Wolf Project helps families access emergency veterinary care so dogs can stay in the homes where they belong.",
  heroSummary: defaultCampaignStatus.summary,
  storyPanelTitle: "The Problem No One Talks About",
  storyPanelBody:
    "As we fought for Wolf, we realized this wasn't just our story. His fight for survival revealed a painful reality - too many dogs are lost not because treatment doesn't exist, but because access to care doesn't.",
  pathways: defaultHomePathways,
  missionTitle: "When treatment exists, families deserve the chance to say yes.",
  missionIntro: "Our mission centers on one powerful idea: your dog can stay.",
  missionParagraphs: [
    "The Wolf Project, an access to care lifeline, is an initiative under the non-profit organization, SGT Canines, to provide financial assistance when families can not afford the upfront required deposits to move forward with lifesaving treatment at an emergency vet.",
    "By helping families access emergency veterinary care when financial barriers appear, we work to keep dogs where they belong - at home with the people who love them.",
  ],
  helpTitle: "A lifeline when treatment exists - but access to care does not.",
  helpIntro:
    "Financial support for dogs requiring urgent veterinary treatment, help for families facing crisis situations, and partnerships that expand access to lifesaving care.",
  promiseTitle: "Trust is not assumed. It is built.",
  promiseIntro:
    "This is the promise we make - to every dog, every family, and every moment where time is running out.",
  shopTitle: "DROP 001 - ACCESS",
  shopIntro:
    "A statement inspired by Wolf's survival story. Every purchase supports access to emergency veterinary care and helps build the lifeline.",
  videoTitle: "How one dog inspired this entire mission.",
  videoIntro: "Meet Wolf. Given 0-10% chance of survival.",
  videoBody:
    "Want to read more on Wolf's story? Read Wolf's Story and see how one emergency revealed the need for something bigger.",
  videoEmbedUrl: defaultVideoEmbedUrl,
  emailHeading: "Join the Pack",
  emailDescription:
    "Get updates on cases, milestones, and how the lifeline is growing. Be the first to know when applications open.",
  blogTitle: "Latest Stories & Resources",
  ctaTitle: "Because every family deserves the chance to hear: your dog can stay.",
  ctaParagraphs: [
    "When emergency veterinary costs stand between a dog and the treatment that could save them, families are often forced into devastating decisions.",
    "Your support helps create access to care when it's needed most. Together, we can give more dogs the chance to go home.",
  ],
};

const defaultStoryContent: StoryContent = {
  heroTitle: "Why We Exist",
  heroIntro:
    "There were moments where, without CareCredit approval, Wolf's treatment would have stopped. Moments where his life depended not on medicine, but on whether a deposit went through.",
  heroBody:
    "After days of diagnostics, imaging, and bloodwork, Wolf required emergency exploratory surgery. The estimate came in at $13,000 due upfront. Wolf wasn't a dying dog - he was a dog with a severe condition. The only thing standing between him and survival was the cost of trying.",
  stats: defaultStoryStats,
  sectionTitle: "From one emergency to a bigger mission.",
  sectionIntro:
    "If funding hadn't come through in time, Wolf would not be here. Not because he couldn't be saved - but because he couldn't be afforded.",
  chapters: defaultStoryChapters,
  closingQuote: "If a life can be saved, access should exist.",
  closingBody:
    "Wolf should have been one of the dogs who disappear quietly between diagnosis and a bill. He wasn't. And once you see that, you can't ignore it. Because this isn't about one dog. It's about a system where money is deciding who gets to live.",
};

const defaultProcessContent: ProcessContent = {
  heroTitle: "A lifeline when treatment exists - but access to care does not.",
  heroIntro:
    "Too many dogs are lost not because treatment doesn't exist, but because access to care doesn't. The Wolf Project exists to stand in that space.",
  stepsTitle: "Emergency support, family advocacy, and community impact.",
  stepsIntro:
    "Financial support for dogs requiring urgent veterinary treatment, help for families facing crisis situations, and partnerships that expand access to lifesaving care.",
  steps: defaultHowItWorksSteps,
  conditionsTitle: "Emergency care isn't just urgent - it's expensive.",
  conditionsIntro:
    "Treatment often requires at least 75% upfront payment before care can begin.",
  conditions: defaultConditionCards,
  eligibilityTitle: "Every case is evaluated with care and integrity.",
  eligibilityIntro:
    "We can not promise to fund every case. We promise to act with integrity in every decision.",
  principles: [
    "We act when time matters most.",
    "We focus on treatable, time-sensitive cases.",
    "We stand with families facing impossible decisions.",
    "We build a system that is ready - not reactive.",
    "Every case is evaluated based on medical viability, urgency, ethical responsibility, and available resources.",
    "We support access to care - we do not replace veterinary judgment.",
  ],
  statusTitle: "We are building something that steps in before it's too late.",
  statusParagraphs: [
    "The Wolf Project is in its early stages. We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably.",
    "At this time, the Access to Care Lifeline is not yet fully operational. Our priority is to ensure that when we say yes - we can fully stand behind it.",
  ],
};

const defaultTrustContent: TrustContent = {
  promiseHeroTitle: "The Promise We Keep",
  promiseHeroIntro:
    "We saw what happens when money decides who lives. We refuse to accept that as normal.",
  promiseHeroBody:
    "This is the promise we make - to every dog, every family, and every moment where time is running out: if a life can be saved, access should exist.",
  commitmentsTitle:
    "We are building this with intention - and that means clarity in how we show up.",
  commitmentsIntro: "Because survival should never depend on how fast help arrives.",
  commitments: defaultPromiseCommitments,
  trustFacts: defaultTrustFacts,
  faqTitle: "Trust is not assumed. It is built.",
  faqIntro: "The clearest questions deserve direct answers.",
  faqItems: defaultFaqItems,
  promiseCalloutTitle:
    "We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably.",
  promiseCalloutParagraphs: [
    "At this time, the Access to Care Lifeline is not yet fully operational.",
    "Our priority is to ensure that when we say yes - we can fully stand behind it.",
  ],
  impactHeroTitle:
    "We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably.",
  impactHeroIntro: "At this time, the Access to Care Lifeline is not yet fully operational.",
  impactHeroBody:
    "Our priority is to ensure that when we say yes - we can fully stand behind it.",
  impactFocusTitle: "Building the lifeline with care and clarity.",
  impactFocusIntro:
    "The work is early, intentional, and grounded in what the project can responsibly stand behind.",
  milestones: defaultImpactMilestones,
  reportingTitle: "If treatment exists, it deserves the chance.",
  reportingIntro:
    "A dog's life should not depend on a wallet. Survival should not be a luxury.",
  reportingFramework: defaultReportingFramework,
  impactCtaItems: [
    "This only works if people choose to stand in that space.",
    "Every family deserves the chance to say yes.",
    "The Wolf Project exists so more dogs can stay where they belong - at home.",
  ],
  transparencyHeroTitle: "Trust Is Not Assumed. It Is Built.",
  transparencyHeroIntro:
    "We believe you deserve to see exactly where your support goes. This page tracks our progress, our phase, and how every dollar is directed.",
  transparencyCommitmentsTitle: "The Promise We Keep",
  transparencyCommitmentsIntro: "These commitments guide every decision we make.",
};

const defaultDonationContent: DonationContent = {
  donateHeroTitle: "Because Every Family Deserves the Chance to Say Yes",
  donateHeroIntro:
    "Your support helps create access to care when it's needed most. Every dollar goes toward building the lifeline.",
  progressLabel: "Access to Care Lifeline Goal",
  oneTimeTitle: "Founding Donor",
  oneTimeDescription:
    "One-time contribution to the Access to Care Lifeline general fund. Every dollar goes directly toward building the lifeline.",
  oneTimeButtonLabel: "Donate Now",
  monthlyTitle: "Pack Leader",
  monthlyDescription:
    "Sustaining monthly support keeps the lifeline growing. Your recurring gift means we can plan ahead and help more dogs.",
  monthlyButtonLabel: "Join Monthly",
  activeCasesTitle: "Active Cases",
  activeCasesIntro:
    "Donate directly to a dog in need. Every case page shows their story, their goal, and how close they are to getting care.",
  tiersTitle: "Every Level Moves the Needle",
  tiersIntro:
    "As a founding donor, your name becomes part of the story we're building. Recognition levels reflect the impact of your commitment.",
  tiers: [
    { name: "Pack Supporter", amount: "$50", note: "Helps cover initial consultation costs" },
    { name: "Care Champion", amount: "$250", note: "Funds emergency diagnostics for one dog" },
    { name: "Founding Pack Member", amount: "$500", note: "Recognized as a founding supporter" },
    { name: "Lifeline Builder", amount: "$1,000", note: "Helps fund a significant portion of a case" },
    { name: "Guardian Circle", amount: "$2,500", note: "Named in our Transparency Report" },
    { name: "Legacy Partner", amount: "$5,000+", note: "Founding partner — direct impact recognition" },
  ],
  tiersButtonLabel: "Become a Founding Donor",
  emailHeading: "Stay in the Loop",
  emailDescription:
    "Get updates on our progress, new cases, and how your support is making a difference.",
  trustText:
    "The Wolf Project is an initiative under SGT Canines, a 501(c)(3) non-profit organization. EIN: 99-4415153. All donations are tax deductible. We publish how every dollar is allocated on our Transparency page.",
  joinHeroTitle: "Be Part of the Promise",
  joinHeroIntro:
    "When emergency veterinary costs stand between a dog and the treatment that could save them, families are often forced into devastating decisions.",
  joinHeroBody:
    "Your support helps create access to care when it's needed most. Together, we can give more dogs the chance to go home.",
  joinBannerTitle: "Because every family deserves the chance to hear: your dog can stay.",
  joinBannerDescription:
    "This only works if people choose to stand in that space - because every family deserves the chance to say yes.",
  joinBannerNote:
    "The Wolf Project stands with families in the moments that decide everything, so they can hear the words: your dog can stay.",
  joinWaysTitle: "Choose the path that feels right for you.",
  joinWaysIntro:
    "Give now, support monthly, learn about access to care, or wear the mission.",
  monthlySupportTitle: "Help keep the lifeline growing month after month.",
  monthlySupportIntro: defaultMonthlySupportNote,
  monthlySupportNote:
    "Some supporters step in once. Others help make sure the work keeps moving with steady support.",
  merchTitle: "This is more than a shirt. It's a statement.",
  merchIntro:
    "Wolf's story changed everything. But access to care gave him a second chance.",
  merchBody:
    "This piece represents something bigger - a movement to ensure families don't have to choose between their dog's life and the cost of care.",
};

const defaultShopContent: ShopContent = {
  shopHeroTitle: "DROP 001 - ACCESS",
  shopHeroIntro: "This is more than a shirt. It's a statement.",
  shopHeroBody:
    "A statement inspired by Wolf's survival story. Every purchase supports access to emergency veterinary care and helps build the lifeline.",
  purposeCards: [
    {
      title: "Expand access to emergency veterinary care",
      body: "Every piece supports our mission to expand access to emergency veterinary care.",
    },
    {
      title: "Prevent financial euthanasia or surrender",
      body: "This work exists to help families keep their dogs at home when the cost of care creates crisis.",
    },
    {
      title: "Keep dogs where they belong - home",
      body: "You're not just wearing something. You're backing something bigger.",
    },
  ],
  accessHeroIntro: "This is more than a shirt. It's a statement.",
  accessHeroBody:
    "Wolf's story changed everything. But access to care gave him a second chance. And not every dog gets that.",
  productStoryTitle: "This piece represents something bigger.",
  productStoryIntro:
    "A movement to ensure families don't have to choose between their dog's life and the cost of care.",
  purchaseReasons: [
    "This is more than a shirt. It's a statement.",
    "Every purchase supports our mission to expand access to emergency veterinary care and prevent financial euthanasia.",
    "Wear the mission. Be part of the movement. Back the pack.",
  ],
};

export async function getDonationProgress(): Promise<DonationProgress> {
  const data = await getSingleton<DonationProgress>("donationProgress");

  return {
    goalUsd: data?.goalUsd ?? defaultDonationProgress.goalUsd,
    raisedUsd: data?.raisedUsd ?? defaultDonationProgress.raisedUsd,
    lastUpdated: data?.lastUpdated ?? defaultDonationProgress.lastUpdated,
    source: data?.source ?? defaultDonationProgress.source,
    apiProvider: data?.apiProvider ?? defaultDonationProgress.apiProvider,
    apiKey: data?.apiKey ?? defaultDonationProgress.apiKey,
  };
}

export async function getApplicationConfig(): Promise<ApplicationConfig> {
  const data = await getSingleton<ApplicationConfig>("applicationConfig");

  return {
    accepting: data?.accepting ?? defaultApplicationConfig.accepting,
    message: data?.message ?? defaultApplicationConfig.message,
    formUrl: data?.formUrl ?? defaultApplicationConfig.formUrl,
    closedTitle: data?.closedTitle ?? defaultApplicationConfig.closedTitle,
    closedIntro: data?.closedIntro ?? defaultApplicationConfig.closedIntro,
    openTitle: data?.openTitle ?? defaultApplicationConfig.openTitle,
    openIntro: data?.openIntro ?? defaultApplicationConfig.openIntro,
    notifyHeading:
      data?.notifyHeading ?? defaultApplicationConfig.notifyHeading,
    notifyDescription:
      data?.notifyDescription ?? defaultApplicationConfig.notifyDescription,
    supportPrompt:
      data?.supportPrompt ?? defaultApplicationConfig.supportPrompt,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await getSingleton<SiteSettings>("siteSettings");

  return {
    phaseLabel: data?.phaseLabel ?? defaultSiteSettings.phaseLabel,
    operationalState:
      data?.operationalState ?? defaultSiteSettings.operationalState,
    summary: data?.summary ?? defaultSiteSettings.summary,
    fundAllocation: pickArray(
      data?.fundAllocation,
      defaultSiteSettings.fundAllocation,
    ),
  };
}

export async function getAdminSingletonData(key: string) {
  switch (key) {
    case "siteSettings":
      return getSiteSettings();
    case "donationProgress":
      return getDonationProgress();
    case "applicationConfig":
      return getApplicationConfig();
    case "homeContent":
      return getHomeContent();
    case "storyContent":
      return getStoryContent();
    case "processContent":
      return getProcessContent();
    case "trustContent":
      return getTrustContent();
    case "donationContent":
      return getDonationContent();
    case "shopContent":
      return getShopContent();
    default:
      return null;
  }
}

export async function getCampaignStatus(): Promise<CampaignStatus> {
  const [applicationConfig, siteSettings, donationProgress] = await Promise.all([
    getApplicationConfig(),
    getSiteSettings(),
    getDonationProgress(),
  ]);

  return {
    phaseLabel: siteSettings.phaseLabel,
    launchGoalUsd: donationProgress.goalUsd,
    operationalState: siteSettings.operationalState,
    acceptingApplications: applicationConfig.accepting,
    summary: siteSettings.summary,
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  const data = await getSingleton<HomeContent>("homeContent");

  return {
    heroEyebrow: data?.heroEyebrow ?? defaultHomeContent.heroEyebrow,
    heroTitle: data?.heroTitle ?? defaultHomeContent.heroTitle,
    heroIntro: data?.heroIntro ?? defaultHomeContent.heroIntro,
    heroSummary: data?.heroSummary ?? defaultHomeContent.heroSummary,
    storyPanelTitle: data?.storyPanelTitle ?? defaultHomeContent.storyPanelTitle,
    storyPanelBody: data?.storyPanelBody ?? defaultHomeContent.storyPanelBody,
    pathways: pickArray(data?.pathways, defaultHomeContent.pathways),
    missionTitle: data?.missionTitle ?? defaultHomeContent.missionTitle,
    missionIntro: data?.missionIntro ?? defaultHomeContent.missionIntro,
    missionParagraphs: pickArray(
      data?.missionParagraphs,
      defaultHomeContent.missionParagraphs,
    ),
    helpTitle: data?.helpTitle ?? defaultHomeContent.helpTitle,
    helpIntro: data?.helpIntro ?? defaultHomeContent.helpIntro,
    promiseTitle: data?.promiseTitle ?? defaultHomeContent.promiseTitle,
    promiseIntro: data?.promiseIntro ?? defaultHomeContent.promiseIntro,
    shopTitle: data?.shopTitle ?? defaultHomeContent.shopTitle,
    shopIntro: data?.shopIntro ?? defaultHomeContent.shopIntro,
    videoTitle: data?.videoTitle ?? defaultHomeContent.videoTitle,
    videoIntro: data?.videoIntro ?? defaultHomeContent.videoIntro,
    videoBody: data?.videoBody ?? defaultHomeContent.videoBody,
    videoEmbedUrl: data?.videoEmbedUrl ?? defaultHomeContent.videoEmbedUrl,
    emailHeading: data?.emailHeading ?? defaultHomeContent.emailHeading,
    emailDescription:
      data?.emailDescription ?? defaultHomeContent.emailDescription,
    blogTitle: data?.blogTitle ?? defaultHomeContent.blogTitle,
    ctaTitle: data?.ctaTitle ?? defaultHomeContent.ctaTitle,
    ctaParagraphs: pickArray(data?.ctaParagraphs, defaultHomeContent.ctaParagraphs),
  };
}

export async function getStoryContent(): Promise<StoryContent> {
  const data = await getSingleton<StoryContent>("storyContent");

  return {
    heroTitle: data?.heroTitle ?? defaultStoryContent.heroTitle,
    heroIntro: data?.heroIntro ?? defaultStoryContent.heroIntro,
    heroBody: data?.heroBody ?? defaultStoryContent.heroBody,
    stats: pickArray(data?.stats, defaultStoryContent.stats),
    sectionTitle: data?.sectionTitle ?? defaultStoryContent.sectionTitle,
    sectionIntro: data?.sectionIntro ?? defaultStoryContent.sectionIntro,
    chapters: pickArray(data?.chapters, defaultStoryContent.chapters).map(
      (chapter) => ({
        ...chapter,
        paragraphs: Array.from(chapter.paragraphs),
      }),
    ),
    closingQuote: data?.closingQuote ?? defaultStoryContent.closingQuote,
    closingBody: data?.closingBody ?? defaultStoryContent.closingBody,
  };
}

export async function getProcessContent(): Promise<ProcessContent> {
  const data = await getSingleton<ProcessContent>("processContent");

  return {
    heroTitle: data?.heroTitle ?? defaultProcessContent.heroTitle,
    heroIntro: data?.heroIntro ?? defaultProcessContent.heroIntro,
    stepsTitle: data?.stepsTitle ?? defaultProcessContent.stepsTitle,
    stepsIntro: data?.stepsIntro ?? defaultProcessContent.stepsIntro,
    steps: pickArray(data?.steps, defaultProcessContent.steps),
    conditionsTitle:
      data?.conditionsTitle ?? defaultProcessContent.conditionsTitle,
    conditionsIntro:
      data?.conditionsIntro ?? defaultProcessContent.conditionsIntro,
    conditions: pickArray(data?.conditions, defaultProcessContent.conditions),
    eligibilityTitle:
      data?.eligibilityTitle ?? defaultProcessContent.eligibilityTitle,
    eligibilityIntro:
      data?.eligibilityIntro ?? defaultProcessContent.eligibilityIntro,
    principles: pickArray(data?.principles, defaultProcessContent.principles),
    statusTitle: data?.statusTitle ?? defaultProcessContent.statusTitle,
    statusParagraphs: pickArray(
      data?.statusParagraphs,
      defaultProcessContent.statusParagraphs,
    ),
  };
}

export async function getTrustContent(): Promise<TrustContent> {
  const data = await getSingleton<TrustContent>("trustContent");

  return {
    promiseHeroTitle:
      data?.promiseHeroTitle ?? defaultTrustContent.promiseHeroTitle,
    promiseHeroIntro:
      data?.promiseHeroIntro ?? defaultTrustContent.promiseHeroIntro,
    promiseHeroBody:
      data?.promiseHeroBody ?? defaultTrustContent.promiseHeroBody,
    commitmentsTitle:
      data?.commitmentsTitle ?? defaultTrustContent.commitmentsTitle,
    commitmentsIntro:
      data?.commitmentsIntro ?? defaultTrustContent.commitmentsIntro,
    commitments: pickArray(data?.commitments, defaultTrustContent.commitments),
    trustFacts: pickArray(data?.trustFacts, defaultTrustContent.trustFacts),
    faqTitle: data?.faqTitle ?? defaultTrustContent.faqTitle,
    faqIntro: data?.faqIntro ?? defaultTrustContent.faqIntro,
    faqItems: pickArray(data?.faqItems, defaultTrustContent.faqItems),
    promiseCalloutTitle:
      data?.promiseCalloutTitle ?? defaultTrustContent.promiseCalloutTitle,
    promiseCalloutParagraphs: pickArray(
      data?.promiseCalloutParagraphs,
      defaultTrustContent.promiseCalloutParagraphs,
    ),
    impactHeroTitle:
      data?.impactHeroTitle ?? defaultTrustContent.impactHeroTitle,
    impactHeroIntro:
      data?.impactHeroIntro ?? defaultTrustContent.impactHeroIntro,
    impactHeroBody:
      data?.impactHeroBody ?? defaultTrustContent.impactHeroBody,
    impactFocusTitle:
      data?.impactFocusTitle ?? defaultTrustContent.impactFocusTitle,
    impactFocusIntro:
      data?.impactFocusIntro ?? defaultTrustContent.impactFocusIntro,
    milestones: pickArray(data?.milestones, defaultTrustContent.milestones),
    reportingTitle:
      data?.reportingTitle ?? defaultTrustContent.reportingTitle,
    reportingIntro:
      data?.reportingIntro ?? defaultTrustContent.reportingIntro,
    reportingFramework: pickArray(
      data?.reportingFramework,
      defaultTrustContent.reportingFramework,
    ),
    impactCtaItems: pickArray(
      data?.impactCtaItems,
      defaultTrustContent.impactCtaItems,
    ),
    transparencyHeroTitle:
      data?.transparencyHeroTitle ?? defaultTrustContent.transparencyHeroTitle,
    transparencyHeroIntro:
      data?.transparencyHeroIntro ?? defaultTrustContent.transparencyHeroIntro,
    transparencyCommitmentsTitle:
      data?.transparencyCommitmentsTitle ??
      defaultTrustContent.transparencyCommitmentsTitle,
    transparencyCommitmentsIntro:
      data?.transparencyCommitmentsIntro ??
      defaultTrustContent.transparencyCommitmentsIntro,
  };
}

export async function getDonationContent(): Promise<DonationContent> {
  const data = await getSingleton<DonationContent>("donationContent");

  return {
    donateHeroTitle:
      data?.donateHeroTitle ?? defaultDonationContent.donateHeroTitle,
    donateHeroIntro:
      data?.donateHeroIntro ?? defaultDonationContent.donateHeroIntro,
    progressLabel: data?.progressLabel ?? defaultDonationContent.progressLabel,
    oneTimeTitle: data?.oneTimeTitle ?? defaultDonationContent.oneTimeTitle,
    oneTimeDescription:
      data?.oneTimeDescription ?? defaultDonationContent.oneTimeDescription,
    oneTimeButtonLabel:
      data?.oneTimeButtonLabel ?? defaultDonationContent.oneTimeButtonLabel,
    monthlyTitle: data?.monthlyTitle ?? defaultDonationContent.monthlyTitle,
    monthlyDescription:
      data?.monthlyDescription ?? defaultDonationContent.monthlyDescription,
    monthlyButtonLabel:
      data?.monthlyButtonLabel ?? defaultDonationContent.monthlyButtonLabel,
    activeCasesTitle:
      data?.activeCasesTitle ?? defaultDonationContent.activeCasesTitle,
    activeCasesIntro:
      data?.activeCasesIntro ?? defaultDonationContent.activeCasesIntro,
    tiersTitle: data?.tiersTitle ?? defaultDonationContent.tiersTitle,
    tiersIntro: data?.tiersIntro ?? defaultDonationContent.tiersIntro,
    tiers: pickArray(data?.tiers, defaultDonationContent.tiers),
    tiersButtonLabel:
      data?.tiersButtonLabel ?? defaultDonationContent.tiersButtonLabel,
    emailHeading: data?.emailHeading ?? defaultDonationContent.emailHeading,
    emailDescription:
      data?.emailDescription ?? defaultDonationContent.emailDescription,
    trustText: data?.trustText ?? defaultDonationContent.trustText,
    joinHeroTitle: data?.joinHeroTitle ?? defaultDonationContent.joinHeroTitle,
    joinHeroIntro: data?.joinHeroIntro ?? defaultDonationContent.joinHeroIntro,
    joinHeroBody: data?.joinHeroBody ?? defaultDonationContent.joinHeroBody,
    joinBannerTitle:
      data?.joinBannerTitle ?? defaultDonationContent.joinBannerTitle,
    joinBannerDescription:
      data?.joinBannerDescription ?? defaultDonationContent.joinBannerDescription,
    joinBannerNote:
      data?.joinBannerNote ?? defaultDonationContent.joinBannerNote,
    joinWaysTitle: data?.joinWaysTitle ?? defaultDonationContent.joinWaysTitle,
    joinWaysIntro: data?.joinWaysIntro ?? defaultDonationContent.joinWaysIntro,
    monthlySupportTitle:
      data?.monthlySupportTitle ?? defaultDonationContent.monthlySupportTitle,
    monthlySupportIntro:
      data?.monthlySupportIntro ?? defaultDonationContent.monthlySupportIntro,
    monthlySupportNote:
      data?.monthlySupportNote ?? defaultDonationContent.monthlySupportNote,
    merchTitle: data?.merchTitle ?? defaultDonationContent.merchTitle,
    merchIntro: data?.merchIntro ?? defaultDonationContent.merchIntro,
    merchBody: data?.merchBody ?? defaultDonationContent.merchBody,
  };
}

export async function getShopContent(): Promise<ShopContent> {
  const data = await getSingleton<ShopContent>("shopContent");

  return {
    shopHeroTitle: data?.shopHeroTitle ?? defaultShopContent.shopHeroTitle,
    shopHeroIntro: data?.shopHeroIntro ?? defaultShopContent.shopHeroIntro,
    shopHeroBody: data?.shopHeroBody ?? defaultShopContent.shopHeroBody,
    purposeCards: pickArray(data?.purposeCards, defaultShopContent.purposeCards),
    accessHeroIntro:
      data?.accessHeroIntro ?? defaultShopContent.accessHeroIntro,
    accessHeroBody: data?.accessHeroBody ?? defaultShopContent.accessHeroBody,
    productStoryTitle:
      data?.productStoryTitle ?? defaultShopContent.productStoryTitle,
    productStoryIntro:
      data?.productStoryIntro ?? defaultShopContent.productStoryIntro,
    purchaseReasons: pickArray(
      data?.purchaseReasons,
      defaultShopContent.purchaseReasons,
    ),
  };
}

export { merchProduct };