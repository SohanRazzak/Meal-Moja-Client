import Breadcrumbs from "@/components/shared/breadcrumbs";
import { AppSidebar } from "@/components/ui/appsidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen">
        <div className="sticky top-0 bg-gray-50 opacity-100 z-10 py-2 flex items-center gap-2 pl-2">
        <SidebarTrigger/><Breadcrumbs/>
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
};

export default DashboardLayout;
