const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const uploadMedia = async ({ path, folder }) => {
  const result = await cloudinary.uploader.upload(path, {
    public_id: folder,
    unique_filename: true,
  })
  result.path = result.public_id + '.' + result.format
  return result
}

module.exports = {
  uploadMedia,
}
