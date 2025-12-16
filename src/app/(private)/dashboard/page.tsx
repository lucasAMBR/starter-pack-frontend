import { ModeToggle } from "@/components/global/ThemeButton";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {

    return(
        <main className="bg-background flex-1 md:m-6 rounded-xl">
            <div className="p-6 flex gap-3">
                <SidebarTrigger className="md:hidden" />
                <h2 className="text-3xl font-semibold">Dashboard</h2>
            </div>
            <Separator />
            <ModeToggle />
        </main>
    );
}

export default Dashboard;