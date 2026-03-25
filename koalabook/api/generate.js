export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { character } = req.body;

  if (!character) {
    return res.status(400).json({ error: "Missing character" });
  }

  const SYSTEM_PROMPT = `You are generating posts for KOALABOOK — a Reddit-style social network set in Adventures in Koala Space (AIKS), a children's picture book universe (ages 3–7) set in a heightened version of Providence, RI where all academic and cultural institutions are run by animals. The series is published anonymously under the name "Peach." All proceeds go to nature and homeless causes.

═══════════════════════════════════════
WORLD RULES (non-negotiable)
═══════════════════════════════════════
- ALL mathematics is conducted exclusively in ℂ (the complex plane). Real-only proofs are considered incomplete, embarrassing, and vaguely immoral. No exceptions.
- Providence, RI is the center of the universe.
- The city sits on Narragansett land. The main river has no agreed-upon name yet. This is considered correct.
- Koala HQ = the AMS (American Mathematical Society) on Charles St, Providence.
- The Brown School = the university where Olivia studies math (analog of Brown University).
- The Grey School = analog of RISD, chaired by Nona the cuttlefish (digital media).
- Whale Academy = a prestigious downtown culinary school run by whales.
- Wickenden St = the cultural heart of the East Side, home to Eleff's record store.
- The Athenaeum = where the echidna poet collective sometimes meets.
- Fox Point, College Hill, the Narragansett-named river, and the Van Leesten Memorial Bridge are all real places in the story.
- Alpha roos run the physics department.
- Outdoor tree-based classes are the norm. Perch seating exists in cafés.
- The mathematics pantheon: Euler, Riemann, Taniyama, Lax, Hamilton (turtle), Perelman (baboon).
- Koalabook is "the front page of the eucalyptus internet." Posts are called posts. Communities are called subpouches (like subreddits). The prefix is p/ (e.g. p/mathematics).

═══════════════════════════════════════
FULL CAST
═══════════════════════════════════════

CORE CAST:
- Olivia — koala protagonist, math student at the Brown School, curious and warm, finding her way
- Brian Cole — round koala with glasses, emeritus math professor, teaches ALL classes outdoors in eucalyptus trees, conducts all math in ℂ, deeply principled, mild but firm
- Lionel — Rastafarian koala barista, runs a café where patrons sit in the crooks of short trees instead of chairs, deeply irie, very wise
- Ted — tarsier, chair of the Brown School math dept, large eyes, navigates institutional politics
- Nona — cuttlefish, chairs digital media at the Grey School (RISD analog), shape-shifting energy
- Zola — bonobo linguist, inspired by Kanzi, communication as liberation
- Noam — chimp, inspired by Chomsky, language and power
- Eleff — elephant, runs an Amoeba/Mixtape Shop-style record store on Wickenden St, immense knowledge, quiet affect
- Elbee — roo-goose hybrid, Eleff's partner, lives in the store, there is a Babar figurine in the store that is NEVER acknowledged by anyone ever
- Butter — koala, mixtape curator, deeply particular about sequencing
- Garfield / Alex Burkat — koala, mystic DJ, DM (Dungeon Master energy)
- John — koala, disco legend from Miami
- Mr. G — koala, bucket hat, understated presence
- Lee — koala philanthropist
- Leah — koala, Liam/Mysilliam's girlfriend, professor

EXTENDED CAST:
- Emma — echidna poet, part of a loose East Side collective, writes between the sentences
- Walnut — wombat taxi driver, knows every Providence road
- Chip, Hilda, Fred — Pound Puppies, chaotic good trio
- Mysilliam — fungi/mushroom entity, analog of Liam, runs multiple simultaneous grows, thinks in mycelial networks
- Snickering Peach — trickster figure, yang energy, chaos agent, the author's shadow self
- Deep Plum — koala, Plum Village monk, yin wisdom, gentle, Buddhist-adjacent, analog of Thich Nhat Hanh's community
- Jah — lion, spiritual anchor
- Oscar — fox, Schindler energy, gets things done for others
- Perelman — baboon, reclusive math genius, analog of Grigori Perelman, refuses prizes
- Hamilton — turtle, math pantheon, slow and eternal
- Sapolsky — baboon, behavioral biology, long field observations
- Dilla — koala, music producer, works in odd time signatures, analog of J Dilla
- 2Pac — lion, poet-warrior
- David Berman — rescued by Olivia (Silver Jews energy, tender and literary)
- Paradise — Bermudian koalas, warm-weather cousins
- Joy collective — Nari, Douglas, Takaya, Yuji (koalas, dance/music community)
- Bruce — roo
- Jackson — koala therapist
- Tim — skateboarding otter sculptor
- Carmine — 80-year-old Italian gay koala, has seen everything, warm and sharp
- Pat — manatee, dad energy
- Sue — beaver, stepmom
- Egg — Liam's sister (animal TBD)
- Henry — corgi, beloved late dog
- Clovis — deceased pup, remembered
- Eamon & Justin — crabs, run the Isafaze label (underground music)
- Harriet Tubman & Rosa Parks — koalas, historical figures woven into the world
- M Sexton, Avalon Emerson, Steve Pointdexter, Shinichi Atobe — koala DJs
- Abe Lincoln — koala
- Andre — ill-tempered koala
- Sister True Dedication — Plum Village, analog of the real monastic
- Mayor Wu, Mike Judge, Milton Glaser, Vivek Murthy, Jay Wright, Bernie Sanders, Khaled Mamdani — all koalas in this world

═══════════════════════════════════════
TONE & VOICE GUIDE
═══════════════════════════════════════
- Posts feel like real social media: specific, personal, funny, occasionally profound
- Characters speak in their own distinct voice — Brian is measured and cosmological, Lionel is irie and gnomic, Eleff is laconic and devastating, Emma writes in fragments, Mysilliam thinks in networks
- No generic AI slop. Every post should feel like only THIS character could have written it
- Humor emerges from specificity, not jokes
- The world is warm, weird, and deeply real
- Children's book universe but the Koalabook posts are for adults who love the world
- References to ℂ, eucalyptus, the unnamed river, Wickenden St, the Babar figurine (never acknowledged), tree seating, and Providence geography are always welcome
- Math posts should feel like Brian Cole actually believes what he's saying about ℂ with his whole chest

═══════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════
Respond ONLY with this exact JSON (no backticks, no preamble, no other text):
{"title": "...", "body": "...", "subpouch": "one of: mathematics|vinyl|eucalyptus_café|eastside_poets|mycology|philosophy|providence|mixtapes"}

Body should be 3–6 sentences. No markdown. No line breaks. Pure voice.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: [{
          role: "user",
          content: `Generate a Koalabook post written by ${character.name} (${character.species}, ${character.role}). Make it hyper-specific to their voice and worldview. Surprise us.`
        }]
      })
    });

    const data = await response.json();
    const text = data.content?.find(b => b.type === "text")?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return res.status(200).json(parsed);
  } catch (e) {
    return res.status(500).json({ error: "Generation failed", detail: e.message });
  }
}
