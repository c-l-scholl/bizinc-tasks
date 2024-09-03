"use client";

// import TaskManager from "@/components/TaskManager/TaskManager";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/todo-list");
  }, [router]);

  return null;  
}

export default Home;
