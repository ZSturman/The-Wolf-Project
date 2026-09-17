"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { FormField, inputClass, textareaClass } from "@/components/admin/form-field";
import { SaveButton } from "@/components/admin/save-button";
import { RepeaterField } from "@/components/admin/repeater-field";
import { cn } from "@/lib/cn";

const TABS = [
  { key: "siteSettings", label: "Site Settings" },
  { key: "donationProgress", label: "Donation Progress" },
  { key: "applicationConfig", label: "Applications" },
  { key: "homeContent", label: "Home" },
  { key: "storyContent", label: "Story" },
  { key: "processContent", label: "How It Works" },
  { key: "trustContent", label: "Trust / Impact" },
  { key: "donationContent", label: "Donate / Join" },
  { key: "shopContent", label: "Shop" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function AdminSettingsPage() {
  const { getIdToken } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("siteSettings");
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<"idle" | "saving" | "success" | "error">("idle");

  useEffect(() => {
    let cancelled = false;

    async function loadTab() {
      try {
        const res = await fetch(`/api/singletons/${activeTab}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json ?? {});
        }
      } catch {
        if (!cancelled) {
          setData({});
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadTab();

    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  async function handleSave() {
    setSaving("saving");
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/singletons/${activeTab}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSaving("success");
      setTimeout(() => setSaving("idle"), 2000);
    } catch {
      setSaving("error");
    }
  }

  function update(field: string, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function str(field: string): string {
    return (data[field] as string) ?? "";
  }

  function num(field: string): number {
    return (data[field] as number) ?? 0;
  }

  function bool(field: string): boolean {
    return (data[field] as boolean) ?? false;
  }

  function arr<T>(field: string): T[] {
    const v = data[field];
    return Array.isArray(v) ? v : [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Site Settings</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Edit site configuration and page content.
      </p>

      {/* Tab bar */}
      <div className="mt-6 flex flex-wrap gap-1 border-b border-ink/8 pb-px">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              if (tab.key !== activeTab) {
                setLoading(true);
                setActiveTab(tab.key);
              }
            }}
            className={cn(
              "rounded-t-lg px-3 py-2 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "border border-b-0 border-ink/8 bg-white text-forest"
                : "text-ink-soft hover:text-ink",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-ink-soft">Loading…</p>
      ) : (
        <div className="mt-6 max-w-2xl space-y-6">
          {activeTab === "siteSettings" && (
            <SiteSettingsForm str={str} arr={arr} update={update} />
          )}
          {activeTab === "donationProgress" && (
            <DonationProgressForm str={str} num={num} update={update} />
          )}
          {activeTab === "applicationConfig" && (
            <ApplicationConfigForm str={str} bool={bool} update={update} />
          )}
          {(activeTab === "homeContent" ||
            activeTab === "storyContent" ||
            activeTab === "processContent" ||
            activeTab === "trustContent" ||
            activeTab === "donationContent" ||
            activeTab === "shopContent") && (
            <StructuredEditor data={data} onChange={setData} />
          )}

          <div className="flex justify-end pt-4">
            <SaveButton state={saving} onClick={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Structured forms for simple singletons ──────────── */

function SiteSettingsForm({
  str,
  arr,
  update,
}: {
  str: (f: string) => string;
  arr: <T>(f: string) => T[];
  update: (f: string, v: unknown) => void;
}) {
  return (
    <>
      <FormField label="Phase Label" htmlFor="phaseLabel">
        <input
          id="phaseLabel"
          value={str("phaseLabel")}
          onChange={(e) => update("phaseLabel", e.target.value)}
          className={inputClass()}
        />
      </FormField>
      <FormField label="Operational State" htmlFor="operationalState">
        <input
          id="operationalState"
          value={str("operationalState")}
          onChange={(e) => update("operationalState", e.target.value)}
          className={inputClass()}
        />
      </FormField>
      <FormField label="Status Summary" htmlFor="summary">
        <textarea
          id="summary"
          value={str("summary")}
          onChange={(e) => update("summary", e.target.value)}
          className={textareaClass()}
          rows={4}
        />
      </FormField>
      <RepeaterField
        label="Fund Allocation"
        items={arr<{ category: string; description: string; percentage: number | null }>(
          "fundAllocation",
        )}
        onChange={(items) => update("fundAllocation", items)}
        newItem={() => ({ category: "", description: "", percentage: null })}
        renderItem={(item, _i, upd) => (
          <div className="space-y-2">
            <input
              value={item.category}
              onChange={(e) => upd({ ...item, category: e.target.value })}
              className={inputClass()}
              placeholder="Category"
            />
            <input
              value={item.description}
              onChange={(e) => upd({ ...item, description: e.target.value })}
              className={inputClass()}
              placeholder="Description"
            />
            <input
              type="number"
              value={item.percentage ?? ""}
              onChange={(e) =>
                upd({
                  ...item,
                  percentage: e.target.value ? Number(e.target.value) : null,
                })
              }
              className={inputClass()}
              placeholder="Percentage"
            />
          </div>
        )}
      />
    </>
  );
}

function DonationProgressForm({
  str,
  num,
  update,
}: {
  str: (f: string) => string;
  num: (f: string) => number;
  update: (f: string, v: unknown) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Goal (USD)" htmlFor="goalUsd">
          <input
            id="goalUsd"
            type="number"
            value={num("goalUsd")}
            onChange={(e) => update("goalUsd", Number(e.target.value))}
            className={inputClass()}
          />
        </FormField>
        <FormField label="Raised (USD)" htmlFor="raisedUsd">
          <input
            id="raisedUsd"
            type="number"
            value={num("raisedUsd")}
            onChange={(e) => update("raisedUsd", Number(e.target.value))}
            className={inputClass()}
          />
        </FormField>
      </div>
      <FormField label="Last Updated" htmlFor="lastUpdated">
        <input
          id="lastUpdated"
          value={str("lastUpdated")}
          onChange={(e) => update("lastUpdated", e.target.value)}
          className={inputClass()}
          placeholder="ISO date"
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Source" htmlFor="source">
          <select
            id="source"
            value={str("source") || "manual"}
            onChange={(e) => update("source", e.target.value)}
            className={inputClass()}
          >
            <option value="manual">Manual</option>
            <option value="api">API</option>
          </select>
        </FormField>
        <FormField label="API Provider" htmlFor="apiProvider">
          <input
            id="apiProvider"
            value={str("apiProvider")}
            onChange={(e) => update("apiProvider", e.target.value)}
            className={inputClass()}
          />
        </FormField>
        <FormField label="API Key" htmlFor="apiKey">
          <input
            id="apiKey"
            value={str("apiKey")}
            onChange={(e) => update("apiKey", e.target.value)}
            className={inputClass()}
          />
        </FormField>
      </div>
    </>
  );
}

function ApplicationConfigForm({
  str,
  bool,
  update,
}: {
  str: (f: string) => string;
  bool: (f: string) => boolean;
  update: (f: string, v: unknown) => void;
}) {
  return (
    <>
      <FormField label="Accepting Applications">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            checked={bool("accepting")}
            onChange={(e) => update("accepting", e.target.checked)}
            className="rounded"
          />
          Applications are open
        </label>
      </FormField>
      <FormField label="Message" htmlFor="message">
        <textarea
          id="message"
          value={str("message")}
          onChange={(e) => update("message", e.target.value)}
          className={textareaClass()}
          rows={3}
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Closed Title" htmlFor="closedTitle">
          <input
            id="closedTitle"
            value={str("closedTitle")}
            onChange={(e) => update("closedTitle", e.target.value)}
            className={inputClass()}
          />
        </FormField>
        <FormField label="Open Title" htmlFor="openTitle">
          <input
            id="openTitle"
            value={str("openTitle")}
            onChange={(e) => update("openTitle", e.target.value)}
            className={inputClass()}
          />
        </FormField>
      </div>
      <FormField label="Closed Intro" htmlFor="closedIntro">
        <textarea
          id="closedIntro"
          value={str("closedIntro")}
          onChange={(e) => update("closedIntro", e.target.value)}
          className={textareaClass()}
          rows={3}
        />
      </FormField>
      <FormField label="Open Intro" htmlFor="openIntro">
        <textarea
          id="openIntro"
          value={str("openIntro")}
          onChange={(e) => update("openIntro", e.target.value)}
          className={textareaClass()}
          rows={3}
        />
      </FormField>
      <FormField label="Application Form URL" htmlFor="formUrl">
        <input
          id="formUrl"
          value={str("formUrl")}
          onChange={(e) => update("formUrl", e.target.value)}
          className={inputClass()}
        />
      </FormField>
      <FormField label="Notify Signup Heading" htmlFor="notifyHeading">
        <input
          id="notifyHeading"
          value={str("notifyHeading")}
          onChange={(e) => update("notifyHeading", e.target.value)}
          className={inputClass()}
        />
      </FormField>
      <FormField label="Notify Signup Description" htmlFor="notifyDescription">
        <textarea
          id="notifyDescription"
          value={str("notifyDescription")}
          onChange={(e) => update("notifyDescription", e.target.value)}
          className={textareaClass()}
          rows={3}
        />
      </FormField>
      <FormField label="Support Prompt" htmlFor="supportPrompt">
        <textarea
          id="supportPrompt"
          value={str("supportPrompt")}
          onChange={(e) => update("supportPrompt", e.target.value)}
          className={textareaClass()}
          rows={2}
        />
      </FormField>
    </>
  );
}

/* ── Structured editor for complex content singletons ── */

function camelToLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function isLongText(value: string): boolean {
  return value.length > 80 || value.includes("\n");
}

function StringListEditor({
  items,
  onChange,
  label,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </p>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <textarea
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            className={cn(textareaClass(), "min-h-15")}
            rows={2}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            className="shrink-0 self-start rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="rounded-lg border border-dashed border-ink/20 px-3 py-1.5 text-xs text-ink-soft hover:border-ink/40 hover:text-ink"
      >
        + Add item
      </button>
    </div>
  );
}

function ObjectListEditor({
  items,
  onChange,
  label,
}: {
  items: Record<string, unknown>[];
  onChange: (items: Record<string, unknown>[]) => void;
  label: string;
}) {
  const updateItem = (index: number, field: string, value: unknown) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange(next);
  };

  const sampleKeys =
    items.length > 0 ? Object.keys(items[0]) : [];

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </p>
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-ink/10 bg-white p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-soft">
              #{index + 1}
            </span>
            <div className="flex gap-1">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const next = [...items];
                    [next[index - 1], next[index]] = [next[index], next[index - 1]];
                    onChange(next);
                  }}
                  className="rounded px-1.5 py-0.5 text-xs text-ink-soft hover:bg-ink/5"
                >
                  ↑
                </button>
              )}
              {index < items.length - 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const next = [...items];
                    [next[index], next[index + 1]] = [next[index + 1], next[index]];
                    onChange(next);
                  }}
                  className="rounded px-1.5 py-0.5 text-xs text-ink-soft hover:bg-ink/5"
                >
                  ↓
                </button>
              )}
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="rounded px-1.5 py-0.5 text-xs text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
          {Object.entries(item).map(([field, val]) => {
            const fieldLabel = camelToLabel(field);
            if (typeof val === "string") {
              return isLongText(val) ? (
                <FormField key={field} label={fieldLabel}>
                  <textarea
                    value={val}
                    onChange={(e) => updateItem(index, field, e.target.value)}
                    className={textareaClass()}
                    rows={3}
                  />
                </FormField>
              ) : (
                <FormField key={field} label={fieldLabel}>
                  <input
                    value={val}
                    onChange={(e) => updateItem(index, field, e.target.value)}
                    className={inputClass()}
                  />
                </FormField>
              );
            }
            if (typeof val === "number") {
              return (
                <FormField key={field} label={fieldLabel}>
                  <input
                    type="number"
                    value={val}
                    onChange={(e) =>
                      updateItem(index, field, Number(e.target.value))
                    }
                    className={inputClass()}
                  />
                </FormField>
              );
            }
            if (typeof val === "boolean") {
              return (
                <FormField key={field} label={fieldLabel}>
                  <label className="flex items-center gap-2 text-sm text-ink">
                    <input
                      type="checkbox"
                      checked={val}
                      onChange={(e) =>
                        updateItem(index, field, e.target.checked)
                      }
                      className="rounded"
                    />
                    {fieldLabel}
                  </label>
                </FormField>
              );
            }
            return null;
          })}
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const template: Record<string, unknown> = {};
          for (const key of sampleKeys) {
            const sample = items[0]?.[key];
            if (typeof sample === "string") template[key] = "";
            else if (typeof sample === "number") template[key] = 0;
            else if (typeof sample === "boolean") template[key] = false;
            else template[key] = "";
          }
          onChange([...items, template]);
        }}
        className="rounded-lg border border-dashed border-ink/20 px-3 py-1.5 text-xs text-ink-soft hover:border-ink/40 hover:text-ink"
      >
        + Add item
      </button>
    </div>
  );
}

function StructuredEditor({
  data,
  onChange,
}: {
  data: Record<string, unknown>;
  onChange: (data: Record<string, unknown>) => void;
}) {
  const fields = Object.entries(data);

  function updateField(field: string, value: unknown) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-6">
      <p className="text-xs text-ink-soft">
        Edit the content fields below. Changes are saved when you click Save.
      </p>
      {fields.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ink/15 bg-white px-4 py-5 text-sm text-ink-soft">
          This section does not expose editable fields in the demo app yet.
        </div>
      ) : fields.map(([key, value]) => {
        const label = camelToLabel(key);

        // String
        if (typeof value === "string") {
          return isLongText(value) ? (
            <FormField key={key} label={label} htmlFor={key}>
              <textarea
                id={key}
                value={value}
                onChange={(e) => updateField(key, e.target.value)}
                className={textareaClass()}
                rows={4}
              />
            </FormField>
          ) : (
            <FormField key={key} label={label} htmlFor={key}>
              <input
                id={key}
                value={value}
                onChange={(e) => updateField(key, e.target.value)}
                className={inputClass()}
              />
            </FormField>
          );
        }

        // Number
        if (typeof value === "number") {
          return (
            <FormField key={key} label={label} htmlFor={key}>
              <input
                id={key}
                type="number"
                value={value}
                onChange={(e) => updateField(key, Number(e.target.value))}
                className={inputClass()}
              />
            </FormField>
          );
        }

        // Boolean
        if (typeof value === "boolean") {
          return (
            <FormField key={key} label={label}>
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => updateField(key, e.target.checked)}
                  className="rounded"
                />
                {label}
              </label>
            </FormField>
          );
        }

        // Array of strings
        if (
          Array.isArray(value) &&
          value.every((v) => typeof v === "string")
        ) {
          return (
            <StringListEditor
              key={key}
              label={label}
              items={value as string[]}
              onChange={(items) => updateField(key, items)}
            />
          );
        }

        // Array of objects
        if (
          Array.isArray(value) &&
          value.length > 0 &&
          typeof value[0] === "object" &&
          value[0] !== null
        ) {
          return (
            <ObjectListEditor
              key={key}
              label={label}
              items={value as Record<string, unknown>[]}
              onChange={(items) => updateField(key, items)}
            />
          );
        }

        // Fallback: render as text for unknown types
        if (value !== null && value !== undefined) {
          return (
            <FormField key={key} label={label} htmlFor={key}>
              <textarea
                id={key}
                value={JSON.stringify(value, null, 2)}
                onChange={(e) => {
                  try {
                    updateField(key, JSON.parse(e.target.value));
                  } catch {
                    // Keep the raw string if it's not valid JSON
                  }
                }}
                className={cn(textareaClass(), "font-mono text-xs")}
                rows={4}
              />
            </FormField>
          );
        }

        return null;
      })}
    </div>
  );
}
