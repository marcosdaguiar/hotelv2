import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function Layout2({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>      
        {children}
      </main>
    </SidebarProvider>
  )
}
