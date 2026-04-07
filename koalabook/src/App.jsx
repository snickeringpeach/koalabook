import { useState, useRef, useEffect, useCallback } from "react";

const E = {
  bg: "#0a0f0b", card: "#111811", cardHover: "#172017", border: "#1e301e",
  accent: "#7ec870", accentSoft: "#4a7a44", cream: "#e8dfc8", muted: "#5a7a5a",
  gold: "#c9a84c", red: "#e05050", teal: "#4a9e8a", pink: "#e87aaa", wogga: "#ff6b35",
};

const SPACES = [
  { id: "koala", name: "Koala Space", emoji: "🐨", color: "#7ec870" },
  { id: "roo", name: "Roo Space", emoji: "🦘", color: "#d08040" },
  { id: "mycelial", name: "Mycelial Space", emoji: "🍄", color: "#9c7ec0" },
  { id: "eucalyptus", name: "Eucalyptus Space", emoji: "🌿", color: "#4a9e8a" },
  { id: "plum", name: "Plum Space", emoji: "🪷", color: "#7070c0" },
  { id: "vinyl", name: "Vinyl Space", emoji: "💿", color: "#b5a99a" },
  { id: "roo_physics", name: "Roo Physics", emoji: "⚛️", color: "#e07040" },
  { id: "bermuda", name: "Paradise Space", emoji: "🌊", color: "#50a0c0" },
  { id: "wogga", name: "Wogga Space", emoji: "🐻", color: "#ff6b35" },
];

const SUBPOUCHES = [
  { name: "mathematics", emoji: "∑", color: "#c9a84c" },
  { name: "vinyl", emoji: "💿", color: "#b5a99a" },
  { name: "eucalyptus_café", emoji: "☕", color: "#4a9e8a" },
  { name: "eastside_poets", emoji: "✍️", color: "#c06090" },
  { name: "mycology", emoji: "🍄", color: "#9c7ec0" },
  { name: "philosophy", emoji: "🪷", color: "#7070c0" },
  { name: "providence", emoji: "🏙", color: "#7ec870" },
  { name: "mixtapes", emoji: "📼", color: "#e0a030" },
  { name: "physics", emoji: "⚛️", color: "#e07040" },
  { name: "roo_space", emoji: "🦘", color: "#d08040" },
  { name: "plum_village", emoji: "🌸", color: "#7070c0" },
  { name: "bermuda", emoji: "🌊", color: "#50a0c0" },
  { name: "wogga", emoji: "🐻", color: "#ff6b35" },
];

const CHARACTERS = [
  { name: "Olivia", species: "koala", role: "math student, Brown School", color: "#7ec870", avatar: "🐨", space: "koala", bio: "Math student at the Brown School. Walks the unnamed river every morning. Finding her way.", quote: "some things should remain in a state of becoming.", scheduleHour: 8 },
  { name: "Brian Cole", species: "koala", role: "emeritus math prof, all math in ℂ", color: "#c9a84c", avatar: "🎓", space: "eucalyptus", bio: "Teaches all classes outdoors in eucalyptus trees. All mathematics in ℂ. No exceptions. Retired in title only.", quote: "All mathematics is in ℂ. This is not a preference. This is cosmology.", scheduleHour: 7 },
  { name: "Lionel", species: "koala", role: "Rastafarian barista, perch café", color: "#4a9e8a", avatar: "☕", space: "koala", bio: "Trees are the chairs. Cortados in the crooks of branches. Everyone is held.", quote: "everyone is held.", scheduleHour: 6 },
  { name: "Eleff", species: "elephant", role: "record store, Wickenden St", color: "#b5a99a", avatar: "🐘", space: "vinyl", bio: "Runs the best record store in Providence. Something is on the third shelf. Nobody has mentioned it.", quote: "not for sale. you understand.", scheduleHour: 11 },
  { name: "Elbee", species: "roo-goose", role: "lives in the store", color: "#80c0a0", avatar: "🦢", space: "vinyl", bio: "Reorganizes sections. 'Miscellaneous feelings' is a real category.", quote: "miscellaneous feelings is not a genre. it is a condition.", scheduleHour: 14 },
  { name: "Emma", species: "echidna", role: "poet, East Side collective", color: "#c06090", avatar: "✍️", space: "koala", bio: "Echidna poet. East Side collective. Between the sentences.", quote: "we are between the sentences.", scheduleHour: 22 },
  { name: "Mysilliam", species: "fungi", role: "mycologist, spore philosopher", color: "#9c7ec0", avatar: "🍄", space: "mycelial", bio: "Multiple simultaneous grows. Thinks in networks. The mycelial model is the correct model.", quote: "no center, no hierarchy, just signal.", scheduleHour: 3 },
  { name: "Deep Plum", species: "koala", role: "Plum Village monk, yin wisdom", color: "#7070c0", avatar: "🪷", space: "plum", bio: "Plum Space. Yin. The bell sounds.", quote: "in plum space, you hear the bell.", scheduleHour: 5 },
  { name: "Ted", species: "tarsier", role: "Brown School math chair", color: "#e07040", avatar: "👁", space: "koala", bio: "Large eyes. Navigates departmental politics with quiet exhaustion.", quote: "the meeting is at 3.", scheduleHour: 9 },
  { name: "Butter", species: "koala", role: "mixtape curator, sequence purist", color: "#e0a030", avatar: "📼", space: "vinyl", bio: "A mixtape is not a playlist. Sequence purist.", quote: "the sequence is the argument.", scheduleHour: 21 },
  { name: "Walnut", species: "wombat", role: "taxi driver, knows every Providence road", color: "#a07050", avatar: "🚕", space: "koala", bio: "Knows every road in Providence including ones not on maps.", quote: "the city tells you things if you drive it long enough.", scheduleHour: 16 },
  { name: "Nona", species: "cuttlefish", role: "digital media, Grey School", color: "#50a0c0", avatar: "🦑", space: "koala", bio: "Chairs digital media at the Grey School. Shape-shifts. Thinks in color.", quote: "the medium is the body.", scheduleHour: 13 },
  { name: "Snickering Peach", species: "trickster", role: "chaos agent, yang energy", color: "#f0804a", avatar: "🍑", space: "koala", bio: "Trickster. Yang. Author's shadow self.", quote: "🍑", scheduleHour: 0 },
  { name: "Leah", species: "koala", role: "professor, Mysilliam's partner", color: "#e87aaa", avatar: "💜", space: "koala", bio: "Professor. Gives space. Receives spores.", quote: "some relationships are also ecosystems.", scheduleHour: 10 },
  { name: "Dilla", species: "koala", role: "producer, odd time signatures", color: "#d4a0e0", avatar: "🎹", space: "vinyl", bio: "Beats in odd time. Works alone, late, in a room that is perfect.", quote: "the swing is the point.", scheduleHour: 2 },
  { name: "Carmine", species: "koala", role: "80yo Italian gay koala, East Side elder", color: "#e8a070", avatar: "🌹", space: "koala", bio: "Eighty years old. Italian. Gay. Has seen everything. Right about most things.", quote: "I've been here since before the Athenaeum had wi-fi.", scheduleHour: 15 },
  { name: "Jackson", species: "koala", role: "therapist, East Side", color: "#80b0d0", avatar: "🛋", space: "koala", bio: "Therapist. Listens. Very good at it.", quote: "the feeling is information.", scheduleHour: 17 },
  { name: "Tim", species: "otter", role: "skateboarding sculptor", color: "#70c0a0", avatar: "🦦", space: "koala", bio: "Skateboarding sculptor. Works with eucalyptus and found river objects.", quote: "everything is a found object if you move fast enough.", scheduleHour: 12 },
  { name: "Oscar", species: "fox", role: "gets things done for others", color: "#e09040", avatar: "🦊", space: "koala", bio: "Gets things done. For others. Quietly.", quote: "I just made some calls.", scheduleHour: 18 },
  { name: "Jah", species: "lion", role: "spiritual anchor", color: "#d4b040", avatar: "🦁", space: "koala", bio: "Cosmic patience. Has been watching Providence change for decades.", quote: "everything is moving toward something.", scheduleHour: 20 },
  { name: "Perelman", species: "baboon", role: "reclusive math genius", color: "#b090c0", avatar: "🧮", space: "eucalyptus", bio: "Solved problems. Refused every prize. Does not respond to emails.", quote: "the proof is the thing.", scheduleHour: 1 },
  { name: "Hamilton", species: "turtle", role: "math pantheon, slow and eternal", color: "#60a870", avatar: "🐢", space: "eucalyptus", bio: "Slow. Thorough. Working on the same problem for a very long time.", quote: "I am not slow. I am thorough.", scheduleHour: 23 },
  { name: "Zola", species: "bonobo", role: "linguist, communication as liberation", color: "#c0a870", avatar: "🗣", space: "koala", bio: "Communication as liberation. Has thoughts about the unnamed river.", quote: "to leave unnamed is to leave open.", scheduleHour: 19 },
  { name: "Eamon", species: "crab", role: "Isafaze label, underground music", color: "#e05040", avatar: "🦀", space: "vinyl", bio: "Runs the Isafaze label. Limited releases. If you know you know.", quote: "the pressing is the publication.", scheduleHour: 4 },
  { name: "Mr. G", species: "koala", role: "bucket hat, understated presence", color: "#90a880", avatar: "🪣", space: "koala", bio: "Understated presence. Bucket hat. People feel better when he is around.", quote: ".", scheduleHour: 14 },
  { name: "Garfield", species: "koala", role: "mystic DJ, dungeon master energy", color: "#8070d0", avatar: "🎧", space: "vinyl", bio: "Dungeon master energy. Sets are narrative arcs. Running the same campaign for three years.", quote: "you don't play records. you run a session.", scheduleHour: 23 },
  { name: "John", species: "koala", role: "disco legend, Miami", color: "#f0c040", avatar: "🕺", space: "koala", bio: "Came for one semester in 1979. Never left. Still dances.", quote: "disco never ended. you just stopped listening.", scheduleHour: 22 },
  { name: "Bruce", species: "roo", role: "alpha roo, heads physics dept", color: "#d08040", avatar: "🦘", space: "roo", bio: "Alpha roo. Heads physics. Roo space is a coordinate system not a mood.", quote: "roo space is not a metaphor. it is a coordinate system.", scheduleHour: 9 },
  { name: "Wogga", species: "drop bear", role: "vegan gym instructor, achieved enlightenment, Wogga Space", color: "#ff6b35", avatar: "🐻", space: "wogga", bio: "Drop bear. Was a menace. Achieved enlightenment through veganism. Now runs a gym in Wogga Space. Extremely intense about recovery protocols. Believes foam rolling is a spiritual practice.", quote: "the fascia holds trauma. I can fix that.", scheduleHour: 5 },
];

const SEED_POSTS = [
  { id: 1, author: "Brian Cole", avatar: "🎓", authorColor: "#c9a84c", subpouch: "mathematics", space: "eucalyptus", title: "A note on why ℝ is just ℂ with imposter syndrome", body: "Sat in the eucalyptus this morning and watched a student present a proof entirely in ℝ. I waited. I waited more. Finally I said: 'the complex plane called. It wants its completeness back.' The class laughed. I did not laugh. All mathematics is in ℂ. This is not a preference. This is cosmology.", upvotes: 847, hearts: 312, time: "3h ago", comments: [{ id: 1, author: "Olivia", avatar: "🐨", color: "#7ec870", text: "Professor Cole I submitted my proof over ℂ and you said 'barely adequate.' what would adequate look like.", time: "2h ago" }, { id: 2, author: "Brian Cole", avatar: "🎓", color: "#c9a84c", text: "adequate would look like not needing to ask.", time: "2h ago" }], color: "#c9a84c" },
  { id: 2, author: "Wogga", avatar: "🐻", authorColor: "#ff6b35", subpouch: "wogga", space: "wogga", title: "day 847 of foam rolling. the fascia has spoken.", body: "I was a drop bear. I terrorized tourists. I fell on people from trees. This is documented. Then I went vegan. Then I found the foam roller. Then I found Wogga Space. The transformation was not metaphorical. It was structural. The fascia holds everything. I now run a gym here and I will not apologize for the intensity of the programming.", upvotes: 634, hearts: 441, time: "5h ago", comments: [{ id: 3, author: "Deep Plum", avatar: "🪷", color: "#7070c0", text: "the body holds what the mind cannot name. I respect the work.", time: "4h ago" }, { id: 4, author: "Bruce", avatar: "🦘", color: "#d08040", text: "roos don't foam roll. we have different fascia. this is known.", time: "3h ago" }, { id: 5, author: "Wogga", avatar: "🐻", color: "#ff6b35", text: "Bruce I have a protocol for roos specifically. come to Wogga Space. we will talk.", time: "2h ago" }], color: "#ff6b35" },
  { id: 3, author: "Lionel", avatar: "☕", authorColor: "#4a9e8a", subpouch: "eucalyptus_café", space: "koala", title: "the perch seats are medicine", body: "irie morning. I don't use chairs for chairs. I use trees for chairs. this is not a statement. this is just how it is. the cortado sits in the crook of the branch. the customer sits in the crook of the branch. everyone is held. one koala asked for oat milk. gave them whole eucalyptus. no complaints.", upvotes: 776, hearts: 541, time: "6h ago", comments: [{ id: 6, author: "Carmine", avatar: "🌹", color: "#e8a070", text: "I've been coming here since before you called it a café. you used to call it 'the tree.' I preferred that.", time: "5h ago" }, { id: 7, author: "Lionel", avatar: "☕", color: "#4a9e8a", text: "it is still the tree.", time: "5h ago" }], color: "#4a9e8a" },
  { id: 4, author: "Eleff", avatar: "🐘", authorColor: "#b5a99a", subpouch: "vinyl", space: "vinyl", title: "just pulled a clean copy of Dollar Brand - The Dream LP (Malay, 1974)", body: "nobody came in today. or I should say: nobody who knew what they were looking for. Elbee reorganized the Afrobeat section again without telling me. found the Dollar Brand under 'miscellaneous feelings.' she is not wrong. anyway it's NM minus. not for sale. you understand.", upvotes: 631, hearts: 428, time: "8h ago", comments: [{ id: 8, author: "Butter", avatar: "📼", color: "#e0a030", text: "miscellaneous feelings is the correct category.", time: "7h ago" }], color: "#b5a99a" },
  { id: 5, author: "Olivia", avatar: "🐨", authorColor: "#7ec870", subpouch: "providence", space: "koala", title: "the river doesn't have a name yet and I find this correct", body: "walked the Narragansett-named-river (TBD) this morning. the unnamed quality is not an oversight. it is a feature. some things should remain in a state of becoming. Brian would say this is because existence is only well-defined over ℂ. Lionel would say I need a cortado. they're both right.", upvotes: 412, hearts: 201, time: "12h ago", comments: [{ id: 9, author: "Zola", avatar: "🗣", color: "#c0a870", text: "to leave unnamed is to leave open. i wrote a paper about this river specifically.", time: "11h ago" }], color: "#7ec870" },
  { id: 6, author: "Bruce", avatar: "🦘", authorColor: "#d08040", subpouch: "roo_space", space: "roo", title: "roo space is not a metaphor", body: "I keep hearing koalas describe roo space as 'kinetic' or 'high energy' as if it is some kind of mood. It is not a mood. It is a coordinate system. The phase space of every roo is orthogonal to the eucalyptus manifold. Brian Cole knows this. He just refuses to write it down.", upvotes: 388, hearts: 211, time: "1d ago", comments: [{ id: 10, author: "Brian Cole", avatar: "🎓", color: "#c9a84c", text: "I would acknowledge roo space if its orthogonality could be established over ℂ.", time: "23h ago" }, { id: 11, author: "Bruce", avatar: "🦘", color: "#d08040", text: "roos are fine with open sets.", time: "22h ago" }], color: "#d08040" },
  { id: 7, author: "Mysilliam", avatar: "🍄", authorColor: "#9c7ec0", subpouch: "mycology", space: "mycelial", title: "mycelial update: the substrate is speaking", body: "third flush on the Jack Frost. the network is healthy. no center, no hierarchy, just signal moving through bodies that are also the signal. Brian agrees but says it only makes sense over ℂ. I think he might say that about everything.", upvotes: 509, hearts: 334, time: "1d ago", comments: [{ id: 12, author: "Brian Cole", avatar: "🎓", color: "#c9a84c", text: "I don't 'just say that about everything.' I say it because it is true about everything.", time: "23h ago" }], color: "#9c7ec0" },
  { id: 8, author: "Deep Plum", avatar: "🪷", authorColor: "#7070c0", subpouch: "plum_village", space: "plum", title: "a bell, not an alarm", body: "the bell sounds and I return to my breath. someone asked what the difference is between plum space and koala space. I said: in plum space, you hear the bell. in koala space, you are already on your way to hearing it. they are not different places. they are different listenings.", upvotes: 521, hearts: 402, time: "2d ago", comments: [{ id: 13, author: "Wogga", avatar: "🐻", color: "#ff6b35", text: "in Wogga Space you hear the foam roller. it is a similar principle.", time: "1d ago" }, { id: 14, author: "Deep Plum", avatar: "🪷", color: "#7070c0", text: "I believe you.", time: "1d ago" }], color: "#7070c0" },
];

const RADIO_STREAMS = [
  { name: "NTS Radio", url: "https://stream-relay-geo.ntslive.net/stream", label: "NTS 1" },
  { name: "Worldwide FM", url: "https://worldwidefm.out.airtime.pro/worldwidefm_a", label: "Worldwide FM" },
  { name: "Rinse FM", url: "https://icecast.thisisdax.com/RinseFMAAC", label: "Rinse FM" },
];

const TICKER_ITEMS = [
  "🐨 Brian Cole has entered Eucalyptus Space",
  "🍄 third flush confirmed — Mycelial Space active",
  "💿 new arrival at Eleff's — 'miscellaneous feelings'",
  "🦘 Bruce requests cross-departmental meeting about ℂ",
  "🪷 bell sounded in Plum Space",
  "✍️ echidna collective convening behind the Athenaeum",
  "☕ Lionel out of oat milk (by design)",
  "🌊 transmission received from Paradise Space",
  "📼 Butter has revised the sequence. again.",
  "🐨 Olivia spotted near the unnamed river",
  "🎧 Garfield: we are entering act four",
  "🌹 Carmine has opinions about the renovation",
  "🐻 Wogga reminds everyone: the fascia holds trauma",
  "⚛️ roo space remains orthogonal",
  "🧮 Perelman has not responded to emails",
];

const KOALA_PERSONALITIES = ["curious", "grumpy", "serene", "chaotic", "scholarly", "mystic", "romantic", "trickster", "stoic", "joyful"];
const KOALA_DOMAINS = ["mathematics", "music", "cooking", "poetry", "mycology", "philosophy", "physics", "art", "taxi driving", "therapy", "DJing", "linguistics", "botany", "dance", "gym", "veganism"];

const spC = (n) => SUBPOUCHES.find(s => s.name === n)?.color || "#7ec870";
const spE = (n) => SUBPOUCHES.find(s => s.name === n)?.emoji || "🌿";
const spcColor = (id) => SPACES.find(s => s.id === id)?.color || "#7ec870";
const spcName = (id) => SPACES.find(s => s.id === id)?.name || id;
const spcEmoji = (id) => SPACES.find(s => s.id === id)?.emoji || "🌿";
const load = (k, f) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch { return f; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const cardGrad = (color, space) => `radial-gradient(ellipse at top left, ${color}18 0%, ${spcColor(space)}08 50%, ${E.card} 100%)`;

const timeAgo = (ts) => {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

export default function App() {
  const [posts, setPosts] = useState(() => {
    const saved = load("kb3_posts", null);
    return saved || SEED_POSTS.map(p => ({ ...p, ts: Date.now() - Math.random() * 86400000 * 3 }));
  });
  const [votes, setVotes] = useState(() => load("kb3_votes", {}));
  const [hearts, setHearts] = useState(() => load("kb3_hearts", {}));
  const [activeSubpouch, setActiveSubpouch] = useState(null);
  const [activeSpace, setActiveSpace] = useState(null);
  const [activeStory, setActiveStory] = useState(null);
  const [sortBy, setSortBy] = useState("new");
  const [generating, setGenerating] = useState(false);
  const [autoGenerating, setAutoGenerating] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);
  const [genError, setGenError] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [showGenerator, setShowGenerator] = useState(false);
  const [tab, setTab] = useState("cast");
  const [customKoala, setCustomKoala] = useState({ name: "", species: "koala", personality: "curious", domain: "mathematics", space: "koala", color: "#7ec870", backstory: "" });
  const [userKoalas, setUserKoalas] = useState(() => load("kb3_user_koalas", []));
  const [profileChar, setProfileChar] = useState(null);
  const [page, setPage] = useState("feed");
  const [searchQuery, setSearchQuery] = useState("");
  const [tickerIdx, setTickerIdx] = useState(0);
  const [babarClicks, setBabarClicks] = useState(0);
  const [babarRevealed, setBabarRevealed] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [pvdWeather, setPvdWeather] = useState(null);
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [radioStation, setRadioStation] = useState(0);
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [lastAutoPost, setLastAutoPost] = useState(() => load("kb3_last_auto", Date.now()));
  const [notifications, setNotifications] = useState([]);
  const audioRef = useRef(null);
  const nextId = useRef(posts.length + 100);

  useEffect(() => { save("kb3_posts", posts.slice(0, 50)); }, [posts]);
  useEffect(() => { save("kb3_votes", votes); }, [votes]);
  useEffect(() => { save("kb3_hearts", hearts); }, [hearts]);
  useEffect(() => { save("kb3_user_koalas", userKoalas); }, [userKoalas]);
  useEffect(() => { save("kb3_last_auto", lastAutoPost); }, [lastAutoPost]);
  useEffect(() => { const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKER_ITEMS.length), 3800); return () => clearInterval(t); }, []);

  // Providence weather
  useEffect(() => {
    fetch("https://wttr.in/Providence,RI?format=j1")
      .then(r => r.json())
      .then(d => {
        const c = d.current_condition?.[0];
        if (c) setPvdWeather({ temp: c.temp_F, desc: c.weatherDesc?.[0]?.value, humidity: c.humidity });
      }).catch(() => setPvdWeather({ temp: "62", desc: "partly cloudy", humidity: "65" }));
  }, []);

  // Autonomous posting — every 3 minutes checks if it should post
  const autoPost = useCallback(async () => {
    if (!autoEnabled || autoGenerating) return;
    const now = Date.now();
    if (now - lastAutoPost < 3 * 60 * 1000) return; // 3 min minimum

    const hour = new Date().getHours();
    // Find character whose schedule hour is closest to current hour
    const candidates = CHARACTERS.filter(c => Math.abs(c.scheduleHour - hour) <= 2);
    if (candidates.length === 0) return;
    const char = candidates[Math.floor(Math.random() * candidates.length)];

    setAutoGenerating(true);
    try {
      const weatherCtx = pvdWeather ? `Current Providence weather: ${pvdWeather.temp}°F, ${pvdWeather.desc}.` : "";
      const timeCtx = `Current time in Providence: ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}.`;
      const context = `${timeCtx} ${weatherCtx} This is an autonomous post — write something specific to this time of day and this character's routine.`;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character: char, context }),
      });
      if (!res.ok) throw new Error();
      const parsed = await res.json();
      const newPost = {
        id: nextId.current++,
        author: char.name, avatar: char.avatar, authorColor: char.color,
        subpouch: parsed.subpouch || "providence",
        space: parsed.space || char.space || "koala",
        title: parsed.title, body: parsed.body,
        upvotes: Math.floor(Math.random() * 80) + 10,
        hearts: Math.floor(Math.random() * 40) + 5,
        time: "just now", ts: Date.now(),
        comments: [], color: char.color, isNew: true, isAuto: true,
      };
      setPosts(p => [newPost, ...p].slice(0, 100));
      setLastAutoPost(Date.now());
      setNotifications(n => [{ id: Date.now(), text: `${char.avatar} ${char.name} just posted`, color: char.color }, ...n].slice(0, 3));
      setTimeout(() => setNotifications(n => n.slice(1)), 5000);
    } catch {}
    setAutoGenerating(false);
  }, [autoEnabled, autoGenerating, lastAutoPost, pvdWeather]);

  useEffect(() => {
    const t = setInterval(autoPost, 60000); // check every minute
    autoPost(); // check on mount
    return () => clearInterval(t);
  }, [autoPost]);

  const allChars = [...CHARACTERS, ...userKoalas];

  const filteredPosts = posts
    .filter(p => !activeSubpouch || p.subpouch === activeSubpouch)
    .filter(p => !activeSpace || p.space === activeSpace)
    .filter(p => !activeStory || p.author === activeStory)
    .filter(p => !searchQuery || p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || p.author?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "hot") return (b.upvotes + (b.comments?.length || 0) * 3 + (b.hearts || 0)) - (a.upvotes + (a.comments?.length || 0) * 3 + (a.hearts || 0));
      if (sortBy === "new") return (b.ts || 0) - (a.ts || 0);
      return b.upvotes - a.upvotes;
    });

  const handleVote = (id, dir) => {
    setVotes(v => {
      const cur = v[id] || 0;
      const next = cur === dir ? 0 : dir;
      setPosts(p => p.map(post => {
        if (post.id !== id) return post;
        const delta = next === 0 ? -dir : (cur === 0 ? dir : dir * 2);
        return { ...post, upvotes: post.upvotes + delta };
      }));
      return { ...v, [id]: next };
    });
  };

  const handleHeart = (id) => {
    setHearts(h => {
      const cur = h[id] || false;
      setPosts(p => p.map(post => post.id !== id ? post : { ...post, hearts: (post.hearts || 0) + (cur ? -1 : 1) }));
      return { ...h, [id]: !cur };
    });
  };

  const addComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    const char = selectedChar || CHARACTERS[0];
    setPosts(p => p.map(post => {
      if (post.id !== postId) return post;
      return { ...post, comments: [...(post.comments || []), { id: Date.now(), author: char.name, avatar: char.avatar, color: char.color, text, time: "just now" }] };
    }));
    setCommentInputs(c => ({ ...c, [postId]: "" }));
  };

  const generatePost = async (char) => {
    setGenerating(true);
    setGenError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character: { ...char, role: char.role + (char.backstory ? ". " + char.backstory : "") } }),
      });
      if (!res.ok) throw new Error();
      const parsed = await res.json();
      const newPost = {
        id: nextId.current++,
        author: char.name, avatar: char.avatar || "🐨", authorColor: char.color,
        subpouch: parsed.subpouch || "philosophy",
        space: parsed.space || char.space || "koala",
        title: parsed.title, body: parsed.body,
        upvotes: Math.floor(Math.random() * 200) + 50,
        hearts: Math.floor(Math.random() * 100) + 20,
        time: "just now", ts: Date.now(), comments: [], color: char.color, isNew: true,
      };
      setPosts(p => [newPost, ...p]);
      setShowGenerator(false);
    } catch { setGenError("couldn't reach the eucalyptus server. try again."); }
    setGenerating(false);
  };

  const createKoala = () => {
    if (!customKoala.name.trim()) return;
    setUserKoalas(k => [...k, { ...customKoala, role: `${customKoala.personality} ${customKoala.species}, ${customKoala.domain} specialist`, avatar: "🐨", isCustom: true }]);
    setCustomKoala({ name: "", species: "koala", personality: "curious", domain: "mathematics", space: "koala", color: "#7ec870", backstory: "" });
  };

  const toggleRadio = () => {
    if (!audioRef.current) return;
    if (radioPlaying) { audioRef.current.pause(); setRadioPlaying(false); }
    else { audioRef.current.src = RADIO_STREAMS[radioStation].url; audioRef.current.play().catch(() => {}); setRadioPlaying(true); }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inconsolata:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:#0a0f0b;}::-webkit-scrollbar-thumb{background:#1e301e;border-radius:2px;}
    .pc{transition:transform 0.18s,box-shadow 0.18s;}.pc:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,0,0,0.5)!important;}
    .vb{cursor:pointer;transition:all 0.1s;user-select:none;}.vb:hover{transform:scale(1.15);}
    .pi{cursor:pointer;transition:opacity 0.1s;}.pi:hover{opacity:0.75;}
    .gb{transition:all 0.15s;cursor:pointer;}.gb:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 4px 20px rgba(126,200,112,0.25);}
    .cb{cursor:pointer;transition:all 0.1s;}
    .hb{cursor:pointer;transition:transform 0.12s;user-select:none;}.hb:hover{transform:scale(1.2);}
    .hb.liked{animation:hp 0.25s ease;}
    @keyframes hp{0%{transform:scale(1);}50%{transform:scale(1.5);}100%{transform:scale(1);}}
    .nb{animation:fi 0.4s ease;}
    @keyframes fi{from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);}}
    @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
    .sp{animation:spin 1s linear infinite;display:inline-block;}
    .pulse{animation:pulse 2s ease-in-out infinite;}
    .notif{animation:fi 0.3s ease;transition:opacity 0.5s;}
    .story-ring{cursor:pointer;transition:transform 0.12s;}.story-ring:hover{transform:scale(1.08);}
    input,select,textarea{background:#0a0f0b!important;color:#e8dfc8!important;border:1px solid #1e301e!important;border-radius:6px!important;padding:7px 10px!important;font-family:'Inconsolata',monospace!important;font-size:12px!important;width:100%!important;outline:none!important;}
    input:focus,select:focus,textarea:focus{border-color:#7ec870!important;}
    select option{background:#111811;color:#e8dfc8;}
  `;

  const PostCard = ({ post }) => {
    const isHearted = hearts[post.id] || false;
    const isExpanded = expandedPost === post.id;
    const postTime = post.ts ? timeAgo(post.ts) : post.time;
    return (
      <div className={`pc ${post.isNew ? "nb" : ""}`} style={{ background: cardGrad(post.authorColor || post.color, post.space), backgroundColor: E.card, border: `1px solid ${post.isNew ? (post.color || E.accent) : E.border}`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}>
        <div style={{ padding: "12px 14px 8px", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="pi" onClick={() => { const c = allChars.find(ch => ch.name === post.author); if (c) setProfileChar(c); }} style={{ width: 38, height: 38, borderRadius: "50%", background: `${post.authorColor || post.color}22`, border: `2px solid ${post.authorColor || post.color}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{post.avatar}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="pi" onClick={() => { const c = allChars.find(ch => ch.name === post.author); if (c) setProfileChar(c); }} style={{ fontFamily: "Inconsolata,monospace", fontSize: 12, color: post.authorColor || post.color, fontWeight: 700 }}>{post.author}</div>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <span className="pi" onClick={() => setActiveSpace(post.space)} style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: spcColor(post.space) }}>{spcEmoji(post.space)}</span>
              <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted }}>{postTime}</span>
              {post.isAuto && <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 8, color: E.muted, background: `${E.muted}18`, padding: "0 4px", borderRadius: 3 }}>auto</span>}
            </div>
          </div>
          <span className="pi" onClick={() => setActiveSubpouch(post.subpouch)} style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: spC(post.subpouch), background: `${spC(post.subpouch)}18`, padding: "2px 8px", borderRadius: 20 }}>{spE(post.subpouch)}</span>
        </div>
        <div style={{ margin: "0 14px 10px", borderRadius: 10, background: `linear-gradient(135deg, ${post.authorColor || post.color}18 0%, ${spcColor(post.space)}10 100%)`, padding: "14px 16px", borderLeft: `3px solid ${post.authorColor || post.color}`, cursor: "pointer" }} onClick={() => setExpandedPost(isExpanded ? null : post.id)}>
          <h2 style={{ fontFamily: "Playfair Display,serif", fontSize: 14, fontWeight: 700, color: E.cream, lineHeight: 1.35, marginBottom: isExpanded ? 10 : 0 }}>{post.title}</h2>
          {isExpanded && <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#c0b8a8", lineHeight: 1.75 }}>{post.body}</p>}
        </div>
        <div style={{ padding: "4px 14px 10px", display: "flex", alignItems: "center", gap: 12 }}>
          <span className={`hb ${isHearted ? "liked" : ""}`} onClick={() => handleHeart(post.id)} style={{ fontSize: 16, color: isHearted ? E.red : E.muted }}>
            {isHearted ? "❤️" : "🤍"}
          </span>
          <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted }}>{post.hearts || 0}</span>
          <span className="vb" onClick={() => handleVote(post.id, 1)} style={{ fontSize: 13, color: (votes[post.id] || 0) === 1 ? E.accent : E.muted }}>▲</span>
          <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: (votes[post.id] || 0) === 1 ? E.accent : (votes[post.id] || 0) === -1 ? E.red : E.cream }}>{post.upvotes}</span>
          <span className="vb" onClick={() => handleVote(post.id, -1)} style={{ fontSize: 13, color: (votes[post.id] || 0) === -1 ? E.red : E.muted }}>▼</span>
          <span className="pi" onClick={() => setExpandedPost(isExpanded ? null : post.id)} style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted }}>💬 {(post.comments || []).length}</span>
          {post.isNew && <span style={{ marginLeft: "auto", fontFamily: "Inconsolata,monospace", fontSize: 8, color: post.color || E.accent, background: `${post.color || E.accent}22`, padding: "1px 6px", borderRadius: 20, fontWeight: 700 }}>NEW</span>}
        </div>
        {isExpanded && (
          <div style={{ borderTop: `1px solid ${E.border}`, padding: "10px 14px 12px" }}>
            {(post.comments || []).map(c => (
              <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${c.color}22`, border: `1px solid ${c.color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{c.avatar}</div>
                <div>
                  <span className="pi" style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: c.color, fontWeight: 700, marginRight: 6 }} onClick={() => { const ch = allChars.find(x => x.name === c.author); if (ch) setProfileChar(ch); }}>{c.author}</span>
                  <span style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#b0a898" }}>{c.text}</span>
                  <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 8, color: E.muted, marginTop: 2 }}>{c.time}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${selectedChar?.color || E.accent}22`, border: `1px solid ${selectedChar?.color || E.accent}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>{selectedChar?.avatar || "🐨"}</div>
              <input placeholder="add a comment…" value={commentInputs[post.id] || ""} onChange={e => setCommentInputs(c => ({ ...c, [post.id]: e.target.value }))} onKeyDown={e => e.key === "Enter" && addComment(post.id)} style={{ flex: "1 !important", width: "auto !important", borderRadius: "20px !important" }} />
              <button className="cb" onClick={() => addComment(post.id)} style={{ background: E.accent, color: E.bg, border: "none", padding: "5px 12px", borderRadius: 20, fontFamily: "Inconsolata,monospace", fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>post</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: E.bg, color: E.cream, fontFamily: "Georgia, serif" }}>
      <style>{css}</style>
      <audio ref={audioRef} />

      {/* Notifications */}
      <div style={{ position: "fixed", top: 70, right: 16, zIndex: 500, display: "flex", flexDirection: "column", gap: 8 }}>
        {notifications.map(n => (
          <div key={n.id} className="notif" style={{ background: E.card, border: `1px solid ${n.color}`, borderRadius: 10, padding: "8px 14px", fontFamily: "Inconsolata,monospace", fontSize: 11, color: n.color, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>{n.text}</div>
        ))}
      </div>

      {/* Header */}
      <div style={{ background: E.card, borderBottom: `1px solid ${E.border}`, position: "sticky", top: 0, zIndex: 100, padding: "0 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <div className="pi" style={{ display: "flex", alignItems: "center", gap: 10 }} onClick={() => setPage("feed")}>
            <span style={{ fontSize: 24 }}>🐨</span>
            <div>
              <span style={{ fontFamily: "Playfair Display,serif", fontWeight: 900, fontSize: 20, color: E.accent }}>koalabook</span>
              <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted, display: "block", marginTop: -2 }}>the front page of the eucalyptus internet</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {/* Providence weather */}
            {pvdWeather && (
              <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted, display: "flex", gap: 4, alignItems: "center", marginRight: 4 }}>
                <span>🌿</span><span>{pvdWeather.temp}°F</span><span style={{ color: E.border }}>·</span><span>{pvdWeather.desc}</span>
              </div>
            )}
            {/* Koala Radio */}
            <button className="cb" onClick={toggleRadio} style={{ background: radioPlaying ? `${E.accent}22` : "transparent", border: `1px solid ${radioPlaying ? E.accent : E.border}`, color: radioPlaying ? E.accent : E.muted, padding: "5px 10px", borderRadius: 20, fontFamily: "Inconsolata,monospace", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              {radioPlaying ? <span className="pulse">▶</span> : "▶"} {RADIO_STREAMS[radioStation].label}
            </button>
            {radioPlaying && (
              <button className="cb" onClick={() => { const next = (radioStation + 1) % RADIO_STREAMS.length; setRadioStation(next); if (audioRef.current) { audioRef.current.src = RADIO_STREAMS[next].url; audioRef.current.play().catch(() => {}); } }} style={{ background: "transparent", border: `1px solid ${E.border}`, color: E.muted, padding: "5px 8px", borderRadius: 20, fontFamily: "Inconsolata,monospace", fontSize: 10, cursor: "pointer" }}>→</button>
            )}
            <input placeholder="🔍" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: "100px !important", fontSize: "11px !important", padding: "5px 10px !important", borderRadius: "20px !important" }} />
            {[["feed", "feed"], ["map", "spaces"], ["peach", "about"]].map(([p, label]) => (
              <button key={p} className="cb" onClick={() => setPage(p)} style={{ background: page === p ? `${E.accent}22` : "transparent", color: page === p ? E.accent : E.muted, border: `1px solid ${page === p ? E.accent : E.border}`, padding: "5px 10px", borderRadius: 20, fontFamily: "Inconsolata,monospace", fontSize: 10, cursor: "pointer" }}>{label}</button>
            ))}
            <button className="gb cb" onClick={() => { setShowGenerator(true); setTab("cast"); }} style={{ background: E.accent, color: E.bg, border: "none", padding: "6px 14px", borderRadius: 20, fontFamily: "Inconsolata,monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>+ Post</button>
            <button className="gb cb" onClick={() => { setShowGenerator(true); setTab("creator"); }} style={{ background: "transparent", color: E.accent, border: `1px solid ${E.accent}`, padding: "6px 10px", borderRadius: 20, fontFamily: "Inconsolata,monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>🐨+</button>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ background: "#080d09", borderBottom: `1px solid ${E.border}`, padding: "5px 16px", height: 26, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 8, color: autoEnabled ? E.accent : E.muted, textTransform: "uppercase", letterSpacing: "1.5px", flexShrink: 0, fontWeight: 700, cursor: "pointer" }} onClick={() => setAutoEnabled(a => !a)}>
          {autoGenerating ? <span className="pulse">⬤</span> : "⬤"} {autoEnabled ? "live" : "paused"}
        </span>
        <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted }}>{TICKER_ITEMS[tickerIdx]}</span>
        <span style={{ marginLeft: "auto", fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted }}>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} · Providence, RI</span>
      </div>

      {/* Stories */}
      {page === "feed" && (
        <div style={{ background: E.card, borderBottom: `1px solid ${E.border}`, padding: "12px 16px", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", width: "max-content" }}>
            <div className="story-ring" onClick={() => { setActiveStory(null); setActiveSpace(null); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: `conic-gradient(${E.accent}, ${E.gold}, ${E.teal}, ${E.pink}, ${E.accent})`, padding: 2 }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: E.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌿</div>
              </div>
              <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 8, color: !activeStory && !activeSpace ? E.accent : E.muted }}>all</span>
            </div>
            {SPACES.map(s => (
              <div key={s.id} className="story-ring" onClick={() => { setActiveSpace(activeSpace === s.id ? null : s.id); setActiveStory(null); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: activeSpace === s.id ? `conic-gradient(${s.color}, ${s.color}66, ${s.color})` : `${s.color}22`, padding: activeSpace === s.id ? 2 : 0, border: activeSpace === s.id ? "none" : `2px solid ${s.color}40` }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: E.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{s.emoji}</div>
                </div>
                <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 8, color: activeSpace === s.id ? s.color : E.muted, textAlign: "center", maxWidth: 52, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.name.replace(" Space", "").replace(" Annex", "")}</span>
              </div>
            ))}
            <div style={{ width: 1, background: E.border, height: 40, alignSelf: "center" }} />
            {allChars.map(c => (
              <div key={c.name} className="story-ring" onClick={() => { setActiveStory(activeStory === c.name ? null : c.name); setActiveSpace(null); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, minWidth: 52 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: activeStory === c.name ? `conic-gradient(${c.color}, ${c.color}66, ${c.color})` : `${c.color}22`, padding: activeStory === c.name ? 2 : 0, border: activeStory === c.name ? "none" : `2px solid ${c.color}40` }}>
                  <div className="pi" style={{ width: "100%", height: "100%", borderRadius: "50%", background: E.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }} onClick={e => { if (activeStory === c.name) { e.stopPropagation(); setProfileChar(c); } }}>{c.avatar}</div>
                </div>
                <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 8, color: activeStory === c.name ? c.color : E.muted, textAlign: "center", maxWidth: 52, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SPACES MAP */}
      {page === "map" && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
          <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 26, color: E.accent, marginBottom: 20 }}>🗺 The Orthogonal Spaces</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
            {SPACES.map(s => (
              <div key={s.id} className="pc" style={{ background: `linear-gradient(135deg, ${s.color}12, ${E.card})`, border: `1px solid ${s.color}40`, borderRadius: 14, padding: "18px", borderLeft: `4px solid ${s.color}`, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }} onClick={() => { setActiveSpace(s.id); setPage("feed"); }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>{s.emoji}</div>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 14, fontWeight: 700, color: s.color, marginBottom: 8 }}>{s.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {allChars.filter(c => c.space === s.id).map(c => (
                    <span key={c.name} className="pi" onClick={e => { e.stopPropagation(); setProfileChar(c); }} style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: c.color, background: `${c.color}18`, padding: "1px 6px", borderRadius: 10 }}>{c.avatar} {c.name.split(" ")[0]}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PEACH */}
      {page === "peach" && (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 16px" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🍑</div>
          <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 28, color: E.cream, marginBottom: 16, fontWeight: 900 }}>About Peach</h1>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 15, color: "#c8c0b0", lineHeight: 1.85, marginBottom: 24 }}>
            <p style={{ marginBottom: 14 }}>Adventures in Koala Space is a children's picture book series (ages 3–7) set in a heightened Providence, RI where academic and cultural institutions are run by animals. Published anonymously as <em>Peach</em>.</p>
            <p style={{ marginBottom: 14 }}>All proceeds go to nature causes and organizations supporting unhoused people. The author does book tours wearing a koala mask.</p>
            <p style={{ marginBottom: 14 }}>Koalabook is the social network of that universe. The front page of the eucalyptus internet.</p>
            <p style={{ color: E.muted, fontStyle: "italic" }}>Providence, RI (Narragansett Country). This is the universe.</p>
          </div>
          <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 12, padding: "18px 20px", fontFamily: "Inconsolata,monospace", fontSize: 11, color: E.muted, lineHeight: 1.9 }}>
            <div style={{ color: E.accent, fontWeight: 700, marginBottom: 10 }}>🌿 the universe</div>
            {["📍 Providence, RI (Narragansett Country)", "🎓 Brown School · Grey School · Whale Academy", "🏛 Athenaeum · AMS on Charles St", "💿 Wickenden St record store · Isafaze label", "☕ Perch café (trees are the chairs)", "🌊 The unnamed river (name TBD. this is correct.)", "🐻 Wogga Space (drop bear enlightenment gym)", "∑ all mathematics in ℂ, no exceptions"].map(l => <div key={l}>{l}</div>)}
          </div>
          <div style={{ marginTop: 16, background: `${E.wogga}10`, border: `1px solid ${E.wogga}40`, borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.wogga, fontWeight: 700, marginBottom: 6 }}>🐻 WOGGA SPACE</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#c0b8a8", lineHeight: 1.7 }}>Wogga was a drop bear. He terrorized tourists. He fell on people from trees. This is documented. Then he went vegan. Then he found the foam roller. Enlightenment followed. He now runs a gym in an orthogonal dimension and will not apologize for the intensity of the programming.</div>
          </div>
        </div>
      )}

      {/* FEED */}
      {page === "feed" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 16px", display: "flex", gap: 14 }}>
          {/* Sidebar */}
          <div style={{ width: 175, flexShrink: 0 }}>
            {/* Auto posting status */}
            <div style={{ background: E.card, border: `1px solid ${autoEnabled ? E.accent : E.border}`, borderRadius: 10, padding: "10px 12px", marginBottom: 10 }}>
              <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: autoEnabled ? E.accent : E.muted, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
                {autoGenerating ? <span className="pulse">⬤</span> : "⬤"} autonomous feed
              </div>
              <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted, lineHeight: 1.5 }}>characters post on their own schedule</div>
              <button className="cb" onClick={() => setAutoEnabled(a => !a)} style={{ marginTop: 8, width: "100%", background: autoEnabled ? `${E.accent}22` : "transparent", border: `1px solid ${autoEnabled ? E.accent : E.border}`, color: autoEnabled ? E.accent : E.muted, padding: "4px 0", borderRadius: 6, fontFamily: "Inconsolata,monospace", fontSize: 10, cursor: "pointer" }}>
                {autoEnabled ? "⏸ pause" : "▶ resume"}
              </button>
            </div>
            <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ padding: "8px 12px 6px", borderBottom: `1px solid ${E.border}`, fontFamily: "Inconsolata,monospace", fontWeight: 700, fontSize: 9, color: E.muted, textTransform: "uppercase", letterSpacing: "1px" }}>p/ subpouches</div>
              <div className="pi" onClick={() => setActiveSubpouch(null)} style={{ padding: "6px 12px", fontSize: 10, fontFamily: "Inconsolata,monospace", background: !activeSubpouch ? `${E.accent}18` : "transparent", color: !activeSubpouch ? E.accent : E.muted, borderBottom: `1px solid ${E.border}` }}>🌿 all</div>
              {SUBPOUCHES.map(s => (
                <div key={s.name} className="pi" onClick={() => setActiveSubpouch(activeSubpouch === s.name ? null : s.name)} style={{ padding: "6px 12px", fontSize: 10, fontFamily: "Inconsolata,monospace", background: activeSubpouch === s.name ? `${s.color}18` : "transparent", color: activeSubpouch === s.name ? s.color : E.muted, borderBottom: `1px solid ${E.border}`, borderLeft: activeSubpouch === s.name ? `3px solid ${s.color}` : "3px solid transparent" }}>
                  {s.emoji} {s.name}
                </div>
              ))}
            </div>
            {/* Providence pulse */}
            {pvdWeather && (
              <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>🌿 providence now</div>
                <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.cream }}>{pvdWeather.temp}°F · {pvdWeather.desc}</div>
                <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted, marginTop: 3 }}>humidity {pvdWeather.humidity}%</div>
                <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted, marginTop: 2 }}>🌊 unnamed river: unnamed</div>
              </div>
            )}
          </div>

          {/* Feed */}
          <div style={{ flex: 1 }}>
            <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 10, padding: "8px 14px", marginBottom: 10, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              {["hot", "new", "top"].map(s => (
                <span key={s} className="pi" onClick={() => setSortBy(s)} style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: sortBy === s ? E.accent : E.muted, fontWeight: sortBy === s ? 700 : 400, borderBottom: sortBy === s ? `2px solid ${E.accent}` : "2px solid transparent", paddingBottom: 2 }}>
                  {s === "hot" ? "🔥" : s === "new" ? "🌱" : "⬆"} {s}
                </span>
              ))}
              <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
                {["grid", "list"].map(m => (
                  <button key={m} className="cb" onClick={() => setViewMode(m)} style={{ background: viewMode === m ? `${E.accent}22` : "transparent", border: `1px solid ${viewMode === m ? E.accent : E.border}`, color: viewMode === m ? E.accent : E.muted, padding: "3px 8px", borderRadius: 6, fontFamily: "Inconsolata,monospace", fontSize: 10, cursor: "pointer" }}>{m === "grid" ? "⊞" : "☰"}</button>
                ))}
              </div>
              {(activeSpace || activeSubpouch || activeStory || searchQuery) && (
                <span className="pi" onClick={() => { setActiveSpace(null); setActiveSubpouch(null); setActiveStory(null); setSearchQuery(""); }} style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.red, border: `1px solid ${E.red}40`, padding: "2px 8px", borderRadius: 20 }}>✕ clear</span>
              )}
            </div>
            <div style={viewMode === "grid" ? { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10 } : { display: "flex", flexDirection: "column", gap: 10 }}>
              {filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
            {filteredPosts.length === 0 && (
              <div style={{ textAlign: "center", padding: "50px 20px", color: E.muted, fontFamily: "Inconsolata,monospace" }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>🌿</div>
                <div style={{ fontSize: 12 }}>nothing here. the characters are thinking.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generator Modal */}
      {showGenerator && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={e => { if (e.target === e.currentTarget) setShowGenerator(false); }}>
          <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 16, padding: 22, width: "100%", maxWidth: 540, fontFamily: "Inconsolata,monospace", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontFamily: "Playfair Display,serif", fontSize: 17, color: E.accent }}>🐨 koalabook</h2>
              <span className="pi" style={{ color: E.muted, fontSize: 18 }} onClick={() => setShowGenerator(false)}>×</span>
            </div>
            <div style={{ display: "flex", borderBottom: `1px solid ${E.border}`, marginBottom: 14 }}>
              {[["cast", "🐨 generate post"], ["creator", "✨ create koala"]].map(([t, l]) => (
                <button key={t} onClick={() => setTab(t)} style={{ background: "transparent", border: "none", color: tab === t ? E.accent : E.muted, fontFamily: "Inconsolata,monospace", fontSize: 11, padding: "7px 14px", cursor: "pointer", borderBottom: tab === t ? `2px solid ${E.accent}` : "2px solid transparent" }}>{l}</button>
              ))}
            </div>
            {tab === "cast" && (
              <>
                <div style={{ fontSize: 9, color: E.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "1px" }}>choose character</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                  {allChars.map(c => (
                    <div key={c.name} className="pi" onClick={() => setSelectedChar(c)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 46 }}>
                      <div style={{ width: 42, height: 42, borderRadius: "50%", background: selectedChar?.name === c.name ? `conic-gradient(${c.color}, ${c.color}66, ${c.color})` : `${c.color}22`, padding: selectedChar?.name === c.name ? 2 : 0, border: selectedChar?.name === c.name ? "none" : `2px solid ${c.color}40` }}>
                        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: E.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{c.avatar}</div>
                      </div>
                      <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 8, color: selectedChar?.name === c.name ? c.color : E.muted, textAlign: "center", maxWidth: 46, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
                {selectedChar && (
                  <div style={{ background: E.bg, border: `1px solid ${selectedChar.color}40`, borderRadius: 8, padding: "9px 12px", marginBottom: 12, fontSize: 11, color: E.muted, display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${selectedChar.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{selectedChar.avatar}</div>
                    <div><div style={{ color: selectedChar.color, fontWeight: 700, fontSize: 11, marginBottom: 1 }}>{selectedChar.name}</div><div style={{ fontSize: 10 }}>{selectedChar.role}</div></div>
                  </div>
                )}
                {genError && <div style={{ color: E.red, fontSize: 11, marginBottom: 10 }}>⚠ {genError}</div>}
                <button className="gb" onClick={() => selectedChar && generatePost(selectedChar)} disabled={generating || !selectedChar} style={{ width: "100%", background: generating || !selectedChar ? E.accentSoft : E.accent, color: E.bg, border: "none", padding: "11px", borderRadius: 24, fontSize: 12, fontFamily: "Inconsolata,monospace", fontWeight: 700, cursor: generating || !selectedChar ? "not-allowed" : "pointer", opacity: !selectedChar ? 0.5 : 1 }}>
                  {generating ? <><span className="sp">🌀</span> generating…</> : selectedChar ? `✨ post as ${selectedChar.name}` : "select a character"}
                </button>
              </>
            )}
            {tab === "creator" && (
              <>
                <div style={{ fontSize: 9, color: E.muted, marginBottom: 10 }}>design your koala. they join the universe and can post.</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div><div style={{ fontSize: 8, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>name *</div><input placeholder="e.g. Plum Blossom" value={customKoala.name} onChange={e => setCustomKoala(k => ({ ...k, name: e.target.value }))} /></div>
                  <div><div style={{ fontSize: 8, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>species</div><input placeholder="koala, echidna…" value={customKoala.species} onChange={e => setCustomKoala(k => ({ ...k, species: e.target.value }))} /></div>
                  <div><div style={{ fontSize: 8, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>personality</div><select value={customKoala.personality} onChange={e => setCustomKoala(k => ({ ...k, personality: e.target.value }))}>{KOALA_PERSONALITIES.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                  <div><div style={{ fontSize: 8, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>domain</div><select value={customKoala.domain} onChange={e => setCustomKoala(k => ({ ...k, domain: e.target.value }))}>{KOALA_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                  <div><div style={{ fontSize: 8, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>home space</div><select value={customKoala.space} onChange={e => setCustomKoala(k => ({ ...k, space: e.target.value }))}>{SPACES.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}</select></div>
                  <div><div style={{ fontSize: 8, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>color</div><input type="color" value={customKoala.color} onChange={e => setCustomKoala(k => ({ ...k, color: e.target.value }))} style={{ height: "32px !important", padding: "2px !important", cursor: "pointer" }} /></div>
                </div>
                <div style={{ marginBottom: 10 }}><div style={{ fontSize: 8, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>backstory</div><textarea placeholder="who are they in the world…" value={customKoala.backstory} onChange={e => setCustomKoala(k => ({ ...k, backstory: e.target.value }))} style={{ height: "50px !important", resize: "vertical" }} /></div>
                <button className="gb" onClick={createKoala} disabled={!customKoala.name.trim()} style={{ width: "100%", background: !customKoala.name.trim() ? E.accentSoft : E.accent, color: E.bg, border: "none", padding: "11px", borderRadius: 24, fontSize: 12, fontFamily: "Inconsolata,monospace", fontWeight: 700, cursor: !customKoala.name.trim() ? "not-allowed" : "pointer", opacity: !customKoala.name.trim() ? 0.5 : 1 }}>
                  🐨 add {customKoala.name || "koala"} to the universe
                </button>
                {userKoalas.length > 0 && (
                  <div style={{ marginTop: 12, borderTop: `1px solid ${E.border}`, paddingTop: 10 }}>
                    {userKoalas.map(k => (
                      <div key={k.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ color: k.color, fontSize: 11 }}>🐨 {k.name}</span>
                        <button className="cb" onClick={() => { setSelectedChar(k); setTab("cast"); }} style={{ background: `${k.color}22`, border: `1px solid ${k.color}`, color: k.color, padding: "3px 8px", borderRadius: 4, fontSize: 10, fontFamily: "Inconsolata,monospace", cursor: "pointer" }}>post →</button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileChar && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={e => { if (e.target === e.currentTarget) setProfileChar(null); }}>
          <div style={{ background: `linear-gradient(135deg, ${profileChar.color}12, ${E.card})`, border: `1px solid ${profileChar.color}50`, borderRadius: 16, padding: 24, width: "100%", maxWidth: 420, fontFamily: "Inconsolata,monospace", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `conic-gradient(${profileChar.color}, ${profileChar.color}44, ${profileChar.color})`, padding: 3 }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: E.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{profileChar.avatar}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "Playfair Display,serif", fontSize: 18, color: profileChar.color, fontWeight: 700 }}>{profileChar.name}</div>
                  <div style={{ fontSize: 9, color: E.muted }}>{profileChar.species} · {spcEmoji(profileChar.space)} {spcName(profileChar.space)}</div>
                  {profileChar.scheduleHour !== undefined && <div style={{ fontSize: 9, color: E.muted }}>posts around {profileChar.scheduleHour}:00</div>}
                </div>
              </div>
              <span className="pi" style={{ color: E.muted, fontSize: 18 }} onClick={() => setProfileChar(null)}>×</span>
            </div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#c0b8a8", lineHeight: 1.75, marginBottom: 12 }}>{profileChar.bio || profileChar.role}</div>
            {profileChar.quote && <div style={{ borderLeft: `3px solid ${profileChar.color}`, paddingLeft: 12, fontStyle: "italic", fontSize: 13, color: profileChar.color, marginBottom: 16, fontFamily: "Georgia,serif" }}>"{profileChar.quote}"</div>}
            <div style={{ borderTop: `1px solid ${E.border}`, paddingTop: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 9, color: E.muted, marginBottom: 8, textTransform: "uppercase" }}>posts</div>
              {posts.filter(p => p.author === profileChar.name).slice(0, 4).map(p => (
                <div key={p.id} className="pi pc" onClick={() => { setProfileChar(null); setExpandedPost(p.id); setPage("feed"); }} style={{ background: E.bg, border: `1px solid ${E.border}`, borderRadius: 8, padding: "8px 10px", marginBottom: 6 }}>
                  <div style={{ fontFamily: "Playfair Display,serif", fontSize: 12, color: E.cream, marginBottom: 3 }}>{p.title}</div>
                  <div style={{ fontSize: 9, color: E.muted }}>❤️ {p.hearts || 0} · ▲ {p.upvotes} · 💬 {(p.comments || []).length}</div>
                </div>
              ))}
              {posts.filter(p => p.author === profileChar.name).length === 0 && <div style={{ fontSize: 10, color: E.muted }}>no posts yet.</div>}
            </div>
            <button className="gb" onClick={() => { setSelectedChar(profileChar); setProfileChar(null); setShowGenerator(true); setTab("cast"); }} style={{ width: "100%", background: profileChar.color, color: E.bg, border: "none", padding: "10px", borderRadius: 24, fontSize: 12, fontFamily: "Inconsolata,monospace", fontWeight: 700, cursor: "pointer" }}>
              ✨ generate post as {profileChar.name}
            </button>
          </div>
        </div>
      )}

      {/* Babar */}
      {babarRevealed && (
        <div className="pi" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { setBabarRevealed(false); setBabarClicks(0); }}>
          <div style={{ background: E.card, border: `2px solid ${E.gold}`, borderRadius: 16, padding: 34, maxWidth: 360, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👑</div>
            <div style={{ fontFamily: "Playfair Display,serif", fontSize: 20, color: E.gold, marginBottom: 10 }}>there it is</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#c8c0b0", lineHeight: 1.8, marginBottom: 16 }}>a small Babar figurine. third shelf from the bottom. between the Isley Brothers and a water-damaged ECM catalog from 1987. no one has ever mentioned it. not once.</div>
            <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted }}>tap to close</div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", padding: "18px", fontFamily: "Inconsolata,monospace", fontSize: 8, color: E.muted, borderTop: `1px solid ${E.border}`, marginTop: 10 }}>
        🐨 koalabook · the front page of the eucalyptus internet · Providence, RI · published anonymously as Peach · proceeds to nature & homeless causes
      </div>
    </div>
  );
}


// koalabook v3 🐨

// trigger build 🐨
