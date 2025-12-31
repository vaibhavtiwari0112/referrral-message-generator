"use client";
import { useState } from "react";

export default function Home() {
  const [employeeName, setEmployeeName] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [alumni, setAlumni] = useState("yes");
  const [resumeName, setResumeName] = useState("");
  const [linkedinMsg, setLinkedinMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [copied, setCopied] = useState("");

  const skills =
    "Java, JavaScript, React, Node.js, REST APIs, SQL";

  const canGenerate =
    employeeName.trim() && jobLink.trim();

  const generateMessage = () => {
    if (!canGenerate) return;

    const alumniLine =
      alumni === "yes"
        ? "I noticed we’re from the same college, so thought of reaching out."
        : "I came across your profile while looking into the team.";

    const linkedin = `Hi ${employeeName},

Hope you're doing well! ${alumniLine}

I’m currently working as a System Engineer at TCS and was exploring roles at your company. I found this opening (${jobLink}) and it genuinely caught my interest.

I mostly work with ${skills} and enjoy building things that are simple and reliable. If you think this role would be a good fit, I’d really appreciate any guidance or a referral.

No worries at all if not — thanks for taking the time to read this 🙂
Best regards`;

    const email = `Subject: Referral request – Open position

Hi ${employeeName},

Hope you’re doing well. ${alumniLine}

I’m currently working as a System Engineer at TCS and came across this role:
${jobLink}

It aligns well with my experience in ${skills}. If you’re comfortable, I’d really appreciate a referral or any guidance.

I’ve attached my resume${resumeName ? ` (${resumeName})` : ""} for reference.

Thanks a lot for your time.
Warm regards,
[Your Name]`;

    setLinkedinMsg(linkedin);
    setEmailMsg(email);
  };

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">
          Referral Message Generator
        </h1>
        <p className="text-gray-600 mb-6">
          Generate natural, human referral messages for LinkedIn & email.
        </p>

        <div className="space-y-4">
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Employee name"
            onChange={(e) => setEmployeeName(e.target.value)}
          />

          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Job ID or job link"
            onChange={(e) => setJobLink(e.target.value)}
          />

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={alumni === "yes"}
                onChange={() => setAlumni("yes")}
              />
              College alumni
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={alumni === "no"}
                onChange={() => setAlumni("no")}
              />
              Not alumni
            </label>
          </div>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setResumeName(e.target.files?.[0]?.name || "")
            }
          />

          <button
            onClick={generateMessage}
            disabled={!canGenerate}
            className={`w-full py-2 rounded text-white transition ${
              canGenerate
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Generate Messages
          </button>
        </div>

        {linkedinMsg && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                LinkedIn Message
              </h2>
              <button
                onClick={() =>
                  copyText(linkedinMsg, "linkedin")
                }
                className="text-sm text-blue-600"
              >
                {copied === "linkedin" ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <textarea
              className="w-full border rounded p-3 mt-2 h-44"
              readOnly
              value={linkedinMsg}
            />
          </div>
        )}

        {emailMsg && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                Email Message
              </h2>
              <button
                onClick={() => copyText(emailMsg, "email")}
                className="text-sm text-blue-600"
              >
                {copied === "email" ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <textarea
              className="w-full border rounded p-3 mt-2 h-44"
              readOnly
              value={emailMsg}
            />
          </div>
        )}
      </div>
    </main>
  );
}
