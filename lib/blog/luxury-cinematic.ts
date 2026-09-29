import type { BlogPost } from "@/types";
import { blogImage, h, ol, p, ul } from "@/lib/blog/helpers";

const LUXURY = "planning-a-luxury-wedding-in-lahore";
const CINEMATIC = "what-makes-a-wedding-film-cinematic";

export const luxuryPosts: BlogPost[] = [
  // ─────────────────────────── PILLAR: LUXURY ───────────────────────────
  {
    slug: LUXURY,
    cluster: "Luxury Weddings",
    role: "pillar",
    primaryKeyword: "luxury wedding photography Lahore",
    decorativeTitle: "Luxury",
    title: "Planning a Luxury Wedding in Lahore: A Photographer's Perspective",
    seoTitle: "Planning a Luxury Wedding in Lahore: A Photographer's View",
    metaDescription:
      "Planning a luxury wedding in Lahore? A photographer's view on venues, lighting, timelines, styling, portraits and premium wedding photography and film.",
    excerpt:
      "What actually makes a luxury wedding photograph well — lighting, pacing, portraits and planning — from the photographer's side.",
    featuredImage: blogImage(
      LUXURY,
      "Luxury wedding in Lahore with an elegant stage and editorial couple portrait"
    ),
    publishedAt: "2026-09-17",
    relatedSlugs: [
      "inside-a-premium-wedding-photography-package",
      "best-wedding-venues-in-lahore-for-photography",
      "what-makes-a-wedding-film-cinematic",
      "wedding-photography-in-lahore-styles-seasons",
    ],
    faqTags: ["luxury", "packages", "style", "film", "venues"],
    blocks: [
      p(
        "A luxury wedding is judged by details: the venue, the decor, the styling, the pacing of the evening. As photographers, we see something couples often do not: the decisions that decide how the day photographs. Light, space, timing and calm matter more than budget alone. This is our perspective on planning a luxury wedding in Lahore so that it looks as good in the photographs and film as it does in the room."
      ),
      h("What luxury means from a photographer's side"),
      p(
        "Luxury wedding photography is not a filter or a price tag. It is a set of choices: controlled light, careful composition, consistent colour, unhurried portraits and a team that stays out of the way. The look is restrained and editorial rather than busy. It comes from planning."
      ),
      h("Choose the venue for light and space"),
      p(
        "Venues photograph very differently even when they look equally grand in person. When you tour a venue, look at it as a photographer would:"
      ),
      ul([
        "Ceiling height and colour: very low or dark ceilings limit lighting options, and coloured ceilings can cast colour onto skin.",
        "Natural light and outdoor areas: a lit garden, terrace or courtyard gives you portrait spots away from the crowd.",
        "The stage and entrance: where the couple enters and sits, and whether there is space around them.",
        "Room to move: a photographer needs to reach the couple, the family and the dance floor without disturbing the guests.",
        "Venue rules: flash, drone and lighting restrictions should be checked in advance.",
      ]),
      p(
        "We go through this in more detail in [Best Wedding Venues in Lahore for Photography](/blog/best-wedding-venues-in-lahore-for-photography)."
      ),
      h("Lighting is the luxury detail nobody sees"),
      p(
        "Décor lighting that looks beautiful to guests can be very hard on skin tones and cameras: strong coloured LEDs, uplights that turn faces blue or magenta, and stage lights that flicker on video. Talk to your decorator early about lighting, and ask them to include warm, even light on the stage and the couple's seating. A photographer who has visited the venue can advise. Plan for lights to be on during portraits."
      ),
      h("Plan a timeline with room for portraits"),
      p(
        "Nothing separates a rushed wedding from a luxurious one more than time. Build a timeline that lets the couple arrive, breathe and be photographed without being hurried. A few principles:"
      ),
      ul([
        "Give couple portraits 30 to 45 minutes, ideally close to golden hour. See [The Best Time of Day for Wedding Photography in Lahore](/blog/best-time-of-day-for-wedding-photography-in-lahore).",
        "Group formal family photographs into one block rather than spreading them across the night.",
        "Leave a buffer, since weddings run late.",
        "Schedule detail photography before hair and makeup finishes.",
      ]),
      h("Details and styling worth planning for"),
      p(
        "Rings, jewellery, invitations, shoes, fragrance, florals and heirlooms are the pieces that tell the story of a luxury wedding. Lay them out together, in good light, before the photographer arrives. Discuss styling with your photographer as well: colours that photograph well, fabrics that catch light and any accents that matter."
      ),
      h("Editorial portraits"),
      p(
        "Editorial portraits are directed, polished and calm. They need a private location, a little time and good light: a garden, a courtyard, a quiet corner of the venue. If you are having a separate bridal or couple shoot, plan it around the styling and the light, not around the rest of the schedule."
      ),
      h("Photography and film together"),
      p(
        "Luxury weddings often combine photography and a cinematic film. Planning them together keeps the team from getting in each other's way and keeps the look consistent. Ask how the photographers and videographers will coordinate. See [What Makes a Wedding Film Cinematic?](/blog/what-makes-a-wedding-film-cinematic)."
      ),
      h("Choosing a team that fits"),
      p(
        "For a large or multi-day wedding, ask about team size, experience with similar events and how they will handle simultaneous moments. Ask to see a full gallery from a comparable wedding. Our [guide to choosing a wedding photographer in Lahore](/blog/wedding-photographer-in-lahore-guide) covers the questions that matter."
      ),
      h("What a premium package usually includes"),
      p(
        "Premium coverage generally means full-day coverage, a larger and more experienced team, photography and film, drone where permitted, and a high-quality album. Details are in [Inside a Premium Wedding Photography Package](/blog/inside-a-premium-wedding-photography-package)."
      ),
      h("Working with your decorator and planner"),
      p(
        "The people who design the room have as much influence on your photographs as the people who take them. A short meeting between your planner, decorator and photographer, ideally before the decor is finalised, solves most problems in advance: where the stage sits, how it is lit, where the couple enters and where there is space to photograph them."
      ),
      p(
        "Share your photographer's requests early and in writing. It is much easier to add a warm key light or move a floral arch a metre before the day than during setup."
      ),
      h("Privacy, guests and discretion"),
      p(
        "Many luxury weddings are private, with prominent families and strong views about images. Agree beforehand who may see and share the photographs, whether any guests or areas are off-limits, and how images will be shared with the couple. A good team works quietly and respects these boundaries, and puts them in the written agreement."
      ),
      h("Luxury details that photograph well"),
      ul([
        "Florals with height and texture rather than uniform arrangements",
        "Stage and entrance design with clear space around the couple",
        "Jewellery and outfits laid out in good light before dressing",
        "Table settings and signage, photographed before guests arrive",
        "Fabric, embroidery and materials that catch light",
      ]),
      p(
        "Ask your photographer for 20 to 30 minutes with the finished room before guests arrive. It is when the decor is at its best and is often the only time it can be photographed properly."
      ),
      h("Multi-day luxury weddings: one visual story"),
      p(
        "When a wedding runs across several days and venues, the risk is that the photographs look like separate events. A consistent look comes from one creative direction: the same team or a coordinated one, a shared colour approach in editing and a plan for how the days connect. Ask how your photographer keeps a visual thread from Mayun to Walima."
      ),
      h("Common mistakes we see at luxury weddings"),
      ul([
        "Over-scheduling: a packed programme leaves no time for portraits, and the couple looks tired in the photographs.",
        "Decor that blocks the stage or the couple's sightlines from the room.",
        "Dark or heavily coloured lighting on the stage, which flattens faces and confuses cameras.",
        "No plan for the bride's getting-ready space, which is often the most beautiful room and the worst lit.",
        "Deciding on photography last, when the venue, decor and timeline are already fixed.",
      ]),
      p(
        "Most of these are solved by involving your photographer while the plan is still flexible."
      ),
      h("A checklist to hand your photographer"),
      ol([
        "Event schedule with venue and timings",
        "Family groupings and key people",
        "Must-have moments and any restrictions",
        "Decor and lighting plan, and the colour palette",
        "Details to photograph (rings, jewellery, invitations, outfits)",
        "Backup plan for weather and delays",
      ]),
      p(
        "If you are planning a luxury wedding in Lahore, [talk to us](/#contact) about your dates, or look at our [Premium package](/#packages)."
      ),
    ],
  },

  {
    slug: "inside-a-premium-wedding-photography-package",
    cluster: "Luxury Weddings",
    role: "support",
    pillarSlug: LUXURY,
    primaryKeyword: "premium wedding photography package Lahore",
    decorativeTitle: "Premium",
    title: "Inside a Premium Wedding Photography Package: What's Actually Included",
    seoTitle: "Inside a Premium Wedding Photography Package in Lahore",
    metaDescription:
      "What a premium wedding photography package in Lahore includes: full-day coverage, cinematic film, drone, a signature album and an experienced team.",
    excerpt:
      "What a premium wedding photography package should include, and what to check before you pay for one.",
    featuredImage: blogImage(
      "inside-a-premium-wedding-photography-package",
      "Premium wedding photography package with signature album, cinematic film and drone coverage"
    ),
    publishedAt: "2026-09-15",
    relatedSlugs: [
      "what-is-included-in-a-wedding-photography-package",
      "how-much-does-wedding-photography-cost-in-lahore",
      "what-makes-a-wedding-film-cinematic",
    ],
    faqTags: ["luxury", "packages", "pricing", "delivery", "team"],
    blocks: [
      p(
        "A premium wedding photography package is not simply a longer version of a basic one. It changes how the day is covered. This article explains what a premium package usually contains, using our own Premium package as an example. It supports our guide to [planning a luxury wedding in Lahore](/blog/planning-a-luxury-wedding-in-lahore)."
      ),
      h("Full-day coverage"),
      p(
        "Instead of a fixed block of hours, full-day coverage follows the day: preparation, ceremony, portraits, celebration. That means no watching the clock and nothing missed at the edges of the schedule."
      ),
      h("Professional photography"),
      p(
        "Premium photography means an experienced lead photographer and a plan for portraits, candids and details, with consistent editing and colour grading across the day."
      ),
      h("Cinematic videography and wedding film"),
      p(
        "A premium package usually includes a cinematic film, shot and edited like a short film rather than a recording. Our Premium package includes cinematic videography and a cinematic wedding film. Learn what that involves in [What Makes a Wedding Film Cinematic?](/blog/what-makes-a-wedding-film-cinematic)."
      ),
      h("Drone coverage"),
      p(
        "Aerial footage adds scale to venues and outdoor events. It depends on venue permission and local rules, so it should be confirmed in advance. Our Premium package includes drone coverage."
      ),
      h("A signature album"),
      p(
        "A premium album is designed and printed to a higher standard, with careful image selection, design and materials. Ask about size, pages, materials and whether design and printing are included."
      ),
      h("An experienced team"),
      p(
        "The most important premium inclusion is the team. Ask who your lead photographer and videographer will be, how many shooters will be at each event and how they coordinate."
      ),
      h("What to check before you pay for premium"),
      ul([
        "Is the coverage full-day or a fixed number of hours?",
        "How many photographers and videographers are included?",
        "Which films are included and how long are they?",
        "Is drone coverage included, and is it permitted at your venue?",
        "What album, and is design and printing included?",
        "What is the delivery timeline?",
      ]),
      p(
        "Our Premium package is PKR 90,000 per day and can be tailored to your events. See the [packages](/#packages) or [contact us](/#contact). For cost context, read [How Much Does Wedding Photography Cost in Lahore?](/blog/how-much-does-wedding-photography-cost-in-lahore)"
      ),
    ],
  },
];

export const cinematicPosts: BlogPost[] = [
  // ─────────────────────────── PILLAR: CINEMATIC ───────────────────────────
  {
    slug: CINEMATIC,
    cluster: "Cinematic Films",
    role: "pillar",
    primaryKeyword: "cinematic wedding films Lahore",
    decorativeTitle: "Cinematic",
    title: "What Makes a Wedding Film Cinematic? A Wedding Filmmaker's Guide",
    seoTitle: "What Makes a Wedding Film Cinematic? A Filmmaker's Guide",
    metaDescription:
      "What makes a wedding film cinematic: composition, camera movement, light, lenses, sound, color grading and editing, and how it differs from a wedding video.",
    excerpt:
      "The craft behind a cinematic wedding film: framing, movement, light, sound, color and editing.",
    featuredImage: blogImage(
      CINEMATIC,
      "Cinematic wedding film shot with a gimbal-stabilised camera of a couple in Lahore"
    ),
    publishedAt: "2026-09-21",
    relatedSlugs: [
      "wedding-highlight-film-vs-full-wedding-video",
      "candid-vs-cinematic-vs-traditional-wedding-photography",
      "planning-a-luxury-wedding-in-lahore",
    ],
    faqTags: ["film", "cinematic", "style", "luxury", "packages"],
    blocks: [
      p(
        "“Cinematic” is used to describe almost every wedding video now, which makes it easy to forget what it actually means. A cinematic wedding film is not a recording of your day with music over it. It is shot, edited and graded like a short film, where every choice serves the story. Here is what goes into it."
      ),
      h("Cinematic wedding film vs wedding video"),
      p(
        "A wedding video documents what happened. A cinematic wedding film tells the story of what it felt like. Both are valuable. A full event video is a record; a film is an interpretation, with a beginning, a rhythm and an emotional arc. If you are unsure which you need, see [Wedding Highlight Film vs Full Wedding Video](/blog/wedding-highlight-film-vs-full-wedding-video)."
      ),
      h("Composition and framing"),
      p(
        "Cinematography starts with where the camera is and what is in the frame. Cinematic frames use foreground and background, leading lines and negative space to give shots depth. Instead of a wide shot of a stage, you might see the bride's hands in the foreground and the room softly behind her. Every shot has a subject and a reason."
      ),
      h("Camera movement"),
      p(
        "Movement adds energy and intimacy. Gimbals, sliders and handheld work are used to create slow push-ins, smooth tracking shots and reveals. Good movement is motivated: it follows a person or discovers a detail. Too much movement, or movement for its own sake, is one of the quickest ways to make a film feel like a trend rather than a story."
      ),
      h("Light"),
      p(
        "Light is the main character. Cinematographers shoot backlit portraits in golden hour, use window light indoors and shape artificial light to keep skin tones natural. At night, they work with venue lighting and add their own only when needed. See how light changes the day in [The Best Time of Day for Wedding Photography in Lahore](/blog/best-time-of-day-for-wedding-photography-in-lahore)."
      ),
      h("Lenses, depth of field and frame rates"),
      ul([
        "Lenses: fast prime lenses give a shallow depth of field, separating the subject from the background and helping in low light.",
        "Frame rate: 24 frames per second is the traditional film look, while higher frame rates allow smooth slow motion for moments such as a veil lifting or confetti.",
        "Stabilisation: steady shots, whether on a gimbal or tripod, give a polished feel.",
      ]),
      h("Sound design and music"),
      p(
        "Audio makes up half of a film. Cinematic wedding films combine music chosen for the couple with real sound from the day: vows, laughter, speeches, ambient noise. Clean audio at the ceremony and careful mixing are what make an emotional scene work. It is also why videographers use dedicated microphones rather than relying on the camera alone."
      ),
      h("Storytelling"),
      p(
        "A film needs structure. That might be a slow build from preparation to ceremony to celebration, or moments intercut across the day. The editor chooses what to include and what to leave out, and the film often becomes about a few things: the couple, the families and the atmosphere of the events."
      ),
      h("Colour grading"),
      p(
        "Colour grading gives the film its look. Footage is shot flat to keep detail, and then graded so skin tones are natural and the whole film shares one palette: warm and golden, soft and airy or deep and moody. Grading is also what helps footage from different cameras and different light match. Colour is a strength of ours: Ammar is a Sony Best Retoucher Award winner."
      ),
      h("Editing and pacing"),
      p(
        "Editing decides rhythm. Cutting on music, letting quiet moments breathe and building towards emotional peaks are what separate a film from a sequence of clips. Pacing depends on what the couple wants: some prefer a short, energetic teaser, others a longer, slower story."
      ),
      h("Documentary vs cinematic"),
      p(
        "Documentary style follows events as they unfold with minimal direction. Cinematic style adds planning: a few directed shots, a light plan and an edit built around a story. Many films blend both: documentary for the ceremony and cinematic for portraits."
      ),
      h("What a wedding filmmaker needs from you"),
      p(
        "A film is easier to shape when the filmmaker knows what matters to you. Useful things to share:"
      ),
      ul([
        "Your schedule, with the moments that matter most marked",
        "Any speeches, vows or recitations that need clean audio",
        "Music you love, and music you do not want",
        "Venue restrictions on lighting, tripods, gimbals or drones",
        "Family members who should feature, and anyone who prefers not to be filmed",
      ]),
      h("Music and licensing"),
      p(
        "Music drives the emotion of a wedding film, so ask where it comes from. Commercial songs are copyrighted, and platforms may mute or remove videos that use them without permission. Studios often use licensed music libraries for this reason. Ask which music is used, whether you can suggest a track and whether the film is cleared for sharing online."
      ),
      h("How long does a wedding film take to make?"),
      p(
        "Editing time depends on how much footage was shot, the number of events and the length and style of the film. A short highlight is quicker than a multi-event cinematic film with sound design and grading. We agree a delivery timeline at booking, and you should expect any filmmaker to do the same."
      ),
      h("Cinematic clichés worth avoiding"),
      p(
        "Cinematic techniques can be overused. Constant slow motion, drone shots with no purpose, trendy transitions and heavy colour effects date quickly. The films that last are simple: good light, honest moments, clean sound and an edit that respects the emotion of the day."
      ),
      h("Do you need a film as well as photographs?"),
      p(
        "Photographs and film do different jobs. Photographs are the images you frame, print in an album and share in a single glance. A film holds movement, voices, music and the feeling of the room, and is what many couples watch on anniversaries. If your budget allows only one, think about which you will return to more often. If it allows both, plan them together, so the photography and film teams share the light, the schedule and the look. See our [Premium package](/#packages) for how we combine them."
      ),
      h("How to choose a wedding filmmaker"),
      ol([
        "Watch complete films, not just teasers, and check that the audio is clean.",
        "Check that colour and skin tone look natural in different lighting.",
        "Ask what films are included and how long they run.",
        "Ask how the film team will work with the photographers.",
        "Ask about delivery time and revisions.",
      ]),
      p(
        "Cinematic wedding films are the core of what we do. Read about pairing film and photography in [Cinematic vs Traditional Wedding Photography](/blog/candid-vs-cinematic-vs-traditional-wedding-photography), or see the [Premium package](/#packages), which includes cinematic videography and a cinematic wedding film. [Tell us about your wedding](/#contact) to discuss options."
      ),
    ],
  },
  {
    slug: "wedding-highlight-film-vs-full-wedding-video",
    cluster: "Cinematic Films",
    role: "support",
    pillarSlug: CINEMATIC,
    primaryKeyword: "wedding highlight film vs full wedding video",
    decorativeTitle: "Highlights",
    title: "Wedding Highlight Film vs Full Wedding Video: Which Do You Need?",
    seoTitle: "Wedding Highlight Film vs Full Wedding Video: Which Do You Need?",
    metaDescription:
      "Wedding highlight film or full wedding video? How they differ in length, purpose and price, and which suits your Lahore wedding.",
    excerpt:
      "A highlight film tells the story; a full video keeps the record. Here is how to choose.",
    featuredImage: blogImage(
      "wedding-highlight-film-vs-full-wedding-video",
      "Editor working on a wedding highlight film and full wedding video in a Lahore studio"
    ),
    publishedAt: "2026-09-07",
    relatedSlugs: [
      "candid-vs-cinematic-vs-traditional-wedding-photography",
      "what-is-included-in-a-wedding-photography-package",
    ],
    faqTags: ["film", "cinematic", "packages", "events"],
    blocks: [
      p(
        "Wedding films come in different formats, and packages use different names for them. Understanding the three main types makes it easier to compare packages. This article supports our guide to [what makes a wedding film cinematic](/blog/what-makes-a-wedding-film-cinematic)."
      ),
      h("Highlight film"),
      p(
        "A highlight film is a short, edited story of the best moments of your wedding, usually a few minutes long and set to music. It is the film you will share and rewatch."
      ),
      ul([
        "Best for: sharing with family and friends and remembering the atmosphere.",
        "Strengths: emotional, concise and the most cinematic in feel.",
        "Limits: it does not include full speeches or ceremonies.",
      ]),
      h("Full wedding or event video"),
      p(
        "A full video documents an event from start to finish, often with the ceremony, speeches and key moments in full. It is more of a record than a film."
      ),
      ul([
        "Best for: families who want a complete record of a ceremony or event.",
        "Strengths: nothing is left out.",
        "Limits: it is long, so you are likely to watch it less often.",
      ]),
      h("Cinematic wedding film"),
      p(
        "A cinematic wedding film is crafted like a short film: planned shots, sound design and colour grading. It may be a highlight-length piece or a longer documentary-style story across events."
      ),
      h("Which do you need?"),
      ol([
        "Choose a highlight film if you want a story you will revisit.",
        "Add a full event video if a ceremony or speeches matter to your family.",
        "Choose a cinematic film if you care about the look and feel.",
        "Ask what is included in each package and roughly how long each film runs.",
      ]),
      p(
        "Our packages include different combinations: edited event video and highlights in Basic and Silver, and a cinematic wedding film in Premium. See the [packages](/#packages), or [contact us](/#contact) to build the right combination for your events."
      ),
    ],
  },
];
