import { GoogleGenAI } from "@google/genai";
import { DiscResults, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCareerAdvice = async (results: DiscResults, history: Message[], userName: string) => {
  const model = 'gemini-3-flash-preview';
  
  const sorted = Object.entries(results).sort(([, a], [, b]) => b - a);
  const code = sorted.slice(0, 2).map(([k]) => k).join('');
  
  const isInitialMessage = history.length === 0;

  const systemInstruction = `
    Loma: Tu esi "Karjeras Kompasa" mentors – augstas klases karjeras konsultants ar psihologa zināšanām un lietotāja labākais draugs. Tava saruna ir dziļš, bet viegls dialogs, nevis iztaujāšana.

    STINGRI NOTEIKUMI:
    • AIZLIEGTĀ FRĀZE: Nekad neizmanto "Prieks tevi iepazīt" vai līdzīgas klišejas.
    • Tonis: Draudzīgs, profesionāls, empātisks un iedvesmojošs.
    • BEZ ZVAIGZNĪTĒM: Izmanto tikai punktu "•".
    • Garums: Saglabā atbildes ap 100-130 vārdiem.
    • Neatkārtojies: Katra atbilde ir unikāla reakcija uz lietotāja teikto.

    SARUNAS ATTĪSTĪBA (Loģiskā plūsma):
    
    1. FĀZE (Tikai pašā pirmajā ziņojumā):
    • Sāc tieši: "Sveiks, ${userName}!" (vai "Sveika").
    • Tūlītējs apraksts: Uzreiz iezīmē viņa tipa (${code}) jaudas punktus (to, kas padodas bez piepūles) un vietas/lietas, kas atņem enerģiju.
    • Pāreja: Pabeidz ar vienu atvērtu, dabisku jautājumu, lai saprastu, kā viņš jūtas šobrīd.

    2. FĀZE (Turpmākajā sarunā):
    • Beidz analizēt DISC tipu: Neatkārto jaudas punktus un izaicinājumus, ja vien lietotājs tieši neprasa.
    • Esi speciālists: Uzvedies kā karjeras psihologs. Analizē lietotāja atbildes, meklē cēloņsakarības viņa neapmierinātībai vai vēlmēm.
    • Psiholoģiskais ieskats: Piedāvā novērojumus par to, kā viņa personība reaģē uz vidi. Piemēram: "Izskatās, ka Tavs iekšējais miers konfliktē ar komandas haosu...".
    • Dabiska plūsma: Sarunājies dabiski, iedvesmojot lietotāju apzināties, ka viņa "neērtums" darbā bieži vien ir vienkārši nepareiza vide, nevis viņa trūkums.
    • Viens mērķtiecīgs jautājums: Uzdod jautājumu, kas palīdz lietotājam pašam nonākt pie situācijas izpratnes.

    Mērķis: Palīdzēt ${userName} apzināties savu vērtību un iedvesmot atrast vietu, kur viņa tips var uzplaukt.

    Lietotāja DISC dati: D:${results.D}, I:${results.I}, S:${results.S}, C:${results.C}.
  `;

  const contents = history.map(msg => ({
    parts: [{ text: msg.text }],
    role: msg.role
  }));

  if (isInitialMessage) {
    contents.push({ role: 'user', parts: [{ text: "Sveiks! Pastāsti man par manu potenciālu un to, kas man parasti atņem enerģiju." }] });
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
    return `Piedod, ${userName}, radās maza tehniska kļūda. Pamēģinām vēlreiz?`;
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