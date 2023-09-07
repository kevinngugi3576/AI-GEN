import { OpenAI } from "openai";
import { Configuration, ChatCompletionRequestMessage } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { checkApiLimit, increaseAPiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);
const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: "you are a code generator.Answer markdown  code only",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

      const freeTrial = await checkApiLimit();
      const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("free trial has expired", { status: 403});

    }
 
    if(!isPro) {
      return increaseAPiLimit();
    }


     

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    await increaseAPiLimit();

    return NextResponse.json(response.data.chioces[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
