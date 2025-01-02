import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { incrementSession, resetContinuousSessionStreak, setPauseStartTime, checkPauseAndUpdateStreak } from '@/redux/features/focusTracker/focusTrackerSlice';
// import { RootState } from '../store/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';
import { RootState } from '@/redux/store';

export const PomodoroTimer: React.FC = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [customFocusTime, setCustomFocusTime] = useState(25);
  const [customBreakTime, setCustomBreakTime] = useState(5);
  const dispatch = useDispatch();
  const { currentSession, dailyUseStreak, continuousSessionStreak } = useSelector((state: RootState) => state.focusTracker);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      if (!isBreak) {
        dispatch(incrementSession());
        setIsBreak(true);
        setTime(customBreakTime * 60);
      } else {
        setIsBreak(false);
        setTime(customFocusTime * 60);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak, dispatch, customFocusTime, customBreakTime]);

  const toggleTimer = () => {
    if (isActive) {
      setShowPauseDialog(true);
    } else {
      dispatch(checkPauseAndUpdateStreak());
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
    dispatch(setPauseStartTime(Date.now()));
    setShowPauseDialog(false);
  };

  const handleReset = () => {
    setShowResetDialog(true);
  };

  const confirmReset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(customFocusTime * 60);
    dispatch(resetContinuousSessionStreak());
    setShowResetDialog(false);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
      : `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const percentage = isNaN(time) || isNaN(isBreak ? customBreakTime : customFocusTime) ? 
    0 : 
    ((isBreak ? customBreakTime * 60 - time : customFocusTime * 60 - time) / (isBreak ? customBreakTime * 60 : customFocusTime * 60)) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTime(customFocusTime * 60);
    setShowTimer(true);
    setIsActive(false);
    setIsBreak(false);
  };

  const handleEditTimes = () => {
    setShowTimer(false);
    setIsActive(false);
  };

  const getMotivationalMessage = () => {
    if (isBreak) {
      return "Relax and recharge. You've earned it!";
    } else if (percentage < 25) {
      return "Great start! Stay focused and conquer your goals.";
    } else if (percentage < 50) {
      return "You're making progress! Keep up the great work.";
    } else if (percentage < 75) {
      return "Over halfway there! Your dedication is impressive.";
    } else {
      return "Almost done! Push through and finish strong.";
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg overflow-hidden rounded-xl">
      <CardHeader className="bg-indigo-600 dark:bg-indigo-800 text-white p-6">
        <CardTitle className="text-3xl font-bold text-center">
          {showTimer ? (isBreak ? 'Recharge Time' : 'Focus Session') : 'Pomodoro Focus Timer'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <AnimatePresence mode="wait">
          {!showTimer ? (
            <motion.form
              key="input-form"
              className="space-y-6"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <Label htmlFor="focusTime" className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Focus Duration</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Set your ideal focus time (1-180 minutes)</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Slider
                      id="focusTime"
                      min={1}
                      max={180}
                      step={1}
                      value={[customFocusTime]}
                      onValueChange={(value) => setCustomFocusTime(value[0])}
                      className="flex-grow"
                    />
                    <Input
                      type="number"
                      value={customFocusTime}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setCustomFocusTime(isNaN(value) ? 1 : Math.max(1, Math.min(180, value)));
                      }}
                      className="w-20 text-center"
                      min="1"
                      max="180"
                      required
                    />
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <Label htmlFor="breakTime" className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Break Duration</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Set your ideal break time (1-60 minutes)</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Slider
                      id="breakTime"
                      min={1}
                      max={60}
                      step={1}
                      value={[customBreakTime]}
                      onValueChange={(value) => setCustomBreakTime(value[0])}
                      className="flex-grow"
                    />
                    <Input
                      type="number"
                      value={customBreakTime}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setCustomBreakTime(isNaN(value) ? 1 : Math.max(1, Math.min(60, value)));
                      }}
                      className="w-20 text-center"
                      min="1"
                      max="60"
                      required
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full text-lg h-12 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 ease-in-out transform hover:scale-105">
                Start Your Productivity Journey
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="timer"
              className="space-y-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-64 h-64 mx-auto relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="5"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={isBreak ? "#10B981" : "#6366F1"}
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isNaN(percentage) ? 0 : percentage / 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      rotate: -90,
                      transformOrigin: "center",
                      strokeDasharray: "283 283",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    key={time}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl font-bold text-indigo-700 dark:text-indigo-300"
                  >
                    {formatTime(time)}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mt-2"
                  >
                    {isBreak ? (
                      <div className="flex items-center">
                        <Coffee className="w-5 h-5 mr-2" />
                        Break Time
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Focus Time
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
              <div className="text-center text-indigo-600 dark:text-indigo-400 font-medium">
                {getMotivationalMessage()}
              </div>
              <div className="flex justify-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={toggleTimer}
                    className={`w-14 h-14 rounded-full ${
                      isActive
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    } transition-colors duration-300 ease-in-out`}
                  >
                    {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleReset}
                    className="w-14 h-14 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors duration-300 ease-in-out"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleEditTimes}
                    className="w-14 h-14 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300 ease-in-out"
                  >
                    <Edit2 className="w-6 h-6" />
                  </Button>
                </motion.div>
              </div>
              <motion.div
                className="space-y-2 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSession}
                    className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                      Completed Sessions: {currentSession}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={dailyUseStreak}
                    className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                      Daily Streak: {dailyUseStreak} days
                    </p>
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={continuousSessionStreak}
                    className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
                      Continuous Sessions: {continuousSessionStreak}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to reset?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will reset your timer and you will lose your continuous session streak. Your daily use streak will not be affected. Are you certain you want to start over?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Going</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset}>Yes, Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Taking a Break?</AlertDialogTitle>
            <AlertDialogDescription>
              Remember, pausing for more than 10 minutes will reset your continuous session streak. Your daily use streak will not be affected. Short breaks are good, but try to stay focused on your goals!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowPauseDialog(false)}>Keep Focusing</AlertDialogCancel>
            <AlertDialogAction onClick={handlePause}>Pause Timer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

