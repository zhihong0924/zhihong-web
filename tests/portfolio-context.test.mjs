import assert from "node:assert/strict";
import test from "node:test";
import { getRelevantPortfolioContext } from "../app/lib/portfolio-context.ts";

test("the featured built question retrieves public project evidence", async () => {
  const context = await getRelevantPortfolioContext("What has Zhihong built?");
  const projectsContext = await getRelevantPortfolioContext("What projects has Zhihong worked on?");

  assert.match(context, /## Public projects and portfolio/);
  assert.match(context, /## TZH Sports Centre\n/);
  assert.match(context, /## Intel: schematic and testbench migration automation/);
  assert.match(projectsContext, /## Public projects and portfolio/);
});

test("specific preset questions retain their focused retrieval", async () => {
  const sports = await getRelevantPortfolioContext("Tell me about TZH Sports Centre");
  const automation = await getRelevantPortfolioContext("What is his work in automation?");

  assert.match(sports, /## TZH Sports Centre\n/);
  assert.match(automation, /## Intel: schematic and testbench migration automation/);
});

test("unrelated questions remain outside the portfolio scope", async () => {
  assert.equal(await getRelevantPortfolioContext("What is the weather tomorrow?"), "");
});
