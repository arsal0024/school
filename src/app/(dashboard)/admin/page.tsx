import Announcements from "@/components/Announcements";
import dynamic from "next/dynamic";

export async function AnnouncementsWrapper() {
  return <Announcements />;
}
// Lazy load client-only components
const UserCard = dynamic(() => import("@/components/UserCard"), { ssr: false });
const CountChartContainer = dynamic(() => import("@/components/CountChartContainer"), { ssr: false });
const AttendanceChartContainer = dynamic(() => import("@/components/AttendanceChartContainer"), { ssr: false });
const FinanceChart = dynamic(() => import("@/components/FinanceChart"), { ssr: false });
const EventCalendarContainer = dynamic(() => import("@/components/EventCalendarContainer"), { ssr: false });

export default function AdminPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements /> {/* stays server-side */}
      </div>
    </div>
  );
}
