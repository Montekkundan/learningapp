import axios from "axios";
import { Video } from "../types";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videosBase = `${base}/api/videos`;
const thumbnailsBase = `${base}/api/thumbnails`;

export function registerUser(payload: {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }) {
    console.log(userBase)
    return axios.post(userBase, payload).then((res) => res.data);
  }
  export function login(payload: { email: string; password: string }) {
    return axios
      .post(authBase, payload, {
        withCredentials: true,
      })
      .then((res) => res.data);
  }

  export function getMe() {
    return axios
      .get(userBase, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch(() => {
        return null;
      });
  }

  export function logout() {
    return axios
      .post(`${authBase}/logout`, {}, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((error) => {
        // handle error
        console.error(error);
        return null;
      });
  }
  export function uploadVideo({
    formData,
    config,
  }: {
    formData: FormData;
    config: { onUploadProgress: (progressEvent: any) => void };
  }) {
    return axios
      .post(videosBase, formData, {
        withCredentials: true,
        ...config,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }
  
  export function updateVideo({
    videoId,
    ...payload
  }: {
    videoId: string;
    title: string;
    description: string;
    published: boolean;
  }) {
    return axios.patch<Video>(`${videosBase}/${videoId}`, payload, {
      withCredentials: true,
    });
  }
  
  export function getVideos() {
    return axios.get(videosBase).then((res) => res.data);
  }

  export function deleteUser(userId: string) {
    return axios
      .delete(`${userBase}/${userId}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((error) => {
        // handle error
        console.error(error);
        return null;
      });
  }
  
  export function fetchAllUsers() {
    return axios
      .get(userBase, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((error) => {
        // handle error
        console.error(error);
        return null;
      });
  }
  export function deleteVideo(videoId: string) {
    return axios
      .delete(`${videosBase}/${videoId}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((error) => {
          // handle error
          console.error(error);
          return null;
        });
  }
  export function getThumbnails() {
    return axios
      .get(thumbnailsBase)
      .then((res) => res.data)
      .catch((error) => {
        // handle error
        console.error(error);
        return null;
      });
  }
  
  export function getThumbnail(videoId: string) {
    return axios
      .get(`${thumbnailsBase}/${videoId}`)
      .then((res) => res.data)
      .catch((error) => {
        // handle error
        console.error(error);
        return null;
      });
  }