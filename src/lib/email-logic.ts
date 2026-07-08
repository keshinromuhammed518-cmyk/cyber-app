export interface AnalysisResult {
  status: "Authentic" | "Suspicious" | "Critical";
  score: number;
  flags: {
    label: string;
    severity: "low" | "medium" | "high";
    detected: boolean;
    description: string;
  }[];
  summary: string;
}

export const analyzeEmail = async (content: string): Promise<AnalysisResult> => {
  // Simulate network delay for "backend" feel
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const lowerContent = content.toLowerCase();
  
  const flags = [
    {
      label: "Urgent Action Required",
      severity: "high" as const,
      detected: /urgent|immediate|action required|suspended|locked|unauthorized/i.test(lowerContent),
      description: "Uses high-pressure language to force a quick decision."
    },
    {
      label: "Suspicious Links",
      severity: "medium" as const,
      detected: /click here|verify now|login|bit\.ly|tinyurl/i.test(lowerContent),
      description: "Contains generic links that often lead to credential harvesting sites."
    },
    {
      label: "Generic Salutation",
      severity: "low" as const,
      detected: /dear customer|dear user|valued member/i.test(lowerContent),
      description: "Lacks personalized information typical of legitimate organizations."
    },
    {
      label: "Spoofed Header Indicators",
      severity: "high" as const,
      detected: /received: from|reply-to:|return-path:/i.test(lowerContent) && !/spf=pass|dkim=pass/i.test(lowerContent),
      description: "Mismatched routing information suggests sender identity falsification."
    },
    {
      label: "Unusual Attachment Type",
      severity: "high" as const,
      detected: /\.exe|\.zip|\.scr|\.js|\.vbs/i.test(lowerContent),
      description: "Dangerous file extensions often used for malware delivery."
    }
  ];

  const detectedFlags = flags.filter(f => f.detected);
  const score = Math.max(0, 100 - (detectedFlags.length * 25) + (Math.random() * 5));
  
  let status: AnalysisResult["status"] = "Authentic";
  if (score < 40) status = "Critical";
  else if (score < 75) status = "Suspicious";

  let summary = "The email appears legitimate with no major red flags detected.";
  if (status === "Suspicious") {
    summary = "Multiple suspicious patterns were identified. Exercise caution before clicking any links or providing data.";
  } else if (status === "Critical") {
    summary = "High probability of a phishing attempt. This email matches known fraudulent signatures. Recommend immediate deletion.";
  }

  return {
    status,
    score: Math.round(score),
    flags,
    summary
  };
};