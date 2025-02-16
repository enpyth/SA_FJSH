export async function getNews() {
    return [
      {
        src: '/placeholder.svg',
        id: '1',
        title: 'News Title 1',
        summary: 'Summary of news 1Summary of news 1Summary of news 1Summary of news 1Summary of news 1',
        content: 'Full content of news 1 goes here.',
        date: '2024-01-01',
        showOnHomepage: true
      },
      {
        src: '/placeholder.svg',
        id: '2',
        title: 'News Title 2',
        summary: 'Summary of news 2',
        content: 'Full content of news 2 goes here.',
        date: '2024-01-02',
        showOnHomepage: false
      },
      {
        src: '/placeholder.svg',
        id: '3',
        title: 'title1',
        summary: 'summary1',
        showOnHomepage: true
      },
      {
        src: '/placeholder.svg',
        id: '4',
        title: 'title1',
        summary: 'summary1',
        showOnHomepage: true
      }
    ];
  }