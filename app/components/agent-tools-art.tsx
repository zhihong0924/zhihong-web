import Image from "next/image";

export default function AgentToolsArt() {
  return (
    <div className="agent-tools-art" aria-hidden="true">
      <div className="agent-tool agent-tool-codex"><Image src="/images/tools/codex-app-icon.png" alt="" fill sizes="(max-width: 700px) 46vw, 28rem" /></div>
      <div className="agent-tool agent-tool-copilot"><Image src="/images/tools/github-copilot-2025.png" alt="" fill sizes="(max-width: 700px) 46vw, 28rem" /></div>
    </div>
  );
}
