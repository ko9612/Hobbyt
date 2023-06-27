import tw from "tailwind-styled-components";

export const PostWriteContent = tw.article`px-5`;

export const PostWriteList = tw.div`mb-8`;

export const PostWriteLabel = tw.label`font-semibold`;

export const Sign = tw.span`text-red-500`;

export const PostTextArea = tw.textarea`w-full p-2 my-2 border-2 rounded-lg border-slate-200 text-sm sm:text-base`;

export const PostInput = tw.input`w-full p-2 my-2 border-2 rounded-lg border-slate-200 text-sm sm:text-base`;

export const SubLabel = tw.label``;

export const InfoContent = tw.div`relative flex flex-col items-center mb-4 bg-slate-200 py-2 px-3 rounded-xl min-[400px]:flex-row`;

export const ImgBox = tw.div`bg-white rounded-md aspect-square max-[400px]:my-1
w-[6.5rem] h-[6.5rem] flex items-center justify-center relative`;
