export const formatTimeSince = (date: Date | string | number) => {
  const now = new Date();
  const inputDate = date instanceof Date ? date : new Date(date);
  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  if (seconds < 60) { // Menos de 1 minuto
    return "hace menos de 1 minuto";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) { // Mostrará en minutos
    if (minutes === 1) return "hace 1 min";
    return `hace ${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) { // Mostrará en horas
    if (hours === 1) return "hace 1 h";
    return `hace ${hours} h`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) { // Mostrará en días
    if (days === 1) return "hace 1 día";
    return `hace ${days} días`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 4) { // Mostrará en semanas
    if (weeks === 1) return "hace 1 semana";
    return "hace más de una semana";
  }

  const months = Math.floor(days / 30);

  // Menos de 3 meses
  if (months < 3) {
    if (months === 1) return "hace 1 mes";
    return "hace más de un mes";
  }

  // Más de 3 meses
  return "hace mucho tiempo";
};


export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};