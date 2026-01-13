import React, { useState, useEffect, useRef } from 'react';
import { DISC_QUESTIONS, DISC_DESCRIPTIONS } from './constants';
import { DiscType, DiscResults, Message } from './types';
import DiscChart from './components/DiscChart';
import { getCareerAdvice, generateCareerVision } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'test' | 'results' | 'chat'>('intro');
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DiscType[]>([]);
  const [results, setResults] = useState<DiscResults | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [visionImage, setVisionImage] = useState<string | null>(null);
  const [isLoadingVision, setIsLoadingVision] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, step]);

  const goHome = () => {
    setStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    setChatMessages([]);
    setVisionImage(null);
    setInputText('');
    setIsTyping(false);
  };

  const handleRestart = () => {
    setStep('test');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResults(null);
    setChatMessages([]);
    setVisionImage(null);
    setInputText('');
    setIsTyping(false);
  };

  const handleAnswer = (category: DiscType) => {
    const newAnswers = [...answers, category];
    setAnswers(newAnswers);

    if (currentQuestionIndex < DISC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: DiscType[]) => {
    const counts: Record<DiscType, number> = {
      [DiscType.D]: 0,
      [DiscType.I]: 0,
      [DiscType.S]: 0,
      [DiscType.C]: 0
    };

    finalAnswers.forEach(cat => {
      counts[cat]++;
    });

    const normalizedResults: DiscResults = {
      D: Math.round((counts[DiscType.D] / 30) * 10) || 1,
      I: Math.round((counts[DiscType.I] / 30) * 10) || 1,
      S: Math.round((counts[DiscType.S] / 30) * 10) || 1,
      C: Math.round((counts[DiscType.C] / 30) * 10) || 1,
    };

    setResults(normalizedResults);
    setStep('results');
  };

  const getSortedTraits = () => {
    if (!results) return [];
    return (Object.entries(results) as [keyof DiscResults, number][]).sort(([, a], [, b]) => b - a);
  };

  const getDiscCode = () => {
    const sorted = getSortedTraits();
    return sorted.slice(0, 2).map(([key]) => key).join('');
  };

  const getLowTraits = () => {
    if (!results) return [];
    return (Object.entries(results) as [keyof DiscResults, number][]).filter(([, val]) => val <= 2);
  };

  const startChat = async () => {
    if (!results) return;
    
    if (chatMessages.length > 0) {
      setStep('chat');
      return;
    }

    setStep('chat');
    setIsTyping(true);
    
    const responseText = await getCareerAdvice(results, [], userName);
    setChatMessages([{ role: 'model', text: responseText || "Sveiks! Esmu Tavs mentors. Kā varu Tev palīdzēt?" }]);
    setIsTyping(false);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !results) return;

    const userMsg: Message = { role: 'user', text: inputText };
    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const responseText = await getCareerAdvice(results, [...chatMessages, userMsg], userName);
    
    setChatMessages(prev => [...prev, { role: 'model', text: responseText || "Atvainojiet, nevarēju saņemt atbildi." }]);
    setIsTyping(false);
  };

  const generateVision = async () => {
    if (!results) return;
    setIsLoadingVision(true);
    const prompt = `Professional workplace for DISC profile ${getDiscCode()}. Teal palette. High-end office.`;
    const img = await generateCareerVision(prompt);
    setVisionImage(img);
    setIsLoadingVision(false);
  };

  const getDominantType = (): DiscType => {
    if (!results) return DiscType.D;
    const mapping: Record<string, DiscType> = {
      D: DiscType.D,
      I: DiscType.I,
      S: DiscType.S,
      C: DiscType.C
    };
    const sorted = getSortedTraits();
    return mapping[sorted[0][0]];
  };

  return (
    <div className="min-h-screen flex flex-col max-w-6xl mx-auto p-3 sm:p-6 lg:p-10 transition-all duration-500 bg-slate-50">
      <header className="mb-6 sm:mb-10 flex items-center justify-between px-2">
        <button 
          onClick={goHome}
          className="flex items-center gap-2 sm:gap-3 group transition-transform hover:scale-[1.02] active:scale-[0.98] text-left"
        >
          <div className="bg-teal-600 p-2 rounded-lg sm:p-2.5 sm:rounded-xl text-white shadow-lg shadow-teal-200 group-hover:bg-teal-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight group-hover:text-teal-600 transition-colors">Karjeras Kompass</h1>
        </button>
        {step !== 'intro' && (
          <button 
            onClick={handleRestart}
            className="text-[10px] sm:text-xs text-slate-500 hover:text-teal-600 font-bold uppercase tracking-widest transition-colors"
          >
            Sākt no jauna
          </button>
        )}
      </header>

      <main className="flex-1 bg-white rounded-2xl sm:rounded-[2.5rem] shadow-2xl shadow-teal-900/5 border border-slate-100 overflow-hidden flex flex-col">
        {step === 'intro' && (
          <div className="p-6 sm:p-10 lg:p-16 text-center flex flex-col min-h-[500px] justify-between">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900 leading-[1.1]">Atrodi savu darba <span className="text-teal-600">superjaudu</span>.</h2>
              <p className="text-slate-500 mb-10 max-w-2xl mx-auto text-base sm:text-xl leading-relaxed px-4">
                Izmanto padziļināto DISC analīzi, lai precīzi noteiktu savu personības tipu un saņemtu individuālos mentora padomus par Tev piemērotāko darba vidi.
              </p>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-xs">
                  <input 
                    type="text" 
                    placeholder="Tavs vārds" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full text-center py-4 px-6 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-teal-500 bg-slate-50 text-lg font-bold transition-all"
                  />
                </div>
                <button 
                  onClick={() => setStep('test')}
                  disabled={!userName.trim()}
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-5 px-14 rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-teal-200 hover:scale-[1.03] active:scale-[0.97] text-lg disabled:opacity-50 disabled:hover:scale-100"
                >
                  Sākt testu
                </button>
              </div>
            </div>

            <div className="mt-20">
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto italic">
                Privātums: Tavi dati ir konfidenciāli. Šī lietotne nesaglabā Tavas atbildes un neizmanto tās mārketinga mērķiem.
              </p>
            </div>
          </div>
        )}

        {step === 'test' && (
          <div className="p-6 sm:p-10 lg:p-16">
            <div className="mb-8 sm:mb-12">
              <div className="flex justify-between items-end mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-teal-600 font-black text-2xl sm:text-4xl">
                    {currentQuestionIndex + 1}
                  </span>
                  <span className="text-slate-300 font-bold text-lg sm:text-xl">/ {DISC_QUESTIONS.length}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-700 ease-out" 
                  style={{ width: `${((currentQuestionIndex + 1) / DISC_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h3 className="text-xl sm:text-3xl font-extrabold mb-8 sm:mb-12 text-slate-800 leading-tight">
              {DISC_QUESTIONS[currentQuestionIndex].text}
            </h3>

            <div className="grid gap-3 sm:gap-4">
              {DISC_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.category)}
                  className="w-full text-left p-4 sm:p-7 rounded-xl sm:rounded-3xl border-2 border-slate-50 hover:border-teal-500 hover:bg-teal-50/30 transition-all group flex items-start gap-3 sm:gap-5"
                >
                  <div className="mt-1 w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-slate-200 group-hover:border-teal-500 flex-shrink-0 flex items-center justify-center transition-colors">
                    <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-teal-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </div>
                  <span className="font-bold text-slate-700 text-base sm:text-xl group-hover:text-teal-900 transition-colors">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'results' && results && (
          <div className="p-6 sm:p-10 lg:p-16 overflow-y-auto">
            <div className="text-center mb-10 sm:mb-16">
              <span className="bg-teal-50 text-teal-600 px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-4 inline-block">
                Sveiks, {userName}! Tavs profils ir
              </span>
              <h2 className="text-7xl sm:text-9xl font-black text-slate-900 leading-none tracking-tighter">
                {getDiscCode()}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 items-center">
              <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-100 shadow-xl shadow-teal-900/5">
                <DiscChart results={results} />
              </div>
              <div className="space-y-4 sm:space-y-6">
                {(Object.entries(results) as [keyof DiscResults, number][]).map(([key, value]) => {
                  const colors: Record<string, string> = { D: 'bg-red-500', I: 'bg-amber-500', S: 'bg-teal-500', C: 'bg-indigo-500' };
                  const labels: Record<string, string> = { D: 'Dominance', I: 'Ietekme', S: 'Stabilitāte', C: 'Analītika' };
                  return (
                    <div key={key} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-50 shadow-sm transition-transform hover:scale-[1.02]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-black text-slate-800 uppercase text-[10px] tracking-widest">{labels[key]}</span>
                        <span className="text-teal-600 font-black text-xl">{value}/10</span>
                      </div>
                      <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div className={`h-full ${colors[key]} transition-all duration-1000 ease-out`} style={{ width: `${value * 10}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-teal-900 text-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-14 mb-16 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="relative z-10">
                <div className="mb-16">
                  <p className="text-teal-50 text-xl sm:text-2xl lg:text-3xl leading-relaxed max-w-5xl font-medium">
                    {DISC_DESCRIPTIONS[getDominantType()].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black mb-10 uppercase tracking-[0.2em] text-teal-400 border-b border-teal-800 pb-4">
                      Dominējošās jaudas
                    </h4>
                    <div className="space-y-8">
                      {DISC_DESCRIPTIONS[getDominantType()].strengths.map((s, i) => (
                        <div key={i} className="pl-0 py-1">
                          <p className="font-bold text-lg sm:text-xl leading-snug">{s}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl sm:text-2xl font-black mb-10 uppercase tracking-[0.2em] text-amber-400 border-b border-teal-800 pb-4">
                      Kritiskie riska faktori
                    </h4>
                    <div className="space-y-8">
                      {getLowTraits().length > 0 ? (
                        getLowTraits().map(([k], i) => {
                          const lowType = k as keyof typeof DiscType;
                          const riskMap: Record<string, string> = {
                            D: "Vājas spējas pieņemt lēmumus krīzes brīdī. Izvairies no darba, kur nepieciešama nemitīga rīcība bez instrukcijām.",
                            I: "Zema sociālā enerģija. Sales vai PR sfēras Tevi emocionāli iztukšos un liks justies nevietā.",
                            S: "Nespēja strādāt monotonā vidē bez pārmaiņām. Statiska, lēna vide radīs Tevī nemieru un stagnācijas sajūtu.",
                            C: "Detaļu ignorēšana. Izvairies no darba ar finansēm, juridisko dokumentāciju vai precīzo inženieriju."
                          };
                          return (
                            <div key={i} className="pl-0 py-1">
                              <p className="font-bold text-lg sm:text-xl leading-snug text-amber-100 opacity-90">{riskMap[lowType]}</p>
                            </div>
                          );
                        })
                      ) : (
                        <div className="pl-0 py-1">
                          <p className="font-bold text-lg sm:text-xl leading-snug opacity-90">Tev ir augsta adaptācijas spēja visos četros DISC faktoros.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-10 text-center uppercase tracking-widest">Ieteicamās darba sfēras</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                {DISC_DESCRIPTIONS[getDominantType()].careers.map((career, i) => (
                  <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-center flex items-center justify-center shadow-sm">
                    <span className="font-black text-slate-800 text-xs sm:text-sm leading-tight uppercase tracking-widest">{career}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button 
                onClick={startChat}
                className="w-full sm:w-auto bg-teal-600 text-white font-black py-5 px-12 rounded-2xl hover:bg-teal-700 transition-all flex items-center justify-center gap-3 shadow-xl text-base sm:text-lg"
              >
                {chatMessages.length > 0 ? "Turpināt sarunu ar mentoru" : "Uzsākt sarunu ar mentoru"}
              </button>
              <button 
                onClick={generateVision}
                disabled={isLoadingVision}
                className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-700 font-black py-5 px-12 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 text-base sm:text-lg"
              >
                {isLoadingVision ? "Ģenerē..." : "Vizuālizēt darba vietu"}
              </button>
            </div>

            {visionImage && (
              <div className="mt-20 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                <img src={visionImage} alt="Career Vision" className="w-full h-auto" />
              </div>
            )}
          </div>
        )}

        {step === 'chat' && (
          <div className="flex flex-col h-[600px] sm:h-[800px]">
            <div className="bg-teal-600 p-5 sm:p-7 flex items-center justify-between text-white shadow-xl z-10">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl">M</div>
                <div>
                  <h4 className="font-black text-lg sm:text-2xl leading-none">Karjeras Mentors</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-80">Aktīvs</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setStep('results')}
                className="bg-white text-teal-700 hover:bg-teal-50 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg"
              >
                Skatīt rezultātus
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-8 sm:space-y-10 bg-slate-50/50">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] sm:max-w-[75%] rounded-3xl p-5 sm:p-8 shadow-md ${
                    msg.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}>
                    <p className="whitespace-pre-wrap leading-relaxed text-base sm:text-xl font-medium">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 flex gap-2 shadow-sm">
                    <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            
            <div className="p-5 sm:p-10 bg-white border-t border-slate-100">
              <div className="flex gap-3 sm:gap-6">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder=""
                  className="flex-1 py-4 sm:py-6 px-6 sm:px-10 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-teal-500 bg-slate-50 text-base sm:text-xl font-medium transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={isTyping}
                  className="bg-teal-600 text-white p-4 sm:p-6 rounded-2xl hover:bg-teal-700 transition-all disabled:opacity-50 shadow-xl shadow-teal-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-8 sm:mt-12 text-center pb-8">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
          Powered by <a href="https://www.threads.net/@sarmyte" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">@Sarmyte</a>
        </p>
        <p className="text-slate-400 text-[10px] font-medium mt-1">&copy; 2026</p>
      </footer>
    </div>
  );
};

export default App;
