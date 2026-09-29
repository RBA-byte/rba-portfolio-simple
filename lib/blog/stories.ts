import type { BlogPost } from "@/types";
import { heroImages } from "@/lib/content";

/**
 * These are the posts the homepage carousel links to — one per slide, in the
 * same order as `heroImages` in lib/content.ts. Each slide's `slug` must
 * match a `slug` below, or tapping the photo will 404.
 *
 * Unlike the pillar/support guides, these are short, narrative "from the
 * shoot" posts: a couple, a venue, the gear and light that made the frame.
 * Keep that voice — one story, one location, one or two technical notes —
 * rather than turning them into how-to guides.
 */

function heroImage(slug: string) {
  const match = heroImages.find((image) => image.slug === slug);
  if (!match) {
    throw new Error(`No hero image found for slug "${slug}"`);
  }
  return match;
}

export const storyPosts: BlogPost[] = [
  // 1 ───────────────────────────────────────────────────────────
  {
    slug: "ezza-hammad-walima-shoot-quaid-e-azam-library",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "walima photoshoot Quaid-e-Azam Library",
    decorativeTitle: "Through Smoke",
    title: "Ezza & Hammad: A Walima Shoot in Smoke at Quaid-e-Azam Library",
    seoTitle: "Walima Photoshoot at Quaid-e-Azam Library, Lahore",
    metaDescription:
      "Behind the scenes of Ezza and Hammad's cinematic walima couple shoot at Quaid-e-Azam Library in Lahore — the gear, the light and the smoke.",
    excerpt:
      "Marble columns, late light and a slow drift of smoke — how we shot Ezza and Hammad's walima portraits at Quaid-e-Azam Library.",
    featuredImage: heroImage("ezza-hammad-walima-shoot-quaid-e-azam-library"),
    publishedAt: "2026-09-23",
    relatedSlugs: [
      "ezza-hammad-cinematic-walima-portraits-lahore",
      "best-wedding-photography-locations-in-lahore",
      "best-wedding-venues-in-lahore-for-photography",
    ],
    faqTags: ["venues", "locations", "luxury", "style", "cinematic"],
    blocks: [
      {
        type: "paragraph",
        text: "Ezza and Hammad didn't want a banquet hall for their walima portraits. They wanted somewhere in Lahore that felt like it belonged to the city rather than to a wedding season, and Quaid-e-Azam Library gave us exactly that: high ceilings, old marble, and light that moves differently through every hall depending on the hour.",
      },
      {
        type: "heading",
        text: "Why a library for a walima shoot",
      },
      {
        type: "paragraph",
        text: "It's an unusual choice for wedding photography in Lahore, and that was the point. The library is a working public building, not a wedding venue, which meant we had one real constraint to plan around: a scheduled slot, booked in advance through the library's own photo shoot request page, rather than the open-ended access a private venue allows. We walked the halls a few days earlier to time where the afternoon light lands on the columns, so we weren't guessing on the day.",
      },
      {
        type: "paragraph",
        text: "Once the light was mapped, we brought in smoke. A slow bomb behind the couple, timed to drift rather than billow, turned the depth of the hallway into something closer to a stage than a corridor — the kind of frame that reads as cinematic wedding photography in Lahore without needing much explanation.",
      },
      {
        type: "heading",
        text: "The gear that made the frame work",
      },
      {
        type: "paragraph",
        text: "We shot the couple portraits on the Sony A7III with the 85mm f/1.8 — long enough to compress the columns behind them into soft shapes, wide enough at f/1.8 to keep Ezza and Hammad the only sharp thing in the frame. The library's ambient light was warm but flat, so we lit them with a single Godox AD200 Pro through a shoot-through umbrella, positioned just outside the frame to rim the smoke without flattening it. That's really the whole setup: one key light, one long lens, and enough patience to wait for the smoke to sit exactly where we wanted it.",
      },
      {
        type: "paragraph",
        text: "If you're planning something similar, [Quaid-e-Azam Library takes bookings for photo shoots directly through their site](https://qal.punjab.gov.pk/photo-shoot) — worth applying for a slot a few weeks ahead of your date. We've written more generally about scouting locations like this in [Best Wedding Photography Locations in Lahore](/blog/best-wedding-photography-locations-in-lahore), and there's a second set of frames from this same shoot in [our next post](/blog/ezza-hammad-cinematic-walima-portraits-lahore).",
      },
    ],
  },

  // 2 ───────────────────────────────────────────────────────────
  {
    slug: "ezza-hammad-cinematic-walima-portraits-lahore",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "cinematic walima portraits Lahore",
    decorativeTitle: "Second Glance",
    title: "A Second Angle: More From Ezza & Hammad's Library Portraits",
    seoTitle: "Cinematic Walima Portraits in Lahore | RBA Films & Photography",
    metaDescription:
      "A second set of frames from Ezza and Hammad's walima shoot at Quaid-e-Azam Library — wider composition, a second camera, and why one location can tell two stories.",
    excerpt:
      "Same couple, same afternoon, a completely different frame — a second look at Ezza and Hammad's library portraits.",
    featuredImage: heroImage("ezza-hammad-cinematic-walima-portraits-lahore"),
    publishedAt: "2026-09-24",
    relatedSlugs: [
      "ezza-hammad-walima-shoot-quaid-e-azam-library",
      "what-makes-a-wedding-film-cinematic",
      "best-wedding-venues-in-lahore-for-photography",
    ],
    faqTags: ["cinematic", "style", "venues", "locations"],
    blocks: [
      {
        type: "paragraph",
        text: "One location can hold more than one story, if you change what the frame is asking to be about. The first set from Ezza and Hammad's walima shoot was close and quiet — two people and a wall of smoke. This second set, shot minutes later in the same hallway, is about the building as much as the couple.",
      },
      {
        type: "heading",
        text: "Pulling back to let the architecture in",
      },
      {
        type: "paragraph",
        text: "We swapped the 85mm for the 35mm f/1.8 on the same Sony A7III body, which let us keep Ezza and Hammad in the frame while pulling the library's columns and ceiling into the shot as more than a blur. It's a small change with a large effect: the couple stops being isolated from their surroundings and starts looking like they belong to the room.",
      },
      {
        type: "paragraph",
        text: "We run two cameras on most shoots for exactly this reason. While one angle was being worked on the A7III, a second photographer covered wider reaction shots on the Sony A6700, which meant we weren't choosing between the tight portrait and the wide one — we walked away with both, from the same five minutes of light.",
      },
      {
        type: "heading",
        text: "Why the second set matters"
      },
      {
        type: "paragraph",
        text: "Couples booking a walima shoot in Lahore are often choosing between a candid, atmospheric set and a more structured, editorial one. Our answer, most of the time, is to shoot for both across the same session rather than pick in advance — read more on how we think about that trade-off in [What Makes a Wedding Film Cinematic?](/blog/what-makes-a-wedding-film-cinematic) The first set from this shoot, with the tighter portrait and the smoke, is in [Ezza & Hammad: A Walima Shoot in Smoke at Quaid-e-Azam Library](/blog/ezza-hammad-walima-shoot-quaid-e-azam-library).",
      },
    ],
  },

  // 3 ───────────────────────────────────────────────────────────
  {
    slug: "zainab-bridal-reception-portrait-glass-rim-light",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "bridal reception photography Lahore",
    decorativeTitle: "Glass & Glow",
    title: "Zainab: A Reception Portrait Lit Through a Glass Vase",
    seoTitle: "Bridal Reception Photography in Lahore | Rim Light Portrait",
    metaDescription:
      "How a glass flower vase became the light source for one of our favourite bridal portraits — Zainab's reception shoot, styled by MUA Noor Raza.",
    excerpt:
      "A glass vase, a shaft of afternoon light and a few quiet minutes before the reception began.",
    featuredImage: heroImage("zainab-bridal-reception-portrait-glass-rim-light"),
    publishedAt: "2026-09-25",
    relatedSlugs: [
      "candid-vs-cinematic-vs-traditional-wedding-photography",
      "best-time-of-day-for-wedding-photography-in-lahore",
      "planning-a-luxury-wedding-in-lahore",
    ],
    faqTags: ["style", "light", "bridal", "details"],
    blocks: [
      {
        type: "paragraph",
        text: "There's usually a short window, somewhere between hair and makeup finishing and the first guests arriving, where a bride is sitting still for the last time that day. Zainab's getting-ready room had a large glass flower vase on the table beside her, and rather than move it out of frame, we built the whole portrait around it.",
      },
      {
        type: "heading",
        text: "Turning a prop into a light source",
      },
      {
        type: "paragraph",
        text: "Glass bends and scatters light in a way flat surfaces don't. We positioned a single Godox AD200 Pro behind and slightly to the side of the vase, gridded down to a narrow beam, so the light had to pass through the glass and the water inside it before it reached Zainab. What comes out the other side isn't a clean beam anymore — it's soft, slightly broken light with a faint warmth to it, sitting along her jaw and shoulder like a rim light that doesn't quite behave like one.",
      },
      {
        type: "paragraph",
        text: "We shot it on the Sony A7III with the 85mm f/1.8 wide open, close enough that the vase itself falls out of focus in the foreground and becomes texture rather than an object. It's a technique we come back to often for reception and bridal portraits in Lahore, because it needs almost no equipment — one small light and something glass in the room is usually enough.",
      },
      {
        type: "heading",
        text: "The details around the frame",
      },
      {
        type: "paragraph",
        text: "Zainab's hair and makeup for the day were done by [MUA Noor Raza](https://www.instagram.com/noor_razamakeupstudio), whose styling gave us a lot to work with in this kind of low, directional light — skin that holds detail rather than blowing out under a hard rim. We talk more about how light shapes a portrait like this in [The Best Time of Day for Wedding Photography in Lahore](/blog/best-time-of-day-for-wedding-photography-in-lahore), and about the difference between this kind of directed portrait and fully candid coverage in [Candid vs Cinematic vs Traditional Wedding Photography](/blog/candid-vs-cinematic-vs-traditional-wedding-photography).",
      },
    ],
  },

  // 4 ───────────────────────────────────────────────────────────
  {
    slug: "faisal-farrah-mehndi-couple-shoot-lahore",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "mehndi couple photoshoot Lahore",
    decorativeTitle: "The Swing",
    title: "Faisal & Farrah: A Mehndi Portrait on an Old Swing",
    seoTitle: "Mehndi Couple Photoshoot in Lahore | RBA Films & Photography",
    metaDescription:
      "Warm bulbs, an oversized swing and a quiet pose — Faisal and Farrah's mehndi couple portrait, photographed by RBA Films & Photography in Lahore.",
    excerpt:
      "Farrah's head resting on Faisal's lap, warm bulbs overhead — one of our favourite mehndi frames this season.",
    featuredImage: heroImage("faisal-farrah-mehndi-couple-shoot-lahore"),
    publishedAt: "2026-09-26",
    relatedSlugs: [
      "mehndi-nikah-baraat-walima-wedding-photography",
      "wedding-photography-in-lahore-styles-seasons",
      "candid-vs-cinematic-vs-traditional-wedding-photography",
    ],
    faqTags: ["mehndi", "events", "style", "candid"],
    blocks: [
      {
        type: "paragraph",
        text: "Every mehndi we shoot in Lahore has a large decorated swing somewhere in the decor, and most couples end up on it for two or three formal frames before the dancing starts. Faisal and Farrah's was set apart from the crowd, half-lit by strings of warm bulbs, and instead of the usual side-by-side pose, Faisal stayed seated on the swing while Farrah settled onto the floor beside it, her head resting on his lap.",
      },
      {
        type: "heading",
        text: "Letting the pose happen rather than building it",
      },
      {
        type: "paragraph",
        text: "We gave them almost no direction for this one. The swing, the floor cushions and a minute of quiet were enough — our job was mostly to notice when the moment settled into something worth keeping, which is closer to how we shoot candid wedding photography than a formal portrait. We cover that difference in more depth in [Candid vs Cinematic vs Traditional Wedding Photography](/blog/candid-vs-cinematic-vs-traditional-wedding-photography).",
      },
      {
        type: "heading",
        text: "Matching the mehndi's warm light",
      },
      {
        type: "paragraph",
        text: "Mehndi decor lighting is almost always warm — string bulbs, fairy lights, amber uplighting — and mixing that with a cool flash is one of the fastest ways to make a portrait look artificial. We shot this on the Sony A7III with the 35mm f/1.8, wide enough to keep the swing and the string lights in the frame as context rather than background blur, and gelled a single Godox AD200 Pro to match the bulbs' colour temperature so the fill light disappears into the scene instead of fighting it.",
      },
      {
        type: "paragraph",
        text: "It's a small technical choice, but it's the difference between a portrait that looks lit and one that looks like it simply happened. For more on how we plan coverage across Mehndi, Nikah, Baraat and Walima, see [our full events guide](/blog/mehndi-nikah-baraat-walima-wedding-photography).",
      },
    ],
  },

  // 5 ───────────────────────────────────────────────────────────
  {
    slug: "samie-khadija-baraat-couple-shoot-h-square-studio",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "baraat couple shoot Lahore",
    decorativeTitle: "Studio Baraat",
    title: "Samie & Khadija: A Baraat Couple Shoot at H-Square Production",
    seoTitle: "Baraat Couple Shoot at H-Square Production, Lahore",
    metaDescription:
      "Inside H-Square Production's studio set for Samie and Khadija's baraat couple portraits — the lighting setup and why a studio works well for baraat photography.",
    excerpt:
      "A controlled studio set gave us full command of the light for Samie and Khadija's baraat portraits.",
    featuredImage: heroImage("samie-khadija-baraat-couple-shoot-h-square-studio"),
    publishedAt: "2026-09-27",
    relatedSlugs: [
      "samie-khadija-walima-shoot-aureum-grand-bahria-town",
      "best-wedding-venues-in-lahore-for-photography",
      "how-many-photographers-for-a-pakistani-wedding",
    ],
    faqTags: ["venues", "team", "style", "packages"],
    blocks: [
      {
        type: "paragraph",
        text: "Not every baraat couple shoot needs a venue with a view. Samie and Khadija booked a studio session with us at H-Square Production, a dedicated photography studio in Airline Society, Lahore, and the appeal was simple: no weather to plan around, no venue lighting to fight, no crowd to work past.",
      },
      {
        type: "heading",
        text: "What a studio set gives you that a venue can't",
      },
      {
        type: "paragraph",
        text: "In a real venue, we spend a lot of the shoot reading the room — where the light falls, what's flattering, what needs correcting. In a studio, that work is already done for us, which means the whole session goes into styling, posing and light rather than problem-solving. For a baraat portrait, where the couple's outfits are usually heavy and highly detailed, that extra time matters.",
      },
      {
        type: "heading",
        text: "The setup, lens by lens",
      },
      {
        type: "paragraph",
        text: "For the tight couple portrait, we used the Sony A7III with the 85mm f/1.8, keyed by a single Godox AD200 Pro through a softbox positioned high and slightly to camera-left, with a white bounce on the opposite side to keep the shadow side of their faces readable. For the wider shots that show the full backdrop and styling, we switched to the 27mm f/1.2 — wide enough to hold the set, fast enough to still separate Samie and Khadija from it at f/1.8–f/2.",
      },
      {
        type: "paragraph",
        text: "We booked H-Square Production directly; you can find their work at [@h_squareproductions on Instagram](https://www.instagram.com/h_squareproductions/?hl=en). If you're weighing a studio set against an outdoor or venue shoot for your own baraat, our guide to [Lahore wedding venues for photography](/blog/best-wedding-venues-in-lahore-for-photography) covers the trade-offs, and this wasn't Samie and Khadija's only shoot with us that week — read about their [walima portraits outside Aureum Grand](/blog/samie-khadija-walima-shoot-aureum-grand-bahria-town) next.",
      },
    ],
  },

  // 6 ───────────────────────────────────────────────────────────
  {
    slug: "samie-khadija-walima-shoot-aureum-grand-bahria-town",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "wedding photography Aureum Grand",
    decorativeTitle: "Grand Evening",
    title: "Samie & Khadija: An Evening Outside Aureum Grand, Bahria Town",
    seoTitle: "Wedding Photography at Aureum Grand, Bahria Town Lahore",
    metaDescription:
      "Samie and Khadija's walima portraits outside Aureum Grand in Bahria Town — how we balanced the venue's own lighting with our own for the couple's portrait.",
    excerpt:
      "A few days after their studio shoot, we met Samie and Khadija again outside Aureum Grand for their walima portraits.",
    featuredImage: heroImage("samie-khadija-walima-shoot-aureum-grand-bahria-town"),
    publishedAt: "2026-09-28",
    relatedSlugs: [
      "samie-khadija-baraat-couple-shoot-h-square-studio",
      "best-wedding-venues-in-lahore-for-photography",
      "planning-a-luxury-wedding-in-lahore",
    ],
    faqTags: ["venues", "locations", "luxury", "light"],
    blocks: [
      {
        type: "paragraph",
        text: "After the controlled studio session for their baraat portraits, Samie and Khadija's walima took us somewhere very different: the entrance of Aureum Grand in Bahria Town, with the venue's own uplighting and signage already switched on for the evening.",
      },
      {
        type: "heading",
        text: "Working with a venue's own lighting, not against it",
      },
      {
        type: "paragraph",
        text: "Wedding venues in Lahore are lit for guests, not for cameras, and Aureum Grand was no exception — warm uplights on the facade, cooler light spilling from the entrance, and a sky that was still holding a little blue behind it all. Rather than override that mix with a single strong flash, we used a Godox AD200 Pro at a lower power as fill, gelled to sit between the two colour temperatures already in the scene, so Samie and Khadija's skin tones stayed natural without flattening the atmosphere the venue itself was providing.",
      },
      {
        type: "paragraph",
        text: "This is the kind of mixed-lighting problem we cover in more general terms in our guide to [choosing a Lahore venue that photographs well](/blog/best-wedding-venues-in-lahore-for-photography) — venue lighting is rarely a reason to avoid a location, but it does need a plan.",
      },
      {
        type: "heading",
        text: "The frame itself",
      },
      {
        type: "paragraph",
        text: "Shot on the Sony A7III with the 85mm f/1.8, positioned so the venue's entrance sat softly out of focus behind them. It's a portrait that couldn't have happened in the studio a few days earlier, and that contrast — one couple, two completely different kinds of light within the same week — is part of why we shoot both when a couple's schedule allows it. See the [baraat studio session at H-Square Production](/blog/samie-khadija-baraat-couple-shoot-h-square-studio) for the other half of their story. Aureum Grand can be found at [@_aureumgrand on Instagram](https://www.instagram.com/_aureumgrand/).",
      },
    ],
  },

  // 7 ───────────────────────────────────────────────────────────
  {
    slug: "maria-faisal-baraat-couple-shoot-gs-productions",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "intimate baraat couple portraits Lahore",
    decorativeTitle: "Quiet Glance",
    title: "Maria & Faisal: An Intimate Baraat Portrait at GS Productions",
    seoTitle: "Intimate Baraat Couple Portraits | GS Productions Lahore",
    metaDescription:
      "A quiet, close portrait of Maria and Faisal at GS Productions in Gulberg — and a note on photographing couples who prefer a little privacy.",
    excerpt:
      "Not every couple wants their face straight to the camera. Maria and Faisal's baraat portrait leaned into that instead of around it.",
    featuredImage: heroImage("maria-faisal-baraat-couple-shoot-gs-productions"),
    publishedAt: "2026-09-29",
    relatedSlugs: [
      "maria-faisal-library-portraits-gs-productions",
      "best-wedding-venues-in-lahore-for-photography",
      "candid-vs-cinematic-vs-traditional-wedding-photography",
    ],
    faqTags: ["style", "candid", "venues", "team"],
    blocks: [
      {
        type: "paragraph",
        text: "Maria was a little hesitant about being photographed head-on, which is more common than people expect, even at a couple's own baraat shoot. Rather than push for a standard frontal portrait, we built the frame around Faisal's expression and let Maria's turn away from camera become the point of the image rather than a problem to solve.",
      },
      {
        type: "heading",
        text: "Composing for comfort, not just for the frame",
      },
      {
        type: "paragraph",
        text: "We shot this on the Sony A7III with the 85mm f/1.8 wide open, focused on Faisal so his expression stays crisp while Maria, turned in profile and slightly softer in the depth of field, still carries the emotional weight of the portrait. It's a reminder we try to hold onto on every shoot: a photographer's job is to adapt the frame to the couple in front of them, not the other way around. If you're choosing a photographer and this kind of flexibility matters to you, it's worth asking about directly — see our list of [questions to ask before booking](/blog/questions-to-ask-your-wedding-photographer).",
      },
      {
        type: "heading",
        text: "The studio behind it",
      },
      {
        type: "paragraph",
        text: "This was shot at [GS Productions & Guddu Shani](https://www.gsproductions.pk/) in Gulberg III, Lahore — a studio with several distinct sets under one roof, which meant we could move Maria and Faisal to a second backdrop later the same session without losing any time. That second set, in the studio's library-themed room, is in [our next post](/blog/maria-faisal-library-portraits-gs-productions). More on choosing a studio versus a venue in [Best Wedding Venues in Lahore for Photography](/blog/best-wedding-venues-in-lahore-for-photography).",
      },
    ],
  },

  // 8 ───────────────────────────────────────────────────────────
  {
    slug: "maria-faisal-library-portraits-gs-productions",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "wedding studio photoshoot Lahore",
    decorativeTitle: "Among Shelves",
    title: "Maria & Faisal: A Second Set in GS Productions' Library Room",
    seoTitle: "Studio Wedding Portraits | GS Productions Library Set, Lahore",
    metaDescription:
      "A second look at Maria and Faisal's baraat shoot, this time in GS Productions' library-themed studio set in Gulberg, Lahore.",
    excerpt:
      "One studio, two completely different backdrops — the library set gave Maria and Faisal's portraits an entirely different mood.",
    featuredImage: heroImage("maria-faisal-library-portraits-gs-productions"),
    publishedAt: "2026-09-30",
    relatedSlugs: [
      "maria-faisal-baraat-couple-shoot-gs-productions",
      "best-wedding-venues-in-lahore-for-photography",
    ],
    faqTags: ["venues", "style", "team"],
    blocks: [
      {
        type: "paragraph",
        text: "Later in the same session that gave us Maria and Faisal's first baraat portrait, we moved them to a different corner of GS Productions entirely: a library-themed set, built around dark wood shelving and a row of warm practical lamps rather than the open backdrop we'd used before.",
      },
      {
        type: "heading",
        text: "Why one studio can carry a whole shoot",
      },
      {
        type: "paragraph",
        text: "A studio with several built sets under one roof, like GS Productions in Gulberg III, solves a problem that outdoor locations can't: variety without travel time. We didn't lose a single minute moving between looks, which meant more of the session went into the portraits themselves. It's one of the reasons we regularly recommend a studio for couples with a tight schedule — see our broader thinking on that in [Best Wedding Venues in Lahore for Photography](/blog/best-wedding-venues-in-lahore-for-photography).",
      },
      {
        type: "heading",
        text: "Lighting a warmer, more layered set",
      },
      {
        type: "paragraph",
        text: "For this set, we switched to the 35mm f/1.8 on the Sony A7III to let the shelving read clearly around Maria and Faisal, rather than melting into a blur the way it would at 85mm. The room's own practical lamps gave us a warm base layer; we bounced a Godox AD200 Pro off the ceiling as a soft top light to lift the couple slightly above that ambient warmth without introducing a second, competing light source. The result sits somewhere between an editorial portrait and a still from a film — which is exactly the register this particular set is built for.",
      },
      {
        type: "paragraph",
        text: "The first portrait from this session, shot on GS Productions' open backdrop, is in [Maria & Faisal: An Intimate Baraat Portrait at GS Productions](/blog/maria-faisal-baraat-couple-shoot-gs-productions). You can see more of the studio's sets and book directly through [gsproductions.pk](https://www.gsproductions.pk/).",
      },
    ],
  },

  // 9 ───────────────────────────────────────────────────────────
  {
    slug: "mahnoor-aliee-mehndi-sunset-shoot-kabeer-studio",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "mehndi sunset photoshoot Lahore",
    decorativeTitle: "Golden Mehndi",
    title: "Mahnoor & Aliee: A Mehndi Portrait at Golden Hour, Kabeer Studio",
    seoTitle: "Mehndi Sunset Photoshoot | Kabeer Studio, Lahore",
    metaDescription:
      "Mahnoor and Aliee's mehndi couple portrait at Kabeer Studio, timed to the last light of the day through the trees.",
    excerpt:
      "We waited for the sun to drop behind the trees before asking Mahnoor and Aliee to simply look at each other.",
    featuredImage: heroImage("mahnoor-aliee-mehndi-sunset-shoot-kabeer-studio"),
    publishedAt: "2026-10-01",
    relatedSlugs: [
      "best-time-of-day-for-wedding-photography-in-lahore",
      "mehndi-nikah-baraat-walima-wedding-photography",
      "mahnoor-aliee-baraat-shoot-gs-productions",
    ],
    faqTags: ["light", "mehndi", "events", "style"],
    blocks: [
      {
        type: "paragraph",
        text: "Mahnoor and Aliee's mehndi portrait happened in about four minutes of usable light — the short stretch right as the sun drops behind the tree line at Kabeer Studio and the sky goes soft and gold before losing colour altogether. Everything about this shoot was built around not missing that window.",
      },
      {
        type: "heading",
        text: "Planning a shoot around four minutes of light",
      },
      {
        type: "paragraph",
        text: "We scouted this spot earlier in the day, checked what time the sun would actually clear the trees rather than guessing, and had Mahnoor and Aliee ready to walk out the moment the light turned. That's the whole method behind what we call golden hour planning, and we've written more generally about timing portraits to the light in [The Best Time of Day for Wedding Photography in Lahore](/blog/best-time-of-day-for-wedding-photography-in-lahore) — this shoot is that article in practice.",
      },
      {
        type: "heading",
        text: "Letting the sun do the work",
      },
      {
        type: "paragraph",
        text: "We shot this on the Sony A7III with the 85mm f/1.8, positioned so the setting sun sat directly behind the couple through the trees. At that focal length and aperture, the light scattering through the leaves turns into soft, warm shapes rather than harsh dots, and the compression pulls the whole background in tight behind Mahnoor and Aliee. We used no additional light here — a rare shoot where the honest answer to \"what was the lighting setup\" is simply the sun, in the right place, at the right minute.",
      },
      {
        type: "paragraph",
        text: "This was shot at [Kabeer Studio](https://www.instagram.com/kabeerrajpootofficial). A couple of weeks later we photographed Mahnoor and Aliee again for their baraat — read that shoot in [Mahnoor & Aliee: A Baraat Shoot at GS Productions](/blog/mahnoor-aliee-baraat-shoot-gs-productions), and see how we think about each wedding event's mood in [our Mehndi, Nikah, Baraat & Walima guide](/blog/mehndi-nikah-baraat-walima-wedding-photography).",
      },
    ],
  },

  // 10 ───────────────────────────────────────────────────────────
  {
    slug: "hafsa-bridal-campaign-shoot-lahore",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "bridal campaign photography Lahore",
    decorativeTitle: "The Campaign",
    title: "Hafsa: A Bridal Campaign Shoot, Styled Like a Baraat",
    seoTitle: "Bridal Campaign Photography in Lahore | RBA Films & Photography",
    metaDescription:
      "Behind a studio bridal campaign shoot with model Hafsa, styled and lit like a baraat portrait — and what campaign work teaches us about wedding photography.",
    excerpt:
      "A campaign shoot gives us room to experiment — this one, styled like a baraat portrait, fed straight back into how we shoot real weddings.",
    featuredImage: heroImage("hafsa-bridal-campaign-shoot-lahore"),
    publishedAt: "2026-10-02",
    relatedSlugs: [
      "inside-a-premium-wedding-photography-package",
      "planning-a-luxury-wedding-in-lahore",
    ],
    faqTags: ["luxury", "style", "packages"],
    blocks: [
      {
        type: "paragraph",
        text: "Not every shoot on our calendar is a wedding. Every few months we run a campaign shoot with a model rather than a couple, purely to test styling and lighting ideas before we bring them to a real booking. This one, with Hafsa, was styled and lit as if it were a baraat bridal portrait — full jewellery, formal posing, the works.",
      },
      {
        type: "heading",
        text: "Why campaign work matters for wedding photography",
      },
      {
        type: "paragraph",
        text: "A real wedding day gives you one chance at a portrait. A campaign shoot gives you the freedom to fail, adjust and try again without a client's timeline pressing on every decision. We use that freedom deliberately: this is where we test a new lighting ratio, a new pose, or a new lens combination before it goes anywhere near an actual baraat or walima. The ideas that work here are the ones you'll see us use in [premium wedding photography packages](/blog/inside-a-premium-wedding-photography-package).",
      },
      {
        type: "heading",
        text: "The lighting setup",
      },
      {
        type: "paragraph",
        text: "For this portrait we built a controlled beauty-light setup: a Godox AD200 Pro through a softbox as key, placed high and close for soft, even light across Hafsa's face and jewellery, with a second smaller light as a hair and rim source to separate her from the backdrop. Shot on the Sony A7III with the 85mm f/1.8, close enough that every detail in the jewellery and embroidery holds up at full resolution. It's a slower, more deliberate process than most of our wedding-day coverage, closer to how we'd approach [an editorial portrait for a luxury wedding](/blog/planning-a-luxury-wedding-in-lahore) than a candid frame.",
      },
    ],
  },

  // 11 ───────────────────────────────────────────────────────────
  {
    slug: "mahnoor-aliee-baraat-shoot-gs-productions",
    cluster: "Studio Stories",
    role: "story",
    primaryKeyword: "GS Productions wedding shoot Lahore",
    decorativeTitle: "Bright Baraat",
    title: "Mahnoor & Aliee: A Baraat Shoot at GS Productions",
    seoTitle: "Baraat Shoot at GS Productions | RBA Films & Photography",
    metaDescription:
      "From a sunset mehndi to a studio baraat — Mahnoor and Aliee's second shoot with us, this time at GS Productions in Gulberg, Lahore.",
    excerpt:
      "A few weeks after their sunset mehndi portrait, we met Mahnoor and Aliee again for their baraat shoot at GS Productions.",
    featuredImage: heroImage("mahnoor-aliee-baraat-shoot-gs-productions"),
    publishedAt: "2026-10-03",
    relatedSlugs: [
      "mahnoor-aliee-mehndi-sunset-shoot-kabeer-studio",
      "maria-faisal-baraat-couple-shoot-gs-productions",
      "best-wedding-venues-in-lahore-for-photography",
    ],
    faqTags: ["venues", "team", "events"],
    blocks: [
      {
        type: "paragraph",
        text: "Mahnoor and Aliee's mehndi portrait was all natural light and open sky. Their baraat shoot, a few weeks later at [GS Productions](https://www.gsproductions.pk/) in Gulberg III, was the opposite kind of problem: a fully controlled studio set, with every light placed on purpose rather than found.",
      },
      {
        type: "heading",
        text: "Two shoots, two entirely different disciplines",
      },
      {
        type: "paragraph",
        text: "Photographing the same couple outdoors and then in a studio, weeks apart, is a good reminder that wedding photography in Lahore isn't one skill — it's several. Outdoors, the job is reading and reacting to light that's already there. In a studio, the job is building it from nothing. Both shoots needed the same lens on the same body, the Sony A7III with the 85mm f/1.8, but almost nothing else about the process matched.",
      },
      {
        type: "heading",
        text: "Building the studio light",
      },
      {
        type: "paragraph",
        text: "For this set we layered two sources: a Godox AD200 Pro through a softbox as the main key, angled from slightly above and to one side, and a second, ungridded AD200 Pro behind the set as a rim light to lift Mahnoor and Aliee away from the backdrop. For the wider two-shot showing the full styling of the set, we switched briefly to the 27mm f/1.2, which let us open the aperture enough to keep a shallow, cinematic depth of field even at a wider focal length — a trade-off the faster 1.2 glass makes possible that the 1.8 lenses can't quite match at this framing.",
      },
      {
        type: "paragraph",
        text: "Their mehndi shoot, lit entirely by the setting sun, is in [Mahnoor & Aliee: A Mehndi Portrait at Golden Hour, Kabeer Studio](/blog/mahnoor-aliee-mehndi-sunset-shoot-kabeer-studio). This wasn't the first time we'd shot at GS Productions either — see [Maria & Faisal's baraat portrait](/blog/maria-faisal-baraat-couple-shoot-gs-productions) from the same studio, and our notes on [choosing a venue or studio for wedding photography](/blog/best-wedding-venues-in-lahore-for-photography).",
      },
    ],
  },
];
