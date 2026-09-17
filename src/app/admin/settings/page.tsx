"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { AdminShell, AdminButton, Card } from "@/components/admin/AdminShell";

const TABS = ["Organisation", "Booking rules", "Notifications", "Team access"] as const;

const input =
  "w-full border border-snow-300 bg-snow-100 px-3 py-2 text-[14px] focus:border-spruce-800 outline-none transition-colors";

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Organisation");
  const [saved, setSaved] = useState(true);
  const touch = () => setSaved(false);

  return (
    <AdminShell
      title="Settings"
      subtitle="Applies to every trek and departure unless a trek overrides it."
      actions={
        <AdminButton onClick={() => setSaved(true)}>
          <Save size={15} /> {saved ? "Saved" : "Save changes"}
        </AdminButton>
      }
    >
      <div className="flex gap-1 border-b border-snow-300 mb-6 overflow-x-auto thin-scroll">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-current={tab === t ? "page" : undefined}
            className={[
              "px-4 py-2.5 text-[14px] border-b-2 -mb-px whitespace-nowrap transition-colors",
              tab === t ? "border-bugyal-500 font-semibold" : "border-transparent text-spruce-800/55 hover:text-spruce-800",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Organisation" && (
        <div className="grid xl:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-display-tight text-[18px] mb-5">Details</h3>
            <div className="space-y-5">
              <Row label="Organisation name"><input className={input} defaultValue="Indiahikes" onChange={touch} /></Row>
              <Row label="Support email"><input className={input} defaultValue="trek@indiahikes.example" onChange={touch} /></Row>
              <Row label="Support phone"><input className={input} defaultValue="+91 80 4670 0100" onChange={touch} /></Row>
              <Row label="Registered office">
                <textarea rows={3} className={input} defaultValue="139, Defence Colony Road, Indiranagar, Bengaluru 560038" onChange={touch} />
              </Row>
              <Row label="GST number"><input className={`${input} nums`} defaultValue="29AABCI1234F1Z5" onChange={touch} /></Row>
            </div>
          </Card>
          <Card>
            <h3 className="font-display-tight text-[18px] mb-5">Season</h3>
            <div className="space-y-5">
              <Row label="Current season label"><input className={input} defaultValue="2026–27" onChange={touch} /></Row>
              <Row label="Departures visible ahead" hint="How far into the future the calendar shows">
                <select className={input} defaultValue="14 months" onChange={touch}>
                  {["6 months", "9 months", "12 months", "14 months", "18 months"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Row>
              <Row label="Default group cap"><input className={`${input} nums`} defaultValue="20" onChange={touch} /></Row>
              <Row label="Group cap on Difficult treks"><input className={`${input} nums`} defaultValue="15" onChange={touch} /></Row>
              <Row label="Green Trails group cap"><input className={`${input} nums`} defaultValue="12" onChange={touch} /></Row>
            </div>
          </Card>
        </div>
      )}

      {tab === "Booking rules" && (
        <div className="grid xl:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-display-tight text-[18px] mb-5">Payment</h3>
            <div className="space-y-5">
              <Row label="Deposit to hold a slot"><input className={`${input} nums`} defaultValue="25%" onChange={touch} /></Row>
              <Row label="Balance due before departure"><input className={`${input} nums`} defaultValue="30 days" onChange={touch} /></Row>
              <Row label="GST rate"><input className={`${input} nums`} defaultValue="5%" onChange={touch} /></Row>
            </div>
          </Card>
          <Card>
            <h3 className="font-display-tight text-[18px] mb-5">Cancellation scale</h3>
            <div className="space-y-4">
              {[
                ["More than 30 days", "100% refund"],
                ["30 to 20 days", "50% cash, 100% voucher"],
                ["20 to 10 days", "75% voucher only"],
                ["Fewer than 10 days", "No refund"],
              ].map(([w, r]) => (
                <div key={w} className="grid grid-cols-[1fr_1fr] gap-3 items-center">
                  <span className="text-[13.5px] text-snow-500">{w}</span>
                  <input className={input} defaultValue={r} onChange={touch} aria-label={`Refund for ${w}`} />
                </div>
              ))}
            </div>
            <label className="flex items-center gap-2.5 text-[14px] cursor-pointer mt-6 pt-5 border-t border-snow-300">
              <input type="checkbox" defaultChecked onChange={touch} />
              Require a fitness record before confirming Difficult treks
            </label>
          </Card>
        </div>
      )}

      {tab === "Notifications" && (
        <Card pad={false}>
          <div className="p-5 border-b border-snow-300">
            <h3 className="font-display-tight text-[18px]">Automatic emails</h3>
            <p className="text-[13px] text-snow-500 mt-1">
              Sent to trekkers. Basecamp staff get a separate daily digest.
            </p>
          </div>
          {[
            ["Booking confirmation", "Immediately after payment", true],
            ["Kit list and travel notes", "21 days before departure", true],
            ["Balance payment reminder", "40 days before departure", true],
            ["Fitness check-in", "30 days before departure", true],
            ["Trek leader introduction", "3 days before departure", true],
            ["Waitlist slot opened", "When a cancellation frees a slot", true],
            ["Post-trek review request", "2 days after the trek ends", false],
          ].map(([n, w, on]) => (
            <div key={n as string} className="flex items-center justify-between gap-6 px-5 py-3.5 border-b border-snow-300 last:border-b-0">
              <div>
                <p className="text-[14.5px] font-semibold">{n}</p>
                <p className="text-[12.5px] text-snow-500 mt-0.5">{w}</p>
              </div>
              <label className="flex items-center gap-2.5 text-[13px] cursor-pointer shrink-0">
                <input type="checkbox" defaultChecked={on as boolean} onChange={touch} />
                On
              </label>
            </div>
          ))}
        </Card>
      )}

      {tab === "Team access" && (
        <Card pad={false}>
          <div className="p-5 border-b border-snow-300 flex items-center justify-between gap-4">
            <h3 className="font-display-tight text-[18px]">Who can see what</h3>
            <AdminButton size="sm" variant="outline">Invite someone</AdminButton>
          </div>
          <div className="overflow-x-auto thin-scroll">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="text-left text-[12px] text-snow-500 border-b border-snow-300">
                  <th className="font-normal px-5 py-2.5">Person</th>
                  <th className="font-normal px-5 py-2.5">Role</th>
                  <th className="font-normal px-5 py-2.5">Can see</th>
                  <th className="font-normal px-5 py-2.5">Last active</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Jitesh Bhatt", "Operations lead", "Everything", "Now"],
                  ["Arundhati Rane", "Head of trek operations", "Treks, departures, leaders", "2 hours ago"],
                  ["Pema Bhutia", "Green Trails coordinator", "Green Trails only", "Yesterday"],
                  ["Ipshita Bose", "Community programmes", "Stories, trekkers", "3 days ago"],
                  ["Sundar Rawat", "Basecamp manager, Sankri", "Departures at Sankri", "6 hours ago"],
                ].map(([n, r, s, a]) => (
                  <tr key={n} className="border-b border-snow-300 last:border-b-0 hover:bg-snow-100 transition-colors">
                    <td className="px-5 py-3 font-semibold">{n}</td>
                    <td className="px-5 py-3">{r}</td>
                    <td className="px-5 py-3 text-snow-500">{s}</td>
                    <td className="px-5 py-3 nums text-snow-500">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </AdminShell>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-[12px] text-snow-500 mt-1.5">{hint}</p>}
    </div>
  );
}
