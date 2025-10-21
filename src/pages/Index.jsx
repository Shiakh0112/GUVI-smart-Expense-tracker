import Dashboard from "../components/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import { ExpenseProvider } from "./../context/ExpenseContext";

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
