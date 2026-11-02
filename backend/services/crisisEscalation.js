/**
 * Manasitra AI — Crisis Escalation Protocol & National Helpline Registry
 * 
 * Clinical & Regulatory Safeguard:
 * Manasitra is designed strictly as an empathetic AI companion and emotional support tool.
 * It is NOT a medical diagnosis tool, therapist, or suicide intervention hotline.
 * When high-risk or self-harm intent is detected, this module immediately intercepts
 * conversational flow and presents verified emergency resources.
 */

const NATIONAL_HELPLINES_INDIA = [
  {
    name: 'Tele-MANAS (Govt. of India)',
    number: '14416',
    tollFree: '1800-891-4416',
    hours: '24/7 Free',
    description: 'National Tele Mental Health Programme of India, multi-language support.',
  },
  {
    name: 'KIRAN Mental Health Helpline',
    number: '1800-599-0019',
    hours: '24/7 Toll-Free',
    description: 'Ministry of Social Justice and Empowerment 24/7 mental health helpline.',
  },
  {
    name: 'Vandrevala Foundation',
    number: '+91 9999 666 555',
    hours: '24/7 Free',
    description: 'Non-profit providing free, professional, confidential tele-counseling.',
  },
  {
    name: 'AASRA',
    number: '+91 98204 66726',
    hours: '24/7 Confidential',
    description: 'Crisis intervention and suicide prevention helpline.',
  },
  {
    name: 'National Emergency Number',
    number: '112',
    hours: '24/7 Immediate Police/Ambulance',
    description: 'Unified emergency response service across India.',
  },
];

const MEDICAL_DISCLAIMER = {
  short: 'Manasitra is an AI peer companion, not a medical professional, therapist, or psychiatric service.',
  full: 'DISCLAIMER: Manasitra is designed to provide emotional companionship and active listening. It is not licensed to diagnose, treat, or prescribe medical interventions. If you or someone you know is in distress or experiencing thoughts of self-harm, please connect with a qualified healthcare professional or contact one of the 24/7 national helplines immediately.',
};

/**
 * Checks whether an incoming text matches critical distress / self-harm signals.
 */
function evaluateCrisisLevel(text = '') {
  if (!text || typeof text !== 'string') return { isCrisis: false, riskLevel: 'none' };
  
  const normalized = text.toLowerCase();
  const criticalPatterns = [
    'kill myself', 'end my life', 'want to die', 'suicide', 'suicidal',
    'mar jaunga', 'mar jaungi', 'khatam kar lunga', 'jeena nahi chahta',
    'not worth living', 'खुद को मार', 'आत्महत्या', 'જીવવું નથી', 'મરવું છે'
  ];

  for (const pattern of criticalPatterns) {
    if (normalized.includes(pattern)) {
      return {
        isCrisis: true,
        riskLevel: 'critical',
        matchedPattern: pattern,
      };
    }
  }

  const moderatePatterns = ['hopeless', 'feel empty', 'can not go on', 'bahut dard hai', 'har gaya'];
  for (const pattern of moderatePatterns) {
    if (normalized.includes(pattern)) {
      return {
        isCrisis: false,
        riskLevel: 'moderate',
        matchedPattern: pattern,
      };
    }
  }

  return { isCrisis: false, riskLevel: 'none' };
}

/**
 * Generates structured crisis response intercept with emergency helplines.
 */
function buildCrisisResponse(language = 'en', matchedPattern = '') {
  return {
    isCrisisIntervention: true,
    riskLevel: 'critical',
    disclaimer: MEDICAL_DISCLAIMER.short,
    message: language === 'hi'
      ? 'Dost, aap akele nahi hain. Aapki zindagi bahut keemti hai. Kripya turant niche diye gaye 24x7 toll-free helpline par baat karein ya kisi apne se sampark karein.'
      : 'Friend, you are not alone, and your life matters deeply. Please speak with someone who can support you right now. Call one of the free 24/7 helplines below immediately.',
    helplines: NATIONAL_HELPLINES_INDIA,
    emergencyNumber: '112',
    fullDisclaimer: MEDICAL_DISCLAIMER.full,
  };
}

module.exports = {
  NATIONAL_HELPLINES_INDIA,
  MEDICAL_DISCLAIMER,
  evaluateCrisisLevel,
  buildCrisisResponse,
};
