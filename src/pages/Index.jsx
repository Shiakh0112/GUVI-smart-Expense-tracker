import Dashboard from "../components/Dashboard";
import { ExpenseProvider } from "../context/Expensecontext";
import DashboardLayout from "../layouts/DashboardLayout";

const Index = () => {
  return (
    <>
      <ExpenseProvider>
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </ExpenseProvider>
      ;
    </>
  );
};
export default Index;
