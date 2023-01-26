// 댓글 타입
export interface CommentType {
  postTitle: string;
  id: number;
  postId: number;
  content: string;
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
  list: {
    id: number;
    title: string;
    content: string;
    viewCount: number;
    likeCount: number;
    createdAt: string;
    writer: {
      id: number;
      nickName: string;
      profileImage: null | string;
      signedUpAt: string;
      followings: number;
      followers: number;
    };
    commentList: IdataComment[];
    tag: string[];
    public: boolean;
  }[];
  key: number;
}

export interface IBlogDetailData {
  detail: {
    id: number;
    title: string;
    content: string;
    thumbnailImage: null | string;
    viewCount: number;
    likeCount: number;
    isPublic: boolean;
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
    comments: {
      reverse: any;
      map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
      id: number;
      writerId: number;
      nickname: string;
      profileImage: string;
      createdAt: string;
      content: string;
    };
    tag: string[];
  };
}
