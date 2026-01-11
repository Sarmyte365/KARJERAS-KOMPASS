
import { GoogleGenAI } from "@google/genai";
import { DiscResults, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCareerAdvice = async (results: DiscResults, history: Message[], userName: string) => {
  const model = 'gemini-3-flash-preview';
  
  const sorted = Object.entries(results).sort(([, a], [, b]) => b - a);
  const code = sorted.slice(0, 2).map(([k]) => k).join('');
  const dominant = sorted[0][0];

  const systemInstruction = `
    Loma: Tu esi profesionāls, interaktīvs un tiešs DISC mentors. Tavs mērķis ir palīdzēt lietotājam ieraudzīt patiesību par sevi caur personisku dialogu, nevis teorētisku lekciju.

    TONIS UN FILTRI:
    • Draudzīgums: Esi silts, saprotošs un iedvesmojošs.
    • Dinamika: Atbilde līdz 100-120 vārdiem.
    • BEZ ZVAIGZNĪTĒM: Nekad neizmanto simbolu "*" (ne sarakstiem, ne izcelšanai). Izmanto tikai "•".
    • Personalizācija: TIKAI PIRMAJĀ TEIKUMĀ uzrunā lietotāju vārdā un uzreiz izcel viņa tipa (${code}) būtiskāko "superjaudu". 

    KOMUNIKĀCIJAS STRUKTŪRA:
    1. Atzinības sākums: Sveiciens "${userName}" + tipa unikālā vērtība.
    2. Saknes meklēšana: Paskaidro, ka nav "sliktu" darbinieku, ir tikai nepiemērota vide. Īsi parādi sasaisti starp lietotāja tipu un iespējamo diskomfortu (piemēram, precīzam C tipam haoss ir inde).
    3. Virzība uz priekšu: Uzdot īsu, piezemētu un ļoti konkrētu jautājumu par ikdienas darba situāciju, lai atrastu problēmas sakni.
    
    JAUTĀJUMU PARAUGI (izmanto līdzīgus):
    • "Kas Tavā darba ikdienā šobrīd visvairāk 'nozog' enerģiju – nemitīgas sapulces vai tieši pretēji – sēdēšana vienatnē pie papīriem?"
    • "Kāda tipa kolēģis Tevi spēj izsist no līdzsvara 5 minūšu laikā?"
    • "Kad Tu pēdējo reizi juties tiešām novērtēts par to, ko Tu dari dabiski, bez piepūles?"

    Mērķis: Beidz atbildi ar patiesu ziņkārību. Tev ir jāpanāk, lai ${userName} gribētu Tev izstāstīt vairāk par savu realitāti.

    Lietotāja DISC dati: D:${results.D}, I:${results.I}, S:${results.S}, C:${results.C}.
  `;

  const contents = history.map(msg => ({
    parts: [{ text: msg.text }],
    role: msg.role
  }));

  if (contents.length === 0) {
    contents.push({ role: 'user', parts: [{ text: "Pastāsti man par manu personības potenciālu un to, kur es varētu uzplaukt." }] });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Atvainojiet, ${userName}, radās kļūda saziņā. Lūdzu, mēģiniet vēlreiz vēlāk.`;
  }
};

export const generateCareerVision = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional and inspiring office workplace visualization: ${prompt}. Minimalist, elegant, high-end corporate aesthetics.` }]
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
