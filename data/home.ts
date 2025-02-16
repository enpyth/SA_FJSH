export async function getCarouselImages() {
    return [
        {
            src: '/placeholder.svg?height=400&width=800',
            alt: '占位符图片'
        },
        {
            src: '/placeholder.svg?height=400&width=800',
            alt: '占位符图片'
        },
        {
            src: '/placeholder.svg?height=400&width=800',
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
