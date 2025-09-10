import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Audio = buffer.toString("base64");

    const speechResponse = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            encoding: "MP3",
            sampleRateHertz: 16000,
            languageCode: "en-US",
          },
          audio: {
            content: base64Audio,
          },
        }),
      }
    );

    if (!speechResponse.ok) {
      const errorData = await speechResponse.json();
      console.error("Google Speech API Error:", errorData);
      throw new Error("Failed to transcribe audio.");
    }

    const speechData = await speechResponse.json();
    const transcription =
      speechData.results
        ?.map((result) => result.alternatives[0].transcript)
        .join(" ") || "No transcription result.";

    if (transcription === "No transcription result.") {
      return NextResponse.json({
        transcription,
        summary: "Could not generate summary from empty transcription.",
      });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarize the following text in 50 words or less: ${transcription}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error("Gemini API Error:", errorData);
      throw new Error("Failed to generate summary.");
    }

    const geminiData = await geminiResponse.json();
    const summary =
      geminiData.candidates[0]?.content.parts[0].text || "Summary not available.";

    return NextResponse.json({ transcription, summary });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}