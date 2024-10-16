import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UserButton } from '@clerk/nextjs';
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  ListTodo,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

interface SidebarProps {
  allTasksCount: number;
  incompleteTasksCount: number;
  completedTasksCount: number;
  todayTasksCount: number;
  onFilterChange: (filter: 'all' | 'incomplete' | 'completed' | 'today') => void;
  currentFilter: 'all' | 'incomplete' | 'completed' | 'today';
}

export function Sidebar({
  allTasksCount,
  incompleteTasksCount,
  completedTasksCount,
  todayTasksCount,
  onFilterChange,
  currentFilter,
}: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-2">
        <UserButton />
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex">
            {isCollapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          <Button
            variant={currentFilter === 'all' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onFilterChange('all')}
          >
            <ListTodo className="mr-2 h-4 w-4" />
            All Tasks
            <span className="ml-auto">{allTasksCount}</span>
          </Button>
          <Button
            variant={currentFilter === 'today' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onFilterChange('today')}
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            Today&apos;s Tasks
            <span className="ml-auto">{todayTasksCount}</span>
          </Button>
          <Button
            variant={currentFilter === 'incomplete' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onFilterChange('incomplete')}
          >
            <Circle className="mr-2 h-4 w-4" />
            Incomplete Tasks
            <span className="ml-auto">{incompleteTasksCount}</span>
          </Button>
          <Button
            variant={currentFilter === 'completed' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onFilterChange('completed')}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Completed Tasks
            <span className="ml-auto">{completedTasksCount}</span>
          </Button>
        </div>
      </ScrollArea>
      <Separator className="my-2" />
    </div>
  );

  const CollapsedContent = () => (
    <div className="flex flex-col items-center py-2">
      <UserButton />
      <Button variant="ghost" size="icon" onClick={toggleTheme} className="mt-2">
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      <Separator className="my-2 w-2/3" />
      <Button
        variant={currentFilter === 'all' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onFilterChange('all')}
        className="mb-2"
      >
        <ListTodo className="h-5 w-5" />
      </Button>
      <Button
        variant={currentFilter === 'today' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onFilterChange('today')}
        className="mb-2"
      >
        <CalendarCheck className="h-5 w-5" />
      </Button>
      <Button
        variant={currentFilter === 'incomplete' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onFilterChange('incomplete')}
        className="mb-2"
      >
        <Circle className="h-5 w-5" />
      </Button>
      <Button
        variant={currentFilter === 'completed' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onFilterChange('completed')}
        className="mb-2"
      >
        <CheckCircle2 className="h-5 w-5" />
      </Button>
      <Separator className="my-2 w-2/3" />
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mt-2 hidden md:flex">
        <PanelLeftOpen className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="h-screen w-16 flex-col border-r md:hidden">
        <CollapsedContent />
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden h-screen flex-col border-r transition-all duration-300 md:flex ${isCollapsed ? 'w-16' : 'w-64'}`}
      >
        {isCollapsed ? <CollapsedContent /> : <SidebarContent />}
      </div>
    </>
  );
}
