import AppSidebar from "@/components/global/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex">
        <SidebarProvider>
        <nav>
            <AppSidebar />
        </nav>
        <main className="flex flex-1 bg-sidebar">
            {children}
        </main>
      </SidebarProvider>
    </section>
  );
}
