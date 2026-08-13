import DecisionInboxHeader from "@/components/decision-inbox/DecisionInboxHeader";
import DecisionStats from "@/components/decision-inbox/DecisionStats";
import DecisionFilters from "@/components/decision-inbox/DecisionFilters";
import DecisionList from "@/components/decision-inbox/DecisionList";

export default function DecisionInboxPage() {
  return (
    <div className="space-y-8">

      <DecisionInboxHeader />

      <DecisionStats />

      <DecisionFilters />

      <DecisionList />

    </div>
  );
}