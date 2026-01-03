"use client";
import { useState } from "react";

export default function Home() {
  const [employeeName, setEmployeeName] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [alumni, setAlumni] = useState("yes");
  const [postedByEmployee, setPostedByEmployee] = useState("no");
  const [mentionProjects, setMentionProjects] = useState("no");
  const [skills, setSkills] = useState(
    "Java, Spring Boot, Docker, Kubernetes, CI/CD, Splunk, JavaScript, React, Node.js, SQL"
  );
  const [linkedinMsg, setLinkedinMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [copied, setCopied] = useState("");

  const canGenerate = employeeName.trim() && jobLink.trim() && skills.trim();

  // Unicode bold helper (LinkedIn safe)
  const bold = (text) =>
    text.replace(/[A-Za-z0-9]/g, (c) => {
      const boldMap = {
        A: "𝐀",
        B: "𝐁",
        C: "𝐂",
        D: "𝐃",
        E: "𝐄",
        F: "𝐅",
        G: "𝐆",
        H: "𝐇",
        I: "𝐈",
        J: "𝐉",
        K: "𝐊",
        L: "𝐋",
        M: "𝐌",
        N: "𝐍",
        O: "𝐎",
        P: "𝐏",
        Q: "𝐐",
        R: "𝐑",
        S: "𝐒",
        T: "𝐓",
        U: "𝐔",
        V: "𝐕",
        W: "𝐖",
        X: "𝐗",
        Y: "𝐘",
        Z: "𝐙",
        a: "𝐚",
        b: "𝐛",
        c: "𝐜",
        d: "𝐝",
        e: "𝐞",
        f: "𝐟",
        g: "𝐠",
        h: "𝐡",
        i: "𝐢",
        j: "𝐣",
        k: "𝐤",
        l: "𝐥",
        m: "𝐦",
        n: "𝐧",
        o: "𝐨",
        p: "𝐩",
        q: "𝐪",
        r: "𝐫",
        s: "𝐬",
        t: "𝐭",
        u: "𝐮",
        v: "𝐯",
        w: "𝐰",
        x: "𝐱",
        y: "𝐲",
        z: "𝐳",
        0: "𝟎",
        1: "𝟏",
        2: "𝟐",
        3: "𝟑",
        4: "𝟒",
        5: "𝟓",
        6: "𝟔",
        7: "𝟕",
        8: "𝟖",
        9: "𝟗",
      };
      return boldMap[c] || c;
    });

  const generateMessage = () => {
    const alumniLine =
      alumni === "yes"
        ? "We both belong to the same college, so I thought I’d reach out."
        : "I came across your profile while learning more about the team and thought I’d reach out.";

    const jobReference =
      postedByEmployee === "yes"
        ? `I saw your post about this opening (Job ID / Link: ${jobLink}) and wanted to reach out.`
        : `I came across this role (Job ID / Link: ${jobLink}) while exploring opportunities.`;

    const projectLine =
      mentionProjects === "yes"
        ? " I’ve also built projects using these technologies, details of which are included in my resume."
        : "";

    const linkedin = `Hi ${employeeName},

${alumniLine}

${jobReference}

I’m currently a ${bold(
      "System Engineer at TCS"
    )}, working across backend, frontend, and DevOps using ${skills}. I also maintain a ${bold(
      "1900+ LeetCode rating (Knight)"
    )} and regularly participate in coding contests.${projectLine}

If this looks like a possible fit, a referral from you would really help me take the next step, and I’d appreciate any guidance.`;

    const email = `Subject: Referral request

Hi ${employeeName},

${alumniLine}

${jobReference}

I’m currently a System Engineer at TCS with hands-on experience across backend, frontend, and DevOps (${skills}). I also hold a 1900+ LeetCode rating (Knight) and actively participate in competitive programming contests.${projectLine}

If possible, I’d really appreciate a referral or any guidance.

Thanks,
Vaibhav Tiwari`;

    setLinkedinMsg(linkedin);
    setEmailMsg(email);
  };

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-sm border p-6">
        <h1 className="text-xl font-semibold">Referral Message Generator</h1>
        <p className="text-sm text-gray-600 mt-1 mb-6">
          Clean, high-signal referral messages.
        </p>

        <div className="space-y-4">
          <input
            placeholder="Employee name"
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />

          <input
            placeholder="Job ID or job link"
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
          />

          <textarea
            placeholder="Skills (edit per role)"
            className="w-full rounded-md border px-3 py-2 text-sm h-20"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          {/* Alumni */}
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium">College alumni?</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={alumni === "yes"}
                  onChange={() => setAlumni("yes")}
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={alumni === "no"}
                  onChange={() => setAlumni("no")}
                />
                No
              </label>
            </div>
          </div>

          {/* Posted by employee */}
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Did this person post the job?</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={postedByEmployee === "yes"}
                  onChange={() => setPostedByEmployee("yes")}
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={postedByEmployee === "no"}
                  onChange={() => setPostedByEmployee("no")}
                />
                No
              </label>
            </div>
          </div>

          {/* Mention projects */}
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium">Mention projects in message?</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={mentionProjects === "yes"}
                  onChange={() => setMentionProjects("yes")}
                />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={mentionProjects === "no"}
                  onChange={() => setMentionProjects("no")}
                />
                No
              </label>
            </div>
          </div>

          <button
            disabled={!canGenerate}
            onClick={generateMessage}
            className={`w-full rounded-md py-2 text-sm font-medium text-white ${
              canGenerate ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            Generate Messages
          </button>
        </div>

        {(linkedinMsg || emailMsg) && (
          <div className="mt-8 space-y-5">
            {[
              ["LinkedIn message", linkedinMsg, "linkedin"],
              ["Email message", emailMsg, "email"],
            ].map(([title, msg, key]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <h2 className="text-sm font-medium">{title}</h2>
                  <button
                    onClick={() => copyText(msg, key)}
                    className="text-xs text-blue-600"
                  >
                    {copied === key ? "Copied ✓" : "Copy"}
                  </button>
                </div>
                <textarea
                  readOnly
                  className="w-full rounded-md border p-2 text-sm h-32"
                  value={msg}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
