"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { useRouter } from "next/navigation";
import ChatCompletionRequestMessage from "openai";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Music } from "lucide-react";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { useState } from "react";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-promodal";
import { toast } from "react-hot-toast";

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music");

      setMusic(response.data.audio);
      form.reset();
    } catch (error:any) {
      // TODO: Handle errors gracefully
      if (error?.response?.status === 403) {
        proModal.onOpen(); //Ignore this, it has been changed earlier
      } else{
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music-generation"
        description="Turn your prompt into music" // Removed unnecessary curly braces
        icon={Music}
        iconColor="text-emarald-700"
        bgColor="bg-emarald-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg
                border
                w-full
                p-4
                px-3
                md:px-6
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2"
            >
              <FormField
                name="prompt" // Fixed typo: "promt" should be "prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none
                        focus-visible:ring-0
                        focus-visible:ring-transparent" // Fixed the typo: focus-visible:ring-0w should be focus-visible:ring-0
                        disabled={isLoading}
                        placeholder="Piano solo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <div className="space-y-4 mt-4">
            {isLoading && (
              <div
                className="p-8 rounded-lg w-full flex items-center
              justify-center bg-muted"
              >
                <Loader />
              </div>
            )}
            {!music && !isLoading && <Empty label="No music generated" />}
            {music && (
              <audio controls className="w-full mt-8">
                <source src={music} />
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
