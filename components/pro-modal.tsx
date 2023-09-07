"use client";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-promodal";
import { Badge } from "@/components/ui/badge"; 
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  MessageSquare,
  Music,
  ImageIcon,
  VideoIcon,
  CodeIcon,
    Check,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

const tools = [
  {
    label: "Lets Talk",
    icon: MessageSquare,
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "TuneBox",
    icon: Music,
    color: "text-green-500",
    bgcolor: "bg-emarald-500/10",
  },
  {
    label: "PhotoHub",
    icon: ImageIcon,
    color: "text-pink-500",
    bgcolor: "bg-pink-500/10",
  },
  {
    label: "ClipShow",
    icon: VideoIcon,
    color: "text-orange-700",
    bgcolor: "bg-orange-700/10",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-yellow-500",
    bgcolor: "bg-yellow-500/10",
  },
];

export const ProModal = () => {
  const ProModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = axios.get("/api/stripe");

      window.location.href = (await response).data.url;
    } catch (error) {
      
        toast.error("Something went wrong");
      }   finally{
      setLoading(false);
    }
  }

  return (
    <Dialog open={ProModal.isOpen} onOpenChange={ProModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to AI-Gen
              <Badge variant="premium" className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">
                    {tool.label}
                    </div>
                </div>
                <Check  
                className="text-primary w-5 h-5"
                /> 
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button
            disabled={loading}
                onClick={onSubscribe}
                variant="premium"
                size="lg"
                className="w-full"
            
            >
                Upgrade
                <Zap 
                className="w-4 h-4 ml-2 fill-white"
                />
            </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
