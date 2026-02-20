import LogoutButton from "../components/LogOut";
import TransactionsPage from "@/components/Transactions/TransactionsPage";
import ClearUserTransactions from "@/components/DeleteAll";
import DisplayCharts from "@/components/Charts/DisplayCharts";
import DarkVeil from "../components/DarkVeil";

function Dashboard() {
  return (
    <div className="bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DarkVeil hueShift={49} />
      </div>
      <div className="relative z-10 min-h-screen">
        <TransactionsPage /> <DisplayCharts /> <ClearUserTransactions />
      </div>
    </div>
  );
}

export default Dashboard;
