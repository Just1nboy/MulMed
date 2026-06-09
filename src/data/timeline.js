export const timelineEras = [
  { id: "origins", label: "Origins", range: "Before 1200", summary: "Ritual performance and imported epics begin forming a distinctly Javanese tradition." },
  { id: "adaptation", label: "Adaptation", range: "1200-1700", summary: "New religious, regional, and artistic influences reshape wayang without replacing it." },
  { id: "courts", label: "Court Traditions", range: "1700-1900", summary: "Royal patronage formalizes performance styles and supports generations of artists." },
  { id: "modern", label: "Modern Identity", range: "1900-Present", summary: "Wayang becomes a national symbol while artists continue adapting it for new audiences." },
];

export const timelineCategories = ["All", "Performance", "Stories", "Religion", "Politics", "Recognition"];

export const timelineEvents = [
  {
    id: "earliest-evidence", era: "origins", year: "~800 CE", title: "Earliest Written Evidence", category: "Performance", region: "Central Java",
    description: "The Balitung inscription refers to a performer called Galigi presenting a wayang story. It is one of the earliest written clues that wayang was already established in Javanese court culture.",
    change: "A performance tradition that may have circulated orally enters the surviving written record.",
    significance: "The inscription shows that wayang's history reaches back more than a thousand years, although its exact origins remain debated.",
    relatedTerms: ["Dalang", "Lakon", "Keraton"], relatedType: "wayang-kulit",
  },
  {
    id: "epic-adaptation", era: "origins", year: "~900-1200", title: "Indian Epics Become Javanese Stories", category: "Stories", region: "Java",
    description: "The Mahabharata and Ramayana circulate through Hindu-Buddhist kingdoms. Poets and performers reinterpret them through local languages, values, characters, and settings.",
    change: "Imported epics become flexible story worlds rather than fixed retellings.",
    significance: "This ability to absorb outside ideas while expressing local wisdom becomes one of wayang's defining strengths.",
    relatedTerms: ["Mahabharata", "Ramayana", "Lakon"], relatedType: "wayang-kulit",
  },
  {
    id: "kulit-stage", era: "origins", year: "~1000s", title: "The Shadow Stage Takes Shape", category: "Performance", region: "Java",
    description: "Leather puppets, a screen, a lamp, and musical accompaniment develop into the recognizable Wayang Kulit performance environment.",
    change: "Light, silhouette, movement, narration, and music combine into one theatrical language.",
    significance: "The audience can read both the puppet's decorated form and its shadow, creating two ways of experiencing the same performance.",
    relatedTerms: ["Kelir", "Blencong", "Gamelan", "Gunungan / Kayon"], relatedType: "wayang-kulit",
  },
  {
    id: "islamic-courts", era: "adaptation", year: "~1400-1600s", title: "Wayang Adapts Within Islamic Java", category: "Religion", region: "Java",
    description: "As Islamic courts and communities grow, performers continue using wayang while adding new interpretations, ethical teachings, and devotional meanings.",
    change: "Wayang remains culturally important across a major religious transformation.",
    significance: "Rather than belonging to only one period or belief system, wayang becomes a medium through which communities negotiate continuity and change.",
    relatedTerms: ["Dalang", "Lakon"], relatedType: "wayang-kulit",
  },
  {
    id: "golek-emerges", era: "adaptation", year: "~1500-1800s", title: "Wayang Golek Develops in Sunda", category: "Performance", region: "West Java",
    description: "Three-dimensional wooden rod puppets become a major Sundanese performance tradition. Their carved faces, costumes, and rotating heads are presented directly to the audience.",
    change: "The puppet moves from shadow silhouette into a fully visible, three-dimensional performer.",
    significance: "Wayang Golek demonstrates that wayang is a family of related traditions, not a single visual form.",
    relatedTerms: ["Wayang Golek", "Gamelan", "Sinden"], relatedType: "wayang-golek",
  },
  {
    id: "orang-courts", era: "adaptation", year: "~1700s", title: "Wayang Orang Enters the Court", category: "Performance", region: "Surakarta & Yogyakarta",
    description: "Court dancers embody wayang characters through stylized movement, costume, dialogue, and music.",
    change: "Human performers translate the visual language of puppets into dance drama.",
    significance: "The form reveals that wayang is also a way of moving, speaking, and representing character.",
    relatedTerms: ["Wayang Orang", "Keraton", "Gamelan"], relatedType: "wayang-orang",
  },
  {
    id: "giyanti", era: "courts", year: "1755", title: "Court Patronage Expands", category: "Politics", region: "Surakarta & Yogyakarta",
    description: "After the Treaty of Giyanti divides the Mataram Sultanate, the successor courts develop distinct artistic identities and support their own performance traditions.",
    change: "Regional court styles become more formally distinguished.",
    significance: "Court patronage preserves complex artistic knowledge, while also shaping which styles receive prestige and documentation.",
    relatedTerms: ["Keraton", "Dalang", "Wayang Orang"], relatedType: "wayang-orang",
  },
  {
    id: "independence", era: "modern", year: "1945 onward", title: "Wayang and National Identity", category: "Politics", region: "Indonesia",
    description: "After Indonesian independence, wayang is promoted as part of national culture. Dalang also use familiar characters to discuss contemporary social and political life.",
    change: "A collection of regional traditions becomes part of a shared national cultural story.",
    significance: "Wayang's characters and moral conflicts remain useful for discussing new problems, not only preserving old stories.",
    relatedTerms: ["Dalang", "Lakon", "Gunungan / Kayon"], relatedType: "wayang-kulit",
  },
  {
    id: "unesco", era: "modern", year: "2003", title: "UNESCO Recognition", category: "Recognition", region: "International",
    description: "UNESCO proclaims the Wayang Puppet Theatre a Masterpiece of the Oral and Intangible Heritage of Humanity. It is incorporated into the Representative List in 2008.",
    change: "Wayang receives major international recognition as living cultural heritage.",
    significance: "Recognition raises visibility and preservation support, while emphasizing that heritage survives through practicing communities.",
    relatedTerms: ["Dalang", "Gamelan", "Wayang Kulit", "Wayang Golek"], relatedType: "wayang-kulit",
  },
  {
    id: "contemporary", era: "modern", year: "Present", title: "Contemporary Artists Reframe Wayang", category: "Performance", region: "Indonesia & beyond",
    description: "Artists experiment with shorter shows, new stories, digital projection, education, animation, and online performance while maintaining links to traditional practice.",
    change: "Wayang enters new stages, formats, and conversations.",
    significance: "Adaptation is not separate from tradition. It is one of the ways wayang has remained meaningful across centuries.",
    relatedTerms: ["Dalang", "Lakon", "Kelir"], relatedType: "wayang-kulit",
  },
];
