const { NODE_ENV } = process.env

export const DEV = NODE_ENV !== 'production',
  PORT = 3000,
  TITLE = 'Eddie Tindame - Full Stack Developer',
  DESC =
    "I am a full-stack developer currently working out of Firepit Technology in the heart of Warner Music Group London. I take freelance gigs if they're cool enough!",
  GA_TRACKING_ID = 'UA-151353051-1',
  HOST = DEV ? `http://localhost:${PORT}` : 'https://eddietindame.github.io',
  FAVICON = `${HOST}/static/favicon.ico`,
  OG_IMAGE = `${HOST}/static/img/og.png`
