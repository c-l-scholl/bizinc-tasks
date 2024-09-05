"use client";

// import TaskManager from "@/components/TaskManager/TaskManager";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Home just redirects to the todo-list page
 * @function
 */
const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/todo-list");
  }, [router]);

  return null;  
}

export default Home;
