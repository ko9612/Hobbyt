import tw from "tailwind-styled-components";

export const InfoSection = tw.section`
pt-10 border-b border-b-slate-300
`;

export const InfoTitle = tw.p`
text-xl py-2
`;

export const InfoContent = tw.form`
pt-2 pb-5
`;

export const EditList = tw.div`
flex flex-wrap mb-4
`;

export const InputDiv = tw.div`
justify-between w-3/5
`;

export const InputLabel = tw.label`
flex items-center w-2/5
`;

export const SubLabel = tw.label`
`;

export const Input = tw.input`
w-full px-2 py-1 border border-slate-300
bg-slate-100 rounded-lg focus:outline-none
`;
// export const CurrentInfo = tw.div`
// border-2 border-slate-200 px-4 py-2 bg-slate-200 rounded-lg duration-200 w-full
// `;
