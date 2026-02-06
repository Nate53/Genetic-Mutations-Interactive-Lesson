import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BigIdea from "@/pages/big-idea";
import Mechanisms from "@/pages/mechanisms";
import Types from "@/pages/types";
import Outcomes from "@/pages/outcomes";
import CaseStudies from "@/pages/case-studies";
import Puzzle from "@/pages/puzzle";
import Lessons from "@/pages/lessons";
import Assessment from "@/pages/assessment";
import { ScrollArea } from "@/components/ui/scroll-area";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/big-idea" component={BigIdea} />
      <Route path="/mechanisms" component={Mechanisms} />
      <Route path="/types" component={Types} />
      <Route path="/outcomes" component={Outcomes} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/puzzle" component={Puzzle} />
      <Route path="/lessons" component={Lessons} />
      <Route path="/assessment" component={Assessment} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between gap-2 p-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <ThemeToggle />
                </header>
                <ScrollArea className="flex-1">
                  <main>
                    <Router />
                  </main>
                </ScrollArea>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
