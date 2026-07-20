export type Project = {
  title: string;
  description: string;
  tech: string[];
  href: string;
  externalLabel?: string;
};

export const projects: Project[] = [
  {
    title: "Axo Alley",
    description:
      "Educational virtual pet platform for kids based on the Ontario curriculum. Kids play learning games to earn coins and care for their Axolotl.",
    tech: ["Next.js", "React", "Tailwind"],
    href: "https://axoalley.com",
    externalLabel: "Visit site",
  },
  {
    title: "Tamagotchi Habit Tracker",
    description:
      "A gamified habit tracker utilizing virtual pet mechanics to keep daily routines engaging.",
    tech: ["Web", "React"],
    href: "https://github.com/hackmods/tamagotchi-habit-tracker",
  },
  {
    title: "Cursor Proxmox MCP",
    description:
      "A Model Context Protocol server for integrating Proxmox with Cursor AI — QEMU, LXC, storage, HA, and more.",
    tech: ["TypeScript", "Node"],
    href: "https://github.com/hackmods/cursor-proxmox-mcp",
  },
  {
    title: "Union Communications",
    description:
      "Streamlined communications tools for unions — on-device Comms toolbox and self-hosted Officer Hub.",
    tech: ["Web"],
    href: "https://github.com/hackmods/union-communications",
  },
  {
    title: "autoXOA",
    description:
      "An automatic installer for getting and compiling Xen Orchestra from source.",
    tech: ["Shell"],
    href: "https://github.com/hackmods/autoXOA",
  },
  {
    title: "Script-Depot",
    description:
      "A collection of PowerShell admin scripts to automate solutions for one-off issues.",
    tech: ["PowerShell"],
    href: "https://github.com/hackmods/Script-Depot",
  },
];

export const featuredProject = projects[0];
