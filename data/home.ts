export async function getCarouselImages() {
    return [
        {
            src: '/carousel/carousel0.png',
            alt: '占位符图片'
        },
        {
            src: '/carousel/carousel1.jpg',
            alt: '占位符图片'
        },
        {
            src: '/carousel/carousel2.jpg',
            alt: '占位符图片'
        },
        {
            src: '/carousel/carousel3.jpg',
            alt: '占位符图片'
        },
        {
            src: '/carousel/carousel4.jpg',
            alt: '占位符图片'
        },
        {
            src: '/carousel/carousel5.jpg',
            alt: '占位符图片'
        }
    ];
}

export async function getSponsors() {
    // 返回占位符赞助商数据
    return [
        {
            name: '占位符赞助商 1',
            logo: '/placeholder.svg?height=50&width=100',
            url: 'https://example.com'
        },
        {
            name: '占位符赞助商 2',
            logo: '/placeholder.svg?height=50&width=100',
            url: 'https://example.com'
        }
    ];
}
