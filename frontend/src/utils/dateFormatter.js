export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Unknown date';
  
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Posted today';
  if (diffInDays === 1) return 'Posted 1 day ago';
  return `Posted ${diffInDays} days ago`;
};
