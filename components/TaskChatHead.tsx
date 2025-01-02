import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, CheckSquare, Calendar, Clock, Filter } from 'lucide-react';
import { addTask, toggleTaskCompletion, clearCompletedTasks, updateTaskDueDate, updateTaskPriority } from '@/redux/features/focusTracker/focusTrackerSlice';
import { RootState } from '@/redux/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, isToday, isPast, isFuture } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';

export const TaskChatHead: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | undefined>(undefined);
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.focusTracker.tasks);

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask({ text: newTask, priority: newTaskPriority, dueDate: newTaskDueDate?.toISOString() }));
      setNewTask('');
      setNewTaskPriority('medium');
      setNewTaskDueDate(undefined);
    }
  };

  const handleToggleTask = (id: string) => {
    dispatch(toggleTaskCompletion({ id }));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompletedTasks());
  };

  const handleUpdateDueDate = (id: string, date: Date | undefined) => {
    dispatch(updateTaskDueDate({ id, dueDate: date?.toISOString() }));
  };

  const handleUpdatePriority = (id: string, priority: string) => {
    dispatch(updateTaskPriority({ id, priority }));
  };

  const priorityColors = {
    low: 'bg-green-200 text-green-800',
    medium: 'bg-yellow-200 text-yellow-800',
    high: 'bg-red-200 text-red-800',
  };

  const filteredTasks = tasks.filter(task => {
    if (!filterDate) return true;
    const taskDate = task.dueDate ? new Date(task.dueDate) : new Date(task.date);
    return taskDate.toDateString() === filterDate.toDateString();
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate) : new Date(a.date);
    const dateB = b.dueDate ? new Date(b.dueDate) : new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 right-0"
          >
            <Card className="w-[450px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Task Manager</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 mb-4">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  />
                  <div className="flex space-x-2">
                    <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[160px] pl-3 text-left font-normal">
                          {newTaskDueDate ? format(newTaskDueDate, 'PPP') : <span>Due date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={newTaskDueDate}
                          onSelect={setNewTaskDueDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Button onClick={handleAddTask}>Add Task</Button>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Tasks</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        {filterDate ? format(filterDate, 'PP') : 'All dates'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        mode="single"
                        selected={filterDate}
                        onSelect={setFilterDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <ScrollArea className="h-[300px] pr-4">
                  {sortedTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <div key={task.id} className="flex items-center space-x-2 mb-4 bg-gray-50 p-3 rounded-lg">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(task.id)}
                        />
                        <div className="flex-grow">
                          <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={isPast(new Date(task.dueDate ? task.dueDate : task.date)) ? "destructive" : isToday(new Date(task.dueDate ? task.dueDate : task.date)) ? "default" : "secondary"}>
                              {format(new Date(task.dueDate ? task.dueDate : task.date), 'PP')}
                            </Badge>
                            <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                        <Select value={task.priority} onValueChange={(value) => handleUpdatePriority(task.id, value)}>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <CalendarComponent
                              mode="single"
                              selected={task.dueDate ? new Date(task.dueDate) : undefined}
                              onSelect={(date) => handleUpdateDueDate(task.id, date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </motion.div>
                  ))}
                </ScrollArea>
                <Button variant="outline" className="mt-4 w-full" onClick={handleClearCompleted}>
                  Clear Completed Tasks
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(true)}
            >
              <CheckSquare className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

