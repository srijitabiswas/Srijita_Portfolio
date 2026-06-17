import CaseLayout from "./CaseLayout";
 
export default function CaseSavor() {
  return (
    <CaseLayout
      num="01"
      title="Savor"
      subtitle="Decision-first food ordering app designed to reduce choice overload and help users order faster with clarity."
      category="UX Design · React · Tailwind"
      tags={["React", "UX Design", "Tailwind CSS", "React Router", "Context API", "Netlify"]}
      color="#FFF0E6"
      accent="#D4712A"
      overview="Savor is a food ordering experience built around one idea: less is more. Instead of showing you every restaurant in the city, Savor guides you to the right meal through structured choices, budget-first filtering, and a 'Decide for me' feature that eliminates the paralysis of too many options."
      problem="Most food delivery apps prioritize engagement and scrolling over decision-making. Users face hundreds of options, cluttered UIs, and no hierarchy — leading to decision fatigue, slower ordering, and frustration. The result is a product that works against the user."
      solution="Savor introduces a decision-first flow that flips the model. By leading with budget and mood rather than menus, it presents a curated shortlist instead of an endless feed. Every screen is designed to build confidence in the user's choice, not to maximize time-on-app."
      sections={[
        {
          title: "Research Insights",
          body: [
            "Too many options cause measurable decision fatigue — users take longer and feel less satisfied with their choices.",
            "Cluttered UI increases cognitive load and slows down the ordering process significantly.",
            "Poor visual hierarchy forces users to scan entire pages rather than spotting relevant information quickly.",
            "Users often abandon the app mid-selection and re-open it multiple times before placing an order."
          ]
        },
        {
          title: "Key Features",
          body: [
            "Budget-first discovery using sliders and quick presets (₹100, ₹200, ₹500+)",
            "Curated results showing only 3–5 best matches instead of overwhelming feeds",
            "Dish clarity cards with rating, delivery time, pricing, and allergy info upfront",
            "'Decide for me' randomizer that picks the top match based on current filters",
            "Distraction-free UI with no banners, no promotions, no infinite scroll",
            "Smooth animations and transitions using React state management"
          ]
        },
        {
          title: "Design Process",
          body: "Starting from user research on decision fatigue, I mapped the ordering journey and identified 5 key friction points. I then created low-fidelity wireframes focusing on information hierarchy — what does the user absolutely need to see at each step? The final high-fidelity design uses an orange accent palette to evoke warmth and appetite while keeping the interface minimal and focused."
        },
        {
          title: "Impact",
          body: "Savor reduces time-to-decision by guiding users through structured choices rather than exposing them to unfiltered data. The decision-first model improves user confidence and creates a calmer ordering experience. The live demo on Netlify has been used to validate the concept with real users."
        },
        {
          title: "Future Scope",
          body: [
            "Backend integration with real restaurant APIs (Zomato, Swiggy)",
            "Payment system integration with UPI and card support",
            "Personalized recommendations based on past orders and taste profiles",
            "Group ordering mode — one person picks, everyone confirms"
          ]
        }
      ]}
      techStack={[
        { label: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
        { label: "Routing & State", items: ["React Router", "Context API"] },
        { label: "Deployment", items: ["Netlify"] }
      ]}
      links={[
        { label: "Live Demo", href: "https://astonishing-pie-ab5054.netlify.app/", icon: "🌐" },
        { label: "GitHub", href: "https://github.com/srijitabiswas", icon: "⌥" }
      ]}
    />
  );
}