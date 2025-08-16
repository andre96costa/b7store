export const data = {
    banners: [
        { img: '/assets/banners/banner-1.png', link: '' },
        { img: '/assets/banners/banner-2.png', link: '' },
        { img: '/assets/banners/banner-3.png', link: '' },
        { img: '/assets/banners/banner-4.png', link: '' }
    ],
    products: [
        { id: 1, label: 'Camisa PHP', price: 49.90, image: '/assets/products/camiseta-php.png', liked: true},
        { id: 2, label: 'Camisa Laravel', price: 39.90, image: '/assets/products/camiseta-laravel-branca.png', liked: true},
        { id: 3, label: 'Camisa Node', price: 29.90, image: '/assets/products/camiseta-node.png', liked: false},
        { id: 4, label: 'Camisa React', price: 19.90, image: '/assets/products/camiseta-react-azul.png', liked: false},
    ],
    product: {
        id: 1,
        label: 'Camisa php',
        images: [
            '/assets/products/camiseta-php.png',
            '/assets/products/camiseta-laravel-branca.png'
        ],
        price: 19.90,
        liked: false,
        description: 'Alguma descrição do produto'
    }
}