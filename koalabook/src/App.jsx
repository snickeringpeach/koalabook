import { useState, useRef, useEffect } from "react";

const E = {
  bg: "#0f1a12", card: "#152018", cardHover: "#1c2b20", border: "#2a3f2e",
  accent: "#7ec870", accentSoft: "#4a7a44", cream: "#e8dfc8", muted: "#7a9478",
  gold: "#c9a84c", koala: "#b5a99a", red: "#c0544a", teal: "#4a9e8a",
};

const SPACES = [
  { id: "koala", name: "Koala Space", emoji: "🐨", color: "#7ec870", desc: "Providence, RI — the Brown School, Wickenden St, the unnamed river. Everyday life of the universe." },
  { id: "roo", name: "Roo Space", emoji: "🦘", color: "#d08040", desc: "Physics dept, alpha roos, kinetic coordinate systems. Orthogonal to the eucalyptus manifold." },
  { id: "mycelial", name: "Mycelial Space", emoji: "🍄", color: "#9c7ec0", desc: "Underground network. No center. Distributed intelligence. Spore logic. Slow and total." },
  { id: "eucalyptus", name: "Eucalyptus Space", emoji: "🌿", color: "#4a9e8a", desc: "Mathematical contemplation. Brian Cole's domain. All reasoning in ℂ. Outdoor. Arboreal." },
  { id: "plum", name: "Plum Space", emoji: "🪷", color: "#7070c0", desc: "Plum Village dimension. Yin. Stillness. Interbeing. Deep Plum's realm. Bell sounds." },
  { id: "vinyl", name: "Vinyl Space", emoji: "💿", color: "#b5a99a", desc: "Wickenden St record store. Isafaze label. The underground. Butter's mixtapes. NM minus." },
  { id: "roo_physics", name: "Roo Physics Annex", emoji: "⚛️", color: "#e07040", desc: "Where roos and koalas debate the nature of spacetime. Phase space arguments. Rarely resolved." },
  { id: "bermuda", name: "Paradise Space", emoji: "🌊", color: "#50a0c0", desc: "Warm-weather koala cousins. Offshore transmissions. The Bermudian frequency." },
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
];

const CHARACTERS = [
  { name: "Olivia", species: "koala", role: "math student, Brown School", color: "#7ec870", avatar: "🐨", space: "koala", bio: "Olivia is the heart of the universe. Math student at the Brown School, she walks the unnamed river every morning and finds her way between Brian Cole's ℂ-supremacy and Lionel's cortados. Curious, warm, becoming.", quote: "some things should remain in a state of becoming." },
  { name: "Brian Cole", species: "koala", role: "emeritus math prof, eucalyptus trees, all math in ℂ", color: "#c9a84c", avatar: "🎓", space: "eucalyptus", bio: "Brian Cole is round, bespectacled, and constitutionally incapable of performing mathematics outside the complex plane. Teaches all classes outdoors, seated in eucalyptus trees. Retired in title only. Has never acknowledged the existence of ℝ as a terminal destination.", quote: "All mathematics is in ℂ. This is not a preference. This is cosmology." },
  { name: "Lionel", species: "koala", role: "Rastafarian barista, perch café", color: "#4a9e8a", avatar: "☕", space: "koala", bio: "Lionel runs a café where no one sits in chairs. Short trees serve as seating. Cortados are placed in branch crooks. He does not explain this. Deeply irie. Knows things.", quote: "everyone is held." },
  { name: "Eleff", species: "elephant", role: "record store owner, Wickenden St", color: "#b5a99a", avatar: "🐘", space: "vinyl", bio: "Eleff runs the best record store in Providence. Amoeba/Mixtape Shop energy. His partner Elbee lives in the store. There is a Babar figurine somewhere on the premises. No one has ever mentioned it. Not once.", quote: "not for sale. you understand." },
  { name: "Elbee", species: "roo-goose", role: "Eleff's partner, lives in the store", color: "#80c0a0", avatar: "🦢", space: "vinyl", bio: "Elbee is a roo-goose hybrid who lives full-time in the record store on Wickenden St. She reorganizes sections according to her own taxonomy ('miscellaneous feelings' is a real category). She and Eleff have never discussed the Babar figurine.", quote: "miscellaneous feelings is not a genre. it is a condition." },
  { name: "Emma", species: "echidna", role: "poet, East Side collective", color: "#c06090", avatar: "✍️", space: "koala", bio: "Emma is an echidna poet who operates with a loose collective of echidna writers on the East Side. They meet behind the Athenaeum. She writes between sentences. If you see the collective you will not see the collective.", quote: "we are between the sentences." },
  { name: "Mysilliam", species: "fungi", role: "mycologist, spore philosopher, multiple simultaneous grows", color: "#9c7ec0", avatar: "🍄", space: "mycelial", bio: "Mysilliam is fungi. Runs multiple simultaneous grows — Jack Frost, GT, B+. Thinks in networks. Believes the mycelial model is the correct model for consciousness, economics, and love. Brian Cole agrees but insists it only works over ℂ.", quote: "no center, no hierarchy, just signal moving through bodies that are also the signal." },
  { name: "Deep Plum", species: "koala", role: "Plum Village monk, yin wisdom", color: "#7070c0", avatar: "🪷", space: "plum", bio: "Deep Plum lives in Plum Space, which is not a place so much as a listening. Analog of Thich Nhat Hanh's Plum Village community. Gentle. Yin. The bell sounds and he returns to his breath. He has never raised his voice.", quote: "in plum space, you hear the bell. in koala space, you are already on your way to hearing it." },
  { name: "Ted", species: "tarsier", role: "Brown School math chair, dept politics", color: "#e07040", avatar: "👁", space: "koala", bio: "Ted is a tarsier with enormous eyes who chairs the math department at the Brown School. He navigates the politics between Brian Cole's eucalyptus faction and Bruce's roo physics annex with quiet exhaustion. He means well.", quote: "I'm not saying Brian is wrong. I'm saying the meeting is at 3." },
  { name: "Butter", species: "koala", role: "mixtape curator, sequence purist", color: "#e0a030", avatar: "📼", space: "vinyl", bio: "Butter is particular about the order of things. A mixtape is not a playlist. A sequence is not a shuffle. Has never made a bad side B. Works closely with Eamon at Isafaze.", quote: "the sequence is the argument." },
  { name: "Walnut", species: "wombat", role: "taxi driver, knows every Providence road", color: "#a07050", avatar: "🚕", space: "koala", bio: "Walnut drives a taxi and knows every road in Providence including ones that don't appear on maps. Philosophically inclined. Often the first to know what's happening in the city.", quote: "the city tells you things if you drive it long enough." },
  { name: "Nona", species: "cuttlefish", role: "digital media chair, Grey School (RISD analog)", color: "#50a0c0", avatar: "🦑", space: "koala", bio: "Nona is a cuttlefish who chairs digital media at the Grey School — the RISD analog. Shape-shifts. Thinks in color. Has opinions about analog vs digital that she expresses differently depending on the audience.", quote: "the medium is not the message. the medium is the body." },
  { name: "Snickering Peach", species: "trickster", role: "chaos agent, yang energy, author's shadow self", color: "#f0804a", avatar: "🍑", space: "koala", bio: "Snickering Peach is the trickster. Yang to Deep Plum's yin. The author's shadow self. Does not explain himself. Creates conditions. Leaves.", quote: "🍑" },
  { name: "Leah", species: "koala", role: "professor, Mysilliam's partner", color: "#e87aaa", avatar: "💜", space: "koala", bio: "Leah is a professor and Mysilliam's partner. She gives him space. He gives her spores. It works.", quote: "some relationships are also ecosystems." },
  { name: "Dilla", species: "koala", role: "music producer, odd time signatures, analog of J Dilla", color: "#d4a0e0", avatar: "🎹", space: "vinyl", bio: "Dilla makes beats in odd time. Analog of J Dilla. Works alone, late, in a room with equipment that hasn't been updated since it was perfect.", quote: "the swing is not a deviation. the swing is the point." },
  { name: "Carmine", species: "koala", role: "80yo Italian gay koala, East Side elder", color: "#e8a070", avatar: "🌹", space: "koala", bio: "Carmine is eighty years old, Italian, gay, and has been on the East Side longer than anyone. Has seen everything. Warm and sharp. Makes espresso the real way. Has opinions about everything and is right about most of it.", quote: "I've been here since before the Athenaeum had wi-fi. I will be here after." },
  { name: "Jackson", species: "koala", role: "therapist, East Side practice", color: "#80b0d0", avatar: "🛋", space: "koala", bio: "Jackson runs a therapy practice on the East Side. He listens. He is very good at it. Sometimes he sees Brian Cole professionally. He has said nothing about this.", quote: "the feeling is information." },
  { name: "Tim", species: "otter", role: "skateboarding sculptor", color: "#70c0a0", avatar: "🦦", space: "koala", bio: "Tim is an otter who skateboards between sculpture projects. His work involves eucalyptus, reclaimed Providence materials, and things he finds near the unnamed river.", quote: "everything is a found object if you move fast enough." },
  { name: "Oscar", species: "fox", role: "gets things done for others, quietly", color: "#e09040", avatar: "🦊", space: "koala", bio: "Oscar is a fox who gets things done. Not for himself. For others. He does not explain why. Schindler energy. Appears at the right time.", quote: "I just made some calls." },
  { name: "Jah", species: "lion", role: "spiritual anchor, cosmic patience", color: "#d4b040", avatar: "🦁", space: "koala", bio: "Jah is a lion. Spiritual anchor. Has cosmic patience. Is not in a hurry about anything. Has been watching Providence change for decades. Is fine with it.", quote: "everything is moving toward something." },
  { name: "Perelman", species: "baboon", role: "reclusive math genius, refuses all prizes", color: "#b090c0", avatar: "🧮", space: "eucalyptus", bio: "Perelman is a baboon and a mathematical genius. Has solved several problems no one else could. Has refused every prize offered to him. Lives simply. Brian Cole considers him a peer. He has not responded to Brian Cole's emails.", quote: "the proof is the thing. the prize is beside the point." },
  { name: "Hamilton", species: "turtle", role: "math pantheon, slow and eternal", color: "#60a870", avatar: "🐢", space: "eucalyptus", bio: "Hamilton is a turtle in the mathematics pantheon. Moves slowly. Has been working on the same problem for a very long time. It is going well.", quote: "I am not slow. I am thorough." },
  { name: "Zola", species: "bonobo", role: "linguist, communication as liberation, analog of Kanzi", color: "#c0a870", avatar: "🗣", space: "koala", bio: "Zola is a bonobo linguist inspired by Kanzi. Believes communication is liberation. Has thoughts about the relationship between language, power, and the unnamed river's lack of a name.", quote: "to name is to claim. to leave unnamed is to leave open." },
  { name: "Eamon", species: "crab", role: "Isafaze label, underground music", color: "#e05040", avatar: "🦀", space: "vinyl", bio: "Eamon runs the Isafaze label with Justin. Underground music. Releases limited. No social media presence to speak of. If you know you know.", quote: "the pressing is the publication." },
  { name: "Mr. G", species: "koala", role: "bucket hat, understated presence", color: "#90a880", avatar: "🪣", space: "koala", bio: "Mr. G wears a bucket hat. His presence is understated. He is at things but not of them. People feel better when he is around without knowing why.", quote: "." },
  { name: "Garfield", species: "koala", role: "mystic DJ, dungeon master energy", color: "#8070d0", avatar: "🎧", space: "vinyl", bio: "Garfield is a koala DJ with dungeon master energy. His sets are narrative arcs. Each transition is a plot point. He has been running the same campaign for three years.", quote: "you don't play records. you run a session." },
  { name: "John", species: "koala", role: "disco legend from Miami", color: "#f0c040", avatar: "🕺", space: "koala", bio: "John is a koala from Miami. Disco legend. Came to Providence for one semester in 1979 and never left. Knows everyone. Still dances.", quote: "disco never ended. you just stopped listening." },
  { name: "Bruce", species: "roo", role: "alpha roo, heads physics dept", color: "#d08040", avatar: "🦘", space: "roo", bio: "Bruce is an alpha roo who heads the physics department. He and Brian Cole have a respectful, tense relationship rooted in their disagreement about whether roo space is a subspace of ℂ or orthogonal to it. Neither has conceded.", quote: "roo space is not a metaphor. it is a coordinate system." },
  { name: "Sapolsky", species: "baboon", role: "behavioral biology, long field observations", color: "#a08060", avatar: "🔬", space: "koala", bio: "Sapolsky is a baboon who conducts long behavioral observations. He has been watching the same group for decades. His notes are extensive. He has feelings about what he's seen but presents them as data.", quote: "context is everything. context is also data." },
  { name: "2Pac", species: "lion", role: "poet-warrior, philosopher-king", color: "#c0c040", avatar: "✊", space: "koala", bio: "2Pac is a lion. Poet-warrior. Philosopher-king. Has thoughts about Providence, about systems, about what it means to be alive and loud in a city that contains both the unnamed river and the Brown School.", quote: "thug life is just life with the mask off." },
  { name: "Henry", species: "corgi", role: "beloved late dog, always remembered", color: "#c0a060", avatar: "🐕", space: "koala", bio: "Henry was a corgi. Beloved. Late. Always remembered. He appears in the story the way certain memories do — not announced, just present.", quote: "good boy." },
  { name: "Chip", species: "pound puppy", role: "chaotic good, Pound Puppies", color: "#a0c0e0", avatar: "🐶", space: "koala", bio: "Chip is a Pound Puppy. Chaotic good. Part of a trio with Hilda and Fred. They operate as a unit. Their agendas are unclear but their energy is consistent.", quote: "we are here." },
  { name: "Hilda", species: "pound puppy", role: "chaotic good, Pound Puppies", color: "#e0a0c0", avatar: "🐾", space: "koala", bio: "Hilda is a Pound Puppy. Chaotic good. Has a plan. The plan changes. The energy is the same.", quote: "the plan is more of a direction." },
];

const SEED_POSTS = [
  { id: 1, author: "Brian Cole", avatar: "🎓", authorColor: "#c9a84c", subpouch: "mathematics", space: "eucalyptus", title: "A note on why ℝ is just ℂ with imposter syndrome", body: "Sat in the eucalyptus this morning and watched a student present a proof entirely in ℝ. I waited. I waited more. Finally I said: 'the complex plane called. It wants its completeness back.' The class laughed. I did not laugh. All mathematics is in ℂ. This is not a preference. This is cosmology.", upvotes: 847, time: "3h ago", comments: [], color: "#c9a84c" },
  { id: 2, author: "Olivia", avatar: "🐨", authorColor: "#7ec870", subpouch: "providence", space: "koala", title: "the river doesn't have a name yet and I find this correct", body: "walked the Narragansett-named-river (TBD) this morning. the unnamed quality is not an oversight. it is a feature. some things should remain in a state of becoming. Brian would say this is because existence is only well-defined over ℂ. Lionel would say I need a cortado. they're both right.", upvotes: 412, time: "5h ago", comments: [{ id: 1, author: "Zola", avatar: "🗣", color: "#c0a870", text: "to leave unnamed is to leave open. i wrote a paper about this once. actually it was about the river specifically.", time: "4h ago" }, { id: 2, author: "Brian Cole", avatar: "🎓", color: "#c9a84c", text: "the river is unnamed because its true nature is only expressible in ℂ. a real-valued name would be an approximation.", time: "3h ago" }], color: "#7ec870" },
  { id: 3, author: "Eleff", avatar: "🐘", authorColor: "#b5a99a", subpouch: "vinyl", space: "vinyl", title: "just pulled a clean copy of Dollar Brand - The Dream LP (Malay, 1974)", body: "nobody came in today. or I should say: nobody who knew what they were looking for. Elbee reorganized the Afrobeat section again without telling me. found the Dollar Brand under 'miscellaneous feelings.' she is not wrong. anyway it's NM minus. not for sale. you understand.", upvotes: 631, time: "8h ago", comments: [{ id: 3, author: "Butter", avatar: "📼", color: "#e0a030", text: "miscellaneous feelings is the correct category. I would argue it's the only category.", time: "7h ago" }, { id: 4, author: "Elbee", avatar: "🦢", color: "#80c0a0", text: "I reorganized it correctly and I stand by it.", time: "6h ago" }], color: "#b5a99a" },
  { id: 4, author: "Emma", avatar: "✍️", authorColor: "#c06090", subpouch: "eastside_poets", space: "koala", title: "dispatch: what the spines know", body: "we do not write poems. poems write through us. the echidna collective met behind the Athenaeum last tuesday. someone brought oat milk. someone brought grief. neither was wasted. the work continues. if you see us you will not see us. we are between the sentences.", upvotes: 298, time: "12h ago", comments: [{ id: 5, author: "Deep Plum", avatar: "🪷", color: "#7070c0", text: "between the sentences is also between breaths. the collective and the sangha are not so different.", time: "11h ago" }], color: "#c06090" },
  { id: 5, author: "Mysilliam", avatar: "🍄", authorColor: "#9c7ec0", subpouch: "mycology", space: "mycelial", title: "mycelial update: the substrate is speaking", body: "third flush on the Jack Frost. the network is healthy. I've been thinking about what it means to be distributed — no center, no hierarchy, just signal moving through bodies that are also the signal. the math is already there. Brian agrees but says it only makes sense over ℂ. I think he might just say that about everything.", upvotes: 509, time: "1d ago", comments: [{ id: 6, author: "Brian Cole", avatar: "🎓", color: "#c9a84c", text: "I don't 'just say that about everything.' I say it about everything because it is true about everything.", time: "23h ago" }, { id: 7, author: "Mysilliam", avatar: "🍄", color: "#9c7ec0", text: "I respect that.", time: "22h ago" }], color: "#9c7ec0" },
  { id: 6, author: "Bruce", avatar: "🦘", authorColor: "#d08040", subpouch: "roo_space", space: "roo", title: "roo space is not a metaphor", body: "I keep hearing koalas describe roo space as 'kinetic' or 'high energy' as if it is some kind of mood. It is not a mood. It is a coordinate system. The phase space of every roo is orthogonal to the eucalyptus manifold. Brian Cole knows this. He just refuses to write it down because it would require acknowledging that some math happens outside trees.", upvotes: 388, time: "1d ago", comments: [{ id: 8, author: "Brian Cole", avatar: "🎓", color: "#c9a84c", text: "I would write it down if the orthogonality could be established over ℂ. Which it cannot. Because roo space is not complete.", time: "23h ago" }, { id: 9, author: "Bruce", avatar: "🦘", color: "#d08040", text: "completeness is a koala obsession. roos are fine with open sets.", time: "22h ago" }, { id: 10, author: "Ted", avatar: "👁", color: "#e07040", text: "the department meeting is on thursday. I would appreciate if this stayed out of it.", time: "20h ago" }], color: "#d08040" },
  { id: 7, author: "Deep Plum", avatar: "🪷", authorColor: "#7070c0", subpouch: "plum_village", space: "plum", title: "a bell, not an alarm", body: "the bell sounds and I return to my breath. the bell sounds again and I return to my breath. someone asked me today what the difference is between plum space and koala space. I said: in plum space, you hear the bell. in koala space, you are already on your way to hearing it. they are not different places. they are different listenings.", upvotes: 521, time: "2d ago", comments: [{ id: 11, author: "Olivia", avatar: "🐨", color: "#7ec870", text: "I think I heard the bell this morning by the river. or it might have been a bike.", time: "1d ago" }, { id: 12, author: "Deep Plum", avatar: "🪷", color: "#7070c0", text: "it was the bell.", time: "1d ago" }], color: "#7070c0" },
  { id: 8, author: "Lionel", avatar: "☕", authorColor: "#4a9e8a", subpouch: "eucalyptus_café", space: "koala", title: "the perch seats are medicine", body: "irie morning. I don't use chairs for chairs. I use trees for chairs. this is not a statement. this is just how it is. the cortado sits in the crook of the branch. the customer sits in the crook of the branch. everyone is held. one koala asked for oat milk. gave them whole eucalyptus. no complaints.", upvotes: 776, time: "2d ago", comments: [{ id: 13, author: "Carmine", avatar: "🌹", color: "#e8a070", text: "I've been coming here since before you called it a café. you used to call it 'the tree.' I preferred that.", time: "1d ago" }, { id: 14, author: "Lionel", avatar: "☕", color: "#4a9e8a", text: "it is still the tree.", time: "1d ago" }], color: "#4a9e8a" },
  { id: 9, author: "Garfield", avatar: "🎧", authorColor: "#8070d0", subpouch: "mixtapes", space: "vinyl", title: "the set is act three of a five-act structure", body: "people ask me what I'm playing next saturday. I tell them act three. they think I'm being mysterious. I'm being accurate. the set is a narrative. we are currently in the rising action. the inciting incident was two weeks ago when I played that Shinichi Atobe record and someone cried. we don't skip acts.", upvotes: 344, time: "3d ago", comments: [{ id: 15, author: "Butter", avatar: "📼", color: "#e0a030", text: "the Atobe record was the right call. that was the only correct inciting incident.", time: "2d ago" }, { id: 16, author: "Dilla", avatar: "🎹", color: "#d4a0e0", text: "five acts is a lot for a saturday. I do three. the third act is just the groove finding its own ending.", time: "2d ago" }], color: "#8070d0" },
  { id: 10, author: "Carmine", avatar: "🌹", authorColor: "#e8a070", subpouch: "providence", space: "koala", title: "I have been on Wickenden St longer than the buildings", body: "someone told me today that the neighborhood is changing. I said yes. they seemed to expect more from me. what more is there? the neighborhood has been changing since I arrived in 1971. it was changing before I arrived. the buildings change. the river has no name. Eleff's store moves the furniture around sometimes. this is providence. this is how it is.", upvotes: 612, time: "3d ago", comments: [{ id: 17, author: "Walnut", avatar: "🚕", color: "#a07050", text: "the roads haven't changed. I'd know.", time: "2d ago" }, { id: 18, author: "Eleff", avatar: "🐘", color: "#b5a99a", text: "I don't move the furniture. Elbee moves the furniture.", time: "2d ago" }], color: "#e8a070" },
];

const TICKER_ITEMS = [
  "🐨 Brian Cole has entered Eucalyptus Space",
  "🍄 third flush confirmed in Mycelial Space",
  "💿 new arrival at Eleff's — filing under 'miscellaneous feelings'",
  "🦘 Bruce requests a cross-departmental meeting about the ℂ question",
  "🪷 bell sounded in Plum Space — 3 koalas returned to breath",
  "✍️ echidna collective convening behind the Athenaeum",
  "☕ Lionel out of oat milk (by design)",
  "🌊 transmission received from Paradise Space",
  "📼 Butter has revised the sequence",
  "🐨 Olivia spotted near the unnamed river",
  "🎧 Garfield announces: we are entering act four",
  "🌹 Carmine has opinions about the renovation",
  "⚛️ roo space remains orthogonal",
];

const KOALA_PERSONALITIES = ["curious", "grumpy", "serene", "chaotic", "scholarly", "mystic", "romantic", "trickster", "stoic", "joyful"];
const KOALA_DOMAINS = ["mathematics", "music", "cooking", "poetry", "mycology", "philosophy", "physics", "art", "taxi driving", "therapy", "DJing", "linguistics", "botany", "dance"];

const spC = (name) => SUBPOUCHES.find(s => s.name === name)?.color || "#7ec870";
const spE = (name) => SUBPOUCHES.find(s => s.name === name)?.emoji || "🌿";
const spcColor = (id) => SPACES.find(s => s.id === id)?.color || "#7ec870";
const spcName = (id) => SPACES.find(s => s.id === id)?.name || id;
const spcEmoji = (id) => SPACES.find(s => s.id === id)?.emoji || "🌿";

const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

export default function App() {
  const [posts, setPosts] = useState(() => load("kb_posts", SEED_POSTS));
  const [votes, setVotes] = useState(() => load("kb_votes", {}));
  const [activeSubpouch, setActiveSubpouch] = useState(null);
  const [activeSpace, setActiveSpace] = useState(null);
  const [sortBy, setSortBy] = useState("hot");
  const [generating, setGenerating] = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);
  const [genError, setGenError] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [showGenerator, setShowGenerator] = useState(false);
  const [tab, setTab] = useState("cast");
  const [customKoala, setCustomKoala] = useState({ name: "", species: "koala", personality: "curious", domain: "mathematics", space: "koala", color: "#7ec870", backstory: "" });
  const [userKoalas, setUserKoalas] = useState(() => load("kb_user_koalas", []));
  const [profileChar, setProfileChar] = useState(null);
  const [page, setPage] = useState("feed"); // feed | map | peach
  const [searchQuery, setSearchQuery] = useState("");
  const [tickerIdx, setTickerIdx] = useState(0);
  const [babarRevealed, setBabarRevealed] = useState(false);
  const [babarClicks, setBabarClicks] = useState(0);
  const nextId = useRef(posts.length + 1);

  useEffect(() => { save("kb_posts", posts); }, [posts]);
  useEffect(() => { save("kb_votes", votes); }, [votes]);
  useEffect(() => { save("kb_user_koalas", userKoalas); }, [userKoalas]);
  useEffect(() => { const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKER_ITEMS.length), 4000); return () => clearInterval(t); }, []);

  const allChars = [...CHARACTERS, ...userKoalas];

  const filteredPosts = posts
    .filter(p => !activeSubpouch || p.subpouch === activeSubpouch)
    .filter(p => !activeSpace || p.space === activeSpace)
    .filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.body.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "hot") return (b.upvotes + (b.comments?.length || 0) * 3) - (a.upvotes + (a.comments?.length || 0) * 3);
      if (sortBy === "new") return b.id - a.id;
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

  const addComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    const char = selectedChar || CHARACTERS[0];
    setPosts(p => p.map(post => {
      if (post.id !== postId) return post;
      const newComment = { id: Date.now(), author: char.name, avatar: char.avatar, color: char.color, text, time: "just now" };
      return { ...post, comments: [...(post.comments || []), newComment] };
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
      if (!res.ok) throw new Error("server error");
      const parsed = await res.json();
      const newPost = {
        id: nextId.current++,
        author: char.name, avatar: char.avatar || "🐨", authorColor: char.color,
        subpouch: parsed.subpouch || "philosophy",
        space: parsed.space || char.space || "koala",
        title: parsed.title, body: parsed.body,
        upvotes: Math.floor(Math.random() * 200) + 50,
        time: "just now", comments: [], color: char.color, isNew: true,
      };
      setPosts(p => [newPost, ...p]);
      setShowGenerator(false);
    } catch (e) { setGenError("couldn't reach the eucalyptus server. try again."); }
    setGenerating(false);
  };

  const createKoala = () => {
    if (!customKoala.name.trim()) return;
    const newKoala = { ...customKoala, role: `${customKoala.personality} ${customKoala.species}, ${customKoala.domain} specialist`, avatar: "🐨", isCustom: true };
    setUserKoalas(k => [...k, newKoala]);
    setCustomKoala({ name: "", species: "koala", personality: "curious", domain: "mathematics", space: "koala", color: "#7ec870", backstory: "" });
  };

  const handleEleffClick = () => {
    const n = babarClicks + 1;
    setBabarClicks(n);
    if (n >= 3) setBabarRevealed(true);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inconsolata:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:#0f1a12;}::-webkit-scrollbar-thumb{background:#2a3f2e;border-radius:3px;}
    .pc{transition:all 0.18s;}.pc:hover{background:${E.cardHover} !important;transform:translateX(2px);}
    .vb{cursor:pointer;transition:all 0.12s;user-select:none;}.vb:hover{transform:scale(1.2);}
    .pi{transition:all 0.12s;cursor:pointer;}.pi:hover{opacity:0.75;}
    .gb{transition:all 0.18s;cursor:pointer;}.gb:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 4px 20px rgba(126,200,112,0.25);}
    .cb{transition:all 0.1s;cursor:pointer;}
    .nb{animation:fi 0.45s ease;}
    @keyframes fi{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
    @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes tick{0%{transform:translateX(100%);}100%{transform:translateX(-100%);}}
    .sp{animation:spin 1s linear infinite;display:inline-block;}
    input,select,textarea{background:#0f1a12!important;color:#e8dfc8!important;border:1px solid #2a3f2e!important;border-radius:4px!important;padding:7px 10px!important;font-family:'Inconsolata',monospace!important;font-size:12px!important;width:100%!important;outline:none!important;}
    input:focus,select:focus,textarea:focus{border-color:#7ec870!important;}
    select option{background:#152018;color:#e8dfc8;}
  `;

  return (
    <div style={{ minHeight: "100vh", background: E.bg, color: E.cream, fontFamily: "Georgia, serif" }}>
      <style>{css}</style>

      {/* Header */}
      <div style={{ background: E.card, borderBottom: `1px solid ${E.border}`, position: "sticky", top: 0, zIndex: 100, padding: "0 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🐨</span>
            <div>
              <span style={{ fontFamily: "Playfair Display,serif", fontWeight: 900, fontSize: 19, color: E.accent, cursor: "pointer" }} onClick={() => setPage("feed")}>koalabook</span>
              <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted, display: "block", marginTop: -2 }}>the front page of the eucalyptus internet</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input placeholder="search…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: "140px !important", fontSize: "11px !important", padding: "5px 8px !important" }} />
            {[["feed", "🌿 feed"], ["map", "🗺 spaces"], ["peach", "🍑 about"]].map(([p, label]) => (
              <button key={p} className="cb" onClick={() => setPage(p)} style={{ background: page === p ? `${E.accent}22` : "transparent", color: page === p ? E.accent : E.muted, border: `1px solid ${page === p ? E.accent : E.border}`, padding: "5px 10px", borderRadius: 4, fontFamily: "Inconsolata,monospace", fontSize: 11, cursor: "pointer" }}>{label}</button>
            ))}
            <button className="gb cb" onClick={() => { setShowGenerator(true); setTab("cast"); }} style={{ background: E.accentSoft, color: E.cream, border: `1px solid ${E.accent}`, padding: "6px 12px", borderRadius: 4, fontFamily: "Inconsolata,monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>+ Post</button>
            <button className="gb cb" onClick={() => { setShowGenerator(true); setTab("creator"); }} style={{ background: "transparent", color: E.accent, border: `1px solid ${E.accent}`, padding: "6px 12px", borderRadius: 4, fontFamily: "Inconsolata,monospace", fontWeight: 700, fontSize: 11, cursor: "pointer" }}>🐨+</button>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ background: "#0a1209", borderBottom: `1px solid ${E.border}`, padding: "5px 16px", overflow: "hidden", position: "relative", height: 28 }}>
        <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: E.muted, whiteSpace: "nowrap", transition: "opacity 0.5s", display: "flex", alignItems: "center", height: "100%" }}>
          <span style={{ color: E.accentSoft, marginRight: 8, fontWeight: 700, fontSize: 10, textTransform: "uppercase", letterSpacing: "1px" }}>live</span>
          {TICKER_ITEMS[tickerIdx]}
        </div>
      </div>

      {/* Spaces bar */}
      <div style={{ background: E.card, borderBottom: `1px solid ${E.border}`, padding: "6px 16px", overflowX: "auto", whiteSpace: "nowrap" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "inline-flex", gap: 5, alignItems: "center" }}>
          <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted }}>spaces:</span>
          <div className="pi" onClick={() => setActiveSpace(null)} style={{ display: "inline-block", padding: "2px 9px", borderRadius: 20, border: `1px solid ${!activeSpace ? E.accent : E.border}`, color: !activeSpace ? E.accent : E.muted, fontFamily: "Inconsolata,monospace", fontSize: 10 }}>🌿 all</div>
          {SPACES.map(s => (
            <div key={s.id} className="pi" onClick={() => { setActiveSpace(activeSpace === s.id ? null : s.id); setPage("feed"); }} style={{ display: "inline-block", padding: "2px 9px", borderRadius: 20, border: `1px solid ${activeSpace === s.id ? s.color : E.border}`, color: activeSpace === s.id ? s.color : E.muted, fontFamily: "Inconsolata,monospace", fontSize: 10, background: activeSpace === s.id ? `${s.color}12` : "transparent" }}>
              {s.emoji} {s.name}
            </div>
          ))}
        </div>
      </div>

      {/* PAGES */}
      {page === "map" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 16px" }}>
          <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 24, color: E.accent, marginBottom: 6 }}>🗺 The Orthogonal Spaces</h1>
          <p style={{ fontFamily: "Inconsolata,monospace", fontSize: 12, color: E.muted, marginBottom: 20 }}>Adventures in Koala Space takes place across multiple orthogonal dimensions. They coexist. They intersect. They do not always agree.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
            {SPACES.map(s => (
              <div key={s.id} className="pc" style={{ background: E.card, border: `1px solid ${s.color}40`, borderRadius: 10, padding: "16px 18px", borderLeft: `4px solid ${s.color}`, cursor: "pointer" }} onClick={() => { setActiveSpace(s.id); setPage("feed"); }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
                <div style={{ fontFamily: "Playfair Display,serif", fontSize: 15, fontWeight: 700, color: s.color, marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: E.muted, lineHeight: 1.6, marginBottom: 10 }}>{s.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {allChars.filter(c => c.space === s.id).map(c => (
                    <span key={c.name} className="pi" onClick={e => { e.stopPropagation(); setProfileChar(c); }} style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: c.color, background: `${c.color}18`, padding: "1px 6px", borderRadius: 10 }}>{c.avatar} {c.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {page === "peach" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 16px" }}>
          <div style={{ fontFamily: "Playfair Display,serif", fontSize: 32, color: E.accent, marginBottom: 4 }}>🍑</div>
          <h1 style={{ fontFamily: "Playfair Display,serif", fontSize: 28, color: E.cream, marginBottom: 16, fontWeight: 900 }}>About Peach</h1>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 15, color: "#c8c0b0", lineHeight: 1.8, marginBottom: 20 }}>
            <p style={{ marginBottom: 12 }}>Adventures in Koala Space is a children's picture book series (ages 3–7) set in a heightened Providence, RI where academic and cultural institutions are run by animals. It is published anonymously under the name <em>Peach</em>.</p>
            <p style={{ marginBottom: 12 }}>All proceeds from the series go to nature causes and organizations supporting unhoused people. The author does book tours wearing a koala mask. This is not a bit.</p>
            <p style={{ marginBottom: 12 }}>Koalabook is the social network of that universe — a place where the characters live between the pages. It is the front page of the eucalyptus internet.</p>
            <p style={{ marginBottom: 12 }}>The Brown School. Wickenden St. The unnamed river. The Athenaeum. The record store with the thing in it that nobody mentions. The café where the trees are the chairs. All mathematics in ℂ.</p>
            <p style={{ color: E.muted, fontStyle: "italic" }}>This is Providence, RI (Narragansett Country). This is the universe.</p>
          </div>
          <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 8, padding: "16px 18px", fontFamily: "Inconsolata,monospace", fontSize: 12, color: E.muted, lineHeight: 1.7 }}>
            <div style={{ color: E.accent, fontWeight: 700, marginBottom: 8 }}>🌿 the universe at a glance</div>
            <div>📍 Providence, RI (Narragansett Country)</div>
            <div>🎓 The Brown School · The Grey School · Whale Academy</div>
            <div>🏛 The Athenaeum · The AMS on Charles St</div>
            <div>💿 Wickenden St record store · Isafaze label</div>
            <div>☕ The perch café (trees are the chairs)</div>
            <div>🌊 The unnamed river (name TBD. this is correct.)</div>
            <div style={{ marginTop: 8, color: E.muted, fontSize: 10 }}>all mathematics conducted exclusively in ℂ</div>
          </div>
        </div>
      )}

      {page === "feed" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 16px", display: "flex", gap: 14 }}>
          {/* Sidebar */}
          <div style={{ width: 188, flexShrink: 0 }}>
            <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ padding: "8px 12px 6px", borderBottom: `1px solid ${E.border}`, fontFamily: "Playfair Display,serif", fontWeight: 700, fontSize: 10, color: E.muted, textTransform: "uppercase", letterSpacing: "1px" }}>p/ subpouches</div>
              <div className="pi" onClick={() => setActiveSubpouch(null)} style={{ padding: "6px 12px", fontSize: 11, fontFamily: "Inconsolata,monospace", background: !activeSubpouch ? E.border : "transparent", color: !activeSubpouch ? E.accent : E.muted, borderBottom: `1px solid ${E.border}` }}>🌿 all</div>
              {SUBPOUCHES.map(s => (
                <div key={s.name} className="pi" onClick={() => setActiveSubpouch(activeSubpouch === s.name ? null : s.name)} style={{ padding: "6px 12px", fontSize: 11, fontFamily: "Inconsolata,monospace", background: activeSubpouch === s.name ? E.border : "transparent", color: activeSubpouch === s.name ? s.color : E.muted, borderBottom: `1px solid ${E.border}`, borderLeft: activeSubpouch === s.name ? `3px solid ${s.color}` : "3px solid transparent" }}>
                  {s.emoji} {s.name}
                </div>
              ))}
            </div>
            <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: "8px 12px 6px", borderBottom: `1px solid ${E.border}`, fontFamily: "Playfair Display,serif", fontWeight: 700, fontSize: 10, color: E.muted, textTransform: "uppercase", letterSpacing: "1px" }}>🐨 residents ({allChars.length})</div>
              {allChars.map(c => (
                <div key={c.name} className="pi" onClick={() => c.name === "Eleff" ? handleEleffClick() : setProfileChar(c)} style={{ padding: "5px 12px", borderBottom: `1px solid ${E.border}`, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 11 }}>{c.avatar}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: c.color, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 3 }}>
                      {c.name} {c.isCustom && <span style={{ fontSize: 8, background: `${E.accent}30`, color: E.accent, padding: "0 3px", borderRadius: 2 }}>you</span>}
                    </div>
                    <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 8, color: E.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.role?.substring(0, 28)}{(c.role?.length || 0) > 28 ? "…" : ""}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div style={{ flex: 1 }}>
            <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 8, padding: "8px 14px", marginBottom: 10, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {["hot", "new", "top"].map(s => (
                <span key={s} className="pi" onClick={() => setSortBy(s)} style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: sortBy === s ? E.accent : E.muted, textTransform: "uppercase", letterSpacing: "1px", borderBottom: sortBy === s ? `2px solid ${E.accent}` : "2px solid transparent", paddingBottom: 2 }}>
                  {s === "hot" ? "🔥 hot" : s === "new" ? "🌱 new" : "⬆ top"}
                </span>
              ))}
              {activeSpace && <span style={{ marginLeft: "auto", fontFamily: "Inconsolata,monospace", fontSize: 10, color: spcColor(activeSpace), background: `${spcColor(activeSpace)}18`, padding: "2px 8px", borderRadius: 20 }}>{spcEmoji(activeSpace)} {spcName(activeSpace)} <span className="pi" onClick={() => setActiveSpace(null)} style={{ opacity: 0.6 }}>×</span></span>}
              {activeSubpouch && <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: spC(activeSubpouch), background: `${spC(activeSubpouch)}18`, padding: "2px 8px", borderRadius: 20 }}>{spE(activeSubpouch)} p/{activeSubpouch} <span className="pi" onClick={() => setActiveSubpouch(null)} style={{ opacity: 0.6 }}>×</span></span>}
              {searchQuery && <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.gold, background: `${E.gold}18`, padding: "2px 8px", borderRadius: 20 }}>🔍 "{searchQuery}" <span className="pi" onClick={() => setSearchQuery("")} style={{ opacity: 0.6 }}>×</span></span>}
            </div>

            {filteredPosts.map(post => (
              <div key={post.id} className={`pc ${post.isNew ? "nb" : ""}`} style={{ background: E.card, border: `1px solid ${post.isNew ? post.color : E.border}`, borderRadius: 8, marginBottom: 8, display: "flex", overflow: "hidden" }}>
                <div style={{ width: 38, background: "rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0", gap: 3, flexShrink: 0 }}>
                  <span className="vb" onClick={() => handleVote(post.id, 1)} style={{ fontSize: 13, color: (votes[post.id] || 0) === 1 ? E.accent : E.muted }}>▲</span>
                  <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, fontWeight: 700, color: (votes[post.id] || 0) === 1 ? E.accent : (votes[post.id] || 0) === -1 ? E.red : E.cream }}>{post.upvotes}</span>
                  <span className="vb" onClick={() => handleVote(post.id, -1)} style={{ fontSize: 13, color: (votes[post.id] || 0) === -1 ? E.red : E.muted }}>▼</span>
                </div>
                <div style={{ flex: 1, padding: "10px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5, flexWrap: "wrap" }}>
                    <span className="pi" onClick={() => setActiveSubpouch(post.subpouch)} style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: spC(post.subpouch), background: `${spC(post.subpouch)}18`, padding: "1px 6px", borderRadius: 3 }}>{spE(post.subpouch)} p/{post.subpouch}</span>
                    {post.space && <span className="pi" onClick={() => setActiveSpace(post.space)} style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: spcColor(post.space), background: `${spcColor(post.space)}12`, padding: "1px 6px", borderRadius: 20 }}>{spcEmoji(post.space)} {spcName(post.space)}</span>}
                    <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted }}>by</span>
                    <span className="pi" style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: post.authorColor, fontWeight: 600 }} onClick={() => { const c = allChars.find(ch => ch.name === post.author); if (c) setProfileChar(c); }}>{post.avatar} {post.author}</span>
                    <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted }}>{post.time}</span>
                    {post.isNew && <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 9, color: post.authorColor, background: `${post.authorColor}22`, padding: "1px 5px", borderRadius: 20, fontWeight: 700 }}>NEW</span>}
                  </div>
                  <h2 className="pi" style={{ fontFamily: "Playfair Display,serif", fontSize: 15, fontWeight: 700, color: E.cream, marginBottom: 5, lineHeight: 1.3 }} onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>{post.title}</h2>
                  {expandedPost === post.id && (
                    <>
                      <p style={{ fontFamily: "Georgia,serif", fontSize: 13, color: "#c8c0b0", lineHeight: 1.7, marginBottom: 10, background: "rgba(0,0,0,0.2)", padding: "10px 12px", borderRadius: 5, borderLeft: `3px solid ${post.authorColor}` }}>{post.body}</p>
                      {/* Comments */}
                      {(post.comments || []).length > 0 && (
                        <div style={{ marginBottom: 10, borderLeft: `2px solid ${E.border}`, paddingLeft: 12 }}>
                          {(post.comments || []).map(c => (
                            <div key={c.id} style={{ marginBottom: 8 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                                <span style={{ fontSize: 11 }}>{c.avatar}</span>
                                <span className="pi" style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: c.color, fontWeight: 600 }} onClick={() => { const ch = allChars.find(x => x.name === c.author); if (ch) setProfileChar(ch); }}>{c.author}</span>
                                <span style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted }}>{c.time}</span>
                              </div>
                              <div style={{ fontFamily: "Georgia,serif", fontSize: 12, color: "#b0a898", lineHeight: 1.6 }}>{c.text}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Comment input */}
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 13 }}>{selectedChar?.avatar || "🐨"}</span>
                        <input placeholder={`comment as ${selectedChar?.name || "yourself"}…`} value={commentInputs[post.id] || ""} onChange={e => setCommentInputs(c => ({ ...c, [post.id]: e.target.value }))} onKeyDown={e => e.key === "Enter" && addComment(post.id)} style={{ flex: "1 !important", width: "auto !important" }} />
                        <button className="cb" onClick={() => addComment(post.id)} style={{ background: E.accentSoft, color: E.cream, border: `1px solid ${E.accent}`, padding: "5px 10px", borderRadius: 4, fontFamily: "Inconsolata,monospace", fontSize: 11, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>post</button>
                      </div>
                    </>
                  )}
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 5 }}>
                    <span className="pi" style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: E.muted }} onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>💬 {(post.comments || []).length} comments</span>
                    <span className="pi" style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: E.muted }}>🌿 share</span>
                  </div>
                </div>
              </div>
            ))}
            {filteredPosts.length === 0 && (
              <div style={{ textAlign: "center", padding: "50px 20px", color: E.muted, fontFamily: "Inconsolata,monospace" }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>🌿</div>
                <div style={{ fontSize: 12 }}>nothing here yet. generate something.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generator Modal */}
      {showGenerator && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={e => { if (e.target === e.currentTarget) setShowGenerator(false); }}>
          <div style={{ background: E.card, border: `1px solid ${E.border}`, borderRadius: 12, padding: 22, width: "100%", maxWidth: 560, fontFamily: "Inconsolata,monospace", maxHeight: "88vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontFamily: "Playfair Display,serif", fontSize: 17, color: E.accent }}>🐨 koalabook</h2>
              <span style={{ cursor: "pointer", color: E.muted, fontSize: 18 }} onClick={() => setShowGenerator(false)}>×</span>
            </div>
            <div style={{ display: "flex", borderBottom: `1px solid ${E.border}`, marginBottom: 14 }}>
              {[["cast", "🐨 generate post"], ["creator", "✨ create koala"]].map(([t, label]) => (
                <button key={t} onClick={() => setTab(t)} style={{ background: "transparent", border: "none", color: tab === t ? E.accent : E.muted, fontFamily: "Inconsolata,monospace", fontSize: 11, padding: "7px 14px", cursor: "pointer", borderBottom: tab === t ? `2px solid ${E.accent}` : "2px solid transparent", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</button>
              ))}
            </div>
            {tab === "cast" && (
              <>
                <div style={{ fontSize: 10, color: E.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "1px" }}>choose character</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                  {allChars.map(c => (
                    <button key={c.name} className="cb" onClick={() => setSelectedChar(c)} style={{ background: selectedChar?.name === c.name ? `${c.color}22` : E.bg, border: `1px solid ${selectedChar?.name === c.name ? c.color : E.border}`, color: selectedChar?.name === c.name ? c.color : E.muted, padding: "4px 9px", borderRadius: 4, fontSize: 11, fontFamily: "Inconsolata,monospace", cursor: "pointer" }}>
                      {c.avatar} {c.name}{c.isCustom ? " ★" : ""}
                    </button>
                  ))}
                </div>
                {selectedChar && (
                  <div style={{ background: E.bg, border: `1px solid ${E.border}`, borderRadius: 5, padding: "8px 11px", marginBottom: 12, fontSize: 11, color: E.muted, lineHeight: 1.5 }}>
                    <span style={{ color: selectedChar.color }}>{selectedChar.avatar} {selectedChar.name}</span> — {selectedChar.role}
                    {selectedChar.space && <span style={{ marginLeft: 8, color: spcColor(selectedChar.space), fontSize: 10 }}>{spcEmoji(selectedChar.space)}</span>}
                  </div>
                )}
                {genError && <div style={{ color: E.red, fontSize: 11, marginBottom: 10 }}>⚠ {genError}</div>}
                <button className="gb" onClick={() => selectedChar && generatePost(selectedChar)} disabled={generating || !selectedChar} style={{ width: "100%", background: generating || !selectedChar ? E.accentSoft : E.accent, color: E.bg, border: "none", padding: "10px", borderRadius: 5, fontSize: 13, fontFamily: "Inconsolata,monospace", fontWeight: 700, cursor: generating || !selectedChar ? "not-allowed" : "pointer", opacity: !selectedChar ? 0.5 : 1 }}>
                  {generating ? <><span className="sp">🌀</span> generating…</> : selectedChar ? `✨ post as ${selectedChar.name}` : "select a character"}
                </button>
              </>
            )}
            {tab === "creator" && (
              <>
                <div style={{ fontSize: 10, color: E.muted, marginBottom: 12 }}>design your koala. they join the universe and can post.</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 9 }}>
                  <div><div style={{ fontSize: 9, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>name *</div><input placeholder="e.g. Plum Blossom" value={customKoala.name} onChange={e => setCustomKoala(k => ({ ...k, name: e.target.value }))} /></div>
                  <div><div style={{ fontSize: 9, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>species</div><input placeholder="koala, echidna…" value={customKoala.species} onChange={e => setCustomKoala(k => ({ ...k, species: e.target.value }))} /></div>
                  <div><div style={{ fontSize: 9, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>personality</div><select value={customKoala.personality} onChange={e => setCustomKoala(k => ({ ...k, personality: e.target.value }))}>{KOALA_PERSONALITIES.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                  <div><div style={{ fontSize: 9, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>domain</div><select value={customKoala.domain} onChange={e => setCustomKoala(k => ({ ...k, domain: e.target.value }))}>{KOALA_DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                  <div><div style={{ fontSize: 9, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>home space</div><select value={customKoala.space} onChange={e => setCustomKoala(k => ({ ...k, space: e.target.value }))}>{SPACES.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}</select></div>
                  <div><div style={{ fontSize: 9, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>color</div><input type="color" value={customKoala.color} onChange={e => setCustomKoala(k => ({ ...k, color: e.target.value }))} style={{ height: "34px !important", padding: "2px !important", cursor: "pointer" }} /></div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 9, color: E.muted, marginBottom: 3, textTransform: "uppercase" }}>backstory (optional)</div>
                  <textarea placeholder="who are they in the world…" value={customKoala.backstory} onChange={e => setCustomKoala(k => ({ ...k, backstory: e.target.value }))} style={{ height: "52px !important", resize: "vertical" }} />
                </div>
                {customKoala.name && (
                  <div style={{ background: E.bg, border: `1px solid ${customKoala.color}`, borderRadius: 5, padding: "8px 11px", marginBottom: 11, fontSize: 11, display: "flex", alignItems: "center", gap: 8 }}>
                    <span>🐨</span>
                    <div><div style={{ color: customKoala.color, fontWeight: 700 }}>{customKoala.name}</div><div style={{ color: E.muted, fontSize: 9 }}>{customKoala.personality} {customKoala.species} · {customKoala.domain} · {spcEmoji(customKoala.space)}</div></div>
                  </div>
                )}
                <button className="gb" onClick={createKoala} disabled={!customKoala.name.trim()} style={{ width: "100%", background: !customKoala.name.trim() ? E.accentSoft : E.accent, color: E.bg, border: "none", padding: "10px", borderRadius: 5, fontSize: 13, fontFamily: "Inconsolata,monospace", fontWeight: 700, cursor: !customKoala.name.trim() ? "not-allowed" : "pointer", opacity: !customKoala.name.trim() ? 0.5 : 1 }}>
                  🐨 add {customKoala.name || "koala"} to the universe
                </button>
                {userKoalas.length > 0 && (
                  <div style={{ marginTop: 14, borderTop: `1px solid ${E.border}`, paddingTop: 12 }}>
                    <div style={{ fontSize: 9, color: E.muted, marginBottom: 8, textTransform: "uppercase" }}>your koalas</div>
                    {userKoalas.map(k => (
                      <div key={k.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
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

      {/* Character Profile Modal */}
      {profileChar && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={e => { if (e.target === e.currentTarget) setProfileChar(null); }}>
          <div style={{ background: E.card, border: `1px solid ${profileChar.color}`, borderRadius: 12, padding: 24, width: "100%", maxWidth: 460, fontFamily: "Inconsolata,monospace", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${profileChar.color}22`, border: `2px solid ${profileChar.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{profileChar.avatar}</div>
                <div>
                  <div style={{ fontFamily: "Playfair Display,serif", fontSize: 18, color: profileChar.color, fontWeight: 700 }}>{profileChar.name}</div>
                  <div style={{ fontSize: 11, color: E.muted }}>{profileChar.species} · {spcEmoji(profileChar.space)} {spcName(profileChar.space)}</div>
                </div>
              </div>
              <span style={{ cursor: "pointer", color: E.muted, fontSize: 18 }} onClick={() => setProfileChar(null)}>×</span>
            </div>
            <div style={{ fontSize: 12, color: "#c8c0b0", lineHeight: 1.7, marginBottom: 14, fontFamily: "Georgia,serif" }}>{profileChar.bio || profileChar.role}</div>
            {profileChar.quote && (
              <div style={{ borderLeft: `3px solid ${profileChar.color}`, paddingLeft: 12, fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: 13, color: profileChar.color, marginBottom: 16 }}>"{profileChar.quote}"</div>
            )}
            <div style={{ borderTop: `1px solid ${E.border}`, paddingTop: 12 }}>
              <div style={{ fontSize: 10, color: E.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>posts by {profileChar.name}</div>
              {posts.filter(p => p.author === profileChar.name).slice(0, 3).map(p => (
                <div key={p.id} className="pi" onClick={() => { setProfileChar(null); setExpandedPost(p.id); }} style={{ background: E.bg, border: `1px solid ${E.border}`, borderRadius: 5, padding: "8px 10px", marginBottom: 6 }}>
                  <div style={{ fontFamily: "Playfair Display,serif", fontSize: 12, color: E.cream, lineHeight: 1.3 }}>{p.title}</div>
                  <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 10, color: E.muted, marginTop: 3 }}>▲ {p.upvotes} · {(p.comments || []).length} comments · {p.time}</div>
                </div>
              ))}
              {posts.filter(p => p.author === profileChar.name).length === 0 && (
                <div style={{ fontSize: 11, color: E.muted }}>no posts yet.</div>
              )}
            </div>
            <button className="gb" onClick={() => { setSelectedChar(profileChar); setProfileChar(null); setShowGenerator(true); setTab("cast"); }} style={{ width: "100%", marginTop: 14, background: profileChar.color, color: E.bg, border: "none", padding: "9px", borderRadius: 5, fontSize: 12, fontFamily: "Inconsolata,monospace", fontWeight: 700, cursor: "pointer" }}>
              ✨ generate post as {profileChar.name}
            </button>
          </div>
        </div>
      )}

      {/* Babar Easter Egg */}
      {babarRevealed && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { setBabarRevealed(false); setBabarClicks(0); }}>
          <div style={{ background: E.card, border: `2px solid ${E.gold}`, borderRadius: 12, padding: 32, maxWidth: 380, textAlign: "center", fontFamily: "Georgia,serif" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👑</div>
            <div style={{ fontFamily: "Playfair Display,serif", fontSize: 20, color: E.gold, marginBottom: 10 }}>there it is</div>
            <div style={{ fontSize: 13, color: "#c8c0b0", lineHeight: 1.7, marginBottom: 8 }}>a small Babar figurine sits on the third shelf from the bottom, between the Isley Brothers section and a water-damaged copy of an ECM catalog from 1987.</div>
            <div style={{ fontSize: 13, color: "#c8c0b0", lineHeight: 1.7, marginBottom: 16 }}>no one in the store has ever mentioned it. not Eleff. not Elbee. not the customers. not even once.</div>
            <div style={{ fontFamily: "Inconsolata,monospace", fontSize: 11, color: E.muted }}>click anywhere to close</div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", padding: "20px", fontFamily: "Inconsolata,monospace", fontSize: 9, color: E.muted, borderTop: `1px solid ${E.border}`, marginTop: 12 }}>
        🐨 koalabook · the front page of the eucalyptus internet · Providence, RI (Narragansett Country) · published anonymously as Peach · proceeds to nature & homeless causes
      </div>
    </div>
  );
}
