import Link from "next/link";
import {
  TrendingUp, TriangleAlert, FileWarning, Users, Download, Plus,
} from "lucide-react";
import { AdminShell, Card, StatusTag, AdminButton } from "@/components/admin/AdminShell";
import { SeasonBars, RankBars, FillGauge } from "@/components/admin/Charts";
import { bookings, kpis, monthlySeries, leaders } from "@/data/admin";
import { treks, departures } from "@/data/treks";
import { inr } from "@/lib/types";

export const metadata = { title: "Dashboard · Admin" };

export default function AdminDashboard() {
  const recent = bookings.slice(0, 8);
  const topTreks = treks
    .map((t) => ({
      label: t.name,
      value: bookings.filter((b) => b.trek === t.slug && b.status !== "cancelled").reduce((s, b) => s + b.people, 0),
      sub: `${departures.filter((d) => d.trek === t.slug).length} departures`,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const attention = [
    { icon: TriangleAlert, tone: "text-rhodo-600", label: `${kpis.fitnessFlags} fitness records still missing on Difficult treks`, href: "/admin/bookings?flag=fitness" },
    { icon: FileWarning, tone: "text-bugyal-600", label: `${kpis.docsMissing} confirmed trekkers have incomplete documents`, href: "/admin/bookings?flag=docs" },
    { icon: Users, tone: "text-glacier-700", label: `${kpis.waitlist} ${kpis.waitlist === 1 ? "person" : "people"} waiting on full departures`, href: "/admin/bookings?status=waitlist" },
    { icon: TrendingUp, tone: "text-deodar-600", label: `${inr(kpis.outstanding)} in balances due in the next 30 days`, href: "/admin/bookings?status=pending" },
  ];

  return (
    <AdminShell
      title="Season overview"
      subtitle="Everything open across the 2026–27 season, as of 17 September."
      actions={
        <>
          <AdminButton variant="outline">
            <Download size={15} /> Export
          </AdminButton>
          <AdminButton href="/admin/departures">
            <Plus size={15} /> New departure
          </AdminButton>
        </>
      }
    >
      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-snow-300 border border-snow-300 mb-6">
        {[
          { l: "Confirmed revenue", v: inr(kpis.revenue), s: "Across all open departures" },
          { l: "Trekkers confirmed", v: kpis.trekkers.toLocaleString("en-IN"), s: `${kpis.confirmed} bookings` },
          { l: "Slots still open", v: kpis.openSlots.toLocaleString("en-IN"), s: `${kpis.departures} departures` },
          { l: "Balance outstanding", v: inr(kpis.outstanding), s: `${kpis.pending} part-paid bookings` },
        ].map((k) => (
          <div key={k.l} className="bg-snow-50 p-5">
            <p className="text-[12.5px] text-snow-500">{k.l}</p>
            <p className="nums font-display text-[clamp(1.5rem,2.6vw,2.05rem)] leading-none mt-2">{k.v}</p>
            <p className="nums text-[12px] text-snow-400 mt-2">{k.s}</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6 mb-6">
        <Card>
          <div className="flex items-baseline justify-between gap-6 mb-5">
            <h2 className="font-display-tight text-[19px]">Trekkers by month</h2>
            <p className="nums text-[12.5px] text-snow-500">Last twelve months</p>
          </div>
          <SeasonBars data={monthlySeries} metric="trekkers" />
          <p className="text-[13.5px] text-spruce-800/65 mt-5 leading-relaxed">
            Two peaks a year, and they are driven by entirely different routes: December
            to March is Sankri and Lohajung, July to September is Kashmir and Himachal.
          </p>
        </Card>

        <Card>
          <h2 className="font-display-tight text-[19px] mb-5">Capacity</h2>
          <FillGauge pct={kpis.fillRate} />
          <div className="mt-6 pt-5 border-t border-snow-300 space-y-3">
            {[
              ["Confirmed", kpis.confirmed],
              ["Awaiting balance", kpis.pending],
              ["On a waitlist", kpis.waitlist],
            ].map(([l, n]) => (
              <div key={l as string} className="flex justify-between text-[14px]">
                <span className="text-snow-500">{l}</span>
                <span className="nums font-semibold">{n as number}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid xl:grid-cols-[1fr_1fr_1fr] gap-6 mb-6">
        <Card>
          <h2 className="font-display-tight text-[19px] mb-5">Needs a decision</h2>
          <ul className="space-y-px -mx-5">
            {attention.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.label}>
                  <Link
                    href={a.href}
                    className="flex items-start gap-3 px-5 py-3 hover:bg-snow-100 transition-colors"
                  >
                    <Icon size={16} className={`${a.tone} shrink-0 mt-0.5`} />
                    <span className="text-[13.5px] leading-snug">{a.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <h2 className="font-display-tight text-[19px] mb-5">Most booked routes</h2>
          <RankBars rows={topTreks} />
        </Card>

        <Card>
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <h2 className="font-display-tight text-[19px]">Leaders on duty</h2>
            <Link href="/admin/leaders" className="text-[13px] text-snow-500 hover:text-spruce-800 transition-colors">
              All {leaders.length}
            </Link>
          </div>
          <div className="space-y-3.5">
            {leaders.slice(0, 5).map((l) => (
              <div key={l.name} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[14px] truncate">{l.name}</p>
                  <p className="nums text-[12px] text-snow-400 truncate">
                    {l.nextDeparture ?? `${l.home} basecamp`}
                  </p>
                </div>
                <StatusTag status={l.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card pad={false}>
        <div className="flex items-baseline justify-between gap-6 p-5 border-b border-snow-300">
          <h2 className="font-display-tight text-[19px]">Latest bookings</h2>
          <Link href="/admin/bookings" className="text-[13px] text-snow-500 hover:text-spruce-800 transition-colors">
            All {bookings.length} bookings
          </Link>
        </div>
        <div className="overflow-x-auto thin-scroll">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-[12px] text-snow-500 border-b border-snow-300">
                <th className="font-normal px-5 py-2.5">Reference</th>
                <th className="font-normal px-5 py-2.5">Trekker</th>
                <th className="font-normal px-5 py-2.5">Trek</th>
                <th className="font-normal px-5 py-2.5">Departs</th>
                <th className="font-normal px-5 py-2.5 text-right">People</th>
                <th className="font-normal px-5 py-2.5 text-right">Amount</th>
                <th className="font-normal px-5 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((b) => (
                <tr key={b.id} className="border-b border-snow-300 last:border-b-0 hover:bg-snow-100 transition-colors">
                  <td className="nums px-5 py-3 text-snow-500">{b.id}</td>
                  <td className="px-5 py-3">
                    <span className="block">{b.trekker}</span>
                    <span className="block text-[12px] text-snow-400">{b.city}</span>
                  </td>
                  <td className="px-5 py-3">{b.trekName}</td>
                  <td className="nums px-5 py-3 text-snow-500">
                    {new Date(b.start).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                  </td>
                  <td className="nums px-5 py-3 text-right">{b.people}</td>
                  <td className="nums px-5 py-3 text-right font-semibold">{inr(b.amount)}</td>
                  <td className="px-5 py-3"><StatusTag status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminShell>
  );
}
