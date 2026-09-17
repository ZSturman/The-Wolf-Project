import "server-only";

import { adminDb } from "./firebase-admin";

const SEED_CASES = [
  {
    slug: "azu",
    name: "Azu",
    breed: "Husky mix",
    age: "5 years old",
    summary:
      "Azu needs urgent surgery after imaging showed an intestinal obstruction. His family can contribute, but the deposit has to be met before care can move forward.",
    heroImage: "/assets/story/wolf-hero-2.jpg",
    gallery: ["/assets/story/wolf-hero-1.jpg", "/assets/story/wolf-hero-2.jpg"],
    goalUsd: 7800,
    raisedUsd: 4625,
    status: "active",
    featured: true,
    featuredPriority: 1,
    donationLink: "",
    veterinaryPartner: "Gulf Coast Emergency Veterinary Hospital",
    urgencyLabel: "Deposit needed today",
    condition: "Suspected intestinal obstruction",
    treatmentNeed:
      "Emergency exploratory surgery, overnight hospitalization, pain control, IV fluids, and post-op monitoring.",
    fundingNeed:
      "The hospital requires a treatment deposit before surgery begins. Azu's family has committed what they can, and this case fund covers the remaining access-to-care gap.",
    ownerCommitment:
      "Azu's family is contributing a co-pay, approving follow-up communication, and sharing updates so donors can follow the full treatment journey.",
    approvalCriteriaNote:
      "Placeholder review: treatable emergency, urgent timeline, veterinary recommendation documented, family participation confirmed, and direct hospital payment path available.",
    donorImpactNote:
      "Gifts to Azu's case help unlock surgery, hospitalization, medications, and discharge support so he can return home.",
    medicalNotes: [
      {
        date: "2026-06-12",
        title: "Imaging supports obstruction concern",
        body: "Radiographs showed a pattern consistent with a blockage. The care team recommended surgery if symptoms did not resolve quickly.",
      },
      {
        date: "2026-06-13",
        title: "Surgery estimate issued",
        body: "The treatment estimate includes anesthesia, exploratory surgery, hospitalization, medications, and recheck planning.",
      },
    ],
    timeline: [
      {
        date: "2026-06-12",
        title: "Azu arrived at the ER",
        body: "Repeated vomiting and abdominal pain prompted an emergency visit.",
      },
      {
        date: "2026-06-13",
        title: "Case approved for placeholder review",
        body: "The Wolf Project reviewed the medical need, family contribution, and hospital estimate.",
      },
      {
        date: "2026-06-14",
        title: "Fundraising push begins",
        body: "Wednesday social and Friday community updates will keep donors close to Azu's progress.",
      },
    ],
    updates: [
      {
        date: "2026-06-14",
        title: "Azu is stable, but the clock is moving",
        body: "He is receiving supportive care while the team prepares for the next step. The remaining gap is focused on the surgery deposit.",
      },
      {
        date: "2026-06-15",
        title: "Family co-pay confirmed",
        body: "Azu's family has committed their portion and is staying in close contact with the hospital and The Wolf Project team.",
      },
    ],
    story:
      "Azu is the kind of case The Wolf Project was built for: treatment exists, a veterinary team is ready, and the barrier is the upfront cost of getting care started.\n\nHis family moved quickly when symptoms escalated. They are participating in the plan, contributing what they can, and staying connected through updates so supporters can follow the story with clarity.",
    createdAt: "2026-06-12",
  },
  {
    slug: "koda",
    name: "Koda",
    breed: "Labrador retriever mix",
    age: "7 years old",
    summary:
      "Koda is hospitalized for a urinary blockage. He has been stabilized, but the next stretch covers catheter care, monitoring, and discharge medications.",
    heroImage: "/assets/story/wolf-hero-1.jpg",
    gallery: ["/assets/story/wolf-hero-2.jpg"],
    goalUsd: 5200,
    raisedUsd: 3180,
    status: "in-treatment",
    featured: true,
    featuredPriority: 2,
    donationLink: "",
    veterinaryPartner: "Riverbend Specialty and Emergency",
    urgencyLabel: "In treatment now",
    condition: "Urinary obstruction",
    treatmentNeed:
      "Emergency stabilization, catheter care, hospitalization, lab monitoring, pain control, and discharge medications.",
    fundingNeed:
      "Koda's immediate deposit was partially covered. Remaining support helps keep monitoring in place through discharge.",
    ownerCommitment:
      "Koda's owner is contributing to the bill and coordinating follow-up care to reduce the chance of recurrence.",
    approvalCriteriaNote:
      "Placeholder review: time-sensitive emergency, treatment underway, hospital estimate available, and owner co-pay confirmed.",
    donorImpactNote:
      "Support helps Koda stay hospitalized long enough to recover safely instead of leaving care too soon.",
    medicalNotes: [
      {
        date: "2026-06-10",
        title: "Blockage relieved",
        body: "The emergency team placed a catheter and began monitoring kidney values and urine output.",
      },
    ],
    timeline: [
      {
        date: "2026-06-10",
        title: "Koda admitted",
        body: "He arrived painful and unable to urinate, a life-threatening emergency.",
      },
      {
        date: "2026-06-11",
        title: "Stabilization continues",
        body: "The team is watching for safe urine output and improved lab values.",
      },
    ],
    updates: [
      {
        date: "2026-06-11",
        title: "Koda made it through the first night",
        body: "He is brighter today, but the care team wants another night of monitoring before discharge.",
      },
    ],
    story:
      "Koda's emergency moved fast. A urinary blockage can become fatal quickly, and his family needed help bridging the cost of continued hospitalization after the first deposit.",
    createdAt: "2026-06-10",
  },
  {
    slug: "keelo",
    name: "Keelo",
    breed: "German shepherd mix",
    age: "4 years old",
    summary:
      "Keelo's emergency surgery is complete, and he is home recovering. His story shows what donor support makes possible when access arrives in time.",
    heroImage: "/assets/story/wolf-hero-1.jpg",
    gallery: ["/assets/story/wolf-hero-2.jpg"],
    goalUsd: 6400,
    raisedUsd: 6400,
    status: "completed",
    featured: false,
    featuredPriority: 3,
    donationLink: "",
    veterinaryPartner: "Atlantic Veterinary Referral Center",
    urgencyLabel: "Home recovering",
    condition: "Foreign body surgery",
    treatmentNeed:
      "Emergency surgery, hospitalization, medication, and recheck support.",
    fundingNeed:
      "Keelo's case is fully funded. Additional gifts support the Emergency LIFELINE Fund for the next urgent deposit.",
    ownerCommitment:
      "Keelo's family contributed to the estimate, shared recovery updates, and completed follow-up care.",
    approvalCriteriaNote:
      "Placeholder review: treatable emergency, clear surgical recommendation, owner participation, and documented treatment outcome.",
    donorImpactNote:
      "Donors helped turn a high upfront estimate into surgery, recovery, and a safe return home.",
    medicalNotes: [
      {
        date: "2026-05-20",
        title: "Surgery completed",
        body: "The obstruction was removed and Keelo began monitored recovery.",
      },
      {
        date: "2026-05-27",
        title: "Recheck looked strong",
        body: "Keelo was eating, comfortable, and cleared to continue healing at home.",
      },
    ],
    timeline: [
      {
        date: "2026-05-19",
        title: "Emergency intake",
        body: "Keelo was admitted after repeated vomiting and lethargy.",
      },
      {
        date: "2026-05-20",
        title: "Care funded",
        body: "Donor support and family contribution closed the treatment gap.",
      },
      {
        date: "2026-05-27",
        title: "Home update",
        body: "Keelo was resting at home and returning to his normal routine.",
      },
    ],
    updates: [
      {
        date: "2026-05-27",
        title: "Keelo is home",
        body: "His family sent the update everyone hoped for: he is eating, resting, and healing with the people who love him.",
      },
    ],
    story:
      "Keelo's success story is the donor journey in miniature: a treatable emergency, a family doing everything they could, a hospital ready to act, and a community that helped close the gap in time.",
    createdAt: "2026-05-19",
  },
  {
    slug: "wolf",
    name: "Wolf",
    breed: "Mixed breed",
    age: "4 years old",
    summary:
      "The dog who started it all. Given a 0-10% chance of survival, Wolf's fight revealed the need for an access to care lifeline.",
    heroImage: "/assets/story/wolf-hero-1.jpg",
    gallery: ["/assets/story/wolf-hero-2.jpg"],
    goalUsd: 13000,
    raisedUsd: 13000,
    status: "completed",
    featured: false,
    featuredPriority: 4,
    donationLink: "",
    veterinaryPartner: "Emergency specialty hospital partner (placeholder)",
    urgencyLabel: "Founding story",
    condition: "Emergency exploratory surgery",
    treatmentNeed:
      "Diagnostics, emergency exploratory surgery, hospitalization, and intensive recovery support.",
    fundingNeed:
      "Wolf's case is archived as the founding story. Gifts now support the Emergency LIFELINE Fund for dogs like Azu, Koda, and Keelo.",
    ownerCommitment:
      "Wolf's family stayed through every decision, every estimate, and every recovery step. That experience became the foundation for this project.",
    approvalCriteriaNote:
      "Founding story: Wolf's experience shaped the criteria The Wolf Project now uses for urgent, treatable, access-to-care cases.",
    donorImpactNote:
      "Wolf's survival turned one family's emergency into a mission to help more dogs stay home.",
    medicalNotes: [
      {
        date: "2025-01-01",
        title: "Emergency surgery estimate",
        body: "Wolf's exploratory surgery estimate reached $13,000 due upfront during a critical window.",
      },
    ],
    timeline: [
      {
        date: "2025-01-01",
        title: "Wolf survived",
        body: "Against long odds, Wolf came through surgery and recovery.",
      },
      {
        date: "2026-04-18",
        title: "The Wolf Project takes shape",
        body: "His story became the blueprint for an emergency access-to-care lifeline.",
      },
    ],
    updates: [
      {
        date: "2025-01-01",
        title: "Wolf's story inspires The Wolf Project",
        body: "Wolf survived emergency surgery and is now thriving. His journey became the founding story of The Wolf Project.",
      },
      {
        date: "2026-04-18",
        title: "Founding story archived for transparency",
        body: "Wolf's case remains the benchmark for how The Wolf Project talks about access to care, urgency, and what it takes to stand behind a yes.",
      },
    ],
    story:
      "Wolf was not a lost cause. He was a beloved dog in a critical emergency, and the deciding factor was whether the deposit could be paid in time.\n\nThat experience revealed the problem The Wolf Project exists to solve: when treatment exists, families deserve a real chance to say yes.",
    createdAt: "2025-01-01",
  },
];

const SEED_POSTS = [
  {
    slug: "how-one-dog-changed-everything",
    title: "How One Dog Changed Everything",
    excerpt:
      "Wolf was given a 0–10% chance of survival. His fight revealed a crisis that affects millions — and became the spark for The Wolf Project.",
    category: "community-updates",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-18",
    featured: true,
    body: "Wolf was given a 0–10% chance of survival. His fight revealed a crisis that affects millions of pet families.\n\nThis is the story of how one emergency changed everything.",
  },
  {
    slug: "what-is-emergency-veterinary-care",
    title: "What Is Emergency Veterinary Care — And Who Can't Afford It?",
    excerpt:
      "Emergency vet visits average $1,000–$5,000 and many families face impossible choices. Here's what the access-to-care crisis looks like.",
    category: "emergency-care",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-15",
    featured: false,
    body: "Emergency vet visits average $1,000–$5,000. For many families, that number is the difference between treatment and goodbye.",
  },
  {
    slug: "5-signs-your-dog-needs-emergency-care",
    title: "5 Signs Your Dog Needs Emergency Veterinary Care",
    excerpt:
      "Not every symptom is an emergency — but some are. Learn which warning signs mean you should get to a vet immediately.",
    category: "vet-resources",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-10",
    featured: false,
    body: "Not every symptom is an emergency — but some are. Here are five signs you should get to a vet immediately.",
  },
  {
    slug: "why-case-updates-matter-to-supporters",
    title: "Why Case Updates Matter to Supporters",
    excerpt:
      "Case updates build trust, reduce confusion, and help supporters understand what progress really looks like in emergency care.",
    category: "case-updates",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-16",
    featured: false,
    body: "Case updates build trust, reduce confusion, and help supporters understand what progress really looks like.",
  },
  {
    slug: "recovery-after-an-emergency-vet-visit",
    title: "Recovery After an Emergency Vet Visit",
    excerpt:
      "Emergency care doesn't end at discharge. Here's how families can prepare for the first week home after a crisis.",
    category: "preventative-care",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-04-17",
    featured: false,
    body: "Emergency care doesn't end at discharge. Here's how families can prepare for the first week home.",
  },
  {
    slug: "vet-talk-what-er-vets-wish-you-knew",
    title: "Vet Talk: What Your ER Vet Wishes You Knew Before You Walk In",
    excerpt:
      "A note to families: a few small things you can do in the first ten minutes of an emergency to give your dog the best possible shot.",
    category: "vet-talk",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-05-02",
    featured: true,
    body: "When you arrive at an emergency animal hospital, the clock is already running. Here's what helps your dog the most — straight from the people on the other side of the door.",
  },
  {
    slug: "emergency-signs-limp-is-a-crisis",
    title: "Emergency Signs: When a Limp Is Actually a Crisis",
    excerpt:
      "Most limps resolve on their own. Some don't. Here's how to tell which ones are racing the clock.",
    category: "emergency-signs",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-05-04",
    featured: false,
    body: "A dog showing up sore after a long walk is a Saturday afternoon. A dog suddenly unable to bear weight, with a swollen joint, a hot leg, or visible distress — that is a different conversation.",
  },
  {
    slug: "emergency-signs-bloat-gdv",
    title: "Emergency Signs: Bloated Belly, Restless Pacing, No Appetite",
    excerpt:
      "GDV (\"bloat\") can kill a dog in a few hours. Here is the cluster of signs that means race to the ER right now.",
    category: "emergency-signs",
    featuredImage: null,
    author: "The Wolf Project",
    publishedAt: "2026-05-06",
    featured: false,
    body: "Gastric dilatation-volvulus — bloat — is one of the most time-sensitive emergencies in veterinary medicine. Hours matter.",
  },
];

const SEED_SINGLETONS: Record<string, Record<string, unknown>> = {
  donationProgress: {
    goalUsd: 40000,
    raisedUsd: 28650,
    lastUpdated: "2026-04-18",
    source: "manual",
    apiProvider: "",
    apiKey: "",
  },
  applicationConfig: {
    accepting: false,
    message:
      "The Access to Care Lifeline is not yet accepting applications. We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly. Sign up below to be notified when applications open.",
    formUrl: "",
  },
  siteSettings: {
    phaseLabel: "Phase 1 — Building the Lifeline",
    operationalState:
      "The Access to Care Lifeline is not yet fully operational. We are building responsibly so that when we say yes, we can fully stand behind it.",
    summary:
      "We are actively building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably.",
    fundAllocation: [
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
    ],
  },
};

export async function seedAll() {
  const batch = adminDb.batch();

  // Delete existing docs
  const [caseSnap, postSnap, singleSnap] = await Promise.all([
    adminDb.collection("cases").get(),
    adminDb.collection("posts").get(),
    adminDb.collection("singletons").get(),
  ]);
  for (const doc of [...caseSnap.docs, ...postSnap.docs, ...singleSnap.docs]) {
    batch.delete(doc.ref);
  }

  // Seed cases
  for (const c of SEED_CASES) {
    const { slug, ...data } = c;
    batch.set(adminDb.collection("cases").doc(slug), data);
  }

  // Seed posts
  for (const p of SEED_POSTS) {
    const { slug, ...data } = p;
    batch.set(adminDb.collection("posts").doc(slug), data);
  }

  // Seed singletons
  for (const [key, data] of Object.entries(SEED_SINGLETONS)) {
    batch.set(adminDb.collection("singletons").doc(key), data);
  }

  await batch.commit();
}
