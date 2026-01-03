"use client";
import { useState } from "react";

export default function Home() {
  const [employeeName, setEmployeeName] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [alumni, setAlumni] = useState("yes");
  const [postedByEmployee, setPostedByEmployee] = useState("no");
  const [mentionProjects, setMentionProjects] = useState("no");
  const [resumeName, setResumeName] = useState("");
  const [skills, setSkills] = useState(
    "Java, Spring Boot, Docker, Kubernetes, CI/CD, Splunk, JavaScript, React, Node.js, SQL"
  );
  const [linkedinMsg, setLinkedinMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [copied, setCopied] = useState("");

  const canGenerate =
    employeeName.trim() && jobLink.trim() && skills.trim();

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

I’m currently a System Engineer at TCS, working across backend, frontend, and DevOps using ${skills}. I also maintain a 1900+ LeetCode rating (Knight) and regularly participate in coding contests.${projectLine}

If this looks like a possible fit, a referral from you would really help me take the next step, and I’d appreciate any guidance.

Thanks for your time.`;

    const email = `Subject: Referral request

Hi ${employeeName},

${alumniLine}

${jobReference}

I’m currently a System Engineer at TCS with hands-on experience across backend, frontend, and DevOps (${skills}). I also hold a 1900+ LeetCode rating (Knight) and actively participate in competitive programming contests.${projectLine}

If possible, I’d really appreciate a referral or any guidance.

Please find my resume attached${resumeName ? ` (${resumeName})` : ""}.

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
          Concise, high-signal referral messages for product companies.
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

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium">
              Mention projects in message?
            </span>
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
              ["Email message", emailMsg, "email"]
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
