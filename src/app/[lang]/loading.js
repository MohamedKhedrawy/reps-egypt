export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="relative flex flex-col items-center">
         
         {/* Spinning Rings */}
         <div className="relative w-24 h-24">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-muted/20 rounded-full"></div>
            {/* Spinning Arcs */}
            <div className="absolute inset-0 border-4 border-transparent border-t-red-600 border-r-red-600 rounded-full animate-spin"></div>
            
            {/* Inner Pulsing Circle */}
            <div className="absolute inset-4 bg-muted/10 rounded-full animate-pulse flex items-center justify-center">
                 <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626]"></div>
            </div>
         </div>
         
         {/* Text */}
         <div className="mt-8 flex flex-col items-center gap-1">
             <h3 className="text-xl font-bold tracking-tighter">REPS <span className="text-red-600">EGYPT</span></h3>
             <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></span>
             </div>
         </div>

      </div>
    </div>
  )
}
