import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function RecipeGeneratorHome() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

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

  const generateRecipe = async () => {
    if (!ingredients.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecipe = `
🍳 Delicious Recipe with ${ingredients}

Ingredients:
${ingredients.split(',').map(ing => `• ${ing.trim()}`).join('\n')}
• Salt and pepper to taste
• 2 tbsp olive oil

Instructions:
1. Prepare all ingredients by washing and chopping as needed
2. Heat olive oil in a large pan over medium heat
3. Add your main ingredients and cook for 5-7 minutes
4. Season with salt and pepper
5. Cook until tender and flavors are well combined
6. Serve hot and enjoy!

Cooking Time: 20 minutes
Servings: 2-3 people
      `;
      
      setRecipe(mockRecipe);
      setIsGenerating(false);
    }, 2000);
  };

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
            Enter your ingredients and let AI generate delicious recipes for you
          </Text>
        </View>

        {/* Input Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Enter Your Ingredients</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., chicken, tomatoes, onions, garlic..."
              placeholderTextColor="#999"
              value={ingredients}
              onChangeText={setIngredients}
              multiline
              textAlignVertical="top"
            />
          </View>
          
          <TouchableOpacity
            style={[styles.generateBtn, isGenerating && styles.generateBtnDisabled]}
            onPress={generateRecipe}
            disabled={isGenerating || !ingredients.trim()}
          >
            <Text style={styles.generateBtnText}>
              {isGenerating ? 'Generating Recipe...' : 'Generate Recipe'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Results Section */}
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
                  {isGenerating 
                    ? 'Cooking up something delicious...' 
                    : 'Your generated recipe will appear here'
                  }
                </Text>
              </View>
            )}
          </View>
        </View>

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
    backgroundColor: 'linear-gradient(135deg, #fff 0%, #fff8f3 100%)',
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

  // Form Styles
  formContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#ff8c00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    color: '#333',
  },
  generateBtn: {
    backgroundColor: '#ff8c00',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#ff8c00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  generateBtnDisabled: {
    backgroundColor: '#ffb366',
    opacity: 0.7,
  },
  generateBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Results Styles
  resultsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
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