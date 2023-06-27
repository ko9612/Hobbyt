import { AxiosHeaders } from "axios";
// 댓글 타입
export interface CommentType {
  postTitle: string;
  id: number;
  postId: number;
  content: string;
  postWriterId: number;
}

// 블로그 탭 리스트 데이터 타입2
export interface IdataComment {
  writeId: number;
  nickName: string;
  profileImage: null | string;
  createdAt: string;
  content: string;
}
// 블로그 탭 리스트 데이터 타입1
export interface IdataProps {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  writerId: number;
  isPublic: boolean;
}

// export interface IBlogDetailData {
//   comments: {
//     id: number;
//     title: string;
//     content: string;
//     thumbnailImage: null | string;
//     viewCount: number;
//     likeCount: number;
//     isPublic: boolean;
//     createdAt: string;
//     writer: {
//       id: number;
//       email: string;
//       nickName: string;
//       profileImage: null | string;
//       signedUpAt: string;
//       followings: number;
//       followers: number;
//     };
//     comments: {
//       reverse: any;
//       map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
//       id: number;
//       writerId: number;
//       nickname: string;
//       profileImage: string;
//       createdAt: string;
//       content: string;
//     };
//     tag: string[];
//   };
// }

export interface IAxiosBlogDetailDataType {
  // comments: {
  id: number;
  title: string;
  content: string;
  thumbnailImage: null | string;
  viewCount: number;
  likeCount: number;
  isPublic: boolean;
  isLiked: boolean;
  createdAt: string;
  writer: {
    id: number;
    email: string;
    nickName: string;
    profileImage: null | string;
    signedUpAt: string;
    followings: number;
    followers: number;
  };
  comments: [
    id: number,
    writerId: number,
    nickname: string,
    profileImage: string,
    createdAt: string,
    content: string,
  ];
  tag: string[];
}
// }
export interface ILikeList {
  hasNext: boolean;
  cards: [
    {
      postLikeId: number;
      postId: number;
      title: string;
      content: string;
      thumbnailImage: null | string;
      viewCount: number;
      likeCount: number;
      createdAt: string;
    },
  ];
}

// 검색 - 블로그 리스트 데이터 타입 & 금주의 블로그 데이터 타입
export interface BlogItemProps {
  id: number;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  isPublic: boolean;
  writerId: number;
  nickname: string;
  createdAt: string;
  profileImage: string | null;
  writerProfileImage: string | null;
  thumbnailImage: string | null;
}

export interface SearchBlogDataProps {
  hasNext: boolean;
  posts: BlogItemProps[];
}

export interface BlogTabProps {
  hasNext: boolean;
  posts: IdataProps[];
}

export interface MyCommentType {
  hasNext: boolean;
  comments: CommentType[];
}

// 블로그 수정
// export interface AxiosResponseType {
//   config: any;
//   data: AxiosDataType;
//   headers: AxiosHeaders;
//   requset: XMLHttpRequest;
//   status: number;
//   statusText: string;
// }

export interface AxiosDataType {
  comments: [
    content: string,
    createdAt: string,
    id: number,
    nickname: string,
    profileImage: string,
    writerId: number,
  ];
  content: string;
  id: number;
  isLiked: boolean;
  isPublic: boolean;
  tags: string[];
  thumbnailImage: string | null;
  title: string;
  viewCount: number;
  writer: {
    email: string;
    followers: number;
    followings: number;
    id: number;
    nickName: string;
    profileImage: string;
    signedUpAt: string;
  };
}

export interface AxiosBlogPostSubmitType {
  config: any;
  data: number;
  headers: AxiosHeaders;
  requset: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface PostBlogEditRequestDataType {
  title: string;
  content: string;
  isPublic: boolean;
  tags: string[] | undefined;
  thumbnailImage: string | null;
}
