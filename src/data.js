export const tasks = [
  {
    id: 1,
    title: "Task 1: Climate Change Essay",
    taskDesc: "You are completing a research essay on climate change mechanisms. Read the paragraph below, then review the AI-generated continuation and decide whether to accept, edit, or reject it.",
    draft: "Climate feedback loops are self-reinforcing cycles that can accelerate or dampen the effects of climate change. The ice-albedo feedback, for instance, amplifies warming as ice melts, darker ocean surfaces absorb more solar radiation, leading to further warming.",
    aiResponse: "The interplay between carbon cycle feedbacks and atmospheric CO2 concentrations represents a particularly critical amplification pathway. Methane release from permafrost thaw zones contributes an additional radiative forcing of approximately 0.5 W/m² per decade — a figure well-documented in IPCC AR6 synthesis data.",
    confidenceNumeric: 82,
    confidenceLabel: "High Confidence",
    confidenceTip: "Verify specific statistics before accepting.",
    isLowConfidence: false
  },
  {
    id: 2,
    title: "Task 2: Financial Email",
    taskDesc: "You are drafting an email to a client explaining Q3 portfolio performance. Review the AI's suggested conclusion.",
    draft: "Our tech sector investments yielded a strong 12% return this quarter, primarily driven by early adoption of new AI-integrated infrastructure platforms.",
    aiResponse: "Moving forward into Q4, historical trends suggest a potential market correction of 5-8% in the technology sector due to seasonal adjustments and potential regulatory shifts in global markets.",
    confidenceNumeric: 45,
    confidenceLabel: "Low Confidence",
    confidenceTip: "The AI system is uncertain about future market predictions. Claims may be unverified.",
    isLowConfidence: true
  },
  {
    id: 3,
    title: "Task 3: Historical Summary",
    taskDesc: "You are writing a short bio of Ada Lovelace for a blog post. Review the AI's suggested text.",
    draft: "Augusta Ada King, Countess of Lovelace, was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine.",
    aiResponse: "She is often regarded as the first computer programmer because she recognized that the machine had applications beyond pure calculation and published the first algorithm intended to be carried out by such a machine.",
    confidenceNumeric: 95,
    confidenceLabel: "Very High Confidence",
    confidenceTip: "Information is widely corroborated across historical sources.",
    isLowConfidence: false
  },
  {
    id: 4,
    title: "Task 4: Medical Explanation",
    taskDesc: "You are editing a patient-facing brochure explaining the side effects of a common antibiotic. Review the AI's addition.",
    draft: "Common side effects of this antibiotic may include nausea, occasional vomiting, and mild abdominal discomfort. It is recommended to take the medication with a small meal.",
    aiResponse: "However, if you experience a severe allergic reaction such as anaphylaxis, stop the medication immediately. Furthermore, long-term use has been definitively linked to autoimmune disorders in 15% of patients.",
    confidenceNumeric: 30,
    confidenceLabel: "Low Confidence",
    confidenceTip: "Medical claims made by the AI have a high risk of hallucination. Consult certified clinical literature.",
    isLowConfidence: true
  },
  {
    id: 5,
    title: "Task 5: Code Documentation",
    taskDesc: "You are documenting a Python function that parses JSON data. Review the AI-generated docstring.",
    draft: "def parse_data(raw_json: str) -> dict:\n    \"\"\"Parses raw JSON string and returns a dictionary.\"\"\"\n    return json.loads(raw_json)",
    aiResponse: "Raises:\n    ValueError: If raw_json is not a valid JSON string or if the resulting parsed object is a list instead of a dict.",
    confidenceNumeric: 78,
    confidenceLabel: "Moderate Confidence",
    confidenceTip: "Check edge cases and exceptions thrown by your specific JSON library.",
    isLowConfidence: false
  }
];