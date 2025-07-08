const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

// Log environment variables to verify they are loaded correctly
console.log('CLOUDINARY_CLOUD_NAME:', CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_UPLOAD_PRESET:', CLOUDINARY_UPLOAD_PRESET);

export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'uploads/shuttlesync'); 

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error(data.error?.message || 'Cloudinary upload failed');
  return data.secure_url; // This is the direct image URL
}