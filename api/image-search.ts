
export const config = {}

export function GET() {
  return new Response(`Hello from ${process.env.IMAGE_SEARCH_CX}`);
}
