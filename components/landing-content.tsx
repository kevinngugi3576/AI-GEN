
"use client";
import { Card, CardContent, CardHeader, CardTitle   } from "@/components/ui/card";

const about = [
    {
        name: "Kevin Ngugi",
        avatar: "A",
        title: "Software Engineer",
        description: "What an App!"

    }
]


export const LandingContent = () => {
  return (
    <div className="px=10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        ABOUT
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 gap-4">(
        {about.map((item) => (
            <Card key={item.description} className="bg-[#192339] border-non text-white">
                <CardHeader>
                    <CardTitle className="flex items-center gap-x-2">
                        <div>
                            <p className="text-lg">{item.name}</p>
                            <p className="text-zinc-400">{item.title}</p>


                        </div>
                    </CardTitle>
                    {item.description}
                    <CardTitle />
                </CardHeader>
            </Card>
        ))}

      </div>
    </div>
  );
};
