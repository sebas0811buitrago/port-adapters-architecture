import { generateText } from "ai";
import { anthropicModel } from "./models";

export const describeImage = async (imageUrl: string) => {
  const { text } = await generateText({
    model: anthropicModel,
    system:
      `You will receive an image. ` +
      `Please create an alt text for the image. ` +
      `Be concise. ` +
      `Use adjectives only when necessary. ` +
      `Do not pass 160 characters. ` +
      `Use simple language. `,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            image: new URL(imageUrl),
          },
        ],
      },
    ],
  });

  return text;
};

const init = async () => {
  const response = await describeImage(
    "https://github.com/ai-hero-dev/ai-hero/blob/main/internal/assets/image.jpg?raw=true"
  );

  console.log(response);
};

init();
