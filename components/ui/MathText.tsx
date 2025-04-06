// // components/MathText.tsx
// import 'katex/dist/katex.min.css';
// import { InlineMath } from 'react-katex';

// const parseMath = (text: string) => {
//     const parts = text.split(/(\$[^$]+\$)/g); // split by LaTeX expressions
//     return parts.map((part, index) => {
//         if (part.startsWith('$') && part.endsWith('$')) {
//             const latex = part.slice(1, -1);
//             return <InlineMath key={index} math={latex} />;
//         }
//         return <span key={index}>{part}</span>;
//     });
// };

// const MathText = ({ content }: { content: string }) => {
//     return (
//         <div className="p-4 text-white bg-[#111827] rounded-lg border border-blue-500">
//             <p className="text-lg text-center">{parseMath(content)}</p>
//         </div>
//     );
// };

// export default MathText;
