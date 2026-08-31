import Image from "next/image";

export default function AgentToolsArt() {
  return (
    <div className="agent-tools-art" aria-hidden="true">
      <div className="agent-tool agent-tool-codex"><Image src="/images/tools/codex-reference.png" alt="" fill sizes="(max-width: 700px) 40vw, 14rem" /></div>
      <span className="agent-tools-plus">+</span>
      <div className="agent-tool agent-tool-copilot"><Image src="/images/tools/github-copilot-reference.png" alt="" fill sizes="(max-width: 700px) 40vw, 14rem" /></div>
    </div>
  );
}
