export const BlogSkeleton = () => {
  return (
    <div className="flex flex-col max-w-4xl mx-auto h-4/12 items-center animate-pulse">
      
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent "></div>
      
      
      <div className="flex  h-12 items-center mt-2 w-full max-w-3xl">
        <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
        <div className="h-4 bg-slate-200 rounded w-24 ml-4"></div>
        <div className="h-4 bg-slate-200 rounded w-20 ml-4"></div>
      </div>
      
      <div className="flex  flex-col max-w-3xl w-full">
        <div className="h-8 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      </div>
      
      <div className="w-full  max-w-3xl mt-4">
        <div className="h-3 bg-slate-200 rounded w-32"></div>
      </div>
      
      <div className="w-full mt-6 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
    </div>
  );
};
