import { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: 'edge',
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const { name = 'unknown person' } = request.query

  return response.send(`Hello ${name}!`)

  // let body;
  // try {
  //   body = await request.json();
  // } catch (e) {
  //   body = null;
  // }

  // if (body === null) {
  //   return new Response(null, { status: 400, headers: { 'content-type': 'application/json' } })
  // }

  // return new Response(
  //   JSON.stringify({ a: 1, b: 2 }),
  //   {
  //     status: 200,
  //     headers: {
  //       'content-type': 'application/json',
  //     }
  //   }
  // )
}
