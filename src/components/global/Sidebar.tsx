"use client"

import Image from "next/image";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BadgeCheck, Bell, ChevronsUpDownIcon, CreditCard, Layout, LogOut, Sparkles, Text } from "lucide-react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { title } from "process";

const AppSidebar = () => {

    const pathname = usePathname();

    const items = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: <Layout />
        },
        {
            title: "Teste",
            url: "/teste",
            icon: <Text />
        }
    ];


    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenuButton size={'lg'}>
                    <Avatar className="h-10 w-10 rounded-lg">
                        <AvatarImage src={"/images/logo.png"} />
                        <AvatarFallback>Logo</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold text-lg">App name</span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Pages</SidebarGroupLabel>
                    <SidebarMenu>
                        {items.map((item) => {
                            const isActive = pathname === item.url;

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <Link href={item.url}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            className="transition-colors delay-50 cursor-pointer data-[active=true]:text-primary data-[active=true]:bg-primary/5 data-[active=true]:font-semi"
                                        >
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <Separator className="my-2" />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size={'lg'}
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-2"
                                >
                                    <div className="flex flex-row gap-2 items-center">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={""} alt="profile pic" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">Lucas Ambrosio</span>
                                            <span className="truncate text-xs">lucas.silvaambrosio@hotmail.com</span>
                                        </div>
                                    </div>
                                    <ChevronsUpDownIcon />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={""} alt={"profile pic"} />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">Lucas Ambrosio</span>
                                            <span className="truncate text-xs">lucas.silvaambrosio@hotmail.com</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <BadgeCheck className="mr-2 h-4 w-4" />
                                        Account
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell className="mr-2 h-4 w-4" />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar