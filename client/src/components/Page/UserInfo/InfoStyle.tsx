import tw from "tailwind-styled-components";

export const InfoSection = tw.section`pt-10 border-b border-b-slate-300`;

export const InfoTitle = tw.p`text-lg sm:text-xl py-2`;

export const InfoContent = tw.section`pt-2 pb-5`;

export const EditList = tw.div`flex items-center flex-wrap mb-4 w-full`;

export const InputDiv = tw.div`w-full min-[450px]:w-3/5`;

export const InputLabel = tw.label`w-full min-[450px]:w-2/5 text-base my-1`;

export const SubLabel = tw.label``;

export const Input = tw.input`w-full px-2 py-1 border border-slate-300 bg-slate-100 rounded-lg focus:outline-none`;
