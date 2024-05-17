import { Ollama } from '@langchain/community/llms/ollama';
import { NextRequest } from 'next/server';
import { StringOutputParser } from '@langchain/core/output_parsers';

interface ImageData {
  imageData: string;
  question: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const data: ImageData = await req.json();

    const base64EncodedImage = data.imageData.split(
      'data:image/jpeg;base64,'
    )[1];

    const llava = new Ollama({
      // baseUrl: 'http://localhost:11434',

      baseUrl: 'http://206.189.141.153:11434/',
      model: 'llava',
    }).bind({
      images: [base64EncodedImage],
    });

    const llavaStream = await llava
      .pipe(new StringOutputParser())
      .stream(
        data.question
          ? `Answer this question from the provided image - "${data.question}". Don't add extra response. Answer only what is asked`
          : 'Explain the image'
      );

    return new Response(llavaStream, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

    // const llavaAnswer = await streamToString(llavaStream);
    // return Response.json({ success: true, answer: llavaAnswer });
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { success: false, error: 'Unknown error' },
      { status: 500 }
    );
  }
};

// async function streamToString(stream: any) {
//   const chunks = [];
//   for await (const chunk of stream) {
//     chunks.push(chunk);
//   }
//   return chunks.join('');
// }
