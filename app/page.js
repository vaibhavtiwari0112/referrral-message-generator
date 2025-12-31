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

  const skills = "Java, JavaScript, React, Node.js, REST APIs, SQL";

  const canGenerate = employeeName.trim() && jobLink.trim();

  const generateMessage = () => {
    const alumniLine =
      alumni === "yes"
        ? "I noticed we’re from the same college, so thought I’d reach out."
        : "I came across your profile while exploring the team.";

    const linkedin = `Hi ${employeeName},

Hope you’re doing well. ${alumniLine}

I’m currently working as a System Engineer at TCS and was looking into opportunities at your company. I came across this role (${jobLink}) and it seemed like a good match with my experience.

I mostly work with ${skills}. If you think this role could be a good fit, I’d really appreciate your guidance or a referral.

Thanks for your time.`;

    const email = `Subject: Referral request for open role

Hi ${employeeName},

Hope you’re doing well. ${alumniLine}

I’m currently working as a System Engineer at TCS and came across this role:
${jobLink}

It aligns well with my experience in ${skills}. If possible, I’d really appreciate a referral or any guidance.

I’ve attached my resume${resumeName ? ` (${resumeName})` : ""} for reference.

Thanks for your time,
[Your Name]`;

    setLinkedinMsg(linkedin);
    setEmailMsg(email);
  };

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Referral Message Generator
        </h1>
        <p className="text-gray-600 mt-1 mb-8">
          Create simple, genuine referral messages for LinkedIn and email.
        </p>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Employee name
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Job ID or job link
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Are you college alumni?
            </label>
            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={alumni === "yes"}
                  onChange={() => setAlumni("yes")}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={alumni === "no"}
                  onChange={() => setAlumni("no")}
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeName(e.target.files?.[0]?.name || "")}
            />
          </div>

          <button
            disabled={!canGenerate}
            onClick={generateMessage}
            className={`w-full mt-2 py-2 rounded-lg text-white font-medium transition ${
              canGenerate
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Generate Messages
          </button>
        </div>

        {/* Output */}
        {linkedinMsg && (
          <div className="mt-10 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-medium">LinkedIn message</h2>
                <button
                  onClick={() => copyText(linkedinMsg, "linkedin")}
                  className="text-sm text-blue-600"
                >
                  {copied === "linkedin" ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <textarea
                className="w-full border rounded-lg p-3 h-40"
                readOnly
                value={linkedinMsg}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-medium">Email message</h2>
                <button
                  onClick={() => copyText(emailMsg, "email")}
                  className="text-sm text-blue-600"
                >
                  {copied === "email" ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <textarea
                className="w-full border rounded-lg p-3 h-40"
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
