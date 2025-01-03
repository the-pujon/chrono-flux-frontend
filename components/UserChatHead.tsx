import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getCurrentUser, logout } from '@/redux/features/auth/authSlice';
import Link from 'next/link';

export const UserChatHead: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);


  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!user) {
    return (
      <div className="fixed top-4 right-4 z-[100]">
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-[100]">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 right-0"
          >
            <Card className="w-64">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">User Profile</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    dispatch(logout());
                    setIsOpen(false);
                  }}
                >
                  Logout
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
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
