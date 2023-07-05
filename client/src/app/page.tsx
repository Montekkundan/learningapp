"use client"
import Link from "next/link"
import { useMe } from "./context/me"
import { Anchor, Button, Menu, SimpleGrid } from "@mantine/core"
import { deleteUser, logout } from './api';
import UploadVideo from "./components/UploadVideo";
import { useVideo } from "./context/videos";
import VideoTeaser from "./components/VideoTeaser";
import styles from "./styles/Home.module.css";
import { IconArrowsLeftRight, IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons-react";



export default function Home() {
  const { videos, refetch: refetchVideos } = useVideo();

  // useEffect(() => {
  //   refetchVideos();
  // }, []);
  async function handleLogout() {
    await logout();
    refetch();
  }
  async function handleDeleteUser() {
    // Call API to delete user and their videos
    await deleteUser(user._id);
    await logout();
    refetch();
    refetchVideos();
  }
  
  const {user, refetch} = useMe()
  return (
    <main className="">
      <div className="flex justify-between p-5 space-x-5">
        <div>
      {user ? (
        <>
          
          
          <button className="bg-blue-500" onClick={handleDeleteUser}>Delete User and Videos</button>

          
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
      <div>
        {user && (
          <div className="flex space-x-3">
            <UploadVideo />
            <Menu shadow="md" width={200} >
      <Menu.Target>
        <Button className="bg-blue-500">{user.username}</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} />}>  
        <Link href="/account">
          Settings
          </Link>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item  onClick={handleLogout} icon={<IconArrowsLeftRight size={14} />}>Logout</Menu.Item>
 
      </Menu.Dropdown>
    </Menu>
          </div>
        )}
      </div>
      
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
