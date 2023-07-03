"use client"
import Link from "next/link"
import { useMe } from "./context/me"
import { Anchor, SimpleGrid } from "@mantine/core"
import { logout } from './api';
import UploadVideo from "./components/UploadVideo";
import { useVideo } from "./context/videos";
import VideoTeaser from "./components/VideoTeaser";
import styles from "./styles/Home.module.css";
import { useEffect } from "react";


export default function Home() {
  const { videos, refetch: refetchVideos } = useVideo();

  useEffect(() => {
    refetchVideos();
  }, []);
  async function handleLogout() {
    await logout();
    refetch();
  }
  
  const {user, refetch} = useMe()
  return (
    <main className="">
      <div className="flex justify-between p-5 space-x-5">
        <div>
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login" passHref>
            <Anchor ml="lg" mr="lr">
              Login
            </Anchor>
          </Link>
          <Link href="/register" passHref>
            <Anchor ml="lg" mr="lr">
              Register
            </Anchor>
          </Link>
        </>
      )}
      </div>
      <div>{user && <UploadVideo />}</div>
      
      </div>
      <div className={styles.container}>
      <SimpleGrid cols={3}>
          {(videos || []).map((video) => {
            return video && <VideoTeaser key={video.videoId} video={video} />;
          })}
        </SimpleGrid>
    </div>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
      hello
      
      </div>
      
      
      

    </main>
  )
}
