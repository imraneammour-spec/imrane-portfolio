import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { projects } from "../src/data/projects.ts";
import { site } from "../src/data/site.ts";
import { sendProjectMessage } from "../src/lib/send-message.ts";
import { projectCategories, matchesProjectCategory } from "../src/lib/project-filters.ts";

test("filters are derived from real content and never expose empty categories", () => {
  assert.deepEqual(projectCategories([]), ["All"]);
  assert.deepEqual(projectCategories(projects), ["All", "Interior Design", "Architecture", "3D Visualization"]);
  assert.equal(projects.filter(project => matchesProjectCategory(project, "Architecture")).length, 1);
  const withPlan = { ...projects[0], technicalDrawings: [{ src:"/test-only-plan.svg", alt:"Test plan", width:100, height:100 }] };
  assert.ok(projectCategories([withPlan]).includes("Technical Drawings"));
  assert.ok(matchesProjectCategory(withPlan,"Technical Drawings"));
});

test("project routes are unique and every referenced original asset exists", () => {
  assert.equal(
    new Set(projects.map((project) => project.slug)).size,
    projects.length,
  );
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    assert.ok(project.gallery.length > 0);
    for (const image of [
      project.cover,
      project.preview,
      ...project.gallery,
      ...(project.materialBoard || []),
      ...(project.technicalDrawings || []),
    ]) {
      assert.ok(existsSync(resolve("." + image.src)), image.src);
      assert.ok(image.width > 0 && image.height > 0);
      assert.ok(image.alt.trim());
    }
  }
});
test("no empty category and no unsubstantiated years are introduced", () => {
  assert.ok(projects.some((project) => project.category === "Architecture"));
  assert.ok(projects.some((project) => project.category === "Interior Design"));
  assert.ok(projects.every((project) => project.year === undefined));
  assert.equal(
    projects.find((project) => project.slug === "villa-contemporaine").status,
    "Personal study · Concept",
  );
});
test("only configured contact destinations are provided", () => {
  assert.match(site.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.ok(new URL(site.whatsapp).hostname === "wa.me");
  assert.ok(new URL(site.form.endpoint).hostname === "formspree.io");
});
test("provider acceptance is required and error responses never count as success", async () => {
  const data = new FormData();
  data.set("name", "Local test");
  const signal = new AbortController().signal;
  let captured;
  await sendProjectMessage(
    "https://formspree.io/f/local-test",
    data,
    signal,
    async (url, options) => {
      captured = options;
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    },
  );
  assert.equal(captured.method, "POST");
  assert.equal(captured.body, data);
  for (const [status, body] of [
    [400, { errors: [{ message: "Invalid email" }] }],
    [200, { ok: false }],
    [200, { errors: ["Rejected"] }],
    [503, { error: "Unavailable" }],
  ]) {
    await assert.rejects(
      sendProjectMessage(
        "https://formspree.io/f/local-test",
        data,
        signal,
        async () => new Response(JSON.stringify(body), { status }),
      ),
    );
  }
  await assert.rejects(
    sendProjectMessage(
      "https://formspree.io/f/local-test",
      data,
      signal,
      async () => {
        throw new Error("Network failed");
      },
    ),
  );
});
