import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LevelSelect from "./pages/LevelSelect";
import Lesson from "./pages/Lesson";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import Words from "./pages/Words";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/levels" element={<LevelSelect />} />
          <Route path="/lesson/:level" element={<Lesson />} />
          <Route path="/quiz/:level" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/words" element={<Words />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
