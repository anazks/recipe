import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function RecipeGeneratorHome() {
  const [recipe, setRecipe] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;

  // Mock grocery items (in real app, this would come from the inventory)
  const availableIngredients = [
    'Fresh Apples', 'Organic Bananas', 'Fresh Carrots', 'Whole Milk', 
    'Fresh Chicken', 'White Bread', 'Bell Peppers', 'Greek Yogurt', 
    'Ground Beef', 'Paprika', 'Onions', 'Garlic', 'Tomatoes'
  ];

  // Mock video data
  const videos = [
    { id: 1, title: 'Perfect Pasta Carbonara', channel: 'Chef Marco', duration: '12:45' },
    { id: 2, title: 'Homemade Pizza Dough', channel: 'Kitchen Basics', duration: '8:30' },
    { id: 3, title: 'Thai Green Curry', channel: 'Asian Flavors', duration: '15:20' },
    { id: 4, title: 'French Omelette Technique', channel: 'Culinary Arts', duration: '6:15' },
    { id: 5, title: 'Chocolate Chip Cookies', channel: 'Sweet Treats', duration: '10:30' },
    { id: 6, title: 'Beef Stir Fry', channel: 'Quick Meals', duration: '9:45' },
  ];

  // Auto-scroll animation for videos
  useEffect(() => {
    const startAutoScroll = () => {
      Animated.loop(
        Animated.timing(scrollX, {
          toValue: -width * videos.length,
          duration: 20000,
          useNativeDriver: true,
        })
      ).start();
    };
    
    const timer = setTimeout(startAutoScroll, 1000);
    return () => clearTimeout(timer);
  }, []);

  const generateRecipe = async (mealType) => {
    setSelectedMealType(mealType);
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      let mockRecipe = '';
      
      switch(mealType) {
        case 'breakfast':
          mockRecipe = `
🌅 Breakfast Recipe

Using your available ingredients:
• Greek Yogurt
• Fresh Apples
• White Bread

Recipe: Apple Cinnamon Toast with Yogurt

Instructions:
1. Toast 2 slices of white bread until golden
2. Slice fresh apples thinly
3. Spread Greek yogurt on toast
4. Top with apple slices
5. Sprinkle with cinnamon if available

Cooking Time: 5 minutes
Servings: 1 person
Perfect for: Quick morning meal
          `;
          break;
          
        case 'lunch':
          mockRecipe = `
🌞 Lunch Recipe

Using your available ingredients:
• Fresh Chicken
• Bell Peppers
• Onions
• Paprika

Recipe: Paprika Chicken with Bell Peppers

Instructions:
1. Cut chicken into bite-sized pieces
2. Slice bell peppers and onions
3. Heat oil in a pan, cook chicken until golden
4. Add vegetables and cook for 8-10 minutes
5. Season with paprika, salt, and pepper
6. Serve hot

Cooking Time: 25 minutes
Servings: 2-3 people
Perfect for: Hearty lunch meal
          `;
          break;
          
        case 'dinner':
          mockRecipe = `
🌙 Dinner Recipe

Using your available ingredients:
• Ground Beef
• Fresh Carrots
• Onions
• Garlic
• Tomatoes

Recipe: Hearty Beef and Vegetable Stew

Instructions:
1. Brown ground beef in a large pot
2. Add diced onions and garlic, cook until fragrant
3. Add chopped carrots and tomatoes
4. Simmer for 30-40 minutes until tender
5. Season with available herbs and spices
6. Serve with bread if available

Cooking Time: 45 minutes
Servings: 4 people
Perfect for: Comforting dinner
          `;
          break;
      }
      
      setRecipe(mockRecipe);
      setIsGenerating(false);
    }, 2000);
  };

  const MealButton = ({ mealType, icon, title, description, onPress }) => (
    <TouchableOpacity
      style={[
        styles.mealButton,
        selectedMealType === mealType && styles.mealButtonSelected
      ]}
      onPress={() => onPress(mealType)}
      disabled={isGenerating}
    >
      <Text style={styles.mealIcon}>{icon}</Text>
      <View style={styles.mealInfo}>
        <Text style={[
          styles.mealTitle,
          selectedMealType === mealType && styles.mealTitleSelected
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.mealDescription,
          selectedMealType === mealType && styles.mealDescriptionSelected
        ]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const VideoCard = ({ video }) => (
    <View style={styles.videoCard}>
      <View style={styles.videoThumbnail}>
        <Text style={styles.playIcon}>▶</Text>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{video.duration}</Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={styles.videoChannel}>{video.channel}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>RecipeGen</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.menuDot} />
            <TouchableOpacity style={styles.menuDot} />
            <TouchableOpacity style={styles.menuDot} />
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Create Amazing{'\n'}Recipes</Text>
          <Text style={styles.heroSubtitle}>
            Generate recipes based on your available grocery items
          </Text>
        </View>

        {/* Available Ingredients */}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Available Ingredients</Text>
          <View style={styles.ingredientsList}>
            {availableIngredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientChip}>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Meal Type Selection */}
        <View style={styles.mealSelectionContainer}>
          <Text style={styles.sectionTitle}>Choose Meal Type</Text>
          
          <MealButton
            mealType="breakfast"
            icon="🌅"
            title="Breakfast"
            description="Start your day right"
            onPress={generateRecipe}
          />
          
          <MealButton
            mealType="lunch"
            icon="🌞"
            title="Lunch"
            description="Midday energy boost"
            onPress={generateRecipe}
          />
          
          <MealButton
            mealType="dinner"
            icon="🌙"
            title="Dinner"
            description="End the day deliciously"
            onPress={generateRecipe}
          />
        </View>

        {/* Results Section */}
        {(recipe || isGenerating) && (
          <View style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>Your Recipe</Text>
            <View style={styles.resultsBox}>
              {recipe ? (
                <ScrollView style={styles.recipeScroll}>
                  <Text style={styles.recipeText}>{recipe}</Text>
                </ScrollView>
              ) : (
                <View style={styles.resultsPlaceholder}>
                  <Text style={styles.placeholderIcon}>🍳</Text>
                  <Text style={styles.placeholderText}>
                    Cooking up something delicious...
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Video Section */}
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>Cooking Videos</Text>
          <View style={styles.videoContainer}>
            <Animated.View
              style={[
                styles.videoScrollContainer,
                {
                  transform: [{ translateX: scrollX }],
                },
              ]}
            >
              {[...videos, ...videos].map((video, index) => (
                <VideoCard key={`${video.id}-${index}`} video={video} />
              ))}
            </Animated.View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff8c00',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 4,
  },
  menuDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff8c00',
  },

  // Hero Styles
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#fff8f3',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff8c00',
    textAlign: 'center',
    marginBottom: 15,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },

  // Ingredients Styles
  ingredientsContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientChip: {
    backgroundColor: '#fff3e0',
    borderColor: '#ffd699',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ingredientText: {
    fontSize: 12,
    color: '#ff8c00',
    fontWeight: '500',
  },

  // Meal Selection Styles
  mealSelectionContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  mealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  mealButtonSelected: {
    borderColor: '#ff8c00',
    backgroundColor: '#fff8f3',
  },
  mealIcon: {
    fontSize: 40,
    marginRight: 20,
  },
  mealInfo: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  mealTitleSelected: {
    color: '#ff8c00',
  },
  mealDescription: {
    fontSize: 14,
    color: '#666',
  },
  mealDescriptionSelected: {
    color: '#b8860b',
  },

  // Results Styles
  resultsContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  resultsBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    minHeight: 250,
    shadowColor: '#ff8c00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  resultsPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  recipeScroll: {
    flex: 1,
  },
  recipeText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },

  // Video Styles
  videoSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  videoContainer: {
    overflow: 'hidden',
    paddingVertical: 10,
  },
  videoScrollContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  videoCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  videoThumbnail: {
    height: 160,
    backgroundColor: '#ff8c00',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playIcon: {
    fontSize: 40,
    color: '#fff',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  videoInfo: {
    padding: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  videoChannel: {
    fontSize: 14,
    color: '#666',
  },
  
  bottomSpacing: {
    height: 30,
  },
});