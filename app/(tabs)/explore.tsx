import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function GroceryExplore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState({});

  // Mock data
  const categories = [
    { id: 1, name: 'All', icon: '🛒' },
    { id: 2, name: 'Fruits', icon: '🍎' },
    { id: 3, name: 'Vegetables', icon: '🥕' },
    { id: 4, name: 'Dairy', icon: '🥛' },
    { id: 5, name: 'Meat', icon: '🥩' },
    { id: 6, name: 'Bakery', icon: '🍞' },
    { id: 7, name: 'Spices', icon: '🌶️' },
  ];

  const products = [
    { id: 1, name: 'Fresh Apples', category: 'Fruits', price: 3.99, unit: 'per kg', image: '🍎', rating: 4.5, discount: 10 },
    { id: 2, name: 'Organic Bananas', category: 'Fruits', price: 2.49, unit: 'per kg', image: '🍌', rating: 4.7, discount: 0 },
    { id: 3, name: 'Fresh Carrots', category: 'Vegetables', price: 1.99, unit: 'per kg', image: '🥕', rating: 4.3, discount: 15 },
    { id: 4, name: 'Whole Milk', category: 'Dairy', price: 4.99, unit: 'per liter', image: '🥛', rating: 4.6, discount: 0 },
    { id: 5, name: 'Fresh Chicken', category: 'Meat', price: 8.99, unit: 'per kg', image: '🍗', rating: 4.4, discount: 20 },
    { id: 6, name: 'White Bread', category: 'Bakery', price: 2.99, unit: 'per loaf', image: '🍞', rating: 4.2, discount: 0 },
    { id: 7, name: 'Bell Peppers', category: 'Vegetables', price: 3.49, unit: 'per kg', image: '🫑', rating: 4.5, discount: 0 },
    { id: 8, name: 'Greek Yogurt', category: 'Dairy', price: 5.99, unit: 'per pack', image: '🥛', rating: 4.8, discount: 5 },
    { id: 9, name: 'Ground Beef', category: 'Meat', price: 12.99, unit: 'per kg', image: '🥩', rating: 4.3, discount: 0 },
    { id: 10, name: 'Paprika', category: 'Spices', price: 3.99, unit: 'per 100g', image: '🌶️', rating: 4.6, discount: 0 },
  ];

  const featuredDeals = [
    { id: 1, title: '50% OFF Fresh Produce', subtitle: 'Limited time offer', image: '🥗', bgColor: '#ff6b35' },
    { id: 2, title: 'Buy 2 Get 1 FREE', subtitle: 'Dairy products', image: '🧀', bgColor: '#ff8c00' },
    { id: 3, title: 'Free Delivery', subtitle: 'Orders above $50', image: '🚚', bgColor: '#ffb366' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const CategoryCard = ({ category, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
      onPress={onPress}
    >
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text style={[styles.categoryName, isSelected && styles.categoryNameSelected]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const ProductCard = ({ product }) => {
    const originalPrice = product.price;
    const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : product.price;
    
    return (
      <View style={styles.productCard}>
        {product.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discount}% OFF</Text>
          </View>
        )}
        
        <View style={styles.productImage}>
          <Text style={styles.productEmoji}>{product.image}</Text>
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
          <Text style={styles.productUnit}>{product.unit}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
          
          <View style={styles.priceContainer}>
            {product.discount > 0 && (
              <Text style={styles.originalPrice}>${originalPrice.toFixed(2)}</Text>
            )}
            <Text style={styles.currentPrice}>${discountedPrice.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={() => addToCart(product.id)}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
            {cart[product.id] && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart[product.id]}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const DealCard = ({ deal }) => (
    <View style={[styles.dealCard, { backgroundColor: deal.bgColor }]}>
      <Text style={styles.dealEmoji}>{deal.image}</Text>
      <View style={styles.dealInfo}>
        <Text style={styles.dealTitle}>{deal.title}</Text>
        <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Grocery Store</Text>
          <Text style={styles.headerSubtitle}>Fresh ingredients delivered</Text>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
          {getCartCount() > 0 && (
            <View style={styles.cartCountBadge}>
              <Text style={styles.cartCountText}>{getCartCount()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for groceries..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Featured Deals */}
        <View style={styles.dealsSection}>
          <Text style={styles.sectionTitle}>Featured Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredDeals.map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.name}
                onPress={() => setSelectedCategory(category.name)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            <Text style={styles.productCount}> ({filteredProducts.length})</Text>
          </Text>
          
          <View style={styles.productsGrid}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    shadowColor: '#ff8c00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cartButton: {
    position: 'relative',
    padding: 10,
  },
  cartIcon: {
    fontSize: 28,
  },
  cartCountBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ff8c00',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Search Styles
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  // Section Styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  productCount: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },

  // Deals Styles
  dealsSection: {
    marginBottom: 25,
  },
  dealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    padding: 20,
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 5,
  },
  dealEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  dealInfo: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  dealSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },

  // Categories Styles
  categoriesSection: {
    marginBottom: 25,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 20,
    marginRight: 5,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryCardSelected: {
    backgroundColor: '#ff8c00',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  categoryNameSelected: {
    color: '#fff',
  },

  // Products Styles
  productsSection: {
    marginBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  productCard: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImage: {
    alignItems: 'center',
    marginBottom: 10,
  },
  productEmoji: {
    fontSize: 40,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productUnit: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff8c00',
  },
  addToCartBtn: {
    backgroundColor: '#ff8c00',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    position: 'relative',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  bottomSpacing: {
    height: 30,
  },
});