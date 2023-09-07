"use client";


import {
  ArrowRight,
  MessageSquare,
  Music,
  ImageIcon,
  VideoIcon,
  CodeIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";





const tools = [
  {
    label: "Lets Talk",
    icon: MessageSquare,
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "TuneBox",
    icon: Music,
    color: "text-green-500",
    bgcolor: "bg-emarald-500/10",
    href: "/music",
  },
  {
    label: "PhotoHub",
    icon: ImageIcon,
    color: "text-pink-500",
    bgcolor: "bg-pink-500/10",
    href: "/image",
  },
  {
    label: "ClipShow",
    icon: VideoIcon,
    color: "text-orange-700",
    bgcolor: "bg-orange-700/10",
    href: "/video",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-yellow-500",
    bgcolor: "bg-yellow-500/10",
    href: "/code",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p
          className="text-muted-foreground font-dark
        text-sm md:text-lg text-center"
        >
          Chat with a powerful AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify
          -between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}
              </div>
            </div>
              <ArrowRight className="w-5 h-5"  />
            
          </Card>
        ))}
      </div>
    </div>
  );
};
export default DashboardPage;