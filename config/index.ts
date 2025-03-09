const { NODE_ENV } = process.env

export const DEV = NODE_ENV !== 'production',
  PORT = 3000,
  TITLE = 'Eddie Tindame - Software Engineer',
  DESC = 'I am a software engineer currently open to work. London based.',
  GA_TRACKING_ID = 'G-E0YBGN1W7Z',
  HOST = DEV ? `http://localhost:${PORT}` : 'https://eddietindame.github.io',
  FAVICON = `${HOST}/static/favicon.ico`,
  OG_IMAGE = `${HOST}/static/img/og.png`,
  TRANSITION_DURATION = 300
