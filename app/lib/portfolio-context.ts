import { readFile } from "node:fs/promises";
import path from "node:path";

type PortfolioSection = {
  title: string;
  content: string;
};

const CONTEXT_PATH = path.join(process.cwd(), "content/portfolio-context.md");
const MAX_RETRIEVED_SECTIONS = 3;
const MAX_SECTION_CHARACTERS = 1_800;
const MIN_RETRIEVAL_SCORE = 2;
const STOP_WORDS = new Set(["about", "and", "are", "can", "does", "for", "from", "have", "his", "how", "me", "tell", "that", "the", "their", "what", "with", "you", "your", "zhihong", "chong"]);
const GENERAL_PROFILE_QUERY_PATTERN = /\b(?:who\s+is|tell\s+me\s+about)\s+(?:zhihong|chong(?:\s+zhi\s+hong)?)\b|\b(?:experience|background|career|role|skills?)\b/i;

function tokenize(value: string) {
  return [...new Set(value.toLowerCase().match(/[a-z0-9]+/g)?.filter((term) => term.length > 2 && !STOP_WORDS.has(term)) ?? [])];
}

function parseSections(markdown: string): PortfolioSection[] {
  const sections: PortfolioSection[] = [];
  let title = "Profile";
  let content: string[] = [];

  const saveSection = () => {
    const text = content.join("\n").trim();
    if (text) sections.push({ title, content: text });
  };

  for (const line of markdown.split("\n")) {
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      saveSection();
      title = heading[1].trim();
      content = [];
    } else if (!line.startsWith("# ")) {
      content.push(line);
    }
  }

  saveSection();
  return sections;
}

function scoreSection(section: PortfolioSection, queryTerms: string[]) {
  const title = section.title.toLowerCase();
  const content = section.content.toLowerCase();

  return queryTerms.reduce((score, term) => (
    score + (title.includes(term) ? 4 : 0) + (content.includes(term) ? 1 : 0)
  ), 0);
}

export async function getRelevantPortfolioContext(question: string) {
  const markdown = await readFile(CONTEXT_PATH, "utf8");
  const sections = parseSections(markdown);
  const queryTerms = tokenize(question);
  const profileSection = sections.find(({ title }) => title.toLowerCase() === "profile");
  const scoredSections = sections
    .map((section) => ({ section, score: scoreSection(section, queryTerms) }))
    .filter(({ score }) => score >= MIN_RETRIEVAL_SCORE)
    .sort((left, right) => right.score - left.score);
  const selectedSections = GENERAL_PROFILE_QUERY_PATTERN.test(question) && profileSection
    ? [profileSection, ...scoredSections.map(({ section }) => section).filter((section) => section !== profileSection)]
    : scoredSections.map(({ section }) => section);

  return selectedSections
    .slice(0, MAX_RETRIEVED_SECTIONS)
    .map(({ title, content }) => `## ${title}\n${content.slice(0, MAX_SECTION_CHARACTERS)}`)
    .join("\n\n");
}
