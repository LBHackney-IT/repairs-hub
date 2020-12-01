const { TOKEN } = process.env

export default function authHeader() {
  console.log(TOKEN)
  return { Authorization: `Bearer ${TOKEN}` }
}
