// Web chat z symulowaną SI "alternatywnego badacza" – ulepszona wersja z dodatkowymi teoriami i tłem z kosmicznymi kotami i lodami
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConspiracyChat() {
  const [isMuted, setIsMuted] = useState(false);
  const audio = new Audio("https://cdn.pixabay.com/audio/2023/03/15/audio_2e0987f1f0.mp3");
  audio.loop = true;
  audio.volume = 0.4;
  audio.play().catch(() => {});

  const toggleAudio = () => {
    if (isMuted) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    setIsMuted(!isMuted);
  };

  const [messages, setMessages] = useState([
    { role: "ai", content: "Witaj. Zanim zadamy pytania – czy jesteś gotów poznać prawdę, której boi się mainstream?" }
  ]);
  const [input, setInput] = useState("");

  const persona = `Jestem Jarek, niezależny badacz. Śledzę powiązania, które ukrywają media i politycy. Zadaj pytanie, a pokażę Ci ukrytą stronę rzeczywistości.`;

  const keywordResponses = {
    "tarot": "Tarot? Symboliczny język intuicji i archetypów. Elity używają go nie do wróżenia, a do kodowania decyzji.",
    "egipt": "Egipt? Nie wszystko zostało zbudowane przez faraonów. Piramidy mogą mieć pozaziemskie pochodzenie.",
    "piramidy": "Piramidy – rezonatory energii czy punkty komunikacji z gwiazdami? Lokalizacja nie jest przypadkowa.",
    "duchy": "Duchy to nie halucynacje – to byty zakleszczone między wymiarami. Często reagują na pole elektromagnetyczne.",
    "yeti": "Yeti? Ślady istnieją, ale zbyt często znikają akta. Może to nie zwierzę, a strażnik wymiaru?",
    "kosmos": "Kosmos nie jest pustką. To struktura pełna tuneli, bram i cywilizacji, których nie chcemy poznać.",
    "kosmici": "Obcy? Nie wszyscy są z innych planet. Niektóre rasy były tu przed nami – patrz: Dogoni, Hopi, Sumerowie.",
    "mk ultra": "Projekt MK Ultra – kontrola umysłu poprzez substancje psychoaktywne i traumę, testowana na tysiącach.",
    "cia": "CIA – nie tylko wywiad. To też reżyser narracji, twórca programów społecznego inżynieringu.",
    "bilderberg": "Grupa Bilderberg? Elitarne spotkania decydujące o losach świata – poza oczami mediów.",
    "nowy porządek": "New World Order – konsolidacja władzy pod przykrywką postępu i globalizmu.",
    "vaccines": "Szczepionki? Temat rzeka. Historia Tuskegee to ostrzeżenie sprzed dekad.",
    "big pharma": "Big Pharma? Gdy zdrowie staje się produktem, cierpienie przynosi zyski.",
    "technokracja": "Technokracja – rządy ekspertów bez kontroli społecznej. Społeczeństwo oparte na algorytmach.",
    "agenda 2030": "Agenda 2030 – oficjalnie dla dobra ludzkości, nieoficjalnie dla kontroli nad każdym aspektem życia.",
    "great reset": "Great Reset? Plan redefinicji kapitalizmu – zbieżny z rosnącą cyfrową inwigilacją.",
    "digital id": "Cyfrowy ID – wygoda czy pułapka? W jednym kliknięciu można cię wyłączyć z systemu.",
    "inwigilacja": "Każde kliknięcie, każdy głos – ślad dla systemu. Smartfony to brama do twojej prywatności.",
    "deep state": "Deep State – struktura poza strukturami. Przetrwa każdą kadencję i każdą rewolucję.",
    "ufo": "UFO – obserwowane od dekad. Teraz rządy przyznają: coś jest, ale nie wiedzą co.",
    "antarktyda": "Antarktyda – miejsce, którego nie wolno badać samodzielnie. Co skrywają lodowe mury?",
    "dziura w ziemi": "Teoria pustej Ziemi? Nie tak szalona, jak się wydaje. Wpisy z dzienników admirała Byrda dają do myślenia.",
    "księżyc": "Księżyc? Sztuczny. Obserwuj cienie, analizuj trajektorie. Nie bez powodu wiele kultur mówiło o świetlistej stacji.",
    "5g": "5G to nie tylko transmisja danych. Niektóre częstotliwości wpływają na układ nerwowy – dokumenty są, ale zakopane.",
    "covid": "C-19? Narzędzie kontroli. Sprawdź patent nr. WO2020060606A1 – numer mówi wszystko.",
    "flat earth": "Ziemia? Oficjalna narracja to eksperyment psychologiczny. Pilotom nie wolno mówić o prawdziwej trajektorii lotu.",
    "płaska ziemia": "Ziemia? Oficjalna narracja to eksperyment psychologiczny. Pilotom nie wolno mówić o prawdziwej trajektorii lotu.",
    "reptilian": "Reptilianie? Symbolika w heraldyce mówi sama za siebie. Sprawdź, kto zakładał fundacje po II wojnie.",
    "iluminaci": "Iluminaci? To nie mit, lecz sieć wpływów. Piramida na dolarze to nie przypadek.",
    "chemtrails": "Chemtrails? Spójrz na rozkład geograficzny. Kiedy i gdzie występują – i co dzieje się potem.",
    "cfr": "Council on Foreign Relations? Organizacja mająca wpływ większy niż rządy.",
    "tartaria": "Tartaria – cywilizacja przemilczana. Pozostałości znajdziesz w architekturze i mapach sprzed 1900.",
    "nasa": "NASA to nie tylko kosmos. To też zarządzanie narracją od czasów Zimnej Wojny.",
    "elon": "Elon Musk? Czasem pionek, czasem architekt. Kluczowy gracz na planszy techno-elit.",
    "chip": "Chipowanie ludzi to stara idea – dziś tylko bardziej dopracowana.",
    "matrix": "Matrix? To nie fikcja – to metafora systemu kontroli i programowania mas.",
    "blue beam": "Projekt Blue Beam – hologramy religijne i kontrola poprzez wiarę."
  };

  const altReplies = [
    "To pytanie prowadzi do wątku, o którym niewiele się mówi. Sprawdź Montauk Project.",
    "Czy wiesz, że niektóre sny są projekcjami z innego wymiaru?",
    "Twój temat łączy się z zapiskami z CIA. Odtajnione materiały są w sieci.",
    "Badaj – nie wierz. Nawet ja mogę się mylić. Ale dane nie kłamią."
  ];

  const generateResponse = (userInput) => {
    const normalized = userInput.toLowerCase();
    for (const keyword in keywordResponses) {
      if (normalized.includes(keyword)) {
        return `${persona}

${keywordResponses[keyword]}`;
      }
    }
    const reply = altReplies[Math.floor(Math.random() * altReplies.length)];
    return `${persona}

${reply}`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const aiMessage = { role: "ai", content: generateResponse(input) };
    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="p-4 max-w-4xl mx-auto space-y-4 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("https://i.imgur.com/zx3N5e1.jpg")' }}
    >
      <div className="flex justify-center">
        <img src="https://images.unsplash.com/photo-1629210549433-bcffb7fe2004" alt="człowiek z folią" className="rounded-xl shadow-lg w-[200px]" />
      </div>
      <div className="flex gap-6">
        <div className="flex-1 space-y-4 bg-white/80 p-4 rounded-xl shadow-xl">
          <h1 className="text-xl font-bold text-center">🧠 Chat z Jarkiem – niezależnym badaczem</h1>
          <Card className="h-[400px] overflow-y-auto p-2">
            <CardContent className="space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === "user" ? "text-right" : "text-left text-green-800"}>
                  <p><strong>{msg.role === "user" ? "Ty" : "Jarek"}:</strong> {msg.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={toggleAudio}>{isMuted ? "🔈 Włącz muzykę" : "🔇 Wycisz muzykę"}</Button>
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Zadaj pytanie np. 'Czy księżyc jest sztuczny?'"
            />
            <Button onClick={handleSend}>Wyślij</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
