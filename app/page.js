"use client";
import { useState } from "react";

export default function Home() {
  const [employeeName, setEmployeeName] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [alumni, setAlumni] = useState("yes");
  const [resumeName, setResumeName] = useState("");
  const [linkedinMsg, setLinkedinMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  const skills = "Java, JavaScript, React, Node.js, REST APIs, SQL";

  const canGenerate = employeeName.trim() && jobLink.trim();

  const generateMessage = () => {
    const alumniLine =
      alumni === "yes"
        ? "I noticed we’re from the same college, so thought I’d reach out."
        : "I came across your profile while exploring the team.";

    setLinkedinMsg(`Hi ${employeeName},

Hope you’re doing well. ${alumniLine}

I’m currently working as a System Engineer at TCS and came across this role (${jobLink}). It looks aligned with my experience.

I mainly work with ${skills}. If you feel this could be a good fit, your referral would genuinely help me take the next step in my career, and I’d really appreciate your guidance.

Thanks for your time.`);

    setEmailMsg(`Subject: Referral request

Hi ${employeeName},

Hope you’re doing well. ${alumniLine}

I’m currently working as a System Engineer at TCS and came across this role:
${jobLink}

It aligns with my experience in ${skills}. If possible, I’d really appreciate a referral or any guidance.

Resume attached${resumeName ? ` (${resumeName})` : ""}.

Thanks,
[Your Name]`);
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
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Job ID or job link
            </label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6 text-sm">
            <span className="font-medium">College alumni?</span>
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
              <h2 className="text-sm font-medium mb-1">LinkedIn message</h2>
              <textarea
                className="w-full rounded-md border p-2 text-sm h-32"
                readOnly
                value={linkedinMsg}
              />
            </div>

            <div>
              <h2 className="text-sm font-medium mb-1">Email message</h2>
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
