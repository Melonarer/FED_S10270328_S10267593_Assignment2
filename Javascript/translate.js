// Language translations object, containing content for different languages
const translations = {
    en: {
      welcomeText: '🌟 Welcome to MokeSell 🌟',
      description: 'Buy, Sell, and Thrive in a Minimalist and Eco-Friendly Marketplace.',
      featuresTitle: 'Why Choose MokeSell?',
      buySellEasily: 'Seamless Buying & Selling 🛒',
      buySellDesc: 'Effortlessly list and discover products with our intuitive platform.',
      ecoConscious: 'Eco-Conscious Marketplace 🌱',
      ecoDesc: 'Support sustainability by buying and selling preloved items.',
      customerBenefits: 'Exclusive Customer Benefits 🎁',
      benefitsDesc: 'Enjoy seasonal discounts, coupons, and a loyalty point system.',
      ctaText: 'Join MokeSell Today!',
      shopBtn: 'Already have an account?',
      sellBtn: '🛍️ Join to Start Shopping!',
      footerText: '© 2025 MokeSell - Sleek C2C Platform. All Rights Reserved. 🌏',
      reviews: [
        { text: '"MokeSell made selling my items so easy and stress-free!"', name: 'Beatrice T.' },
        { text: '"A trustworthy platform with amazing customer support."', name: 'Theo J.' },
        { text: '"I found unique items I couldn’t find anywhere else. Love it!"', name: 'Forne T.' },
        { text: '"This platform is a game-changer for buying and selling online!"', name: 'Jones T.' },
        { text: '"Fast, simple, and effective. I recommend MokeSell to everyone."', name: 'Forwea M.' }
      ]
    },
    es: {
      welcomeText: '🌟 Bienvenido a MokeSell 🌟',
      description: 'Compra, Vende y Prosper en un Mercado Ecológico y Minimalista.',
      featuresTitle: '¿Por qué Elegir MokeSell?',
      buySellEasily: 'Compra y Venta Sin Esfuerzo 🛒',
      buySellDesc: 'Lista y descubre productos de manera sencilla con nuestra plataforma.',
      ecoConscious: 'Mercado Ecológico 🌱',
      ecoDesc: 'Apoya la sostenibilidad comprando y vendiendo artículos de segunda mano.',
      customerBenefits: 'Beneficios Exclusivos para Clientes 🎁',
      benefitsDesc: 'Disfruta de descuentos, cupones y un sistema de puntos de lealtad.',
      ctaText: '¡Únete a MokeSell Hoy!',
      shopBtn: '¿Ya tienes una cuenta?',
      sellBtn: '🛍️ ¡Únete para Comenzar a Comprar!',
      footerText: '© 2025 MokeSell - Plataforma C2C Elegante. Todos los derechos reservados. 🌏',
      reviews: [
        { text: '"¡MokeSell hizo que vender mis productos fuera tan fácil y sin estrés!"', name: 'Beatrice T.' },
        { text: '"Una plataforma confiable con un soporte al cliente increíble."', name: 'Theo J.' },
        { text: '"¡Encontré artículos únicos que no podía encontrar en ningún otro lugar!"', name: 'Forne T.' },
        { text: '"¡Esta plataforma es un cambio de juego para comprar y vender en línea!"', name: 'Jones T.' },
        { text: '"Rápido, sencillo y efectivo. Recomiendo MokeSell a todos."', name: 'Forwea M.' }
      ]
    },
    fr: {
      welcomeText: '🌟 Bienvenue sur MokeSell 🌟',
      description: 'Achetez, Vendez et Prospérez dans un Marché Minimaliste et Écologique.',
      featuresTitle: 'Pourquoi Choisir MokeSell?',
      buySellEasily: 'Achats et Ventes Fluides 🛒',
      buySellDesc: 'Listez et découvrez des produits facilement grâce à notre plateforme.',
      ecoConscious: 'Marché Écologique 🌱',
      ecoDesc: 'Soutenez la durabilité en achetant et en vendant des articles de seconde main.',
      customerBenefits: 'Avantages Exclusifs pour les Clients 🎁',
      benefitsDesc: 'Profitez de réductions saisonnières, de coupons et d\'un système de points de fidélité.',
      ctaText: 'Rejoignez MokeSell Aujourd\'hui !',
      shopBtn: 'Vous avez déjà un compte ?',
      sellBtn: '🛍️ Rejoignez pour Commencer à Acheter !',
      footerText: '© 2025 MokeSell - Plateforme C2C Élégante. Tous droits réservés. 🌏',
      reviews: [
        { text: '"MokeSell a rendu la vente de mes produits facile et sans stress !"', name: 'Beatrice T.' },
        { text: '"Une plateforme fiable avec un support client exceptionnel."', name: 'Theo J.' },
        { text: '"J\'ai trouvé des articles uniques que je ne pouvais trouver ailleurs." ', name: 'Forne T.' },
        { text: '"Cette plateforme est révolutionnaire pour acheter et vendre en ligne !"', name: 'Jones T.' },
        { text: '"Rapide, simple et efficace. Je recommande MokeSell à tout le monde."', name: 'Forwea M.' }
      ]
    }
  };

// Function to translate the page content based on selected language
function translatePage() {
  const language = document.getElementById('languages').value;
  const t = translations[language];

  // Update the text content of various elements based on selected language
  document.getElementById('welcome-text').innerText = t.welcomeText;
  document.getElementById('description').innerText = t.description;
  document.getElementById('features-title').innerText = t.featuresTitle;
  document.getElementById('buy-sell-easily').innerText = t.buySellEasily;
  document.getElementById('buy-sell-desc').innerText = t.buySellDesc;
  document.getElementById('eco-conscious').innerText = t.ecoConscious;
  document.getElementById('eco-desc').innerText = t.ecoDesc;
  document.getElementById('customer-benefits').innerText = t.customerBenefits;
  document.getElementById('benefits-desc').innerText = t.benefitsDesc;
  document.getElementById('cta-text').innerText = t.ctaText;
  document.getElementById('shop-btn').innerText = t.shopBtn;
  document.getElementById('sell-btn').innerText = t.sellBtn;
  document.getElementById('footer-text').innerText = t.footerText;

  // Update the reviews
  const reviews = t.reviews;
  document.getElementById('review-1-text').innerText = reviews[0].text;
  document.getElementById('review-1-name').innerText = reviews[0].name;
  document.getElementById('review-2-text').innerText = reviews[1].text;
  document.getElementById('review-2-name').innerText = reviews[1].name;
  document.getElementById('review-3-text').innerText = reviews[2].text;
  document.getElementById('review-3-name').innerText = reviews[2].name;
  document.getElementById('review-4-text').innerText = reviews[3].text;
  document.getElementById('review-4-name').innerText = reviews[3].name;
  document.getElementById('review-5-text').innerText = reviews[4].text;
  document.getElementById('review-5-name').innerText = reviews[4].name;
}

  //test
  let currentIndex = 0;

  document.querySelector(".carousel-button.next").addEventListener("click", () => {
    const reviews = document.querySelector(".carousel-reviews");
    reviews.scrollLeft += 500; // Adjust based on review width
    currentIndex++;
  });
  
  document.querySelector(".carousel-button.prev").addEventListener("click", () => {
    const reviews = document.querySelector(".carousel-reviews");
    reviews.scrollLeft -= 500; // Adjust based on review width
    currentIndex--;
  });
  
  // Initialise translation with the default language (English) when the page loads
  translatePage();