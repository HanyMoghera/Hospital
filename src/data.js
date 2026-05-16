/** Structured hospital / ICU forms reference */

export const hero = {
  title: "Clinical Documentation",
  subtitle: "Forms guide for ER admission through ICU, OR, transfer, and discharge",
  image: "/hero-cover.jpg",
};

export const sections = [
  {
    id: "nursing-er",
    title: "Nursing — ER admission",
    icon: "🩺",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    groups: [
      {
        name: "Nursing forms",
        items: [
          { name: "Readmission risk assessment & interdisciplinary discharge planning", note: "" },
          { name: "Initial inpatient screening criteria", note: "" },
          { name: "Nursing flow sheet", note: "" },
          { name: "Pain assessment and management", note: "" },
          { name: "Braden scale risk assessment", note: "" },
          { name: "Daily body weight", note: "" },
          { name: "Pressure ulcer assessment", note: "" },
          { name: "Full risk assessment", note: "" },
          { name: "Blood glucose monitoring", note: "" },
          { name: "Delirium screening and management sheet", note: "" },
          { name: "ICU fluid net balance", note: "" },
          {
            name: "Bundles (mechanical ventilator, urinary catheter, central line)",
            note: "According to patient attachment",
          },
          { name: "DIVA", note: "" },
          { name: "VIPS", note: "If patient has IV peripheral line" },
          { name: "Nursing care plan", note: "" },
          { name: "MRD", note: "" },
          { name: "Food record", note: "If patient takes oral diet" },
        ],
      },
      {
        name: "Investigation forms",
        items: [
          { name: "ICU laboratory work-up sheet", note: "" },
          { name: "ICU blood gases work-up sheet", note: "" },
          { name: "Culture sheet", note: "" },
          { name: "Critical value results", note: "" },
        ],
      },
    ],
  },
  {
    id: "medical-admission",
    title: "Medical — during admission",
    icon: "📋",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    groups: [
      {
        name: "Core medical documentation",
        items: [
          { name: "Initial medical assessment", note: "" },
          { name: "Medical progress note", note: "" },
          { name: "Problem list", note: "" },
          { name: "Physician order", note: "" },
          { name: "Physician care plan", note: "" },
          { name: "Medication reconciliation", note: "" },
          { name: "VTE", note: "" },
          { name: "SOFA", note: "" },
          { name: "APACHE", note: "" },
          { name: "Interdisciplinary patient and family education", note: "" },
          {
            name: "Reserved antimicrobial dispensing",
            note: "If antibiotics added at MAR",
          },
          { name: "Human albumin form", note: "If albumin ordered" },
          { name: "Co-management", note: "If another specialty co-manages" },
        ],
      },
    ],
  },
  {
    id: "blood",
    title: "Blood transfusion",
    icon: "🩸",
    image:
      "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1200&q=80",
    intro: "After physician order:",
    groups: [
      {
        name: "Transfusion pathway",
        items: [
          {
            name: "Blood and blood product transfusion consent",
            note: "Blood sample for group & cross-match after consent",
          },
          { name: "Blood reservation", note: "Reserve full amount needed" },
          { name: "Blood dispensing", note: "Dispense units needed now" },
          { name: "Blood transfusion checklist and monitoring form", note: "" },
          {
            name: "Blood transfusion reaction record",
            note: "If any blood transfusion reaction happened",
          },
        ],
      },
    ],
  },
  {
    id: "culture",
    title: "Culture / specimen",
    icon: "🧪",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
    groups: [
      {
        name: "Cultural forms",
        items: [
          {
            name: "Collection — blood specimen for culture",
            note: "Blood culture; send form to lab for culture media",
          },
          {
            name: "Collection — specimen for culture (non-blood)",
            note: "e.g. urine culture, sputum culture",
          },
        ],
      },
    ],
  },
  {
    id: "radiology",
    title: "Radiology",
    icon: "📷",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    groups: [
      {
        name: "Any radiology procedure",
        items: [
          {
            name: "Radiology request form",
            note: "Send to radiology after selecting procedure",
          },
        ],
      },
      {
        name: "If contrast (dye) is required",
        items: [
          { name: "Consent for use of dye", note: "" },
          { name: "CT scan consent", note: "If CT ordered" },
          { name: "MRI consent", note: "If MRI ordered" },
        ],
      },
      {
        name: "Transfer",
        items: [
          { name: "Checklist of transfer between departments", note: "" },
        ],
      },
    ],
  },
  {
    id: "procedures",
    title: "Procedures & lines",
    icon: "⚕️",
    image:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1200&q=80",
    groups: [
      {
        name: "Central line insertion",
        items: [
          { name: "Central venous catheter consent", note: "Before insertion" },
          { name: "Invasive procedure", note: "Before insertion" },
          { name: "Central line insertion bundle", note: "During procedure" },
          { name: "Central line bundle checklist", note: "" },
        ],
      },
      {
        name: "Urinary catheter",
        items: [{ name: "Urinary catheter bundle checklist", note: "" }],
      },
      {
        name: "Mechanical ventilator",
        items: [{ name: "VAB bundle", note: "Ventilator-associated care bundle (confirm local naming)" }],
      },
      {
        name: "Tapping",
        items: [{ name: "Invasive procedure", note: "+ surgical consent" }],
      },
      {
        name: "Chest tube",
        items: [{ name: "Invasive procedure", note: "+ surgical consent" }],
      },
      {
        name: "IV line insertion",
        items: [
          { name: "DIVA", note: "" },
          { name: "VIPS", note: "" },
        ],
      },
    ],
  },
  {
    id: "or",
    title: "Operating room (OR)",
    icon: "🏥",
    image: "/operating-room.png",
    groups: [
      {
        name: "A) Consent",
        items: [
          { name: "Surgical consent", note: "" },
          { name: "Anesthesia consent", note: "" },
          { name: "Blood transfusion consent", note: "" },
          {
            name: "High-risk consent",
            note: "If high surgical risk or specific high-risk use",
          },
          {
            name: "Implanted device consent",
            note: "e.g. tracheostomy, gastrostomy, pacemaker",
          },
          { name: "OR booking", note: "" },
        ],
      },
      {
        name: "B) Surgical",
        items: [
          { name: "Preoperative checklist", note: "" },
          {
            name: "Anesthesia assessment and monitoring",
            note: "Pre-anesthesia assessment; moderate sedation per anesthesiologist",
          },
          { name: "Surgical note", note: "" },
          { name: "Surgical record", note: "" },
          { name: "Surgical bundle", note: "" },
          { name: "Invasive procedure", note: "" },
          { name: "Site marking", note: "" },
          { name: "Checklist of transfer between departments", note: "" },
          { name: "Intra-hospital transfer summary", note: "" },
        ],
      },
    ],
  },
  {
    id: "transfer-gw",
    title: "Transfer to general ward",
    icon: "🛏️",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    groups: [
      {
        name: "Transfer forms",
        items: [
          { name: "Checklist of transfer", note: "" },
          { name: "Intra-hospital transfer summary", note: "" },
          {
            name: "Internal transfer summary",
            note: "Physician form",
          },
          {
            name: "Co-management",
            note: "Physician form if transferring to another specialty",
          },
        ],
      },
    ],
  },
  {
    id: "discharge",
    title: "Discharge to home",
    icon: "🏠",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    groups: [
      {
        name: "Discharge documentation",
        items: [
          { name: "Discharge summary", note: "" },
          { name: "Discharge checklist", note: "" },
          { name: "Patient release / claim for indemnity", note: "" },
          { name: "Medical report", note: "" },
          { name: "Patient complaint / compliment", note: "" },
          { name: "Discharge criteria", note: "" },
          { name: "Discharge instructions", note: "" },
          { name: "Follow-up instructions", note: "" },
          { name: "Discharge medications form", note: "" },
          {
            name: "Discharge permission (تصريح الخروج)",
            note: "Medical completes",
          },
        ],
      },
    ],
  },
];
