"use client";
import { useState } from "react";

export default function Home() {
  const [employeeName, setEmployeeName] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [alumni, setAlumni] = useState("yes");
  const [postedByEmployee, setPostedByEmployee] = useState("no");
  const [resumeName, setResumeName] = useState("");
  const [skills, setSkills] = useState(
    "Java, Spring Boot, Docker, Kubernetes, CI/CD, Splunk, JavaScript, React, Node.js, REST APIs, SQL"
  );
  const [linkedinMsg, setLinkedinMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [copied, setCopied] = useState("");

  const canGenerate = employeeName.trim() && jobLink.trim() && skills.trim();

  const generateMessage = () => {
    const alumniLine =
      alumni === "yes"
        ? "I noticed we’re from the same college, so thought I’d reach out."
        : "I came across your profile while exploring the team.";

    const jobReference =
      postedByEmployee === "yes"
        ? `I saw your post about this opening (Job ID / Link: ${jobLink}) and it caught my attention.`
        : `I came across this role (Job ID / Link: ${jobLink}) while looking into opportunities at your company.`;

    const linkedin = `Hi ${employeeName},

Hope you’re doing well. ${alumniLine}

${jobReference}

I’m currently working as a System Engineer at TCS and mostly work with ${skills}. If you feel this could be a good fit, your referral would genuinely help me take the next step in my career, and I’d really appreciate your guidance.

Thanks for your time.`;

    const email = `Subject: Referral request

Hi ${employeeName},

Hope you’re doing well. ${alumniLine}

${jobReference}

I’m currently working as a System Engineer at TCS, with experience in ${skills}. If possible, I’d really appreciate a referral or any guidance.

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
          Simple, professional referral messages for LinkedIn and email.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">
              Employee name
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Job ID or job link
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Skills (edit per role)
            </label>
            <textarea
              className="w-full rounded-md border px-3 py-2 text-sm h-20 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

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

          <div>
            <label className="text-sm font-medium block mb-1">
              Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              className="text-sm"
              onChange={(e) => setResumeName(e.target.files?.[0]?.name || "")}
            />
          </div>

          <button
            disabled={!canGenerate}
            onClick={generateMessage}
            className={`w-full rounded-md py-2 text-sm font-medium text-white ${
              canGenerate
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Generate Messages
          </button>
        </div>

        {(linkedinMsg || emailMsg) && (
          <div className="mt-8 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-sm font-medium">LinkedIn message</h2>
                <button
                  onClick={() => copyText(linkedinMsg, "linkedin")}
                  className="text-xs text-blue-600"
                >
                  {copied === "linkedin" ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <textarea
                className="w-full rounded-md border p-2 text-sm h-32"
                readOnly
                value={linkedinMsg}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-sm font-medium">Email message</h2>
                <button
                  onClick={() => copyText(emailMsg, "email")}
                  className="text-xs text-blue-600"
                >
                  {copied === "email" ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <textarea
                className="w-full rounded-md border p-2 text-sm h-32"
                readOnly
                value={emailMsg}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
