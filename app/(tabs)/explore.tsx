import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function GroceryInventory() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Other');

  const categories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Fruits' },
    { id: 3, name: 'Vegetables' },
    { id: 4, name: 'Dairy' },
    { id: 5, name: 'Meat' },
    { id: 6, name: 'Bakery' },
    { id: 7, name: 'Spices' },
    { id: 8, name: 'Other' },
  ];

  const addItem = () => {
    if (itemName.trim() && itemQuantity.trim()) {
      const newItem = {
        id: Date.now().toString(),
        name: itemName.trim(),
        quantity: itemQuantity.trim(),
        category: selectedCategory === 'All' ? 'Other' : selectedCategory,
        dateAdded: new Date().toLocaleDateString(),
      };
      setItems([...items, newItem]);
      setItemName('');
      setItemQuantity('');
    } else {
      Alert.alert('Missing Information', 'Please enter both item name and quantity.');
    }
  };

  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setItems(items.filter(item => item.id !== id)),
        },
      ]
    );
  };

  const filteredItems = items.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const CategoryCard = ({ category, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
      onPress={onPress}
    >
      <Text style={[styles.categoryName, isSelected && styles.categoryNameSelected]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const ItemCard = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <View style={styles.itemMeta}>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.itemDate}>Added: {item.dateAdded}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const getCategoryCount = (categoryName) => {
    return items.filter(item => item.category === categoryName).length;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Grocery Inventory</Text>
        <Text style={styles.headerSubtitle}>Manage your items and quantities</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.flex} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Add Item Section */}
        <View style={styles.addItemSection}>
          <Text style={styles.sectionTitle}>Add New Item</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Item name (e.g., Apples, Milk)"
              placeholderTextColor="#999"
              value={itemName}
              onChangeText={setItemName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Quantity (e.g., 2 kg, 5 pieces, 1 liter)"
              placeholderTextColor="#999"
              value={itemQuantity}
              onChangeText={setItemQuantity}
            />
          </View>

          {/* Category Selection */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryLabel}>Category:</Text>
            <View style={styles.categoriesContainer}>
              {categories.filter(cat => cat.name !== 'All').map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.name && styles.categoryChipSelected
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Text style={[
                    styles.categoryChipText,
                    selectedCategory === category.name && styles.categoryChipTextSelected
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Categories */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                isSelected={selectedCategory === item.name}
                onPress={() => setSelectedCategory(item.name)}
              />
            )}
            style={styles.categoriesList}
          />
        </View>

        {/* Items List */}
        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All' ? 'All Items' : selectedCategory}
            <Text style={styles.itemCount}> ({filteredItems.length})</Text>
          </Text>

          {filteredItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No items found</Text>
              <Text style={styles.emptyStateSubtext}>
                {selectedCategory === 'All' 
                  ? 'Add some items to get started!' 
                  : `No items in ${selectedCategory} category`
                }
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ItemCard item={item} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.itemsList}
            />
          )}
        </View>

        {/* Summary */}
        {items.length > 0 && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summaryText}>
              Total Items: {items.length}
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flex: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },

  // Add Item Section
  addItemSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryChipSelected: {
    backgroundColor: '#ff8c00',
    borderColor: '#ff8c00',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Filter Section
  filterSection: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  categoriesList: {
    marginBottom: 10,
  },
  categoryCard: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryCardSelected: {
    backgroundColor: '#ff8c00',
    borderColor: '#ff8c00',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categoryNameSelected: {
    color: '#fff',
  },

  // Items Section
  itemsSection: {
    flex: 1,
    marginHorizontal: 20,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },
  itemsList: {
    paddingBottom: 20,
  },
  itemCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemCategory: {
    fontSize: 12,
    color: '#ff8c00',
    fontWeight: '600',
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
  },
  removeButton: {
    backgroundColor: '#ff4757',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  // Summary Section
  summarySection: {
    backgroundColor: '#fff3e0',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffd699',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff8c00',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    color: '#b8860b',
  },
});