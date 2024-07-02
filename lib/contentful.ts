
"use client";

import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
});

export async function fetchTooltips() {
  await client.getEntries({ content_type: 'tooltip' })
  .then((mail) => {
    console.log('then', mail);
  })
  .catch((err) => {
    console.error('error', err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });
//   if (typeof localStorage !== 'undefined') {
//     localStorage.setItem('tooltipContents', JSON.stringify(entries.items.map(item => item.fields)));
//   }
}

// export const getTooltipContents = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('tooltipContents') || '') : [];
