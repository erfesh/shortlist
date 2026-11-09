/* Sample data for the Shortlist demo. Every person, firm and job here is fictional. */
window.SL_DATA = {
  personas: {
    lily: {
      id: "lily", name: "Lily Cohen", first: "Lily", initials: "LC", av: "av-l",
      role: "Project Architect", city: "Los Angeles",
      blurb: "Licensed architect, eight years on museums, libraries and civic buildings.",
      resume: ["Licensed architect in California", "8 years on cultural and civic projects", "Revit, Rhino, Enscape", "Led design development on two library projects", "Construction administration support on a museum wing"],
      targets: ["Project Architect", "Senior Architect", "Design Architect"],
      firms: ["Fieldstone Architects", "Marlowe and Ortiz Studio", "Kestrel Partners", "Arcwell Group", "Juniper and Vale", "Coastline Civic"],
      jobs: [
        { id: "l1", title: "Project Architect, Cultural Projects", co: "Fieldstone Architects", loc: "Los Angeles", pay: "$118K to $142K", posted: "2 days ago", score: 88, isNew: true, kit: true,
          summary: "Your museum and library work and California license line up closely. LEED AP is the only gap.",
          reqs: [["Licensed architect in California", "Strong", "Listed under licenses on your resume"], ["6+ years on cultural projects", "Strong", "8 years, two libraries and a museum wing"], ["Leads construction administration", "Partial", "You supported CA on the museum wing; leading it is not on your resume yet"], ["Revit and BIM coordination", "Strong", "Revit listed, plus coordination on both libraries"], ["LEED AP credential (preferred)", "Gap", "Not on your resume. Preferred, not required"]],
          pros: ["Same building types you already deliver", "Senior enough to grow into leading CA"], cons: ["Mention any CA meetings you ran yourself", "If you are studying for LEED AP, say so"] },
        { id: "l2", title: "Senior Architect, Hospitality", co: "Marlowe and Ortiz Studio", loc: "Santa Monica", pay: "$125K to $150K", posted: "today", score: 81, isNew: true,
          summary: "Strong technical match. Hospitality is a new building type for you, so the score is held at the low 80s.",
          reqs: [["10+ years in practice", "Partial", "8 years on your resume"], ["Hotel or restaurant projects", "Gap", "None listed"], ["Leads a team of 3 to 5", "Strong", "Led design development teams on both libraries"], ["Client presentations", "Strong", "Board and community presentations listed"]],
          pros: ["Leadership and client work carry over"], cons: ["Two years short of the stated experience"] },
        { id: "l3", title: "Design Architect, Residential", co: "Kestrel Partners", loc: "Pasadena", pay: "$105K to $128K", posted: "4 days ago", score: 76, isNew: true,
          summary: "Good design fit, different scale. Multifamily housing would be new for you.",
          reqs: [["Concept through DD design", "Strong", "Concept and DD on both libraries"], ["Multifamily housing", "Gap", "Not on your resume"], ["Rhino and Enscape", "Strong", "Both listed"]],
          pros: ["Design-led role, your strength"], cons: ["Smaller fee projects than you are used to"] },
        { id: "l4", title: "Architectural Designer, BIM", co: "Arcwell Group", loc: "Remote", pay: "$96K to $115K", posted: "1 week ago", score: 72, isNew: false,
          summary: "You can do this job, but it sits below your level. Score capped for level fit.",
          reqs: [["Revit families and templates", "Strong", "Revit listed"], ["Dynamo scripting", "Gap", "Not listed"], ["3+ years", "Strong", "8 years"]],
          pros: ["Fully remote"], cons: ["A step down in title and pay"] }
      ]
    },
    erik: {
      id: "erik", name: "Erik Cohen", first: "Erik", initials: "EC", av: "av-e",
      role: "Product Designer", city: "Los Angeles",
      blurb: "Product designer who also builds, with ten years across media, events and internal tools.",
      resume: ["10 years in product and visual design", "Figma, design systems, prototyping", "Builds front ends in React", "Shipped internal tools used by large teams", "Motion and video for social"],
      targets: ["Senior Product Designer", "UX Designer", "Design Technologist"],
      firms: ["Northlight Studios", "Lumen Streaming", "Harbor Games", "Brightwave Media", "Pinecrest Health", "Tidewater Labs"],
      jobs: [
        { id: "e1", title: "Senior UX Designer, Studio Tools", co: "Northlight Studios", loc: "Burbank, hybrid", pay: "$130K to $158K", posted: "1 day ago", score: 84, isNew: true, kit: true,
          summary: "Internal tools for creative teams is exactly your lane. Formal research leadership is the soft spot.",
          reqs: [["Designs complex internal tools", "Strong", "Shipped tools for large internal teams"], ["Prototypes in code", "Strong", "Builds front ends in React"], ["Leads user research", "Partial", "Runs feedback sessions; no formal studies listed"], ["Design system work", "Strong", "Figma libraries and shared components"]],
          pros: ["Your build skills are a plus here"], cons: ["Name one study you ran end to end"] },
        { id: "e2", title: "Product Designer, Viewer Experience", co: "Lumen Streaming", loc: "Los Angeles", pay: "$125K to $150K", posted: "3 days ago", score: 79, isNew: true,
          summary: "Media background fits. Consumer A/B testing is not on your resume.",
          reqs: [["Consumer product experience", "Partial", "Mostly internal and event products"], ["Experimentation and A/B tests", "Gap", "Not listed"], ["Motion design", "Strong", "Motion and video work listed"]],
          pros: ["Media and video depth"], cons: ["Little consumer experimentation"] },
        { id: "e3", title: "UX Designer, Live Ops Tools", co: "Harbor Games", loc: "Irvine", pay: "$115K to $140K", posted: "5 days ago", score: 74, isNew: false,
          summary: "Tooling fit is good. No games industry experience, so the score is held down.",
          reqs: [["Admin and live ops tools", "Strong", "Internal tools listed"], ["Games industry", "Gap", "Not listed"]],
          pros: ["Tools focus"], cons: ["New industry"] },
        { id: "e4", title: "Design Technologist", co: "Brightwave Media", loc: "Remote", pay: "$120K to $145K", posted: "1 week ago", score: 71, isNew: false,
          summary: "You have the mix of design and code. The role leans harder on engineering than your resume does.",
          reqs: [["React and TypeScript", "Partial", "React listed, TypeScript not"], ["Design to code handoff", "Strong", "Both sides listed"]],
          pros: ["Rare hybrid role"], cons: ["Add TypeScript if you use it"] }
      ]
    }
  },
  statuses: ["Saved", "Applied", "Interview", "Offer"],
  plans: [
    { id: "free", name: "Free", m: 0, y: 0, tag: "For a focused search", items: ["Watch 5 companies", "20 fit checks a month", "2 resume kits a month", "Application tracker"] },
    { id: "pro", name: "Pro", m: 12, y: 9, tag: "For an active search", best: true, items: ["Watch 25 companies", "Unlimited fit checks", "20 resume kits a month", "Daily email digest", "Roles at firms you don't watch"] },
    { id: "premium", name: "Premium", m: 29, y: 22, tag: "For a career move", items: ["Everything in Pro", "Unlimited resume kits", "Interview prep for each match", "Hourly checks on your top firms", "Priority support"] }
  ]
};
