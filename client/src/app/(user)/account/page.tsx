"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/app/context/me"
import { deleteUser, logout } from "@/app/api";
import { useVideo } from "@/app/context/videos";

export default function Home() {
  const router = useRouter();
  const { user,refetch } = useMe();
  const {refetch: refetchVideos } = useVideo();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // If there's no user, don't render anything
  if (!user) {
    return null;
  }

  async function handleDeleteUser() {
    // Call API to delete user and their videos
    await deleteUser(user._id);
    router.push('/');
    await logout();
    refetch();
    refetchVideos();
  }

  return(
    <div>
      <h2>Account</h2>
      <h1>Choose how you appear and what you see</h1>
      <h2>Signed in as: {user.email}</h2>
      <hr />
      <button className="bg-blue-500" onClick={handleDeleteUser}>Delete User and Videos</button>
    </div>
  )
}
