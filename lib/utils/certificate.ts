export const generateCertificateId = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

export const formatDate = (date: Date = new Date()) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const parseDocuments = (documentsString: string) => {
  return documentsString.split("\n").filter(Boolean).map(doc => doc.trim());
};