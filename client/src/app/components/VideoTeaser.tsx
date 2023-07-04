import { ActionIcon, Card, Text } from "@mantine/core";
import Link from "next/link";
import { Video } from "../types";
import { useMe } from "../context/me";

import { IconTrash } from '@tabler/icons-react';
import { deleteVideo } from "../api";
import { useVideo } from "../context/videos";

function VideoTeaser({ video }: { video: Video }) {
  const {  refetch: refetchVideos } = useVideo();
  if (!video) {
    return null;
  }
  const {user} = useMe()
  const showDeleteButton = user && user._id === video.owner;

  const handleDelete = async (event: { stopPropagation: () => void; })=> {
    event.stopPropagation();
    try {
      await deleteVideo(video.videoId);
      await refetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };


  return (
    <Card shadow="sm" p="xl">
    <Link href={`/watch/${video.videoId}`}>
   
        <Text weight={500} size="lg">
          {video.title}
        </Text>

        <Text size="sm">{video.description}</Text>
        
        <div className="inline-flex flex-wrap">
  {video.tags.map((tag, index) => (
    <Text key={index} className="mr-2" size="sm">#{tag}</Text>
  ))}
</div>

     
    </Link>

    {showDeleteButton && (
      <ActionIcon onClick={handleDelete} color="red" aria-label="Delete video">
        <IconTrash />
      </ActionIcon>
    )}
  </Card>
  );
}

export default VideoTeaser;
