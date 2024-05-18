import React from 'react'
import Head from 'next/head'
import ProjectGallery from '~components/ProjectGallery'
import '~scss/index.scss'

const Work = () => {
  const projects = [
    {
      name: 'Spotify Listening Party',
      thumbnail: require('~assets/images/slp-thumbnail.jpg'),
      video: {
        name: 'slp_video',
        sources: ['webm', 'mp4']
      },
      description:
        'A real-time synchronised listening / chat room experience where fans can connect with artists. This is a platform where commissioners are able to schedule parties when they need to via a CMS. Chat includes profanity filtering and moderation which is accessed via a separate admin panel.',
      tags: ['React', 'Redux', 'Spotify', 'NodeJS'],
      href: 'https://listeningparty.io/balcony',
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Warner Music Group'
        },
        {
          label: 'Designer',
          value: 'Finn McLean / Eddie Tindame'
        }
      ]
    },
    {
      name: 'James Blunt - Once Upon A Valentine',
      thumbnail: require('~assets/images/jb_v_thumbnail.jpg'),
      video: {
        name: 'jb_v_video',
        sources: ['mp4', 'webm']
      },
      description:
        'Fans could choose an e-card read out by James Blunt himself to send to their loved ones / secret valentines on February 14th.',
      tags: ['React', 'NodeJS', 'Sendgrid', 'MongoDB'],
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Atlantic UK'
        },
        {
          label: 'Designer',
          value: 'Toni Hollis'
        }
      ]
    },
    {
      name: 'David Bowie - Space Oddity 2019 Mix Map',
      thumbnail: require('~assets/images/db-so-2mm.jpg'),
      description:
        'Fans are able to plot a photo of their Space Oddity 2019 Mix vinyls on the map and receive a free merch item. Includes a separate administration panel for approving entries.',
      tags: ['React', 'NodeJS', 'Geolocation', 'Sendgrid', 'MapboxGL', 'AWSS3', 'MongoDB'],
      href: 'https://spaceoddity.davidbowie.com',
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Rhino Records'
        },
        {
          label: 'Designer',
          value: 'Toni Hollis'
        }
      ]
    },
    {
      name: 'Busby Marou - The Great Divide',
      thumbnail: require('~assets/images/bm-tgd-thumbnail.jpg'),
      description:
        'A follow-to-win contest which allowed the chance to meet the band. Exclusive video content could be unlocked after a streaming threshold had been met in each Australian region. Stars would appear in real-time as users streamed!',
      tags: ['React', 'Spotify', 'Apple Music', 'NodeJS', 'MongoDB', 'Websockets', 'YouTube'],
      href: 'https://thegreatdivide.com.au',
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Warner Music Australia'
        },
        {
          label: 'Designer',
          value: 'Finn McLean'
        },
        {
          label: 'DSP Integration',
          value: 'Firepit Platforms'
        }
      ]
    },
    {
      name: 'Joy Division - Unknown Pleasures - Reimagined',
      thumbnail: require('~assets/images/jd-upr-thumbnail.jpg'),
      video: {
        name: 'jd_upr_video',
        sources: ['mp4', 'webm']
      },
      description:
        'A microsite showcasing reimagined music videos created for the 40th anniversary of the seminal album "Unknown Pleasures".',
      tags: ['React', 'YouTube'],
      href: 'https://www.joydivisionofficial.com/reimagined/',
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Rhino Records'
        },
        {
          label: 'Designer',
          value: 'Toni Hollis'
        }
      ]
    },
    {
      name: 'Marina - Orange Trees',
      thumbnail: require('~assets/images/m-ot-thumbnail.jpg'),
      description:
        'A fan activation which allowed the chance to unlock exclusive video content after a pre-save threshold had been met in each continent of the globe. Trees would grow in real-time as more people streamed!',
      tags: ['React', 'Spotify', 'Apple Music', 'Deezer', 'NodeJS', 'MongoDB', 'Websockets'],
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Atlantic Records'
        },
        {
          label: 'Designers',
          value: 'Finn McLean, Toni Hollis'
        },
        {
          label: 'DSP Integration',
          value: 'Firepit Platforms'
        }
      ]
    },
    {
      name: 'Disturbed - Evolution',
      thumbnail: 'https://placehold.it/250x400',
      video: {
        name: 'd_e_tg_video',
        sources: ['mp4']
      },
      description:
        'A Facebook camera effect that turns the user into Disturbed\'s mascot: "The Guy".',
      tags: ['Augmented Reality', 'Spark AR Studio', 'Facebook', 'Javascript'],
      href: 'https://www.facebook.com/Disturbed/videos/1097834423714167/',
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Warner Records'
        },
        {
          label: 'Designer',
          value: 'Eddie Tindame'
        },
        {
          label: '3D Model',
          value: 'Project XIV'
        }
      ]
    },
    {
      name: '#WarnerSquad',
      thumbnail: require('~assets/images/ws-thumbnail.jpg'),
      description:
        'A rewards hub for fans of Warner Artists. This site offers Italian / English localisation and uses WordPress as a headless CMS for promotions. Fully implemented JWT-based authentication.',
      tags: ['React', 'NodeJS', 'MongoDB', 'i18n', 'WordPress', 'Sendgrid', 'JWT'],
      href: 'https://club.warnermusic.it',
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Warner Music Italy'
        },
        {
          label: 'Designer',
          value: 'Eddie Tindame'
        }
      ]
    },
    {
      name: '#dualita',
      thumbnail: 'https://placehold.it/250x400',
      video: {
        name: 'dl_ss_video',
        sources: ['webm', 'mp4']
      },
      description:
        'A Facebook camera effect / Snapchat lens that lets you sport Alita\'s war paint from the film Alita: Battle Angel. The main soundtrack "Swan Song" by Dua Lipa plays as you frown and apply the paint.',
      tags: [
        'Augmented Reality',
        'Spark AR Studio',
        'Facebook',
        'Javascript',
        'Snapchat',
        'Snap Studio'
      ],
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Warner Records'
        },
        {
          label: 'Designer',
          value: 'Eddie Tindame'
        }
      ]
    },
    {
      name: '#LMHR',
      thumbnail: require('~assets/images/lmhr-thumbnail.jpg'),
      description:
        'A pro bono project for the charity "Love Music Hate Racism". Visitors can anonymously upload their personal stories of how racism has affected them in the past.',
      tags: ['React', 'WordPress', 'PHP', 'jQuery'],
      href: 'https://www.lovemusichateracism.com/',
      credits: [
        {
          label: 'Where',
          value: 'Firepit Technology'
        },
        {
          label: 'Commissioner',
          value: 'Love Music Hate Racism'
        },
        {
          label: 'Designer',
          value: "Chris O'Leary"
        }
      ]
    }
  ]

  return (
    <>
      <Head>
        <title>Eddie Tindame | Work</title>
      </Head>
      <div id="work" className="work">
        <div className="container">
          <ProjectGallery projects={projects} />
        </div>
      </div>
    </>
  )
}

export default Work
