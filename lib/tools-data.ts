export interface Tool {
  id: string
  name: string
  description: string
  category: string
  subcategory?: string
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  platform: string[]
  tags: string[]
  documentation?: string
  github?: string
  website?: string
  installed: boolean
  lastUsed?: string
  rating: number
  installCommand?: string
  installInstructions?: string[]
  dependencies?: string[]
  size?: string
}

export const toolsData: Tool[] = [
  // Vulnerability Analysis Tools
  {
    id: "nmap",
    name: "Nmap",
    description: "Network discovery and security auditing tool for network exploration and port scanning.",
    category: "vulnerability-analysis",
    difficulty: "Intermediate",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["network", "scanning", "discovery", "ports"],
    website: "https://nmap.org",
    github: "https://github.com/nmap/nmap",
    installed: true,
    lastUsed: "2024-01-15",
    rating: 4.9,
    installCommand: "sudo apt install nmap",
    installInstructions: [
      "Update package manager: sudo apt update",
      "Install Nmap: sudo apt install nmap",
      "Verify installation: nmap --version",
    ],
    dependencies: ["libpcap", "openssl"],
    size: "25.4 MB",
  },
  {
    id: "dmitry",
    name: "Dmitry",
    description: "Deepmagic Information Gathering Tool for subdomain enumeration and information gathering.",
    category: "vulnerability-analysis",
    difficulty: "Beginner",
    platform: ["Linux"],
    tags: ["information-gathering", "subdomain", "enumeration"],
    installed: true,
    rating: 4.2,
  },
  {
    id: "fkc-scan",
    name: "FKC-Scan",
    description: "Fast Kali Comprehensive scanner for vulnerability assessment.",
    category: "vulnerability-analysis",
    difficulty: "Intermediate",
    platform: ["Linux"],
    tags: ["vulnerability", "scanning", "assessment"],
    installed: false,
    rating: 4.0,
  },
  {
    id: "legion",
    name: "Legion",
    description: "Automatic enumeration tool with GUI interface for penetration testing.",
    category: "vulnerability-analysis",
    difficulty: "Beginner",
    platform: ["Linux"],
    tags: ["enumeration", "gui", "automation"],
    github: "https://github.com/carlospolop/legion",
    installed: true,
    rating: 4.3,
  },
  {
    id: "maltego",
    name: "Maltego",
    description: "Interactive data mining tool for link analysis and intelligence gathering.",
    category: "vulnerability-analysis",
    difficulty: "Advanced",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["osint", "data-mining", "intelligence"],
    website: "https://www.maltego.com",
    installed: true,
    lastUsed: "2024-01-10",
    rating: 4.7,
  },

  // Password Attack Tools
  {
    id: "cewl",
    name: "CeWL",
    description: "Custom Word List generator that spiders websites to create password lists.",
    category: "password-attacks",
    difficulty: "Beginner",
    platform: ["Linux"],
    tags: ["wordlist", "password", "generation", "spider"],
    github: "https://github.com/digininja/CeWL",
    installed: true,
    rating: 4.1,
  },
  {
    id: "crunch",
    name: "Crunch",
    description: "Wordlist generator where you can specify a standard character set or custom character set.",
    category: "password-attacks",
    difficulty: "Beginner",
    platform: ["Linux"],
    tags: ["wordlist", "generator", "brute-force"],
    installed: true,
    rating: 4.4,
    installCommand: "sudo apt install crunch",
    installInstructions: [
      "Update package repositories: sudo apt update",
      "Install Crunch: sudo apt install crunch",
      "Test installation: crunch --help",
      "Create sample wordlist: crunch 4 4 -o test.txt",
    ],
    dependencies: ["libc6", "libgcc1"],
    size: "156 KB",
  },
  {
    id: "hashcat",
    name: "Hashcat",
    description: "Advanced password recovery tool supporting over 300 hash algorithms.",
    category: "password-attacks",
    difficulty: "Advanced",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["password", "cracking", "hash", "gpu"],
    website: "https://hashcat.net",
    github: "https://github.com/hashcat/hashcat",
    installed: true,
    lastUsed: "2024-01-12",
    rating: 4.8,
  },
  {
    id: "hydra",
    name: "Hydra",
    description: "Fast network logon cracker supporting many different services.",
    category: "password-attacks",
    difficulty: "Intermediate",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["brute-force", "network", "login", "cracking"],
    github: "https://github.com/vanhauser-thc/thc-hydra",
    installed: true,
    rating: 4.6,
  },
  {
    id: "john",
    name: "John the Ripper",
    description: "Fast password cracker with support for many hash and cipher types.",
    category: "password-attacks",
    difficulty: "Intermediate",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["password", "cracking", "hash", "cipher"],
    website: "https://www.openwall.com/john/",
    installed: true,
    rating: 4.7,
  },

  // Wireless Attack Tools
  {
    id: "aircrack-ng",
    name: "Aircrack-ng",
    description: "Complete suite of tools to assess WiFi network security.",
    category: "wireless-attacks",
    difficulty: "Intermediate",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["wifi", "wireless", "wep", "wpa", "cracking"],
    website: "https://www.aircrack-ng.org",
    installed: true,
    lastUsed: "2024-01-08",
    rating: 4.8,
  },
  {
    id: "kismet",
    name: "Kismet",
    description: "Wireless network and device detector, sniffer, wardriving tool.",
    category: "wireless-attacks",
    difficulty: "Advanced",
    platform: ["Linux"],
    tags: ["wireless", "detection", "sniffing", "wardriving"],
    website: "https://www.kismetwireless.net",
    installed: true,
    rating: 4.5,
  },
  {
    id: "mdk3",
    name: "MDK3",
    description: "Wireless attack tool for IEEE 802.11 networks.",
    category: "wireless-attacks",
    difficulty: "Intermediate",
    platform: ["Linux"],
    tags: ["wireless", "attack", "802.11", "dos"],
    installed: false,
    rating: 4.2,
  },

  // Exploitation Tools
  {
    id: "metasploit",
    name: "Metasploit",
    description: "Advanced penetration testing framework with extensive exploit database.",
    category: "exploitation-tools",
    difficulty: "Advanced",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["exploitation", "framework", "penetration-testing"],
    website: "https://www.metasploit.com",
    installed: true,
    lastUsed: "2024-01-14",
    rating: 4.9,
  },
  {
    id: "searchsploit",
    name: "SearchSploit",
    description: "Command line search tool for Exploit Database.",
    category: "exploitation-tools",
    difficulty: "Beginner",
    platform: ["Linux"],
    tags: ["exploit", "database", "search", "vulnerability"],
    installed: true,
    rating: 4.4,
  },
  {
    id: "shellnoob",
    name: "ShellNoob",
    description: "Toolkit for writing shellcodes and converting between formats.",
    category: "exploitation-tools",
    difficulty: "Expert",
    platform: ["Linux"],
    tags: ["shellcode", "exploitation", "binary"],
    github: "https://github.com/reyammer/shellnoob",
    installed: false,
    rating: 4.1,
  },

  // Forensics Tools
  {
    id: "autopsy",
    name: "Autopsy",
    description: "Digital forensics platform with graphical interface for investigating hard drives.",
    category: "forensics",
    difficulty: "Intermediate",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["forensics", "investigation", "gui", "hard-drive"],
    website: "https://www.autopsy.com",
    installed: true,
    rating: 4.6,
  },
  {
    id: "binwalk",
    name: "Binwalk",
    description: "Firmware analysis tool for searching binary images for embedded files.",
    category: "forensics",
    difficulty: "Intermediate",
    platform: ["Linux"],
    tags: ["firmware", "binary", "analysis", "embedded"],
    github: "https://github.com/ReFirmLabs/binwalk",
    installed: true,
    rating: 4.5,
  },
  {
    id: "bulk-extractor",
    name: "Bulk Extractor",
    description: "Computer forensics tool that scans disk images for useful information.",
    category: "forensics",
    difficulty: "Advanced",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["forensics", "disk-image", "extraction"],
    installed: true,
    rating: 4.3,
  },

  // Post Exploitation Tools
  {
    id: "backdoor-factory",
    name: "Backdoor Factory",
    description: "Patch PE, ELF, Mach-O binaries with shellcode.",
    category: "post-exploitation",
    difficulty: "Expert",
    platform: ["Linux"],
    tags: ["backdoor", "binary", "shellcode", "patching"],
    github: "https://github.com/secretsquirrel/the-backdoor-factory",
    installed: false,
    rating: 4.2,
  },
  {
    id: "bloodhound",
    name: "BloodHound",
    description: "Active Directory reconnaissance tool for identifying attack paths.",
    category: "post-exploitation",
    difficulty: "Advanced",
    platform: ["Linux", "Windows"],
    tags: ["active-directory", "reconnaissance", "attack-paths"],
    github: "https://github.com/BloodHoundAD/BloodHound",
    installed: true,
    lastUsed: "2024-01-11",
    rating: 4.7,
  },
  {
    id: "evil-winrm",
    name: "Evil-WinRM",
    description: "Ultimate WinRM shell for hacking/pentesting.",
    category: "post-exploitation",
    difficulty: "Intermediate",
    platform: ["Linux"],
    tags: ["winrm", "shell", "windows", "remote"],
    github: "https://github.com/Hackplayers/evil-winrm",
    installed: true,
    rating: 4.5,
  },
  {
    id: "mimikatz",
    name: "Mimikatz",
    description: "Extract plaintexts passwords, hash, PIN code and kerberos tickets from memory.",
    category: "post-exploitation",
    difficulty: "Advanced",
    platform: ["Windows"],
    tags: ["password", "memory", "kerberos", "windows"],
    github: "https://github.com/gentilkiwi/mimikatz",
    installed: true,
    rating: 4.8,
  },

  // Reverse Engineering Tools
  {
    id: "apktool",
    name: "APKTool",
    description: "Tool for reverse engineering Android APK files.",
    category: "reverse-engineering",
    difficulty: "Intermediate",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["android", "apk", "reverse-engineering", "mobile"],
    website: "https://ibotpeaches.github.io/Apktool/",
    installed: true,
    rating: 4.4,
  },
  {
    id: "bytecode-viewer",
    name: "Bytecode Viewer",
    description: "Java 8 Jar & Android APK reverse engineering suite.",
    category: "reverse-engineering",
    difficulty: "Advanced",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["java", "android", "bytecode", "gui"],
    github: "https://github.com/Konloch/bytecode-viewer",
    installed: false,
    rating: 4.3,
  },
  {
    id: "clang",
    name: "Clang",
    description: "C language family frontend for LLVM with static analysis capabilities.",
    category: "reverse-engineering",
    difficulty: "Expert",
    platform: ["Linux", "Windows", "macOS"],
    tags: ["compiler", "static-analysis", "c", "llvm"],
    website: "https://clang.llvm.org",
    installed: true,
    rating: 4.6,
  },
]

export const categories = [
  {
    id: "vulnerability-analysis",
    name: "Vulnerability Analysis",
    description: "Tools for discovering and analyzing security vulnerabilities",
    color: "from-red-500 to-red-600",
    icon: "Bug",
  },
  {
    id: "password-attacks",
    name: "Password Attacks",
    description: "Password cracking and brute force attack tools",
    color: "from-orange-500 to-orange-600",
    icon: "Lock",
  },
  {
    id: "wireless-attacks",
    name: "Wireless Attacks",
    description: "WiFi and wireless network security testing tools",
    color: "from-blue-500 to-blue-600",
    icon: "Wifi",
  },
  {
    id: "exploitation-tools",
    name: "Exploitation Tools",
    description: "Frameworks and tools for exploiting vulnerabilities",
    color: "from-purple-500 to-purple-600",
    icon: "Terminal",
  },
  {
    id: "forensics",
    name: "Forensics",
    description: "Digital forensics and incident response tools",
    color: "from-green-500 to-green-600",
    icon: "FileSearch",
  },
  {
    id: "post-exploitation",
    name: "Post Exploitation",
    description: "Tools for maintaining access and privilege escalation",
    color: "from-pink-500 to-pink-600",
    icon: "Skull",
  },
  {
    id: "reverse-engineering",
    name: "Reverse Engineering",
    description: "Binary analysis and reverse engineering tools",
    color: "from-cyan-500 to-cyan-600",
    icon: "Wrench",
  },
]

export function getToolsByCategory(categoryId: string): Tool[] {
  return toolsData.filter((tool) => tool.category === categoryId)
}

export function getToolById(toolId: string): Tool | undefined {
  return toolsData.find((tool) => tool.id === toolId)
}

export function searchTools(query: string): Tool[] {
  const lowercaseQuery = query.toLowerCase()
  return toolsData.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowercaseQuery) ||
      tool.description.toLowerCase().includes(lowercaseQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}
