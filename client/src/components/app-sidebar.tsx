import { useLocation, Link } from "wouter";
import { Dna, Zap, GitBranch, Target, Lightbulb, BookOpen, Puzzle, Home, GraduationCap, ClipboardCheck } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNavItems = [
  {
    title: "Overview",
    url: "/",
    icon: Home,
  },
  {
    title: "Big Idea",
    url: "/big-idea",
    icon: Lightbulb,
  },
];

const moduleItems = [
  {
    title: "Mechanisms",
    url: "/mechanisms",
    icon: Zap,
  },
  {
    title: "Types & Reading Frame",
    url: "/types",
    icon: GitBranch,
  },
  {
    title: "Biological Outcomes",
    url: "/outcomes",
    icon: Target,
  },
];

const interactiveItems = [
  {
    title: "Case Studies",
    url: "/case-studies",
    icon: BookOpen,
  },
  {
    title: "Reading Frame Puzzle",
    url: "/puzzle",
    icon: Puzzle,
  },
];

const studentItems = [
  {
    title: "Guided Lessons",
    url: "/lessons",
    icon: GraduationCap,
  },
  {
    title: "Assessment",
    url: "/assessment",
    icon: ClipboardCheck,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary">
            <Dna className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Genetic Mutations</span>
            <span className="text-xs text-muted-foreground">AP/IB Biology</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Introduction</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    data-testid={`nav-${item.url.replace("/", "") || "home"}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Core Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {moduleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    data-testid={`nav-${item.url.replace("/", "")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Interactive Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {interactiveItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.url.replace("/", "")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Student Practice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.url.replace("/", "")}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground text-center">
          Designed for AP & IB Biology
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
