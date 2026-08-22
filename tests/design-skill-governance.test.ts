import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const read = (path: string) => readFile(resolve(path), "utf8");

describe("gobernanza del diseño de módulos", () => {
  it("mantiene la skill canónica enlazada desde las reglas permanentes", async () => {
    const [agents, skill] = await Promise.all([
      read("AGENTS.md"),
      read("skills/hier-module-designer/SKILL.md"),
    ]);

    expect(agents).toContain("skills/hier-module-designer/SKILL.md");
    expect(skill).toContain("name: hier-module-designer");
    expect(skill).toContain("ADR-004-theme-system-and-reference-intake.md");
  });

  it("conserva el routing de todos los especialistas aprobados por ADR-006", async () => {
    const skill = await read("skills/hier-module-designer/SKILL.md");
    const specialists = [
      "information-architect",
      "design-taste-frontend",
      "imagegen",
      "ui-design-system",
      "emil-design-eng",
      "motion",
      "impeccable",
      "frontend-design-review",
    ];

    for (const specialist of specialists) {
      expect(skill, specialist).toContain(`\`${specialist}\``);
    }
  });

  it("no permite que la skill conceda certificación automática", async () => {
    const [skill, adr] = await Promise.all([
      read("skills/hier-module-designer/SKILL.md"),
      read("docs/decisions/ADR-006-design-skill-orchestration.md"),
    ]);

    expect(adr).toContain("**Estado:** Accepted");
    expect(skill).toContain("aprobación humana");
    expect(skill).toContain("No cambies el estado a `certified`");
  });
});

