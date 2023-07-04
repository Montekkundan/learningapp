export interface Video {
    _id: string;
    owner: string;
    published: boolean;
    videoId: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    extension: string;
    description: string;
    title: string;
    tags: string[];
  }

  export interface Thumbnail {
    _id: string;
    url: string;
    owner: string;
    video: string;
    createdAt: string;
    updatedAt: string;
  }
  
  
  export enum QueryKeys {
    me = "me",
    videos = "videos",
    thumbnails = "thumbnails",
  }
  
  export interface Me {
    _id: string;
    email: string;
    username: string;
  }