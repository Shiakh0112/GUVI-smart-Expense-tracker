import Dashboard from "../components/Dashboard";
import { ExpenseProvider } from "../context/ExpenseContext";
import DashboardLayout from "../layouts/DashboardLayout";

const Index = () => {
  return (
    <div>
      <ExpenseProvider>
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </ExpenseProvider>
      ;
    </div>
  );
};
export default Index;
