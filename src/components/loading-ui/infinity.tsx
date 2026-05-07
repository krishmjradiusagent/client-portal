import { cn } from "@/lib/utils";

function InfinityLoop({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("animate-infinity-flow", className)}
      {...props}
    >
      <title>Loading...</title>
      <path
        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="205.271142578125 51.317785644531256"
        className="opacity-90"
      />
      <style>{`
        @keyframes infinity-flow {
          0% {
            stroke-dashoffset: 256.58892822265625;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-infinity-flow path {
          animation: infinity-flow 5s linear infinite;
        }
      `}</style>
    </svg>
  );
}

export { InfinityLoop };
