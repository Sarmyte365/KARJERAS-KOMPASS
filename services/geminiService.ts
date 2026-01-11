
import { GoogleGenAI } from "@google/genai";
import { DiscResults, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCareerAdvice = async (results: DiscResults, history: Message[]) => {
  const model = 'gemini-3-flash-preview';
  
  // Extract traits for the prompt
  const sorted = Object.entries(results).sort(([, a], [, b]) => b - a);
  const code = sorted.slice(0, 2).map(([k]) => k).join('');
  const lowTraits = Object.entries(results).filter(([, val]) => val <= 2).map(([k]) => k);

  const systemInstruction = `
    Tu esi profesionāls karjeras mentors, kurš izmanto DISC teoriju (Platinum Rule un Everything DiSC).
    
    Lietotāja profils:
    - Galvenais kods: ${code}
    - D (Dominance): ${results.D}, I (Influence): ${results.I}, S (Steadiness): ${results.S}, C (Conscientiousness): ${results.C}
    - Trūkstošās/vājās iezīmes: ${lowTraits.join(', ')}

    Noteikumi sarunai:
    1. Runā tikai latviski.
    2. Neizmanto markdown trekno rakstu (**). Raksti tīru, profesionālu tekstu.
    3. Analizē abu dominējošo burtu mijiedarbību.
    4. Īpašu uzmanību pievērs trūkstošajām iezīmēm. Norādi uz "tempa un prioritāšu" konfliktiem:
       - Ja D/I ir augsti, bet S/C zemi: Brīdini par paviršību un haosu.
       - Ja S/C ir augsti, bet D/I zemi: Brīdini par lēnumu un bailēm no riska.
    5. Skaidri pasaki, kādās darba vidēs lietotājs jutīsies slikti (piemēram, C tipam haoss ir "Moment of Misery").
    6. Esi dzīvs mentors, nevis robots. Sāc ar pozitīvo, tad pārej pie kritiskajiem riskiem.
    7. Uzdod jautājumus par hobijiem, lai saprastu, kur lietotājs kompensē savas vajadzības.
  `;

  const contents = history.map(msg => ({
    parts: [{ text: msg.text }],
    role: msg.role
  }));

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Atvainojiet, radās kļūda saziņā. Lūdzu, mēģiniet vēlreiz.";
  }
};

export const generateCareerVision = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional and inspiring office workplace visualization based on DISC profile: ${prompt}. Focus on lighting and atmosphere that suits this personality type. Minimalist, elegant, corporate aesthetics.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};
