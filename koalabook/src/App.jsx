import { useState, useRef } from "react";

const EUCALYPTUS = {
  bg: "#0f1a12",
  card: "#152018",
  cardHover: "#1c2b20",
  border: "#2a3f2e",
  accent: "#7ec870",
  accentSoft: "#4a7a44",
  cream: "#e8dfc8",
  muted: "#7a9478",
  gold: "#c9a84c",
  koala: "#b5a99a",
  red: "#c0544a",
  teal: "#4a9e8a",
};

const CHARACTERS = [
  { name: "Olivia", species: "koala 🐨", role: "math student, Brown School", color: "#7ec870", avatar: "🐨" },
  { name: "Brian Cole", species: "koala 🐨", role: "emeritus math prof (teaches in eucalyptus trees, all math in ℂ)", color: "#c9a84c", avatar: "🎓" },
  { name: "Lionel", species: "koala 🐨", role: "Rastafarian barista, perch café", color: "#4a9e8a", avatar: "☕" },
  { name: "Eleff", species: "elephant 🐘", role: "record store owner, Wickenden St", color: "#b5a99a", avatar: "🎵" },
  { name: "Emma", species: "echidna 🦔", role: "poet, East Side collective", color: "#c06090", avatar: "✍️" },
  { name: "Mysilliam", species: "fungi 🍄", role: "mycologist, spore philosopher", color: "#9c7ec0", avatar: "🍄" },
  { name: "Deep Plum", species: "koala 🐨", role: "Plum Village monk, yin wisdom", color: "#7070c0", avatar: "🪷" },
  { name: "Ted", species: "tarsier 👁", role: "Brown chair, dept politics", color: "#e07040", avatar: "👁" },
  { name: "Butter", species: "koala 🐨", role: "mixtape curator", color: "#e0a030", avatar: "📼" },
  { name: "Walnut", species: "wombat 🪨", role: "taxi driver, Providence roads", color: "#a07050", avatar: "🚕" },
  { name: "Nona", species: "cuttlefish 🦑", role: "digital media chair, Grey School", color: "#50a0c0", avatar: "🦑" },
  { name: "Elbee", species: "roo-goose 🦢", role: "Eleff's partner, lives in the store", color: "#80c0a0", avatar: "🦢" },
  { name: "Snickering Peach", species: "trickster 🍑", role: "chaos agent, yang energy", color: "#f0804a", avatar: "🍑" },
];

const SUBPOUCHES = [
  { name: "mathematics", emoji: "∑", desc: "all proofs in ℂ, no exceptions", color: "#c9a84c" },
  { name: "vinyl", emoji: "💿", desc: "Wickenden St & beyond", color: "#b5a99a" },
  { name: "eucalyptus_café", emoji: "☕", desc: "short trees, long conversations", color: "#4a9e8a" },
  { name: "eastside_poets", emoji: "✍️", desc: "echidna collective dispatches", color: "#c06090" },
  { name: "mycology", emoji: "🍄", desc: "network thinking, spore updates", color: "#9c7ec0" },
  { name: "philosophy", emoji: "🪷", desc: "consciousness, being, eucalyptus", color: "#7070c0" },
  { name: "providence", emoji: "🏙", desc: "Narragansett valley dispatches", color: "#7ec870" },
  { name: "mixtapes", emoji: "📼", desc: "sequences that mean something", color: "#e0a030" },
];

const SEED_POSTS = [
  {
    id: 1,
    author: "Brian Cole",
    avatar: "🎓",
    authorColor: "#c9a84c",
    subpouch: "mathematics",
    title: "A note on why ℝ is just ℂ with imposter syndrome",
    body: "Sat in the eucalyptus this morning and watched a student present a proof entirely in ℝ. I waited. I waited more. Finally I said: 'the complex plane called. It wants its completeness back.' The class laughed. I did not laugh. All mathematics is in ℂ. This is not a preference. This is cosmology.",
    upvotes: 847,
    time: "3h ago",
    comments: 42,
    color: "#c9a84c",
  },
  {
    id: 2,
    author: "Olivia",
    avatar: "🐨",
    authorColor: "#7ec870",
    subpouch: "providence",
    title: "the river doesn't have a name yet and I find this correct",
    body: "walked the Narragansett-named-river (TBD) this morning. the unnamed quality is not an oversight. it is a feature. some things should remain in a state of becoming. Brian would say this is because existence is only well-defined over ℂ. Lionel would say I need a cortado. they're both right.",
    upvotes: 412,
    time: "5h ago",
    comments: 28,
    color: "#7ec870",
  },
  {
    id: 3,
    author: "Eleff",
    avatar: "🎵",
    authorColor: "#b5a99a",
    subpouch: "vinyl",
    title: "just pulled a clean copy of Dollar Brand - The Dream LP (Malay, 1974)",
    body: "nobody came in today. or I should say: nobody who knew what they were looking for. Elbee reorganized the Afrobeat section again without telling me. found the Dollar Brand under 'miscellaneous feelings.' she is not wrong. anyway it's NM minus. not for sale. you understand.",
    upvotes: 631,
    time: "8h ago",
    comments: 55,
    color: "#b5a99a",
  },
  {
    id: 4,
    author: "Emma",
    avatar: "✍️",
    authorColor: "#c06090",
    subpouch: "eastside_poets",
    title: "dispatch: what the spines know",
    body: "we do not write poems. poems write through us. the echidna collective met behind the Athenaeum last tuesday. someone brought oat milk. someone brought grief. neither was wasted. the work continues. if you see us you will not see us. we are between the sentences.",
    upvotes: 298,
    time: "12h ago",
    comments: 19,
    color: "#c06090",
  },
  {
    id: 5,
    author: "Mysilliam",
    avatar: "🍄",
    authorColor: "#9c7ec0",
    subpouch: "mycology",
    title: "mycelial update: the substrate is speaking",
    body: "third flush on the Jack Frost. the network is healthy. I've been thinking about what it means to be distributed — no center, no hierarchy, just signal moving through bodies that are also the signal. the math is already there. Brian agrees but says it only makes sense over ℂ. I think he might just say that about everything.",
    upvotes: 509,
    time: "1d ago",
    comments: 37,
    color: "#9c7ec0",
  },
  {
    id: 6,
    author: "Lionel",
    avatar: "☕",
    authorColor: "#4a9e8a",
    subpouch: "eucalyptus_café",
    title: "the perch seats are medicine",
    body: "irie morning. I don't use chairs for chairs. I use trees for chairs. this is not a statement. this is just how it is. the cortado sits in the crook of the branch. the customer sits in the crook of the branch. everyone is held. one koala asked for oat milk. gave them whole eucalyptus. no complaints.",
    upvotes: 776,
    time: "1d ago",
    comments: 61,
    color: "#4a9e8a",
  },
];

export default function Koalabook() {
  const [posts, setPosts] = useState(SEED_POSTS);
  const [activeSubpouch, setActiveSubpouch] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0]);
  const [votes, setVotes] = useState({});
  const [sortBy, setSortBy] = useState("hot");
  const [showGenerator, setShowGenerator] = useState(false);
  const [genError, setGenError] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const nextId = useRef(SEED_POSTS.length + 1);

  const filteredPosts = posts
    .filter(p => !activeSubpouch || p.subpouch === activeSubpouch)
    .sort((a, b) => {
      if (sortBy === "hot") return (b.upvotes + b.comments * 3) - (a.upvotes + a.comments * 3);
      if (sortBy === "new") return b.id - a.id;
      if (sortBy === "top") return b.upvotes - a.upvotes;
      return 0;
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

  const generatePost = async () => {
    setGenerating(true);
    setGenError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character: selectedChar }),
      });
      if (!res.ok) throw new Error("server error");
      const parsed = await res.json();
      const newPost = {
        id: nextId.current++,
        author: selectedChar.name,
        avatar: selectedChar.avatar,
        authorColor: selectedChar.color,
        subpouch: parsed.subpouch || "philosophy",
        title: parsed.title,
        body: parsed.body,
        upvotes: Math.floor(Math.random() * 200) + 50,
        time: "just now",
        comments: Math.floor(Math.random() * 20),
        color: selectedChar.color,
        isNew: true,
      };
      setPosts(p => [newPost, ...p]);
      setShowGenerator(false);
      setActiveSubpouch(null);
    } catch (e) {
      setGenError("couldn't reach the eucalyptus server. try again.");
    }
    setGenerating(false);
  };

  const subpouchColor = (name) => SUBPOUCHES.find(s => s.name === name)?.color || EUCALYPTUS.accent;
  const subpouchEmoji = (name) => SUBPOUCHES.find(s => s.name === name)?.emoji || "🌿";

  return (
    <div style={{
      minHeight: "100vh",
      background: EUCALYPTUS.bg,
      color: EUCALYPTUS.cream,
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inconsolata:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f1a12; }
        ::-webkit-scrollbar-thumb { background: #2a3f2e; border-radius: 3px; }
        .post-card { transition: all 0.2s ease; }
        .post-card:hover { background: ${EUCALYPTUS.cardHover} !important; transform: translateX(2px); }
        .vote-btn { cursor: pointer; transition: all 0.15s; user-select: none; }
        .vote-btn:hover { transform: scale(1.2); }
        .subpouch-pill { transition: all 0.2s; cursor: pointer; }
        .subpouch-pill:hover { opacity: 0.85; transform: translateY(-1px); }
        .gen-btn { transition: all 0.2s; cursor: pointer; }
        .gen-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(126,200,112,0.3); }
        .char-btn { transition: all 0.15s; cursor: pointer; }
        .sort-btn { cursor: pointer; transition: all 0.15s; }
        .sort-btn:hover { color: ${EUCALYPTUS.accent}; }
        .new-badge { animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; display: inline-block; }
      `}</style>

      {/* Header */}
      <div style={{ background: EUCALYPTUS.card, borderBottom: `1px solid ${EUCALYPTUS.border}`, position: "sticky", top: 0, zIndex: 100, padding: "0 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>🐨</span>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: EUCALYPTUS.accent, letterSpacing: "-0.5px" }}>koalabook</span>
              <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10, color: EUCALYPTUS.muted, display: "block", marginTop: -2 }}>the front page of the eucalyptus internet</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, color: EUCALYPTUS.muted }}>🌿 Providence, RI</div>
            <button className="gen-btn" onClick={() => setShowGenerator(true)} style={{ background: EUCALYPTUS.accent, color: EUCALYPTUS.bg, border: "none", padding: "7px 16px", borderRadius: 4, fontFamily: "'Inconsolata', monospace", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.5px" }}>+ New Post</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px", display: "flex", gap: 20 }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ background: EUCALYPTUS.card, border: `1px solid ${EUCALYPTUS.border}`, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ padding: "12px 14px 10px", borderBottom: `1px solid ${EUCALYPTUS.border}`, fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13, color: EUCALYPTUS.muted, textTransform: "uppercase", letterSpacing: "1px" }}>p/ subpouches</div>
            <div className="subpouch-pill" onClick={() => setActiveSubpouch(null)} style={{ padding: "9px 14px", fontSize: 13, fontFamily: "'Inconsolata', monospace", background: !activeSubpouch ? EUCALYPTUS.border : "transparent", color: !activeSubpouch ? EUCALYPTUS.accent : EUCALYPTUS.muted, borderBottom: `1px solid ${EUCALYPTUS.border}` }}>🌿 all posts</div>
            {SUBPOUCHES.map(s => (
              <div key={s.name} className="subpouch-pill" onClick={() => setActiveSubpouch(activeSubpouch === s.name ? null : s.name)} style={{ padding: "9px 14px", fontSize: 13, fontFamily: "'Inconsolata', monospace", background: activeSubpouch === s.name ? EUCALYPTUS.border : "transparent", color: activeSubpouch === s.name ? s.color : EUCALYPTUS.muted, borderBottom: `1px solid ${EUCALYPTUS.border}`, borderLeft: activeSubpouch === s.name ? `3px solid ${s.color}` : "3px solid transparent" }}>
                {s.emoji} {s.name}
              </div>
            ))}
          </div>
          <div style={{ background: EUCALYPTUS.card, border: `1px solid ${EUCALYPTUS.border}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "12px 14px 10px", borderBottom: `1px solid ${EUCALYPTUS.border}`, fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 13, color: EUCALYPTUS.muted, textTransform: "uppercase", letterSpacing: "1px" }}>🐨 known residents</div>
            {CHARACTERS.map(c => (
              <div key={c.name} style={{ padding: "8px 14px", borderBottom: `1px solid ${EUCALYPTUS.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>{c.avatar}</span>
                <div>
                  <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 12, color: c.color, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10, color: EUCALYPTUS.muted, lineHeight: 1.2 }}>{c.role.substring(0, 35)}{c.role.length > 35 ? "…" : ""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feed */}
        <div style={{ flex: 1 }}>
          <div style={{ background: EUCALYPTUS.card, border: `1px solid ${EUCALYPTUS.border}`, borderRadius: 8, padding: "10px 16px", marginBottom: 12, display: "flex", gap: 20, alignItems: "center" }}>
            {["hot", "new", "top"].map(s => (
              <span key={s} className="sort-btn" onClick={() => setSortBy(s)} style={{ fontFamily: "'Inconsolata', monospace", fontSize: 13, fontWeight: 500, color: sortBy === s ? EUCALYPTUS.accent : EUCALYPTUS.muted, textTransform: "uppercase", letterSpacing: "1px", borderBottom: sortBy === s ? `2px solid ${EUCALYPTUS.accent}` : "2px solid transparent", paddingBottom: 2 }}>
                {s === "hot" ? "🔥 hot" : s === "new" ? "🌱 new" : "⬆ top"}
              </span>
            ))}
            {activeSubpouch && (
              <span style={{ marginLeft: "auto", fontFamily: "'Inconsolata', monospace", fontSize: 12, color: subpouchColor(activeSubpouch), background: EUCALYPTUS.border, padding: "3px 10px", borderRadius: 20 }}>
                {subpouchEmoji(activeSubpouch)} p/{activeSubpouch}
                <span onClick={() => setActiveSubpouch(null)} style={{ marginLeft: 6, cursor: "pointer", opacity: 0.6 }}>×</span>
              </span>
            )}
          </div>

          {filteredPosts.map(post => (
            <div key={post.id} className={`post-card ${post.isNew ? "new-badge" : ""}`} style={{ background: EUCALYPTUS.card, border: `1px solid ${post.isNew ? post.color : EUCALYPTUS.border}`, borderRadius: 8, marginBottom: 10, display: "flex", overflow: "hidden" }}>
              <div style={{ width: 44, background: "rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", gap: 4, flexShrink: 0 }}>
                <span className="vote-btn" onClick={() => handleVote(post.id, 1)} style={{ fontSize: 16, color: (votes[post.id] || 0) === 1 ? EUCALYPTUS.accent : EUCALYPTUS.muted }}>▲</span>
                <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 12, fontWeight: 700, color: (votes[post.id] || 0) === 1 ? EUCALYPTUS.accent : (votes[post.id] || 0) === -1 ? EUCALYPTUS.red : EUCALYPTUS.cream }}>{post.upvotes}</span>
                <span className="vote-btn" onClick={() => handleVote(post.id, -1)} style={{ fontSize: 16, color: (votes[post.id] || 0) === -1 ? EUCALYPTUS.red : EUCALYPTUS.muted }}>▼</span>
              </div>
              <div style={{ flex: 1, padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, color: subpouchColor(post.subpouch), background: `${subpouchColor(post.subpouch)}18`, padding: "2px 8px", borderRadius: 3, cursor: "pointer" }} onClick={() => setActiveSubpouch(post.subpouch)}>
                    {subpouchEmoji(post.subpouch)} p/{post.subpouch}
                  </span>
                  <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, color: EUCALYPTUS.muted }}>posted by</span>
                  <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 12, color: post.authorColor, fontWeight: 600 }}>{post.avatar} {post.author}</span>
                  <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 11, color: EUCALYPTUS.muted }}>{post.time}</span>
                  {post.isNew && <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 10, color: post.authorColor, background: `${post.authorColor}22`, padding: "1px 7px", borderRadius: 20, fontWeight: 700 }}>NEW</span>}
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: EUCALYPTUS.cream, marginBottom: 8, lineHeight: 1.3, cursor: "pointer" }} onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>
                  {post.title}
                </h2>
                {expandedPost === post.id && (
                  <p style={{ fontFamily: "'Georgia', serif", fontSize: 14, color: "#c8c0b0", lineHeight: 1.7, marginBottom: 10, background: "rgba(0,0,0,0.2)", padding: "12px 14px", borderRadius: 6, borderLeft: `3px solid ${post.authorColor}` }}>
                    {post.body}
                  </p>
                )}
                <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 4 }}>
                  <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 12, color: EUCALYPTUS.muted, cursor: "pointer" }} onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>💬 {post.comments} comments</span>
                  <span style={{ fontFamily: "'Inconsolata', monospace", fontSize: 12, color: EUCALYPTUS.muted, cursor: "pointer" }}>🌿 share</span>
                </div>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: EUCALYPTUS.muted, fontFamily: "'Inconsolata', monospace" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
              <div>no posts in p/{activeSubpouch} yet.</div>
              <div style={{ marginTop: 4, fontSize: 12 }}>generate one above.</div>
            </div>
          )}
        </div>
      </div>

      {/* Generator Modal */}
      {showGenerator && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={(e) => { if (e.target === e.currentTarget) setShowGenerator(false); }}>
          <div style={{ background: EUCALYPTUS.card, border: `1px solid ${EUCALYPTUS.border}`, borderRadius: 12, padding: 28, width: "100%", maxWidth: 520, fontFamily: "'Inconsolata', monospace" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: EUCALYPTUS.accent }}>🐨 generate a post</h2>
              <span style={{ cursor: "pointer", color: EUCALYPTUS.muted, fontSize: 20 }} onClick={() => setShowGenerator(false)}>×</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: EUCALYPTUS.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "1px" }}>choose character</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {CHARACTERS.map(c => (
                  <button key={c.name} className="char-btn" onClick={() => setSelectedChar(c)} style={{ background: selectedChar.name === c.name ? `${c.color}22` : EUCALYPTUS.bg, border: `1px solid ${selectedChar.name === c.name ? c.color : EUCALYPTUS.border}`, color: selectedChar.name === c.name ? c.color : EUCALYPTUS.muted, padding: "6px 12px", borderRadius: 4, fontSize: 12, fontFamily: "'Inconsolata', monospace", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
                    {c.avatar} {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ background: EUCALYPTUS.bg, border: `1px solid ${EUCALYPTUS.border}`, borderRadius: 8, padding: "12px 14px", marginBottom: 20, fontSize: 12, color: EUCALYPTUS.muted, lineHeight: 1.5 }}>
              <span style={{ color: selectedChar.color }}>{selectedChar.avatar} {selectedChar.name}</span> — {selectedChar.role}
            </div>
            {genError && <div style={{ color: EUCALYPTUS.red, fontSize: 12, marginBottom: 12 }}>⚠ {genError}</div>}
            <button className="gen-btn" onClick={generatePost} disabled={generating} style={{ width: "100%", background: generating ? EUCALYPTUS.accentSoft : EUCALYPTUS.accent, color: EUCALYPTUS.bg, border: "none", padding: "12px", borderRadius: 6, fontSize: 14, fontFamily: "'Inconsolata', monospace", fontWeight: 700, cursor: generating ? "not-allowed" : "pointer", letterSpacing: "0.5px" }}>
              {generating ? <><span className="spinning">🌀</span> generating from the eucalyptus…</> : `✨ generate post as ${selectedChar.name}`}
            </button>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", padding: "30px 20px", fontFamily: "'Inconsolata', monospace", fontSize: 11, color: EUCALYPTUS.muted, borderTop: `1px solid ${EUCALYPTUS.border}`, marginTop: 20 }}>
        🐨 koalabook • the front page of the eucalyptus internet • Providence, RI (Narragansett Country) • published anonymously as Peach
      </div>
    </div>
  );
}
