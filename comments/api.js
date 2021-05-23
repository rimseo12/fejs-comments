const END_POINT = 'https://jsonplaceholder.typicode.com/comments';

const request = async (url, options) => {
  try {
    const res = await fetch(`${END_POINT}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if (res.ok) {
      const result = await res.json()

      return result
    } else {
      throw new Error(`뭔가 잘못 되었습니다! status code: ${res.status}`)
    }
  } catch (e) {
    throw new Error(`서버 통신 중 에러 발생: ${e.message}`)
  }
}

export const getComments = async () => await request();
