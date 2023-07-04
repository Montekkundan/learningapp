import {
    Modal,
    Button,
    Group,
    Text,
    Progress,
    Stack,
    TextInput,
    Switch,
    MultiSelect,
  } from "@mantine/core";
  import { Dispatch, SetStateAction, useState } from "react";
  import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
  import { ArrowBigUpLine } from "tabler-icons-react";
  import { useMutation } from "react-query";
  import { updateVideo, uploadVideo } from "../api";
  import { useForm } from "@mantine/form";
  import { Video } from "../types";
  import { AxiosError, AxiosResponse } from "axios";
  import { useVideo } from "../context/videos";
  
  function EditVideoForm({
    videoId,
    setOpened,
  }: {
    videoId: string;
    setOpened: Dispatch<SetStateAction<boolean>>;
  }) {
    const { refetch } = useVideo();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleTagsChange = (tags: string[]) => setSelectedTags(tags);
    
    const published = true;
    const form = useForm({
      initialValues: {
        title: "",
        description: "",
        published: published,
        tags: []
      },
    });
  
    type input = Parameters<typeof updateVideo>["0"];
  
    const mutation = useMutation<AxiosResponse<Video>, AxiosError, input>(
      updateVideo,
      {
        onSuccess: () => {
          setOpened(false);
          form.reset();
          refetch();
        },
      }
    );

    const data = [
      { value: 'react', label: 'React' },
      { value: 'ng', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'vue', label: 'Vue' },
      { value: 'riot', label: 'Riot' },
      { value: 'next', label: 'Next.js' },
      { value: 'blitz', label: 'Blitz.js' },
    ];
  
    return (
      <form
      onSubmit={form.onSubmit((values: any) => {
        const updatedValues = { ...values, tags: selectedTags };
        mutation.mutate({ videoId, ...updatedValues });
      })}
      
    >
        <Stack>
          <TextInput
            label="Title"
            required
            placeholder="My awesome video"
            {...form.getInputProps("title")}
          />
  
          <TextInput
            label="Description"
            required
            {...form.getInputProps("description")}
          />

            <MultiSelect
              data={data}
              label="Tags"
              placeholder="Pick all that you like"
              value={selectedTags}
              onChange={handleTagsChange}
            />

  
          <Switch label="Published" checked={published} {...form.getInputProps("published")} />
          <Button className="bg-blue-500" type="submit">Save</Button>
        </Stack>
      </form>
    );
  }
  
  function UploadVideo() {
    const [opened, setOpened] = useState(false);
    const [progress, setProgress] = useState(0);
  
    const mutation = useMutation(uploadVideo);
  
    const config = {
      onUploadProgress: (progressEvent: any) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
  
        setProgress(percent);
      },
    };
  
    function upload(files: File[]) {
      const formData = new FormData();
  
      formData.append("video", files[0]);
  
      mutation.mutate({ formData, config });
    }

    const handleCloseModal = () => {
      setOpened(false);
      setProgress(0);
      mutation.reset(); 
    }
  
    return (
      <>
        <Modal
          closeOnClickOutside={false}
          onClose={handleCloseModal}
          opened={opened}
          title="Upload video"
          size="xl"
        >
          {progress === 0 && (
            <Dropzone
              onDrop={(files) => {
                upload(files);
              }}
              accept={[MIME_TYPES.mp4]}
              multiple={false}
            >
              
                  <Group
                    position="center"
                    spacing="xl"
                    style={{
                      minHeight: "50vh",
                      justifyContent: "center",
                    }}
                    align="column"
                  >
                    <ArrowBigUpLine />
                    <Text>Drag video here or click to find</Text>
                  </Group>
                
              
            </Dropzone>
          )}
  
          {progress > 0 && (
            <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
          )}
  
          {mutation.data && (
            <EditVideoForm
              setOpened={setOpened}
              videoId={mutation.data.videoId}
            />
          )}
        </Modal>
  
        <Button className="bg-blue-500" onClick={() => setOpened(true)}>Upload video</Button>
      </>
    );
  }
  
  export default UploadVideo;