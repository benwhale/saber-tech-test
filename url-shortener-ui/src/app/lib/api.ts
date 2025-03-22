// src/lib/api.ts
export async function shortenUrl(url: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    return response.json();
  }
  
  export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }