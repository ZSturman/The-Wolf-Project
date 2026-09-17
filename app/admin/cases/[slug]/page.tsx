"use client";

import { useState, useEffect, use, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { FormField, inputClass, textareaClass } from "@/components/admin/form-field";
import { SaveButton } from "@/components/admin/save-button";
import { ImageUpload } from "@/components/admin/image-upload";
import { RepeaterField } from "@/components/admin/repeater-field";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import type { CaseStatus, CaseUpdate } from "@/types/site";

const STATUS_OPTIONS: CaseStatus[] = [
  "active",
  "funded",
  "in-treatment",
  "completed",
  "memorial",
];

export default function EditCasePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = use(props.params);
  const { getIdToken } = useAuth();
  const [saving, setSaving] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [summary, setSummary] = useState("");
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<(string | null)[]>([]);
  const [goalUsd, setGoalUsd] = useState(0);
  const [raisedUsd, setRaisedUsd] = useState(0);
  const [status, setStatus] = useState<CaseStatus>("active");
  const [featured, setFeatured] = useState(false);
  const [featuredPriority, setFeaturedPriority] = useState(0);
  const [donationLink, setDonationLink] = useState("");
  const [veterinaryPartner, setVeterinaryPartner] = useState("");
  const [urgencyLabel, setUrgencyLabel] = useState("");
  const [condition, setCondition] = useState("");
  const [treatmentNeed, setTreatmentNeed] = useState("");
  const [fundingNeed, setFundingNeed] = useState("");
  const [ownerCommitment, setOwnerCommitment] = useState("");
  const [approvalCriteriaNote, setApprovalCriteriaNote] = useState("");
  const [donorImpactNote, setDonorImpactNote] = useState("");
  const [medicalNotes, setMedicalNotes] = useState<CaseUpdate[]>([]);
  const [timeline, setTimeline] = useState<CaseUpdate[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [updates, setUpdates] = useState<CaseUpdate[]>([]);
  const [story, setStory] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/cases/${slug}`);
      if (!res.ok) return;
      const data = await res.json();
      setName(data.name ?? "");
      setBreed(data.breed ?? "");
      setAge(data.age ?? "");
      setSummary(data.summary ?? "");
      setHeroImage(data.heroImage ?? null);
      setGallery(data.gallery ?? []);
      setGoalUsd(data.goalUsd ?? 0);
      setRaisedUsd(data.raisedUsd ?? 0);
      setStatus(data.status ?? "active");
      setFeatured(data.featured ?? false);
      setFeaturedPriority(data.featuredPriority ?? 0);
      setDonationLink(data.donationLink ?? "");
      setVeterinaryPartner(data.veterinaryPartner ?? "");
      setUrgencyLabel(data.urgencyLabel ?? "");
      setCondition(data.condition ?? "");
      setTreatmentNeed(data.treatmentNeed ?? "");
      setFundingNeed(data.fundingNeed ?? "");
      setOwnerCommitment(data.ownerCommitment ?? "");
      setApprovalCriteriaNote(data.approvalCriteriaNote ?? "");
      setDonorImpactNote(data.donorImpactNote ?? "");
      setMedicalNotes(data.medicalNotes ?? []);
      setTimeline(data.timeline ?? []);
      setVideoUrl(data.videoUrl ?? "");
      setUpdates(data.updates ?? []);
      setStory(data.story ?? "");
      setLoaded(true);
    }
    load();
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving("saving");
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/cases/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          breed,
          age,
          summary,
          heroImage,
          gallery,
          goalUsd,
          raisedUsd,
          status,
          featured,
          featuredPriority,
          donationLink,
          veterinaryPartner,
          urgencyLabel,
          condition,
          treatmentNeed,
          fundingNeed,
          ownerCommitment,
          approvalCriteriaNote,
          donorImpactNote,
          medicalNotes,
          timeline,
          videoUrl,
          updates,
          story,
        }),
      });
      if (!res.ok) throw new Error();
      setSaving("success");
      setTimeout(() => setSaving("idle"), 2000);
    } catch {
      setSaving("error");
    }
  }

  if (!loaded) {
    return <p className="text-sm text-ink-soft">Loading…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Edit: {name}</h1>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink-soft">
          {slug}
        </span>
      </div>

      <FormField label="Name" htmlFor="name">
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass()} />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Breed" htmlFor="breed">
          <input id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} className={inputClass()} />
        </FormField>
        <FormField label="Age" htmlFor="age">
          <input id="age" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass()} />
        </FormField>
      </div>

      <FormField label="Summary" htmlFor="summary">
        <textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} className={textareaClass()} rows={3} />
      </FormField>

      <ImageUpload value={heroImage} onChange={setHeroImage} label="Hero Image" />

      <RepeaterField
        label="Gallery Images"
        items={gallery}
        onChange={setGallery}
        newItem={() => ""}
        renderItem={(item, _i, update) => (
          <input
            value={item ?? ""}
            onChange={(e) => update(e.target.value)}
            className={inputClass()}
            placeholder="/assets/story/example.jpg"
          />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Goal (USD)" htmlFor="goalUsd">
          <input id="goalUsd" type="number" value={goalUsd} onChange={(e) => setGoalUsd(Number(e.target.value))} className={inputClass()} />
        </FormField>
        <FormField label="Raised (USD)" htmlFor="raisedUsd">
          <input id="raisedUsd" type="number" value={raisedUsd} onChange={(e) => setRaisedUsd(Number(e.target.value))} className={inputClass()} />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Status" htmlFor="status">
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value as CaseStatus)} className={inputClass()}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Featured">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded" />
            Show on homepage
          </label>
        </FormField>
      </div>

      <FormField label="Featured Priority" htmlFor="featuredPriority">
        <input id="featuredPriority" type="number" value={featuredPriority} onChange={(e) => setFeaturedPriority(Number(e.target.value))} className={inputClass()} />
      </FormField>

      <FormField label="Donation Link" htmlFor="donationLink">
        <input id="donationLink" value={donationLink} onChange={(e) => setDonationLink(e.target.value)} className={inputClass()} />
      </FormField>

      <FormField label="Veterinary Partner" htmlFor="veterinaryPartner">
        <input id="veterinaryPartner" value={veterinaryPartner} onChange={(e) => setVeterinaryPartner(e.target.value)} className={inputClass()} />
      </FormField>

      <div className="rounded-2xl border border-ink/8 bg-white/70 p-5">
        <h2 className="text-lg font-semibold text-ink">Emergency Story Details</h2>
        <div className="mt-4 space-y-4">
          <FormField label="Urgency Label" htmlFor="urgencyLabel">
            <input id="urgencyLabel" value={urgencyLabel} onChange={(e) => setUrgencyLabel(e.target.value)} className={inputClass()} placeholder="e.g. Deposit needed today" />
          </FormField>
          <FormField label="Condition" htmlFor="condition">
            <input id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} className={inputClass()} />
          </FormField>
          <FormField label="Treatment Need" htmlFor="treatmentNeed">
            <textarea id="treatmentNeed" value={treatmentNeed} onChange={(e) => setTreatmentNeed(e.target.value)} className={textareaClass()} rows={3} />
          </FormField>
          <FormField label="Funding Need" htmlFor="fundingNeed">
            <textarea id="fundingNeed" value={fundingNeed} onChange={(e) => setFundingNeed(e.target.value)} className={textareaClass()} rows={3} />
          </FormField>
          <FormField label="Owner Commitment / Co-pay" htmlFor="ownerCommitment">
            <textarea id="ownerCommitment" value={ownerCommitment} onChange={(e) => setOwnerCommitment(e.target.value)} className={textareaClass()} rows={3} />
          </FormField>
          <FormField label="Approval Criteria Note" htmlFor="approvalCriteriaNote">
            <textarea id="approvalCriteriaNote" value={approvalCriteriaNote} onChange={(e) => setApprovalCriteriaNote(e.target.value)} className={textareaClass()} rows={3} />
          </FormField>
          <FormField label="Donor Impact Note" htmlFor="donorImpactNote">
            <textarea id="donorImpactNote" value={donorImpactNote} onChange={(e) => setDonorImpactNote(e.target.value)} className={textareaClass()} rows={3} />
          </FormField>
          <FormField label="Video URL" htmlFor="videoUrl">
            <input id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputClass()} />
          </FormField>
        </div>
      </div>

      <FormField label="Story (Markdoc)">
        <MarkdownEditor value={story} onChange={setStory} />
      </FormField>

      <RepeaterField
        label="Medical Notes"
        items={medicalNotes}
        onChange={setMedicalNotes}
        newItem={() => ({ date: new Date().toISOString().slice(0, 10), title: "", body: "" })}
        renderItem={(item, _i, update) => (
          <div className="space-y-2">
            <input value={item.date} onChange={(e) => update({ ...item, date: e.target.value })} className={inputClass()} placeholder="Date (YYYY-MM-DD)" />
            <input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} className={inputClass()} placeholder="Title" />
            <textarea value={item.body} onChange={(e) => update({ ...item, body: e.target.value })} className={textareaClass()} rows={2} placeholder="Body" />
          </div>
        )}
      />

      <RepeaterField
        label="Timeline"
        items={timeline}
        onChange={setTimeline}
        newItem={() => ({ date: new Date().toISOString().slice(0, 10), title: "", body: "" })}
        renderItem={(item, _i, update) => (
          <div className="space-y-2">
            <input value={item.date} onChange={(e) => update({ ...item, date: e.target.value })} className={inputClass()} placeholder="Date (YYYY-MM-DD)" />
            <input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} className={inputClass()} placeholder="Title" />
            <textarea value={item.body} onChange={(e) => update({ ...item, body: e.target.value })} className={textareaClass()} rows={2} placeholder="Body" />
          </div>
        )}
      />

      <RepeaterField
        label="Updates"
        items={updates}
        onChange={setUpdates}
        newItem={() => ({ date: new Date().toISOString().slice(0, 10), title: "", body: "" })}
        renderItem={(item, _i, update) => (
          <div className="space-y-2">
            <input value={item.date} onChange={(e) => update({ ...item, date: e.target.value })} className={inputClass()} placeholder="Date (YYYY-MM-DD)" />
            <input value={item.title} onChange={(e) => update({ ...item, title: e.target.value })} className={inputClass()} placeholder="Title" />
            <textarea value={item.body} onChange={(e) => update({ ...item, body: e.target.value })} className={textareaClass()} rows={2} placeholder="Body" />
          </div>
        )}
      />

      <div className="flex justify-end pt-4">
        <SaveButton state={saving} type="submit" />
      </div>
    </form>
  );
}
