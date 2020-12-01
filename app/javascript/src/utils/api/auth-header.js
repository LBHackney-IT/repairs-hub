const { TOKEN } = process.env

export default function authHeader() {
  return { Authorization: `Bearer ${TOKEN}` }
}
