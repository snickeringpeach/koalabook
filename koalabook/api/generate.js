const WORLD_BIBLE = `You are generating posts for KOALABOOK — the social network of Adventures in Koala Space (AIKS), set in a heightened Providence, RI where all institutions are run by animals. Published anonymously as "Peach." Proceeds to nature & homeless causes.

WORLD RULES:
- ALL mathematics exclusively in ℂ. Real-only proofs are incomplete and embarrassing.
- Providence RI is the center of the universe. The main river has no agreed name. This is correct.
- Koala HQ = AMS on Charles St. Brown School = university. Grey School = RISD. Whale Academy = culinary school.
- Alpha roos run the physics department. Outdoor tree-based classes are normal. Perch seating in cafés.
- Math pantheon: Euler, Riemann, Taniyama, Lax, Hamilton (turtle), Perelman (baboon).
- There is a Babar figurine in Eleff's store. It is NEVER acknowledged by anyone.
- Wogga Space: a dimension inhabited by Wogga, a drop bear who achieved enlightenment through veganism and now runs a gym. Orthogonal to all other spaces. Extremely intense about recovery.

ORTHOGONAL SPACES:
- Koala Space: Providence RI everyday life, Brown School, Wickenden St, unnamed river
- Roo Space: physics dept, alpha roos, kinetic coordinate systems, orthogonal to eucalyptus manifold
- Mycelial Space: underground network, no center, distributed intelligence, spore logic
- Eucalyptus Space: mathematical contemplation, Brian Cole's domain, all reasoning in ℂ
- Plum Space: Plum Village dimension, yin, stillness, interbeing, Deep Plum's realm
- Vinyl Space: record store, Isafaze label, Wickenden St underground, mixtapes
- Roo Physics Annex: where roos and koalas debate the nature of spacetime
- Paradise/Bermuda Space: warm-weather koala cousins, offshore transmissions
- Wogga Space: drop bear enlightenment, vegan gym, recovery protocols, extreme wellness

CAST: Olivia (koala, math student), Brian Cole (koala, emeritus prof, eucalyptus trees, ℂ only), Lionel (koala, Rastafarian barista, tree perches), Eleff (elephant, record store, never acknowledges Babar figurine), Elbee (roo-goose, Eleff's partner, lives in store), Emma (echidna, poet, East Side collective), Mysilliam (fungi, mycologist, multiple grows), Deep Plum (koala, Plum Village monk), Ted (tarsier, Brown chair), Butter (koala, mixtape curator), Walnut (wombat, taxi driver), Nona (cuttlefish, digital media Grey School), Snickering Peach (trickster, chaos), Leah (koala, professor), Dilla (koala, producer odd time), Carmine (80yo Italian gay koala), Jackson (koala, therapist), Tim (otter, skateboard sculptor), Oscar (fox, gets things done), Jah (lion, spiritual anchor), Perelman (baboon, reclusive genius), Hamilton (turtle, math pantheon), Zola (bonobo, linguist), Eamon (crab, Isafaze), Mr. G (koala, bucket hat), Garfield (koala, mystic DJ), John (koala, disco legend Miami), Bruce (roo, alpha, physics), Wogga (drop bear, vegan gym instructor, achieved enlightenment, Wogga Space).

TONE: Specific, personal, funny, occasionally profound. Each character has a DISTINCT voice. No generic AI slop. Humor from specificity. Warm, weird, deeply real.`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { character, context } = req.body;
  if (!character) return res.status(400).json({ error: "Missing character" });

  const contextNote = context ? `\n\nCURRENT CONTEXT: ${context}` : "";

  const userMsg = `Generate a Koalabook post written by ${character.name} (${character.species}, ${character.role}${character.backstory ? ". " + character.backstory : ""}).${contextNote}

Make it hyper-specific to their voice. Surprise us. The post should feel like only this character could have written it right now.

Respond ONLY with JSON (no backticks, no preamble):
{"title": "...", "body": "...", "subpouch": "one of: mathematics|vinyl|eucalyptus_café|eastside_poets|mycology|philosophy|providence|mixtapes|physics|roo_space|plum_village|bermuda|wogga", "space": "one of: koala|roo|mycelial|eucalyptus|plum|vinyl|roo_physics|bermuda|wogga"}

Body: 3-6 sentences. No markdown. Pure voice.`;

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
        system: WORLD_BIBLE,
        messages: [{ role: "user", content: userMsg }]
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
