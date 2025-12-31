
"use client";
import { useState } from "react";

export default function Home() {
  const [employeeName, setEmployeeName] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [alumni, setAlumni] = useState("yes");
  const [resumeName, setResumeName] = useState("");
  const [linkedinMsg, setLinkedinMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");

  const skills =
    "Java, JavaScript, React, Node.js, REST APIs, SQL, Data Structures & Algorithms";

  const generateMessage = () => {
    const alumniLine =
      alumni === "yes"
        ? "I noticed that we share the same college background, which encouraged me to reach out."
        : "I came across your profile while exploring professionals at your organization.";

    setLinkedinMsg(`Hi ${employeeName},

Hope you're doing well! ${alumniLine}

I'm currently working as a System Engineer at TCS and actively preparing for product-based roles. I came across this opening (${jobLink}) and it closely aligns with my experience.

I primarily work with ${skills} and enjoy building scalable solutions. I'd really appreciate any guidance or referral if you feel comfortable.

Thanks a lot for your time!
Best regards.`);

    setEmailMsg(`Subject: Referral Request – Open Position

Hi ${employeeName},

${alumniLine}

I’m currently working as a System Engineer at TCS and very interested in the following role:
${jobLink}

My experience includes ${skills}. I believe this role aligns well with my background.

Please find my resume attached (${resumeName}).
Thank you for your time and support.

Warm regards,
[Your Name]`);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Referral Message Generator 🚀</h1>

      <input className="border p-2 w-full mb-4 rounded" placeholder="Employee Name"
        onChange={e => setEmployeeName(e.target.value)} />

      <input className="border p-2 w-full mb-4 rounded" placeholder="Job ID or Job Link"
        onChange={e => setJobLink(e.target.value)} />

      <div className="mb-4">
        <label className="mr-4">
          <input type="radio" checked={alumni==="yes"} onChange={()=>setAlumni("yes")} /> Alumni
        </label>
        <label>
          <input type="radio" checked={alumni==="no"} onChange={()=>setAlumni("no")} /> Not Alumni
        </label>
      </div>

      <input type="file" accept=".pdf" className="mb-4"
        onChange={e=>setResumeName(e.target.files[0]?.name)} />

      <button onClick={generateMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Generate Messages
      </button>

      {linkedinMsg && (
        <>
          <h2 className="text-xl font-semibold mt-6">LinkedIn Message</h2>
          <textarea className="border p-3 w-full h-48 mt-2 rounded" value={linkedinMsg} readOnly />
        </>
      )}

      {emailMsg && (
        <>
          <h2 className="text-xl font-semibold mt-6">Email Message</h2>
          <textarea className="border p-3 w-full h-48 mt-2 rounded" value={emailMsg} readOnly />
        </>
      )}
    </main>
  );
}
