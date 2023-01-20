// 댓글 타입
export interface CommentType {
  title: string;
  id: number;
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
