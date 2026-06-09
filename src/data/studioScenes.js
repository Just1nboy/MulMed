export const studioScenes = [
  {
    id: "hanoman-alengka",
    title: "Hanoman Enters Alengka",
    epic: "Ramayana",
    typeId: "wayang-golek",
    setting: "Alengka palace garden",
    defaultMood: "mystery",
    characters: ["hanoman", "sinta", "rahwana"],
    initialPositions: {
      hanoman: { x: 22, y: 13, scale: 1.04, flip: false },
      sinta: { x: 54, y: 12, scale: 0.9, flip: true },
      rahwana: { x: 80, y: 12, scale: 1.05, flip: true },
    },
    summary:
      "Guide Hanoman as he searches Alengka, meets Sinta, and turns danger into a lesson about courage and loyalty.",
    moral:
      "Loyalty is strongest when it is paired with intelligence and self-control.",
    reflection:
      "If you were the dalang, would you play Hanoman's courage as loud and fiery, or quiet and patient? Why?",
    steps: [
      {
        title: "A Messenger Arrives",
        cue: "Move Hanoman quietly to the left side of the screen.",
        focus: "hanoman",
        mood: "mystery",
        targets: [
          {
            character: "hanoman",
            x: 16,
            y: 25,
            tolerance: 8,
            label: "Quiet entrance",
          },
        ],
        narration:
          "In the night air of Alengka, Hanoman searches not for glory, but for the truth of Sinta's fate.",
        learningPoint:
          "Wayang often teaches through action: a heroic character proves virtue through service, not just strength.",
      },
      {
        title: "Sinta Stands Firm",
        cue: "Bring Sinta forward and keep Rahwana distant.",
        focus: "sinta",
        mood: "devotion",
        targets: [
          {
            character: "sinta",
            x: 47,
            y: 25,
            tolerance: 8,
            label: "Sinta's resolve",
          },
        ],
        narration:
          "Sinta refuses luxury, power, and fear. Her stillness becomes stronger than the palace walls around her.",
        learningPoint:
          "Stillness can be dramatic in wayang. A dalang can show inner strength with slow, controlled movement.",
        decision: {
          question: "How should the dalang portray Sinta's strength?",
          choices: [
            {
              id: "quiet",
              label: "Quiet and unwavering",
              result: "Her stillness makes Rahwana's restless power look weaker.",
              insight: "Refined characters often communicate strength through controlled movement.",
            },
            {
              id: "defiant",
              label: "Loud and defiant",
              result: "The scene becomes more confrontational and shifts attention toward open conflict.",
              insight: "A valid modern interpretation, though it changes the traditional visual contrast.",
            },
          ],
        },
      },
      {
        title: "Rahwana's Threat",
        cue: "Move Rahwana closer, then switch to Shadow Play.",
        focus: "rahwana",
        mood: "battle",
        requiresShadowMode: true,
        targets: [
          {
            character: "rahwana",
            x: 62,
            y: 18,
            tolerance: 8,
            label: "Threat enters",
          },
        ],
        narration:
          "Rahwana's power fills the screen, but power without wisdom casts the darkest shadow.",
        learningPoint:
          "Antagonists in wayang are often complex. They may be brilliant, but their flaws reveal the moral warning.",
      },
      {
        title: "Fire Becomes a Signal",
        cue: "Move Hanoman across the stage quickly.",
        focus: "hanoman",
        mood: "victory",
        targets: [
          {
            character: "hanoman",
            x: 78,
            y: 27,
            tolerance: 8,
            label: "Hope crosses Alengka",
          },
        ],
        narration:
          "When Hanoman's tail is set aflame, he transforms punishment into a signal that hope has entered Alengka.",
        learningPoint:
          "Many wayang scenes turn danger into wisdom. The lesson is not only bravery, but presence of mind.",
      },
    ],
  },
  {
    id: "pandava-dharma",
    title: "The Pandava Choice",
    epic: "Mahabharata",
    typeId: "wayang-kulit",
    setting: "Before the Bharatayuddha war",
    defaultMood: "wisdom",
    characters: ["arjuna", "bima", "gatotkaca"],
    initialPositions: {
      arjuna: { x: 25, y: 12, scale: 0.98, flip: false },
      bima: { x: 50, y: 12, scale: 1.08, flip: false },
      gatotkaca: { x: 76, y: 14, scale: 1, flip: true },
    },
    summary:
      "Stage a quieter Mahabharata scene about duty, family, sacrifice, and the difficult choices behind heroism.",
    moral:
      "True courage is not the absence of doubt. It is choosing the right path after facing doubt honestly.",
    reflection:
      "Which character would you place at the center of the screen when the moral lesson is revealed?",
    steps: [
      {
        title: "Arjuna Hesitates",
        cue: "Place Arjuna near the center and lower the mood.",
        focus: "arjuna",
        mood: "wisdom",
        targets: [
          {
            character: "arjuna",
            x: 44,
            y: 20,
            tolerance: 8,
            label: "Center of doubt",
          },
        ],
        narration:
          "Arjuna sees the battlefield and feels the weight of family, duty, and consequence in a single breath.",
        learningPoint:
          "Wayang heroes are not flat symbols. Their doubts make the moral lesson more human.",
        decision: {
          question: "What should the audience feel during Arjuna's hesitation?",
          choices: [
            {
              id: "empathy",
              label: "Empathy for his doubt",
              result: "The audience sees moral courage beginning with honest uncertainty.",
              insight: "Wayang often makes heroes compelling by showing their inner conflict.",
            },
            {
              id: "urgency",
              label: "Urgency to act",
              result: "The scene emphasizes duty and the consequences of waiting.",
              insight: "Faster pacing strengthens tension but leaves less room for reflection.",
            },
          ],
        },
      },
      {
        title: "Bima Speaks Plainly",
        cue: "Move Bima beside Arjuna as a steady presence.",
        focus: "bima",
        mood: "devotion",
        targets: [
          {
            character: "bima",
            x: 55,
            y: 22,
            tolerance: 8,
            label: "Steady support",
          },
        ],
        narration:
          "Bima does not dress truth in decoration. He reminds Arjuna that honesty must walk with strength.",
        learningPoint:
          "Character contrast matters. Bima's directness helps audiences understand Arjuna's inner conflict.",
      },
      {
        title: "Gatotkaca Looks Ahead",
        cue: "Move Gatotkaca forward as if guarding the others.",
        focus: "gatotkaca",
        mood: "battle",
        targets: [
          {
            character: "gatotkaca",
            x: 65,
            y: 31,
            tolerance: 8,
            label: "Protective stance",
          },
        ],
        narration:
          "Gatotkaca knows that some victories are protected by sacrifice before anyone sees the cost.",
        learningPoint:
          "A dalang can foreshadow later events by placing a character in a protective position.",
      },
      {
        title: "Dharma Takes Shape",
        cue: "Arrange all three characters in balance across the kelir.",
        focus: "arjuna",
        mood: "victory",
        targets: [
          {
            character: "arjuna",
            x: 39,
            y: 23,
            tolerance: 8,
            label: "Doubt becomes duty",
          },
          {
            character: "bima",
            x: 55,
            y: 22,
            tolerance: 8,
            label: "Strength stands beside it",
          },
          {
            character: "gatotkaca",
            x: 71,
            y: 25,
            tolerance: 8,
            label: "Sacrifice guards the future",
          },
        ],
        narration:
          "The Pandavas step forward, not because the path is easy, but because the world asks them to choose with care.",
        learningPoint:
          "The ending of a scene often gathers the lesson: duty, courage, restraint, and responsibility.",
      },
    ],
  },
];

export const studioMoods = {
  mystery: {
    label: "Mystery",
    description: "Soft lamp glow for searching, secrets, and quiet movement.",
  },
  wisdom: {
    label: "Wisdom",
    description: "Calm amber light for reflection and moral choice.",
  },
  devotion: {
    label: "Devotion",
    description: "Warm focused light for loyalty, patience, and inner strength.",
  },
  battle: {
    label: "Battle",
    description: "Red-gold tension for conflict, threat, and fast motion.",
  },
  victory: {
    label: "Victory",
    description: "Bright celebratory light for resolution and hope.",
  },
};
