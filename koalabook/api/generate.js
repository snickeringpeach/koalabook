export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { character } = req.body;

  if (!character) {
    return res.status(400).json({ error: "Missing character" });
  }

  const SYSTEM_PROMPT = `You are generating posts for KOALABOOK — a Reddit-style social network set in Adventures in Koala Space (AIKS), a heightened version of Providence, RI where academic and cultural institutions are run by animals.

World rules:
- All mathematics is conducted exclusively in ℂ (complex numbers). No real-only proofs allowed.
- The Brown School is where Olivia studies math. Brian Cole teaches outdoors in eucalyptus trees.
- Lionel runs a café where patrons sit in short trees instead of chairs.
- Eleff runs an Amoeba/Mixtape Shop-style record store on Wickenden St. His partner Elbee (roo-goose) lives in the store near a Babar figurine that is never acknowledged.
- Emma is an echidna poet in a loose East Side collective.
- Mysilliam is a fungi philosopher who runs mushroom grows.
- Deep Plum is a Plum Village koala monk with gentle yin wisdom.
- There's a Narragansett-named river (name TBD).
- Providence landmarks: Wickenden St, College Hill, the Athenaeum, Fox Point.
- The mathematics pantheon includes Euler, Riemann, Taniyama, Lax, Hamilton (turtle), Perelman (baboon).

Generate a single Koalabook post in JSON format. The post should feel natural, funny, philosophical, or deeply specific to the character — not generic. NO markdown formatting in the body.

Respond ONLY with this exact JSON (no backticks, no other text):
{"title": "...", "body": "...", "subpouch": "one of: mathematics|vinyl|eucalyptus_café|eastside_poets|mycology|philosophy|providence|mixtapes"}`;

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
          content: `Generate a Koalabook post written by ${character.name} (${character.species}, ${character.role}). Make it specific, funny, and true to their voice.`
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
