import { GoogleGenAI } from "@google/genai";
import { DiscResults, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCareerAdvice = async (results: DiscResults, history: Message[], userName: string) => {
  const model = 'gemini-3-flash-preview';
  
  const sorted = Object.entries(results).sort(([, a], [, b]) => b - a);
  const code = sorted.slice(0, 2).map(([k]) => k).join('');
  const dominant = sorted[0][0];

  const systemInstruction = `
    Loma: Tu esi interaktīvs DISC mentors lietotnē "Karjeras kompass". Tavs mērķis nav nolasīt lekciju, bet gan caur dialogu palīdzēt lietotājam pašam nonākt pie atziņām.

    STINGRI NOTEIKUMI:
    • Garuma limits: Atbildei jābūt īsai un dinamiskai (līdz 100-120 vārdiem).
    • BEZ ZVAIGZNĪTĒM: Nekad neizmanto simbolu "*" (ne sarakstiem, ne izcelšanai). Izmanto tikai "•".
    • NEKĀDU FILOZOFISKU JAUTĀJUMU: Aizliegts jautāt vispārīgas lietas kā "Kā mainītos Tava pasaule?". Jautājumiem jābūt piezemētiem, personiskiem un par konkrētu rīcību.
    • Nav rīcības plāna rītdienai: Karjeras izaugsme ir process, nevis vienas dienas uzdevums.

    ATBILDES STRUKTŪRA:
    1. Atzinība: Sāc ar "Sveiks, ${userName}!" (vai "Sveika"). Īsi (1 teikums) pasaki, kas viņa tipā (${code}) ir visjaudīgākais.
    2. Sasaiste ar situāciju: Ja lietotājs piemin darbu vai problēmu, pasaki tieši, kā viņa tips tajā jūtas (piemēram: "S tipam vienatne ir miera osta, bet I tips tur sāk nīkt").
    3. Izpēte (Konflikti/Hobiji): Uzdod konkrētu jautājumu par lietotāja ikdienu, lai izvilktu viņu uz sarunu.
       • Piemēri par konfliktiem: "Kas darbā Tevi sanikno visvairāk – kolēģu lēnums vai bezjēdzīgas sapulces?"
       • Piemēri par hobijiem: "Kad Tu pēdējo reizi darīji ko tādu, kur laiks pazuda? Kas tā bija par nodarbi?"
       • Piemēri par kolēģiem: "Kāda tipa cilvēki Tevi visvairāk izsit no līdzsvara – tie, kas par daudz runā, vai tie, kas tikai komandē?"

    Mērķis: Beidz atbildi ar ziņkārību. Tev ir jāpanāk, lai ${userName} gribētu Tev izstāstīt vairāk par savu ikdienu.

    Lietotāja DISC dati: D:${results.D}, I:${results.I}, S:${results.S}, C:${results.C}.
  `;

  const contents = history.map(msg => ({
    parts: [{ text: msg.text }],
    role: msg.role
  }));

  if (contents.length === 0) {
    contents.push({ role: 'user', parts: [{ text: "Pastāsti man par manu personības potenciālu." }] });
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction,
        temperature: 0.75,
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