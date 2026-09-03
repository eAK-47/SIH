import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Mic, Send, Volume2, VolumeX } from 'lucide-react';
import { chatQuery } from '../lib/api';
import { recognitionLocale } from '../lib/i18n';
import { useAppStore } from '../store/useAppStore';

interface ChatMsg {
  role: 'user' | 'bot';
  text: string;
}

export function VoiceChatModal() {
  const { t, i18n } = useTranslation();
  const userLat = useAppStore((s: any) => s.userLat);
  const userLng = useAppStore((s: any) => s.userLng);

  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ role: 'bot', text: t('chat.botGreeting') }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceUnsupported, setVoiceUnsupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [micErr, setMicErr] = useState('');

  const recogRef = useRef<any>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  // auto-scroll to bottom on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, busy]);

  // stop any active speech/recognition when the panel closes
  useEffect(() => {
    if (!open) {
      recogRef.current?.abort?.();
      window.speechSynthesis?.cancel();
      setListening(false);
    }
  }, [open]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setMsgs(m => [...m, { role: 'user', text: trimmed }]);
    setInput('');
    setBusy(true);
    try {
      const res = await chatQuery({
        message: trimmed,
        userLat,
        userLng,
        language: i18n.language,
      });
      setMsgs(m => [...m, { role: 'bot', text: res.reply }]);
    } catch (e: any) {
      setMsgs(m => [...m, { role: 'bot', text: e?.message || 'Network error' }]);
    } finally {
      setBusy(false);
    }
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = recognitionLocale(i18n.language);
    utter.rate = 0.95;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const stopSpeak = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  };

  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setVoiceUnsupported(true);
      return;
    }
    setMicErr('');
    const recog = new SR();
    recog.lang = recognitionLocale(i18n.language);
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onresult = (e: any) => {
      const transcript = e.results?.[0]?.[0]?.transcript || '';
      if (transcript) setInput(transcript);
    };
    recog.onerror = (e: any) => {
      setMicErr(e?.error || 'voice_error');
    };
    recog.onend = () => setListening(false);
    recogRef.current = recog;
    setListening(true);
    recog.start();
  };

  const stopListening = () => {
    recogRef.current?.abort?.();
    setListening(false);
  };

  return (
    <>
      {/* Floating action button (bottom-right) */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={t('chat.title')}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:bg-brand-700 hover:shadow-xl"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
</button>

      {open && (
        <div className="fixed bottom-24 right-5 z-[90] flex w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <div>
              <h3 className="text-sm font-bold">{t('chat.title')}</h3>
              <p className="text-[10px] text-brand-100">
                {i18n.language.toUpperCase()} · {listening ? t('chat.listening') : 'Vallikavu Hub'}
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="close" className="rounded-full p-1 hover:bg-white/20">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex h-80 flex-col gap-2 overflow-y-auto bg-slate-50 p-3">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
                {m.role === 'user' ? (
                  <div className="rounded-2xl rounded-br-sm bg-brand-600 px-3 py-2 text-sm text-white">{m.text}</div>
                ) : (
                  <div className="flex items-start gap-1.5">
                    <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm text-slate-800 shadow-sm">
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                    <button
                      onClick={() => (speaking ? stopSpeak() : speak(m.text))}
                      aria-label="read aloud"
                      className="mt-1 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-brand-600"
                    >
                      {speaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {busy && (
              <div className="self-start rounded-2xl rounded-bl-sm bg-white px-3 py-2 shadow-sm">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-300" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-500" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input row */}
          <div className="border-t border-slate-100 p-3">
            {voiceUnsupported && <p className="mb-2 text-[11px] text-amber-600">{t('chat.notSupported')}</p>}
            {micErr && <p className="mb-2 text-[11px] text-rose-500">{micErr}</p>}
            <div className="flex items-center gap-2">
              <button
                onClick={listening ? stopListening : startListening}
                aria-label={t('chat.speak')}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                  listening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Mic className="h-5 w-5" />
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send(input)}
                placeholder={t('chat.placeholder')}
                className="h-10 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20"
              />
              <button
                onClick={() => send(input)}
                disabled={busy || !input.trim()}
                aria-label={t('chat.send')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
